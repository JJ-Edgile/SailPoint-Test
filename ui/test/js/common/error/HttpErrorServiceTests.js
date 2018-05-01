System.register(['test/js/TestInitializer', 'common/error/ErrorModule'], function (_export) {

    /**
     * Tests for the HttpErrorService
     */

    'use strict';

    var errorModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonErrorErrorModule) {
            errorModule = _commonErrorErrorModule['default'];
        }],
        execute: function () {
            describe('HttpErrorService', function () {
                var httpErrorService,
                    $http,
                    $httpBackend,
                    modalSpy,
                    dummyUrl = '/someUrl',
                    ERROR_500_RESPONSE = { message: 'Internal Server Error' },
                    ERROR_500_QK_RESPONSE = { message: 'Internal Server Error', quickKey: 11 },
                    ERROR_401_RESPONSE = { message: 'Unauthorized' },
                    ERROR_404_RESPONSE = { message: 'Not Found' },
                    ERROR_405_RESPONSE = { message: 'Method Not Allowed' };

                function expectToHaveUsedWarningLevel(warningLevel) {
                    expect(modalSpy).toHaveBeenCalled();
                    expect(modalSpy.calls.count()).toEqual(1);
                    expect(modalSpy.calls.mostRecent().args[0].warningLevel).toEqual(warningLevel);
                }

                function makeRequest(status, response, handledErrors) {
                    var httpConfig = {};
                    if (handledErrors) {
                        httpConfig.handledErrors = handledErrors;
                    }
                    $httpBackend.when('GET', dummyUrl).respond(status, response);
                    $http.get(dummyUrl, httpConfig)['catch'](angular.noop);
                    $httpBackend.flush();
                }

                beforeEach(module(errorModule));

                beforeEach(inject(function (_$http_, _$httpBackend_, _spModal_, _httpError_) {
                    $http = _$http_;
                    $httpBackend = _$httpBackend_;
                    httpErrorService = _httpError_;
                    modalSpy = spyOn(_spModal_, 'open');
                }));

                it('should intercept error responses and show a dialog', function () {
                    makeRequest(500, ERROR_500_RESPONSE);
                    expect(modalSpy).toHaveBeenCalled();
                });

                it('should not intercept success responses', function () {
                    makeRequest(200, {});
                    expect(modalSpy).not.toHaveBeenCalled();
                });

                it('should not intercept errors when they are in the handledError list', function () {
                    makeRequest(401, ERROR_401_RESPONSE, [401]);
                    expect(modalSpy).not.toHaveBeenCalled();
                });

                it('should not intercept errors when they one of the items in the handledErrors list', function () {
                    makeRequest(404, ERROR_404_RESPONSE, [401, 404]);
                    expect(modalSpy).not.toHaveBeenCalled();
                });

                it('should intercept error when it is not one of the items in the handledErrors list', function () {
                    makeRequest(405, ERROR_405_RESPONSE, [401, 404]);
                    expect(modalSpy).toHaveBeenCalled();
                });

                it('should intercept errors when they are not in the handledError list', function () {
                    makeRequest(500, ERROR_500_RESPONSE, [401]);
                    expect(modalSpy).toHaveBeenCalled();
                });

                it('should display the warning dialog for statuses in the 400s', function () {
                    makeRequest(404, ERROR_404_RESPONSE);
                    expectToHaveUsedWarningLevel('warning');
                });

                it('should display the severe dialog for statuses in the 500s', function () {
                    makeRequest(500, ERROR_500_RESPONSE);
                    expectToHaveUsedWarningLevel('danger');
                    expect(modalSpy).toHaveBeenCalledWith({
                        type: 'alert',
                        title: 'ui_error_severe_title',
                        warningLevel: 'danger',
                        content: 'ui_err_fatal_system'
                    });
                });

                it('should display the severe dialog with quickkey for statuses in the 500s with quickkey', function () {
                    makeRequest(500, ERROR_500_QK_RESPONSE);
                    expectToHaveUsedWarningLevel('danger');
                    expect(modalSpy).toHaveBeenCalledWith({
                        type: 'alert',
                        title: 'ui_error_severe_title',
                        warningLevel: 'danger',
                        content: 'ui_err_fatal_system_qk'
                    });
                });

                describe('callback tests', function () {
                    var successSpy = jasmine.createSpy(),
                        errorSpy = jasmine.createSpy();

                    it('should call the error callback when intercepted', function () {
                        $httpBackend.when('GET', dummyUrl).respond(500, ERROR_500_RESPONSE);
                        $http.get(dummyUrl).then(successSpy, errorSpy);
                        $httpBackend.flush();
                        expect(successSpy).not.toHaveBeenCalled();
                        expect(errorSpy).toHaveBeenCalled();
                    });

                    it('should call the error callback when not intercepted', function () {
                        $httpBackend.when('GET', dummyUrl).respond(500, ERROR_500_RESPONSE);
                        $http.get(dummyUrl).then(successSpy, errorSpy);
                        $httpBackend.flush();
                        expect(successSpy).not.toHaveBeenCalled();
                        expect(errorSpy).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9lcnJvci9IdHRwRXJyb3JTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDZCQUE2QixVQUFVLFNBQVM7Ozs7OztJQUE1Rjs7SUFRSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGNBQWMsd0JBQXdCOztRQUUxQyxTQUFTLFlBQVk7WUFKN0IsU0FBUyxvQkFBb0IsWUFBVztnQkFDcEMsSUFBSTtvQkFDQTtvQkFDQTtvQkFDQTtvQkFDQSxXQUFXO29CQUNYLHFCQUFxQixFQUFDLFNBQVM7b0JBQy9CLHdCQUF3QixFQUFDLFNBQVMseUJBQXlCLFVBQVU7b0JBQ3JFLHFCQUFxQixFQUFDLFNBQVM7b0JBQy9CLHFCQUFxQixFQUFDLFNBQVM7b0JBQy9CLHFCQUFxQixFQUFDLFNBQVM7O2dCQUVuQyxTQUFTLDZCQUE2QixjQUFjO29CQUNoRCxPQUFPLFVBQVU7b0JBQ2pCLE9BQU8sU0FBUyxNQUFNLFNBQVMsUUFBUTtvQkFDdkMsT0FBTyxTQUFTLE1BQU0sYUFBYSxLQUFLLEdBQUcsY0FBYyxRQUFROzs7Z0JBR3JFLFNBQVMsWUFBWSxRQUFRLFVBQVUsZUFBZTtvQkFDbEQsSUFBSSxhQUFhO29CQUNqQixJQUFHLGVBQWU7d0JBQ2QsV0FBVyxnQkFBZ0I7O29CQUUvQixhQUFhLEtBQUssT0FBTyxVQUFVLFFBQVEsUUFBUTtvQkFDbkQsTUFBTSxJQUFJLFVBQVUsWUFBVyxTQUFPLFFBQVE7b0JBQzlDLGFBQWE7OztnQkFHakIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsU0FBUyxnQkFBZ0IsV0FBVyxhQUFhO29CQUN4RSxRQUFRO29CQUNSLGVBQWU7b0JBQ2YsbUJBQW1CO29CQUNuQixXQUFXLE1BQU0sV0FBVzs7O2dCQUdoQyxHQUFHLHNEQUFzRCxZQUFXO29CQUNoRSxZQUFZLEtBQUs7b0JBQ2pCLE9BQU8sVUFBVTs7O2dCQUdyQixHQUFHLDBDQUEwQyxZQUFXO29CQUNwRCxZQUFZLEtBQUs7b0JBQ2pCLE9BQU8sVUFBVSxJQUFJOzs7Z0JBR3pCLEdBQUcsc0VBQXNFLFlBQVc7b0JBQ2hGLFlBQVksS0FBSyxvQkFBb0IsQ0FBQztvQkFDdEMsT0FBTyxVQUFVLElBQUk7OztnQkFHekIsR0FBRyxvRkFBb0YsWUFBVztvQkFDOUYsWUFBWSxLQUFLLG9CQUFvQixDQUFDLEtBQUs7b0JBQzNDLE9BQU8sVUFBVSxJQUFJOzs7Z0JBR3pCLEdBQUcsb0ZBQW9GLFlBQVc7b0JBQzlGLFlBQVksS0FBSyxvQkFBb0IsQ0FBQyxLQUFLO29CQUMzQyxPQUFPLFVBQVU7OztnQkFHckIsR0FBRyxzRUFBc0UsWUFBVztvQkFDaEYsWUFBWSxLQUFLLG9CQUFvQixDQUFDO29CQUN0QyxPQUFPLFVBQVU7OztnQkFHckIsR0FBRyw4REFBOEQsWUFBVztvQkFDeEUsWUFBWSxLQUFLO29CQUNqQiw2QkFBNkI7OztnQkFHakMsR0FBRyw2REFBNkQsWUFBVztvQkFDdkUsWUFBWSxLQUFLO29CQUNqQiw2QkFBNkI7b0JBQzdCLE9BQU8sVUFBVSxxQkFBcUI7d0JBQ2xDLE1BQU07d0JBQ04sT0FBTzt3QkFDUCxjQUFjO3dCQUNkLFNBQVM7Ozs7Z0JBSWpCLEdBQUcseUZBQXlGLFlBQVc7b0JBQ25HLFlBQVksS0FBSztvQkFDakIsNkJBQTZCO29CQUM3QixPQUFPLFVBQVUscUJBQXFCO3dCQUNsQyxNQUFNO3dCQUNOLE9BQU87d0JBQ1AsY0FBYzt3QkFDZCxTQUFTOzs7O2dCQUlqQixTQUFTLGtCQUFrQixZQUFXO29CQUNsQyxJQUFJLGFBQWEsUUFBUTt3QkFDckIsV0FBVyxRQUFROztvQkFFdkIsR0FBRyxtREFBbUQsWUFBVzt3QkFDN0QsYUFBYSxLQUFLLE9BQU8sVUFBVSxRQUFRLEtBQUs7d0JBQ2hELE1BQU0sSUFBSSxVQUFVLEtBQUssWUFBWTt3QkFDckMsYUFBYTt3QkFDYixPQUFPLFlBQVksSUFBSTt3QkFDdkIsT0FBTyxVQUFVOzs7b0JBR3JCLEdBQUcsdURBQXVELFlBQVc7d0JBQ2pFLGFBQWEsS0FBSyxPQUFPLFVBQVUsUUFBUSxLQUFLO3dCQUNoRCxNQUFNLElBQUksVUFBVSxLQUFLLFlBQVk7d0JBQ3JDLGFBQWE7d0JBQ2IsT0FBTyxZQUFZLElBQUk7d0JBQ3ZCLE9BQU8sVUFBVTs7Ozs7O0dBVzFCIiwiZmlsZSI6ImNvbW1vbi9lcnJvci9IdHRwRXJyb3JTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGVycm9yTW9kdWxlIGZyb20gJ2NvbW1vbi9lcnJvci9FcnJvck1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBIdHRwRXJyb3JTZXJ2aWNlXG4gKi9cblxuZGVzY3JpYmUoJ0h0dHBFcnJvclNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgaHR0cEVycm9yU2VydmljZSxcbiAgICAgICAgJGh0dHAsXG4gICAgICAgICRodHRwQmFja2VuZCxcbiAgICAgICAgbW9kYWxTcHksXG4gICAgICAgIGR1bW15VXJsID0gJy9zb21lVXJsJyxcbiAgICAgICAgRVJST1JfNTAwX1JFU1BPTlNFID0ge21lc3NhZ2U6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InfSxcbiAgICAgICAgRVJST1JfNTAwX1FLX1JFU1BPTlNFID0ge21lc3NhZ2U6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLCBxdWlja0tleTogMTF9LFxuICAgICAgICBFUlJPUl80MDFfUkVTUE9OU0UgPSB7bWVzc2FnZTogJ1VuYXV0aG9yaXplZCd9LFxuICAgICAgICBFUlJPUl80MDRfUkVTUE9OU0UgPSB7bWVzc2FnZTogJ05vdCBGb3VuZCd9LFxuICAgICAgICBFUlJPUl80MDVfUkVTUE9OU0UgPSB7bWVzc2FnZTogJ01ldGhvZCBOb3QgQWxsb3dlZCd9O1xuXG4gICAgZnVuY3Rpb24gZXhwZWN0VG9IYXZlVXNlZFdhcm5pbmdMZXZlbCh3YXJuaW5nTGV2ZWwpIHtcbiAgICAgICAgZXhwZWN0KG1vZGFsU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdChtb2RhbFNweS5jYWxscy5jb3VudCgpKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QobW9kYWxTcHkuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0ud2FybmluZ0xldmVsKS50b0VxdWFsKHdhcm5pbmdMZXZlbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZVJlcXVlc3Qoc3RhdHVzLCByZXNwb25zZSwgaGFuZGxlZEVycm9ycykge1xuICAgICAgICB2YXIgaHR0cENvbmZpZyA9IHt9O1xuICAgICAgICBpZihoYW5kbGVkRXJyb3JzKSB7XG4gICAgICAgICAgICBodHRwQ29uZmlnLmhhbmRsZWRFcnJvcnMgPSBoYW5kbGVkRXJyb3JzO1xuICAgICAgICB9XG4gICAgICAgICRodHRwQmFja2VuZC53aGVuKCdHRVQnLCBkdW1teVVybCkucmVzcG9uZChzdGF0dXMsIHJlc3BvbnNlKTtcbiAgICAgICAgJGh0dHAuZ2V0KGR1bW15VXJsLCBodHRwQ29uZmlnKS5jYXRjaChhbmd1bGFyLm5vb3ApO1xuICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICB9XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShlcnJvck1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRodHRwXywgXyRodHRwQmFja2VuZF8sIF9zcE1vZGFsXywgX2h0dHBFcnJvcl8pIHtcbiAgICAgICAgJGh0dHAgPSBfJGh0dHBfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgaHR0cEVycm9yU2VydmljZSA9IF9odHRwRXJyb3JfO1xuICAgICAgICBtb2RhbFNweSA9IHNweU9uKF9zcE1vZGFsXywgJ29wZW4nKTtcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIGludGVyY2VwdCBlcnJvciByZXNwb25zZXMgYW5kIHNob3cgYSBkaWFsb2cnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFrZVJlcXVlc3QoNTAwLCBFUlJPUl81MDBfUkVTUE9OU0UpO1xuICAgICAgICBleHBlY3QobW9kYWxTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IGludGVyY2VwdCBzdWNjZXNzIHJlc3BvbnNlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYWtlUmVxdWVzdCgyMDAsIHt9KTtcbiAgICAgICAgZXhwZWN0KG1vZGFsU3B5KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgaW50ZXJjZXB0IGVycm9ycyB3aGVuIHRoZXkgYXJlIGluIHRoZSBoYW5kbGVkRXJyb3IgbGlzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYWtlUmVxdWVzdCg0MDEsIEVSUk9SXzQwMV9SRVNQT05TRSwgWzQwMV0pO1xuICAgICAgICBleHBlY3QobW9kYWxTcHkpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCBpbnRlcmNlcHQgZXJyb3JzIHdoZW4gdGhleSBvbmUgb2YgdGhlIGl0ZW1zIGluIHRoZSBoYW5kbGVkRXJyb3JzIGxpc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFrZVJlcXVlc3QoNDA0LCBFUlJPUl80MDRfUkVTUE9OU0UsIFs0MDEsIDQwNF0pO1xuICAgICAgICBleHBlY3QobW9kYWxTcHkpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGludGVyY2VwdCBlcnJvciB3aGVuIGl0IGlzIG5vdCBvbmUgb2YgdGhlIGl0ZW1zIGluIHRoZSBoYW5kbGVkRXJyb3JzIGxpc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFrZVJlcXVlc3QoNDA1LCBFUlJPUl80MDVfUkVTUE9OU0UsIFs0MDEsIDQwNF0pO1xuICAgICAgICBleHBlY3QobW9kYWxTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaW50ZXJjZXB0IGVycm9ycyB3aGVuIHRoZXkgYXJlIG5vdCBpbiB0aGUgaGFuZGxlZEVycm9yIGxpc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFrZVJlcXVlc3QoNTAwLCBFUlJPUl81MDBfUkVTUE9OU0UsIFs0MDFdKTtcbiAgICAgICAgZXhwZWN0KG1vZGFsU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGRpc3BsYXkgdGhlIHdhcm5pbmcgZGlhbG9nIGZvciBzdGF0dXNlcyBpbiB0aGUgNDAwcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYWtlUmVxdWVzdCg0MDQsIEVSUk9SXzQwNF9SRVNQT05TRSk7XG4gICAgICAgIGV4cGVjdFRvSGF2ZVVzZWRXYXJuaW5nTGV2ZWwoJ3dhcm5pbmcnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZGlzcGxheSB0aGUgc2V2ZXJlIGRpYWxvZyBmb3Igc3RhdHVzZXMgaW4gdGhlIDUwMHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFrZVJlcXVlc3QoNTAwLCBFUlJPUl81MDBfUkVTUE9OU0UpO1xuICAgICAgICBleHBlY3RUb0hhdmVVc2VkV2FybmluZ0xldmVsKCdkYW5nZXInKTtcbiAgICAgICAgZXhwZWN0KG1vZGFsU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgICB0eXBlOiAnYWxlcnQnLFxuICAgICAgICAgICAgdGl0bGU6ICd1aV9lcnJvcl9zZXZlcmVfdGl0bGUnLFxuICAgICAgICAgICAgd2FybmluZ0xldmVsOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICd1aV9lcnJfZmF0YWxfc3lzdGVtJ1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZGlzcGxheSB0aGUgc2V2ZXJlIGRpYWxvZyB3aXRoIHF1aWNra2V5IGZvciBzdGF0dXNlcyBpbiB0aGUgNTAwcyB3aXRoIHF1aWNra2V5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIG1ha2VSZXF1ZXN0KDUwMCwgRVJST1JfNTAwX1FLX1JFU1BPTlNFKTtcbiAgICAgICAgZXhwZWN0VG9IYXZlVXNlZFdhcm5pbmdMZXZlbCgnZGFuZ2VyJyk7XG4gICAgICAgIGV4cGVjdChtb2RhbFNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgICAgdHlwZTogJ2FsZXJ0JyxcbiAgICAgICAgICAgIHRpdGxlOiAndWlfZXJyb3Jfc2V2ZXJlX3RpdGxlJyxcbiAgICAgICAgICAgIHdhcm5pbmdMZXZlbDogJ2RhbmdlcicsXG4gICAgICAgICAgICBjb250ZW50OiAndWlfZXJyX2ZhdGFsX3N5c3RlbV9xaydcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FsbGJhY2sgdGVzdHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3NTcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLFxuICAgICAgICAgICAgZXJyb3JTcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aGUgZXJyb3IgY2FsbGJhY2sgd2hlbiBpbnRlcmNlcHRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLndoZW4oJ0dFVCcsIGR1bW15VXJsKS5yZXNwb25kKDUwMCwgRVJST1JfNTAwX1JFU1BPTlNFKTtcbiAgICAgICAgICAgICRodHRwLmdldChkdW1teVVybCkudGhlbihzdWNjZXNzU3B5LCBlcnJvclNweSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzdWNjZXNzU3B5KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGVycm9yU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aGUgZXJyb3IgY2FsbGJhY2sgd2hlbiBub3QgaW50ZXJjZXB0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC53aGVuKCdHRVQnLCBkdW1teVVybCkucmVzcG9uZCg1MDAsIEVSUk9SXzUwMF9SRVNQT05TRSk7XG4gICAgICAgICAgICAkaHR0cC5nZXQoZHVtbXlVcmwpLnRoZW4oc3VjY2Vzc1NweSwgZXJyb3JTcHkpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3VjY2Vzc1NweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChlcnJvclNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
