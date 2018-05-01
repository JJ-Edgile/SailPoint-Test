System.register(['shared/timeZone'], function (_export) {
    'use strict';

    return {
        setters: [function (_sharedTimeZone) {}],
        execute: function () {

            //only testing for existence because these are shared files
            //do not copy these test for angular functions as these are atypical
            describe('Time zone Functions', function () {
                //check base object
                it('should add Login to the global namespace', function () {
                    expect(SailPoint).toBeDefined();
                    expect(SailPoint.TimeZone).toBeDefined();
                });
                //check first function
                it('should add a getTimezone function', function () {
                    expect(SailPoint.TimeZone.getTimeZone).toBeDefined();
                });
                //check second function
                it('should add a getDSTChange function', function () {
                    expect(SailPoint.TimeZone.getNextDSTChange).toBeDefined();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC90aW1lWm9uZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLG9CQUFvQixVQUFVLFNBQVM7SUFDcEQ7O0lBRUEsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLGlCQUFpQjtRQUNyQyxTQUFTLFlBQVk7Ozs7WUFEN0IsU0FBUyx1QkFBdUIsWUFBVzs7Z0JBRXZDLEdBQUcsNENBQTRDLFlBQVc7b0JBQ3RELE9BQU8sV0FBVztvQkFDbEIsT0FBTyxVQUFVLFVBQVU7OztnQkFHL0IsR0FBRyxxQ0FBcUMsWUFBVztvQkFDL0MsT0FBTyxVQUFVLFNBQVMsYUFBYTs7O2dCQUczQyxHQUFHLHNDQUFzQyxZQUFXO29CQUNoRCxPQUFPLFVBQVUsU0FBUyxrQkFBa0I7Ozs7O0dBVWpEIiwiZmlsZSI6InNoYXJlZC90aW1lWm9uZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzaGFyZWQvdGltZVpvbmUnO1xuXG4vL29ubHkgdGVzdGluZyBmb3IgZXhpc3RlbmNlIGJlY2F1c2UgdGhlc2UgYXJlIHNoYXJlZCBmaWxlc1xuLy9kbyBub3QgY29weSB0aGVzZSB0ZXN0IGZvciBhbmd1bGFyIGZ1bmN0aW9ucyBhcyB0aGVzZSBhcmUgYXR5cGljYWxcbmRlc2NyaWJlKCdUaW1lIHpvbmUgRnVuY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgLy9jaGVjayBiYXNlIG9iamVjdFxuICAgIGl0KCdzaG91bGQgYWRkIExvZ2luIHRvIHRoZSBnbG9iYWwgbmFtZXNwYWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChTYWlsUG9pbnQpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChTYWlsUG9pbnQuVGltZVpvbmUpLnRvQmVEZWZpbmVkKCk7XG4gICAgfSk7XG4gICAgLy9jaGVjayBmaXJzdCBmdW5jdGlvblxuICAgIGl0KCdzaG91bGQgYWRkIGEgZ2V0VGltZXpvbmUgZnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KFNhaWxQb2ludC5UaW1lWm9uZS5nZXRUaW1lWm9uZSkudG9CZURlZmluZWQoKTtcbiAgICB9KTtcbiAgICAvL2NoZWNrIHNlY29uZCBmdW5jdGlvblxuICAgIGl0KCdzaG91bGQgYWRkIGEgZ2V0RFNUQ2hhbmdlIGZ1bmN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChTYWlsUG9pbnQuVGltZVpvbmUuZ2V0TmV4dERTVENoYW5nZSkudG9CZURlZmluZWQoKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
