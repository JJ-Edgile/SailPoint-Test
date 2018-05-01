System.register(['test/js/TestInitializer', 'workitem/WorkItemModule'], function (_export) {
    'use strict';

    var workItemModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }],
        execute: function () {

            describe('WorkItemPageCtrl', function () {
                var $scope,
                    $controller,
                    workItemServiceMock,
                    $stateParamsMock,
                    navigationService,
                    $window,
                    $stateMock,
                    WorkItemResult,
                    spNotificationService,
                    spModalService,
                    rejectWorkItemServiceMock,
                    configServiceMock,
                    configServiceResult,
                    q,
                    WorkItem,
                    workItemId = 'workItemId123',
                    workItem = { foo: 'bar', id: workItemId, getId: function () {
                        return workItemId;
                    } };

                beforeEach(module(workItemModule));

                /* jshint maxparams: 8 */
                beforeEach(inject(function (_$rootScope_, _$controller_, _navigationService_, _spNotificationService_, _WorkItemResult_, _$window_, $q, _WorkItem_) {
                    $scope = _$rootScope_;
                    $controller = _$controller_;
                    navigationService = _navigationService_;
                    spNotificationService = _spNotificationService_;
                    WorkItemResult = _WorkItemResult_;
                    WorkItem = _WorkItem_;
                    $window = _$window_;
                    q = $q;

                    $stateParamsMock = {};
                    workItemServiceMock = {
                        navigateToWorkItemPage: jasmine.createSpy(),
                        openWorkItemDialog: jasmine.createSpy().and.returnValue($q.when()),
                        openUnSupportedWorkItemDialog: jasmine.createSpy().and.returnValue($q.when()),
                        getWorkItem: jasmine.createSpy().and.returnValue($q.when(workItem)),
                        getWorkItemFromSession: jasmine.createSpy().and.returnValue($q.when(workItem)),
                        isSupportedWorkItemType: function () {
                            return true;
                        }
                    };

                    //Create a mock configService.
                    configServiceResult = true;
                    configServiceMock = {
                        isMobile: jasmine.createSpy('isMobile').and.callFake(function () {
                            return configServiceResult;
                        })
                    };

                    $stateMock = {
                        go: jasmine.createSpy()
                    };

                    spModalService = {
                        open: jasmine.createSpy().and.callFake(function () {
                            // Open returns an object with a promise for the result property.
                            return {
                                result: $q.when({ status: 200, data: {} })
                            };
                        })
                    };

                    rejectWorkItemServiceMock = {
                        getWorkItem: jasmine.createSpy().and.callFake(function () {
                            return $q.reject({
                                data: {
                                    status: 401,
                                    message: 'work item does not exist'
                                }
                            });
                        })
                    };

                    spyOn(navigationService, 'go').and.returnValue(null);
                    spyOn(spNotificationService, 'addMessage');
                    spyOn($window, 'alert').and.returnValue(null);
                }));

                function createCtrl(workItemId, reject) {
                    if (workItemId) {
                        $stateParamsMock.workItemId = workItemId;
                    }

                    return $controller('WorkItemPageCtrl', {
                        workItemService: reject ? rejectWorkItemServiceMock : workItemServiceMock,
                        $stateParams: $stateParamsMock,
                        navigationService: navigationService,
                        spNotificationService: spNotificationService,
                        $window: $window,
                        $state: $stateMock,
                        spModal: spModalService,
                        configService: configServiceMock
                    });
                }

                describe('with valid url', function () {
                    var ctrl;

                    beforeEach(inject(function ($rootScope) {
                        ctrl = createCtrl(workItemId);

                        /* resolve promise from workItemService */
                        $rootScope.$apply();
                    }));

                    it('should call workItemService.getWorkItem when constructed', function () {
                        expect(workItemServiceMock.getWorkItem).toHaveBeenCalledWith(workItemId);
                    });

                    it('should call workItemService.getWorkItemFromSession when id is session', function () {
                        ctrl = createCtrl('session');

                        expect(workItemServiceMock.getWorkItemFromSession).toHaveBeenCalled();
                    });

                    it('should return the value from workItemService', function () {
                        expect(ctrl.getWorkItem()).toBe(workItem);
                    });
                });

                describe('with no work item id', function () {
                    it('should throw when instantiating', function () {
                        expect(function () {
                            createCtrl();
                        }).toThrow();
                    });
                });

                it('opens modal when work item does not exist', function () {
                    createCtrl('12345', true /* reject work item service */);
                    $scope.$apply();

                    expect(spModalService.open).toHaveBeenCalled();

                    $scope.$apply();
                    // should also navigate away
                    checkNav();
                });

                function checkNav(returnPage) {
                    expect(navigationService.go).toHaveBeenCalledWith({
                        back: true,
                        outcome: returnPage,
                        fallback: 'viewHome',
                        state: 'home'
                    });
                }

                it('goBack() calls navigation service', function () {
                    var ctrl = createCtrl('1234');
                    spyOn(navigationService, 'back');
                    ctrl.goBack();
                    expect(navigationService.back).toHaveBeenCalled();
                });

                describe('completionCallback()', function () {
                    var result, ctrl, manualActionResult;

                    beforeEach(function () {
                        ctrl = createCtrl('boomShalakalaka!!');
                    });

                    function setupUnsupportedWorkItemTest(isMobile) {
                        workItemServiceMock.isSupportedWorkItemType = function () {
                            return false;
                        };

                        configServiceMock.isMobile = function () {
                            return isMobile;
                        };

                        ctrl = createCtrl('12345');

                        result = new WorkItemResult({
                            nextWorkItemId: 'nextItem',
                            nextWorkItemType: 'Unsupported'
                        });

                        ctrl.workItem = {
                            workItemType: 'Form'
                        };
                    }

                    function setupFormToManualActionTest(isMobile) {
                        configServiceMock.isMobile = function () {
                            return isMobile;
                        };

                        //approval to Form
                        workItemServiceMock.isSupportedWorkItemType = function () {
                            return true;
                        };

                        ctrl.workItem = {
                            workItemType: 'Approval',
                            workItemId: workItemId,
                            getId: function () {
                                return workItemId;
                            }
                        };

                        result = new WorkItemResult({
                            nextWorkItemId: '4567',
                            nextWorkItemType: 'Form'
                        });

                        manualActionResult = new WorkItemResult({
                            nextWorkItemId: '1234',
                            nextWorkItemType: 'ManualAction'
                        });

                        workItemServiceMock.openWorkItemDialog = jasmine.createSpy().and.returnValue(q.when(manualActionResult));
                        // opens the form work item in a modal and then the next work item
                        // is manual action work item
                        ctrl.completionCallback(result);
                        expect(workItemServiceMock.openWorkItemDialog).toHaveBeenCalledWith(result.nextWorkItemId);

                        // set supported back to false for manual action work item type
                        workItemServiceMock.isSupportedWorkItemType = function () {
                            return false;
                        };

                        $scope.$apply();
                    }

                    it('adds notification messages and navigates away when there is an error', function () {
                        result = new WorkItemResult();
                        result.addError('uh oh!');
                        ctrl.completionCallback(result);
                        expect(spNotificationService.addMessage).toHaveBeenCalledWith(result.messages[0]);
                        checkNav();
                    });

                    it('if there is another work item of the same type navigate to the new work item', function () {
                        result = new WorkItemResult({
                            nextWorkItemId: 'nextItem',
                            nextWorkItemType: 'Form'
                        });

                        ctrl.workItem = {
                            workItemId: workItemId,
                            workItemType: 'Form',
                            getId: function () {
                                return workItemId;
                            }
                        };

                        // simulate fetching the next work item
                        workItemServiceMock.getWorkItem = jasmine.createSpy().and.returnValue(q.when(new WorkItem({ id: result.nextWorkItemId })));

                        ctrl.completionCallback(result);

                        expect(workItemServiceMock.getWorkItem).toHaveBeenCalledWith(result.nextWorkItemId);

                        $scope.$apply();

                        expect($stateMock.go).toHaveBeenCalled();
                        var args = $stateMock.go.calls.mostRecent().args;
                        expect(args.length).toEqual(3);
                        expect(args[1].workItemId).toEqual(result.nextWorkItemId);
                    });

                    it('if the next work item is unsupported type popup a message and go to home page for mobile version', function () {
                        setupUnsupportedWorkItemTest(true);

                        ctrl.completionCallback(result);

                        // Check that the dialog was opened.
                        expect(workItemServiceMock.openUnSupportedWorkItemDialog).toHaveBeenCalled();
                    });

                    it('if the next work item is unsupported type navigate to JSF work item page for desktop', function () {
                        setupUnsupportedWorkItemTest(false);

                        ctrl.completionCallback(result);

                        expect(workItemServiceMock.navigateToWorkItemPage).toHaveBeenCalledWith(result.nextWorkItemId);
                    });

                    it('if there is another work item of a different supported type popup dialog', function () {
                        result = new WorkItemResult({
                            nextWorkItemId: 'nextItem',
                            nextWorkItemType: 'Form'
                        });

                        ctrl.workItem = {
                            workItemType: 'Approval',
                            workItemId: workItemId,
                            getId: function () {
                                return workItemId;
                            }
                        };

                        ctrl.completionCallback(result);
                        expect(workItemServiceMock.openWorkItemDialog).toHaveBeenCalledWith(result.nextWorkItemId);

                        $scope.$apply();

                        checkNav(undefined);
                    });

                    it('if there is another work item of an unsupported type then navigate to JSF work item' + ' page for desktop', function () {

                        workItemServiceMock.isSupportedWorkItemType = function () {
                            return false;
                        };

                        configServiceMock.isMobile = function () {
                            return false;
                        };

                        result = new WorkItemResult({
                            nextWorkItemId: 'nextItem',
                            nextWorkItemType: 'ManualAction'
                        });

                        ctrl.workItem = {
                            workItemType: 'Form',
                            workItemId: workItemId,
                            getId: function () {
                                return workItemId;
                            }
                        };

                        ctrl.completionCallback(result);
                        expect(workItemServiceMock.navigateToWorkItemPage).toHaveBeenCalledWith(result.nextWorkItemId);

                        $scope.$apply();
                    });

                    it('if there is another work item of an unsupported type after a form then navigate to JSF work item' + ' page for desktop', function () {

                        setupFormToManualActionTest(false);

                        expect(workItemServiceMock.navigateToWorkItemPage).toHaveBeenCalledWith(manualActionResult.nextWorkItemId);

                        $scope.$apply();
                    });

                    it('if there is another work item of an unsupported type after a form then open unsupported dialog' + ' for mobile', function () {

                        setupFormToManualActionTest(true);

                        expect(workItemServiceMock.openUnSupportedWorkItemDialog).toHaveBeenCalled();

                        $scope.$apply();
                    });

                    it('if there is another work item of an unsupported type then popup a message and go to' + ' home page for mobile version', function () {

                        workItemServiceMock.isSupportedWorkItemType = function () {
                            return false;
                        };

                        configServiceMock.isMobile = function () {
                            return true;
                        };

                        result = new WorkItemResult({
                            nextWorkItemId: 'nextItem',
                            nextWorkItemType: 'ManualAction'
                        });

                        ctrl.workItem = {
                            workItemType: 'Form',
                            workItemId: workItemId,
                            getId: function () {
                                return workItemId;
                            }
                        };

                        ctrl.completionCallback(result);
                        expect(workItemServiceMock.openUnSupportedWorkItemDialog).toHaveBeenCalled();

                        $scope.$apply();
                    });

                    it('navigates away when there is no result', function () {
                        ctrl.completionCallback(null);
                        checkNav();
                    });

                    it('navigates away when there is a result with no error', function () {
                        result = new WorkItemResult({
                            messages: [{
                                status: 'SUCCESS',
                                messageOrKey: 'no problem boss!'
                            }]
                        });
                        ctrl.completionCallback(result);
                        checkNav();
                    });

                    it('navigates to the return page if specified', function () {
                        var returnPage = 'elsewhere';
                        result = new WorkItemResult({
                            returnPage: returnPage
                        });
                        ctrl.completionCallback(result);
                        checkNav(returnPage);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL1dvcmtJdGVtUGFnZUN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLFVBQVUsU0FBUztJQUEzRjs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyxvQkFBb0IsWUFBVztnQkFDcEMsSUFBSTtvQkFBUTtvQkFBYTtvQkFBcUI7b0JBQWtCO29CQUFtQjtvQkFBUztvQkFDeEY7b0JBQWdCO29CQUF1QjtvQkFBZ0I7b0JBQTJCO29CQUNsRjtvQkFBcUI7b0JBQUc7b0JBQ3hCLGFBQWE7b0JBQ2IsV0FBVyxFQUFDLEtBQUssT0FBTyxJQUFJLFlBQVksT0FBTyxZQUFXO3dCQUFFLE9BQU87OztnQkFFdkUsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLGNBQWMsZUFBZSxxQkFBcUIseUJBQ2xELGtCQUFrQixXQUFXLElBQUksWUFBWTtvQkFDcEUsU0FBUztvQkFDVCxjQUFjO29CQUNkLG9CQUFvQjtvQkFDcEIsd0JBQXdCO29CQUN4QixpQkFBaUI7b0JBQ2pCLFdBQVc7b0JBQ1gsVUFBVTtvQkFDVixJQUFJOztvQkFFSixtQkFBbUI7b0JBQ25CLHNCQUFzQjt3QkFDbEIsd0JBQXdCLFFBQVE7d0JBQ2hDLG9CQUFvQixRQUFRLFlBQVksSUFBSSxZQUFZLEdBQUc7d0JBQzNELCtCQUErQixRQUFRLFlBQVksSUFBSSxZQUFZLEdBQUc7d0JBQ3RFLGFBQWEsUUFBUSxZQUFZLElBQUksWUFBWSxHQUFHLEtBQUs7d0JBQ3pELHdCQUF3QixRQUFRLFlBQVksSUFBSSxZQUFZLEdBQUcsS0FBSzt3QkFDcEUseUJBQXlCLFlBQVc7NEJBQUUsT0FBTzs7Ozs7b0JBS2pELHNCQUFzQjtvQkFDdEIsb0JBQW9CO3dCQUNo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NEJBQ1osT0FBTyxZQUFXO2dDQUNkLE9BQU87Ozs7d0JBSWYsS0FBSyxtQkFBbUI7d0JBQ3hCLE9BQU8sb0JBQW9CLCtCQUErQjs7d0JBRTFELE9BQU87OztvQkFHWCxHQUFHLDBDQUEwQyxZQUFXO3dCQUNwRCxLQUFLLG1CQUFtQjt3QkFDeEI7OztvQkFHSixHQUFHLHVEQUF1RCxZQUFXO3dCQUNqRSxTQUFTLElBQUksZUFBZTs0QkFDeEIsVUFBVSxDQUFDO2dDQUNQLFFBQVE7Z0NBQ1IsY0FBYzs7O3dCQUd0QixLQUFLLG1CQUFtQjt3QkFDeEI7OztvQkFHSixHQUFHLDZDQUE2QyxZQUFXO3dCQUN2RCxJQUFJLGFBQWE7d0JBQ2pCLFNBQVMsSUFBSSxlQUFlOzRCQUN4QixZQUFZOzt3QkFFaEIsS0FBSyxtQkFBbUI7d0JBQ3hCLFNBQVM7Ozs7OztHQXFCbEIiLCJmaWxlIjoid29ya2l0ZW0vV29ya0l0ZW1QYWdlQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3b3JrSXRlbU1vZHVsZSBmcm9tICd3b3JraXRlbS9Xb3JrSXRlbU1vZHVsZSc7XG5cbmRlc2NyaWJlKCdXb3JrSXRlbVBhZ2VDdHJsJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRzY29wZSwgJGNvbnRyb2xsZXIsIHdvcmtJdGVtU2VydmljZU1vY2ssICRzdGF0ZVBhcmFtc01vY2ssIG5hdmlnYXRpb25TZXJ2aWNlLCAkd2luZG93LCAkc3RhdGVNb2NrLFxuICAgICAgICBXb3JrSXRlbVJlc3VsdCwgc3BOb3RpZmljYXRpb25TZXJ2aWNlLCBzcE1vZGFsU2VydmljZSwgcmVqZWN0V29ya0l0ZW1TZXJ2aWNlTW9jaywgY29uZmlnU2VydmljZU1vY2ssXG4gICAgICAgIGNvbmZpZ1NlcnZpY2VSZXN1bHQsIHEsIFdvcmtJdGVtLFxuICAgICAgICB3b3JrSXRlbUlkID0gJ3dvcmtJdGVtSWQxMjMnLFxuICAgICAgICB3b3JrSXRlbSA9IHtmb286ICdiYXInLCBpZDogd29ya0l0ZW1JZCwgZ2V0SWQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gd29ya0l0ZW1JZDsgfSB9O1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUod29ya0l0ZW1Nb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDggKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29udHJvbGxlcl8sIF9uYXZpZ2F0aW9uU2VydmljZV8sIF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9Xb3JrSXRlbVJlc3VsdF8sIF8kd2luZG93XywgJHEsIF9Xb3JrSXRlbV8pIHtcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcbiAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlID0gX3NwTm90aWZpY2F0aW9uU2VydmljZV87XG4gICAgICAgIFdvcmtJdGVtUmVzdWx0ID0gX1dvcmtJdGVtUmVzdWx0XztcbiAgICAgICAgV29ya0l0ZW0gPSBfV29ya0l0ZW1fO1xuICAgICAgICAkd2luZG93ID0gXyR3aW5kb3dfO1xuICAgICAgICBxID0gJHE7XG5cbiAgICAgICAgJHN0YXRlUGFyYW1zTW9jayA9IHt9O1xuICAgICAgICB3b3JrSXRlbVNlcnZpY2VNb2NrID0ge1xuICAgICAgICAgICAgbmF2aWdhdGVUb1dvcmtJdGVtUGFnZTogamFzbWluZS5jcmVhdGVTcHkoKSxcbiAgICAgICAgICAgIG9wZW5Xb3JrSXRlbURpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKSxcbiAgICAgICAgICAgIG9wZW5VblN1cHBvcnRlZFdvcmtJdGVtRGlhbG9nOiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpLFxuICAgICAgICAgICAgZ2V0V29ya0l0ZW06IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKCRxLndoZW4od29ya0l0ZW0pKSxcbiAgICAgICAgICAgIGdldFdvcmtJdGVtRnJvbVNlc3Npb246IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKCRxLndoZW4od29ya0l0ZW0pKSxcbiAgICAgICAgICAgIGlzU3VwcG9ydGVkV29ya0l0ZW1UeXBlOiBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgfTtcblxuXG4gICAgICAgIC8vQ3JlYXRlIGEgbW9jayBjb25maWdTZXJ2aWNlLlxuICAgICAgICBjb25maWdTZXJ2aWNlUmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgY29uZmlnU2VydmljZU1vY2sgPSB7XG4gICAgICAgICAgICBpc01vYmlsZTogamFzbWluZS5jcmVhdGVTcHkoJ2lzTW9iaWxlJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWdTZXJ2aWNlUmVzdWx0O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICAkc3RhdGVNb2NrID0ge1xuICAgICAgICAgICAgZ286IGphc21pbmUuY3JlYXRlU3B5KClcbiAgICAgICAgfTtcblxuICAgICAgICBzcE1vZGFsU2VydmljZSA9IHtcbiAgICAgICAgICAgIG9wZW46IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIE9wZW4gcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIHByb21pc2UgZm9yIHRoZSByZXN1bHQgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiAkcS53aGVuKHsgc3RhdHVzOiAyMDAsIGRhdGE6IHt9fSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICByZWplY3RXb3JrSXRlbVNlcnZpY2VNb2NrID0ge1xuICAgICAgICAgICAgZ2V0V29ya0l0ZW06IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKCgpID0+ICRxLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDQwMSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ3dvcmsgaXRlbSBkb2VzIG5vdCBleGlzdCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfTtcblxuICAgICAgICBzcHlPbihuYXZpZ2F0aW9uU2VydmljZSwgJ2dvJykuYW5kLnJldHVyblZhbHVlKG51bGwpO1xuICAgICAgICBzcHlPbihzcE5vdGlmaWNhdGlvblNlcnZpY2UsICdhZGRNZXNzYWdlJyk7XG4gICAgICAgIHNweU9uKCR3aW5kb3csICdhbGVydCcpLmFuZC5yZXR1cm5WYWx1ZShudWxsKTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDdHJsKHdvcmtJdGVtSWQsIHJlamVjdCkge1xuICAgICAgICBpZiAod29ya0l0ZW1JZCkge1xuICAgICAgICAgICAgJHN0YXRlUGFyYW1zTW9jay53b3JrSXRlbUlkID0gd29ya0l0ZW1JZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignV29ya0l0ZW1QYWdlQ3RybCcsIHtcbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZTogcmVqZWN0ID8gcmVqZWN0V29ya0l0ZW1TZXJ2aWNlTW9jayA6IHdvcmtJdGVtU2VydmljZU1vY2ssXG4gICAgICAgICAgICAkc3RhdGVQYXJhbXM6ICRzdGF0ZVBhcmFtc01vY2ssXG4gICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZTogbmF2aWdhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2U6IHNwTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICR3aW5kb3c6ICR3aW5kb3csXG4gICAgICAgICAgICAkc3RhdGU6ICRzdGF0ZU1vY2ssXG4gICAgICAgICAgICBzcE1vZGFsOiBzcE1vZGFsU2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IGNvbmZpZ1NlcnZpY2VNb2NrXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCd3aXRoIHZhbGlkIHVybCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3RybDtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ3RybCh3b3JrSXRlbUlkKTtcblxuICAgICAgICAgICAgLyogcmVzb2x2ZSBwcm9taXNlIGZyb20gd29ya0l0ZW1TZXJ2aWNlICovXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHdvcmtJdGVtU2VydmljZS5nZXRXb3JrSXRlbSB3aGVuIGNvbnN0cnVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlTW9jay5nZXRXb3JrSXRlbSkudG9IYXZlQmVlbkNhbGxlZFdpdGgod29ya0l0ZW1JZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB3b3JrSXRlbVNlcnZpY2UuZ2V0V29ya0l0ZW1Gcm9tU2Vzc2lvbiB3aGVuIGlkIGlzIHNlc3Npb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDdHJsKCdzZXNzaW9uJyk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2VNb2NrLmdldFdvcmtJdGVtRnJvbVNlc3Npb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIHZhbHVlIGZyb20gd29ya0l0ZW1TZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRXb3JrSXRlbSgpKS50b0JlKHdvcmtJdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnd2l0aCBubyB3b3JrIGl0ZW0gaWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aGVuIGluc3RhbnRpYXRpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY3JlYXRlQ3RybCgpOyB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ29wZW5zIG1vZGFsIHdoZW4gd29yayBpdGVtIGRvZXMgbm90IGV4aXN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNyZWF0ZUN0cmwoJzEyMzQ1JywgdHJ1ZSAvKiByZWplY3Qgd29yayBpdGVtIHNlcnZpY2UgKi8pO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgZXhwZWN0KHNwTW9kYWxTZXJ2aWNlLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIC8vIHNob3VsZCBhbHNvIG5hdmlnYXRlIGF3YXlcbiAgICAgICAgY2hlY2tOYXYoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNoZWNrTmF2KHJldHVyblBhZ2UpIHtcbiAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgICBiYWNrOiB0cnVlLFxuICAgICAgICAgICAgb3V0Y29tZTogcmV0dXJuUGFnZSxcbiAgICAgICAgICAgIGZhbGxiYWNrOiAndmlld0hvbWUnLFxuICAgICAgICAgICAgc3RhdGU6ICdob21lJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpdCgnZ29CYWNrKCkgY2FsbHMgbmF2aWdhdGlvbiBzZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjdHJsID0gY3JlYXRlQ3RybCgnMTIzNCcpO1xuICAgICAgICBzcHlPbihuYXZpZ2F0aW9uU2VydmljZSwgJ2JhY2snKTtcbiAgICAgICAgY3RybC5nb0JhY2soKTtcbiAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmJhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb21wbGV0aW9uQ2FsbGJhY2soKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVzdWx0LCBjdHJsLCBtYW51YWxBY3Rpb25SZXN1bHQ7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDdHJsKCdib29tU2hhbGFrYWxha2EhIScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBzZXR1cFVuc3VwcG9ydGVkV29ya0l0ZW1UZXN0KGlzTW9iaWxlKSB7XG4gICAgICAgICAgICB3b3JrSXRlbVNlcnZpY2VNb2NrLmlzU3VwcG9ydGVkV29ya0l0ZW1UeXBlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uZmlnU2VydmljZU1vY2suaXNNb2JpbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNNb2JpbGU7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ3RybCgnMTIzNDUnKTtcblxuICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFdvcmtJdGVtUmVzdWx0KHtcbiAgICAgICAgICAgICAgICBuZXh0V29ya0l0ZW1JZDogJ25leHRJdGVtJyxcbiAgICAgICAgICAgICAgICBuZXh0V29ya0l0ZW1UeXBlOiAnVW5zdXBwb3J0ZWQnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY3RybC53b3JrSXRlbSA9IHtcbiAgICAgICAgICAgICAgICB3b3JrSXRlbVR5cGU6ICdGb3JtJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwRm9ybVRvTWFudWFsQWN0aW9uVGVzdChpc01vYmlsZSkge1xuICAgICAgICAgICAgY29uZmlnU2VydmljZU1vY2suaXNNb2JpbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNNb2JpbGU7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvL2FwcHJvdmFsIHRvIEZvcm1cbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZU1vY2suaXNTdXBwb3J0ZWRXb3JrSXRlbVR5cGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGN0cmwud29ya0l0ZW0gPSB7XG4gICAgICAgICAgICAgICAgd29ya0l0ZW1UeXBlOiAnQXBwcm92YWwnLFxuICAgICAgICAgICAgICAgIHdvcmtJdGVtSWQ6IHdvcmtJdGVtSWQsXG4gICAgICAgICAgICAgICAgZ2V0SWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd29ya0l0ZW1JZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgV29ya0l0ZW1SZXN1bHQoe1xuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbUlkOiAnNDU2NycsXG4gICAgICAgICAgICAgICAgbmV4dFdvcmtJdGVtVHlwZTogJ0Zvcm0nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWFudWFsQWN0aW9uUmVzdWx0ID0gbmV3IFdvcmtJdGVtUmVzdWx0KHtcbiAgICAgICAgICAgICAgICBuZXh0V29ya0l0ZW1JZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbVR5cGU6ICdNYW51YWxBY3Rpb24nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlTW9jay5vcGVuV29ya0l0ZW1EaWFsb2cgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZShxLndoZW4obWFudWFsQWN0aW9uUmVzdWx0KSk7XG4gICAgICAgICAgICAvLyBvcGVucyB0aGUgZm9ybSB3b3JrIGl0ZW0gaW4gYSBtb2RhbCBhbmQgdGhlbiB0aGUgbmV4dCB3b3JrIGl0ZW1cbiAgICAgICAgICAgIC8vIGlzIG1hbnVhbCBhY3Rpb24gd29yayBpdGVtXG4gICAgICAgICAgICBjdHJsLmNvbXBsZXRpb25DYWxsYmFjayhyZXN1bHQpO1xuICAgICAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZU1vY2sub3BlbldvcmtJdGVtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChyZXN1bHQubmV4dFdvcmtJdGVtSWQpO1xuXG4gICAgICAgICAgICAvLyBzZXQgc3VwcG9ydGVkIGJhY2sgdG8gZmFsc2UgZm9yIG1hbnVhbCBhY3Rpb24gd29yayBpdGVtIHR5cGVcbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZU1vY2suaXNTdXBwb3J0ZWRXb3JrSXRlbVR5cGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnYWRkcyBub3RpZmljYXRpb24gbWVzc2FnZXMgYW5kIG5hdmlnYXRlcyBhd2F5IHdoZW4gdGhlcmUgaXMgYW4gZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBXb3JrSXRlbVJlc3VsdCgpO1xuICAgICAgICAgICAgcmVzdWx0LmFkZEVycm9yKCd1aCBvaCEnKTtcbiAgICAgICAgICAgIGN0cmwuY29tcGxldGlvbkNhbGxiYWNrKHJlc3VsdCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE1lc3NhZ2UpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHJlc3VsdC5tZXNzYWdlc1swXSk7XG4gICAgICAgICAgICBjaGVja05hdigpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaWYgdGhlcmUgaXMgYW5vdGhlciB3b3JrIGl0ZW0gb2YgdGhlIHNhbWUgdHlwZSBuYXZpZ2F0ZSB0byB0aGUgbmV3IHdvcmsgaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFdvcmtJdGVtUmVzdWx0KHtcbiAgICAgICAgICAgICAgICBuZXh0V29ya0l0ZW1JZDogJ25leHRJdGVtJyxcbiAgICAgICAgICAgICAgICBuZXh0V29ya0l0ZW1UeXBlOiAnRm9ybSdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjdHJsLndvcmtJdGVtID0ge1xuICAgICAgICAgICAgICAgIHdvcmtJdGVtSWQ6IHdvcmtJdGVtSWQsXG4gICAgICAgICAgICAgICAgd29ya0l0ZW1UeXBlOiAnRm9ybScsXG4gICAgICAgICAgICAgICAgZ2V0SWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd29ya0l0ZW1JZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzaW11bGF0ZSBmZXRjaGluZyB0aGUgbmV4dCB3b3JrIGl0ZW1cbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZU1vY2suZ2V0V29ya0l0ZW0gPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgICAgICBxLndoZW4obmV3IFdvcmtJdGVtKHtpZDogcmVzdWx0Lm5leHRXb3JrSXRlbUlkfSkpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjdHJsLmNvbXBsZXRpb25DYWxsYmFjayhyZXN1bHQpO1xuXG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlTW9jay5nZXRXb3JrSXRlbSkudG9IYXZlQmVlbkNhbGxlZFdpdGgocmVzdWx0Lm5leHRXb3JrSXRlbUlkKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBleHBlY3QoJHN0YXRlTW9jay5nbykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgbGV0IGFyZ3MgPSAkc3RhdGVNb2NrLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICAgICAgZXhwZWN0KGFyZ3MubGVuZ3RoKS50b0VxdWFsKDMpO1xuICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMV0ud29ya0l0ZW1JZCkudG9FcXVhbChyZXN1bHQubmV4dFdvcmtJdGVtSWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaWYgdGhlIG5leHQgd29yayBpdGVtIGlzIHVuc3VwcG9ydGVkIHR5cGUgcG9wdXAgYSBtZXNzYWdlIGFuZCBnbyB0byBob21lIHBhZ2UgZm9yIG1vYmlsZSB2ZXJzaW9uJyxcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNldHVwVW5zdXBwb3J0ZWRXb3JrSXRlbVRlc3QodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBjdHJsLmNvbXBsZXRpb25DYWxsYmFjayhyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgZGlhbG9nIHdhcyBvcGVuZWQuXG4gICAgICAgICAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZU1vY2sub3BlblVuU3VwcG9ydGVkV29ya0l0ZW1EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lmIHRoZSBuZXh0IHdvcmsgaXRlbSBpcyB1bnN1cHBvcnRlZCB0eXBlIG5hdmlnYXRlIHRvIEpTRiB3b3JrIGl0ZW0gcGFnZSBmb3IgZGVza3RvcCcsXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZXR1cFVuc3VwcG9ydGVkV29ya0l0ZW1UZXN0KGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGN0cmwuY29tcGxldGlvbkNhbGxiYWNrKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlTW9jay5uYXZpZ2F0ZVRvV29ya0l0ZW1QYWdlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChyZXN1bHQubmV4dFdvcmtJdGVtSWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaWYgdGhlcmUgaXMgYW5vdGhlciB3b3JrIGl0ZW0gb2YgYSBkaWZmZXJlbnQgc3VwcG9ydGVkIHR5cGUgcG9wdXAgZGlhbG9nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgV29ya0l0ZW1SZXN1bHQoe1xuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbUlkOiAnbmV4dEl0ZW0nLFxuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbVR5cGU6ICdGb3JtJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGN0cmwud29ya0l0ZW0gPSB7XG4gICAgICAgICAgICAgICAgd29ya0l0ZW1UeXBlOiAnQXBwcm92YWwnLFxuICAgICAgICAgICAgICAgIHdvcmtJdGVtSWQ6IHdvcmtJdGVtSWQsXG4gICAgICAgICAgICAgICAgZ2V0SWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd29ya0l0ZW1JZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjdHJsLmNvbXBsZXRpb25DYWxsYmFjayhyZXN1bHQpO1xuICAgICAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZU1vY2sub3BlbldvcmtJdGVtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChyZXN1bHQubmV4dFdvcmtJdGVtSWQpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgIGNoZWNrTmF2KHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpZiB0aGVyZSBpcyBhbm90aGVyIHdvcmsgaXRlbSBvZiBhbiB1bnN1cHBvcnRlZCB0eXBlIHRoZW4gbmF2aWdhdGUgdG8gSlNGIHdvcmsgaXRlbScgK1xuICAgICAgICAgICAgICAgICcgcGFnZSBmb3IgZGVza3RvcCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICB3b3JrSXRlbVNlcnZpY2VNb2NrLmlzU3VwcG9ydGVkV29ya0l0ZW1UeXBlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uZmlnU2VydmljZU1vY2suaXNNb2JpbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgV29ya0l0ZW1SZXN1bHQoe1xuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbUlkOiAnbmV4dEl0ZW0nLFxuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbVR5cGU6ICdNYW51YWxBY3Rpb24nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY3RybC53b3JrSXRlbSA9IHtcbiAgICAgICAgICAgICAgICB3b3JrSXRlbVR5cGU6ICdGb3JtJyxcbiAgICAgICAgICAgICAgICB3b3JrSXRlbUlkOiB3b3JrSXRlbUlkLFxuICAgICAgICAgICAgICAgIGdldElkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtJdGVtSWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY3RybC5jb21wbGV0aW9uQ2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2VNb2NrLm5hdmlnYXRlVG9Xb3JrSXRlbVBhZ2UpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHJlc3VsdC5uZXh0V29ya0l0ZW1JZCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lmIHRoZXJlIGlzIGFub3RoZXIgd29yayBpdGVtIG9mIGFuIHVuc3VwcG9ydGVkIHR5cGUgYWZ0ZXIgYSBmb3JtIHRoZW4gbmF2aWdhdGUgdG8gSlNGIHdvcmsgaXRlbScgK1xuICAgICAgICAgICAgICAgICcgcGFnZSBmb3IgZGVza3RvcCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBzZXR1cEZvcm1Ub01hbnVhbEFjdGlvblRlc3QoZmFsc2UpO1xuXG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlTW9jay5uYXZpZ2F0ZVRvV29ya0l0ZW1QYWdlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChtYW51YWxBY3Rpb25SZXN1bHQubmV4dFdvcmtJdGVtSWQpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpZiB0aGVyZSBpcyBhbm90aGVyIHdvcmsgaXRlbSBvZiBhbiB1bnN1cHBvcnRlZCB0eXBlIGFmdGVyIGEgZm9ybSB0aGVuIG9wZW4gdW5zdXBwb3J0ZWQgZGlhbG9nJyArXG4gICAgICAgICAgICAgICAgJyBmb3IgbW9iaWxlJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHNldHVwRm9ybVRvTWFudWFsQWN0aW9uVGVzdCh0cnVlKTtcblxuICAgICAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZU1vY2sub3BlblVuU3VwcG9ydGVkV29ya0l0ZW1EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaWYgdGhlcmUgaXMgYW5vdGhlciB3b3JrIGl0ZW0gb2YgYW4gdW5zdXBwb3J0ZWQgdHlwZSB0aGVuIHBvcHVwIGEgbWVzc2FnZSBhbmQgZ28gdG8nICtcbiAgICAgICAgICAgICAgICAnIGhvbWUgcGFnZSBmb3IgbW9iaWxlIHZlcnNpb24nLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlTW9jay5pc1N1cHBvcnRlZFdvcmtJdGVtVHlwZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2VNb2NrLmlzTW9iaWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgV29ya0l0ZW1SZXN1bHQoe1xuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbUlkOiAnbmV4dEl0ZW0nLFxuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbVR5cGU6ICdNYW51YWxBY3Rpb24nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY3RybC53b3JrSXRlbSA9IHtcbiAgICAgICAgICAgICAgICB3b3JrSXRlbVR5cGU6ICdGb3JtJyxcbiAgICAgICAgICAgICAgICB3b3JrSXRlbUlkOiB3b3JrSXRlbUlkLFxuICAgICAgICAgICAgICAgIGdldElkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtJdGVtSWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY3RybC5jb21wbGV0aW9uQ2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2VNb2NrLm9wZW5VblN1cHBvcnRlZFdvcmtJdGVtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ25hdmlnYXRlcyBhd2F5IHdoZW4gdGhlcmUgaXMgbm8gcmVzdWx0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLmNvbXBsZXRpb25DYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIGNoZWNrTmF2KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCduYXZpZ2F0ZXMgYXdheSB3aGVuIHRoZXJlIGlzIGEgcmVzdWx0IHdpdGggbm8gZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBXb3JrSXRlbVJlc3VsdCh7XG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ1NVQ0NFU1MnLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlT3JLZXk6ICdubyBwcm9ibGVtIGJvc3MhJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGN0cmwuY29tcGxldGlvbkNhbGxiYWNrKHJlc3VsdCk7XG4gICAgICAgICAgICBjaGVja05hdigpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnbmF2aWdhdGVzIHRvIHRoZSByZXR1cm4gcGFnZSBpZiBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXR1cm5QYWdlID0gJ2Vsc2V3aGVyZSc7XG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgV29ya0l0ZW1SZXN1bHQoe1xuICAgICAgICAgICAgICAgIHJldHVyblBhZ2U6IHJldHVyblBhZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3RybC5jb21wbGV0aW9uQ2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICAgIGNoZWNrTmF2KHJldHVyblBhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
