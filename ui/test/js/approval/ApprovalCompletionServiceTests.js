System.register(['test/js/TestInitializer', 'approval/ApprovalModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var approvalModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_approvalApprovalModule) {
            approvalModule = _approvalApprovalModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('ApprovalCompletionService', function () {

                var $rootScope, spModal, testService, approvalService, approvalCompletionService, $q, scope, workItem, approval, decide, revert, callback, ApprovalResult, $httpBackend;

                // Load the test module to get the testService.
                beforeEach(module(testModule));

                // Let the tests know we'll use the approval module.
                beforeEach(module(approvalModule));

                /**
                 * Setup the mocks for our tests.
                 */
                /* jshint maxparams: 8 */
                beforeEach(inject(function (_$rootScope_, _spModal_, _testService_, _approvalCompletionService_, _ApprovalResult_, _$q_, _$httpBackend_, _approvalService_) {

                    // Save the services.
                    $rootScope = _$rootScope_;
                    spModal = _spModal_;
                    $httpBackend = _$httpBackend_;
                    testService = _testService_;
                    approvalCompletionService = _approvalCompletionService_;
                    ApprovalResult = _ApprovalResult_;
                    approvalService = _approvalService_;
                    $q = _$q_;

                    // Mock out the modal.open() function.
                    makeModalSucceed(true);

                    // Mock out the objects we pass to the service.
                    scope = {};
                    workItem = {
                        id: '1234',
                        esigMeaning: 'To approve or not to approve ... that is the question.' };
                    approval = {
                        id: '1234'
                    };
                    decide = jasmine.createSpy();
                    revert = jasmine.createSpy();
                    callback = jasmine.createSpy();
                }));

                /**
                 * Make the modal instance that is returned from spModal.open() resolve or
                 * reject based on the value of succeed.
                 */
                var makeModalSucceed = function (succeed, errorCode) {
                    if (!spModal) {
                        throw 'expected modal to exist.';
                    }

                    if (!succeed && errorCode) {
                        testService.errorResponse.status = errorCode;
                    }

                    spModal.open = jasmine.createSpy().and.callFake(function () {
                        // Open returns an object with a promise for the result property.
                        return {
                            result: testService.createResponsePromise(!succeed)
                        };
                    });
                };

                /**
                 * Verify that the completion dialog was opened with the appropriate settings.
                 */
                var checkCompletionDialog = function (esig) {
                    var templateUrl, args, resolve, controller;

                    expect(spModal.open).toHaveBeenCalled();

                    args = spModal.open.calls.mostRecent().args[0];
                    resolve = args.resolve;

                    templateUrl = 'approval/template/completion-dialog.html';
                    if (esig) {
                        templateUrl = 'common/esig/template/esig-dialog.html';
                        controller = 'ElectronicSignatureDialogCtrl';
                        expect(args.controller).toEqual(controller);
                        expect(resolve.esigMeaning()).toEqual(workItem.esigMeaning);
                    }

                    expect(args.templateUrl).toEqual(templateUrl);
                    expect(args.forceAction).toEqual(true);
                };

                it('opens the completion dialog', function () {
                    approvalCompletionService.openCompletionDialog(scope, approval, revert, decide, callback);
                    checkCompletionDialog();
                });

                it('opens the esig dialog for an esig', function () {
                    // Give the approval an esig meaning so we treat it as an esig.
                    workItem.esigMeaning = 'To approve or not to approve ... that is the question.';
                    approvalCompletionService.openCompletionDialog(scope, workItem, revert, decide, callback);
                    checkCompletionDialog(true);
                });

                it('calls callback when completed', function () {
                    var result;

                    // Make the modal resolve with a result.
                    spModal.open = jasmine.createSpy().and.callFake(function () {
                        return {
                            result: $q.when(new ApprovalResult({}, approval.id))
                        };
                    });
                    spyOn(approvalService, 'complete').and.returnValue(new ApprovalResult({}, approval.id));
                    approvalCompletionService.openCompletionDialog(scope, approval, revert, decide, callback);

                    $rootScope.$apply();
                    expect(approvalService.complete).toHaveBeenCalled();

                    result = callback.calls.mostRecent().args[0];
                    expect(result instanceof ApprovalResult).toBeTruthy();
                    expect(result.workItemId).toEqual(approval.id);
                    expect(result.isDialog).toEqual(true);
                });

                it('does not call callback when dialog is canceled', function () {
                    var rejected = undefined;
                    makeModalSucceed(false);
                    approvalCompletionService.openCompletionDialog(scope, approval, revert, decide)['catch'](function () {
                        return rejected = true;
                    });
                    $rootScope.$apply();
                    expect(callback).not.toHaveBeenCalled();
                    expect(rejected).toEqual(true);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL0FwcHJvdmFsQ29tcGxldGlvblNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLHVCQUF1QixVQUFVLFNBQVM7SUFDN0c7O0lBRUEsSUFBSSxnQkFBZ0I7SUFDcEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7V0FDMUMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyw2QkFBNkIsWUFBVzs7Z0JBRTdDLElBQUksWUFBWSxTQUFTLGFBQWEsaUJBQWlCLDJCQUEyQixJQUM5RSxPQUFPLFVBQVUsVUFBVSxRQUFRLFFBQVEsVUFBVSxnQkFBZ0I7OztnQkFHekUsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTzs7Ozs7O2dCQU1sQixXQUFXLE9BQU8sVUFBUyxjQUFjLFdBQVcsZUFBZSw2QkFDeEMsa0JBQWtCLE1BQU0sZ0JBQWdCLG1CQUFtQjs7O29CQUdsRixhQUFhO29CQUNiLFVBQVU7b0JBQ1YsZUFBZTtvQkFDZixjQUFjO29CQUNkLDRCQUE0QjtvQkFDNUIsaUJBQWlCO29CQUNqQixrQkFBa0I7b0JBQ2xCLEtBQUs7OztvQkFHTCxpQkFBaUI7OztvQkFHakIsUUFBUTtvQkFDUixXQUFXO3dCQUNQLElBQUk7d0JBQ0osYUFBYTtvQkFDakIsV0FBVzt3QkFDUCxJQUFJOztvQkFFUixTQUFTLFFBQVE7b0JBQ2pCLFNBQVMsUUFBUTtvQkFDakIsV0FBVyxRQUFROzs7Ozs7O2dCQU92QixJQUFJLG1CQUFtQixVQUFTLFNBQVMsV0FBVztvQkFDaEQsSUFBSSxDQUFDLFNBQVM7d0JBQ1YsTUFBTTs7O29CQUdWLElBQUksQ0FBQyxXQUFXLFdBQVc7d0JBQ3ZCLFlBQVksY0FBYyxTQUFTOzs7b0JBR3ZDLFFBQVEsT0FBTyxRQUFRLFlBQVksSUFBSSxTQUFTLFlBQVc7O3dCQUV2RCxPQUFPOzRCQUNILFFBQVEsWUFBWSxzQkFBc0IsQ0FBQzs7Ozs7Ozs7Z0JBUXZELElBQUksd0JBQXdCLFVBQVMsTUFBTTtvQkFDdkMsSUFBSSxhQUFhLE1BQU0sU0FBUzs7b0JBRWhDLE9BQU8sUUFBUSxNQUFNOztvQkFFckIsT0FBTyxRQUFRLEtBQUssTUFBTSxhQUFhLEtBQUs7b0JBQzVDLFVBQVUsS0FBSzs7b0JBRWYsY0FBYztvQkFDZCxJQUFJLE1BQU07d0JBQ04sY0FBYzt3QkFDZCxhQUFhO3dCQUNiLE9BQU8sS0FBSyxZQUFZLFFBQVE7d0JBQ2hDLE9BQU8sUUFBUSxlQUFlLFFBQVEsU0FBUzs7O29CQUduRCxPQUFPLEtBQUssYUFBYSxRQUFRO29CQUNqQyxPQUFPLEtBQUssYUFBYSxRQUFROzs7Z0JBR3JDLEdBQUcsK0JBQStCLFlBQVc7b0JBQ3pDLDBCQUEwQixxQkFBcUIsT0FBTyxVQUFVLFFBQVEsUUFBUTtvQkFDaEY7OztnQkFHSixHQUFHLHFDQUFxQyxZQUFXOztvQkFFL0MsU0FBUyxjQUFjO29CQUN2QiwwQkFBMEIscUJBQXFCLE9BQU8sVUFBVSxRQUFRLFFBQVE7b0JBQ2hGLHNCQUFzQjs7O2dCQUcxQixHQUFHLGlDQUFpQyxZQUFXO29CQUMzQyxJQUFJOzs7b0JBR0osUUFBUSxPQUFPLFFBQVEsWUFBWSxJQUFJLFNBQVMsWUFBVzt3QkFDdkQsT0FBTzs0QkFDSCxRQUFRLEdBQUcsS0FBSyxJQUFJLGVBQWUsSUFBSSxTQUFTOzs7b0JBR3hELE1BQU0saUJBQWlCLFlBQVksSUFBSSxZQUFZLElBQUksZUFBZSxJQUFJLFNBQVM7b0JBQ25GLDBCQUEwQixxQkFBcUIsT0FBTyxVQUFVLFFBQVEsUUFBUTs7b0JBRWhGLFdBQVc7b0JBQ1gsT0FBTyxnQkFBZ0IsVUFBVTs7b0JBRWpDLFNBQVMsU0FBUyxNQUFNLGFBQWEsS0FBSztvQkFDMUMsT0FBTyxrQkFBa0IsZ0JBQWdCO29CQUN6QyxPQUFPLE9BQU8sWUFBWSxRQUFRLFNBQVM7b0JBQzNDLE9BQU8sT0FBTyxVQUFVLFFBQVE7OztnQkFHcEMsR0FBRyxrREFBa0QsWUFBVztvQkFDNUQsSUFBSSxXQUFRO29CQUNaLGlCQUFpQjtvQkFDakIsMEJBQTBCLHFCQUFxQixPQUFPLFVBQVUsUUFBUSxRQUFPLFNBQU8sWUFBQTt3QkFPdEUsT0FQNEUsV0FBVzs7b0JBQ3ZHLFdBQVc7b0JBQ1gsT0FBTyxVQUFVLElBQUk7b0JBQ3JCLE9BQU8sVUFBVSxRQUFROzs7OztHQWE5QiIsImZpbGUiOiJhcHByb3ZhbC9BcHByb3ZhbENvbXBsZXRpb25TZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGFwcHJvdmFsTW9kdWxlIGZyb20gJ2FwcHJvdmFsL0FwcHJvdmFsTW9kdWxlJztcclxuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdBcHByb3ZhbENvbXBsZXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyICRyb290U2NvcGUsIHNwTW9kYWwsIHRlc3RTZXJ2aWNlLCBhcHByb3ZhbFNlcnZpY2UsIGFwcHJvdmFsQ29tcGxldGlvblNlcnZpY2UsICRxLFxyXG4gICAgICAgIHNjb3BlLCB3b3JrSXRlbSwgYXBwcm92YWwsIGRlY2lkZSwgcmV2ZXJ0LCBjYWxsYmFjaywgQXBwcm92YWxSZXN1bHQsICRodHRwQmFja2VuZDtcclxuXHJcbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIGFwcHJvdmFsIG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFwcHJvdmFsTW9kdWxlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCB0aGUgbW9ja3MgZm9yIG91ciB0ZXN0cy5cclxuICAgICAqL1xyXG4gICAgLyoganNoaW50IG1heHBhcmFtczogOCAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfc3BNb2RhbF8sIF90ZXN0U2VydmljZV8sIF9hcHByb3ZhbENvbXBsZXRpb25TZXJ2aWNlXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9BcHByb3ZhbFJlc3VsdF8sIF8kcV8sIF8kaHR0cEJhY2tlbmRfLCBfYXBwcm92YWxTZXJ2aWNlXykge1xyXG5cclxuICAgICAgICAvLyBTYXZlIHRoZSBzZXJ2aWNlcy5cclxuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xyXG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XHJcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xyXG4gICAgICAgIGFwcHJvdmFsQ29tcGxldGlvblNlcnZpY2UgPSBfYXBwcm92YWxDb21wbGV0aW9uU2VydmljZV87XHJcbiAgICAgICAgQXBwcm92YWxSZXN1bHQgPSBfQXBwcm92YWxSZXN1bHRfO1xyXG4gICAgICAgIGFwcHJvdmFsU2VydmljZSA9IF9hcHByb3ZhbFNlcnZpY2VfO1xyXG4gICAgICAgICRxID0gXyRxXztcclxuXHJcbiAgICAgICAgLy8gTW9jayBvdXQgdGhlIG1vZGFsLm9wZW4oKSBmdW5jdGlvbi5cclxuICAgICAgICBtYWtlTW9kYWxTdWNjZWVkKHRydWUpO1xyXG5cclxuICAgICAgICAvLyBNb2NrIG91dCB0aGUgb2JqZWN0cyB3ZSBwYXNzIHRvIHRoZSBzZXJ2aWNlLlxyXG4gICAgICAgIHNjb3BlID0ge307XHJcbiAgICAgICAgd29ya0l0ZW0gPSB7XHJcbiAgICAgICAgICAgIGlkOiAnMTIzNCcsXHJcbiAgICAgICAgICAgIGVzaWdNZWFuaW5nOiAnVG8gYXBwcm92ZSBvciBub3QgdG8gYXBwcm92ZSAuLi4gdGhhdCBpcyB0aGUgcXVlc3Rpb24uJ307XHJcbiAgICAgICAgYXBwcm92YWwgPSB7XHJcbiAgICAgICAgICAgIGlkOiAnMTIzNCdcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRlY2lkZSA9IGphc21pbmUuY3JlYXRlU3B5KCk7XHJcbiAgICAgICAgcmV2ZXJ0ID0gamFzbWluZS5jcmVhdGVTcHkoKTtcclxuICAgICAgICBjYWxsYmFjayA9IGphc21pbmUuY3JlYXRlU3B5KCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWtlIHRoZSBtb2RhbCBpbnN0YW5jZSB0aGF0IGlzIHJldHVybmVkIGZyb20gc3BNb2RhbC5vcGVuKCkgcmVzb2x2ZSBvclxyXG4gICAgICogcmVqZWN0IGJhc2VkIG9uIHRoZSB2YWx1ZSBvZiBzdWNjZWVkLlxyXG4gICAgICovXHJcbiAgICB2YXIgbWFrZU1vZGFsU3VjY2VlZCA9IGZ1bmN0aW9uKHN1Y2NlZWQsIGVycm9yQ29kZSkge1xyXG4gICAgICAgIGlmICghc3BNb2RhbCkge1xyXG4gICAgICAgICAgICB0aHJvdyAnZXhwZWN0ZWQgbW9kYWwgdG8gZXhpc3QuJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc3VjY2VlZCAmJiBlcnJvckNvZGUpIHtcclxuICAgICAgICAgICAgdGVzdFNlcnZpY2UuZXJyb3JSZXNwb25zZS5zdGF0dXMgPSBlcnJvckNvZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzcE1vZGFsLm9wZW4gPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gT3BlbiByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGEgcHJvbWlzZSBmb3IgdGhlIHJlc3VsdCBwcm9wZXJ0eS5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogdGVzdFNlcnZpY2UuY3JlYXRlUmVzcG9uc2VQcm9taXNlKCFzdWNjZWVkKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZlcmlmeSB0aGF0IHRoZSBjb21wbGV0aW9uIGRpYWxvZyB3YXMgb3BlbmVkIHdpdGggdGhlIGFwcHJvcHJpYXRlIHNldHRpbmdzLlxyXG4gICAgICovXHJcbiAgICB2YXIgY2hlY2tDb21wbGV0aW9uRGlhbG9nID0gZnVuY3Rpb24oZXNpZykge1xyXG4gICAgICAgIHZhciB0ZW1wbGF0ZVVybCwgYXJncywgcmVzb2x2ZSwgY29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICBhcmdzID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xyXG4gICAgICAgIHJlc29sdmUgPSBhcmdzLnJlc29sdmU7XHJcblxyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2FwcHJvdmFsL3RlbXBsYXRlL2NvbXBsZXRpb24tZGlhbG9nLmh0bWwnO1xyXG4gICAgICAgIGlmIChlc2lnKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsID0gJ2NvbW1vbi9lc2lnL3RlbXBsYXRlL2VzaWctZGlhbG9nLmh0bWwnO1xyXG4gICAgICAgICAgICBjb250cm9sbGVyID0gJ0VsZWN0cm9uaWNTaWduYXR1cmVEaWFsb2dDdHJsJztcclxuICAgICAgICAgICAgZXhwZWN0KGFyZ3MuY29udHJvbGxlcikudG9FcXVhbChjb250cm9sbGVyKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc29sdmUuZXNpZ01lYW5pbmcoKSkudG9FcXVhbCh3b3JrSXRlbS5lc2lnTWVhbmluZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBlY3QoYXJncy50ZW1wbGF0ZVVybCkudG9FcXVhbCh0ZW1wbGF0ZVVybCk7XHJcbiAgICAgICAgZXhwZWN0KGFyZ3MuZm9yY2VBY3Rpb24pLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGl0KCdvcGVucyB0aGUgY29tcGxldGlvbiBkaWFsb2cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBhcHByb3ZhbENvbXBsZXRpb25TZXJ2aWNlLm9wZW5Db21wbGV0aW9uRGlhbG9nKHNjb3BlLCBhcHByb3ZhbCwgcmV2ZXJ0LCBkZWNpZGUsIGNhbGxiYWNrKTtcclxuICAgICAgICBjaGVja0NvbXBsZXRpb25EaWFsb2coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdvcGVucyB0aGUgZXNpZyBkaWFsb2cgZm9yIGFuIGVzaWcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBHaXZlIHRoZSBhcHByb3ZhbCBhbiBlc2lnIG1lYW5pbmcgc28gd2UgdHJlYXQgaXQgYXMgYW4gZXNpZy5cclxuICAgICAgICB3b3JrSXRlbS5lc2lnTWVhbmluZyA9ICdUbyBhcHByb3ZlIG9yIG5vdCB0byBhcHByb3ZlIC4uLiB0aGF0IGlzIHRoZSBxdWVzdGlvbi4nO1xyXG4gICAgICAgIGFwcHJvdmFsQ29tcGxldGlvblNlcnZpY2Uub3BlbkNvbXBsZXRpb25EaWFsb2coc2NvcGUsIHdvcmtJdGVtLCByZXZlcnQsIGRlY2lkZSwgY2FsbGJhY2spO1xyXG4gICAgICAgIGNoZWNrQ29tcGxldGlvbkRpYWxvZyh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdjYWxscyBjYWxsYmFjayB3aGVuIGNvbXBsZXRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciByZXN1bHQ7XHJcblxyXG4gICAgICAgIC8vIE1ha2UgdGhlIG1vZGFsIHJlc29sdmUgd2l0aCBhIHJlc3VsdC5cclxuICAgICAgICBzcE1vZGFsLm9wZW4gPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogJHEud2hlbihuZXcgQXBwcm92YWxSZXN1bHQoe30sIGFwcHJvdmFsLmlkKSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzcHlPbihhcHByb3ZhbFNlcnZpY2UsICdjb21wbGV0ZScpLmFuZC5yZXR1cm5WYWx1ZShuZXcgQXBwcm92YWxSZXN1bHQoe30sIGFwcHJvdmFsLmlkKSk7XHJcbiAgICAgICAgYXBwcm92YWxDb21wbGV0aW9uU2VydmljZS5vcGVuQ29tcGxldGlvbkRpYWxvZyhzY29wZSwgYXBwcm92YWwsIHJldmVydCwgZGVjaWRlLCBjYWxsYmFjayk7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsU2VydmljZS5jb21wbGV0ZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICByZXN1bHQgPSBjYWxsYmFjay5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXTtcclxuICAgICAgICBleHBlY3QocmVzdWx0IGluc3RhbmNlb2YgQXBwcm92YWxSZXN1bHQpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICBleHBlY3QocmVzdWx0LndvcmtJdGVtSWQpLnRvRXF1YWwoYXBwcm92YWwuaWQpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHQuaXNEaWFsb2cpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZG9lcyBub3QgY2FsbCBjYWxsYmFjayB3aGVuIGRpYWxvZyBpcyBjYW5jZWxlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCByZWplY3RlZDtcclxuICAgICAgICBtYWtlTW9kYWxTdWNjZWVkKGZhbHNlKTtcclxuICAgICAgICBhcHByb3ZhbENvbXBsZXRpb25TZXJ2aWNlLm9wZW5Db21wbGV0aW9uRGlhbG9nKHNjb3BlLCBhcHByb3ZhbCwgcmV2ZXJ0LCBkZWNpZGUpLmNhdGNoKCgpID0+IHJlamVjdGVkID0gdHJ1ZSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICBleHBlY3QoY2FsbGJhY2spLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgZXhwZWN0KHJlamVjdGVkKS50b0VxdWFsKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
