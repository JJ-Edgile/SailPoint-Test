System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule'], function (_export) {

    /**
     * Tests for the AccessRequestDataService.
     */
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }],
        execute: function () {
            describe('AccessRequestDataService', function () {

                var MAX_REQUEST_IDENTITIES = 3,
                    accessRequestDataService,
                    accessRequestDeepFilterService,
                    $httpBackend,
                    SEARCH_TYPE_KEYWORD,
                    PageState,
                    AccessRequest;

                ////////////////////////////////////////////////////////////////////////////
                //
                // GLOBAL SETUP
                //
                ////////////////////////////////////////////////////////////////////////////

                // Use the access request module.
                beforeEach(module(accessRequestModule));

                // Setup the dependencies.
                /* jshint maxparams: 7 */
                beforeEach(inject(function (_accessRequestDataService_, SP_CONFIG_SERVICE, _accessRequestDeepFilterService_, _$httpBackend_, _SEARCH_TYPE_KEYWORD_, _PageState_, _AccessRequest_) {
                    accessRequestDataService = _accessRequestDataService_;
                    accessRequestDeepFilterService = _accessRequestDeepFilterService_;
                    $httpBackend = _$httpBackend_;
                    SEARCH_TYPE_KEYWORD = _SEARCH_TYPE_KEYWORD_;
                    PageState = _PageState_;
                    AccessRequest = _AccessRequest_;

                    SailPoint.configData = {};
                    SailPoint.configData[SP_CONFIG_SERVICE.ACCESS_REQUEST_MAX_IDENTITY_SELECT] = MAX_REQUEST_IDENTITIES;
                    SailPoint.configData[SP_CONFIG_SERVICE.USER_ACCESS_CONFIGS] = {
                        actionRequestAccessDefault: {
                            allowOthers: false,
                            allowSelf: true,
                            allowBulk: true
                        },
                        RequestAccess: {
                            allowOthers: true,
                            allowSelf: true,
                            allowBulk: true
                        }
                    };
                }));

                ////////////////////////////////////////////////////////////////////////////
                //
                // PAGE STATE TESTS
                //
                ////////////////////////////////////////////////////////////////////////////

                it('starts with default page state', function () {
                    expect(accessRequestDataService.selectIdentitiesPageState).not.toBeNull();
                    expect(accessRequestDataService.addAccessPageState).not.toBeNull();
                    expect(accessRequestDataService.removeAccessPageState).not.toBeNull();
                });

                it('should call resetCurrentPage from resetManageAccessPaging', function () {
                    spyOn(accessRequestDataService.addAccessPageState.pagingData, 'resetCurrentPage');
                    spyOn(accessRequestDataService.removeAccessPageState.pagingData, 'resetCurrentPage');
                    accessRequestDataService.resetManageAccessPaging();
                    expect(accessRequestDataService.addAccessPageState.pagingData.resetCurrentPage).toHaveBeenCalled();
                    expect(accessRequestDataService.removeAccessPageState.pagingData.resetCurrentPage).toHaveBeenCalled();
                });

                ////////////////////////////////////////////////////////////////////////////
                //
                // SEARCH TYPE TESTS
                //
                ////////////////////////////////////////////////////////////////////////////

                describe('search type', function () {
                    it('defaults to keyword', function () {
                        expect(accessRequestDataService.getSearchType()).toEqual(SEARCH_TYPE_KEYWORD);
                    });

                    it('can be changed', function () {
                        var newType = 'rotten moldy bologna';
                        accessRequestDataService.setSearchType(newType);
                        expect(accessRequestDataService.getSearchType()).toEqual(newType);
                    });
                });

                ////////////////////////////////////////////////////////////////////////////
                //
                // TAB STATE TESTS
                //
                ////////////////////////////////////////////////////////////////////////////

                describe('manage access tab', function () {
                    /**
                     * Test that the Manage Access tab is enabled/disabled based on the given
                     * identities having been selected.
                     */
                    var testManageAccessTab = function (identities, enabled, testGetIdentities, disableInterface) {
                        var manageAccessEnabled;
                        spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities').and.returnValue(identities);
                        if (disableInterface) {
                            accessRequestDataService.setInterfaceEnabled(false);
                        }
                        manageAccessEnabled = accessRequestDataService.isManageAccessTabEnabled();
                        expect(manageAccessEnabled).toEqual(enabled);
                        if (testGetIdentities) {
                            expect(accessRequestDataService.getAccessRequest().getIdentities).toHaveBeenCalled();
                        }
                    };

                    it('is disabled if no identities are selected', function () {
                        testManageAccessTab([], false, true, false);
                    });

                    it('is enabled if one identity is selected', function () {
                        testManageAccessTab(['identity'], true, true, false);
                    });

                    it('is enabled if multiple identities are selected', function () {
                        testManageAccessTab(['identity', 'identity also'], true, true, false);
                    });

                    it('is disabled if interfaceEnabled is false', function () {
                        testManageAccessTab(['identity'], false, false, true);
                    });

                    it('is disabled if there is no deep filter', function () {
                        spyOn(accessRequestDeepFilterService, 'isDeepLinkManageAccess').and.returnValue(false);
                        testManageAccessTab([], false, false, false);
                    });

                    it('is enabled if there is a deep filter', function () {
                        spyOn(accessRequestDeepFilterService, 'isDeepLinkManageAccess').and.returnValue(true);
                        testManageAccessTab([], true, false, false);
                    });
                });

                describe('remove access tab', function () {
                    /**
                     * Test that the Remove Access tab is enabled/disabled based on the given
                     * identities having been selected.
                     */
                    var testRemoveAccessTab = function (identities, enabled, testGetIdentities, disableInterface) {
                        var tabEnabled;
                        spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities').and.returnValue(identities);
                        if (disableInterface) {
                            accessRequestDataService.setInterfaceEnabled(false);
                        }
                        tabEnabled = accessRequestDataService.isRemoveAccessTabEnabled();
                        expect(tabEnabled).toEqual(enabled);
                        if (testGetIdentities) {
                            expect(accessRequestDataService.getAccessRequest().getIdentities).toHaveBeenCalled();
                        }
                    };

                    it('is disabled if no identities are selected', function () {
                        testRemoveAccessTab([], false, true, false);
                    });

                    it('is enabled if one identity is selected', function () {
                        testRemoveAccessTab(['identity'], true, true, false);
                    });

                    it('is disabled if multiple identities are selected', function () {
                        testRemoveAccessTab(['identity', 'identity also'], false, true, false);
                    });

                    it('is disabled if interfaceEnabled is false', function () {
                        testRemoveAccessTab(['identity again'], false, false, true);
                    });
                });

                describe('select users tab', function () {
                    /**
                     * Test that the Select Users tab is enabled/disabled based on the interface enabled flag
                     */
                    var testSelectUsersTab = function (enabled) {
                        var tabEnabled;
                        tabEnabled = accessRequestDataService.isSelectUsersTabEnabled();
                        expect(tabEnabled).toEqual(enabled);
                    };

                    it('is disabled if interfaceEnabled is false', function () {
                        accessRequestDataService.setInterfaceEnabled(false);
                        testSelectUsersTab(false);
                    });

                    it('is enabled if interfaceEnabled is set false then cleared', function () {
                        accessRequestDataService.setInterfaceEnabled(false);
                        accessRequestDataService.clear();
                        testSelectUsersTab(true);
                    });
                });

                describe('review tab', function () {
                    /**
                     * Test that the Review tab is enabled/disabled based on the given identities
                     * and items having been selected.
                     */
                    var testReviewTab = function (identities, addItems, removeItems, enabled, testGetIdentities) {
                        var manageAccessEnabled;
                        spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities').and.returnValue(identities);
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue(addItems);
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRemovedCurrentAccessItems').and.returnValue(removeItems);
                        manageAccessEnabled = accessRequestDataService.isReviewTabEnabled();
                        expect(manageAccessEnabled).toEqual(enabled);
                        if (testGetIdentities) {
                            expect(accessRequestDataService.getAccessRequest().getIdentities).toHaveBeenCalled();
                        }
                    };

                    it('is disabled if no identities or items are selected', function () {
                        testReviewTab([], [], [], false, true);
                    });

                    it('is disabled if one identity and no items are selected', function () {
                        testReviewTab(['identity'], [], [], false, true);
                    });

                    it('is disabled if no identities and one item is selected', function () {
                        testReviewTab([], ['item'], [], false, true);
                    });

                    it('is enabled if one identity and one item is selected', function () {
                        testReviewTab(['identity'], ['item'], [], true, true);
                    });

                    it('is enabled if one identity and one item for removal is selected', function () {
                        testReviewTab(['identity'], [], ['removeItem'], true, true);
                    });

                    it('is enabled if one identity and one item for add and removal are selected', function () {
                        testReviewTab(['identity'], ['item'], ['removeItem'], true, true);
                    });

                    it('is disabled if there is no deep filter', function () {
                        spyOn(accessRequestDeepFilterService, 'isDeepLinkReview').and.returnValue(false, true);
                        testReviewTab([], [], [], false);
                    });

                    it('is enabled if there is a deep filter', function () {
                        spyOn(accessRequestDeepFilterService, 'isDeepLinkReview').and.returnValue(true, false);
                        testReviewTab([], [], [], true);
                    });

                    it('is enabled even if interface enabled flag is false', function () {
                        accessRequestDataService.setInterfaceEnabled(false);
                        testReviewTab(['identity'], ['item'], [], true, true);
                    });
                });

                describe('interface enabled', function () {
                    it('is enabled by default', function () {
                        expect(accessRequestDataService.isInterfaceEnabled()).toEqual(true);
                    });

                    it('is set disabled', function () {
                        expect(accessRequestDataService.isInterfaceEnabled()).toEqual(true);
                        accessRequestDataService.setInterfaceEnabled(false);
                        expect(accessRequestDataService.isInterfaceEnabled()).toEqual(false);
                    });

                    it('is cleared', function () {
                        accessRequestDataService.setInterfaceEnabled(false);
                        expect(accessRequestDataService.isInterfaceEnabled()).toEqual(false);
                        accessRequestDataService.clear();
                        expect(accessRequestDataService.isInterfaceEnabled()).toEqual(true);
                    });
                });

                ////////////////////////////////////////////////////////////////////////////
                //
                // DIRTY CHECKING
                //
                ////////////////////////////////////////////////////////////////////////////

                describe('isDirty()', function () {
                    var identity, item, removedItem;

                    beforeEach(inject(function (Identity, AccessRequestItem, CurrentAccessItem, accessRequestTestData) {
                        var identityData = accessRequestTestData.IDENTITY1,
                            itemData = accessRequestTestData.ROLE,
                            removedItemData = accessRequestTestData.CURRENT_ACCESS_ROLE;

                        identity = new Identity(identityData);
                        item = new AccessRequestItem(itemData);
                        removedItem = new CurrentAccessItem(removedItemData);
                    }));

                    describe('self-service', function () {
                        beforeEach(function () {
                            spyOn(accessRequestDataService, 'isSelfService').and.returnValue(true);
                        });

                        it('is not dirty if only an identity is selected', function () {
                            accessRequestDataService.getAccessRequest().addIdentity(identity);
                            expect(accessRequestDataService.isDirty()).toEqual(false);
                        });

                        it('is dirty if an item is requested', function () {
                            accessRequestDataService.getAccessRequest().addRequestedItem(item);
                            expect(accessRequestDataService.isDirty()).toEqual(true);
                        });

                        it('is dirty if an item is requested for removal', function () {
                            accessRequestDataService.getAccessRequest().addRemovedCurrentAccessItem(removedItem);
                            expect(accessRequestDataService.isDirty()).toEqual(true);
                        });
                    });

                    describe('for-others', function () {
                        beforeEach(function () {
                            spyOn(accessRequestDataService, 'isSelfService').and.returnValue(false);
                        });

                        it('is dirty if only an identity is selected', function () {
                            accessRequestDataService.getAccessRequest().addIdentity(identity);
                            expect(accessRequestDataService.isDirty()).toEqual(true);
                        });

                        it('is dirty if an item is requested', function () {
                            accessRequestDataService.getAccessRequest().addRequestedItem(item);
                            expect(accessRequestDataService.isDirty()).toEqual(true);
                        });

                        it('is dirty if an item is requested for removal', function () {
                            accessRequestDataService.getAccessRequest().addRemovedCurrentAccessItem(removedItem);
                            expect(accessRequestDataService.isDirty()).toEqual(true);
                        });
                    });
                });

                ////////////////////////////////////////////////////////////////////
                //
                // POLICY VIOLATIONS TESTS
                //
                ////////////////////////////////////////////////////////////////////

                describe('get policy violations', function () {
                    var workItemId = '2c908cd54ba92fde014bbdbeacbf04d2';
                    var violation1 = {
                        policyName: 'SOD Policy',
                        description: 'Accounts Receivable and Accounts Payable should not be combined.',
                        ruleName: 'Accounting SOD-762',
                        workitemId: workItemId
                    };

                    var violation2 = {
                        policyName: 'SOD Policy Too',
                        description: 'Accounts Receivable and Accounts Payable should not be combinedxxxxxx.',
                        ruleName: 'Accounting SOD-762999999',
                        workitemId: workItemId
                    };

                    var violationReviewsUrl = '/ui/rest/workItems/' + workItemId + '/violationReviews',
                        response = {
                        count: 2,
                        objects: [{
                            'policyName': violation1.policyName,
                            'description': violation1.description,
                            'ruleName': violation1.ruleName,
                            'workitemId': violation1.workitemId
                        }, {
                            'policyName': violation2.policyName,
                            'description': violation2.description,
                            'ruleName': violation2.ruleName,
                            'workitemId': violation2.workitemId
                        }]
                    },
                        promise;

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

                            if (expectedCount === 2) {
                                expect(response.data.objects[0].policyName).toEqual(violation1.policyName);
                                expect(response.data.objects[0].ruleName).toEqual(violation1.ruleName);
                                expect(response.data.objects[0].workitemId).toEqual(violation1.workitemId);
                                expect(response.data.objects[1].policyName).toEqual(violation2.policyName);
                                expect(response.data.objects[1].ruleName).toEqual(violation2.ruleName);
                                expect(response.data.objects[1].workitemId).toEqual(violation2.workitemId);
                            }
                        });
                    }

                    it('get some violations', function () {
                        $httpBackend.expectGET(violationReviewsUrl).respond(200, response);
                        promise = accessRequestDataService.getPolicyViolations(workItemId);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });
                });

                ////////////////////////////////////////////////////////////////////
                //
                // MISCELLANEOUS CONFIG STATE TESTS
                //
                ////////////////////////////////////////////////////////////////////

                describe('singleUserRequest', function () {
                    var identity1, identity2;

                    beforeEach(inject(function (Identity, accessRequestTestData) {
                        identity1 = new Identity(accessRequestTestData.IDENTITY1);
                        identity2 = new Identity(accessRequestTestData.IDENTITY2);
                    }));

                    it('returns false for default isSingleUserRequest', function () {
                        expect(accessRequestDataService.isSingleUserRequest()).toEqual(false);
                    });
                    it('returns true for single identity isSingleUserRequest', function () {
                        accessRequestDataService.getAccessRequest().addIdentity(identity1);
                        expect(accessRequestDataService.isSingleUserRequest()).toEqual(true);
                    });
                    it('returns false for double identity isSingleUserRequest', function () {
                        accessRequestDataService.getAccessRequest().addIdentity(identity1);
                        accessRequestDataService.getAccessRequest().addIdentity(identity2);
                        expect(accessRequestDataService.isSingleUserRequest()).toEqual(false);
                    });
                });

                describe('selfService', function () {
                    it('returns false for default isSelfService', function () {
                        expect(accessRequestDataService.isSelfService()).toEqual(false);
                    });
                });

                describe('allow request flags', function () {
                    it('returns false for default allow request for self', function () {
                        expect(accessRequestDataService.isAllowRequestForSelf()).toEqual(false);
                    });

                    it('returns false for default allow request for others', function () {
                        expect(accessRequestDataService.isAllowRequestForOthers()).toEqual(false);
                    });
                });

                describe('clear()', function () {
                    it('should reset to default values', function () {
                        var properties = ['accessRequest', 'priority', 'selectIdentitiesPageState', 'addAccessPageState', 'removeAccessPageState', 'searchType', 'workItemId'],
                            defaultValues = [new AccessRequest(MAX_REQUEST_IDENTITIES, accessRequestDataService), null, new PageState(), new PageState(), new PageState(), 'Keyword', undefined],
                            testValues = [{ 'AThingThatWillBeOverwrittenByANewAccessRequest': 'yeah' }, 'high', { 'AThingThatIsNotAPageState': 'this is getting boring' }, { 'AThingThatIsNotAPageState': 'this is getting boring' }, { 'AThingThatIsNotAPageState': 'this is getting boring' }, 'notKeywordSearch', 'workitem1'],
                            i;

                        for (i = 0; i < properties.length; i++) {
                            accessRequestDataService[properties[i]] = testValues[i];
                        }

                        accessRequestDataService.clear();

                        for (i = 0; i < properties.length; i++) {
                            expect(accessRequestDataService[properties[i]]).toEqual(defaultValues[i]);
                        }
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNDQUFzQyxVQUFVLFNBQVM7Ozs7O0lBQXJHOztJQU9JLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZO1lBSjdCLFNBQVMsNEJBQTRCLFlBQVc7O2dCQUU1QyxJQUFJLHlCQUF5QjtvQkFDekI7b0JBQTBCO29CQUMxQjtvQkFBYztvQkFBcUI7b0JBQVc7Ozs7Ozs7OztnQkFTbEQsV0FBVyxPQUFPOzs7O2dCQUlsQixXQUFXLE9BQU8sVUFBUyw0QkFBNEIsbUJBQW1CLGtDQUMvQyxnQkFBZ0IsdUJBQXVCLGFBQWEsaUJBQWlCO29CQUM1RiwyQkFBMkI7b0JBQzNCLGlDQUFpQztvQkFDakMsZUFBZTtvQkFDZixzQkFBc0I7b0JBQ3RCLFlBQVk7b0JBQ1osZ0JBQWdCOztvQkFFaEIsVUFBVSxhQUFhO29CQUN2QixVQUFVLFdBQVcsa0JBQWtCLHNDQUFzQztvQkFDN0UsVUFBVSxXQUFXLGtCQUFrQix1QkFBdUI7d0JBQzFELDRCQUE0Qjs0QkFDeEIsYUFBYTs0QkFDYixXQUFXOzRCQUNYLFdBQVc7O3dCQUVmLGVBQWU7NEJBQ1gsYUFBYTs0QkFDYixXQUFXOzRCQUNYLFdBQVc7Ozs7Ozs7Ozs7O2dCQVl2QixHQUFHLGtDQUFrQyxZQUFXO29CQUM1QyxPQUFPLHlCQUF5QiwyQkFBMkIsSUFBSTtvQkFDL0QsT0FBTyx5QkFBeUIsb0JBQW9CLElBQUk7b0JBQ3hELE9BQU8seUJBQXlCLHVCQUF1QixJQUFJOzs7Z0JBRy9ELEdBQUksNkRBQTZELFlBQVc7b0JBQ3hFLE1BQU0seUJBQXlCLG1CQUFtQixZQUFZO29CQUM5RCxNQUFNLHlCQUF5QixzQkFBc0IsWUFBWTtvQkFDakUseUJBQXlCO29CQUN6QixPQUFPLHlCQUF5QixtQkFBbUIsV0FBVyxrQkFBa0I7b0JBQ2hGLE9BQU8seUJBQXlCLHNCQUFzQixXQUFXLGtCQUFrQjs7Ozs7Ozs7O2dCQVV2RixTQUFTLGVBQWUsWUFBVztvQkFDL0IsR0FBRyx1QkFBdUIsWUFBVzt3QkFDakMsT0FBTyx5QkFBeUIsaUJBQWlCLFFBQVE7OztvQkFHN0QsR0FBRyxrQkFBa0IsWUFBVzt3QkFDNUIsSUFBSSxVQUFVO3dCQUNkLHlCQUF5QixjQUFjO3dCQUN2QyxPQUFPLHlCQUF5QixpQkFBaUIsUUFBUTs7Ozs7Ozs7OztnQkFXakUsU0FBUyxxQkFBcUIsWUFBVzs7Ozs7b0JBS3JDLElBQUksc0JBQXNCLFVBQVMsWUFBWSxTQUFTLG1CQUFtQixrQkFBa0I7d0JBQ3pGLElBQUk7d0JBQ0osTUFBTSx5QkFBeUIsb0JBQW9CLGlCQUFpQixJQUFJLFlBQVk7d0JBQ3BGLElBQUksa0JBQWtCOzRCQUNsQix5QkFBeUIsb0JBQW9COzt3QkFFakQsc0JBQXNCLHlCQUF5Qjt3QkFDL0MsT0FBTyxxQkFBcUIsUUFBUTt3QkFDcEMsSUFBRyxtQkFBbUI7NEJBQ2xCLE9BQU8seUJBQXlCLG1CQUFtQixlQUFlOzs7O29CQUkxRSxHQUFHLDZDQUE2QyxZQUFXO3dCQUN2RCxvQkFBb0IsSUFBSSxPQUFPLE1BQU07OztvQkFHekMsR0FBRywwQ0FBMEMsWUFBVzt3QkFDcEQsb0JBQW9CLENBQUUsYUFBYyxNQUFNLE1BQU07OztvQkFHcEQsR0FBRyxrREFBa0QsWUFBVzt3QkFDNUQsb0JBQW9CLENBQUUsWUFBWSxrQkFBa0IsTUFBTSxNQUFNOzs7b0JBR3BFLEdBQUcsNENBQTRDLFlBQVc7d0JBQ3RELG9CQUFvQixDQUFFLGFBQWEsT0FBTyxPQUFPOzs7b0JBR3JELEdBQUcsMENBQTBDLFlBQVc7d0JBQ3BELE1BQU0sZ0NBQWdDLDBCQUEwQixJQUFJLFlBQVk7d0JBQ2hGLG9CQUFvQixJQUFJLE9BQU8sT0FBTzs7O29CQUcxQyxHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxNQUFNLGdDQUFnQywwQkFBMEIsSUFBSSxZQUFZO3dCQUNoRixvQkFBb0IsSUFBSSxNQUFNLE9BQU87Ozs7Z0JBSTdDLFNBQVMscUJBQXFCLFlBQVc7Ozs7O29CQUtyQyxJQUFJLHNCQUFzQixVQUFTLFlBQVksU0FBUyxtQkFBbUIsa0JBQWtCO3dCQUN6RixJQUFJO3dCQUNKLE1BQU0seUJBQXlCLG9CQUFvQixpQkFBaUIsSUFBSSxZQUFZO3dCQUNwRixJQUFJLGtCQUFrQjs0QkFDbEIseUJBQXlCLG9CQUFvQjs7d0JBRWpELGFBQWEseUJBQXlCO3dCQUN0QyxPQUFPLFlBQVksUUFBUTt3QkFDM0IsSUFBSSxtQkFBbUI7NEJBQ25CLE9BQU8seUJBQXlCLG1CQUFtQixlQUFlOzs7O29CQUkxRSxHQUFHLDZDQUE2QyxZQUFXO3dCQUN2RCxvQkFBb0IsSUFBSSxPQUFPLE1BQU07OztvQkFHekMsR0FBRywwQ0FBMEMsWUFBVzt3QkFDcEQsb0JBQW9CLENBQUUsYUFBYyxNQUFNLE1BQU07OztvQkFHcEQsR0FBRyxtREFBbUQsWUFBVzt3QkFDN0Qsb0JBQW9CLENBQUUsWUFBWSxrQkFBa0IsT0FBTyxNQUFNOzs7b0JBR3JFLEdBQUcsNENBQTRDLFlBQVc7d0JBQ3RELG9CQUFvQixDQUFFLG1CQUFtQixPQUFPLE9BQU87Ozs7Z0JBSy9ELFNBQVMsb0JBQW9CLFlBQVc7Ozs7b0JBSXBDLElBQUkscUJBQXFCLFVBQVMsU0FBUzt3QkFDdkMsSUFBSTt3QkFDSixhQUFhLHlCQUF5Qjt3QkFDdEMsT0FBTyxZQUFZLFFBQVE7OztvQkFHL0IsR0FBRyw0Q0FBNEMsWUFBVzt3QkFDdEQseUJBQXlCLG9CQUFvQjt3QkFDN0MsbUJBQW1COzs7b0JBR3ZCLEdBQUcsNERBQTRELFlBQVc7d0JBQ3RFLHlCQUF5QixvQkFBb0I7d0JBQzdDLHlCQUF5Qjt3QkFDekIsbUJBQW1COzs7O2dCQUszQixTQUFTLGNBQWMsWUFBVzs7Ozs7b0JBSzlCLElBQUksZ0JBQWdCLFVBQVMsWUFBWSxVQUFVLGFBQWEsU0FBUyxtQkFBbUI7d0JBQ3hGLElBQUk7d0JBQ0osTUFBTSx5QkFBeUIsb0JBQW9CLGlCQUFpQixJQUFJLFlBQVk7d0JBQ3BGLE1BQU0seUJBQXlCLG9CQUFvQixxQkFBcUIsSUFBSSxZQUFZO3dCQUN4RixNQUFNLHlCQUF5QixvQkFBb0IsZ0NBQy9DLElBQUksWUFBWTt3QkFDcEIsc0JBQXNCLHlCQUF5Qjt3QkFDL0MsT0FBTyxxQkFBcUIsUUFBUTt3QkFDcEMsSUFBRyxtQkFBbUI7NEJBQ2xCLE9BQU8seUJBQXlCLG1CQUFtQixlQUFlOzs7O29CQUkxRSxHQUFHLHNEQUFzRCxZQUFXO3dCQUNoRSxjQUFjLElBQUksSUFBSSxJQUFJLE9BQU87OztvQkFHckMsR0FBRyx5REFBeUQsWUFBVzt3QkFDbkUsY0FBYyxDQUFFLGFBQWMsSUFBSSxJQUFJLE9BQU87OztvQkFHakQsR0FBRyx5REFBeUQsWUFBVzt3QkFDbkUsY0FBYyxJQUFJLENBQUUsU0FBVSxJQUFJLE9BQU87OztvQkFHN0MsR0FBRyx1REFBdUQsWUFBVzt3QkFDakUsY0FBYyxDQUFFLGFBQWMsQ0FBQyxTQUFTLElBQUksTUFBTTs7O29CQUd0RCxHQUFHLG1FQUFtRSxZQUFXO3dCQUM3RSxjQUFjLENBQUUsYUFBYyxJQUFJLENBQUMsZUFBZSxNQUFNOzs7b0JBRzVELEdBQUcsNEVBQTRFLFlBQVc7d0JBQ3RGLGNBQWMsQ0FBRSxhQUFjLENBQUMsU0FBUyxDQUFDLGVBQWUsTUFBTTs7O29CQUdsRSxHQUFHLDBDQUEwQyxZQUFXO3dCQUNwRCxNQUFNLGdDQUFnQyxvQkFBb0IsSUFBSSxZQUFZLE9BQU87d0JBQ2pGLGNBQWMsSUFBSSxJQUFJLElBQUk7OztvQkFHOUIsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsTUFBTSxnQ0FBZ0Msb0JBQW9CLElBQUksWUFBWSxNQUFNO3dCQUNoRixjQUFjLElBQUksSUFBSSxJQUFJOzs7b0JBRzlCLEdBQUcsc0RBQXNELFlBQVc7d0JBQ2hFLHlCQUF5QixvQkFBb0I7d0JBQzdDLGNBQWMsQ0FBRSxhQUFjLENBQUMsU0FBUyxJQUFJLE1BQU07Ozs7Z0JBSzFELFNBQVMscUJBQXFCLFlBQVc7b0JBQ3JDLEdBQUcseUJBQXlCLFlBQVc7d0JBQ25DLE9BQU8seUJBQXlCLHNCQUFzQixRQUFROzs7b0JBR2xFLEdBQUcsbUJBQW1CLFlBQVc7d0JBQzdCLE9BQU8seUJBQXlCLHNCQUFzQixRQUFRO3dCQUM5RCx5QkFBeUIsb0JBQW9CO3dCQUM3QyxPQUFPLHlCQUF5QixzQkFBc0IsUUFBUTs7O29CQUdsRSxHQUFHLGNBQWMsWUFBVzt3QkFDeEIseUJBQXlCLG9CQUFvQjt3QkFDN0MsT0FBTyx5QkFBeUIsc0JBQXNCLFFBQVE7d0JBQzlELHlCQUF5Qjt3QkFDekIsT0FBTyx5QkFBeUIsc0JBQXNCLFFBQVE7Ozs7Ozs7Ozs7Z0JBV3RFLFNBQVMsYUFBYSxZQUFXO29CQUM3QixJQUFJLFVBQVUsTUFBTTs7b0JBRXBCLFdBQVcsT0FBTyxVQUFTLFVBQVUsbUJBQW1CLG1CQUM3Qix1QkFBdUI7d0JBQzlDLElBQUksZUFBZSxzQkFBc0I7NEJBQ3JDLFdBQVcsc0JBQXNCOzRCQUNqQyxrQkFBa0Isc0JBQXNCOzt3QkFFNUMsV0FBVyxJQUFJLFNBQVM7d0JBQ3hCLE9BQU8sSUFBSSxrQkFBa0I7d0JBQzdCLGNBQWMsSUFBSSxrQkFBa0I7OztvQkFHeEMsU0FBUyxnQkFBZ0IsWUFBVzt3QkFDaEMsV0FBVyxZQUFXOzRCQUNsQixNQUFNLDBCQUEwQixpQkFBaUIsSUFBSSxZQUFZOzs7d0JBR3JFLEdBQUcsZ0RBQWdELFlBQVc7NEJBQzFELHlCQUF5QixtQkFBbUIsWUFBWTs0QkFDeEQsT0FBTyx5QkFBeUIsV0FBVyxRQUFROzs7d0JBR3ZELEdBQUcsb0NBQW9DLFlBQVc7NEJBQzlDLHlCQUF5QixtQkFBbUIsaUJBQWlCOzRCQUM3RCxPQUFPLHlCQUF5QixXQUFXLFFBQVE7Ozt3QkFHdkQsR0FBRyxnREFBZ0QsWUFBVzs0QkFDMUQseUJBQXlCLG1CQUFtQiw0QkFBNEI7NEJBQ3hFLE9BQU8seUJBQXlCLFdBQVcsUUFBUTs7OztvQkFJM0QsU0FBUyxjQUFjLFlBQVc7d0JBQzlCLFdBQVcsWUFBVzs0QkFDbEIsTUFBTSwwQkFBMEIsaUJBQWlCLElBQUksWUFBWTs7O3dCQUdyRSxHQUFHLDRDQUE0QyxZQUFXOzRCQUN0RCx5QkFBeUIsbUJBQW1CLFlBQVk7NEJBQ3hELE9BQU8seUJBQXlCLFdBQVcsUUFBUTs7O3dCQUd2RCxHQUFHLG9DQUFvQyxZQUFXOzRCQUM5Qyx5QkFBeUIsbUJBQW1CLGlCQUFpQjs0QkFDN0QsT0FBTyx5QkFBeUIsV0FBVyxRQUFROzs7d0JBR3ZELEdBQUcsZ0RBQWdELFlBQVc7NEJBQzFELHlCQUF5QixtQkFBbUIsNEJBQTRCOzRCQUN4RSxPQUFPLHlCQUF5QixXQUFXLFFBQVE7Ozs7Ozs7Ozs7O2dCQVcvRCxTQUFTLHlCQUF5QixZQUFXO29CQUN6QyxJQUFJLGFBQWE7b0JBQ2pCLElBQUksYUFBYTt3QkFDYixZQUFhO3dCQUNiLGFBQWM7d0JBQ2QsVUFBVzt3QkFDWCxZQUFhOzs7b0JBR2pCLElBQUksYUFBYTt3QkFDYixZQUFhO3dCQUNiLGFBQWM7d0JBQ2QsVUFBVzt3QkFDWCxZQUFhOzs7b0JBR2pCLElBQUksc0JBQXNCLHdCQUF3QixhQUFhO3dCQUMzRCxXQUFXO3dCQUNQLE9BQU87d0JBQ1AsU0FBUyxDQUNMOzRCQUNJLGNBQWUsV0FBVzs0QkFDMUIsZUFBZ0IsV0FBVzs0QkFDM0IsWUFBYSxXQUFXOzRCQUN4QixjQUFlLFdBQVc7MkJBRTlCOzRCQUNJLGNBQWUsV0FBVzs0QkFDMUIsZUFBZ0IsV0FBVzs0QkFDM0IsWUFBYSxXQUFXOzRCQUN4QixjQUFlLFdBQVc7Ozt3QkFJdEM7Ozs7Ozs7Ozs7b0JBVUosU0FBUyxhQUFhLFNBQVMsZUFBZTt3QkFDMUMsSUFBSSxRQUFRLFlBQVksZ0JBQWdCOzRCQUNwQyxnQkFBZ0I7O3dCQUVwQixPQUFPLFNBQVM7d0JBQ2hCLFFBQVEsS0FBSyxVQUFTLFVBQVU7NEJBQzVCLE9BQU8sU0FBUyxLQUFLLE9BQU8sUUFBUTs0QkFDcEMsT0FBTyxTQUFTLEtBQUssUUFBUSxRQUFRLFFBQVE7OzRCQUU3QyxJQUFHLGtCQUFrQixHQUFHO2dDQUNwQixPQUFPLFNBQVMsS0FBSyxRQUFRLEdBQUcsWUFBWSxRQUFRLFdBQVc7Z0NBQy9ELE9BQU8sU0FBUyxLQUFLLFFBQVEsR0FBRyxVQUFVLFFBQVEsV0FBVztnQ0FDN0QsT0FBTyxTQUFTLEtBQUssUUFBUSxHQUFHLFlBQVksUUFBUSxXQUFXO2dDQUMvRCxPQUFPLFNBQVMsS0FBSyxRQUFRLEdBQUcsWUFBWSxRQUFRLFdBQVc7Z0NBQy9ELE9BQU8sU0FBUyxLQUFLLFFBQVEsR0FBRyxVQUFVLFFBQVEsV0FBVztnQ0FDN0QsT0FBTyxTQUFTLEtBQUssUUFBUSxHQUFHLFlBQVksUUFBUSxXQUFXOzs7OztvQkFLM0UsR0FBRyx1QkFBdUIsWUFBVzt3QkFDakMsYUFBYSxVQUFVLHFCQUNuQixRQUFRLEtBQUs7d0JBQ2pCLFVBQVUseUJBQXlCLG9CQUFvQjt3QkFDdkQsYUFBYTt3QkFDYixhQUFhOzs7Ozs7Ozs7O2dCQVlyQixTQUFTLHFCQUFxQixZQUFXO29CQUNyQyxJQUFJLFdBQVc7O29CQUVmLFdBQVcsT0FBTyxVQUFTLFVBQVUsdUJBQXVCO3dCQUN4RCxZQUFZLElBQUksU0FBUyxzQkFBc0I7d0JBQy9DLFlBQVksSUFBSSxTQUFTLHNCQUFzQjs7O29CQUduRCxHQUFHLGlEQUFpRCxZQUFXO3dCQUMzRCxPQUFPLHlCQUF5Qix1QkFBdUIsUUFBUTs7b0JBRW5FLEdBQUcsd0RBQXdELFlBQVc7d0JBQ2xFLHlCQUF5QixtQkFBbUIsWUFBWTt3QkFDeEQsT0FBTyx5QkFBeUIsdUJBQXVCLFFBQVE7O29CQUVuRSxHQUFHLHlEQUF5RCxZQUFXO3dCQUNuRSx5QkFBeUIsbUJBQW1CLFlBQVk7d0JBQ3hELHlCQUF5QixtQkFBbUIsWUFBWTt3QkFDeEQsT0FBTyx5QkFBeUIsdUJBQXVCLFFBQVE7Ozs7Z0JBSXZFLFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLDJDQUEyQyxZQUFXO3dCQUNyRCxPQUFPLHlCQUF5QixpQkFBaUIsUUFBUTs7OztnQkFJakUsU0FBUyx1QkFBdUIsWUFBVztvQkFDdkMsR0FBRyxvREFBb0QsWUFBVzt3QkFDOUQsT0FBTyx5QkFBeUIseUJBQXlCLFFBQVE7OztvQkFHckUsR0FBRyxzREFBc0QsWUFBVzt3QkFDaEUsT0FBTyx5QkFBeUIsMkJBQTJCLFFBQVE7Ozs7Z0JBSTNFLFNBQVMsV0FBVyxZQUFXO29CQUMzQixHQUFHLGtDQUFrQyxZQUFXO3dCQUM1QyxJQUFJLGFBQWEsQ0FDVCxpQkFDQSxZQUNBLDZCQUNBLHNCQUNBLHlCQUNBLGNBQ0E7NEJBRUosZ0JBQWdCLENBQ1osSUFBSSxjQUFjLHdCQUF3QiwyQkFDMUMsTUFDQSxJQUFJLGFBQ0osSUFBSSxhQUNKLElBQUksYUFDSixXQUNBOzRCQUVKLGFBQWEsQ0FDVCxFQUFDLGtEQUFrRCxVQUNuRCxRQUNBLEVBQUMsNkJBQTZCLDRCQUM5QixFQUFDLDZCQUE2Qiw0QkFDOUIsRUFBQyw2QkFBNkIsNEJBQzlCLG9CQUNBOzRCQUVKOzt3QkFFSixLQUFJLElBQUksR0FBRyxJQUFJLFdBQVcsUUFBUSxLQUFLOzRCQUNuQyx5QkFBeUIsV0FBVyxNQUFNLFdBQVc7Ozt3QkFHekQseUJBQXlCOzt3QkFFekIsS0FBSSxJQUFJLEdBQUcsSUFBSSxXQUFXLFFBQVEsS0FBSzs0QkFDbkMsT0FBTyx5QkFBeUIsV0FBVyxLQUFLLFFBQVEsY0FBYzs7Ozs7OztHQXhCbkYiLCJmaWxlIjoiYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgYWNjZXNzUmVxdWVzdE1vZHVsZSBmcm9tICdhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RNb2R1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgQWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLlxyXG4gKi9cclxuZGVzY3JpYmUoJ0FjY2Vzc1JlcXVlc3REYXRhU2VydmljZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBNQVhfUkVRVUVTVF9JREVOVElUSUVTID0gMyxcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZSxcclxuICAgICAgICAkaHR0cEJhY2tlbmQsIFNFQVJDSF9UWVBFX0tFWVdPUkQsIFBhZ2VTdGF0ZSwgQWNjZXNzUmVxdWVzdDtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvL1xyXG4gICAgLy8gR0xPQkFMIFNFVFVQXHJcbiAgICAvL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8vIFVzZSB0aGUgYWNjZXNzIHJlcXVlc3QgbW9kdWxlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8vIFNldHVwIHRoZSBkZXBlbmRlbmNpZXMuXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlXywgU1BfQ09ORklHX1NFUlZJQ0UsIF9hY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2VfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXyRodHRwQmFja2VuZF8sIF9TRUFSQ0hfVFlQRV9LRVlXT1JEXywgX1BhZ2VTdGF0ZV8sIF9BY2Nlc3NSZXF1ZXN0Xykge1xyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSA9IF9hY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2VfO1xyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZSA9IF9hY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2VfO1xyXG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xyXG4gICAgICAgIFNFQVJDSF9UWVBFX0tFWVdPUkQgPSBfU0VBUkNIX1RZUEVfS0VZV09SRF87XHJcbiAgICAgICAgUGFnZVN0YXRlID0gX1BhZ2VTdGF0ZV87XHJcbiAgICAgICAgQWNjZXNzUmVxdWVzdCA9IF9BY2Nlc3NSZXF1ZXN0XztcclxuXHJcbiAgICAgICAgU2FpbFBvaW50LmNvbmZpZ0RhdGEgPSB7fTtcclxuICAgICAgICBTYWlsUG9pbnQuY29uZmlnRGF0YVtTUF9DT05GSUdfU0VSVklDRS5BQ0NFU1NfUkVRVUVTVF9NQVhfSURFTlRJVFlfU0VMRUNUXSA9IE1BWF9SRVFVRVNUX0lERU5USVRJRVM7XHJcbiAgICAgICAgU2FpbFBvaW50LmNvbmZpZ0RhdGFbU1BfQ09ORklHX1NFUlZJQ0UuVVNFUl9BQ0NFU1NfQ09ORklHU10gPSB7XHJcbiAgICAgICAgICAgIGFjdGlvblJlcXVlc3RBY2Nlc3NEZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICBhbGxvd090aGVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhbGxvd1NlbGY6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0J1bGs6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgUmVxdWVzdEFjY2Vzczoge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dPdGhlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhbGxvd1NlbGY6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0J1bGs6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KSk7XHJcblxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vXHJcbiAgICAvLyBQQUdFIFNUQVRFIFRFU1RTXHJcbiAgICAvL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGl0KCdzdGFydHMgd2l0aCBkZWZhdWx0IHBhZ2Ugc3RhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnNlbGVjdElkZW50aXRpZXNQYWdlU3RhdGUpLm5vdC50b0JlTnVsbCgpO1xyXG4gICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuYWRkQWNjZXNzUGFnZVN0YXRlKS5ub3QudG9CZU51bGwoKTtcclxuICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnJlbW92ZUFjY2Vzc1BhZ2VTdGF0ZSkubm90LnRvQmVOdWxsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCAoJ3Nob3VsZCBjYWxsIHJlc2V0Q3VycmVudFBhZ2UgZnJvbSByZXNldE1hbmFnZUFjY2Vzc1BhZ2luZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5hZGRBY2Nlc3NQYWdlU3RhdGUucGFnaW5nRGF0YSwgJ3Jlc2V0Q3VycmVudFBhZ2UnKTtcclxuICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UucmVtb3ZlQWNjZXNzUGFnZVN0YXRlLnBhZ2luZ0RhdGEsICdyZXNldEN1cnJlbnRQYWdlJyk7XHJcbiAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnJlc2V0TWFuYWdlQWNjZXNzUGFnaW5nKCk7XHJcbiAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5hZGRBY2Nlc3NQYWdlU3RhdGUucGFnaW5nRGF0YS5yZXNldEN1cnJlbnRQYWdlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5yZW1vdmVBY2Nlc3NQYWdlU3RhdGUucGFnaW5nRGF0YS5yZXNldEN1cnJlbnRQYWdlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy9cclxuICAgIC8vIFNFQVJDSCBUWVBFIFRFU1RTXHJcbiAgICAvL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGRlc2NyaWJlKCdzZWFyY2ggdHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdkZWZhdWx0cyB0byBrZXl3b3JkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0U2VhcmNoVHlwZSgpKS50b0VxdWFsKFNFQVJDSF9UWVBFX0tFWVdPUkQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FuIGJlIGNoYW5nZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG5ld1R5cGUgPSAncm90dGVuIG1vbGR5IGJvbG9nbmEnO1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2Uuc2V0U2VhcmNoVHlwZShuZXdUeXBlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRTZWFyY2hUeXBlKCkpLnRvRXF1YWwobmV3VHlwZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy9cclxuICAgIC8vIFRBQiBTVEFURSBURVNUU1xyXG4gICAgLy9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBkZXNjcmliZSgnbWFuYWdlIGFjY2VzcyB0YWInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZXN0IHRoYXQgdGhlIE1hbmFnZSBBY2Nlc3MgdGFiIGlzIGVuYWJsZWQvZGlzYWJsZWQgYmFzZWQgb24gdGhlIGdpdmVuXHJcbiAgICAgICAgICogaWRlbnRpdGllcyBoYXZpbmcgYmVlbiBzZWxlY3RlZC5cclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgdGVzdE1hbmFnZUFjY2Vzc1RhYiA9IGZ1bmN0aW9uKGlkZW50aXRpZXMsIGVuYWJsZWQsIHRlc3RHZXRJZGVudGl0aWVzLCBkaXNhYmxlSW50ZXJmYWNlKSB7XHJcbiAgICAgICAgICAgIHZhciBtYW5hZ2VBY2Nlc3NFbmFibGVkO1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0SWRlbnRpdGllcycpLmFuZC5yZXR1cm5WYWx1ZShpZGVudGl0aWVzKTtcclxuICAgICAgICAgICAgaWYgKGRpc2FibGVJbnRlcmZhY2UpIHtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5zZXRJbnRlcmZhY2VFbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYW5hZ2VBY2Nlc3NFbmFibGVkID0gYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmlzTWFuYWdlQWNjZXNzVGFiRW5hYmxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFuYWdlQWNjZXNzRW5hYmxlZCkudG9FcXVhbChlbmFibGVkKTtcclxuICAgICAgICAgICAgaWYodGVzdEdldElkZW50aXRpZXMpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmdldElkZW50aXRpZXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiBubyBpZGVudGl0aWVzIGFyZSBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0ZXN0TWFuYWdlQWNjZXNzVGFiKFtdLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZW5hYmxlZCBpZiBvbmUgaWRlbnRpdHkgaXMgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdE1hbmFnZUFjY2Vzc1RhYihbICdpZGVudGl0eScgXSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZW5hYmxlZCBpZiBtdWx0aXBsZSBpZGVudGl0aWVzIGFyZSBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0ZXN0TWFuYWdlQWNjZXNzVGFiKFsgJ2lkZW50aXR5JywgJ2lkZW50aXR5IGFsc28nXSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZGlzYWJsZWQgaWYgaW50ZXJmYWNlRW5hYmxlZCBpcyBmYWxzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0ZXN0TWFuYWdlQWNjZXNzVGFiKFsgJ2lkZW50aXR5J10sIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiB0aGVyZSBpcyBubyBkZWVwIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UsICdpc0RlZXBMaW5rTWFuYWdlQWNjZXNzJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgdGVzdE1hbmFnZUFjY2Vzc1RhYihbXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBlbmFibGVkIGlmIHRoZXJlIGlzIGEgZGVlcCBmaWx0ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLCAnaXNEZWVwTGlua01hbmFnZUFjY2VzcycpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgdGVzdE1hbmFnZUFjY2Vzc1RhYihbXSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdyZW1vdmUgYWNjZXNzIHRhYicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3QgdGhhdCB0aGUgUmVtb3ZlIEFjY2VzcyB0YWIgaXMgZW5hYmxlZC9kaXNhYmxlZCBiYXNlZCBvbiB0aGUgZ2l2ZW5cclxuICAgICAgICAgKiBpZGVudGl0aWVzIGhhdmluZyBiZWVuIHNlbGVjdGVkLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciB0ZXN0UmVtb3ZlQWNjZXNzVGFiID0gZnVuY3Rpb24oaWRlbnRpdGllcywgZW5hYmxlZCwgdGVzdEdldElkZW50aXRpZXMsIGRpc2FibGVJbnRlcmZhY2UpIHtcclxuICAgICAgICAgICAgdmFyIHRhYkVuYWJsZWQ7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdnZXRJZGVudGl0aWVzJykuYW5kLnJldHVyblZhbHVlKGlkZW50aXRpZXMpO1xyXG4gICAgICAgICAgICBpZiAoZGlzYWJsZUludGVyZmFjZSkge1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnNldEludGVyZmFjZUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhYkVuYWJsZWQgPSBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuaXNSZW1vdmVBY2Nlc3NUYWJFbmFibGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJFbmFibGVkKS50b0VxdWFsKGVuYWJsZWQpO1xyXG4gICAgICAgICAgICBpZiAodGVzdEdldElkZW50aXRpZXMpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmdldElkZW50aXRpZXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiBubyBpZGVudGl0aWVzIGFyZSBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0ZXN0UmVtb3ZlQWNjZXNzVGFiKFtdLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZW5hYmxlZCBpZiBvbmUgaWRlbnRpdHkgaXMgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdFJlbW92ZUFjY2Vzc1RhYihbICdpZGVudGl0eScgXSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZGlzYWJsZWQgaWYgbXVsdGlwbGUgaWRlbnRpdGllcyBhcmUgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdFJlbW92ZUFjY2Vzc1RhYihbICdpZGVudGl0eScsICdpZGVudGl0eSBhbHNvJ10sIGZhbHNlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiBpbnRlcmZhY2VFbmFibGVkIGlzIGZhbHNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRlc3RSZW1vdmVBY2Nlc3NUYWIoWyAnaWRlbnRpdHkgYWdhaW4nXSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2VsZWN0IHVzZXJzIHRhYicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3QgdGhhdCB0aGUgU2VsZWN0IFVzZXJzIHRhYiBpcyBlbmFibGVkL2Rpc2FibGVkIGJhc2VkIG9uIHRoZSBpbnRlcmZhY2UgZW5hYmxlZCBmbGFnXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIHRlc3RTZWxlY3RVc2Vyc1RhYiA9IGZ1bmN0aW9uKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdmFyIHRhYkVuYWJsZWQ7XHJcbiAgICAgICAgICAgIHRhYkVuYWJsZWQgPSBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuaXNTZWxlY3RVc2Vyc1RhYkVuYWJsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRhYkVuYWJsZWQpLnRvRXF1YWwoZW5hYmxlZCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIGRpc2FibGVkIGlmIGludGVyZmFjZUVuYWJsZWQgaXMgZmFsc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnNldEludGVyZmFjZUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U2VsZWN0VXNlcnNUYWIoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZW5hYmxlZCBpZiBpbnRlcmZhY2VFbmFibGVkIGlzIHNldCBmYWxzZSB0aGVuIGNsZWFyZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnNldEludGVyZmFjZUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgdGVzdFNlbGVjdFVzZXJzVGFiKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdyZXZpZXcgdGFiJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCB0aGF0IHRoZSBSZXZpZXcgdGFiIGlzIGVuYWJsZWQvZGlzYWJsZWQgYmFzZWQgb24gdGhlIGdpdmVuIGlkZW50aXRpZXNcclxuICAgICAgICAgKiBhbmQgaXRlbXMgaGF2aW5nIGJlZW4gc2VsZWN0ZWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIHRlc3RSZXZpZXdUYWIgPSBmdW5jdGlvbihpZGVudGl0aWVzLCBhZGRJdGVtcywgcmVtb3ZlSXRlbXMsIGVuYWJsZWQsIHRlc3RHZXRJZGVudGl0aWVzKSB7XHJcbiAgICAgICAgICAgIHZhciBtYW5hZ2VBY2Nlc3NFbmFibGVkO1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0SWRlbnRpdGllcycpLmFuZC5yZXR1cm5WYWx1ZShpZGVudGl0aWVzKTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldFJlcXVlc3RlZEl0ZW1zJykuYW5kLnJldHVyblZhbHVlKGFkZEl0ZW1zKTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldFJlbW92ZWRDdXJyZW50QWNjZXNzSXRlbXMnKS5cclxuICAgICAgICAgICAgICAgIGFuZC5yZXR1cm5WYWx1ZShyZW1vdmVJdGVtcyk7XHJcbiAgICAgICAgICAgIG1hbmFnZUFjY2Vzc0VuYWJsZWQgPSBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuaXNSZXZpZXdUYWJFbmFibGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VBY2Nlc3NFbmFibGVkKS50b0VxdWFsKGVuYWJsZWQpO1xyXG4gICAgICAgICAgICBpZih0ZXN0R2V0SWRlbnRpdGllcykge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuZ2V0SWRlbnRpdGllcykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIGRpc2FibGVkIGlmIG5vIGlkZW50aXRpZXMgb3IgaXRlbXMgYXJlIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRlc3RSZXZpZXdUYWIoW10sIFtdLCBbXSwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZGlzYWJsZWQgaWYgb25lIGlkZW50aXR5IGFuZCBubyBpdGVtcyBhcmUgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdFJldmlld1RhYihbICdpZGVudGl0eScgXSwgW10sIFtdLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiBubyBpZGVudGl0aWVzIGFuZCBvbmUgaXRlbSBpcyBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0ZXN0UmV2aWV3VGFiKFtdLCBbICdpdGVtJyBdLCBbXSwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZW5hYmxlZCBpZiBvbmUgaWRlbnRpdHkgYW5kIG9uZSBpdGVtIGlzIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRlc3RSZXZpZXdUYWIoWyAnaWRlbnRpdHknIF0sIFsnaXRlbSddLCBbXSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBlbmFibGVkIGlmIG9uZSBpZGVudGl0eSBhbmQgb25lIGl0ZW0gZm9yIHJlbW92YWwgaXMgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdFJldmlld1RhYihbICdpZGVudGl0eScgXSwgW10sIFsncmVtb3ZlSXRlbSddLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIGVuYWJsZWQgaWYgb25lIGlkZW50aXR5IGFuZCBvbmUgaXRlbSBmb3IgYWRkIGFuZCByZW1vdmFsIGFyZSBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0ZXN0UmV2aWV3VGFiKFsgJ2lkZW50aXR5JyBdLCBbJ2l0ZW0nXSwgWydyZW1vdmVJdGVtJ10sIHRydWUsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZGlzYWJsZWQgaWYgdGhlcmUgaXMgbm8gZGVlcCBmaWx0ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLCAnaXNEZWVwTGlua1JldmlldycpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRlc3RSZXZpZXdUYWIoW10sIFtdLCBbXSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZW5hYmxlZCBpZiB0aGVyZSBpcyBhIGRlZXAgZmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZSwgJ2lzRGVlcExpbmtSZXZpZXcnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0UmV2aWV3VGFiKFtdLCBbXSwgW10sIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZW5hYmxlZCBldmVuIGlmIGludGVyZmFjZSBlbmFibGVkIGZsYWcgaXMgZmFsc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnNldEludGVyZmFjZUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0UmV2aWV3VGFiKFsgJ2lkZW50aXR5JyBdLCBbJ2l0ZW0nXSwgW10sIHRydWUsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpbnRlcmZhY2UgZW5hYmxlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdpcyBlbmFibGVkIGJ5IGRlZmF1bHQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5pc0ludGVyZmFjZUVuYWJsZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIHNldCBkaXNhYmxlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmlzSW50ZXJmYWNlRW5hYmxlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2Uuc2V0SW50ZXJmYWNlRW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuaXNJbnRlcmZhY2VFbmFibGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgY2xlYXJlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2Uuc2V0SW50ZXJmYWNlRW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuaXNJbnRlcmZhY2VFbmFibGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5pc0ludGVyZmFjZUVuYWJsZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvL1xyXG4gICAgLy8gRElSVFkgQ0hFQ0tJTkdcclxuICAgIC8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzRGlydHkoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpZGVudGl0eSwgaXRlbSwgcmVtb3ZlZEl0ZW07XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKElkZW50aXR5LCBBY2Nlc3NSZXF1ZXN0SXRlbSwgQ3VycmVudEFjY2Vzc0l0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdFRlc3REYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBpZGVudGl0eURhdGEgPSBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFkxLFxyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEgPSBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuUk9MRSxcclxuICAgICAgICAgICAgICAgIHJlbW92ZWRJdGVtRGF0YSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5DVVJSRU5UX0FDQ0VTU19ST0xFO1xyXG5cclxuICAgICAgICAgICAgaWRlbnRpdHkgPSBuZXcgSWRlbnRpdHkoaWRlbnRpdHlEYXRhKTtcclxuICAgICAgICAgICAgaXRlbSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShpdGVtRGF0YSk7XHJcbiAgICAgICAgICAgIHJlbW92ZWRJdGVtID0gbmV3IEN1cnJlbnRBY2Nlc3NJdGVtKHJlbW92ZWRJdGVtRGF0YSk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnc2VsZi1zZXJ2aWNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsICdpc1NlbGZTZXJ2aWNlJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdpcyBub3QgZGlydHkgaWYgb25seSBhbiBpZGVudGl0eSBpcyBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRJZGVudGl0eShpZGVudGl0eSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmlzRGlydHkoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2lzIGRpcnR5IGlmIGFuIGl0ZW0gaXMgcmVxdWVzdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZFJlcXVlc3RlZEl0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmlzRGlydHkoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnaXMgZGlydHkgaWYgYW4gaXRlbSBpcyByZXF1ZXN0ZWQgZm9yIHJlbW92YWwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkUmVtb3ZlZEN1cnJlbnRBY2Nlc3NJdGVtKHJlbW92ZWRJdGVtKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuaXNEaXJ0eSgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2Zvci1vdGhlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ2lzU2VsZlNlcnZpY2UnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdpcyBkaXJ0eSBpZiBvbmx5IGFuIGlkZW50aXR5IGlzIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZElkZW50aXR5KGlkZW50aXR5KTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuaXNEaXJ0eSgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdpcyBkaXJ0eSBpZiBhbiBpdGVtIGlzIHJlcXVlc3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRSZXF1ZXN0ZWRJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5pc0RpcnR5KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2lzIGRpcnR5IGlmIGFuIGl0ZW0gaXMgcmVxdWVzdGVkIGZvciByZW1vdmFsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZFJlbW92ZWRDdXJyZW50QWNjZXNzSXRlbShyZW1vdmVkSXRlbSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmlzRGlydHkoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy9cclxuICAgIC8vIFBPTElDWSBWSU9MQVRJT05TIFRFU1RTXHJcbiAgICAvL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0IHBvbGljeSB2aW9sYXRpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHdvcmtJdGVtSWQgPSAnMmM5MDhjZDU0YmE5MmZkZTAxNGJiZGJlYWNiZjA0ZDInO1xyXG4gICAgICAgIHZhciB2aW9sYXRpb24xID0ge1xyXG4gICAgICAgICAgICBwb2xpY3lOYW1lIDogJ1NPRCBQb2xpY3knLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6ICdBY2NvdW50cyBSZWNlaXZhYmxlIGFuZCBBY2NvdW50cyBQYXlhYmxlIHNob3VsZCBub3QgYmUgY29tYmluZWQuJyxcclxuICAgICAgICAgICAgcnVsZU5hbWUgOiAnQWNjb3VudGluZyBTT0QtNzYyJyxcclxuICAgICAgICAgICAgd29ya2l0ZW1JZCA6IHdvcmtJdGVtSWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgdmlvbGF0aW9uMiA9IHtcclxuICAgICAgICAgICAgcG9saWN5TmFtZSA6ICdTT0QgUG9saWN5IFRvbycsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogJ0FjY291bnRzIFJlY2VpdmFibGUgYW5kIEFjY291bnRzIFBheWFibGUgc2hvdWxkIG5vdCBiZSBjb21iaW5lZHh4eHh4eC4nLFxyXG4gICAgICAgICAgICBydWxlTmFtZSA6ICdBY2NvdW50aW5nIFNPRC03NjI5OTk5OTknLFxyXG4gICAgICAgICAgICB3b3JraXRlbUlkIDogd29ya0l0ZW1JZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciB2aW9sYXRpb25SZXZpZXdzVXJsID0gJy91aS9yZXN0L3dvcmtJdGVtcy8nICsgd29ya0l0ZW1JZCArICcvdmlvbGF0aW9uUmV2aWV3cycsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDIsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAncG9saWN5TmFtZScgOiB2aW9sYXRpb24xLnBvbGljeU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicgOiB2aW9sYXRpb24xLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAncnVsZU5hbWUnIDogdmlvbGF0aW9uMS5ydWxlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3dvcmtpdGVtSWQnIDogdmlvbGF0aW9uMS53b3JraXRlbUlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdwb2xpY3lOYW1lJyA6IHZpb2xhdGlvbjIucG9saWN5TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyA6IHZpb2xhdGlvbjIuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdydWxlTmFtZScgOiB2aW9sYXRpb24yLnJ1bGVOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnd29ya2l0ZW1JZCcgOiB2aW9sYXRpb24yLndvcmtpdGVtSWRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByb21pc2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZlcmlmeSB0aGF0IHRoZSBnaXZlbiByZXN1bHQgcHJvbWlzZSBjb250YWlucyB0aGUgZXhwZWN0ZWQgZGF0YS5cclxuICAgICAgICAgKiBZb3UgbXVzdCBjYWxsICRodHRwQmFja2VuZC5mbHVzaCgpIGFmdGVyIHRoaXMgdG8gZ2V0IHRoZSBwcm9taXNlIHRvXHJcbiAgICAgICAgICogYmUgcmVzb2x2ZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gZXhwZWN0ZWRDb3VudCAgVGhlIGV4cGVjdGVkIG51bWJlciBvZiBpZGVudGl0aWVzIGluXHJcbiAgICAgICAgICogICB0aGUgcmVzcG9uc2UuICBJZiBub3Qgc3BlY2lmaWVkLCBkZWZhdWx0IHRvIDIuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdmVyaWZ5UmVzdWx0KHByb21pc2UsIGV4cGVjdGVkQ291bnQpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoZXhwZWN0ZWRDb3VudCkpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdGVkQ291bnQgPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEuY291bnQpLnRvRXF1YWwoZXhwZWN0ZWRDb3VudCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzLmxlbmd0aCkudG9FcXVhbChleHBlY3RlZENvdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihleHBlY3RlZENvdW50ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1swXS5wb2xpY3lOYW1lKS50b0VxdWFsKHZpb2xhdGlvbjEucG9saWN5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1swXS5ydWxlTmFtZSkudG9FcXVhbCh2aW9sYXRpb24xLnJ1bGVOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLndvcmtpdGVtSWQpLnRvRXF1YWwodmlvbGF0aW9uMS53b3JraXRlbUlkKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzFdLnBvbGljeU5hbWUpLnRvRXF1YWwodmlvbGF0aW9uMi5wb2xpY3lOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzFdLnJ1bGVOYW1lKS50b0VxdWFsKHZpb2xhdGlvbjIucnVsZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLm9iamVjdHNbMV0ud29ya2l0ZW1JZCkudG9FcXVhbCh2aW9sYXRpb24yLndvcmtpdGVtSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdnZXQgc29tZSB2aW9sYXRpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodmlvbGF0aW9uUmV2aWV3c1VybCkuXHJcbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldFBvbGljeVZpb2xhdGlvbnMod29ya0l0ZW1JZCk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvL1xyXG4gICAgLy8gTUlTQ0VMTEFORU9VUyBDT05GSUcgU1RBVEUgVEVTVFNcclxuICAgIC8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaW5nbGVVc2VyUmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpZGVudGl0eTEsIGlkZW50aXR5MjtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oSWRlbnRpdHksIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSkge1xyXG4gICAgICAgICAgICBpZGVudGl0eTEgPSBuZXcgSWRlbnRpdHkoYWNjZXNzUmVxdWVzdFRlc3REYXRhLklERU5USVRZMSk7XHJcbiAgICAgICAgICAgIGlkZW50aXR5MiA9IG5ldyBJZGVudGl0eShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFkyKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBkZWZhdWx0IGlzU2luZ2xlVXNlclJlcXVlc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5pc1NpbmdsZVVzZXJSZXF1ZXN0KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIHNpbmdsZSBpZGVudGl0eSBpc1NpbmdsZVVzZXJSZXF1ZXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkSWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5pc1NpbmdsZVVzZXJSZXF1ZXN0KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGRvdWJsZSBpZGVudGl0eSBpc1NpbmdsZVVzZXJSZXF1ZXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkSWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRJZGVudGl0eShpZGVudGl0eTIpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmlzU2luZ2xlVXNlclJlcXVlc3QoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2VsZlNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgZGVmYXVsdCBpc1NlbGZTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuaXNTZWxmU2VydmljZSgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdhbGxvdyByZXF1ZXN0IGZsYWdzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGRlZmF1bHQgYWxsb3cgcmVxdWVzdCBmb3Igc2VsZicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmlzQWxsb3dSZXF1ZXN0Rm9yU2VsZigpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGRlZmF1bHQgYWxsb3cgcmVxdWVzdCBmb3Igb3RoZXJzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuaXNBbGxvd1JlcXVlc3RGb3JPdGhlcnMoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnY2xlYXIoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgcmVzZXQgdG8gZGVmYXVsdCB2YWx1ZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2FjY2Vzc1JlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICdwcmlvcml0eScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3NlbGVjdElkZW50aXRpZXNQYWdlU3RhdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdhZGRBY2Nlc3NQYWdlU3RhdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdyZW1vdmVBY2Nlc3NQYWdlU3RhdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdzZWFyY2hUeXBlJyxcclxuICAgICAgICAgICAgICAgICAgICAnd29ya0l0ZW1JZCdcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBBY2Nlc3NSZXF1ZXN0KE1BWF9SRVFVRVNUX0lERU5USVRJRVMsIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSksXHJcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUGFnZVN0YXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFBhZ2VTdGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBQYWdlU3RhdGUoKSxcclxuICAgICAgICAgICAgICAgICAgICAnS2V5d29yZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgdGVzdFZhbHVlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICB7J0FUaGluZ1RoYXRXaWxsQmVPdmVyd3JpdHRlbkJ5QU5ld0FjY2Vzc1JlcXVlc3QnOiAneWVhaCd9LFxyXG4gICAgICAgICAgICAgICAgICAgICdoaWdoJyxcclxuICAgICAgICAgICAgICAgICAgICB7J0FUaGluZ1RoYXRJc05vdEFQYWdlU3RhdGUnOiAndGhpcyBpcyBnZXR0aW5nIGJvcmluZyd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnQVRoaW5nVGhhdElzTm90QVBhZ2VTdGF0ZSc6ICd0aGlzIGlzIGdldHRpbmcgYm9yaW5nJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeydBVGhpbmdUaGF0SXNOb3RBUGFnZVN0YXRlJzogJ3RoaXMgaXMgZ2V0dGluZyBib3JpbmcnfSxcclxuICAgICAgICAgICAgICAgICAgICAnbm90S2V5d29yZFNlYXJjaCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3dvcmtpdGVtMSdcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBpO1xyXG5cclxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlW3Byb3BlcnRpZXNbaV1dID0gdGVzdFZhbHVlc1tpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlW3Byb3BlcnRpZXNbaV1dKS50b0VxdWFsKGRlZmF1bHRWYWx1ZXNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
