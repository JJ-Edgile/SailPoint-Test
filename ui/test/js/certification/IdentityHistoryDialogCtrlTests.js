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

            describe('IdentityHistoryDialogCtrl', function () {

                var $controller = undefined,
                    identityHistoryService = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_$controller_, _identityHistoryService_) {
                    $controller = _$controller_;
                    identityHistoryService = _identityHistoryService_;

                    spyOn(identityHistoryService, 'getIdentityHistory');
                }));

                function createController(certId, itemId) {
                    return $controller('IdentityHistoryDialogCtrl', {
                        identityHistoryService: identityHistoryService,
                        certId: certId,
                        itemId: itemId,
                        challenge: null,
                        delegation: null,
                        hasIdentity: true
                    });
                }

                it('constructor throws if id is missing', function () {
                    expect(function () {
                        createController();
                    }).toThrow();
                });

                it('getHistoryItems() calls service', function () {
                    var certId = '12345',
                        itemId = 'abcd',
                        startIdx = 2;

                    createController(certId, itemId).getHistoryItems(startIdx);
                    expect(identityHistoryService.getIdentityHistory).toHaveBeenCalledWith(certId, itemId, startIdx, 5);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vSWRlbnRpdHlIaXN0b3J5RGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0MsVUFBVSxTQUFTOzs7OztJQUtqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7O1FBRTVELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyw2QkFBNkIsWUFBVzs7Z0JBRTdDLElBQUksY0FBVztvQkFBRSx5QkFBc0I7O2dCQUV2QyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxlQUFlLDBCQUEwQjtvQkFDaEUsY0FBYztvQkFDZCx5QkFBeUI7O29CQUV6QixNQUFNLHdCQUF3Qjs7O2dCQUdsQyxTQUFTLGlCQUFpQixRQUFRLFFBQVE7b0JBQ3RDLE9BQU8sWUFBWSw2QkFBNkI7d0JBQzVDLHdCQUF3Qjt3QkFDeEIsUUFBUTt3QkFDUixRQUFRO3dCQUNSLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixhQUFhOzs7O2dCQUlyQixHQUFHLHVDQUF1QyxZQUFXO29CQUNqRCxPQUFPLFlBQVc7d0JBQUU7dUJBQXVCOzs7Z0JBRy9DLEdBQUcsbUNBQW1DLFlBQVc7b0JBQzdDLElBQUksU0FBUzt3QkFDVCxTQUFTO3dCQUNULFdBQVc7O29CQUVmLGlCQUFpQixRQUFRLFFBQVEsZ0JBQWdCO29CQUNqRCxPQUFPLHVCQUF1QixvQkFBb0IscUJBQXFCLFFBQVEsUUFBUSxVQUFVOzs7OztHQWV0RyIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL0lkZW50aXR5SGlzdG9yeURpYWxvZ0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnSWRlbnRpdHlIaXN0b3J5RGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0ICRjb250cm9sbGVyLCBpZGVudGl0eUhpc3RvcnlTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgX2lkZW50aXR5SGlzdG9yeVNlcnZpY2VfKSB7XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgaWRlbnRpdHlIaXN0b3J5U2VydmljZSA9IF9pZGVudGl0eUhpc3RvcnlTZXJ2aWNlXztcblxuICAgICAgICBzcHlPbihpZGVudGl0eUhpc3RvcnlTZXJ2aWNlLCAnZ2V0SWRlbnRpdHlIaXN0b3J5Jyk7XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihjZXJ0SWQsIGl0ZW1JZCkge1xuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ0lkZW50aXR5SGlzdG9yeURpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICBpZGVudGl0eUhpc3RvcnlTZXJ2aWNlOiBpZGVudGl0eUhpc3RvcnlTZXJ2aWNlLFxuICAgICAgICAgICAgY2VydElkOiBjZXJ0SWQsXG4gICAgICAgICAgICBpdGVtSWQ6IGl0ZW1JZCxcbiAgICAgICAgICAgIGNoYWxsZW5nZTogbnVsbCxcbiAgICAgICAgICAgIGRlbGVnYXRpb246IG51bGwsXG4gICAgICAgICAgICBoYXNJZGVudGl0eTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpdCgnY29uc3RydWN0b3IgdGhyb3dzIGlmIGlkIGlzIG1pc3NpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjcmVhdGVDb250cm9sbGVyKCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdnZXRIaXN0b3J5SXRlbXMoKSBjYWxscyBzZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBjZXJ0SWQgPSAnMTIzNDUnLFxuICAgICAgICAgICAgaXRlbUlkID0gJ2FiY2QnLFxuICAgICAgICAgICAgc3RhcnRJZHggPSAyO1xuXG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoY2VydElkLCBpdGVtSWQpLmdldEhpc3RvcnlJdGVtcyhzdGFydElkeCk7XG4gICAgICAgIGV4cGVjdChpZGVudGl0eUhpc3RvcnlTZXJ2aWNlLmdldElkZW50aXR5SGlzdG9yeSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydElkLCBpdGVtSWQsIHN0YXJ0SWR4LCA1KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
