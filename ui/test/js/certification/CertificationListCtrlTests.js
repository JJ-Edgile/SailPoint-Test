System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('CertificationCtrl', function () {

                var certificationService = undefined,
                    ctrl = undefined,
                    SortOrder = undefined,
                    testService = undefined,
                    $scope = undefined,
                    certs = {
                    data: {
                        objects: [{
                            id: 1,
                            signOffComplete: false
                        }, {
                            id: 2,
                            signOffComplete: true
                        }, {
                            id: 3,
                            signOffComplete: false
                        }]
                    }
                };

                beforeEach(module(certificationModule, testModule));

                beforeEach(inject(function (_certificationService_, $controller, _SortOrder_, _testService_, _$rootScope_) {
                    certificationService = _certificationService_;
                    SortOrder = _SortOrder_;
                    testService = _testService_;
                    ctrl = $controller('CertificationListCtrl', {});
                    $scope = _$rootScope_;
                    spyOn(certificationService, 'getCertifications').and.returnValue(testService.createPromise(false, certs, null));
                }));

                describe('getCertifications', function () {

                    it('calls through to certificationService', function () {
                        var start = 10,
                            limit = 12;
                        ctrl.getCertifications(start, limit, null);
                        expect(certificationService.getCertifications).toHaveBeenCalledWith(start, limit, null);
                    });

                    it('adds sort order', function () {
                        var start = 10,
                            limit = 12,
                            sortOrder = new SortOrder('expiration', true);
                        ctrl.getCertifications(start, limit, sortOrder);
                        expect(certificationService.getCertifications).toHaveBeenCalledWith(start, limit, sortOrder);
                    });
                });

                describe('getTotal', function () {
                    it('returns total from paging data', function () {
                        var total = 7;
                        ctrl.pagingData.setTotal(total);
                        expect(ctrl.getTotal()).toEqual(total);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkxpc3RDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyx1QkFBdUIsVUFBVSxTQUFTOzs7SUFHdkg7O0lBRUEsSUFBSSxxQkFBcUI7SUFDekIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxxQkFBcUIsWUFBTTs7Z0JBRWhDLElBQUksdUJBQW9CO29CQUFFLE9BQUk7b0JBQUUsWUFBUztvQkFBRSxjQUFXO29CQUFFLFNBQU07b0JBQzFELFFBQVE7b0JBQ0osTUFBTTt3QkFDRixTQUFTLENBQ0w7NEJBQ0ksSUFBSTs0QkFDSixpQkFBaUI7MkJBRXJCOzRCQUNJLElBQUk7NEJBQ0osaUJBQWlCOzJCQUVyQjs0QkFDSSxJQUFJOzRCQUNKLGlCQUFpQjs7Ozs7Z0JBTXJDLFdBQVcsT0FBTyxxQkFBcUI7O2dCQUV2QyxXQUFXLE9BQU8sVUFBQyx3QkFBd0IsYUFBYSxhQUFhLGVBQWUsY0FBaUI7b0JBQ2pHLHVCQUF1QjtvQkFDdkIsWUFBWTtvQkFDWixjQUFjO29CQUNkLE9BQU8sWUFBWSx5QkFBeUI7b0JBQzVDLFNBQVM7b0JBQ1QsTUFBTSxzQkFBc0IscUJBQXFCLElBQUksWUFBWSxZQUFZLGNBQWMsT0FBTyxPQUFPOzs7Z0JBRzdHLFNBQVMscUJBQXFCLFlBQU07O29CQUVoQyxHQUFHLHlDQUF5QyxZQUFNO3dCQUM5QyxJQUFJLFFBQVE7NEJBQUksUUFBUTt3QkFDeEIsS0FBSyxrQkFBa0IsT0FBTyxPQUFPO3dCQUNyQyxPQUFPLHFCQUFxQixtQkFBbUIscUJBQXFCLE9BQU8sT0FBTzs7O29CQUd0RixHQUFHLG1CQUFtQixZQUFNO3dCQUN4QixJQUFJLFFBQVE7NEJBQUksUUFBUTs0QkFDcEIsWUFBWSxJQUFJLFVBQVUsY0FBYzt3QkFDNUMsS0FBSyxrQkFBa0IsT0FBTyxPQUFPO3dCQUNyQyxPQUFPLHFCQUFxQixtQkFBbUIscUJBQXFCLE9BQU8sT0FBTzs7OztnQkFJMUYsU0FBUyxZQUFZLFlBQU07b0JBQ3ZCLEdBQUksa0NBQWtDLFlBQU07d0JBQ3hDLElBQUksUUFBUTt3QkFDWixLQUFLLFdBQVcsU0FBUzt3QkFDekIsT0FBTyxLQUFLLFlBQVksUUFBUTs7Ozs7O0dBZ0J6QyIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25MaXN0Q3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uQ3RybCcsICgpID0+IHtcblxuICAgIGxldCBjZXJ0aWZpY2F0aW9uU2VydmljZSwgY3RybCwgU29ydE9yZGVyLCB0ZXN0U2VydmljZSwgJHNjb3BlLFxuICAgICAgICBjZXJ0cyA9IHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbk9mZkNvbXBsZXRlOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25PZmZDb21wbGV0ZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25PZmZDb21wbGV0ZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfY2VydGlmaWNhdGlvblNlcnZpY2VfLCAkY29udHJvbGxlciwgX1NvcnRPcmRlcl8sIF90ZXN0U2VydmljZV8sIF8kcm9vdFNjb3BlXykgPT4ge1xuICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uU2VydmljZV87XG4gICAgICAgIFNvcnRPcmRlciA9IF9Tb3J0T3JkZXJfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQ2VydGlmaWNhdGlvbkxpc3RDdHJsJywge30pO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvbnMnKS5hbmQucmV0dXJuVmFsdWUodGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgY2VydHMsIG51bGwpKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Q2VydGlmaWNhdGlvbnMnLCAoKSA9PiB7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gY2VydGlmaWNhdGlvblNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhcnQgPSAxMCwgbGltaXQgPSAxMjtcbiAgICAgICAgICAgIGN0cmwuZ2V0Q2VydGlmaWNhdGlvbnMoc3RhcnQsIGxpbWl0LCBudWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDZXJ0aWZpY2F0aW9ucykudG9IYXZlQmVlbkNhbGxlZFdpdGgoc3RhcnQsIGxpbWl0LCBudWxsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FkZHMgc29ydCBvcmRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGFydCA9IDEwLCBsaW1pdCA9IDEyLFxuICAgICAgICAgICAgICAgIHNvcnRPcmRlciA9IG5ldyBTb3J0T3JkZXIoJ2V4cGlyYXRpb24nLCB0cnVlKTtcbiAgICAgICAgICAgIGN0cmwuZ2V0Q2VydGlmaWNhdGlvbnMoc3RhcnQsIGxpbWl0LCBzb3J0T3JkZXIpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldENlcnRpZmljYXRpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChzdGFydCwgbGltaXQsIHNvcnRPcmRlcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldFRvdGFsJywgKCkgPT4ge1xuICAgICAgICBpdCAoJ3JldHVybnMgdG90YWwgZnJvbSBwYWdpbmcgZGF0YScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0b3RhbCA9IDc7XG4gICAgICAgICAgICBjdHJsLnBhZ2luZ0RhdGEuc2V0VG90YWwodG90YWwpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0VG90YWwoKSkudG9FcXVhbCh0b3RhbCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
