System.register(['test/js/TestInitializer', 'workitem/pamApproval/PamApprovalModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var pamApprovalModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemPamApprovalPamApprovalModule) {
            pamApprovalModule = _workitemPamApprovalPamApprovalModule['default'];
        }],
        execute: function () {

            describe('PamApprovalService', function () {

                var $httpBackend = undefined,
                    pamApprovalService = undefined;

                beforeEach(module(pamApprovalModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function (_$httpBackend_, _pamApprovalService_) {
                    $httpBackend = _$httpBackend_;
                    pamApprovalService = _pamApprovalService_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                it('approve() POSTs to approve endpoint', function () {
                    var id = '1234';
                    $httpBackend.expectPOST('/identityiq/ui/rest/pamApprovals/' + id + '/approve').respond(204);
                    pamApprovalService.approve(id);
                    $httpBackend.flush();
                });

                it('reject() POSTs to reject endpoint', function () {
                    var id = '1234';
                    $httpBackend.expectPOST('/identityiq/ui/rest/pamApprovals/' + id + '/reject').respond(204);
                    pamApprovalService.reject(id);
                    $httpBackend.flush();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL3BhbUFwcHJvdmFsL1BhbUFwcHJvdmFsU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQ0FBMkMsVUFBVSxTQUFTOzs7SUFHdEc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3RixvQkFBb0Isc0NBQXNDOztRQUU5RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsc0JBQXNCLFlBQU07O2dCQUVqQyxJQUFJLGVBQVk7b0JBQUUscUJBQWtCOztnQkFFcEMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLG1CQUFtQjs7O2dCQUd6QyxXQUFXLE9BQU8sVUFBQyxnQkFBZ0Isc0JBQXlCO29CQUN4RCxlQUFlO29CQUNmLHFCQUFxQjs7O2dCQUd6QixVQUFVLFlBQU07b0JBQ1osYUFBYTtvQkFDYixhQUFhOzs7Z0JBR2pCLEdBQUcsdUNBQXVDLFlBQU07b0JBQzVDLElBQUksS0FBSztvQkFDVCxhQUFhLFdBQVUsc0NBQXFDLEtBQUUsWUFBWSxRQUFRO29CQUNsRixtQkFBbUIsUUFBUTtvQkFDM0IsYUFBYTs7O2dCQUdqQixHQUFHLHFDQUFxQyxZQUFNO29CQUMxQyxJQUFJLEtBQUs7b0JBQ1QsYUFBYSxXQUFVLHNDQUFxQyxLQUFFLFdBQVcsUUFBUTtvQkFDakYsbUJBQW1CLE9BQU87b0JBQzFCLGFBQWE7Ozs7O0dBYWxCIiwiZmlsZSI6IndvcmtpdGVtL3BhbUFwcHJvdmFsL1BhbUFwcHJvdmFsU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IHBhbUFwcHJvdmFsTW9kdWxlIGZyb20gJ3dvcmtpdGVtL3BhbUFwcHJvdmFsL1BhbUFwcHJvdmFsTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdQYW1BcHByb3ZhbFNlcnZpY2UnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0ICRodHRwQmFja2VuZCwgcGFtQXBwcm92YWxTZXJ2aWNlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBhbUFwcHJvdmFsTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcclxuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kaHR0cEJhY2tlbmRfLCBfcGFtQXBwcm92YWxTZXJ2aWNlXykgPT4ge1xyXG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xyXG4gICAgICAgIHBhbUFwcHJvdmFsU2VydmljZSA9IF9wYW1BcHByb3ZhbFNlcnZpY2VfO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xyXG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2FwcHJvdmUoKSBQT1NUcyB0byBhcHByb3ZlIGVuZHBvaW50JywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBpZCA9ICcxMjM0JztcclxuICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChgL2lkZW50aXR5aXEvdWkvcmVzdC9wYW1BcHByb3ZhbHMvJHtpZH0vYXBwcm92ZWApLnJlc3BvbmQoMjA0KTtcclxuICAgICAgICBwYW1BcHByb3ZhbFNlcnZpY2UuYXBwcm92ZShpZCk7XHJcbiAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmVqZWN0KCkgUE9TVHMgdG8gcmVqZWN0IGVuZHBvaW50JywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBpZCA9ICcxMjM0JztcclxuICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChgL2lkZW50aXR5aXEvdWkvcmVzdC9wYW1BcHByb3ZhbHMvJHtpZH0vcmVqZWN0YCkucmVzcG9uZCgyMDQpO1xyXG4gICAgICAgIHBhbUFwcHJvdmFsU2VydmljZS5yZWplY3QoaWQpO1xyXG4gICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
