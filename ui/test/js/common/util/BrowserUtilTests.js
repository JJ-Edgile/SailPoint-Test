System.register(['test/js/TestInitializer', 'common/util/UtilModule'], function (_export) {
    'use strict';

    var utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }],
        execute: function () {

            describe('browserUtil', function () {

                var browserUtil, $window;
                var userAgents = {
                    windowsPhone: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0;)',
                    windows: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)',
                    iPad: 'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us)',
                    blackBerry: 'Mozilla/5.0 (BB10; Kbd) AppleWebKit/537.35+ (KHTML, like Gecko) ' + 'Version/10.2.1.1925 Mobile Safari/537.35+'
                };

                // Let the tests know we'll use the sailpoint module.
                beforeEach(module(utilModule));

                beforeEach(module(function ($provide) {
                    // Mock a $window service with just a navigator
                    $window = {
                        navigator: {
                            userAgent: null
                        },
                        innerWidth: 1024
                    };

                    // Provide the mock as the $window service
                    $provide.factory('$window', function () {
                        return $window;
                    });
                }));

                beforeEach(inject(function (_browserUtil_) {
                    browserUtil = _browserUtil_;
                }));

                var setUserAgent = function (newUserAgent) {
                    $window.navigator.userAgent = newUserAgent;
                };

                function setResolution(isMobile) {
                    $window.innerWidth = isMobile ? 767 : 1024;
                }

                describe('isIOS', function () {
                    it('should return true for iPad user string', function () {
                        setUserAgent(userAgents.iPad);
                        expect(browserUtil.isIOS()).toEqual(true);
                    });

                    it('should return false for Windows user string', function () {
                        setUserAgent(userAgents.windows);
                        expect(browserUtil.isIOS()).toEqual(false);
                    });

                    it('should return false for BlackBerry user string', function () {
                        setUserAgent(userAgents.blackBerry);
                        expect(browserUtil.isIOS()).toEqual(false);
                    });

                    it('should return false for windows phone user string', function () {
                        setUserAgent(userAgents.windowsPhone);
                        expect(browserUtil.isIOS()).toEqual(false);
                    });
                });

                describe('isBlackBerry', function () {
                    it('should return false for iPad user string', function () {
                        setUserAgent(userAgents.iPad);
                        expect(browserUtil.isBlackBerry()).toEqual(false);
                    });

                    it('should return false for Windows user string', function () {
                        setUserAgent(userAgents.windows);
                        expect(browserUtil.isBlackBerry()).toEqual(false);
                    });

                    it('should return true for BlackBerry user string', function () {
                        setUserAgent(userAgents.blackBerry);
                        expect(browserUtil.isBlackBerry()).toEqual(true);
                    });

                    it('should return false for windows phone user string', function () {
                        setUserAgent(userAgents.windowsPhone);
                        expect(browserUtil.isIOS()).toEqual(false);
                    });
                });

                describe('isWindowsPhone', function () {
                    it('should return false for iPad user string', function () {
                        setUserAgent(userAgents.iPad);
                        expect(browserUtil.isWindowsPhone()).toEqual(false);
                    });

                    it('should return false for Windows user string', function () {
                        setUserAgent(userAgents.windows);
                        expect(browserUtil.isWindowsPhone()).toEqual(false);
                    });

                    it('should return false for BlackBerry user string', function () {
                        setUserAgent(userAgents.blackBerry);
                        expect(browserUtil.isWindowsPhone()).toEqual(false);
                    });

                    it('should return true for windows phone user string', function () {
                        setUserAgent(userAgents.windowsPhone);
                        expect(browserUtil.isWindowsPhone()).toEqual(true);
                    });
                });

                describe('isXs()', function () {
                    it('returns false for a desktop width', function () {
                        setResolution(false);
                        expect(browserUtil.isXs()).toEqual(false);
                    });

                    it('returns true for a mobile width', function () {
                        setResolution(true);
                        expect(browserUtil.isXs()).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsL0Jyb3dzZXJVdGlsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7SUFDdEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjs7UUFFdkMsU0FBUyxZQUFZOztZQUw3QixTQUFTLGVBQWUsWUFBVzs7Z0JBRS9CLElBQUksYUFBYTtnQkFDakIsSUFBSSxhQUFhO29CQUNiLGNBQWM7b0JBQ2QsU0FBUztvQkFDVCxNQUFNO29CQUNOLFlBQVkscUVBQ0E7Ozs7Z0JBSWhCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVU7O29CQUVqQyxVQUFVO3dCQUNOLFdBQVc7NEJBQ1AsV0FBVzs7d0JBRWYsWUFBWTs7OztvQkFJaEIsU0FBUyxRQUFRLFdBQVcsWUFBVzt3QkFDbkMsT0FBTzs7OztnQkFJZixXQUFXLE9BQU8sVUFBUyxlQUFlO29CQUN0QyxjQUFjOzs7Z0JBR2xCLElBQUksZUFBZSxVQUFTLGNBQWM7b0JBQ3RDLFFBQVEsVUFBVSxZQUFZOzs7Z0JBR2xDLFNBQVMsY0FBYyxVQUFVO29CQUM3QixRQUFRLGFBQWEsV0FBYSxNQUFNOzs7Z0JBRzVDLFNBQVMsU0FBUyxZQUFXO29CQUN6QixHQUFHLDJDQUEyQyxZQUFXO3dCQUNyRCxhQUFhLFdBQVc7d0JBQ3hCLE9BQU8sWUFBWSxTQUFTLFFBQVE7OztvQkFHeEMsR0FBRywrQ0FBK0MsWUFBVzt3QkFDekQsYUFBYSxXQUFXO3dCQUN4QixPQUFPLFlBQVksU0FBUyxRQUFROzs7b0JBR3hDLEdBQUcsa0RBQWtELFlBQVc7d0JBQzVELGFBQWEsV0FBVzt3QkFDeEIsT0FBTyxZQUFZLFNBQVMsUUFBUTs7O29CQUd4QyxHQUFHLHFEQUFxRCxZQUFXO3dCQUMvRCxhQUFhLFdBQVc7d0JBQ3hCLE9BQU8sWUFBWSxTQUFTLFFBQVE7Ozs7Z0JBSTVDLFNBQVMsZ0JBQWdCLFlBQVc7b0JBQ2hDLEdBQUcsNENBQTRDLFlBQVc7d0JBQ3RELGFBQWEsV0FBVzt3QkFDeEIsT0FBTyxZQUFZLGdCQUFnQixRQUFROzs7b0JBRy9DLEdBQUcsK0NBQStDLFlBQVc7d0JBQ3pELGFBQWEsV0FBVzt3QkFDeEIsT0FBTyxZQUFZLGdCQUFnQixRQUFROzs7b0JBRy9DLEdBQUcsaURBQWlELFlBQVc7d0JBQzNELGFBQWEsV0FBVzt3QkFDeEIsT0FBTyxZQUFZLGdCQUFnQixRQUFROzs7b0JBRy9DLEdBQUcscURBQXFELFlBQVc7d0JBQy9ELGFBQWEsV0FBVzt3QkFDeEIsT0FBTyxZQUFZLFNBQVMsUUFBUTs7OztnQkFJNUMsU0FBUyxrQkFBa0IsWUFBVztvQkFDbEMsR0FBRyw0Q0FBNEMsWUFBVzt3QkFDdEQsYUFBYSxXQUFXO3dCQUN4QixPQUFPLFlBQVksa0JBQWtCLFFBQVE7OztvQkFHakQsR0FBRywrQ0FBK0MsWUFBVzt3QkFDekQsYUFBYSxXQUFXO3dCQUN4QixPQUFPLFlBQVksa0JBQWtCLFFBQVE7OztvQkFHakQsR0FBRyxrREFBa0QsWUFBVzt3QkFDNUQsYUFBYSxXQUFXO3dCQUN4QixPQUFPLFlBQVksa0JBQWtCLFFBQVE7OztvQkFHakQsR0FBRyxvREFBb0QsWUFBVzt3QkFDOUQsYUFBYSxXQUFXO3dCQUN4QixPQUFPLFlBQVksa0JBQWtCLFFBQVE7Ozs7Z0JBSXJELFNBQVMsVUFBVSxZQUFNO29CQUNyQixHQUFHLHFDQUFxQyxZQUFNO3dCQUMxQyxjQUFjO3dCQUNkLE9BQU8sWUFBWSxRQUFRLFFBQVE7OztvQkFHdkMsR0FBRyxtQ0FBbUMsWUFBTTt3QkFDeEMsY0FBYzt3QkFDZCxPQUFPLFlBQVksUUFBUSxRQUFROzs7Ozs7R0FZNUMiLCJmaWxlIjoiY29tbW9uL3V0aWwvQnJvd3NlclV0aWxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHV0aWxNb2R1bGUgZnJvbSAnY29tbW9uL3V0aWwvVXRpbE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdicm93c2VyVXRpbCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGJyb3dzZXJVdGlsLCAkd2luZG93O1xuICAgIHZhciB1c2VyQWdlbnRzID0ge1xuICAgICAgICB3aW5kb3dzUGhvbmU6ICdNb3ppbGxhLzUuMCAoY29tcGF0aWJsZTsgTVNJRSAxMC4wOyBXaW5kb3dzIFBob25lIDguMDsgVHJpZGVudC82LjA7IElFTW9iaWxlLzEwLjA7KScsXG4gICAgICAgIHdpbmRvd3M6ICdNb3ppbGxhLzUuMCAoY29tcGF0aWJsZTsgTVNJRSAxMC4wOyBXaW5kb3dzIE5UIDYuMjsgVHJpZGVudC82LjApJyxcbiAgICAgICAgaVBhZDogJ01vemlsbGEvNS4wIChpUGFkOyBVOyBDUFUgT1MgM18yIGxpa2UgTWFjIE9TIFg7IGVuLXVzKScsXG4gICAgICAgIGJsYWNrQmVycnk6ICdNb3ppbGxhLzUuMCAoQkIxMDsgS2JkKSBBcHBsZVdlYktpdC81MzcuMzUrIChLSFRNTCwgbGlrZSBHZWNrbykgJyArXG4gICAgICAgICAgICAgICAgICAgICdWZXJzaW9uLzEwLjIuMS4xOTI1IE1vYmlsZSBTYWZhcmkvNTM3LjM1KydcbiAgICB9O1xuXG4gICAgLy8gTGV0IHRoZSB0ZXN0cyBrbm93IHdlJ2xsIHVzZSB0aGUgc2FpbHBvaW50IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh1dGlsTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAvLyBNb2NrIGEgJHdpbmRvdyBzZXJ2aWNlIHdpdGgganVzdCBhIG5hdmlnYXRvclxuICAgICAgICAkd2luZG93ID0ge1xuICAgICAgICAgICAgbmF2aWdhdG9yOiB7XG4gICAgICAgICAgICAgICAgdXNlckFnZW50OiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5uZXJXaWR0aDogMTAyNFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFByb3ZpZGUgdGhlIG1vY2sgYXMgdGhlICR3aW5kb3cgc2VydmljZVxuICAgICAgICAkcHJvdmlkZS5mYWN0b3J5KCckd2luZG93JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJHdpbmRvdztcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2Jyb3dzZXJVdGlsXykge1xuICAgICAgICBicm93c2VyVXRpbCA9IF9icm93c2VyVXRpbF87XG4gICAgfSkpO1xuXG4gICAgdmFyIHNldFVzZXJBZ2VudCA9IGZ1bmN0aW9uKG5ld1VzZXJBZ2VudCkge1xuICAgICAgICAkd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQgPSBuZXdVc2VyQWdlbnQ7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldFJlc29sdXRpb24oaXNNb2JpbGUpIHtcbiAgICAgICAgJHdpbmRvdy5pbm5lcldpZHRoID0gKGlzTW9iaWxlKSA/IDc2NyA6IDEwMjQ7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2lzSU9TJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIGlQYWQgdXNlciBzdHJpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFVzZXJBZ2VudCh1c2VyQWdlbnRzLmlQYWQpO1xuICAgICAgICAgICAgZXhwZWN0KGJyb3dzZXJVdGlsLmlzSU9TKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZvciBXaW5kb3dzIHVzZXIgc3RyaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXRVc2VyQWdlbnQodXNlckFnZW50cy53aW5kb3dzKTtcbiAgICAgICAgICAgIGV4cGVjdChicm93c2VyVXRpbC5pc0lPUygpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgZm9yIEJsYWNrQmVycnkgdXNlciBzdHJpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFVzZXJBZ2VudCh1c2VyQWdlbnRzLmJsYWNrQmVycnkpO1xuICAgICAgICAgICAgZXhwZWN0KGJyb3dzZXJVdGlsLmlzSU9TKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3Igd2luZG93cyBwaG9uZSB1c2VyIHN0cmluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0VXNlckFnZW50KHVzZXJBZ2VudHMud2luZG93c1Bob25lKTtcbiAgICAgICAgICAgIGV4cGVjdChicm93c2VyVXRpbC5pc0lPUygpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNCbGFja0JlcnJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZvciBpUGFkIHVzZXIgc3RyaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXRVc2VyQWdlbnQodXNlckFnZW50cy5pUGFkKTtcbiAgICAgICAgICAgIGV4cGVjdChicm93c2VyVXRpbC5pc0JsYWNrQmVycnkoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZvciBXaW5kb3dzIHVzZXIgc3RyaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXRVc2VyQWdlbnQodXNlckFnZW50cy53aW5kb3dzKTtcbiAgICAgICAgICAgIGV4cGVjdChicm93c2VyVXRpbC5pc0JsYWNrQmVycnkoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIEJsYWNrQmVycnkgdXNlciBzdHJpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFVzZXJBZ2VudCh1c2VyQWdlbnRzLmJsYWNrQmVycnkpO1xuICAgICAgICAgICAgZXhwZWN0KGJyb3dzZXJVdGlsLmlzQmxhY2tCZXJyeSgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3Igd2luZG93cyBwaG9uZSB1c2VyIHN0cmluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0VXNlckFnZW50KHVzZXJBZ2VudHMud2luZG93c1Bob25lKTtcbiAgICAgICAgICAgIGV4cGVjdChicm93c2VyVXRpbC5pc0lPUygpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNXaW5kb3dzUGhvbmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgZm9yIGlQYWQgdXNlciBzdHJpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFVzZXJBZ2VudCh1c2VyQWdlbnRzLmlQYWQpO1xuICAgICAgICAgICAgZXhwZWN0KGJyb3dzZXJVdGlsLmlzV2luZG93c1Bob25lKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3IgV2luZG93cyB1c2VyIHN0cmluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0VXNlckFnZW50KHVzZXJBZ2VudHMud2luZG93cyk7XG4gICAgICAgICAgICBleHBlY3QoYnJvd3NlclV0aWwuaXNXaW5kb3dzUGhvbmUoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZvciBCbGFja0JlcnJ5IHVzZXIgc3RyaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXRVc2VyQWdlbnQodXNlckFnZW50cy5ibGFja0JlcnJ5KTtcbiAgICAgICAgICAgIGV4cGVjdChicm93c2VyVXRpbC5pc1dpbmRvd3NQaG9uZSgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3Igd2luZG93cyBwaG9uZSB1c2VyIHN0cmluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0VXNlckFnZW50KHVzZXJBZ2VudHMud2luZG93c1Bob25lKTtcbiAgICAgICAgICAgIGV4cGVjdChicm93c2VyVXRpbC5pc1dpbmRvd3NQaG9uZSgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1hzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBhIGRlc2t0b3Agd2lkdGgnLCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRSZXNvbHV0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgIGV4cGVjdChicm93c2VyVXRpbC5pc1hzKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciBhIG1vYmlsZSB3aWR0aCcsICgpID0+IHtcbiAgICAgICAgICAgIHNldFJlc29sdXRpb24odHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoYnJvd3NlclV0aWwuaXNYcygpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
