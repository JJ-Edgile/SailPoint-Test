System.register(['test/js/TestInitializer', 'common/http/HttpModule'], function (_export) {
    'use strict';

    var httpModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonHttpHttpModule) {
            httpModule = _commonHttpHttpModule['default'];
        }],
        execute: function () {

            describe('TemplateCacheBusterInterceptor', function () {

                var revision = 'busted!',
                    url = 'somepath/sometemplate.html',
                    templateCacheBusterInterceptor,
                    SailPoint,
                    config;

                beforeEach(module(httpModule));

                beforeEach(module(function ($provide) {
                    SailPoint = {
                        REVISION: revision
                    };
                    $provide.constant('SailPoint', SailPoint);
                }));

                beforeEach(inject(function (_templateCacheBusterInterceptor_) {
                    templateCacheBusterInterceptor = _templateCacheBusterInterceptor_;

                    config = {
                        method: 'GET',
                        url: url
                    };
                }));

                it('does nothing if there is no SailPoint.REVISION', function () {
                    delete SailPoint.REVISION;
                    config = templateCacheBusterInterceptor.request(config);
                    expect(config.url).toEqual(url);
                });

                it('does nothing for a non-GET request', function () {
                    config.method = 'POST';
                    config = templateCacheBusterInterceptor.request(config);
                    expect(config.url).toEqual(url);
                });

                it('does nothing for a non-HTML request', function () {
                    var jsfUrl = 'somejsfpage.jsf';
                    config.url = jsfUrl;
                    config = templateCacheBusterInterceptor.request(config);
                    expect(config.url).toEqual(jsfUrl);
                });

                it('appends the revision to url for a template request', function () {
                    config = templateCacheBusterInterceptor.request(config);
                    expect(config.url).toEqual(url + '?' + revision);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9odHRwL1RlbXBsYXRlQ2FjaGVCdXN0ZXJJbnRlcmNlcHRvclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsVUFBVSxTQUFTO0lBQTFGOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7O1FBRXZDLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyxrQ0FBa0MsWUFBVzs7Z0JBRWxELElBQUksV0FBVztvQkFDWCxNQUFNO29CQUNOO29CQUFnQztvQkFBVzs7Z0JBRS9DLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFlBQVk7d0JBQ1IsVUFBVTs7b0JBRWQsU0FBUyxTQUFTLGFBQWE7OztnQkFHbkMsV0FBVyxPQUFPLFVBQVMsa0NBQWtDO29CQUN6RCxpQ0FBaUM7O29CQUVqQyxTQUFTO3dCQUNMLFFBQVE7d0JBQ1IsS0FBSzs7OztnQkFJYixHQUFHLGtEQUFrRCxZQUFXO29CQUM1RCxPQUFPLFVBQVU7b0JBQ2pCLFNBQVMsK0JBQStCLFFBQVE7b0JBQ2hELE9BQU8sT0FBTyxLQUFLLFFBQVE7OztnQkFHL0IsR0FBRyxzQ0FBc0MsWUFBVztvQkFDaEQsT0FBTyxTQUFTO29CQUNoQixTQUFTLCtCQUErQixRQUFRO29CQUNoRCxPQUFPLE9BQU8sS0FBSyxRQUFROzs7Z0JBRy9CLEdBQUcsdUNBQXVDLFlBQVc7b0JBQ2pELElBQUksU0FBUztvQkFDYixPQUFPLE1BQU07b0JBQ2IsU0FBUywrQkFBK0IsUUFBUTtvQkFDaEQsT0FBTyxPQUFPLEtBQUssUUFBUTs7O2dCQUcvQixHQUFHLHNEQUFzRCxZQUFXO29CQUNoRSxTQUFTLCtCQUErQixRQUFRO29CQUNoRCxPQUFPLE9BQU8sS0FBSyxRQUFRLE1BQU0sTUFBTTs7Ozs7R0FZNUMiLCJmaWxlIjoiY29tbW9uL2h0dHAvVGVtcGxhdGVDYWNoZUJ1c3RlckludGVyY2VwdG9yVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGh0dHBNb2R1bGUgZnJvbSAnY29tbW9uL2h0dHAvSHR0cE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnVGVtcGxhdGVDYWNoZUJ1c3RlckludGVyY2VwdG9yJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIHJldmlzaW9uID0gJ2J1c3RlZCEnLFxyXG4gICAgICAgIHVybCA9ICdzb21lcGF0aC9zb21ldGVtcGxhdGUuaHRtbCcsXHJcbiAgICAgICAgdGVtcGxhdGVDYWNoZUJ1c3RlckludGVyY2VwdG9yLCBTYWlsUG9pbnQsIGNvbmZpZztcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShodHRwTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcclxuICAgICAgICBTYWlsUG9pbnQgPSB7XHJcbiAgICAgICAgICAgIFJFVklTSU9OOiByZXZpc2lvblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NhaWxQb2ludCcsIFNhaWxQb2ludCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3RlbXBsYXRlQ2FjaGVCdXN0ZXJJbnRlcmNlcHRvcl8pIHtcclxuICAgICAgICB0ZW1wbGF0ZUNhY2hlQnVzdGVySW50ZXJjZXB0b3IgPSBfdGVtcGxhdGVDYWNoZUJ1c3RlckludGVyY2VwdG9yXztcclxuXHJcbiAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICB1cmw6IHVybFxyXG4gICAgICAgIH07XHJcbiAgICB9KSk7XHJcblxyXG4gICAgaXQoJ2RvZXMgbm90aGluZyBpZiB0aGVyZSBpcyBubyBTYWlsUG9pbnQuUkVWSVNJT04nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBkZWxldGUgU2FpbFBvaW50LlJFVklTSU9OO1xyXG4gICAgICAgIGNvbmZpZyA9IHRlbXBsYXRlQ2FjaGVCdXN0ZXJJbnRlcmNlcHRvci5yZXF1ZXN0KGNvbmZpZyk7XHJcbiAgICAgICAgZXhwZWN0KGNvbmZpZy51cmwpLnRvRXF1YWwodXJsKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkb2VzIG5vdGhpbmcgZm9yIGEgbm9uLUdFVCByZXF1ZXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uZmlnLm1ldGhvZCA9ICdQT1NUJztcclxuICAgICAgICBjb25maWcgPSB0ZW1wbGF0ZUNhY2hlQnVzdGVySW50ZXJjZXB0b3IucmVxdWVzdChjb25maWcpO1xyXG4gICAgICAgIGV4cGVjdChjb25maWcudXJsKS50b0VxdWFsKHVybCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZG9lcyBub3RoaW5nIGZvciBhIG5vbi1IVE1MIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIganNmVXJsID0gJ3NvbWVqc2ZwYWdlLmpzZic7XHJcbiAgICAgICAgY29uZmlnLnVybCA9IGpzZlVybDtcclxuICAgICAgICBjb25maWcgPSB0ZW1wbGF0ZUNhY2hlQnVzdGVySW50ZXJjZXB0b3IucmVxdWVzdChjb25maWcpO1xyXG4gICAgICAgIGV4cGVjdChjb25maWcudXJsKS50b0VxdWFsKGpzZlVybCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnYXBwZW5kcyB0aGUgcmV2aXNpb24gdG8gdXJsIGZvciBhIHRlbXBsYXRlIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25maWcgPSB0ZW1wbGF0ZUNhY2hlQnVzdGVySW50ZXJjZXB0b3IucmVxdWVzdChjb25maWcpO1xyXG4gICAgICAgIGV4cGVjdChjb25maWcudXJsKS50b0VxdWFsKHVybCArICc/JyArIHJldmlzaW9uKTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
