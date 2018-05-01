System.register(['test/js/TestInitializer', 'workitem/violationReview/ViolationReviewModule', 'test/js/workitem/WorkItemTestData'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var violationReviewModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemViolationReviewViolationReviewModule) {
            violationReviewModule = _workitemViolationReviewViolationReviewModule['default'];
        }, function (_testJsWorkitemWorkItemTestData) {}],
        execute: function () {

            /**
             * ViolationReviewWorkItemCtrl tests
             */
            /* jshint maxparams: 10 */
            describe('ViolationReviewWorkItemCtrl', function () {
                var $scope,
                    $q,
                    $httpBackend,
                    $controller,
                    testService,
                    ctrl,
                    configService,
                    columnConfigs = ['some', 'configs'],
                    ViolationReviewRequestedItem,
                    ViolationReviewWorkItem,
                    vrWorkItemService,
                    workItemService,
                    violationService,
                    navigationService,
                    ViolationReviewResult,
                    workItem,
                    callbackSpy,
                    workItemTestData,
                    stateMock;

                // Load the test module to get the testService.
                beforeEach(module('sailpoint.test'));

                // Let the tests know we'll use the violation review module.
                beforeEach(module(violationReviewModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                // Helper function to setup the controller with different workItem data
                function setupController(data) {
                    workItem = new ViolationReviewWorkItem(data);
                    ctrl = $controller('ViolationReviewWorkItemCtrl', {
                        configService: configService,
                        violationReviewWorkItemService: vrWorkItemService,
                        workItemService: workItemService,
                        violationService: violationService,
                        navigationService: navigationService,
                        $state: stateMock
                    }, {
                        workItem: workItem,
                        templateStyle: 'collapsible',
                        completionCallback: callbackSpy
                    });
                    ctrl.$onInit();
                }

                beforeEach(inject(function (_$rootScope_, _$q_, _$httpBackend_, _ViolationReviewWorkItem_, _ViolationReviewResult_, _ViolationReviewRequestedItem_, _navigationService_, _testService_, _$controller_, _workItemTestData_) {
                    $scope = _$rootScope_;
                    $q = _$q_;
                    $httpBackend = _$httpBackend_;
                    ViolationReviewWorkItem = _ViolationReviewWorkItem_;
                    ViolationReviewRequestedItem = _ViolationReviewRequestedItem_;
                    ViolationReviewResult = _ViolationReviewResult_;
                    $controller = _$controller_;
                    testService = _testService_;
                    navigationService = _navigationService_;
                    workItemTestData = _workItemTestData_;

                    // mock up config service
                    configService = {
                        getColumnConfigEntries: testService.createPromiseSpy(false, {
                            status: 200,
                            data: {
                                testColumns: columnConfigs
                            }
                        }, {})
                    };

                    // mock up the workitem service
                    vrWorkItemService = {
                        resolveViolations: testService.createPromiseSpy(false, {
                            foo: 'bar'
                        }, {})
                    };

                    workItemService = {
                        deleteWorkItem: testService.createPromiseSpy(false, {
                            status: 200
                        }, {}),
                        showForwardDialog: jasmine.createSpy()
                    };

                    violationService = {
                        showViolationDialog: testService.createPromiseSpy(false, {
                            foo: 'bar'
                        }, {})
                    };

                    // mock up the callback
                    callbackSpy = jasmine.createSpy();

                    stateMock = {
                        go: jasmine.createSpy()
                    };

                    setupController(workItemTestData.workItemTestData1);
                }));

                it('should load column configs on init', function () {
                    expect(configService.getColumnConfigEntries).toHaveBeenCalled();
                });

                describe('isDirty()', function () {
                    it('should return false when requested items have not changed.', function () {
                        expect(ctrl.isDirty()).toBeFalsy();
                    });

                    it('should return true when requested items have changed.', function () {
                        expect(ctrl.isDirty()).toBeFalsy();
                        ctrl.toggleRequestedItemState(ctrl.workItem.getRequestedItems()[0]);
                        expect(ctrl.isDirty()).toBeTruthy();
                    });

                    it('should return false when requested items changed, but the state is then reset to original.', function () {
                        expect(ctrl.isDirty()).toBeFalsy();
                        ctrl.toggleRequestedItemState(ctrl.workItem.getRequestedItems()[0]);
                        expect(ctrl.isDirty()).toBeTruthy();
                        ctrl.toggleRequestedItemState(ctrl.workItem.getRequestedItems()[0]);
                        expect(ctrl.isDirty()).toBeFalsy();
                    });
                });

                describe('isAllowViolationEnabled()', function () {
                    it('should return false when workItem\'s property is false.', function () {
                        expect(ctrl.isAllowViolationEnabled()).toBeFalsy();
                    });
                    it('should return true when workItem\'s property is true.', function () {
                        ctrl.workItem.allowRequestsWithViolations = true;
                        expect(ctrl.isAllowViolationEnabled()).toBeTruthy();
                    });
                });

                describe('states', function () {
                    it('should initially have isSolving true', function () {
                        expect(ctrl.isSolving()).toBeTruthy();
                        expect(ctrl.isInProgress()).toBeFalsy();
                        expect(ctrl.isDeciding()).toBeFalsy();
                    });

                    /* In these tests I chose to use the literals for state  because the way states are represented does not
                     * need to be exposed to the intended consumer of this object */
                    it('should have isInProgress true when state is in progress', function () {
                        ctrl.state = 'inProgress';
                        expect(ctrl.isSolving()).toBeFalsy();
                        expect(ctrl.isInProgress()).toBeTruthy();
                        expect(ctrl.isDeciding()).toBeFalsy();
                    });

                    it('should have isDeciding true when state is deciding', function () {
                        ctrl.state = 'deciding';
                        expect(ctrl.isSolving()).toBeFalsy();
                        expect(ctrl.isInProgress()).toBeFalsy();
                        expect(ctrl.isDeciding()).toBeTruthy();
                    });

                    it('should have isSolving true after solve() is called', function () {
                        ctrl.state = 'deciding';
                        ctrl.solve();
                        expect(ctrl.isSolving()).toBeTruthy();
                        expect(ctrl.isInProgress()).toBeFalsy();
                        expect(ctrl.isDeciding()).toBeFalsy();
                    });
                });

                describe('submit()', function () {
                    describe('resolving violations', function () {
                        var requestedItem;

                        beforeEach(function () {
                            requestedItem = workItem.getRequestedItems()[0];
                            ctrl.toggleRequestedItemState(requestedItem);
                        });

                        it('should call violationReviewWorkItemService.resolveViolations with ids of rejected requested items', function () {
                            ctrl.submit();
                            expect(vrWorkItemService.resolveViolations).toHaveBeenCalledWith(workItem.getId(), [requestedItem.getId()]);
                        });

                        it('should set isInProgress to true', function () {
                            ctrl.submit();
                            expect(ctrl.isInProgress()).toBeTruthy();
                        });

                        it('should invoke the callback if the submit succeeds', function () {
                            vrWorkItemService.resolveViolations = jasmine.createSpy().and.returnValue($q.when(new ViolationReviewResult({
                                workflowStatus: 'success',
                                identityRequestId: 'requestId'
                            })));
                            ctrl.submit();
                            $scope.$apply();
                            expect(callbackSpy).toHaveBeenCalled();
                        });
                    });

                    describe('submitting with violations', function () {
                        beforeEach(function () {
                            vrWorkItemService.submitWithViolations = jasmine.createSpy().and.returnValue($q.when(new ViolationReviewResult({
                                workflowStatus: 'success',
                                identityRequestId: 'requestId'
                            })));
                        });

                        describe('without required comment', function () {
                            it('should set isInProgress to true', function () {
                                ctrl.submit();
                                expect(ctrl.isInProgress()).toBeTruthy();
                            });

                            it('should call violationReviewWorkItemService.submitWithViolations()', function () {
                                ctrl.submit();
                                $scope.$digest();
                                expect(vrWorkItemService.submitWithViolations).toHaveBeenCalled();
                            });
                        });

                        describe('requiring comment', function () {

                            beforeEach(function () {
                                violationService.showCommentDialog = jasmine.createSpy();
                                workItem.requireViolationComment = true;
                            });

                            it('should show the comment dialog', function () {
                                violationService.showCommentDialog.and.returnValue($q.when());
                                ctrl.submit();
                                $scope.$digest();
                                expect(violationService.showCommentDialog).toHaveBeenCalled();
                            });

                            it('should return to solving state if comment dialog is canceled', function () {
                                violationService.showCommentDialog.and.returnValue($q.reject());
                                ctrl.submit();
                                $scope.$digest();
                                expect(vrWorkItemService.submitWithViolations).not.toHaveBeenCalled();
                                expect(ctrl.isSolving()).toBeTruthy();
                            });

                            it('should call through to submitWithViolations if comment is added', function () {
                                var comment = 'someComment';
                                violationService.showCommentDialog.and.returnValue($q.when(comment));
                                ctrl.submit();
                                $scope.$digest();
                                expect(vrWorkItemService.submitWithViolations).toHaveBeenCalledWith(workItem.getId(), comment);
                            });

                            describe('submitted without comments', function () {
                                var spModal,
                                    errorMessage = 'need completion comment';

                                beforeEach(inject(function (_spModal_) {
                                    spModal = _spModal_;
                                    violationService.showCommentDialog.and.returnValue($q.when());

                                    vrWorkItemService.submitWithViolations = jasmine.createSpy().and.returnValue($q.when(new ViolationReviewResult({
                                        workflowStatus: 'failure',
                                        messages: [{
                                            messageOrKey: errorMessage,
                                            status: 'WARN'
                                        }]
                                    })));
                                }));

                                it('should return to the solving state if submitWithViolations fails', function () {
                                    spModal.open = jasmine.createSpy();
                                    ctrl.submit();
                                    $scope.$digest();
                                    expect(ctrl.isSolving()).toBeTruthy();
                                });

                                it('should show the comment warning dialog if submitWithViolations fails', function () {
                                    spModal.open = jasmine.createSpy();
                                    ctrl.submit();
                                    $scope.$digest();
                                    expect(spModal.open.calls.mostRecent().args[0].warningLevel).toEqual('warning');
                                    expect(spModal.open.calls.mostRecent().args[0].content).toEqual(errorMessage);
                                });
                            });
                        });
                    });

                    describe('when returning a new violation review work item', function () {
                        var violationReviewResult = undefined;
                        beforeEach(function () {
                            violationReviewResult = new ViolationReviewResult({
                                workflowStatus: 'success',
                                nextWorkItemId: '1234',
                                nextWorkItemType: 'ViolationReview',
                                nextWorkItem: {
                                    id: '1234',
                                    allowRequestsWithViolations: true,
                                    workItemType: 'ViolationReview',
                                    requestedItems: [{
                                        id: 'approvalItemId1',
                                        attributes: {
                                            id: 'requestedId1'
                                        }
                                    }]
                                },
                                identityRequestId: 'requestedIdentity'
                            });

                            vrWorkItemService.resolveViolations = jasmine.createSpy().and.returnValue($q.when(violationReviewResult));

                            /* Toggle an item so we do not try to submit with violations */
                            ctrl.toggleRequestedItemState(workItem.getRequestedItems()[0]);
                        });

                        it('should set isInProgress to false once promise resolves', function () {
                            ctrl.submit();
                            $scope.$apply();
                            expect(ctrl.isInProgress()).toBeFalsy();
                        });

                        function testStateGo() {
                            expect(stateMock.go).toHaveBeenCalled();
                            var args = stateMock.go.calls.mostRecent().args;
                            expect(args.length).toEqual(3);
                            expect(args[1].workItemId).toEqual(violationReviewResult.nextWorkItemId);
                        }

                        it('should set isDeciding to true if allow with violations is true', function () {
                            spyOn(ctrl, 'isAllowViolationEnabled').and.returnValue(true);
                            ctrl.submit();
                            $scope.$apply();
                            expect(ctrl.isDeciding()).toBeTruthy();
                            expect(ctrl.isSolving()).toBeFalsy();
                            testStateGo();
                        });

                        it('should set isDeciding to true if allow with violations is false', function () {
                            spyOn(ctrl, 'isAllowViolationEnabled').and.returnValue(false);
                            ctrl.submit();
                            $scope.$apply();
                            expect(ctrl.isDeciding()).toBeTruthy();
                            expect(ctrl.isSolving()).toBeFalsy();
                            testStateGo();
                        });

                        it('should not invoke the completion callback', function () {
                            ctrl.submit();
                            $scope.$apply();
                            expect(callbackSpy).not.toHaveBeenCalled();
                        });
                    });
                });

                describe('cancelRequest()', function () {
                    it('should call workItemService.deleteWorkItem', function () {
                        ctrl.cancelRequest();
                        expect(workItemService.deleteWorkItem).toHaveBeenCalled();
                    });

                    it('should invoke the completion callback with violation review result', function () {
                        ctrl.cancelRequest();
                        $scope.$apply();
                        expect(callbackSpy).toHaveBeenCalledWith(new ViolationReviewResult({
                            messages: [{ messageOrKey: 'ui_access_request_submit_canceled' }]
                        }));
                    });
                });

                describe('hasPolicyViolation()', function () {
                    it('should detect violation on entitlement, but not role', function () {
                        setupController(workItemTestData.workItemTestData3);

                        var items = ctrl.workItem.getRequestedItems();
                        expect(ctrl.hasPolicyViolation(items[0])).toBeFalsy();
                        expect(ctrl.hasPolicyViolation(items[1])).toBeTruthy();
                        expect(ctrl.hasPolicyViolation(items[2])).toBeTruthy();
                    });

                    it('should detect violation only on roles with a violation', function () {
                        setupController(workItemTestData.workItemTestData1);

                        var items = ctrl.workItem.getRequestedItems();
                        expect(ctrl.hasPolicyViolation(items[0])).toBeFalsy();
                        expect(ctrl.hasPolicyViolation(items[1])).toBeTruthy();
                        expect(ctrl.hasPolicyViolation(items[2])).toBeTruthy();
                    });
                });

                describe('showViolationDetails()', function () {
                    it('should call violationService.showViolationDialog', function () {
                        var violation = workItem.getViolations()[0];
                        ctrl.showViolationDetails(violation);
                        expect(violationService.showViolationDialog).toHaveBeenCalledWith(workItem.getId(), violation);
                    });
                });

                describe('showForwardDialog()', function () {
                    it('should call workItemService.showForwardDialog', function () {
                        ctrl.showForwardDialog();
                        expect(workItemService.showForwardDialog).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL3Zpb2xhdGlvblJldmlldy9WaW9sYXRpb25SZXZpZXdXb3JrSXRlbUN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsa0RBQWtELHNDQUFzQyxVQUFVLFNBQVM7O0lBQ3ZKOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwrQ0FBK0M7WUFDckcsd0JBQXdCLDhDQUE4QztXQUN2RSxVQUFVLGlDQUFpQztRQUM5QyxTQUFTLFlBQVk7Ozs7OztZQUU3QixTQUFTLCtCQUErQixZQUFXO2dCQUMvQyxJQUFJO29CQUFRO29CQUFJO29CQUFjO29CQUFhO29CQUFhO29CQUFNO29CQUMxRCxnQkFBZ0IsQ0FBRSxRQUFRO29CQUFhO29CQUN2QztvQkFBeUI7b0JBQW1CO29CQUFpQjtvQkFBa0I7b0JBQy9FO29CQUF1QjtvQkFBVTtvQkFBYTtvQkFBa0I7OztnQkFHcEUsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxtQkFBbUI7Ozs7Z0JBSXpDLFNBQVMsZ0JBQWdCLE1BQU07b0JBQzNCLFdBQVcsSUFBSSx3QkFBd0I7b0JBQ3ZDLE9BQU8sWUFBWSwrQkFBK0I7d0JBQzlDLGVBQWU7d0JBQ2YsZ0NBQWdDO3dCQUNoQyxpQkFBaUI7d0JBQ2pCLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixRQUFRO3VCQUNUO3dCQUNDLFVBQVU7d0JBQ1YsZUFBZTt3QkFDZixvQkFBb0I7O29CQUV4QixLQUFLOzs7Z0JBR1QsV0FBVyxPQUFPLFVBQVMsY0FBYyxNQUFNLGdCQUFnQiwyQkFBMkIseUJBQy9ELGdDQUFnQyxxQkFBcUIsZUFBZSxlQUNwRSxvQkFBb0I7b0JBQzNDLFNBQVM7b0JBQ1QsS0FBSztvQkFDTCxlQUFlO29CQUNmLDBCQUEwQjtvQkFDMUIs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QUFJLFFBQVEsS0FBSyxTQUFTO3dCQUMxQixPQUFPLEtBQUssbUJBQW1CLE1BQU0sS0FBSzt3QkFDMUMsT0FBTyxLQUFLLG1CQUFtQixNQUFNLEtBQUs7d0JBQzFDLE9BQU8sS0FBSyxtQkFBbUIsTUFBTSxLQUFLOzs7O2dCQUlsRCxTQUFTLDBCQUEwQixZQUFXO29CQUMxQyxHQUFHLG9EQUFvRCxZQUFXO3dCQUM5RCxJQUFJLFlBQVksU0FBUyxnQkFBZ0I7d0JBQ3pDLEtBQUsscUJBQXFCO3dCQUMxQixPQUFPLGlCQUFpQixxQkFBcUIscUJBQXFCLFNBQVMsU0FBUzs7OztnQkFJNUYsU0FBUyx1QkFBdUIsWUFBVztvQkFDdkMsR0FBRyxpREFBaUQsWUFBVzt3QkFDM0QsS0FBSzt3QkFDTCxPQUFPLGdCQUFnQixtQkFBbUI7Ozs7OztHQVNuRCIsImZpbGUiOiJ3b3JraXRlbS92aW9sYXRpb25SZXZpZXcvVmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1DdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTUgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdmlvbGF0aW9uUmV2aWV3TW9kdWxlIGZyb20gJ3dvcmtpdGVtL3Zpb2xhdGlvblJldmlldy9WaW9sYXRpb25SZXZpZXdNb2R1bGUnO1xuaW1wb3J0ICd0ZXN0L2pzL3dvcmtpdGVtL1dvcmtJdGVtVGVzdERhdGEnO1xuXG4vKipcbiAqIFZpb2xhdGlvblJldmlld1dvcmtJdGVtQ3RybCB0ZXN0c1xuICovXG4vKiBqc2hpbnQgbWF4cGFyYW1zOiAxMCAqL1xuZGVzY3JpYmUoJ1Zpb2xhdGlvblJldmlld1dvcmtJdGVtQ3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkc2NvcGUsICRxLCAkaHR0cEJhY2tlbmQsICRjb250cm9sbGVyLCB0ZXN0U2VydmljZSwgY3RybCwgY29uZmlnU2VydmljZSxcbiAgICAgICAgY29sdW1uQ29uZmlncyA9IFsgJ3NvbWUnLCAnY29uZmlncycgXSwgVmlvbGF0aW9uUmV2aWV3UmVxdWVzdGVkSXRlbSxcbiAgICAgICAgVmlvbGF0aW9uUmV2aWV3V29ya0l0ZW0sIHZyV29ya0l0ZW1TZXJ2aWNlLCB3b3JrSXRlbVNlcnZpY2UsIHZpb2xhdGlvblNlcnZpY2UsIG5hdmlnYXRpb25TZXJ2aWNlLFxuICAgICAgICBWaW9sYXRpb25SZXZpZXdSZXN1bHQsIHdvcmtJdGVtLCBjYWxsYmFja1NweSwgd29ya0l0ZW1UZXN0RGF0YSwgc3RhdGVNb2NrO1xuXG4gICAgLy8gTG9hZCB0aGUgdGVzdCBtb2R1bGUgdG8gZ2V0IHRoZSB0ZXN0U2VydmljZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSgnc2FpbHBvaW50LnRlc3QnKSk7XG5cbiAgICAvLyBMZXQgdGhlIHRlc3RzIGtub3cgd2UnbGwgdXNlIHRoZSB2aW9sYXRpb24gcmV2aWV3IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh2aW9sYXRpb25SZXZpZXdNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICB9KSk7XG5cbiAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0dXAgdGhlIGNvbnRyb2xsZXIgd2l0aCBkaWZmZXJlbnQgd29ya0l0ZW0gZGF0YVxuICAgIGZ1bmN0aW9uIHNldHVwQ29udHJvbGxlcihkYXRhKSB7XG4gICAgICAgIHdvcmtJdGVtID0gbmV3IFZpb2xhdGlvblJldmlld1dvcmtJdGVtKGRhdGEpO1xuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ1Zpb2xhdGlvblJldmlld1dvcmtJdGVtQ3RybCcsIHtcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IGNvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICB2aW9sYXRpb25SZXZpZXdXb3JrSXRlbVNlcnZpY2U6IHZyV29ya0l0ZW1TZXJ2aWNlLFxuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlOiB3b3JrSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICB2aW9sYXRpb25TZXJ2aWNlOiB2aW9sYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgbmF2aWdhdGlvblNlcnZpY2U6IG5hdmlnYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgJHN0YXRlOiBzdGF0ZU1vY2tcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgd29ya0l0ZW06IHdvcmtJdGVtLFxuICAgICAgICAgICAgdGVtcGxhdGVTdHlsZTogJ2NvbGxhcHNpYmxlJyxcbiAgICAgICAgICAgIGNvbXBsZXRpb25DYWxsYmFjazogY2FsbGJhY2tTcHlcbiAgICAgICAgfSk7XG4gICAgICAgIGN0cmwuJG9uSW5pdCgpO1xuICAgIH1cblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgXyRxXywgXyRodHRwQmFja2VuZF8sIF9WaW9sYXRpb25SZXZpZXdXb3JrSXRlbV8sIF9WaW9sYXRpb25SZXZpZXdSZXN1bHRfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9WaW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtXywgX25hdmlnYXRpb25TZXJ2aWNlXywgX3Rlc3RTZXJ2aWNlXywgXyRjb250cm9sbGVyXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfd29ya0l0ZW1UZXN0RGF0YV8pIHtcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBWaW9sYXRpb25SZXZpZXdXb3JrSXRlbSA9IF9WaW9sYXRpb25SZXZpZXdXb3JrSXRlbV87XG4gICAgICAgIFZpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW0gPSBfVmlvbGF0aW9uUmV2aWV3UmVxdWVzdGVkSXRlbV87XG4gICAgICAgIFZpb2xhdGlvblJldmlld1Jlc3VsdCA9IF9WaW9sYXRpb25SZXZpZXdSZXN1bHRfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UgPSBfbmF2aWdhdGlvblNlcnZpY2VfO1xuICAgICAgICB3b3JrSXRlbVRlc3REYXRhID0gX3dvcmtJdGVtVGVzdERhdGFfO1xuXG4gICAgICAgIC8vIG1vY2sgdXAgY29uZmlnIHNlcnZpY2VcbiAgICAgICAgY29uZmlnU2VydmljZSA9IHtcbiAgICAgICAgICAgIGdldENvbHVtbkNvbmZpZ0VudHJpZXM6IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3RDb2x1bW5zOiBjb2x1bW5Db25maWdzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge30pXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gbW9jayB1cCB0aGUgd29ya2l0ZW0gc2VydmljZVxuICAgICAgICB2cldvcmtJdGVtU2VydmljZSA9IHtcbiAgICAgICAgICAgIHJlc29sdmVWaW9sYXRpb25zOiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7XG4gICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgICAgICAgfSwge30pXG4gICAgICAgIH07XG5cbiAgICAgICAgd29ya0l0ZW1TZXJ2aWNlID0ge1xuICAgICAgICAgICAgZGVsZXRlV29ya0l0ZW06IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMFxuICAgICAgICAgICAgfSwge30pLFxuICAgICAgICAgICAgc2hvd0ZvcndhcmREaWFsb2c6IGphc21pbmUuY3JlYXRlU3B5KClcbiAgICAgICAgfTtcblxuICAgICAgICB2aW9sYXRpb25TZXJ2aWNlID0ge1xuICAgICAgICAgICAgc2hvd1Zpb2xhdGlvbkRpYWxvZzogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xuICAgICAgICAgICAgICAgIGZvbzogJ2JhcidcbiAgICAgICAgICAgIH0sIHt9KVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIG1vY2sgdXAgdGhlIGNhbGxiYWNrXG4gICAgICAgIGNhbGxiYWNrU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoKTtcblxuICAgICAgICBzdGF0ZU1vY2sgPSB7XG4gICAgICAgICAgICBnbzogamFzbWluZS5jcmVhdGVTcHkoKVxuICAgICAgICB9O1xuXG4gICAgICAgIHNldHVwQ29udHJvbGxlcih3b3JrSXRlbVRlc3REYXRhLndvcmtJdGVtVGVzdERhdGExKTtcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIGxvYWQgY29sdW1uIGNvbmZpZ3Mgb24gaW5pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoY29uZmlnU2VydmljZS5nZXRDb2x1bW5Db25maWdFbnRyaWVzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNEaXJ0eSgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gcmVxdWVzdGVkIGl0ZW1zIGhhdmUgbm90IGNoYW5nZWQuJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0RpcnR5KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gcmVxdWVzdGVkIGl0ZW1zIGhhdmUgY2hhbmdlZC4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRGlydHkoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBjdHJsLnRvZ2dsZVJlcXVlc3RlZEl0ZW1TdGF0ZShjdHJsLndvcmtJdGVtLmdldFJlcXVlc3RlZEl0ZW1zKClbMF0pO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEaXJ0eSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gcmVxdWVzdGVkIGl0ZW1zIGNoYW5nZWQsIGJ1dCB0aGUgc3RhdGUgaXMgdGhlbiByZXNldCB0byBvcmlnaW5hbC4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRGlydHkoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBjdHJsLnRvZ2dsZVJlcXVlc3RlZEl0ZW1TdGF0ZShjdHJsLndvcmtJdGVtLmdldFJlcXVlc3RlZEl0ZW1zKClbMF0pO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEaXJ0eSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBjdHJsLnRvZ2dsZVJlcXVlc3RlZEl0ZW1TdGF0ZShjdHJsLndvcmtJdGVtLmdldFJlcXVlc3RlZEl0ZW1zKClbMF0pO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEaXJ0eSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNBbGxvd1Zpb2xhdGlvbkVuYWJsZWQoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aGVuIHdvcmtJdGVtXFwncyBwcm9wZXJ0eSBpcyBmYWxzZS4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQWxsb3dWaW9sYXRpb25FbmFibGVkKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIHdvcmtJdGVtXFwncyBwcm9wZXJ0eSBpcyB0cnVlLicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC53b3JrSXRlbS5hbGxvd1JlcXVlc3RzV2l0aFZpb2xhdGlvbnMgPSB0cnVlO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNBbGxvd1Zpb2xhdGlvbkVuYWJsZWQoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdGF0ZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsbHkgaGF2ZSBpc1NvbHZpbmcgdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTb2x2aW5nKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzSW5Qcm9ncmVzcygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRGVjaWRpbmcoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qIEluIHRoZXNlIHRlc3RzIEkgY2hvc2UgdG8gdXNlIHRoZSBsaXRlcmFscyBmb3Igc3RhdGUgIGJlY2F1c2UgdGhlIHdheSBzdGF0ZXMgYXJlIHJlcHJlc2VudGVkIGRvZXMgbm90XG4gICAgICAgICAqIG5lZWQgdG8gYmUgZXhwb3NlZCB0byB0aGUgaW50ZW5kZWQgY29uc3VtZXIgb2YgdGhpcyBvYmplY3QgKi9cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIGlzSW5Qcm9ncmVzcyB0cnVlIHdoZW4gc3RhdGUgaXMgaW4gcHJvZ3Jlc3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuc3RhdGUgPSAnaW5Qcm9ncmVzcyc7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NvbHZpbmcoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0luUHJvZ3Jlc3MoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEZWNpZGluZygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIGlzRGVjaWRpbmcgdHJ1ZSB3aGVuIHN0YXRlIGlzIGRlY2lkaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLnN0YXRlID0gJ2RlY2lkaW5nJztcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU29sdmluZygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzSW5Qcm9ncmVzcygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRGVjaWRpbmcoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgaXNTb2x2aW5nIHRydWUgYWZ0ZXIgc29sdmUoKSBpcyBjYWxsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuc3RhdGUgPSAnZGVjaWRpbmcnO1xuICAgICAgICAgICAgY3RybC5zb2x2ZSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTb2x2aW5nKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzSW5Qcm9ncmVzcygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRGVjaWRpbmcoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3N1Ym1pdCgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRlc2NyaWJlKCdyZXNvbHZpbmcgdmlvbGF0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlcXVlc3RlZEl0ZW07XG5cbiAgICAgICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdGVkSXRlbSA9IHdvcmtJdGVtLmdldFJlcXVlc3RlZEl0ZW1zKClbMF07XG4gICAgICAgICAgICAgICAgY3RybC50b2dnbGVSZXF1ZXN0ZWRJdGVtU3RhdGUocmVxdWVzdGVkSXRlbSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHZpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZS5yZXNvbHZlVmlvbGF0aW9ucyB3aXRoIGlkcyBvZiByZWplY3RlZCByZXF1ZXN0ZWQgaXRlbXMnLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3QodnJXb3JrSXRlbVNlcnZpY2UucmVzb2x2ZVZpb2xhdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgod29ya0l0ZW0uZ2V0SWQoKSwgW3JlcXVlc3RlZEl0ZW0uZ2V0SWQoKV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNldCBpc0luUHJvZ3Jlc3MgdG8gdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNJblByb2dyZXNzKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGludm9rZSB0aGUgY2FsbGJhY2sgaWYgdGhlIHN1Ym1pdCBzdWNjZWVkcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZyV29ya0l0ZW1TZXJ2aWNlLnJlc29sdmVWaW9sYXRpb25zID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICRxLndoZW4obmV3IFZpb2xhdGlvblJldmlld1Jlc3VsdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0SWQ6ICdyZXF1ZXN0SWQnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNhbGxiYWNrU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3N1Ym1pdHRpbmcgd2l0aCB2aW9sYXRpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZyV29ya0l0ZW1TZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICRxLndoZW4obmV3IFZpb2xhdGlvblJldmlld1Jlc3VsdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0SWQ6ICdyZXF1ZXN0SWQnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVzY3JpYmUoJ3dpdGhvdXQgcmVxdWlyZWQgY29tbWVudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGl0KCdzaG91bGQgc2V0IGlzSW5Qcm9ncmVzcyB0byB0cnVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzSW5Qcm9ncmVzcygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1TZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHZyV29ya0l0ZW1TZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVzY3JpYmUoJ3JlcXVpcmluZyBjb21tZW50JywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2aW9sYXRpb25TZXJ2aWNlLnNob3dDb21tZW50RGlhbG9nID0gamFzbWluZS5jcmVhdGVTcHkoKTtcbiAgICAgICAgICAgICAgICAgICAgd29ya0l0ZW0ucmVxdWlyZVZpb2xhdGlvbkNvbW1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaXQoJ3Nob3VsZCBzaG93IHRoZSBjb21tZW50IGRpYWxvZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2aW9sYXRpb25TZXJ2aWNlLnNob3dDb21tZW50RGlhbG9nLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICAgICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3QodmlvbGF0aW9uU2VydmljZS5zaG93Q29tbWVudERpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdG8gc29sdmluZyBzdGF0ZSBpZiBjb21tZW50IGRpYWxvZyBpcyBjYW5jZWxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2aW9sYXRpb25TZXJ2aWNlLnNob3dDb21tZW50RGlhbG9nLmFuZC5yZXR1cm5WYWx1ZSgkcS5yZWplY3QoKSk7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdCh2cldvcmtJdGVtU2VydmljZS5zdWJtaXRXaXRoVmlvbGF0aW9ucykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTb2x2aW5nKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIHN1Ym1pdFdpdGhWaW9sYXRpb25zIGlmIGNvbW1lbnQgaXMgYWRkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSAnc29tZUNvbW1lbnQnO1xuICAgICAgICAgICAgICAgICAgICB2aW9sYXRpb25TZXJ2aWNlLnNob3dDb21tZW50RGlhbG9nLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKGNvbW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHZyV29ya0l0ZW1TZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh3b3JrSXRlbS5nZXRJZCgpLCBjb21tZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGRlc2NyaWJlKCdzdWJtaXR0ZWQgd2l0aG91dCBjb21tZW50cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3BNb2RhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9ICduZWVkIGNvbXBsZXRpb24gY29tbWVudCc7XG5cbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3NwTW9kYWxfKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlvbGF0aW9uU2VydmljZS5zaG93Q29tbWVudERpYWxvZy5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdnJXb3JrSXRlbVNlcnZpY2Uuc3VibWl0V2l0aFZpb2xhdGlvbnMgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcS53aGVuKG5ldyBWaW9sYXRpb25SZXZpZXdSZXN1bHQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ2ZhaWx1cmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VPcktleTogZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnV0FSTidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0byB0aGUgc29sdmluZyBzdGF0ZSBpZiBzdWJtaXRXaXRoVmlvbGF0aW9ucyBmYWlscycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BNb2RhbC5vcGVuID0gamFzbWluZS5jcmVhdGVTcHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTb2x2aW5nKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXQoJ3Nob3VsZCBzaG93IHRoZSBjb21tZW50IHdhcm5pbmcgZGlhbG9nIGlmIHN1Ym1pdFdpdGhWaW9sYXRpb25zIGZhaWxzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcE1vZGFsLm9wZW4gPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLndhcm5pbmdMZXZlbCkudG9FcXVhbCgnd2FybmluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS5jb250ZW50KS50b0VxdWFsKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIHJldHVybmluZyBhIG5ldyB2aW9sYXRpb24gcmV2aWV3IHdvcmsgaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHZpb2xhdGlvblJldmlld1Jlc3VsdDtcbiAgICAgICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uUmV2aWV3UmVzdWx0ID0gbmV3IFZpb2xhdGlvblJldmlld1Jlc3VsdCh7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtmbG93U3RhdHVzOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbUlkOiAnMTIzNCcsXG4gICAgICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbVR5cGU6ICdWaW9sYXRpb25SZXZpZXcnLFxuICAgICAgICAgICAgICAgICAgICBuZXh0V29ya0l0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvd1JlcXVlc3RzV2l0aFZpb2xhdGlvbnM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrSXRlbVR5cGU6ICdWaW9sYXRpb25SZXZpZXcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdGVkSXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdhcHByb3ZhbEl0ZW1JZDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdyZXF1ZXN0ZWRJZDEnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0SWQ6ICdyZXF1ZXN0ZWRJZGVudGl0eSdcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZyV29ya0l0ZW1TZXJ2aWNlLnJlc29sdmVWaW9sYXRpb25zID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmRcbiAgICAgICAgICAgICAgICAgICAgLnJldHVyblZhbHVlKCRxLndoZW4odmlvbGF0aW9uUmV2aWV3UmVzdWx0KSk7XG5cbiAgICAgICAgICAgICAgICAvKiBUb2dnbGUgYW4gaXRlbSBzbyB3ZSBkbyBub3QgdHJ5IHRvIHN1Ym1pdCB3aXRoIHZpb2xhdGlvbnMgKi9cbiAgICAgICAgICAgICAgICBjdHJsLnRvZ2dsZVJlcXVlc3RlZEl0ZW1TdGF0ZSh3b3JrSXRlbS5nZXRSZXF1ZXN0ZWRJdGVtcygpWzBdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNldCBpc0luUHJvZ3Jlc3MgdG8gZmFsc2Ugb25jZSBwcm9taXNlIHJlc29sdmVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNJblByb2dyZXNzKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3RTdGF0ZUdvKCkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChzdGF0ZU1vY2suZ28pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBsZXQgYXJncyA9IHN0YXRlTW9jay5nby5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcbiAgICAgICAgICAgICAgICBleHBlY3QoYXJncy5sZW5ndGgpLnRvRXF1YWwoMyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMV0ud29ya0l0ZW1JZCkudG9FcXVhbCh2aW9sYXRpb25SZXZpZXdSZXN1bHQubmV4dFdvcmtJdGVtSWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNldCBpc0RlY2lkaW5nIHRvIHRydWUgaWYgYWxsb3cgd2l0aCB2aW9sYXRpb25zIGlzIHRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzcHlPbihjdHJsLCAnaXNBbGxvd1Zpb2xhdGlvbkVuYWJsZWQnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEZWNpZGluZygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTb2x2aW5nKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgICAgIHRlc3RTdGF0ZUdvKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBzZXQgaXNEZWNpZGluZyB0byB0cnVlIGlmIGFsbG93IHdpdGggdmlvbGF0aW9ucyBpcyBmYWxzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNweU9uKGN0cmwsICdpc0FsbG93VmlvbGF0aW9uRW5hYmxlZCcpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEZWNpZGluZygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTb2x2aW5nKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgICAgIHRlc3RTdGF0ZUdvKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBub3QgaW52b2tlIHRoZSBjb21wbGV0aW9uIGNhbGxiYWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNhbGxiYWNrU3B5KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FuY2VsUmVxdWVzdCgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB3b3JrSXRlbVNlcnZpY2UuZGVsZXRlV29ya0l0ZW0nLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5jYW5jZWxSZXF1ZXN0KCk7XG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLmRlbGV0ZVdvcmtJdGVtKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaW52b2tlIHRoZSBjb21wbGV0aW9uIGNhbGxiYWNrIHdpdGggdmlvbGF0aW9uIHJldmlldyByZXN1bHQnLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5jYW5jZWxSZXF1ZXN0KCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY2FsbGJhY2tTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG5ldyBWaW9sYXRpb25SZXZpZXdSZXN1bHQoe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICAgICAgICAgIHttZXNzYWdlT3JLZXk6ICd1aV9hY2Nlc3NfcmVxdWVzdF9zdWJtaXRfY2FuY2VsZWQnfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFzUG9saWN5VmlvbGF0aW9uKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBkZXRlY3QgdmlvbGF0aW9uIG9uIGVudGl0bGVtZW50LCBidXQgbm90IHJvbGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldHVwQ29udHJvbGxlcih3b3JrSXRlbVRlc3REYXRhLndvcmtJdGVtVGVzdERhdGEzKTtcblxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gY3RybC53b3JrSXRlbS5nZXRSZXF1ZXN0ZWRJdGVtcygpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzUG9saWN5VmlvbGF0aW9uKGl0ZW1zWzBdKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNQb2xpY3lWaW9sYXRpb24oaXRlbXNbMV0pKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNQb2xpY3lWaW9sYXRpb24oaXRlbXNbMl0pKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZGV0ZWN0IHZpb2xhdGlvbiBvbmx5IG9uIHJvbGVzIHdpdGggYSB2aW9sYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldHVwQ29udHJvbGxlcih3b3JrSXRlbVRlc3REYXRhLndvcmtJdGVtVGVzdERhdGExKTtcblxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gY3RybC53b3JrSXRlbS5nZXRSZXF1ZXN0ZWRJdGVtcygpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzUG9saWN5VmlvbGF0aW9uKGl0ZW1zWzBdKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNQb2xpY3lWaW9sYXRpb24oaXRlbXNbMV0pKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNQb2xpY3lWaW9sYXRpb24oaXRlbXNbMl0pKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dWaW9sYXRpb25EZXRhaWxzKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHZpb2xhdGlvblNlcnZpY2Uuc2hvd1Zpb2xhdGlvbkRpYWxvZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHZpb2xhdGlvbiA9IHdvcmtJdGVtLmdldFZpb2xhdGlvbnMoKVswXTtcbiAgICAgICAgICAgIGN0cmwuc2hvd1Zpb2xhdGlvbkRldGFpbHModmlvbGF0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdCh2aW9sYXRpb25TZXJ2aWNlLnNob3dWaW9sYXRpb25EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHdvcmtJdGVtLmdldElkKCksIHZpb2xhdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dGb3J3YXJkRGlhbG9nKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHdvcmtJdGVtU2VydmljZS5zaG93Rm9yd2FyZERpYWxvZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5zaG93Rm9yd2FyZERpYWxvZygpO1xuICAgICAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZS5zaG93Rm9yd2FyZERpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
