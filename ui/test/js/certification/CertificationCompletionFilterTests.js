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

            describe('CertificationCompletionFilter', function () {
                var certCompletionFilter = undefined,
                    filteredVal = undefined,
                    testItemStatusCount = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_certCompletionFilter_, certificationTestData, CertificationItemStatusCount) {
                    certCompletionFilter = _certCompletionFilter_;
                    testItemStatusCount = new CertificationItemStatusCount(certificationTestData.CERTIFICATION_1.itemStatusCount);
                }));

                it('should show correct completion val', function () {
                    filteredVal = certCompletionFilter(testItemStatusCount);
                    expect(filteredVal).toEqual(testItemStatusCount.getCompleteCount() + ' / ' + testItemStatusCount.getTotalCount());
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkNvbXBsZXRpb25GaWx0ZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7OztJQUlqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7O1FBRTVELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxpQ0FBaUMsWUFBVztnQkFDakQsSUFBSSx1QkFBb0I7b0JBQUUsY0FBVztvQkFBRSxzQkFBbUI7O2dCQUUxRCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyx3QkFBd0IsdUJBQXVCLDhCQUE4QjtvQkFDcEcsdUJBQXVCO29CQUN2QixzQkFBc0IsSUFBSSw2QkFBNkIsc0JBQXNCLGdCQUFnQjs7O2dCQUdqRyxHQUFHLHNDQUFzQyxZQUFXO29CQUNoRCxjQUFjLHFCQUFxQjtvQkFDbkMsT0FBTyxhQUFhLFFBQVEsb0JBQW9CLHFCQUFxQixRQUNqRSxvQkFBb0I7Ozs7O0dBYTdCIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkNvbXBsZXRpb25GaWx0ZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcblxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25Db21wbGV0aW9uRmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNlcnRDb21wbGV0aW9uRmlsdGVyLCBmaWx0ZXJlZFZhbCwgdGVzdEl0ZW1TdGF0dXNDb3VudDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9jZXJ0Q29tcGxldGlvbkZpbHRlcl8sIGNlcnRpZmljYXRpb25UZXN0RGF0YSwgQ2VydGlmaWNhdGlvbkl0ZW1TdGF0dXNDb3VudCkge1xuICAgICAgICBjZXJ0Q29tcGxldGlvbkZpbHRlciA9IF9jZXJ0Q29tcGxldGlvbkZpbHRlcl87XG4gICAgICAgIHRlc3RJdGVtU3RhdHVzQ291bnQgPSBuZXcgQ2VydGlmaWNhdGlvbkl0ZW1TdGF0dXNDb3VudChjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVElGSUNBVElPTl8xLml0ZW1TdGF0dXNDb3VudCk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCBzaG93IGNvcnJlY3QgY29tcGxldGlvbiB2YWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZmlsdGVyZWRWYWwgPSBjZXJ0Q29tcGxldGlvbkZpbHRlcih0ZXN0SXRlbVN0YXR1c0NvdW50KTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsKS50b0VxdWFsKHRlc3RJdGVtU3RhdHVzQ291bnQuZ2V0Q29tcGxldGVDb3VudCgpICsgJyAvICcgK1xuICAgICAgICAgICAgdGVzdEl0ZW1TdGF0dXNDb3VudC5nZXRUb3RhbENvdW50KCkpO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
