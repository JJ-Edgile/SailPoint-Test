System.register(['test/js/TestInitializer', 'test/js/TestModule', 'workitem/WorkItemModule', 'test/js/CustomMatchers', './WorkItemTestData'], function (_export) {
    'use strict';

    var testModule, workItemModule, CustomMatchers;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }, function (_testJsCustomMatchers) {
            CustomMatchers = _testJsCustomMatchers['default'];
        }, function (_WorkItemTestData) {}],
        execute: function () {

            /**
             * WorkItem Details Dialog Controller tests
             */
            describe('WorkItemDetailDialogCtrl', function () {
                var scope, $rootScope, $controller, spTranslateFilter, workItemService, http, configService, violationService, Approval, ctrl, testService, workItemTestData;

                function createController(approvalExtension) {
                    var approvalObj = angular.copy(workItemTestData.APPROVAL),
                        dateFilter = function (arg) {
                        return arg;
                    };
                    scope.templateStyle = 'full';

                    if (approvalExtension) {
                        angular.extend(approvalObj, approvalExtension);
                    }

                    ctrl = $controller('WorkItemDetailDialogCtrl', {
                        workItem: new Approval(approvalObj),
                        spTranslateFilter: spTranslateFilter,
                        dateFilter: dateFilter,
                        workItemService: workItemService,
                        configService: configService,
                        CURR_USER_DISPLAYNAME: 'James Smith'
                    });
                }

                function comparator(value1, value2) {
                    var val1 = value1.value,
                        val2 = value2.value;

                    // If either value is a Date, compare the time.
                    if (val1 && angular.isDefined(val1.getTime)) {
                        val1 = val1.getTime();
                    }
                    if (val2 && angular.isDefined(val2.getTime)) {
                        val2 = val2.getTime();
                    }

                    return val1 === val2 && value1.label === value2.label;
                }

                beforeEach(module(testModule, workItemModule));

                beforeEach(function () {
                    /**
                     * Setup the mocks for our tests - a scope and the controller.
                     */
                    /* jshint maxparams: 11 */
                    inject(function (_$rootScope_, _$controller_, _spTranslateFilter_, $q, $httpBackend, _violationService_, _Approval_, _testService_, _workItemTestData_) {

                        $controller = _$controller_;
                        $rootScope = _$rootScope_;
                        spTranslateFilter = _spTranslateFilter_;
                        Approval = _Approval_;
                        http = $httpBackend;
                        violationService = _violationService_;
                        testService = _testService_;
                        workItemTestData = _workItemTestData_;

                        workItemService = {
                            getIdentityDetails: testService.createPromiseSpy(false, {
                                data: [{ 'firstname': 'James' }, { 'lastname': 'Smith' }]
                            }, {}),
                            getForwardingHistory: testService.createPromiseSpy(false, {
                                data: [{
                                    previousOwner: 'J-bob',
                                    newOwner: 'K-bob',
                                    date: 1391618385380,
                                    comment: 'Hey K-bob ... take care of this'
                                }]
                            }, {})
                        };

                        configService = {
                            getIdentityDetailsConfig: testService.createPromiseSpy(false, {
                                data: [{ 'attribute': 'firstname', 'label': 'First Name' }, { 'attribute': 'lastname', 'label': 'Last Name' }]
                            }, {})
                        };

                        scope = $rootScope.$new();
                    });

                    // Setting a matcher for our arrays
                    jasmine.addMatchers(CustomMatchers);
                });

                it('should add the workitem details to the scope on creation', function () {
                    createController();
                    expect(ctrl.workItemDetails).toBeDefined();
                    expect(ctrl.workItemDetails.length).toEqual(6);
                    expect(ctrl.workItemDetails).arrayToContainItem({ expectedItem: {
                            label: 'ui_work_item_details_requester',
                            value: 'Mary Johnson'
                        }, comparator: comparator });
                    expect(ctrl.workItemDetails).arrayToContainItem({ expectedItem: {
                            label: 'ui_work_item_details_owner',
                            value: 'James Smith'
                        }, comparator: comparator });
                    expect(ctrl.workItemDetails).arrayToContainItem({ expectedItem: {
                            label: 'ui_work_item_details_priority',
                            // Expect the value to have been localized, but we are not going through
                            // the jsf localizing filter so it will just be the message key
                            value: '#{msgs.work_item_level_high}'
                        }, comparator: comparator });
                    expect(ctrl.workItemDetails).arrayToContainItem({ expectedItem: {
                            label: 'ui_work_item_details_created',
                            value: new Date(1391618385380)
                        }, comparator: comparator });
                    expect(ctrl.workItemDetails).arrayToContainItem({ expectedItem: {
                            label: 'ui_work_item_details_work_item_id',
                            value: '49'
                        }, comparator: comparator });
                    expect(ctrl.workItemDetails).arrayToContainItem({ expectedItem: {
                            label: 'ui_work_item_details_access_request_id',
                            value: '129'
                        }, comparator: comparator });
                    expect(ctrl.workItemDetails).not.arrayToContainItem({ expectedItem: {
                            label: 'ui_work_item_details_assignee',
                            value: 'Amanda Ross'
                        }, comparator: comparator });
                });

                it('should add assignee when owner is a workgroup', function () {
                    createController({
                        owner: {
                            workgroup: true
                        }
                    });
                    expect(ctrl.workItemDetails).arrayToContainItem({ expectedItem: {
                            label: 'ui_work_item_details_assignee',
                            value: 'Amanda Ross'
                        }, comparator: comparator });
                });

                it('should add owner as assignee when owner is workgroup but no assignee', function () {
                    createController({
                        owner: {
                            workgroup: true,
                            displayName: 'Some Workgroup'
                        },
                        assignee: undefined
                    });
                    expect(ctrl.workItemDetails).arrayToContainItem({ expectedItem: {
                            label: 'ui_work_item_details_assignee',
                            value: 'Some Workgroup'
                        }, comparator: comparator });
                });

                it('should load the identity details to the scope', function () {
                    createController();

                    // Process promise
                    ctrl.loadIdentityDetails();
                    scope.$apply();

                    expect(configService.getIdentityDetailsConfig).toHaveBeenCalled();
                    expect(ctrl.identityDetails).toBeDefined();
                    expect(ctrl.identityDetails.length).toEqual(2);
                    expect(ctrl.identityDetails[0]).toEqual({ label: 'First Name', value: 'James' });
                    expect(ctrl.identityDetails[1]).toEqual({ label: 'Last Name', value: 'Smith' });
                });

                it('should add isRightAligned function to the scope', function () {
                    createController();

                    expect(ctrl.isRightAligned('Sp Admin')).toBeFalsy();
                    expect(ctrl.isRightAligned('James Smith')).toBeTruthy();
                });

                describe('load forwarding history', function () {
                    it('loads forwarding history', function () {
                        createController();
                        ctrl.loadForwardingHistory();
                        expect(workItemService.getForwardingHistory).toHaveBeenCalled();
                    });

                    it('does not load forwarding history a second time', function () {
                        createController();
                        ctrl.loadForwardingHistory();
                        scope.$apply();
                        expect(workItemService.getForwardingHistory).toHaveBeenCalled();

                        ctrl.loadForwardingHistory();
                        scope.$apply();
                        expect(workItemService.getForwardingHistory.calls.count()).toEqual(1);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL1dvcmtJdGVtRGV0YWlsRGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQkFBc0IsMkJBQTJCLDBCQUEwQix1QkFBdUIsVUFBVSxTQUFTO0lBQzdKOztJQUVBLElBQUksWUFBWSxnQkFBZ0I7SUFDaEMsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUJBQW1CO1lBQ3pFLGFBQWEsa0JBQWtCO1dBQ2hDLFVBQVUseUJBQXlCO1lBQ2xDLGlCQUFpQix3QkFBd0I7V0FDMUMsVUFBVSx1QkFBdUI7WUFDaEMsaUJBQWlCLHNCQUFzQjtXQUN4QyxVQUFVLG1CQUFtQjtRQUNoQyxTQUFTLFlBQVk7Ozs7O1lBRjdCLFNBQVMsNEJBQTRCLFlBQVc7Z0JBQzVDLElBQUksT0FBTyxZQUFZLGFBQWEsbUJBQW1CLGlCQUFpQixNQUNwRSxlQUFlLGtCQUFrQixVQUFVLE1BQU0sYUFBYTs7Z0JBRWxFLFNBQVMsaUJBQWlCLG1CQUFtQjtvQkFDekMsSUFBSSxjQUFjLFFBQVEsS0FBSyxpQkFBaUI7d0JBQzVDLGFBQWEsVUFBUyxLQUFLO3dCQUN2QixPQUFPOztvQkFFZixNQUFNLGdCQUFnQjs7b0JBRXRCLElBQUksbUJBQW1CO3dCQUNuQixRQUFRLE9BQU8sYUFBYTs7O29CQUdoQyxPQUFPLFlBQVksNEJBQTRCO3dCQUMzQyxVQUFVLElBQUksU0FBUzt3QkFDdkIsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZix1QkFBdUI7Ozs7Z0JBSS9CLFNBQVMsV0FBVyxRQUFRLFFBQVE7b0JBQ2hDLElBQUksT0FBTyxPQUFPO3dCQUNkLE9BQU8sT0FBTzs7O29CQUdsQixJQUFJLFFBQVEsUUFBUSxVQUFVLEtBQUssVUFBVTt3QkFDekMsT0FBTyxLQUFLOztvQkFFaEIsSUFBSSxRQUFRLFFBQVEsVUFBVSxLQUFLLFVBQVU7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QUFHLG1EQUFtRCxZQUFXO29CQUM3RDs7b0JBRUEsT0FBTyxLQUFLLGVBQWUsYUFBYTtvQkFDeEMsT0FBTyxLQUFLLGVBQWUsZ0JBQWdCOzs7Z0JBRy9DLFNBQVMsMkJBQTJCLFlBQVc7b0JBQzNDLEdBQUcsNEJBQTRCLFlBQVc7d0JBQ3RDO3dCQUNBLEtBQUs7d0JBQ0wsT0FBTyxnQkFBZ0Isc0JBQXNCOzs7b0JBR2pELEdBQUcsa0RBQWtELFlBQVc7d0JBQzVEO3dCQUNBLEtBQUs7d0JBQ0wsTUFBTTt3QkFDTixPQUFPLGdCQUFnQixzQkFBc0I7O3dCQUU3QyxLQUFLO3dCQUNMLE1BQU07d0JBQ04sT0FBTyxnQkFBZ0IscUJBQXFCLE1BQU0sU0FBUyxRQUFROzs7Ozs7R0FHNUUiLCJmaWxlIjoid29ya2l0ZW0vV29ya0l0ZW1EZXRhaWxEaWFsb2dDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcbmltcG9ydCB3b3JrSXRlbU1vZHVsZSBmcm9tICd3b3JraXRlbS9Xb3JrSXRlbU1vZHVsZSc7XG5pbXBvcnQgQ3VzdG9tTWF0Y2hlcnMgZnJvbSAndGVzdC9qcy9DdXN0b21NYXRjaGVycyc7XG5pbXBvcnQgJy4vV29ya0l0ZW1UZXN0RGF0YSc7XG5cbi8qKlxuICogV29ya0l0ZW0gRGV0YWlscyBEaWFsb2cgQ29udHJvbGxlciB0ZXN0c1xuICovXG5kZXNjcmliZSgnV29ya0l0ZW1EZXRhaWxEaWFsb2dDdHJsJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjb3BlLCAkcm9vdFNjb3BlLCAkY29udHJvbGxlciwgc3BUcmFuc2xhdGVGaWx0ZXIsIHdvcmtJdGVtU2VydmljZSwgaHR0cCxcbiAgICAgICAgY29uZmlnU2VydmljZSwgdmlvbGF0aW9uU2VydmljZSwgQXBwcm92YWwsIGN0cmwsIHRlc3RTZXJ2aWNlLCB3b3JrSXRlbVRlc3REYXRhO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihhcHByb3ZhbEV4dGVuc2lvbikge1xuICAgICAgICB2YXIgYXBwcm92YWxPYmogPSBhbmd1bGFyLmNvcHkod29ya0l0ZW1UZXN0RGF0YS5BUFBST1ZBTCksXG4gICAgICAgICAgICBkYXRlRmlsdGVyID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZztcbiAgICAgICAgICAgIH07XG4gICAgICAgIHNjb3BlLnRlbXBsYXRlU3R5bGUgPSAnZnVsbCc7XG5cbiAgICAgICAgaWYgKGFwcHJvdmFsRXh0ZW5zaW9uKSB7XG4gICAgICAgICAgICBhbmd1bGFyLmV4dGVuZChhcHByb3ZhbE9iaiwgYXBwcm92YWxFeHRlbnNpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdXb3JrSXRlbURldGFpbERpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICB3b3JrSXRlbTogbmV3IEFwcHJvdmFsKGFwcHJvdmFsT2JqKSxcbiAgICAgICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyOiBzcFRyYW5zbGF0ZUZpbHRlcixcbiAgICAgICAgICAgIGRhdGVGaWx0ZXI6IGRhdGVGaWx0ZXIsXG4gICAgICAgICAgICB3b3JrSXRlbVNlcnZpY2U6IHdvcmtJdGVtU2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IGNvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICBDVVJSX1VTRVJfRElTUExBWU5BTUU6ICdKYW1lcyBTbWl0aCdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcGFyYXRvcih2YWx1ZTEsIHZhbHVlMikge1xuICAgICAgICB2YXIgdmFsMSA9IHZhbHVlMS52YWx1ZSxcbiAgICAgICAgICAgIHZhbDIgPSB2YWx1ZTIudmFsdWU7XG5cbiAgICAgICAgLy8gSWYgZWl0aGVyIHZhbHVlIGlzIGEgRGF0ZSwgY29tcGFyZSB0aGUgdGltZS5cbiAgICAgICAgaWYgKHZhbDEgJiYgYW5ndWxhci5pc0RlZmluZWQodmFsMS5nZXRUaW1lKSkge1xuICAgICAgICAgICAgdmFsMSA9IHZhbDEuZ2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWwyICYmIGFuZ3VsYXIuaXNEZWZpbmVkKHZhbDIuZ2V0VGltZSkpIHtcbiAgICAgICAgICAgIHZhbDIgPSB2YWwyLmdldFRpbWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWwxID09PSB2YWwyICYmIHZhbHVlMS5sYWJlbCA9PT0gdmFsdWUyLmxhYmVsO1xuICAgIH1cblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIHdvcmtJdGVtTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0dXAgdGhlIG1vY2tzIGZvciBvdXIgdGVzdHMgLSBhIHNjb3BlIGFuZCB0aGUgY29udHJvbGxlci5cbiAgICAgICAgICovXG4gICAgICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDExICovXG4gICAgICAgIGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29udHJvbGxlcl8sIF9zcFRyYW5zbGF0ZUZpbHRlcl8sICRxLCAkaHR0cEJhY2tlbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBfdmlvbGF0aW9uU2VydmljZV8sIF9BcHByb3ZhbF8sIF90ZXN0U2VydmljZV8sIF93b3JrSXRlbVRlc3REYXRhXykge1xuXG4gICAgICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIgPSBfc3BUcmFuc2xhdGVGaWx0ZXJfO1xuICAgICAgICAgICAgQXBwcm92YWwgPSBfQXBwcm92YWxfO1xuICAgICAgICAgICAgaHR0cCA9ICRodHRwQmFja2VuZDtcbiAgICAgICAgICAgIHZpb2xhdGlvblNlcnZpY2UgPSBfdmlvbGF0aW9uU2VydmljZV87XG4gICAgICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgICAgICB3b3JrSXRlbVRlc3REYXRhID0gX3dvcmtJdGVtVGVzdERhdGFfO1xuXG4gICAgICAgICAgICB3b3JrSXRlbVNlcnZpY2UgPSB7XG4gICAgICAgICAgICAgICAgZ2V0SWRlbnRpdHlEZXRhaWxzOiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsnZmlyc3RuYW1lJzogJ0phbWVzJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7J2xhc3RuYW1lJzogJ1NtaXRoJ31cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHt9KSxcbiAgICAgICAgICAgICAgICBnZXRGb3J3YXJkaW5nSGlzdG9yeTogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNPd25lcjogJ0otYm9iJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdPd25lcjogJ0stYm9iJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiAxMzkxNjE4Mzg1MzgwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6ICdIZXkgSy1ib2IgLi4uIHRha2UgY2FyZSBvZiB0aGlzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge30pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlID0ge1xuICAgICAgICAgICAgICAgIGdldElkZW50aXR5RGV0YWlsc0NvbmZpZzogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7J2F0dHJpYnV0ZSc6ICdmaXJzdG5hbWUnLCAnbGFiZWwnOiAnRmlyc3QgTmFtZSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeydhdHRyaWJ1dGUnOiAnbGFzdG5hbWUnLCAnbGFiZWwnOiAnTGFzdCBOYW1lJ31cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHt9KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2V0dGluZyBhIG1hdGNoZXIgZm9yIG91ciBhcnJheXNcbiAgICAgICAgamFzbWluZS5hZGRNYXRjaGVycyhDdXN0b21NYXRjaGVycyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGFkZCB0aGUgd29ya2l0ZW0gZGV0YWlscyB0byB0aGUgc2NvcGUgb24gY3JlYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICBleHBlY3QoY3RybC53b3JrSXRlbURldGFpbHMpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChjdHJsLndvcmtJdGVtRGV0YWlscy5sZW5ndGgpLnRvRXF1YWwoNik7XG4gICAgICAgIGV4cGVjdChjdHJsLndvcmtJdGVtRGV0YWlscykuYXJyYXlUb0NvbnRhaW5JdGVtKHtleHBlY3RlZEl0ZW06IHtcbiAgICAgICAgICAgIGxhYmVsOiAndWlfd29ya19pdGVtX2RldGFpbHNfcmVxdWVzdGVyJyxcbiAgICAgICAgICAgIHZhbHVlOiAnTWFyeSBKb2huc29uJ1xuICAgICAgICB9LCBjb21wYXJhdG9yOiBjb21wYXJhdG9yfSk7XG4gICAgICAgIGV4cGVjdChjdHJsLndvcmtJdGVtRGV0YWlscykuYXJyYXlUb0NvbnRhaW5JdGVtKHtleHBlY3RlZEl0ZW06IHtcbiAgICAgICAgICAgIGxhYmVsOiAndWlfd29ya19pdGVtX2RldGFpbHNfb3duZXInLFxuICAgICAgICAgICAgdmFsdWU6ICdKYW1lcyBTbWl0aCdcbiAgICAgICAgfSwgY29tcGFyYXRvcjogY29tcGFyYXRvcn0pO1xuICAgICAgICBleHBlY3QoY3RybC53b3JrSXRlbURldGFpbHMpLmFycmF5VG9Db250YWluSXRlbSh7ZXhwZWN0ZWRJdGVtOiB7XG4gICAgICAgICAgICBsYWJlbDogJ3VpX3dvcmtfaXRlbV9kZXRhaWxzX3ByaW9yaXR5JyxcbiAgICAgICAgICAgIC8vIEV4cGVjdCB0aGUgdmFsdWUgdG8gaGF2ZSBiZWVuIGxvY2FsaXplZCwgYnV0IHdlIGFyZSBub3QgZ29pbmcgdGhyb3VnaFxuICAgICAgICAgICAgLy8gdGhlIGpzZiBsb2NhbGl6aW5nIGZpbHRlciBzbyBpdCB3aWxsIGp1c3QgYmUgdGhlIG1lc3NhZ2Uga2V5XG4gICAgICAgICAgICB2YWx1ZTogJyN7bXNncy53b3JrX2l0ZW1fbGV2ZWxfaGlnaH0nXG4gICAgICAgIH0sIGNvbXBhcmF0b3I6IGNvbXBhcmF0b3J9KTtcbiAgICAgICAgZXhwZWN0KGN0cmwud29ya0l0ZW1EZXRhaWxzKS5hcnJheVRvQ29udGFpbkl0ZW0oe2V4cGVjdGVkSXRlbToge1xuICAgICAgICAgICAgbGFiZWw6ICd1aV93b3JrX2l0ZW1fZGV0YWlsc19jcmVhdGVkJyxcbiAgICAgICAgICAgIHZhbHVlOiBuZXcgRGF0ZSgxMzkxNjE4Mzg1MzgwKVxuICAgICAgICB9LCBjb21wYXJhdG9yOiBjb21wYXJhdG9yfSk7XG4gICAgICAgIGV4cGVjdChjdHJsLndvcmtJdGVtRGV0YWlscykuYXJyYXlUb0NvbnRhaW5JdGVtKHtleHBlY3RlZEl0ZW06IHtcbiAgICAgICAgICAgIGxhYmVsOiAndWlfd29ya19pdGVtX2RldGFpbHNfd29ya19pdGVtX2lkJyxcbiAgICAgICAgICAgIHZhbHVlOiAnNDknXG4gICAgICAgIH0sIGNvbXBhcmF0b3I6IGNvbXBhcmF0b3J9KTtcbiAgICAgICAgZXhwZWN0KGN0cmwud29ya0l0ZW1EZXRhaWxzKS5hcnJheVRvQ29udGFpbkl0ZW0oe2V4cGVjdGVkSXRlbToge1xuICAgICAgICAgICAgbGFiZWw6ICd1aV93b3JrX2l0ZW1fZGV0YWlsc19hY2Nlc3NfcmVxdWVzdF9pZCcsXG4gICAgICAgICAgICB2YWx1ZTogJzEyOSdcbiAgICAgICAgfSwgY29tcGFyYXRvcjogY29tcGFyYXRvcn0pO1xuICAgICAgICBleHBlY3QoY3RybC53b3JrSXRlbURldGFpbHMpLm5vdC5hcnJheVRvQ29udGFpbkl0ZW0oe2V4cGVjdGVkSXRlbToge1xuICAgICAgICAgICAgbGFiZWw6ICd1aV93b3JrX2l0ZW1fZGV0YWlsc19hc3NpZ25lZScsXG4gICAgICAgICAgICB2YWx1ZTogJ0FtYW5kYSBSb3NzJ1xuICAgICAgICB9LCBjb21wYXJhdG9yOiBjb21wYXJhdG9yfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGFkZCBhc3NpZ25lZSB3aGVuIG93bmVyIGlzIGEgd29ya2dyb3VwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoe1xuICAgICAgICAgICAgb3duZXI6IHtcbiAgICAgICAgICAgICAgICB3b3JrZ3JvdXA6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGV4cGVjdChjdHJsLndvcmtJdGVtRGV0YWlscykuYXJyYXlUb0NvbnRhaW5JdGVtKHtleHBlY3RlZEl0ZW06IHtcbiAgICAgICAgICAgIGxhYmVsOiAndWlfd29ya19pdGVtX2RldGFpbHNfYXNzaWduZWUnLFxuICAgICAgICAgICAgdmFsdWU6ICdBbWFuZGEgUm9zcydcbiAgICAgICAgfSwgY29tcGFyYXRvcjogY29tcGFyYXRvcn0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhZGQgb3duZXIgYXMgYXNzaWduZWUgd2hlbiBvd25lciBpcyB3b3JrZ3JvdXAgYnV0IG5vIGFzc2lnbmVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoe1xuICAgICAgICAgICAgb3duZXI6IHtcbiAgICAgICAgICAgICAgICB3b3JrZ3JvdXA6IHRydWUsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTb21lIFdvcmtncm91cCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3NpZ25lZTogdW5kZWZpbmVkXG4gICAgICAgIH0pO1xuICAgICAgICBleHBlY3QoY3RybC53b3JrSXRlbURldGFpbHMpLmFycmF5VG9Db250YWluSXRlbSh7ZXhwZWN0ZWRJdGVtOiB7XG4gICAgICAgICAgICBsYWJlbDogJ3VpX3dvcmtfaXRlbV9kZXRhaWxzX2Fzc2lnbmVlJyxcbiAgICAgICAgICAgIHZhbHVlOiAnU29tZSBXb3JrZ3JvdXAnXG4gICAgICAgIH0sIGNvbXBhcmF0b3I6IGNvbXBhcmF0b3J9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbG9hZCB0aGUgaWRlbnRpdHkgZGV0YWlscyB0byB0aGUgc2NvcGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuXG4gICAgICAgIC8vIFByb2Nlc3MgcHJvbWlzZVxuICAgICAgICBjdHJsLmxvYWRJZGVudGl0eURldGFpbHMoKTtcbiAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2UuZ2V0SWRlbnRpdHlEZXRhaWxzQ29uZmlnKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdChjdHJsLmlkZW50aXR5RGV0YWlscykudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KGN0cmwuaWRlbnRpdHlEZXRhaWxzLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KGN0cmwuaWRlbnRpdHlEZXRhaWxzWzBdKS50b0VxdWFsKHtsYWJlbDogJ0ZpcnN0IE5hbWUnLCB2YWx1ZTogJ0phbWVzJ30pO1xuICAgICAgICBleHBlY3QoY3RybC5pZGVudGl0eURldGFpbHNbMV0pLnRvRXF1YWwoe2xhYmVsOiAnTGFzdCBOYW1lJywgdmFsdWU6ICdTbWl0aCd9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWRkIGlzUmlnaHRBbGlnbmVkIGZ1bmN0aW9uIHRvIHRoZSBzY29wZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG5cbiAgICAgICAgZXhwZWN0KGN0cmwuaXNSaWdodEFsaWduZWQoJ1NwIEFkbWluJykpLnRvQmVGYWxzeSgpO1xuICAgICAgICBleHBlY3QoY3RybC5pc1JpZ2h0QWxpZ25lZCgnSmFtZXMgU21pdGgnKSkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2xvYWQgZm9yd2FyZGluZyBoaXN0b3J5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdsb2FkcyBmb3J3YXJkaW5nIGhpc3RvcnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwubG9hZEZvcndhcmRpbmdIaXN0b3J5KCk7XG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLmdldEZvcndhcmRpbmdIaXN0b3J5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBsb2FkIGZvcndhcmRpbmcgaGlzdG9yeSBhIHNlY29uZCB0aW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBjdHJsLmxvYWRGb3J3YXJkaW5nSGlzdG9yeSgpO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLmdldEZvcndhcmRpbmdIaXN0b3J5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cbiAgICAgICAgICAgIGN0cmwubG9hZEZvcndhcmRpbmdIaXN0b3J5KCk7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2UuZ2V0Rm9yd2FyZGluZ0hpc3RvcnkuY2FsbHMuY291bnQoKSkudG9FcXVhbCgxKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
