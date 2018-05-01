System.register(['shared/login'], function (_export) {
    'use strict';

    return {
        setters: [function (_sharedLogin) {}],
        execute: function () {

            //only testing for existence because these are shared files
            //do not copy these test for angular functions as these are atypical
            describe('Login Page Functions', function () {
                //check base object
                it('should add Login to the global namespace', function () {
                    expect(SailPoint).toBeDefined();
                    expect(SailPoint.Login).toBeDefined();
                });
                //check first function
                it('should add a submitenter function', function () {
                    expect(SailPoint.Login.submitenter).toBeDefined();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9sb2dpblRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLGlCQUFpQixVQUFVLFNBQVM7SUFDakQ7O0lBRUEsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLGNBQWM7UUFDbEMsU0FBUyxZQUFZOzs7O1lBRDdCLFNBQVMsd0JBQXdCLFlBQVc7O2dCQUV4QyxHQUFHLDRDQUE0QyxZQUFXO29CQUN0RCxPQUFPLFdBQVc7b0JBQ2xCLE9BQU8sVUFBVSxPQUFPOzs7Z0JBRzVCLEdBQUcscUNBQXFDLFlBQVc7b0JBQy9DLE9BQU8sVUFBVSxNQUFNLGFBQWE7Ozs7O0dBVXpDIiwiZmlsZSI6InNoYXJlZC9sb2dpblRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzaGFyZWQvbG9naW4nO1xuXG4vL29ubHkgdGVzdGluZyBmb3IgZXhpc3RlbmNlIGJlY2F1c2UgdGhlc2UgYXJlIHNoYXJlZCBmaWxlc1xuLy9kbyBub3QgY29weSB0aGVzZSB0ZXN0IGZvciBhbmd1bGFyIGZ1bmN0aW9ucyBhcyB0aGVzZSBhcmUgYXR5cGljYWxcbmRlc2NyaWJlKCdMb2dpbiBQYWdlIEZ1bmN0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgIC8vY2hlY2sgYmFzZSBvYmplY3RcbiAgICBpdCgnc2hvdWxkIGFkZCBMb2dpbiB0byB0aGUgZ2xvYmFsIG5hbWVzcGFjZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoU2FpbFBvaW50KS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3QoU2FpbFBvaW50LkxvZ2luKS50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuICAgIC8vY2hlY2sgZmlyc3QgZnVuY3Rpb25cbiAgICBpdCgnc2hvdWxkIGFkZCBhIHN1Ym1pdGVudGVyIGZ1bmN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChTYWlsUG9pbnQuTG9naW4uc3VibWl0ZW50ZXIpLnRvQmVEZWZpbmVkKCk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
