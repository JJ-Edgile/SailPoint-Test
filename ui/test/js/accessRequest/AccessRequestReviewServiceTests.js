System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', './AccessRequestTestData'], function (_export) {
    /* (c) Copyright 2014 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * @author: michael.hide
             * Created: 9/24/14 4:08 PM
             */

            /**
             * Tests for the AccessRequestItemsService.
             */
            describe('AccessRequestReviewService', function () {

                var baseURL = '/identityiq/ui/rest/requestAccess',
                    accessRequestReviewService,
                    $httpBackend,
                    identity,
                    item1,
                    item2,
                    item3,
                    item4,
                    item5,
                    requestedItem1,
                    requestedItem3,
                    requestedItem4,
                    removedItem2,
                    removedItem5,
                    goodSubmitResponse = [{
                    workflowStatus: 'executing'
                }];

                // Use the access request module.
                beforeEach(module(accessRequestModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                /* jshint maxparams: 10 */
                beforeEach(inject(function (_accessRequestReviewService_, _$httpBackend_, _violationReviewWorkItemService_, AccessRequestItem, Identity, CurrentAccessItem, RequestedAccessItem, RemovedAccessItem, IdentityAccountSelection, accessRequestTestData) {
                    accessRequestReviewService = _accessRequestReviewService_;
                    $httpBackend = _$httpBackend_;
                    identity = new Identity(accessRequestTestData.IDENTITY1);
                    item1 = new AccessRequestItem(accessRequestTestData.ROLE);
                    item2 = new CurrentAccessItem(accessRequestTestData.CURRENT_ACCESS_ENTITLEMENT);
                    item3 = new AccessRequestItem(accessRequestTestData.PERMITTED_ROLE);
                    item4 = new AccessRequestItem(accessRequestTestData.ENTITLEMENT);
                    item5 = new CurrentAccessItem(accessRequestTestData.ROLE_TO_REMOVE);
                    requestedItem1 = new RequestedAccessItem(item1);
                    removedItem2 = new RemovedAccessItem(item2);
                    requestedItem3 = new RequestedAccessItem(item3);
                    requestedItem4 = new RequestedAccessItem(item4);
                    removedItem5 = new RemovedAccessItem(item5);

                    requestedItem3.permittedById = item1.getId();
                    requestedItem1.accountSelections = [new IdentityAccountSelection(accessRequestTestData.IDENTITY_ACCT_SELECTION1)];
                    requestedItem3.accountSelections = [new IdentityAccountSelection(accessRequestTestData.IDENTITY_ACCT_SELECTION1)];
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('submitAccessRequestItems', function () {

                    var promise, data;

                    beforeEach(function () {
                        var sunriseDate = new Date(),
                            sunsetDate = new Date(sunriseDate.getDate() + 14),
                            comment = 'trololololo';
                        //select accounts for requestItem1
                        requestedItem1.accountSelections[0].getProvisioningTargets().forEach(function (target) {
                            target.selectAccount(target.getAccountInfos()[0]);
                        });
                        requestedItem1.setSunriseDate(sunriseDate);
                        requestedItem1.setSunsetDate(sunsetDate);
                        removedItem2.setComment(comment);
                        removedItem2.setSunsetDate(sunsetDate);
                        removedItem5.setSunsetDate(sunsetDate);
                        removedItem5.setComment(comment);

                        data = {
                            'identities': ['1'],
                            'addedRoles': [{
                                id: '1',
                                permittedById: null,
                                comment: null,
                                assignmentNote: null,
                                sunrise: sunriseDate.getTime(),
                                sunset: sunsetDate.getTime(),
                                accountSelections: [{
                                    identityId: 'ted.tacular.id',
                                    roleName: 'Boss',
                                    applicationName: 'appName',
                                    nativeIdentity: 'ted',
                                    instance: 'tedsAccount'
                                }, {
                                    identityId: 'ted.tacular.id',
                                    roleName: 'Endentured Servant',
                                    applicationName: 'appName2',
                                    nativeIdentity: 'lacky',
                                    instance: 'lackyInstance'
                                }],
                                assignmentId: null
                            }, {
                                id: '1.5',
                                permittedById: '1',
                                comment: null,
                                assignmentNote: null,
                                sunrise: null,
                                sunset: null,
                                accountSelections: null,
                                assignmentId: null
                            }],
                            'removedRoles': [{
                                id: '5',
                                comment: comment,
                                sunset: sunsetDate.getTime(),
                                assignmentId: 'removedroleassignmentIdBlah',
                                roleLocation: 'assigned'
                            }],
                            'addedEntitlements': [{
                                id: '2',
                                comment: null,
                                sunrise: null,
                                sunset: null,
                                accountSelections: null
                            }],
                            'removedEntitlements': [{
                                id: '2',
                                comment: comment,
                                sunset: sunsetDate.getTime(),
                                instance: 'instanceblah',
                                nativeIdentity: 'nativeblah'
                            }]
                        };
                    });

                    it('should call REST service with full RequestedAccessItem', function () {
                        $httpBackend.expectPOST(baseURL, data).respond(200, goodSubmitResponse);
                        promise = accessRequestReviewService.submitAccessRequestItems([identity], [requestedItem1, requestedItem3, requestedItem4], [removedItem2, removedItem5]);
                        $httpBackend.flush();
                    });

                    it('should add additional data to removed entitlement if no ID', function () {
                        item2.id = undefined;
                        data.removedEntitlements[0].id = undefined;
                        angular.extend(data.removedEntitlements[0], {
                            'application': 'entapplicationblah',
                            'attribute': 'entattributeblah',
                            'value': 'entblah'
                        });

                        $httpBackend.expectPOST(baseURL, data).respond(200, goodSubmitResponse);
                        promise = accessRequestReviewService.submitAccessRequestItems([identity], [requestedItem1, requestedItem3, requestedItem4], [removedItem2, removedItem5]);
                        $httpBackend.flush();
                    });

                    it('should call backend with assignmentId on added roles if present', function () {
                        var assignmentId = 'assmtnId1';
                        requestedItem1.assignmentId = assignmentId;
                        data.addedRoles[0].assignmentId = assignmentId;
                        $httpBackend.expectPOST(baseURL, data).respond(200, goodSubmitResponse);
                        promise = accessRequestReviewService.submitAccessRequestItems([identity], [requestedItem1, requestedItem3, requestedItem4], [removedItem2, removedItem5]);
                        $httpBackend.flush();
                    });
                });

                describe('submit functions', function () {
                    var workItemId = '1234',
                        vrResult,
                        violationReviewWorkItemService,
                        ViolationReviewWorkItem,
                        ViolationReviewResult,
                        $q,
                        $scope;

                    beforeEach(inject(function (_$q_, _$rootScope_, _violationReviewWorkItemService_, _ViolationReviewWorkItem_, _ViolationReviewResult_) {
                        $q = _$q_;
                        $scope = _$rootScope_;
                        violationReviewWorkItemService = _violationReviewWorkItemService_;
                        ViolationReviewWorkItem = _ViolationReviewWorkItem_;
                        ViolationReviewResult = _ViolationReviewResult_;

                        /* Setup a big ugly result */
                        vrResult = new ViolationReviewResult({
                            nextWorkItem: {
                                id: 'newWorkItemId',
                                allowRequestsWithViolations: true,
                                workItemType: 'ViolationReview',
                                requestedItems: [{
                                    id: 'approvalItemId1',
                                    attributes: {
                                        id: 'requestedId1'
                                    }
                                }, {
                                    id: 'approvalItemId2',
                                    attributes: {
                                        id: 'requestedId2'
                                    }
                                }]
                            },
                            identityRequestId: 'requestedIdentity',
                            nextWorkItemId: 'newWorkItemId',
                            nextWorkItemType: 'ViolationReview',
                            workflowStatus: 'approving',
                            messages: [{
                                status: 'ERROR',
                                messageOrKey: 'this is the error messages'
                            }]
                        });
                    }));

                    function validateTransform(promiseSpy) {
                        var submitResultItems, submitResultItem;
                        expect(promiseSpy).toHaveBeenCalled();
                        submitResultItems = promiseSpy.calls.mostRecent().args[0];
                        expect(submitResultItems.length).toEqual(1);
                        submitResultItem = submitResultItems[0];
                        expect(submitResultItem.workflowStatus).toBe('approving');
                        expect(submitResultItem.identityRequestId).toBe('requestedIdentity');
                        expect(submitResultItem.workflowWorkItemType).toBe('ViolationReview');
                        expect(submitResultItem.workflowWorkItemId).toBe('newWorkItemId');
                        expect(submitResultItem.allowViolations).toBeTruthy();
                        expect(submitResultItem.approvalItems.length).toBe(2);
                        expect(submitResultItem.approvalItems[0].approvalItemId).toBe('approvalItemId1');
                        expect(submitResultItem.approvalItems[0].requestItemId).toBe('requestedId1');
                        expect(submitResultItem.approvalItems[1].approvalItemId).toBe('approvalItemId2');
                        expect(submitResultItem.approvalItems[1].requestItemId).toBe('requestedId2');
                        expect(submitResultItem.messages.length).toBe(1);
                        expect(submitResultItem.messages[0].messageOrKey).toBe('this is the error messages');
                    }

                    describe('resolveViolations()', function () {
                        var rejectedItems = ['a', 'b'];

                        beforeEach(function () {
                            spyOn(violationReviewWorkItemService, 'resolveViolations');
                        });

                        it('should call through to violationReviewWorkItemService', function () {
                            violationReviewWorkItemService.resolveViolations.and.returnValue($q.defer().promise);
                            accessRequestReviewService.resolveViolations(workItemId, rejectedItems);
                            expect(violationReviewWorkItemService.resolveViolations).toHaveBeenCalledWith(workItemId, rejectedItems);
                        });

                        it('should transform ViolationReviewResults into SubmitResultItems', function () {
                            var promiseSpy = jasmine.createSpy();
                            violationReviewWorkItemService.resolveViolations.and.returnValue($q.when(vrResult));
                            accessRequestReviewService.resolveViolations(workItemId, rejectedItems).then(promiseSpy);
                            $scope.$apply();
                            validateTransform(promiseSpy);
                        });
                    });

                    describe('submitWithViolations', function () {
                        var comment = 'this is a comment';

                        beforeEach(function () {
                            spyOn(violationReviewWorkItemService, 'submitWithViolations');
                        });

                        it('should defer to violationReviewWorkItemService', function () {
                            violationReviewWorkItemService.submitWithViolations.and.returnValue($q.defer().promise);
                            accessRequestReviewService.submitWithViolations(workItemId, comment);
                            expect(violationReviewWorkItemService.submitWithViolations).toHaveBeenCalledWith(workItemId, comment);
                        });

                        it('should transform ViolationReviewResults into SubmitResultItems', function () {
                            var promiseSpy = jasmine.createSpy();
                            violationReviewWorkItemService.submitWithViolations.and.returnValue($q.when(vrResult));
                            accessRequestReviewService.submitWithViolations(workItemId, comment).then(promiseSpy);
                            $scope.$apply();
                            validateTransform(promiseSpy);
                        });

                        it('should not barf is a non-ViolationReviewWorkItem is returned from violationReviewWorkItemService', function () {
                            var resultWithOtherType = new ViolationReviewResult({
                                nextWorkItem: {
                                    id: 'differentWorkItem',
                                    workItemType: 'differentWorkItemType'
                                },
                                workflowStatus: 'approving',
                                messages: [{
                                    status: 'ERROR',
                                    messageOrKey: 'this is the error messages'
                                }]
                            });
                            violationReviewWorkItemService.submitWithViolations.and.returnValue($q.when(resultWithOtherType));
                            expect(function () {
                                accessRequestReviewService.submitWithViolations(workItemId, comment);
                            }).not.toThrow();
                        });
                    });
                });

                describe('cancelAccessRequest', function () {
                    it('should delete workitem', function () {
                        var workitemId = 'workItem1',
                            cancelAccessRequestUrl = '/identityiq/ui/rest/workItems/' + workitemId;
                        $httpBackend.expectDELETE(cancelAccessRequestUrl).respond(200, {});
                        accessRequestReviewService.cancelAccessRequest(workitemId);
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLDRCQUE0QixVQUFVLFNBQVM7O0lBQ2hJOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7Ozs7Ozs7Ozs7WUFNN0IsU0FBUyw4QkFBOEIsWUFBVzs7Z0JBRTlDLElBQUksVUFBVTtvQkFDVjtvQkFBNEI7b0JBQzVCO29CQUFVO29CQUFPO29CQUFPO29CQUFPO29CQUFPO29CQUFPO29CQUFnQjtvQkFBZ0I7b0JBQzdFO29CQUFjO29CQUNkLHFCQUFxQixDQUFDO29CQUNsQixnQkFBZ0I7Ozs7Z0JBSXhCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxtQkFBbUI7Ozs7Z0JBSXpDLFdBQVcsT0FBTyxVQUFTLDhCQUE4QixnQkFBZ0Isa0NBQzlDLG1CQUFtQixVQUFVLG1CQUFtQixxQkFBcUIsbUJBQ3JFLDBCQUEwQix1QkFBdUI7b0JBQ3hFLDZCQUE2QjtvQkFDN0IsZUFBZTtvQkFDZixXQUFXLElBQUksU0FBUyxzQkFBc0I7b0JBQzlDLFFBQVEsSUFBSSxrQkFBa0Isc0JBQXNCO29CQUNwRCxRQUFRLElBQUksa0JBQWtCLHNCQUFzQjtvQkFDcEQsUUFBUSxJQUFJLGtCQUFrQixzQkFBc0I7b0JBQ3BELFFBQVEsSUFBSSxrQkFBa0Isc0JBQXNCO29CQUNwRCxRQUFRLElBQUksa0JBQWtCLHNCQUFzQjtvQkFDcEQsaUJBQWlCLElBQUksb0JBQW9CO29CQUN6QyxlQUFlLElBQUksa0JBQWtCO29CQUNyQyxpQkFBaUIsSUFBSSxvQkFBb0I7b0JBQ3pDLGlC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QUVsQixnQkFBZ0I7Z0NBQ2hCLFVBQVUsQ0FBQztvQ0FDUCxRQUFRO29DQUNSLGNBQWM7Ozs0QkFHMUIsK0JBQStCLHFCQUFxQixJQUFJLFlBQVksR0FBRyxLQUFLOzRCQUM1RSxPQUFPLFlBQVc7Z0NBQ2QsMkJBQTJCLHFCQUFxQixZQUFZOytCQUM3RCxJQUFJOzs7OztnQkFNdkIsU0FBUyx1QkFBdUIsWUFBVztvQkFDdkMsR0FBRywwQkFBMEIsWUFBVzt3QkFDcEMsSUFBSSxhQUFhOzRCQUNiLHlCQUF5QixtQ0FBbUM7d0JBQ2hFLGFBQWEsYUFBYSx3QkFBd0IsUUFBUSxLQUFLO3dCQUMvRCwyQkFBMkIsb0JBQW9CO3dCQUMvQyxhQUFhOzs7Ozs7R0FNdEIiLCJmaWxlIjoiYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE0IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcbmltcG9ydCAnLi9BY2Nlc3NSZXF1ZXN0VGVzdERhdGEnO1xuXG4vKipcbiAqIEBhdXRob3I6IG1pY2hhZWwuaGlkZVxuICogQ3JlYXRlZDogOS8yNC8xNCA0OjA4IFBNXG4gKi9cblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIEFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuXG4gKi9cbmRlc2NyaWJlKCdBY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGJhc2VVUkwgPSAnL2lkZW50aXR5aXEvdWkvcmVzdC9yZXF1ZXN0QWNjZXNzJyxcbiAgICAgICAgYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2UsICRodHRwQmFja2VuZCxcbiAgICAgICAgaWRlbnRpdHksIGl0ZW0xLCBpdGVtMiwgaXRlbTMsIGl0ZW00LCBpdGVtNSwgcmVxdWVzdGVkSXRlbTEsIHJlcXVlc3RlZEl0ZW0zLCByZXF1ZXN0ZWRJdGVtNCxcbiAgICAgICAgcmVtb3ZlZEl0ZW0yLCByZW1vdmVkSXRlbTUsXG4gICAgICAgIGdvb2RTdWJtaXRSZXNwb25zZSA9IFt7XG4gICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ2V4ZWN1dGluZydcbiAgICAgICAgfV07XG5cbiAgICAvLyBVc2UgdGhlIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShhY2Nlc3NSZXF1ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XG4gICAgfSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogMTAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2VfLCBfJGh0dHBCYWNrZW5kXywgX3Zpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjZXNzUmVxdWVzdEl0ZW0sIElkZW50aXR5LCBDdXJyZW50QWNjZXNzSXRlbSwgUmVxdWVzdGVkQWNjZXNzSXRlbSwgUmVtb3ZlZEFjY2Vzc0l0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uLCBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEpIHtcbiAgICAgICAgYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2VfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgaWRlbnRpdHkgPSBuZXcgSWRlbnRpdHkoYWNjZXNzUmVxdWVzdFRlc3REYXRhLklERU5USVRZMSk7XG4gICAgICAgIGl0ZW0xID0gbmV3IEFjY2Vzc1JlcXVlc3RJdGVtKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5ST0xFKTtcbiAgICAgICAgaXRlbTIgPSBuZXcgQ3VycmVudEFjY2Vzc0l0ZW0oYWNjZXNzUmVxdWVzdFRlc3REYXRhLkNVUlJFTlRfQUNDRVNTX0VOVElUTEVNRU5UKTtcbiAgICAgICAgaXRlbTMgPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oYWNjZXNzUmVxdWVzdFRlc3REYXRhLlBFUk1JVFRFRF9ST0xFKTtcbiAgICAgICAgaXRlbTQgPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oYWNjZXNzUmVxdWVzdFRlc3REYXRhLkVOVElUTEVNRU5UKTtcbiAgICAgICAgaXRlbTUgPSBuZXcgQ3VycmVudEFjY2Vzc0l0ZW0oYWNjZXNzUmVxdWVzdFRlc3REYXRhLlJPTEVfVE9fUkVNT1ZFKTtcbiAgICAgICAgcmVxdWVzdGVkSXRlbTEgPSBuZXcgUmVxdWVzdGVkQWNjZXNzSXRlbShpdGVtMSk7XG4gICAgICAgIHJlbW92ZWRJdGVtMiA9IG5ldyBSZW1vdmVkQWNjZXNzSXRlbShpdGVtMik7XG4gICAgICAgIHJlcXVlc3RlZEl0ZW0zID0gbmV3IFJlcXVlc3RlZEFjY2Vzc0l0ZW0oaXRlbTMpO1xuICAgICAgICByZXF1ZXN0ZWRJdGVtNCA9IG5ldyBSZXF1ZXN0ZWRBY2Nlc3NJdGVtKGl0ZW00KTtcbiAgICAgICAgcmVtb3ZlZEl0ZW01ID0gbmV3IFJlbW92ZWRBY2Nlc3NJdGVtKGl0ZW01KTtcblxuICAgICAgICByZXF1ZXN0ZWRJdGVtMy5wZXJtaXR0ZWRCeUlkID0gaXRlbTEuZ2V0SWQoKTtcbiAgICAgICAgcmVxdWVzdGVkSXRlbTEuYWNjb3VudFNlbGVjdGlvbnMgPVxuICAgICAgICAgICAgW25ldyBJZGVudGl0eUFjY291bnRTZWxlY3Rpb24oYWNjZXNzUmVxdWVzdFRlc3REYXRhLklERU5USVRZX0FDQ1RfU0VMRUNUSU9OMSldO1xuICAgICAgICByZXF1ZXN0ZWRJdGVtMy5hY2NvdW50U2VsZWN0aW9ucyA9XG4gICAgICAgICAgICBbbmV3IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbihhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfQUNDVF9TRUxFQ1RJT04xKV07XG5cbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3VibWl0QWNjZXNzUmVxdWVzdEl0ZW1zJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIHByb21pc2UsIGRhdGE7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzdW5yaXNlRGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgc3Vuc2V0RGF0ZSA9IG5ldyBEYXRlKHN1bnJpc2VEYXRlLmdldERhdGUoKSArIDE0KSxcbiAgICAgICAgICAgICAgICBjb21tZW50ID0gJ3Ryb2xvbG9sb2xvJztcbiAgICAgICAgICAgIC8vc2VsZWN0IGFjY291bnRzIGZvciByZXF1ZXN0SXRlbTFcbiAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW0xLmFjY291bnRTZWxlY3Rpb25zWzBdLmdldFByb3Zpc2lvbmluZ1RhcmdldHMoKS5mb3JFYWNoKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZWxlY3RBY2NvdW50KHRhcmdldC5nZXRBY2NvdW50SW5mb3MoKVswXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW0xLnNldFN1bnJpc2VEYXRlKHN1bnJpc2VEYXRlKTtcbiAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW0xLnNldFN1bnNldERhdGUoc3Vuc2V0RGF0ZSk7XG4gICAgICAgICAgICByZW1vdmVkSXRlbTIuc2V0Q29tbWVudChjb21tZW50KTtcbiAgICAgICAgICAgIHJlbW92ZWRJdGVtMi5zZXRTdW5zZXREYXRlKHN1bnNldERhdGUpO1xuICAgICAgICAgICAgcmVtb3ZlZEl0ZW01LnNldFN1bnNldERhdGUoc3Vuc2V0RGF0ZSk7XG4gICAgICAgICAgICByZW1vdmVkSXRlbTUuc2V0Q29tbWVudChjb21tZW50KTtcblxuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnaWRlbnRpdGllcyc6IFsgJzEnIF0sXG4gICAgICAgICAgICAgICAgJ2FkZGVkUm9sZXMnOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICAgICAgICBwZXJtaXR0ZWRCeUlkOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBjb21tZW50OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50Tm90ZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgc3VucmlzZTogc3VucmlzZURhdGUuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgICAgICBzdW5zZXQ6IHN1bnNldERhdGUuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgICAgICBhY2NvdW50U2VsZWN0aW9uczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aXR5SWQ6ICd0ZWQudGFjdWxhci5pZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlTmFtZTogJ0Jvc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnYXBwTmFtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ3RlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZTogJ3RlZHNBY2NvdW50J1xuICAgICAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aXR5SWQ6ICd0ZWQudGFjdWxhci5pZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlTmFtZTogJ0VuZGVudHVyZWQgU2VydmFudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdhcHBOYW1lMicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ2xhY2t5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlOiAnbGFja3lJbnN0YW5jZSdcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnRJZDogbnVsbFxuICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEuNScsXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pdHRlZEJ5SWQ6ICcxJyxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudE5vdGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHN1bnJpc2U6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHN1bnNldDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudFNlbGVjdGlvbnM6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnRJZDogbnVsbFxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICdyZW1vdmVkUm9sZXMnOiBbIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICc1JyxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudDogY29tbWVudCxcbiAgICAgICAgICAgICAgICAgICAgc3Vuc2V0OiBzdW5zZXREYXRlLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudElkOiAncmVtb3ZlZHJvbGVhc3NpZ25tZW50SWRCbGFoJyxcbiAgICAgICAgICAgICAgICAgICAgcm9sZUxvY2F0aW9uOiAnYXNzaWduZWQnXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgJ2FkZGVkRW50aXRsZW1lbnRzJzogWyB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHN1bnJpc2U6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHN1bnNldDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudFNlbGVjdGlvbnM6IG51bGxcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAncmVtb3ZlZEVudGl0bGVtZW50cyc6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6IGNvbW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIHN1bnNldDogc3Vuc2V0RGF0ZS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlOiAnaW5zdGFuY2VibGFoJyxcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICduYXRpdmVibGFoJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgUkVTVCBzZXJ2aWNlIHdpdGggZnVsbCBSZXF1ZXN0ZWRBY2Nlc3NJdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChiYXNlVVJMLCBkYXRhKS5yZXNwb25kKDIwMCwgZ29vZFN1Ym1pdFJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZS5zdWJtaXRBY2Nlc3NSZXF1ZXN0SXRlbXMoXG4gICAgICAgICAgICAgICAgW2lkZW50aXR5XSxcbiAgICAgICAgICAgICAgICBbcmVxdWVzdGVkSXRlbTEsIHJlcXVlc3RlZEl0ZW0zLCByZXF1ZXN0ZWRJdGVtNF0sXG4gICAgICAgICAgICAgICAgW3JlbW92ZWRJdGVtMiwgcmVtb3ZlZEl0ZW01XSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgYWRkaXRpb25hbCBkYXRhIHRvIHJlbW92ZWQgZW50aXRsZW1lbnQgaWYgbm8gSUQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0ZW0yLmlkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZGF0YS5yZW1vdmVkRW50aXRsZW1lbnRzWzBdLmlkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoZGF0YS5yZW1vdmVkRW50aXRsZW1lbnRzWzBdLCB7XG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJzogJ2VudGFwcGxpY2F0aW9uYmxhaCcsXG4gICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSc6ICdlbnRhdHRyaWJ1dGVibGFoJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAnZW50YmxhaCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChiYXNlVVJMLCBkYXRhKS5yZXNwb25kKDIwMCwgZ29vZFN1Ym1pdFJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZS5zdWJtaXRBY2Nlc3NSZXF1ZXN0SXRlbXMoXG4gICAgICAgICAgICAgICAgW2lkZW50aXR5XSxcbiAgICAgICAgICAgICAgICBbcmVxdWVzdGVkSXRlbTEsIHJlcXVlc3RlZEl0ZW0zLCByZXF1ZXN0ZWRJdGVtNF0sXG4gICAgICAgICAgICAgICAgW3JlbW92ZWRJdGVtMiwgcmVtb3ZlZEl0ZW01XSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGJhY2tlbmQgd2l0aCBhc3NpZ25tZW50SWQgb24gYWRkZWQgcm9sZXMgaWYgcHJlc2VudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnRJZCA9ICdhc3NtdG5JZDEnO1xuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbTEuYXNzaWdubWVudElkID0gYXNzaWdubWVudElkO1xuICAgICAgICAgICAgZGF0YS5hZGRlZFJvbGVzWzBdLmFzc2lnbm1lbnRJZCA9IGFzc2lnbm1lbnRJZDtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGJhc2VVUkwsIGRhdGEpLnJlc3BvbmQoMjAwLCBnb29kU3VibWl0UmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RSZXZpZXdTZXJ2aWNlLnN1Ym1pdEFjY2Vzc1JlcXVlc3RJdGVtcyhcbiAgICAgICAgICAgICAgICBbaWRlbnRpdHldLFxuICAgICAgICAgICAgICAgIFtyZXF1ZXN0ZWRJdGVtMSwgcmVxdWVzdGVkSXRlbTMsIHJlcXVlc3RlZEl0ZW00XSxcbiAgICAgICAgICAgICAgICBbcmVtb3ZlZEl0ZW0yLCByZW1vdmVkSXRlbTVdKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdWJtaXQgZnVuY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB3b3JrSXRlbUlkID0gJzEyMzQnLFxuICAgICAgICAgICAgdnJSZXN1bHQsXG4gICAgICAgICAgICB2aW9sYXRpb25SZXZpZXdXb3JrSXRlbVNlcnZpY2UsIFZpb2xhdGlvblJldmlld1dvcmtJdGVtLCBWaW9sYXRpb25SZXZpZXdSZXN1bHQsICRxLCAkc2NvcGU7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRxXywgXyRyb290U2NvcGVfLCBfdmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1TZXJ2aWNlXywgX1Zpb2xhdGlvblJldmlld1dvcmtJdGVtXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1Zpb2xhdGlvblJldmlld1Jlc3VsdF8pIHtcbiAgICAgICAgICAgICRxID0gXyRxXztcbiAgICAgICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgICAgIHZpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZSA9IF92aW9sYXRpb25SZXZpZXdXb3JrSXRlbVNlcnZpY2VfO1xuICAgICAgICAgICAgVmlvbGF0aW9uUmV2aWV3V29ya0l0ZW0gPSBfVmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1fO1xuICAgICAgICAgICAgVmlvbGF0aW9uUmV2aWV3UmVzdWx0ID0gX1Zpb2xhdGlvblJldmlld1Jlc3VsdF87XG5cbiAgICAgICAgICAgIC8qIFNldHVwIGEgYmlnIHVnbHkgcmVzdWx0ICovXG4gICAgICAgICAgICB2clJlc3VsdCA9IG5ldyBWaW9sYXRpb25SZXZpZXdSZXN1bHQoe1xuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbToge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ25ld1dvcmtJdGVtSWQnLFxuICAgICAgICAgICAgICAgICAgICBhbGxvd1JlcXVlc3RzV2l0aFZpb2xhdGlvbnM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtJdGVtVHlwZTogJ1Zpb2xhdGlvblJldmlldycsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdhcHByb3ZhbEl0ZW1JZDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAncmVxdWVzdGVkSWQxJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2FwcHJvdmFsSXRlbUlkMicsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdyZXF1ZXN0ZWRJZDInXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpZGVudGl0eVJlcXVlc3RJZDogJ3JlcXVlc3RlZElkZW50aXR5JyxcbiAgICAgICAgICAgICAgICBuZXh0V29ya0l0ZW1JZDogJ25ld1dvcmtJdGVtSWQnLFxuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbVR5cGU6ICdWaW9sYXRpb25SZXZpZXcnLFxuICAgICAgICAgICAgICAgIHdvcmtmbG93U3RhdHVzOiAnYXBwcm92aW5nJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnRVJST1InLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlT3JLZXk6ICd0aGlzIGlzIHRoZSBlcnJvciBtZXNzYWdlcydcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZVRyYW5zZm9ybShwcm9taXNlU3B5KSB7XG4gICAgICAgICAgICB2YXIgc3VibWl0UmVzdWx0SXRlbXMsIHN1Ym1pdFJlc3VsdEl0ZW07XG4gICAgICAgICAgICBleHBlY3QocHJvbWlzZVNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgc3VibWl0UmVzdWx0SXRlbXMgPSBwcm9taXNlU3B5LmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xuICAgICAgICAgICAgZXhwZWN0KHN1Ym1pdFJlc3VsdEl0ZW1zLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIHN1Ym1pdFJlc3VsdEl0ZW0gPSBzdWJtaXRSZXN1bHRJdGVtc1swXTtcbiAgICAgICAgICAgIGV4cGVjdChzdWJtaXRSZXN1bHRJdGVtLndvcmtmbG93U3RhdHVzKS50b0JlKCdhcHByb3ZpbmcnKTtcbiAgICAgICAgICAgIGV4cGVjdChzdWJtaXRSZXN1bHRJdGVtLmlkZW50aXR5UmVxdWVzdElkKS50b0JlKCdyZXF1ZXN0ZWRJZGVudGl0eScpO1xuICAgICAgICAgICAgZXhwZWN0KHN1Ym1pdFJlc3VsdEl0ZW0ud29ya2Zsb3dXb3JrSXRlbVR5cGUpLnRvQmUoJ1Zpb2xhdGlvblJldmlldycpO1xuICAgICAgICAgICAgZXhwZWN0KHN1Ym1pdFJlc3VsdEl0ZW0ud29ya2Zsb3dXb3JrSXRlbUlkKS50b0JlKCduZXdXb3JrSXRlbUlkJyk7XG4gICAgICAgICAgICBleHBlY3Qoc3VibWl0UmVzdWx0SXRlbS5hbGxvd1Zpb2xhdGlvbnMpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzdWJtaXRSZXN1bHRJdGVtLmFwcHJvdmFsSXRlbXMubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgICAgICAgZXhwZWN0KHN1Ym1pdFJlc3VsdEl0ZW0uYXBwcm92YWxJdGVtc1swXS5hcHByb3ZhbEl0ZW1JZCkudG9CZSgnYXBwcm92YWxJdGVtSWQxJyk7XG4gICAgICAgICAgICBleHBlY3Qoc3VibWl0UmVzdWx0SXRlbS5hcHByb3ZhbEl0ZW1zWzBdLnJlcXVlc3RJdGVtSWQpLnRvQmUoJ3JlcXVlc3RlZElkMScpO1xuICAgICAgICAgICAgZXhwZWN0KHN1Ym1pdFJlc3VsdEl0ZW0uYXBwcm92YWxJdGVtc1sxXS5hcHByb3ZhbEl0ZW1JZCkudG9CZSgnYXBwcm92YWxJdGVtSWQyJyk7XG4gICAgICAgICAgICBleHBlY3Qoc3VibWl0UmVzdWx0SXRlbS5hcHByb3ZhbEl0ZW1zWzFdLnJlcXVlc3RJdGVtSWQpLnRvQmUoJ3JlcXVlc3RlZElkMicpO1xuICAgICAgICAgICAgZXhwZWN0KHN1Ym1pdFJlc3VsdEl0ZW0ubWVzc2FnZXMubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICAgICAgZXhwZWN0KHN1Ym1pdFJlc3VsdEl0ZW0ubWVzc2FnZXNbMF0ubWVzc2FnZU9yS2V5KS50b0JlKCd0aGlzIGlzIHRoZSBlcnJvciBtZXNzYWdlcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVzY3JpYmUoJ3Jlc29sdmVWaW9sYXRpb25zKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZWplY3RlZEl0ZW1zID0gWydhJywgJ2InXTtcblxuICAgICAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzcHlPbih2aW9sYXRpb25SZXZpZXdXb3JrSXRlbVNlcnZpY2UsICdyZXNvbHZlVmlvbGF0aW9ucycpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIHZpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZS5yZXNvbHZlVmlvbGF0aW9ucy5hbmQucmV0dXJuVmFsdWUoJHEuZGVmZXIoKS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZS5yZXNvbHZlVmlvbGF0aW9ucyh3b3JrSXRlbUlkLCByZWplY3RlZEl0ZW1zKTtcbiAgICAgICAgICAgICAgICBleHBlY3QodmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1TZXJ2aWNlLnJlc29sdmVWaW9sYXRpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh3b3JrSXRlbUlkLFxuICAgICAgICAgICAgICAgICAgICByZWplY3RlZEl0ZW1zKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHRyYW5zZm9ybSBWaW9sYXRpb25SZXZpZXdSZXN1bHRzIGludG8gU3VibWl0UmVzdWx0SXRlbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZVNweSA9IGphc21pbmUuY3JlYXRlU3B5KCk7XG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1TZXJ2aWNlLnJlc29sdmVWaW9sYXRpb25zLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHZyUmVzdWx0KSk7XG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2UucmVzb2x2ZVZpb2xhdGlvbnMod29ya0l0ZW1JZCwgcmVqZWN0ZWRJdGVtcykudGhlbihwcm9taXNlU3B5KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVUcmFuc2Zvcm0ocHJvbWlzZVNweSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3N1Ym1pdFdpdGhWaW9sYXRpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29tbWVudCA9ICd0aGlzIGlzIGEgY29tbWVudCc7XG5cbiAgICAgICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc3B5T24odmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1TZXJ2aWNlLCAnc3VibWl0V2l0aFZpb2xhdGlvbnMnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGRlZmVyIHRvIHZpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZS5zdWJtaXRXaXRoVmlvbGF0aW9ucy5hbmQucmV0dXJuVmFsdWUoJHEuZGVmZXIoKS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZS5zdWJtaXRXaXRoVmlvbGF0aW9ucyh3b3JrSXRlbUlkLCBjb21tZW50KTtcbiAgICAgICAgICAgICAgICBleHBlY3QodmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1TZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh3b3JrSXRlbUlkLCBjb21tZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHRyYW5zZm9ybSBWaW9sYXRpb25SZXZpZXdSZXN1bHRzIGludG8gU3VibWl0UmVzdWx0SXRlbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZVNweSA9IGphc21pbmUuY3JlYXRlU3B5KCk7XG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1TZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHZyUmVzdWx0KSk7XG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2Uuc3VibWl0V2l0aFZpb2xhdGlvbnMod29ya0l0ZW1JZCwgY29tbWVudCkudGhlbihwcm9taXNlU3B5KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVUcmFuc2Zvcm0ocHJvbWlzZVNweSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBub3QgYmFyZiBpcyBhIG5vbi1WaW9sYXRpb25SZXZpZXdXb3JrSXRlbSBpcyByZXR1cm5lZCBmcm9tIHZpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZScsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRXaXRoT3RoZXJUeXBlID0gbmV3IFZpb2xhdGlvblJldmlld1Jlc3VsdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFdvcmtJdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnZGlmZmVyZW50V29ya0l0ZW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrSXRlbVR5cGU6ICdkaWZmZXJlbnRXb3JrSXRlbVR5cGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ2FwcHJvdmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ0VSUk9SJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZU9yS2V5OiAndGhpcyBpcyB0aGUgZXJyb3IgbWVzc2FnZXMnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB2aW9sYXRpb25SZXZpZXdXb3JrSXRlbVNlcnZpY2Uuc3VibWl0V2l0aFZpb2xhdGlvbnMuYW5kLnJldHVyblZhbHVlKCRxLndoZW4ocmVzdWx0V2l0aE90aGVyVHlwZSkpO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZS5zdWJtaXRXaXRoVmlvbGF0aW9ucyh3b3JrSXRlbUlkLCBjb21tZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSkubm90LnRvVGhyb3coKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjYW5jZWxBY2Nlc3NSZXF1ZXN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgZGVsZXRlIHdvcmtpdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgd29ya2l0ZW1JZCA9ICd3b3JrSXRlbTEnLFxuICAgICAgICAgICAgICAgIGNhbmNlbEFjY2Vzc1JlcXVlc3RVcmwgPSAnL2lkZW50aXR5aXEvdWkvcmVzdC93b3JrSXRlbXMvJyArIHdvcmtpdGVtSWQ7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0REVMRVRFKGNhbmNlbEFjY2Vzc1JlcXVlc3RVcmwpLnJlc3BvbmQoMjAwLCB7fSk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZS5jYW5jZWxBY2Nlc3NSZXF1ZXN0KHdvcmtpdGVtSWQpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
