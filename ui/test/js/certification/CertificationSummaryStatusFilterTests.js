System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationSummaryStatusFilter', function () {
                var summaryStatusFilter = undefined,
                    filteredVal = undefined,
                    CertificationItem = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_certSummaryStatusFilter_, _CertificationItem_) {
                    summaryStatusFilter = _certSummaryStatusFilter_;
                    CertificationItem = _CertificationItem_;
                }));

                it('should return correct values', function () {
                    filteredVal = summaryStatusFilter(CertificationItem.Status.WaitingReview);
                    expect(filteredVal).toEqual('ui_delegation_review');

                    filteredVal = summaryStatusFilter(CertificationItem.Status.Challenged);
                    expect(filteredVal).toEqual('ui_challenge_review');

                    filteredVal = summaryStatusFilter(CertificationItem.Status.Returned);
                    expect(filteredVal).toEqual('ui_delegation_returned');
                });

                it('should return value when status value doesn\'t match anything to be translated', function () {
                    var value = 'Completed';
                    filteredVal = summaryStatusFilter(value);
                    expect(filteredVal).toEqual(value);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvblN1bW1hcnlTdGF0dXNGaWx0ZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7OztJQUlqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7O1FBRTVELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxvQ0FBb0MsWUFBVztnQkFDcEQsSUFBSSxzQkFBbUI7b0JBQUUsY0FBVztvQkFBRSxvQkFBaUI7O2dCQUV2RCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUywyQkFBMkIscUJBQXFCO29CQUN2RSxzQkFBc0I7b0JBQ3RCLG9CQUFvQjs7O2dCQUd4QixHQUFHLGdDQUFnQyxZQUFXO29CQUMxQyxjQUFjLG9CQUFvQixrQkFBa0IsT0FBTztvQkFDM0QsT0FBTyxhQUFhLFFBQVE7O29CQUU1QixjQUFjLG9CQUFvQixrQkFBa0IsT0FBTztvQkFDM0QsT0FBTyxhQUFhLFFBQVE7O29CQUU1QixjQUFjLG9CQUFvQixrQkFBa0IsT0FBTztvQkFDM0QsT0FBTyxhQUFhLFFBQVE7OztnQkFHaEMsR0FBRyxrRkFBa0YsWUFBVztvQkFDNUYsSUFBSSxRQUFRO29CQUNaLGNBQWMsb0JBQW9CO29CQUNsQyxPQUFPLGFBQWEsUUFBUTs7Ozs7R0FjakMiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uU3VtbWFyeVN0YXR1c0ZpbHRlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnQ2VydGlmaWNhdGlvblN1bW1hcnlTdGF0dXNGaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgc3VtbWFyeVN0YXR1c0ZpbHRlciwgZmlsdGVyZWRWYWwsIENlcnRpZmljYXRpb25JdGVtO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2NlcnRTdW1tYXJ5U3RhdHVzRmlsdGVyXywgX0NlcnRpZmljYXRpb25JdGVtXykge1xuICAgICAgICBzdW1tYXJ5U3RhdHVzRmlsdGVyID0gX2NlcnRTdW1tYXJ5U3RhdHVzRmlsdGVyXztcbiAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0gPSBfQ2VydGlmaWNhdGlvbkl0ZW1fO1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvcnJlY3QgdmFsdWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZpbHRlcmVkVmFsID0gc3VtbWFyeVN0YXR1c0ZpbHRlcihDZXJ0aWZpY2F0aW9uSXRlbS5TdGF0dXMuV2FpdGluZ1Jldmlldyk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbCkudG9FcXVhbCgndWlfZGVsZWdhdGlvbl9yZXZpZXcnKTtcblxuICAgICAgICBmaWx0ZXJlZFZhbCA9IHN1bW1hcnlTdGF0dXNGaWx0ZXIoQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkNoYWxsZW5nZWQpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRWYWwpLnRvRXF1YWwoJ3VpX2NoYWxsZW5nZV9yZXZpZXcnKTtcblxuICAgICAgICBmaWx0ZXJlZFZhbCA9IHN1bW1hcnlTdGF0dXNGaWx0ZXIoQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLlJldHVybmVkKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsKS50b0VxdWFsKCd1aV9kZWxlZ2F0aW9uX3JldHVybmVkJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB2YWx1ZSB3aGVuIHN0YXR1cyB2YWx1ZSBkb2VzblxcJ3QgbWF0Y2ggYW55dGhpbmcgdG8gYmUgdHJhbnNsYXRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSAnQ29tcGxldGVkJztcbiAgICAgICAgZmlsdGVyZWRWYWwgPSBzdW1tYXJ5U3RhdHVzRmlsdGVyKHZhbHVlKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsKS50b0VxdWFsKHZhbHVlKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
