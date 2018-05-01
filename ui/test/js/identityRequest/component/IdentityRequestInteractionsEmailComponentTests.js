System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }],
        execute: function () {

            describe('spIdentityRequestInteractionsEmail', function () {

                var elementDefinition = '<sp-identity-request-interactions-email sp-model="approvalSummary" />',
                    emailDialogService = undefined,
                    $scope = undefined,
                    $compile = undefined,
                    $componentController = undefined,
                    element = undefined,
                    approvalSummary = undefined,
                    identityRequestTestData = undefined,
                    identityRequestService = undefined,
                    identityRequestDataService = undefined,
                    identityRequest = undefined;

                beforeEach(module(identityRequestModule));

                /* jshint maxparams: 8 */
                beforeEach(inject(function (_$rootScope_, _$compile_, _identityRequestTestData_, _identityRequestDataService_, _$componentController_, _emailDialogService_, _identityRequestService_, IdentityRequest) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $componentController = _$componentController_;
                    identityRequestTestData = _identityRequestTestData_;
                    emailDialogService = _emailDialogService_;
                    identityRequestService = _identityRequestService_;
                    identityRequestDataService = _identityRequestDataService_;
                    identityRequest = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_1);
                    approvalSummary = identityRequestTestData.IDENTITY_REQUEST_APPROVAL_SUMMARY_1;
                }));

                afterEach(function () {
                    if (element) {
                        angular.element(element).remove();
                    }
                });

                function createElement(approvalSummary) {
                    element = angular.element(elementDefinition);
                    $scope.approvalSummary = approvalSummary;
                    $compile(element)($scope);
                    $scope.$apply();
                }

                function createController() {
                    var bindings = {
                        approvalSummary: approvalSummary
                    };
                    var ctrl = $componentController('spIdentityRequestInteractionsEmail', null, bindings);
                    ctrl.$onInit();
                    return ctrl;
                }

                describe('controller', function () {

                    it('throws without an approvalSummary', function () {
                        approvalSummary = null;
                        expect(function () {
                            return createController();
                        }).toThrow();
                    });
                });

                describe('email button', function () {

                    function testEmailButton(summary) {
                        createElement(summary);
                        expect(angular.element(element).text().trim().indexOf(summary.ownerDisplayName)).toEqual(0);
                        var icons = angular.element(element).find('i');
                        expect(icons.length).toEqual(0);
                        expect(element.find('#interactionsEmailBtn-2').length).toEqual(0);
                    }

                    it('calls through the emailDialogService', function () {

                        spyOn(emailDialogService, 'sendEmailWithDialog');
                        var ctrl = createController();
                        ctrl.showEmailDialog();
                        expect(emailDialogService.sendEmailWithDialog).toHaveBeenCalled();
                    });

                    it('shows the email button if there is no workItemArchive and request is not canceled', function () {
                        identityRequest.executionStatus = 'Executing';
                        identityRequestDataService.setIdentityRequest(identityRequest);
                        createElement(approvalSummary);
                        expect(angular.element(element).text().trim().indexOf(approvalSummary.ownerDisplayName)).toEqual(0);
                        var icons = angular.element(element).find('i');
                        expect(icons.length).toEqual(1);
                        expect(icons[0].classList.contains('fa-envelope')).toEqual(true);
                        expect(element.find('#interactionsEmailBtn-1').length).toEqual(1);
                    });

                    it('displays only owner display name if workItemArchiveId is set', function () {
                        testEmailButton({
                            workItemId: '2',
                            workItemArchiveId: '1',
                            ownerDisplayName: 'Joe Smith',
                            status: 'status_message_key',
                            openDate: 1496352411768,
                            completeDate: 1496352411768,
                            description: 'approving',
                            approvalItemCount: 1
                        });
                    });

                    it('displays only owner display name if no workItemId and workItemArchiveId', function () {
                        testEmailButton({
                            workItemId: null,
                            workItemArchiveId: null,
                            ownerDisplayName: 'Joe Smith',
                            status: 'status_message_key',
                            openDate: 1496352411768,
                            completeDate: 1496352411768,
                            description: 'approving',
                            approvalItemCount: 1
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SW50ZXJhY3Rpb25zRW1haWxDb21wb25lbnRUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMENBQTBDLFVBQVUsU0FBUzs7O0lBR3JHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQzs7UUFFbEUsU0FBUyxZQUFZOztZQUw3QixTQUFTLHNDQUFzQyxZQUFXOztnQkFFdEQsSUFBSSxvQkFBaUI7b0JBQ3dELHFCQUFrQjtvQkFDM0YsU0FBTTtvQkFBRSxXQUFRO29CQUFFLHVCQUFvQjtvQkFBRSxVQUFPO29CQUFFLGtCQUFlO29CQUFFLDBCQUF1QjtvQkFDekYseUJBQXNCO29CQUFFLDZCQUEwQjtvQkFBRSxrQkFBZTs7Z0JBRXZFLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBUyxjQUFjLFlBQVksMkJBQTJCLDhCQUM1RSx3QkFBd0Isc0JBQXNCLDBCQUEwQixpQkFBaUI7b0JBQ3pGLFNBQVMsYUFBYTtvQkFDdEIsV0FBVztvQkFDWCx1QkFBdUI7b0JBQ3ZCLDBCQUEwQjtvQkFDMUIscUJBQXFCO29CQUNyQix5QkFBeUI7b0JBQ3pCLDZCQUE2QjtvQkFDN0Isa0JBQWtCLElBQUksZ0JBQWdCLHdCQUF3QjtvQkFDOUQsa0JBQWtCLHdCQUF3Qjs7O2dCQUk5QyxVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNULFFBQVEsUUFBUSxTQUFTOzs7O2dCQUlqQyxTQUFTLGNBQWMsaUJBQWlCO29CQUNwQyxVQUFVLFFBQVEsUUFBUTtvQkFDMUIsT0FBTyxrQkFBa0I7b0JBQ3pCLFNBQVMsU0FBUztvQkFDbEIsT0FBTzs7O2dCQUdYLFNBQVMsbUJBQW1CO29CQUN4QixJQUFJLFdBQVc7d0JBQ1gsaUJBQWlCOztvQkFFckIsSUFBSSxPQUFPLHFCQUNQLHNDQUFzQyxNQUFNO29CQUNoRCxLQUFLO29CQUNMLE9BQU87OztnQkFHWCxTQUFTLGNBQWMsWUFBTTs7b0JBRXpCLEdBQUcscUNBQXFDLFlBQU07d0JBQzFDLGtCQUFrQjt3QkFDbEIsT0FBTyxZQUFBOzRCQVlTLE9BWkg7MkJBQW9COzs7O2dCQUt6QyxTQUFTLGdCQUFnQixZQUFNOztvQkFFM0IsU0FBUyxnQkFBZ0IsU0FBUzt3QkFDOUIsY0FBYzt3QkFDZCxPQUFPLFFBQVEsUUFBUSxTQUFTLE9BQU8sT0FBTyxRQUFRLFFBQVEsbUJBQW1CLFFBQVE7d0JBQ3pGLElBQUksUUFBUSxRQUFRLFFBQVEsU0FBUyxLQUFLO3dCQUMxQyxPQUFPLE1BQU0sUUFBUSxRQUFRO3dCQUM3QixPQUFPLFFBQVEsS0FBSywyQkFBMkIsUUFBUSxRQUFROzs7b0JBR25FLEdBQUcsd0NBQXdDLFlBQU07O3dCQUU3QyxNQUFNLG9CQUFvQjt3QkFDMUIsSUFBSSxPQUFPO3dCQUNYLEtBQUs7d0JBQ0wsT0FBTyxtQkFBbUIscUJBQXFCOzs7b0JBR25ELEdBQUcscUZBQXFGLFlBQU07d0JBQzFGLGdCQUFnQixrQkFBa0I7d0JBQ2xDLDJCQUEyQixtQkFBbUI7d0JBQzlDLGNBQWM7d0JBQ2QsT0FBTyxRQUFRLFFBQVEsU0FBUyxPQUFPLE9BQU8sUUFBUSxnQkFBZ0IsbUJBQW1CLFFBQVE7d0JBQ2pHLElBQUksUUFBUSxRQUFRLFFBQVEsU0FBUyxLQUFLO3dCQUMxQyxPQUFPLE1BQU0sUUFBUSxRQUFRO3dCQUM3QixPQUFPLE1BQU0sR0FBRyxVQUFVLFNBQVMsZ0JBQWdCLFFBQVE7d0JBQzNELE9BQU8sUUFBUSxLQUFLLDJCQUEyQixRQUFRLFFBQVE7OztvQkFHbkUsR0FBRyxnRUFBZ0UsWUFBTTt3QkFDckUsZ0JBQWdCOzRCQUNaLFlBQVk7NEJBQ1osbUJBQW1COzRCQUNuQixrQkFBa0I7NEJBQ2xCLFFBQVE7NEJBQ1IsVUFBVTs0QkFDVixjQUFjOzRCQUNkLGFBQWE7NEJBQ2IsbUJBQW1COzs7O29CQUkzQixHQUFHLDJFQUEyRSxZQUFNO3dCQUNoRixnQkFBZ0I7NEJBQ1osWUFBWTs0QkFDWixtQkFBbUI7NEJBQ25CLGtCQUFrQjs0QkFDbEIsUUFBUTs0QkFDUixVQUFVOzRCQUNWLGNBQWM7NEJBQ2QsYUFBYTs0QkFDYixtQkFBbUI7Ozs7Ozs7R0FtQmhDIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SW50ZXJhY3Rpb25zRW1haWxDb21wb25lbnRUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpZGVudGl0eVJlcXVlc3RNb2R1bGUgZnJvbSAnaWRlbnRpdHlSZXF1ZXN0L0lkZW50aXR5UmVxdWVzdE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnc3BJZGVudGl0eVJlcXVlc3RJbnRlcmFjdGlvbnNFbWFpbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGxldCBlbGVtZW50RGVmaW5pdGlvbiA9XHJcbiAgICAgICAgYDxzcC1pZGVudGl0eS1yZXF1ZXN0LWludGVyYWN0aW9ucy1lbWFpbCBzcC1tb2RlbD1cImFwcHJvdmFsU3VtbWFyeVwiIC8+YCwgZW1haWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgICRzY29wZSwgJGNvbXBpbGUsICRjb21wb25lbnRDb250cm9sbGVyLCBlbGVtZW50LCBhcHByb3ZhbFN1bW1hcnksIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLFxyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UsIGlkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlLCBpZGVudGl0eVJlcXVlc3Q7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgLyoganNoaW50IG1heHBhcmFtczogOCAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfLCBfaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGFfLCBfaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2VfLFxyXG4gICAgICAgIF8kY29tcG9uZW50Q29udHJvbGxlcl8sIF9lbWFpbERpYWxvZ1NlcnZpY2VfLCBfaWRlbnRpdHlSZXF1ZXN0U2VydmljZV8sIElkZW50aXR5UmVxdWVzdCkge1xyXG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XHJcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xyXG4gICAgICAgICRjb21wb25lbnRDb250cm9sbGVyID0gXyRjb21wb25lbnRDb250cm9sbGVyXztcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSA9IF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV87XHJcbiAgICAgICAgZW1haWxEaWFsb2dTZXJ2aWNlID0gX2VtYWlsRGlhbG9nU2VydmljZV87XHJcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0U2VydmljZSA9IF9pZGVudGl0eVJlcXVlc3RTZXJ2aWNlXztcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3REYXRhU2VydmljZSA9IF9pZGVudGl0eVJlcXVlc3REYXRhU2VydmljZV87XHJcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0ID0gbmV3IElkZW50aXR5UmVxdWVzdChpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUXzEpO1xyXG4gICAgICAgIGFwcHJvdmFsU3VtbWFyeSA9IGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfQVBQUk9WQUxfU1VNTUFSWV8xO1xyXG5cclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGFwcHJvdmFsU3VtbWFyeSkge1xyXG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xyXG4gICAgICAgICRzY29wZS5hcHByb3ZhbFN1bW1hcnkgPSBhcHByb3ZhbFN1bW1hcnk7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcclxuICAgICAgICBsZXQgYmluZGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGFwcHJvdmFsU3VtbWFyeTogYXBwcm92YWxTdW1tYXJ5XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgY3RybCA9ICRjb21wb25lbnRDb250cm9sbGVyKFxyXG4gICAgICAgICAgICAnc3BJZGVudGl0eVJlcXVlc3RJbnRlcmFjdGlvbnNFbWFpbCcsIG51bGwsIGJpbmRpbmdzKTtcclxuICAgICAgICBjdHJsLiRvbkluaXQoKTtcclxuICAgICAgICByZXR1cm4gY3RybDtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnY29udHJvbGxlcicsICgpID0+IHtcclxuXHJcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGFuIGFwcHJvdmFsU3VtbWFyeScsICgpID0+IHtcclxuICAgICAgICAgICAgYXBwcm92YWxTdW1tYXJ5ID0gbnVsbDtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUNvbnRyb2xsZXIoKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdlbWFpbCBidXR0b24nLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RFbWFpbEJ1dHRvbihzdW1tYXJ5KSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoc3VtbWFyeSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkudGV4dCgpLnRyaW0oKS5pbmRleE9mKHN1bW1hcnkub3duZXJEaXNwbGF5TmFtZSkpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgICAgIGxldCBpY29ucyA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5maW5kKCdpJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpY29ucy5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNpbnRlcmFjdGlvbnNFbWFpbEJ0bi0yJykubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdGhlIGVtYWlsRGlhbG9nU2VydmljZScsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHNweU9uKGVtYWlsRGlhbG9nU2VydmljZSwgJ3NlbmRFbWFpbFdpdGhEaWFsb2cnKTtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGN0cmwuc2hvd0VtYWlsRGlhbG9nKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbWFpbERpYWxvZ1NlcnZpY2Uuc2VuZEVtYWlsV2l0aERpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgdGhlIGVtYWlsIGJ1dHRvbiBpZiB0aGVyZSBpcyBubyB3b3JrSXRlbUFyY2hpdmUgYW5kIHJlcXVlc3QgaXMgbm90IGNhbmNlbGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZGVudGl0eVJlcXVlc3QuZXhlY3V0aW9uU3RhdHVzID0gJ0V4ZWN1dGluZyc7XHJcbiAgICAgICAgICAgIGlkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlLnNldElkZW50aXR5UmVxdWVzdChpZGVudGl0eVJlcXVlc3QpO1xyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGFwcHJvdmFsU3VtbWFyeSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkudGV4dCgpLnRyaW0oKS5pbmRleE9mKGFwcHJvdmFsU3VtbWFyeS5vd25lckRpc3BsYXlOYW1lKSkudG9FcXVhbCgwKTtcclxuICAgICAgICAgICAgbGV0IGljb25zID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmZpbmQoJ2knKTtcclxuICAgICAgICAgICAgZXhwZWN0KGljb25zLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGljb25zWzBdLmNsYXNzTGlzdC5jb250YWlucygnZmEtZW52ZWxvcGUnKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnI2ludGVyYWN0aW9uc0VtYWlsQnRuLTEnKS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkaXNwbGF5cyBvbmx5IG93bmVyIGRpc3BsYXkgbmFtZSBpZiB3b3JrSXRlbUFyY2hpdmVJZCBpcyBzZXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RFbWFpbEJ1dHRvbih7XHJcbiAgICAgICAgICAgICAgICB3b3JrSXRlbUlkOiAnMicsXHJcbiAgICAgICAgICAgICAgICB3b3JrSXRlbUFyY2hpdmVJZDogJzEnLFxyXG4gICAgICAgICAgICAgICAgb3duZXJEaXNwbGF5TmFtZTogJ0pvZSBTbWl0aCcsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdzdGF0dXNfbWVzc2FnZV9rZXknLFxyXG4gICAgICAgICAgICAgICAgb3BlbkRhdGU6IDE0OTYzNTI0MTE3NjgsXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURhdGU6IDE0OTYzNTI0MTE3NjgsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2FwcHJvdmluZycsXHJcbiAgICAgICAgICAgICAgICBhcHByb3ZhbEl0ZW1Db3VudDogMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2Rpc3BsYXlzIG9ubHkgb3duZXIgZGlzcGxheSBuYW1lIGlmIG5vIHdvcmtJdGVtSWQgYW5kIHdvcmtJdGVtQXJjaGl2ZUlkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0RW1haWxCdXR0b24oe1xyXG4gICAgICAgICAgICAgICAgd29ya0l0ZW1JZDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHdvcmtJdGVtQXJjaGl2ZUlkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgb3duZXJEaXNwbGF5TmFtZTogJ0pvZSBTbWl0aCcsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdzdGF0dXNfbWVzc2FnZV9rZXknLFxyXG4gICAgICAgICAgICAgICAgb3BlbkRhdGU6IDE0OTYzNTI0MTE3NjgsXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURhdGU6IDE0OTYzNTI0MTE3NjgsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2FwcHJvdmluZycsXHJcbiAgICAgICAgICAgICAgICBhcHByb3ZhbEl0ZW1Db3VudDogMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
