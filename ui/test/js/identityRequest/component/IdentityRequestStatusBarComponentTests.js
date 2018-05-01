System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', '../IdentityRequestTestData', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_IdentityRequestTestData) {}, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('spIdentityRequestStatusBar', function () {
                var elementDefinition = '<sp-identity-request-status-bar sp-request="request" />',
                    identityRequest = undefined,
                    $scope = undefined,
                    $compile = undefined,
                    element = undefined,
                    dateFilter = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (IdentityRequest, identityRequestTestData, $rootScope, spTranslateFilter, _$compile_, _dateFilter_) {
                    identityRequest = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_1);
                    $scope = $rootScope;
                    $compile = _$compile_;
                    dateFilter = _dateFilter_;

                    spTranslateFilter.configureCatalog({
                        'ui_identity_request_canceled_alert_date': 'Canceled {0}',
                        'ui_identity_request_failure_date': 'Failure {0}',
                        'ui_identity_request_partial_success_date': 'Partial Success {0}',
                        'ui_identity_request_success_date': 'Success {0}',
                        'ui_identity_request_pending': 'Pending'
                    });
                }));

                function spyIfTrue(statusFunc, trueStatusFunc) {
                    spyOn(identityRequest, statusFunc).and.returnValue(statusFunc === trueStatusFunc);
                }

                function createElement(trueStatusFunc) {
                    spyIfTrue('isCanceled', trueStatusFunc);
                    spyIfTrue('isSuccess', trueStatusFunc);
                    spyIfTrue('isFailure', trueStatusFunc);
                    spyIfTrue('isPartialSuccess', trueStatusFunc);
                    spyIfTrue('isExecuting', trueStatusFunc);

                    $scope.request = identityRequest;

                    element = $compile(elementDefinition)($scope);
                    $scope.$apply();
                }

                function testElement(trueStatusFunc, alertClass, textContent) {
                    createElement(trueStatusFunc);

                    var alertElement = element.find('.identity-request-status-bar .alert');
                    expect(alertElement.length).toEqual(1);
                    expect(alertElement.hasClass(alertClass)).toEqual(true);
                    expect(alertElement.text()).toContain(textContent);
                }

                it('show canceled with alert danger', function () {
                    testElement('isCanceled', 'alert-danger', 'Canceled ' + dateFilter(identityRequest.terminatedDate, 'shortDate'));
                });

                it('shows failure with alert danger', function () {
                    testElement('isFailure', 'alert-danger', 'Failure ' + dateFilter(identityRequest.endDate, 'shortDate'));
                });

                it('shows partial success with alert warning', function () {
                    testElement('isPartialSuccess', 'alert-warning', 'Partial Success ' + dateFilter(identityRequest.endDate, 'shortDate'));
                });

                it('shows success with alert success', function () {
                    testElement('isSuccess', 'alert-success', 'Success ' + dateFilter(identityRequest.endDate, 'shortDate'));
                });

                it('shows executing with alert info', function () {
                    testElement('isExecuting', 'alert-info', 'Pending');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0U3RhdHVzQmFyQ29tcG9uZW50VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlDQUF5Qyw4QkFBOEIsNENBQTRDLFVBQVUsU0FBUzs7O0lBRzlLOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQztXQUMvRCxVQUFVLDBCQUEwQixJQUFJLFVBQVUsc0NBQXNDO1FBQzNGLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyw4QkFBOEIsWUFBTTtnQkFDekMsSUFBSSxvQkFBaUI7b0JBQ2pCLGtCQUFlO29CQUFFLFNBQU07b0JBQUUsV0FBUTtvQkFBRSxVQUFPO29CQUFFLGFBQVU7O2dCQUUxRCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxpQkFBaUIseUJBQXlCLFlBQVksbUJBQW1CLFlBQ3pFLGNBQWlCO29CQUNoQyxrQkFBa0IsSUFBSSxnQkFBZ0Isd0JBQXdCO29CQUM5RCxTQUFTO29CQUNULFdBQVc7b0JBQ1gsYUFBYTs7b0JBRWIsa0JBQWtCLGlCQUFpQjt3QkFDL0IsMkNBQTJDO3dCQUMzQyxvQ0FBb0M7d0JBQ3BDLDRDQUE0Qzt3QkFDNUMsb0NBQW9DO3dCQUNwQywrQkFBK0I7Ozs7Z0JBSXZDLFNBQVMsVUFBVSxZQUFZLGdCQUFnQjtvQkFDM0MsTUFBTSxpQkFBaUIsWUFBWSxJQUFJLFlBQVksZUFBZTs7O2dCQUd0RSxTQUFTLGNBQWMsZ0JBQWdCO29CQUNuQyxVQUFVLGNBQWM7b0JBQ3hCLFVBQVUsYUFBYTtvQkFDdkIsVUFBVSxhQUFhO29CQUN2QixVQUFVLG9CQUFvQjtvQkFDOUIsVUFBVSxlQUFlOztvQkFFekIsT0FBTyxVQUFVOztvQkFFakIsVUFBVSxTQUFTLG1CQUFtQjtvQkFDdEMsT0FBTzs7O2dCQUdYLFNBQVMsWUFBWSxnQkFBZ0IsWUFBWSxhQUFhO29CQUMxRCxjQUFjOztvQkFFZCxJQUFJLGVBQWUsUUFBUSxLQUFLO29CQUNoQyxPQUFPLGFBQWEsUUFBUSxRQUFRO29CQUNwQyxPQUFPLGFBQWEsU0FBUyxhQUFhLFFBQVE7b0JBQ2xELE9BQU8sYUFBYSxRQUFRLFVBQVU7OztnQkFHMUMsR0FBRyxtQ0FBbUMsWUFBTTtvQkFDeEMsWUFBWSxjQUFjLGdCQUN0QixjQUFjLFdBQVcsZ0JBQWdCLGdCQUFnQjs7O2dCQUdqRSxHQUFHLG1DQUFtQyxZQUFNO29CQUN4QyxZQUFZLGFBQWEsZ0JBQ3JCLGFBQWEsV0FBVyxnQkFBZ0IsU0FBUzs7O2dCQUd6RCxHQUFHLDRDQUE0QyxZQUFNO29CQUNqRCxZQUFZLG9CQUFvQixpQkFDNUIscUJBQXFCLFdBQVcsZ0JBQWdCLFNBQVM7OztnQkFHakUsR0FBRyxvQ0FBb0MsWUFBTTtvQkFDekMsWUFBWSxhQUFhLGlCQUNyQixhQUFhLFdBQVcsZ0JBQWdCLFNBQVM7OztnQkFHekQsR0FBRyxtQ0FBbUMsWUFBTTtvQkFDeEMsWUFBWSxlQUFlLGNBQWM7Ozs7O0dBUzlDIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0U3RhdHVzQmFyQ29tcG9uZW50VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xuaW1wb3J0ICcuLi9JZGVudGl0eVJlcXVlc3RUZXN0RGF0YSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2kxOG4vTW9ja1RyYW5zbGF0ZUZpbHRlcic7XG5cbmRlc2NyaWJlKCdzcElkZW50aXR5UmVxdWVzdFN0YXR1c0JhcicsICgpID0+IHtcbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPSBgPHNwLWlkZW50aXR5LXJlcXVlc3Qtc3RhdHVzLWJhciBzcC1yZXF1ZXN0PVwicmVxdWVzdFwiIC8+YCxcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0LCAkc2NvcGUsICRjb21waWxlLCBlbGVtZW50LCBkYXRlRmlsdGVyO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoSWRlbnRpdHlSZXF1ZXN0LCBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSwgJHJvb3RTY29wZSwgc3BUcmFuc2xhdGVGaWx0ZXIsIF8kY29tcGlsZV8sXG4gICAgICAgICAgICAgICAgICAgICAgIF9kYXRlRmlsdGVyXykgPT4ge1xuICAgICAgICBpZGVudGl0eVJlcXVlc3QgPSBuZXcgSWRlbnRpdHlSZXF1ZXN0KGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfMSk7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgZGF0ZUZpbHRlciA9IF9kYXRlRmlsdGVyXztcblxuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlci5jb25maWd1cmVDYXRhbG9nKHtcbiAgICAgICAgICAgICd1aV9pZGVudGl0eV9yZXF1ZXN0X2NhbmNlbGVkX2FsZXJ0X2RhdGUnOiAnQ2FuY2VsZWQgezB9JyxcbiAgICAgICAgICAgICd1aV9pZGVudGl0eV9yZXF1ZXN0X2ZhaWx1cmVfZGF0ZSc6ICdGYWlsdXJlIHswfScsXG4gICAgICAgICAgICAndWlfaWRlbnRpdHlfcmVxdWVzdF9wYXJ0aWFsX3N1Y2Nlc3NfZGF0ZSc6ICdQYXJ0aWFsIFN1Y2Nlc3MgezB9JyxcbiAgICAgICAgICAgICd1aV9pZGVudGl0eV9yZXF1ZXN0X3N1Y2Nlc3NfZGF0ZSc6ICdTdWNjZXNzIHswfScsXG4gICAgICAgICAgICAndWlfaWRlbnRpdHlfcmVxdWVzdF9wZW5kaW5nJzogJ1BlbmRpbmcnXG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIHNweUlmVHJ1ZShzdGF0dXNGdW5jLCB0cnVlU3RhdHVzRnVuYykge1xuICAgICAgICBzcHlPbihpZGVudGl0eVJlcXVlc3QsIHN0YXR1c0Z1bmMpLmFuZC5yZXR1cm5WYWx1ZShzdGF0dXNGdW5jID09PSB0cnVlU3RhdHVzRnVuYyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0cnVlU3RhdHVzRnVuYykge1xuICAgICAgICBzcHlJZlRydWUoJ2lzQ2FuY2VsZWQnLCB0cnVlU3RhdHVzRnVuYyk7XG4gICAgICAgIHNweUlmVHJ1ZSgnaXNTdWNjZXNzJywgdHJ1ZVN0YXR1c0Z1bmMpO1xuICAgICAgICBzcHlJZlRydWUoJ2lzRmFpbHVyZScsIHRydWVTdGF0dXNGdW5jKTtcbiAgICAgICAgc3B5SWZUcnVlKCdpc1BhcnRpYWxTdWNjZXNzJywgdHJ1ZVN0YXR1c0Z1bmMpO1xuICAgICAgICBzcHlJZlRydWUoJ2lzRXhlY3V0aW5nJywgdHJ1ZVN0YXR1c0Z1bmMpO1xuXG4gICAgICAgICRzY29wZS5yZXF1ZXN0ID0gaWRlbnRpdHlSZXF1ZXN0O1xuXG4gICAgICAgIGVsZW1lbnQgPSAkY29tcGlsZShlbGVtZW50RGVmaW5pdGlvbikoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRlc3RFbGVtZW50KHRydWVTdGF0dXNGdW5jLCBhbGVydENsYXNzLCB0ZXh0Q29udGVudCkge1xuICAgICAgICBjcmVhdGVFbGVtZW50KHRydWVTdGF0dXNGdW5jKTtcblxuICAgICAgICBsZXQgYWxlcnRFbGVtZW50ID0gZWxlbWVudC5maW5kKCcuaWRlbnRpdHktcmVxdWVzdC1zdGF0dXMtYmFyIC5hbGVydCcpO1xuICAgICAgICBleHBlY3QoYWxlcnRFbGVtZW50Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGFsZXJ0RWxlbWVudC5oYXNDbGFzcyhhbGVydENsYXNzKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgZXhwZWN0KGFsZXJ0RWxlbWVudC50ZXh0KCkpLnRvQ29udGFpbih0ZXh0Q29udGVudCk7XG4gICAgfVxuXG4gICAgaXQoJ3Nob3cgY2FuY2VsZWQgd2l0aCBhbGVydCBkYW5nZXInLCAoKSA9PiB7XG4gICAgICAgIHRlc3RFbGVtZW50KCdpc0NhbmNlbGVkJywgJ2FsZXJ0LWRhbmdlcicsXG4gICAgICAgICAgICAnQ2FuY2VsZWQgJyArIGRhdGVGaWx0ZXIoaWRlbnRpdHlSZXF1ZXN0LnRlcm1pbmF0ZWREYXRlLCAnc2hvcnREYXRlJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3dzIGZhaWx1cmUgd2l0aCBhbGVydCBkYW5nZXInLCAoKSA9PiB7XG4gICAgICAgIHRlc3RFbGVtZW50KCdpc0ZhaWx1cmUnLCAnYWxlcnQtZGFuZ2VyJyxcbiAgICAgICAgICAgICdGYWlsdXJlICcgKyBkYXRlRmlsdGVyKGlkZW50aXR5UmVxdWVzdC5lbmREYXRlLCAnc2hvcnREYXRlJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3dzIHBhcnRpYWwgc3VjY2VzcyB3aXRoIGFsZXJ0IHdhcm5pbmcnLCAoKSA9PiB7XG4gICAgICAgIHRlc3RFbGVtZW50KCdpc1BhcnRpYWxTdWNjZXNzJywgJ2FsZXJ0LXdhcm5pbmcnLFxuICAgICAgICAgICAgJ1BhcnRpYWwgU3VjY2VzcyAnICsgZGF0ZUZpbHRlcihpZGVudGl0eVJlcXVlc3QuZW5kRGF0ZSwgJ3Nob3J0RGF0ZScpKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG93cyBzdWNjZXNzIHdpdGggYWxlcnQgc3VjY2VzcycsICgpID0+IHtcbiAgICAgICAgdGVzdEVsZW1lbnQoJ2lzU3VjY2VzcycsICdhbGVydC1zdWNjZXNzJyxcbiAgICAgICAgICAgICdTdWNjZXNzICcgKyBkYXRlRmlsdGVyKGlkZW50aXR5UmVxdWVzdC5lbmREYXRlLCAnc2hvcnREYXRlJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3dzIGV4ZWN1dGluZyB3aXRoIGFsZXJ0IGluZm8nLCAoKSA9PiB7XG4gICAgICAgIHRlc3RFbGVtZW50KCdpc0V4ZWN1dGluZycsICdhbGVydC1pbmZvJywgJ1BlbmRpbmcnKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
