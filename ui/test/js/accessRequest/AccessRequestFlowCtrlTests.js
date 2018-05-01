System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', './AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * Tests for the AccessRequestFlowCtrl.
             */
            describe('AccessRequestFlowCtrl', function () {

                var $controller, $state, accessRequestDataService, ctrl, item1, item2, currentAccessItem, identity1, identity2;

                // Let the tests know we'll use the access request module.
                beforeEach(module(accessRequestModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams:7 */
                beforeEach(inject(function (_accessRequestDataService_, AccessRequestItem, CurrentAccessItem, Identity, _$state_, _$controller_, accessRequestTestData) {

                    // Save the services.
                    accessRequestDataService = _accessRequestDataService_;
                    $controller = _$controller_;
                    $state = _$state_;

                    // Create some identities and items to test with.
                    identity1 = new Identity(accessRequestTestData.IDENTITY1);
                    identity2 = new Identity(accessRequestTestData.IDENTITY2);
                    item1 = new AccessRequestItem(accessRequestTestData.ROLE);
                    item2 = new AccessRequestItem(accessRequestTestData.ENTITLEMENT);
                    currentAccessItem = new CurrentAccessItem(accessRequestTestData.CURRENT_ACCESS_ROLE);

                    // Create the controller to test with.
                    ctrl = $controller('AccessRequestFlowCtrl', {
                        accessRequestDataService: accessRequestDataService,
                        $state: $state
                    });
                }));

                describe('Manage Access tab', function () {
                    it('is enabled if accessRequestDataService says so', function () {
                        spyOn(accessRequestDataService, 'isManageAccessTabEnabled').and.returnValue(true);
                        expect(ctrl.isManageAccessTabEnabled()).toEqual(true);
                        expect(accessRequestDataService.isManageAccessTabEnabled).toHaveBeenCalled();
                    });

                    it('is disabled if accessRequestDataService says so', function () {
                        spyOn(accessRequestDataService, 'isManageAccessTabEnabled').and.returnValue(false);
                        expect(ctrl.isManageAccessTabEnabled()).toEqual(false);
                        expect(accessRequestDataService.isManageAccessTabEnabled).toHaveBeenCalled();
                    });

                    describe('selected', function () {
                        it('is true when on the manage access page', function () {
                            spyOn($state, 'includes').and.returnValue(true);
                            expect(ctrl.isManageAccessTabSelected()).toEqual(true);
                            expect($state.includes).toHaveBeenCalledWith('accessRequest.manageAccess');
                        });

                        it('is false when not on the manage access page', function () {
                            spyOn($state, 'includes').and.returnValue(false);
                            expect(ctrl.isManageAccessTabSelected()).toEqual(false);
                            expect($state.includes).toHaveBeenCalledWith('accessRequest.manageAccess');
                        });
                    });
                });

                describe('Remove tab', function () {
                    it('is enabled if accessRequestDataService says so', function () {
                        spyOn(accessRequestDataService, 'isRemoveAccessTabEnabled').and.returnValue(true);
                        expect(ctrl.isRemoveAccessTabEnabled()).toEqual(true);
                        expect(accessRequestDataService.isRemoveAccessTabEnabled).toHaveBeenCalled();
                    });

                    it('is disabled if accessRequestDataService says so', function () {
                        spyOn(accessRequestDataService, 'isRemoveAccessTabEnabled').and.returnValue(false);
                        expect(ctrl.isRemoveAccessTabEnabled()).toEqual(false);
                        expect(accessRequestDataService.isRemoveAccessTabEnabled).toHaveBeenCalled();
                    });
                });

                describe('Review tab', function () {
                    it('is enabled if accessRequestDataService says so', function () {
                        spyOn(accessRequestDataService, 'isReviewTabEnabled').and.returnValue(true);
                        expect(ctrl.isReviewTabEnabled()).toEqual(true);
                        expect(accessRequestDataService.isReviewTabEnabled).toHaveBeenCalled();
                    });

                    it('is disabled if accessRequestDataService says so', function () {
                        spyOn(accessRequestDataService, 'isReviewTabEnabled').and.returnValue(false);
                        expect(ctrl.isReviewTabEnabled()).toEqual(false);
                        expect(accessRequestDataService.isReviewTabEnabled).toHaveBeenCalled();
                    });
                });

                describe('Select Users tab', function () {
                    it('is enabled if accessRequestDataService says so', function () {
                        spyOn(accessRequestDataService, 'isSelectUsersTabEnabled').and.returnValue(true);
                        expect(ctrl.isSelectUsersTabEnabled()).toEqual(true);
                        expect(accessRequestDataService.isSelectUsersTabEnabled).toHaveBeenCalled();
                    });

                    it('is disabled if accessRequestDataService says so', function () {
                        spyOn(accessRequestDataService, 'isSelectUsersTabEnabled').and.returnValue(false);
                        expect(ctrl.isSelectUsersTabEnabled()).toEqual(false);
                        expect(accessRequestDataService.isSelectUsersTabEnabled).toHaveBeenCalled();
                    });
                });

                it('returns the number of added selected items', function () {
                    var count;
                    spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue([item1]);
                    count = ctrl.getAddedItemsCount();
                    expect(accessRequestDataService.getAccessRequest().getRequestedItems).toHaveBeenCalled();
                    expect(count).toEqual(1);
                });

                it('returns the number of removed selected items', function () {
                    var count;
                    spyOn(accessRequestDataService.getAccessRequest(), 'getRemovedCurrentAccessItems').and.returnValue([currentAccessItem]);
                    count = ctrl.getRemovedItemsCount();
                    expect(accessRequestDataService.getAccessRequest().getRemovedCurrentAccessItems).toHaveBeenCalled();
                    expect(count).toEqual(1);
                });

                it('returns the number of selected items for review', function () {
                    var count;
                    spyOn(ctrl, 'getAddedItemsCount').and.returnValue(2);
                    spyOn(ctrl, 'getRemovedItemsCount').and.returnValue(3);
                    count = ctrl.getReviewItemsCount();
                    expect(ctrl.getAddedItemsCount).toHaveBeenCalled();
                    expect(ctrl.getRemovedItemsCount).toHaveBeenCalled();
                    expect(count).toEqual(5);
                });

                it('returns whether the page is dirty or not', function () {
                    var isDirty;
                    spyOn(accessRequestDataService, 'isDirty').and.returnValue(true);
                    isDirty = ctrl.isDirty();
                    expect(accessRequestDataService.isDirty).toHaveBeenCalled();
                    expect(isDirty).toEqual(true);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdEZsb3dDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyw0QkFBNEIsVUFBVSxTQUFTO0lBQWhJOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7Ozs7O1lBQzdCLFNBQVMseUJBQXlCLFlBQVc7O2dCQUV6QyxJQUFJLGFBQWEsUUFBUSwwQkFDckIsTUFBTSxPQUFPLE9BQU8sbUJBQW1CLFdBQVc7OztnQkFJdEQsV0FBVyxPQUFPOzs7Ozs7Z0JBTWxCLFdBQVcsT0FBTyxVQUFTLDRCQUE0QixtQkFDNUIsbUJBQW1CLFVBQ25CLFVBQVUsZUFBZSx1QkFBdUI7OztvQkFHdkUsMkJBQTJCO29CQUMzQixjQUFjO29CQUNkLFNBQVM7OztvQkFHVCxZQUFZLElBQUksU0FBUyxzQkFBc0I7b0JBQy9DLFlBQVksSUFBSSxTQUFTLHNCQUFzQjtvQkFDL0MsUUFBUSxJQUFJLGtCQUFrQixzQkFBc0I7b0JBQ3BELFFBQVEsSUFBSSxrQkFBa0Isc0JBQXNCO29CQUNwRCxvQkFBb0IsSUFBSSxrQkFBa0Isc0JBQXNCOzs7b0JBR2hFLE9BQU8sWUFBWSx5QkFBeUI7d0JBQ3hDLDBCQUEwQjt3QkFDMUIsUUFBUTs7OztnQkFLaEIsU0FBUyxxQkFBcUIsWUFBVztvQkFDckMsR0FBRyxrREFBa0QsWUFBVzt3QkFDNUQsTUFBTSwwQkFBMEIsNEJBQTRCLElBQUksWUFBWTt3QkFDNUUsT0FBTyxLQUFLLDRCQUE0QixRQUFRO3dCQUNoRCxPQUFPLHlCQUF5QiwwQkFBMEI7OztvQkFHOUQsR0FBRyxtREFBbUQsWUFBVzt3QkFDN0QsTUFBTSwwQkFBMEIsNEJBQTRCLElBQUksWUFBWTt3QkFDNUUsT0FBTyxLQUFLLDRCQUE0QixRQUFRO3dCQUNoRCxPQUFPLHlCQUF5QiwwQkFBMEI7OztvQkFHOUQsU0FBUyxZQUFZLFlBQVc7d0JBQzVCLEdBQUcsMENBQTBDLFlBQVc7NEJBQ3BELE1BQU0sUUFBUSxZQUFZLElBQUksWUFBWTs0QkFDMUMsT0FBTyxLQUFLLDZCQUE2QixRQUFROzRCQUNqRCxPQUFPLE9BQU8sVUFBVSxxQkFBcUI7Ozt3QkFHakQsR0FBRywrQ0FBK0MsWUFBVzs0QkFDekQsTUFBTSxRQUFRLFlBQVksSUFBSSxZQUFZOzRCQUMxQyxPQUFPLEtBQUssNkJBQTZCLFFBQVE7NEJBQ2pELE9BQU8sT0FBTyxVQUFVLHFCQUFxQjs7Ozs7Z0JBTXpELFNBQVMsY0FBYyxZQUFXO29CQUM5QixHQUFHLGtEQUFrRCxZQUFXO3dCQUM1RCxNQUFNLDBCQUEwQiw0QkFBNEIsSUFBSSxZQUFZO3dCQUM1RSxPQUFPLEtBQUssNEJBQTRCLFFBQVE7d0JBQ2hELE9BQU8seUJBQXlCLDBCQUEwQjs7O29CQUc5RCxHQUFHLG1EQUFtRCxZQUFXO3dCQUM3RCxNQUFNLDBCQUEwQiw0QkFBNEIsSUFBSSxZQUFZO3dCQUM1RSxPQUFPLEtBQUssNEJBQTRCLFFBQVE7d0JBQ2hELE9BQU8seUJBQXlCLDBCQUEwQjs7OztnQkFLbEUsU0FBUyxjQUFjLFlBQVc7b0JBQzlCLEdBQUcsa0RBQWtELFlBQVc7d0JBQzVELE1BQU0sMEJBQTBCLHNCQUFzQixJQUFJLFlBQVk7d0JBQ3RFLE9BQU8sS0FBSyxzQkFBc0IsUUFBUTt3QkFDMUMsT0FBTyx5QkFBeUIsb0JBQW9COzs7b0JBR3hELEdBQUcsbURBQW1ELFlBQVc7d0JBQzdELE1BQU0sMEJBQTBCLHNCQUFzQixJQUFJLFlBQVk7d0JBQ3RFLE9BQU8sS0FBSyxzQkFBc0IsUUFBUTt3QkFDMUMsT0FBTyx5QkFBeUIsb0JBQW9COzs7O2dCQUk1RCxTQUFTLG9CQUFvQixZQUFXO29CQUNwQyxHQUFHLGtEQUFrRCxZQUFXO3dCQUM1RCxNQUFNLDBCQUEwQiwyQkFBMkIsSUFBSSxZQUFZO3dCQUMzRSxPQUFPLEtBQUssMkJBQTJCLFFBQVE7d0JBQy9DLE9BQU8seUJBQXlCLHlCQUF5Qjs7O29CQUc3RCxHQUFHLG1EQUFtRCxZQUFXO3dCQUM3RCxNQUFNLDBCQUEwQiwyQkFBMkIsSUFBSSxZQUFZO3dCQUMzRSxPQUFPLEtBQUssMkJBQTJCLFFBQVE7d0JBQy9DLE9BQU8seUJBQXlCLHlCQUF5Qjs7OztnQkFLakUsR0FBRyw4Q0FBOEMsWUFBVztvQkFDeEQsSUFBSTtvQkFDSixNQUFNLHlCQUF5QixvQkFBb0IscUJBQXFCLElBQUksWUFBWSxDQUFFO29CQUMxRixRQUFRLEtBQUs7b0JBQ2IsT0FBTyx5QkFBeUIsbUJBQW1CLG1CQUFtQjtvQkFDdEUsT0FBTyxPQUFPLFFBQVE7OztnQkFHMUIsR0FBRyxnREFBZ0QsWUFBVztvQkFDMUQsSUFBSTtvQkFDSixNQUFNLHlCQUF5QixvQkFBb0IsZ0NBQy9DLElBQUksWUFBWSxDQUFFO29CQUN0QixRQUFRLEtBQUs7b0JBQ2IsT0FBTyx5QkFBeUIsbUJBQW1CLDhCQUE4QjtvQkFDakYsT0FBTyxPQUFPLFFBQVE7OztnQkFHMUIsR0FBRyxtREFBbUQsWUFBVztvQkFDN0QsSUFBSTtvQkFDSixNQUFNLE1BQU0sc0JBQXNCLElBQUksWUFBWTtvQkFDbEQsTUFBTSxNQUFNLHdCQUF3QixJQUFJLFlBQVk7b0JBQ3BELFFBQVEsS0FBSztvQkFDYixPQUFPLEtBQUssb0JBQW9CO29CQUNoQyxPQUFPLEtBQUssc0JBQXNCO29CQUNsQyxPQUFPLE9BQU8sUUFBUTs7O2dCQUcxQixHQUFHLDRDQUE0QyxZQUFXO29CQUN0RCxJQUFJO29CQUNKLE1BQU0sMEJBQTBCLFdBQVcsSUFBSSxZQUFZO29CQUMzRCxVQUFVLEtBQUs7b0JBQ2YsT0FBTyx5QkFBeUIsU0FBUztvQkFDekMsT0FBTyxTQUFTLFFBQVE7Ozs7O0dBQTdCIiwiZmlsZSI6ImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdEZsb3dDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcclxuaW1wb3J0ICcuL0FjY2Vzc1JlcXVlc3RUZXN0RGF0YSc7XHJcblxyXG4vKipcclxuICogVGVzdHMgZm9yIHRoZSBBY2Nlc3NSZXF1ZXN0Rmxvd0N0cmwuXHJcbiAqL1xyXG5kZXNjcmliZSgnQWNjZXNzUmVxdWVzdEZsb3dDdHJsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyICRjb250cm9sbGVyLCAkc3RhdGUsIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSxcclxuICAgICAgICBjdHJsLCBpdGVtMSwgaXRlbTIsIGN1cnJlbnRBY2Nlc3NJdGVtLCBpZGVudGl0eTEsIGlkZW50aXR5MjtcclxuXHJcblxyXG4gICAgLy8gTGV0IHRoZSB0ZXN0cyBrbm93IHdlJ2xsIHVzZSB0aGUgYWNjZXNzIHJlcXVlc3QgbW9kdWxlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5qZWN0IHRoZSBkZXBlbmRlbmNpZXMgYW5kIHNldHVwIG1vY2tzLlxyXG4gICAgICovXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOjcgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9hY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2VfLCBBY2Nlc3NSZXF1ZXN0SXRlbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEN1cnJlbnRBY2Nlc3NJdGVtLCBJZGVudGl0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kc3RhdGVfLCBfJGNvbnRyb2xsZXJfLCBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEpIHtcclxuXHJcbiAgICAgICAgLy8gU2F2ZSB0aGUgc2VydmljZXMuXHJcbiAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3REYXRhU2VydmljZV87XHJcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgICRzdGF0ZSA9IF8kc3RhdGVfO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgc29tZSBpZGVudGl0aWVzIGFuZCBpdGVtcyB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgaWRlbnRpdHkxID0gbmV3IElkZW50aXR5KGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWTEpO1xyXG4gICAgICAgIGlkZW50aXR5MiA9IG5ldyBJZGVudGl0eShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFkyKTtcclxuICAgICAgICBpdGVtMSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuUk9MRSk7XHJcbiAgICAgICAgaXRlbTIgPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oYWNjZXNzUmVxdWVzdFRlc3REYXRhLkVOVElUTEVNRU5UKTtcclxuICAgICAgICBjdXJyZW50QWNjZXNzSXRlbSA9IG5ldyBDdXJyZW50QWNjZXNzSXRlbShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuQ1VSUkVOVF9BQ0NFU1NfUk9MRSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdBY2Nlc3NSZXF1ZXN0Rmxvd0N0cmwnLCB7XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZTogYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLFxyXG4gICAgICAgICAgICAkc3RhdGU6ICRzdGF0ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG5cclxuXHJcbiAgICBkZXNjcmliZSgnTWFuYWdlIEFjY2VzcyB0YWInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnaXMgZW5hYmxlZCBpZiBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2Ugc2F5cyBzbycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsICdpc01hbmFnZUFjY2Vzc1RhYkVuYWJsZWQnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzTWFuYWdlQWNjZXNzVGFiRW5hYmxlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmlzTWFuYWdlQWNjZXNzVGFiRW5hYmxlZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZGlzYWJsZWQgaWYgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlIHNheXMgc28nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnaXNNYW5hZ2VBY2Nlc3NUYWJFbmFibGVkJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNNYW5hZ2VBY2Nlc3NUYWJFbmFibGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmlzTWFuYWdlQWNjZXNzVGFiRW5hYmxlZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXQoJ2lzIHRydWUgd2hlbiBvbiB0aGUgbWFuYWdlIGFjY2VzcyBwYWdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzcHlPbigkc3RhdGUsICdpbmNsdWRlcycpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzTWFuYWdlQWNjZXNzVGFiU2VsZWN0ZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdCgkc3RhdGUuaW5jbHVkZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdhY2Nlc3NSZXF1ZXN0Lm1hbmFnZUFjY2VzcycpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdpcyBmYWxzZSB3aGVuIG5vdCBvbiB0aGUgbWFuYWdlIGFjY2VzcyBwYWdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzcHlPbigkc3RhdGUsICdpbmNsdWRlcycpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc01hbmFnZUFjY2Vzc1RhYlNlbGVjdGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KCRzdGF0ZS5pbmNsdWRlcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2FjY2Vzc1JlcXVlc3QubWFuYWdlQWNjZXNzJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGRlc2NyaWJlKCdSZW1vdmUgdGFiJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ2lzIGVuYWJsZWQgaWYgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlIHNheXMgc28nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnaXNSZW1vdmVBY2Nlc3NUYWJFbmFibGVkJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1JlbW92ZUFjY2Vzc1RhYkVuYWJsZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5pc1JlbW92ZUFjY2Vzc1RhYkVuYWJsZWQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIGRpc2FibGVkIGlmIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSBzYXlzIHNvJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ2lzUmVtb3ZlQWNjZXNzVGFiRW5hYmxlZCcpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzUmVtb3ZlQWNjZXNzVGFiRW5hYmxlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5pc1JlbW92ZUFjY2Vzc1RhYkVuYWJsZWQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBkZXNjcmliZSgnUmV2aWV3IHRhYicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdpcyBlbmFibGVkIGlmIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSBzYXlzIHNvJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ2lzUmV2aWV3VGFiRW5hYmxlZCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNSZXZpZXdUYWJFbmFibGVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuaXNSZXZpZXdUYWJFbmFibGVkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2Ugc2F5cyBzbycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsICdpc1Jldmlld1RhYkVuYWJsZWQnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1Jldmlld1RhYkVuYWJsZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuaXNSZXZpZXdUYWJFbmFibGVkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnU2VsZWN0IFVzZXJzIHRhYicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdpcyBlbmFibGVkIGlmIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSBzYXlzIHNvJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ2lzU2VsZWN0VXNlcnNUYWJFbmFibGVkJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NlbGVjdFVzZXJzVGFiRW5hYmxlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmlzU2VsZWN0VXNlcnNUYWJFbmFibGVkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2Ugc2F5cyBzbycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsICdpc1NlbGVjdFVzZXJzVGFiRW5hYmxlZCcpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU2VsZWN0VXNlcnNUYWJFbmFibGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmlzU2VsZWN0VXNlcnNUYWJFbmFibGVkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgaXQoJ3JldHVybnMgdGhlIG51bWJlciBvZiBhZGRlZCBzZWxlY3RlZCBpdGVtcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjb3VudDtcclxuICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0UmVxdWVzdGVkSXRlbXMnKS5hbmQucmV0dXJuVmFsdWUoWyBpdGVtMSBdKTtcclxuICAgICAgICBjb3VudCA9IGN0cmwuZ2V0QWRkZWRJdGVtc0NvdW50KCk7XHJcbiAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuZ2V0UmVxdWVzdGVkSXRlbXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICBleHBlY3QoY291bnQpLnRvRXF1YWwoMSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyB0aGUgbnVtYmVyIG9mIHJlbW92ZWQgc2VsZWN0ZWQgaXRlbXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY291bnQ7XHJcbiAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldFJlbW92ZWRDdXJyZW50QWNjZXNzSXRlbXMnKS5cclxuICAgICAgICAgICAgYW5kLnJldHVyblZhbHVlKFsgY3VycmVudEFjY2Vzc0l0ZW0gXSk7XHJcbiAgICAgICAgY291bnQgPSBjdHJsLmdldFJlbW92ZWRJdGVtc0NvdW50KCk7XHJcbiAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuZ2V0UmVtb3ZlZEN1cnJlbnRBY2Nlc3NJdGVtcykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIGV4cGVjdChjb3VudCkudG9FcXVhbCgxKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRoZSBudW1iZXIgb2Ygc2VsZWN0ZWQgaXRlbXMgZm9yIHJldmlldycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjb3VudDtcclxuICAgICAgICBzcHlPbihjdHJsLCAnZ2V0QWRkZWRJdGVtc0NvdW50JykuYW5kLnJldHVyblZhbHVlKDIpO1xyXG4gICAgICAgIHNweU9uKGN0cmwsICdnZXRSZW1vdmVkSXRlbXNDb3VudCcpLmFuZC5yZXR1cm5WYWx1ZSgzKTtcclxuICAgICAgICBjb3VudCA9IGN0cmwuZ2V0UmV2aWV3SXRlbXNDb3VudCgpO1xyXG4gICAgICAgIGV4cGVjdChjdHJsLmdldEFkZGVkSXRlbXNDb3VudCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIGV4cGVjdChjdHJsLmdldFJlbW92ZWRJdGVtc0NvdW50KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgZXhwZWN0KGNvdW50KS50b0VxdWFsKDUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgd2hldGhlciB0aGUgcGFnZSBpcyBkaXJ0eSBvciBub3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaXNEaXJ0eTtcclxuICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsICdpc0RpcnR5JykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgIGlzRGlydHkgPSBjdHJsLmlzRGlydHkoKTtcclxuICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmlzRGlydHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICBleHBlY3QoaXNEaXJ0eSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
