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
             * Tests for the CurrentAccessItemsCtrl.
             */
            describe('CurrentAccessItemsCtrl', function () {

                var $controller, testService, accessRequestDataService, accessRequestItemsService, accessRequestFilterService, CurrentAccessItem, PageState, $rootScope, ctrl, item, identity, configServiceMock, deferred, accessRequestTestData;

                // Load the test module to get the testService and access request module.
                beforeEach(module(testModule, accessRequestModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 11 */
                beforeEach(inject(function (_accessRequestDataService_, _accessRequestItemsService_, _CurrentAccessItem_, Identity, _PageState_, _testService_, _$controller_, _$rootScope_, _accessRequestFilterService_, _accessRequestTestData_, $q) {

                    // Save the services.
                    accessRequestDataService = _accessRequestDataService_;
                    accessRequestItemsService = _accessRequestItemsService_;
                    accessRequestFilterService = _accessRequestFilterService_;
                    CurrentAccessItem = _CurrentAccessItem_;
                    $controller = _$controller_;
                    testService = _testService_;
                    PageState = _PageState_;
                    $rootScope = _$rootScope_;
                    accessRequestTestData = _accessRequestTestData_;
                    deferred = $q.defer();

                    spyOn(accessRequestFilterService, 'getCurrentAccessFilters').and.returnValue(deferred.promise);

                    // Create an item and identity to test with.
                    item = new CurrentAccessItem(accessRequestTestData.CURRENT_ACCESS_ROLE);
                    identity = new Identity(accessRequestTestData.IDENTITY1);

                    // Mock out the identity service to return a single item.
                    accessRequestItemsService.getCurrentAccessItems = testService.createPromiseSpy(false, {
                        status: 200,
                        data: {
                            count: 1,
                            objects: [item]
                        }
                    });

                    // Mock out the config service
                    configServiceMock = {
                        getColumnConfigEntries: testService.createPromiseSpy(false, {
                            status: 200,
                            data: {}
                        }, {})
                    };

                    // Mock out the data service to spy on item selection changes.
                    spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities').and.returnValue([identity]);
                    spyOn(accessRequestDataService.getAccessRequest(), 'addRemovedCurrentAccessItem').and.returnValue(true);
                    spyOn(accessRequestDataService.getAccessRequest(), 'removeRemovedCurrentAccessItem').and.returnValue(true);

                    // Create the controller to test with.
                    ctrl = $controller('CurrentAccessItemsCtrl', {
                        accessRequestItemsService: accessRequestItemsService,
                        accessRequestDataService: accessRequestDataService,
                        configService: configServiceMock
                    });

                    // Run a digest cycle to resolve the promise.
                    $rootScope.$apply();
                }));

                it('fetches items when loaded', function () {
                    // The start and limit are hard-coded.
                    expect(accessRequestItemsService.getCurrentAccessItems).toHaveBeenCalledWith(undefined, {}, 0, 12, accessRequestDataService.getAccessRequest().getRequesteeId());
                });

                it('fetches filters when loaded', function () {
                    expect(accessRequestFilterService.getCurrentAccessFilters).toHaveBeenCalledWith(accessRequestDataService.getAccessRequest().getRequesteeId());
                });

                it('adds items when selected', function () {
                    ctrl.selectItem(item);
                    expect(accessRequestDataService.getAccessRequest().addRemovedCurrentAccessItem).toHaveBeenCalledWith(item);
                });

                it('removes item when deselected', function () {
                    ctrl.deselectItem(item);
                    expect(accessRequestDataService.getAccessRequest().removeRemovedCurrentAccessItem).toHaveBeenCalledWith(item);
                });

                var testItemSelection = function (isSelected) {
                    var selected;
                    spyOn(accessRequestDataService.getAccessRequest(), 'hasRemovedCurrentAccessItem').and.returnValue(isSelected);
                    selected = ctrl.isItemSelected(item);
                    expect(accessRequestDataService.getAccessRequest().hasRemovedCurrentAccessItem).toHaveBeenCalledWith(item);
                    expect(selected).toEqual(isSelected);
                };

                it('says that an item is selected if added', function () {
                    testItemSelection(true);
                });

                it('says that an item is not selected if not added', function () {
                    testItemSelection(false);
                });

                describe('getRoleStatus', function () {
                    function createAccessItem(isRole, location) {
                        var itemConfig = {
                            accessType: isRole ? 'Role' : 'Entitlement'
                        };
                        if (location) {
                            itemConfig.roleLocation = location;
                        }
                        return new CurrentAccessItem(itemConfig);
                    }

                    it('should return detected key for detected roles', function () {
                        var accessItem = createAccessItem(true, 'detected');
                        expect(ctrl.getRoleStatus(accessItem)).toEqual('ui_access_request_current_access_detected');
                    });

                    it('should return assigned key for assigned roles', function () {
                        var accessItem = createAccessItem(true, 'assigned');
                        expect(ctrl.getRoleStatus(accessItem)).toEqual('ui_access_request_current_access_assigned');
                    });

                    it('should return requested key for requested for roles that are not detected or assigned', function () {
                        var accessItem = createAccessItem(true, 'requested');
                        expect(ctrl.getRoleStatus(accessItem)).toEqual('ui_access_request_current_access_requested');
                    });

                    it('should throw if not a role', function () {
                        var accessItem = createAccessItem(false);
                        expect(function () {
                            ctrl.getRoleStatus(accessItem);
                        }).toThrow();
                    });
                });

                /**
                 * Test to see if modal opens with CurrentAccessItemDialogCtrl
                 */
                describe('show item detail dialog', function () {
                    var AccessRequestItem, spModal;

                    beforeEach(inject(function (_AccessRequestItem_, _spModal_) {
                        AccessRequestItem = _AccessRequestItem_;
                        spModal = _spModal_;
                        spyOn(spModal, 'open');
                    }));

                    /**
                     * Make sure that an item is required.
                     */
                    it('explodes if no item is specified', function () {
                        expect(function () {
                            ctrl.showItemDetails(null);
                        }).toThrow();
                    });

                    /**
                     * Make sure showItemDetails() method opens the modal with the correct CurrentAccessItemDialogCtrl
                     */
                    it('opens the modal', function () {
                        var item = new AccessRequestItem(accessRequestTestData.ROLE);
                        ctrl.showItemDetails(item);

                        $rootScope.$apply();

                        expect(spModal.open).toHaveBeenCalled();
                        expect(spModal.open.calls.mostRecent().args[0].controller).toEqual('CurrentAccessItemDetailDialogCtrl as dialogCtrl');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQ3VycmVudEFjY2Vzc0l0ZW1zQ3RybFRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxzQkFBc0IsNEJBQTRCLFVBQVUsU0FBUztJQUF0Sjs7SUFHSSxJQUFJLHFCQUFxQjtJQUN6QixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjtXQUNoQyxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7Ozs7O1lBQTdCLFNBQVMsMEJBQTBCLFlBQVc7O2dCQUUxQyxJQUFJLGFBQWEsYUFDYiwwQkFBMEIsMkJBQTJCLDRCQUNyRCxtQkFBbUIsV0FBVyxZQUFZLE1BQU0sTUFBTSxVQUFVLG1CQUNoRSxVQUFVOzs7Z0JBSWQsV0FBVyxPQUFPLFlBQVk7Ozs7OztnQkFNOUIsV0FBVyxPQUFPLFVBQVMsNEJBQTRCLDZCQUM1QixxQkFBcUIsVUFBVSxhQUMvQixlQUFlLGVBQWUsY0FBYyw4QkFDNUMseUJBQXlCLElBQUk7OztvQkFHcEQsMkJBQTJCO29CQUMzQiw0QkFBNEI7b0JBQzVCLDZCQUE2QjtvQkFDN0Isb0JBQW9CO29CQUNwQixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsWUFBWTtvQkFDWixhQUFhO29CQUNiLHdCQUF3QjtvQkFDeEIsV0FBVyxHQUFHOztvQkFFZCxNQUFNLDRCQUE0QiwyQkFBMkIsSUFBSSxZQUFZLFNBQVM7OztvQkFHdEYsT0FBTyxJQUFJLGtCQUFrQixzQkFBc0I7b0JBQ25ELFdBQVcsSUFBSSxTQUFTLHNCQUFzQjs7O29CQUc5QywwQkFBMEIsd0JBQ3RCLFlBQVksaUJBQWlCLE9BQU87d0JBQ2hDLFFBQVE7d0JBQ1IsTUFBTTs0QkFDRixPQUFPOzRCQUNQLFNBQVMsQ0FBRTs7Ozs7b0JBS3ZCLG9CQUFvQjt3QkFD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dGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcclxuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcclxuaW1wb3J0ICcuL0FjY2Vzc1JlcXVlc3RUZXN0RGF0YSc7XHJcblxyXG4vKipcclxuICogVGVzdHMgZm9yIHRoZSBDdXJyZW50QWNjZXNzSXRlbXNDdHJsLlxyXG4gKi9cclxuZGVzY3JpYmUoJ0N1cnJlbnRBY2Nlc3NJdGVtc0N0cmwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgJGNvbnRyb2xsZXIsIHRlc3RTZXJ2aWNlLFxyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZSwgYWNjZXNzUmVxdWVzdEZpbHRlclNlcnZpY2UsXHJcbiAgICAgICAgQ3VycmVudEFjY2Vzc0l0ZW0sIFBhZ2VTdGF0ZSwgJHJvb3RTY29wZSwgY3RybCwgaXRlbSwgaWRlbnRpdHksIGNvbmZpZ1NlcnZpY2VNb2NrLFxyXG4gICAgICAgIGRlZmVycmVkLCBhY2Nlc3NSZXF1ZXN0VGVzdERhdGE7XHJcblxyXG5cclxuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UgYW5kIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIGFjY2Vzc1JlcXVlc3RNb2R1bGUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cclxuICAgICAqL1xyXG4gICAgLyoganNoaW50IG1heHBhcmFtczogMTEgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9hY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2VfLCBfYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQ3VycmVudEFjY2Vzc0l0ZW1fLCBJZGVudGl0eSwgX1BhZ2VTdGF0ZV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8sIF9hY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWNjZXNzUmVxdWVzdFRlc3REYXRhXywgJHEpIHtcclxuXHJcbiAgICAgICAgLy8gU2F2ZSB0aGUgc2VydmljZXMuXHJcbiAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3REYXRhU2VydmljZV87XHJcbiAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZSA9IF9hY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlXztcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZSA9IF9hY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZV87XHJcbiAgICAgICAgQ3VycmVudEFjY2Vzc0l0ZW0gPSBfQ3VycmVudEFjY2Vzc0l0ZW1fO1xyXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XHJcbiAgICAgICAgUGFnZVN0YXRlID0gX1BhZ2VTdGF0ZV87XHJcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEgPSBfYWNjZXNzUmVxdWVzdFRlc3REYXRhXztcclxuICAgICAgICBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLCAnZ2V0Q3VycmVudEFjY2Vzc0ZpbHRlcnMnKS5hbmQucmV0dXJuVmFsdWUoZGVmZXJyZWQucHJvbWlzZSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhbiBpdGVtIGFuZCBpZGVudGl0eSB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgaXRlbSA9IG5ldyBDdXJyZW50QWNjZXNzSXRlbShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuQ1VSUkVOVF9BQ0NFU1NfUk9MRSk7XHJcbiAgICAgICAgaWRlbnRpdHkgPSBuZXcgSWRlbnRpdHkoYWNjZXNzUmVxdWVzdFRlc3REYXRhLklERU5USVRZMSk7XHJcblxyXG4gICAgICAgIC8vIE1vY2sgb3V0IHRoZSBpZGVudGl0eSBzZXJ2aWNlIHRvIHJldHVybiBhIHNpbmdsZSBpdGVtLlxyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0Q3VycmVudEFjY2Vzc0l0ZW1zID1cclxuICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogWyBpdGVtIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1vY2sgb3V0IHRoZSBjb25maWcgc2VydmljZVxyXG4gICAgICAgIGNvbmZpZ1NlcnZpY2VNb2NrID0ge1xyXG4gICAgICAgICAgICBnZXRDb2x1bW5Db25maWdFbnRyaWVzOiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHt9XHJcbiAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIE1vY2sgb3V0IHRoZSBkYXRhIHNlcnZpY2UgdG8gc3B5IG9uIGl0ZW0gc2VsZWN0aW9uIGNoYW5nZXMuXHJcbiAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldElkZW50aXRpZXMnKS5hbmQucmV0dXJuVmFsdWUoWyBpZGVudGl0eSBdKTtcclxuICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnYWRkUmVtb3ZlZEN1cnJlbnRBY2Nlc3NJdGVtJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdyZW1vdmVSZW1vdmVkQ3VycmVudEFjY2Vzc0l0ZW0nKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdDdXJyZW50QWNjZXNzSXRlbXNDdHJsJywge1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlOiBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLFxyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2U6IGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSxcclxuICAgICAgICAgICAgY29uZmlnU2VydmljZTogY29uZmlnU2VydmljZU1vY2tcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUnVuIGEgZGlnZXN0IGN5Y2xlIHRvIHJlc29sdmUgdGhlIHByb21pc2UuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgIH0pKTtcclxuXHJcblxyXG4gICAgaXQoJ2ZldGNoZXMgaXRlbXMgd2hlbiBsb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBUaGUgc3RhcnQgYW5kIGxpbWl0IGFyZSBoYXJkLWNvZGVkLlxyXG4gICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEN1cnJlbnRBY2Nlc3NJdGVtcykuXHJcbiAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKHVuZGVmaW5lZCwge30sIDAsIDEyLCBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmdldFJlcXVlc3RlZUlkKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2ZldGNoZXMgZmlsdGVycyB3aGVuIGxvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZS5nZXRDdXJyZW50QWNjZXNzRmlsdGVycykuXHJcbiAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuZ2V0UmVxdWVzdGVlSWQoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnYWRkcyBpdGVtcyB3aGVuIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY3RybC5zZWxlY3RJdGVtKGl0ZW0pO1xyXG4gICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZFJlbW92ZWRDdXJyZW50QWNjZXNzSXRlbSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmVtb3ZlcyBpdGVtIHdoZW4gZGVzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGN0cmwuZGVzZWxlY3RJdGVtKGl0ZW0pO1xyXG4gICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLnJlbW92ZVJlbW92ZWRDdXJyZW50QWNjZXNzSXRlbSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgdGVzdEl0ZW1TZWxlY3Rpb24gPSBmdW5jdGlvbihpc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkO1xyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdoYXNSZW1vdmVkQ3VycmVudEFjY2Vzc0l0ZW0nKS5hbmQucmV0dXJuVmFsdWUoaXNTZWxlY3RlZCk7XHJcbiAgICAgICAgc2VsZWN0ZWQgPSBjdHJsLmlzSXRlbVNlbGVjdGVkKGl0ZW0pO1xyXG4gICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmhhc1JlbW92ZWRDdXJyZW50QWNjZXNzSXRlbSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbSk7XHJcbiAgICAgICAgZXhwZWN0KHNlbGVjdGVkKS50b0VxdWFsKGlzU2VsZWN0ZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpdCgnc2F5cyB0aGF0IGFuIGl0ZW0gaXMgc2VsZWN0ZWQgaWYgYWRkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB0ZXN0SXRlbVNlbGVjdGlvbih0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzYXlzIHRoYXQgYW4gaXRlbSBpcyBub3Qgc2VsZWN0ZWQgaWYgbm90IGFkZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGVzdEl0ZW1TZWxlY3Rpb24oZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldFJvbGVTdGF0dXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVBY2Nlc3NJdGVtKGlzUm9sZSwgbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW1Db25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NUeXBlOiBpc1JvbGUgPyAnUm9sZScgOiAnRW50aXRsZW1lbnQnXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtQ29uZmlnLnJvbGVMb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ3VycmVudEFjY2Vzc0l0ZW0oaXRlbUNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBkZXRlY3RlZCBrZXkgZm9yIGRldGVjdGVkIHJvbGVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBhY2Nlc3NJdGVtID0gY3JlYXRlQWNjZXNzSXRlbSh0cnVlLCAnZGV0ZWN0ZWQnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Um9sZVN0YXR1cyhhY2Nlc3NJdGVtKSkudG9FcXVhbCgndWlfYWNjZXNzX3JlcXVlc3RfY3VycmVudF9hY2Nlc3NfZGV0ZWN0ZWQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYXNzaWduZWQga2V5IGZvciBhc3NpZ25lZCByb2xlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYWNjZXNzSXRlbSA9IGNyZWF0ZUFjY2Vzc0l0ZW0odHJ1ZSwgJ2Fzc2lnbmVkJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFJvbGVTdGF0dXMoYWNjZXNzSXRlbSkpLnRvRXF1YWwoJ3VpX2FjY2Vzc19yZXF1ZXN0X2N1cnJlbnRfYWNjZXNzX2Fzc2lnbmVkJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHJlcXVlc3RlZCBrZXkgZm9yIHJlcXVlc3RlZCBmb3Igcm9sZXMgdGhhdCBhcmUgbm90IGRldGVjdGVkIG9yIGFzc2lnbmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBhY2Nlc3NJdGVtID0gY3JlYXRlQWNjZXNzSXRlbSh0cnVlLCAncmVxdWVzdGVkJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFJvbGVTdGF0dXMoYWNjZXNzSXRlbSkpLnRvRXF1YWwoJ3VpX2FjY2Vzc19yZXF1ZXN0X2N1cnJlbnRfYWNjZXNzX3JlcXVlc3RlZCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGlmIG5vdCBhIHJvbGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGFjY2Vzc0l0ZW0gPSBjcmVhdGVBY2Nlc3NJdGVtKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY3RybC5nZXRSb2xlU3RhdHVzKGFjY2Vzc0l0ZW0pO1xyXG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QgdG8gc2VlIGlmIG1vZGFsIG9wZW5zIHdpdGggQ3VycmVudEFjY2Vzc0l0ZW1EaWFsb2dDdHJsXHJcbiAgICAgKi9cclxuICAgIGRlc2NyaWJlKCdzaG93IGl0ZW0gZGV0YWlsIGRpYWxvZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBBY2Nlc3NSZXF1ZXN0SXRlbSwgc3BNb2RhbDtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0FjY2Vzc1JlcXVlc3RJdGVtXywgX3NwTW9kYWxfKSB7XHJcbiAgICAgICAgICAgIEFjY2Vzc1JlcXVlc3RJdGVtID0gX0FjY2Vzc1JlcXVlc3RJdGVtXztcclxuICAgICAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcclxuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ha2Ugc3VyZSB0aGF0IGFuIGl0ZW0gaXMgcmVxdWlyZWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXQoJ2V4cGxvZGVzIGlmIG5vIGl0ZW0gaXMgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY3RybC5zaG93SXRlbURldGFpbHMobnVsbCk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWFrZSBzdXJlIHNob3dJdGVtRGV0YWlscygpIG1ldGhvZCBvcGVucyB0aGUgbW9kYWwgd2l0aCB0aGUgY29ycmVjdCBDdXJyZW50QWNjZXNzSXRlbURpYWxvZ0N0cmxcclxuICAgICAgICAgKi9cclxuICAgICAgICBpdCgnb3BlbnMgdGhlIG1vZGFsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gbmV3IEFjY2Vzc1JlcXVlc3RJdGVtKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5ST0xFKTtcclxuICAgICAgICAgICAgY3RybC5zaG93SXRlbURldGFpbHMoaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLmNvbnRyb2xsZXIpXHJcbiAgICAgICAgICAgICAgICAudG9FcXVhbCgnQ3VycmVudEFjY2Vzc0l0ZW1EZXRhaWxEaWFsb2dDdHJsIGFzIGRpYWxvZ0N0cmwnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
