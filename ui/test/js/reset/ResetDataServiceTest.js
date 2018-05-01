System.register(['test/js/TestInitializer', 'reset/ResetAppModule'], function (_export) {
    /* (c) Copyright 2014 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Project: identityiq
     * Author: michael.hide
     * Created: 2/18/14 4:09 PM
     */
    'use strict';

    var resetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_resetResetAppModule) {
            resetModule = _resetResetAppModule['default'];
        }],
        execute: function () {
            describe('resetDataService', function () {

                var location, resetDataService;

                beforeEach(module(resetModule));

                var injectServices = function injectServices(config) {
                    // Mock up $location
                    inject(function ($location) {
                        location = $location;
                        spyOn(location, 'search').and.returnValue(config);
                    });
                    inject(function (_resetDataService_) {
                        resetDataService = _resetDataService_;
                    });
                };

                describe('constructor with query params', function () {

                    it('should initialize with search string values', function () {

                        injectServices({
                            origin: 'mobileUIReset',
                            accountId: 'james.smith',
                            action: 'accountUnlock'
                        });

                        expect(resetDataService.origin).toEqual('mobileUIReset');
                        expect(resetDataService.accountId).toEqual('james.smith');
                        expect(resetDataService.action).toEqual('accountUnlock');
                        expect(resetDataService.smsStatus.show).toEqual(false);
                        expect(resetDataService.smsStatus.hasError).toEqual(false);
                        expect(resetDataService.smsStatus.text).toEqual('');

                        expect(location.search).toHaveBeenCalled();
                    });
                });

                describe('constructor without query params', function () {

                    it('should initialize with default values', function () {

                        injectServices({});

                        expect(resetDataService.origin).toEqual('desktopUIReset');
                        expect(resetDataService.accountId).toEqual('');
                        expect(resetDataService.action).toEqual('passwordReset');
                        expect(resetDataService.smsStatus.show).toEqual(false);
                        expect(resetDataService.smsStatus.hasError).toEqual(false);
                        expect(resetDataService.smsStatus.text).toEqual('');

                        expect(location.search).toHaveBeenCalled();
                    });
                });

                describe('constructor with other query params', function () {

                    it('should only initialize defined properties', function () {

                        injectServices({
                            bogus: 'ShouldNotBeSetAnyWhere',
                            origin: 'SomeRandomValueThatIsNotValidButIsStillSet',
                            accountId: 'James%20Smith',
                            action: ''
                        });

                        expect(resetDataService.bogus).toBeUndefined();
                        expect(resetDataService.origin).toEqual('SomeRandomValueThatIsNotValidButIsStillSet');
                        expect(resetDataService.accountId).toEqual('James Smith');
                        expect(resetDataService.action).toEqual('passwordReset');

                        resetDataService.smsStatus.hasError = false;
                        resetDataService.smsStatus.text = 'SMS sent today.';

                        expect(resetDataService.smsStatus.hasError).toEqual(false);
                        expect(resetDataService.smsStatus.text).toEqual('SMS sent today.');

                        expect(location.search).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2V0L1Jlc2V0RGF0YVNlcnZpY2VUZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5QkFBeUIsVUFBVSxTQUFTOzs7Ozs7OztJQUN4Rjs7SUFTSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsc0JBQXNCO1lBQzVFLGNBQWMscUJBQXFCOztRQUV2QyxTQUFTLFlBQVk7WUFKN0IsU0FBUyxvQkFBb0IsWUFBVzs7Z0JBRXBDLElBQUksVUFDQTs7Z0JBRUosV0FBVyxPQUFPOztnQkFFbEIsSUFBSSxpQkFBaUIsU0FBUyxlQUFlLFFBQVE7O29CQUVqRCxPQUFPLFVBQVMsV0FBVzt3QkFDdkIsV0FBVzt3QkFDWCxNQUFNLFVBQVUsVUFBVSxJQUFJLFlBQVk7O29CQUU5QyxPQUFPLFVBQVMsb0JBQW9CO3dCQUNoQyxtQkFBbUI7Ozs7Z0JBSTNCLFNBQVMsaUNBQWlDLFlBQVc7O29CQUVqRCxHQUFHLCtDQUErQyxZQUFXOzt3QkFFekQsZUFBZTs0QkFDWCxRQUFROzRCQUNSLFdBQVc7NEJBQ1gsUUFBUTs7O3dCQUdaLE9BQU8saUJBQWlCLFFBQVEsUUFBUTt3QkFDeEMsT0FBTyxpQkFBaUIsV0FBVyxRQUFRO3dCQUMzQyxPQUFPLGlCQUFpQixRQUFRLFFBQVE7d0JBQ3hDLE9BQU8saUJBQWlCLFVBQVUsTUFBTSxRQUFRO3dCQUNoRCxPQUFPLGlCQUFpQixVQUFVLFVBQVUsUUFBUTt3QkFDcEQsT0FBTyxpQkFBaUIsVUFBVSxNQUFNLFFBQVE7O3dCQUVoRCxPQUFPLFNBQVMsUUFBUTs7OztnQkFLaEMsU0FBUyxvQ0FBb0MsWUFBVzs7b0JBRXBELEdBQUcseUNBQXlDLFlBQVc7O3dCQUVuRCxlQUFlOzt3QkFFZixPQUFPLGlCQUFpQixRQUFRLFFBQVE7d0JBQ3hDLE9BQU8saUJBQWlCLFdBQVcsUUFBUTt3QkFDM0MsT0FBTyxpQkFBaUIsUUFBUSxRQUFRO3dCQUN4QyxPQUFPLGlCQUFpQixVQUFVLE1BQU0sUUFBUTt3QkFDaEQsT0FBTyxpQkFBaUIsVUFBVSxVQUFVLFFBQVE7d0JBQ3BELE9BQU8saUJBQWlCLFVBQVUsTUFBTSxRQUFROzt3QkFFaEQsT0FBTyxTQUFTLFFBQVE7Ozs7Z0JBS2hDLFNBQVMsdUNBQXVDLFlBQVc7O29CQUV2RCxHQUFHLDZDQUE2QyxZQUFXOzt3QkFFdkQsZUFBZTs0QkFDWCxPQUFPOzRCQUNQLFFBQVE7NEJBQ1IsV0FBVzs0QkFDWCxRQUFROzs7d0JBR1osT0FBTyxpQkFBaUIsT0FBTzt3QkFDL0IsT0FBTyxpQkFBaUIsUUFBUSxRQUFRO3dCQUN4QyxPQUFPLGlCQUFpQixXQUFXLFFBQVE7d0JBQzNDLE9BQU8saUJBQWlCLFFBQVEsUUFBUTs7d0JBRXhDLGlCQUFpQixVQUFVLFdBQVc7d0JBQ3RDLGlCQUFpQixVQUFVLE9BQU87O3dCQUVsQyxPQUFPLGlCQUFpQixVQUFVLFVBQVUsUUFBUTt3QkFDcEQsT0FBTyxpQkFBaUIsVUFBVSxNQUFNLFFBQVE7O3dCQUVoRCxPQUFPLFNBQVMsUUFBUTs7Ozs7O0dBUWpDIiwiZmlsZSI6InJlc2V0L1Jlc2V0RGF0YVNlcnZpY2VUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE0IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgcmVzZXRNb2R1bGUgZnJvbSAncmVzZXQvUmVzZXRBcHBNb2R1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFByb2plY3Q6IGlkZW50aXR5aXFcclxuICogQXV0aG9yOiBtaWNoYWVsLmhpZGVcclxuICogQ3JlYXRlZDogMi8xOC8xNCA0OjA5IFBNXHJcbiAqL1xyXG5kZXNjcmliZSgncmVzZXREYXRhU2VydmljZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBsb2NhdGlvbixcclxuICAgICAgICByZXNldERhdGFTZXJ2aWNlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlc2V0TW9kdWxlKSk7XHJcblxyXG4gICAgdmFyIGluamVjdFNlcnZpY2VzID0gZnVuY3Rpb24gaW5qZWN0U2VydmljZXMoY29uZmlnKSB7XHJcbiAgICAgICAgLy8gTW9jayB1cCAkbG9jYXRpb25cclxuICAgICAgICBpbmplY3QoZnVuY3Rpb24oJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uID0gJGxvY2F0aW9uO1xyXG4gICAgICAgICAgICBzcHlPbihsb2NhdGlvbiwgJ3NlYXJjaCcpLmFuZC5yZXR1cm5WYWx1ZShjb25maWcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGluamVjdChmdW5jdGlvbihfcmVzZXREYXRhU2VydmljZV8pIHtcclxuICAgICAgICAgICAgcmVzZXREYXRhU2VydmljZSA9IF9yZXNldERhdGFTZXJ2aWNlXztcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yIHdpdGggcXVlcnkgcGFyYW1zJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIHNlYXJjaCBzdHJpbmcgdmFsdWVzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpbmplY3RTZXJ2aWNlcyh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW46ICdtb2JpbGVVSVJlc2V0JyxcclxuICAgICAgICAgICAgICAgIGFjY291bnRJZDogJ2phbWVzLnNtaXRoJyxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogJ2FjY291bnRVbmxvY2snXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHJlc2V0RGF0YVNlcnZpY2Uub3JpZ2luKS50b0VxdWFsKCdtb2JpbGVVSVJlc2V0Jyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXNldERhdGFTZXJ2aWNlLmFjY291bnRJZCkudG9FcXVhbCgnamFtZXMuc21pdGgnKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc2V0RGF0YVNlcnZpY2UuYWN0aW9uKS50b0VxdWFsKCdhY2NvdW50VW5sb2NrJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXNldERhdGFTZXJ2aWNlLnNtc1N0YXR1cy5zaG93KS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc2V0RGF0YVNlcnZpY2Uuc21zU3RhdHVzLmhhc0Vycm9yKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc2V0RGF0YVNlcnZpY2Uuc21zU3RhdHVzLnRleHQpLnRvRXF1YWwoJycpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGxvY2F0aW9uLnNlYXJjaCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvciB3aXRob3V0IHF1ZXJ5IHBhcmFtcycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2l0aCBkZWZhdWx0IHZhbHVlcycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaW5qZWN0U2VydmljZXMoe30pO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHJlc2V0RGF0YVNlcnZpY2Uub3JpZ2luKS50b0VxdWFsKCdkZXNrdG9wVUlSZXNldCcpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzZXREYXRhU2VydmljZS5hY2NvdW50SWQpLnRvRXF1YWwoJycpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzZXREYXRhU2VydmljZS5hY3Rpb24pLnRvRXF1YWwoJ3Bhc3N3b3JkUmVzZXQnKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc2V0RGF0YVNlcnZpY2Uuc21zU3RhdHVzLnNob3cpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzZXREYXRhU2VydmljZS5zbXNTdGF0dXMuaGFzRXJyb3IpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzZXREYXRhU2VydmljZS5zbXNTdGF0dXMudGV4dCkudG9FcXVhbCgnJyk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QobG9jYXRpb24uc2VhcmNoKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yIHdpdGggb3RoZXIgcXVlcnkgcGFyYW1zJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgb25seSBpbml0aWFsaXplIGRlZmluZWQgcHJvcGVydGllcycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaW5qZWN0U2VydmljZXMoe1xyXG4gICAgICAgICAgICAgICAgYm9ndXM6ICdTaG91bGROb3RCZVNldEFueVdoZXJlJyxcclxuICAgICAgICAgICAgICAgIG9yaWdpbjogJ1NvbWVSYW5kb21WYWx1ZVRoYXRJc05vdFZhbGlkQnV0SXNTdGlsbFNldCcsXHJcbiAgICAgICAgICAgICAgICBhY2NvdW50SWQ6ICdKYW1lcyUyMFNtaXRoJyxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogJydcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QocmVzZXREYXRhU2VydmljZS5ib2d1cykudG9CZVVuZGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzZXREYXRhU2VydmljZS5vcmlnaW4pLnRvRXF1YWwoJ1NvbWVSYW5kb21WYWx1ZVRoYXRJc05vdFZhbGlkQnV0SXNTdGlsbFNldCcpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzZXREYXRhU2VydmljZS5hY2NvdW50SWQpLnRvRXF1YWwoJ0phbWVzIFNtaXRoJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXNldERhdGFTZXJ2aWNlLmFjdGlvbikudG9FcXVhbCgncGFzc3dvcmRSZXNldCcpO1xyXG5cclxuICAgICAgICAgICAgcmVzZXREYXRhU2VydmljZS5zbXNTdGF0dXMuaGFzRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmVzZXREYXRhU2VydmljZS5zbXNTdGF0dXMudGV4dCA9ICdTTVMgc2VudCB0b2RheS4nO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHJlc2V0RGF0YVNlcnZpY2Uuc21zU3RhdHVzLmhhc0Vycm9yKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc2V0RGF0YVNlcnZpY2Uuc21zU3RhdHVzLnRleHQpLnRvRXF1YWwoJ1NNUyBzZW50IHRvZGF5LicpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGxvY2F0aW9uLnNlYXJjaCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
