System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('ClickLinkDirective', function () {
                var button, $scope, $compile, $location;

                beforeEach(module(directiveModule));

                beforeEach(inject(function ($rootScope, _$compile_, _$location_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                    $location = _$location_;
                    spyOn($location, 'path').and.callFake(function () {
                        return null;
                    });
                }));

                var compileButton = function (markup, scope) {
                    var el = $compile(markup)(scope);
                    scope.$digest();
                    return el;
                };

                it('should call location.path while stripping hash', function () {
                    button = compileButton('<button sp-click-link="#/myApprovals">click me</button>', $scope);
                    button.click();
                    expect($location.path).toHaveBeenCalledWith('/myApprovals');
                });

                it('should call location.path with no changes', function () {
                    button = compileButton('<button sp-click-link="/myApprovals">click me</button>', $scope);
                    button.click();
                    expect($location.path).toHaveBeenCalledWith('/myApprovals');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvQ2xpY2tMaW5rRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxVQUFVLFNBQVM7SUFDaEc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixrQkFBa0IsZ0NBQWdDOztRQUV0RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsc0JBQXNCLFlBQVc7Z0JBQ3RDLElBQUksUUFBUSxRQUFRLFVBQVU7O2dCQUU5QixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxZQUFZLFlBQVksYUFBYTtvQkFDNUQsU0FBUyxXQUFXO29CQUNwQixXQUFXO29CQUNYLFlBQVk7b0JBQ1osTUFBTSxXQUFXLFFBQVEsSUFBSSxTQUFTLFlBQVc7d0JBQzdDLE9BQU87Ozs7Z0JBSWYsSUFBSSxnQkFBZ0IsVUFBUyxRQUFRLE9BQU87b0JBQ3hDLElBQUksS0FBSyxTQUFTLFFBQVE7b0JBQzFCLE1BQU07b0JBQ04sT0FBTzs7O2dCQUdYLEdBQUcsa0RBQWtELFlBQVc7b0JBQzVELFNBQVMsY0FBYywyREFBMkQ7b0JBQ2xGLE9BQU87b0JBQ1AsT0FBTyxVQUFVLE1BQU0scUJBQXFCOzs7Z0JBR2hELEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELFNBQVMsY0FBYywwREFBMEQ7b0JBQ2pGLE9BQU87b0JBQ1AsT0FBTyxVQUFVLE1BQU0scUJBQXFCOzs7OztHQVlqRCIsImZpbGUiOiJjb21tb24vZGlyZWN0aXZlL0NsaWNrTGlua0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGlyZWN0aXZlTW9kdWxlIGZyb20gJ2NvbW1vbi9kaXJlY3RpdmUvRGlyZWN0aXZlTW9kdWxlJztcblxuZGVzY3JpYmUoJ0NsaWNrTGlua0RpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBidXR0b24sICRzY29wZSwgJGNvbXBpbGUsICRsb2NhdGlvbjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgXyRjb21waWxlXywgXyRsb2NhdGlvbl8pIHtcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJGxvY2F0aW9uID0gXyRsb2NhdGlvbl87XG4gICAgICAgIHNweU9uKCRsb2NhdGlvbiwgJ3BhdGgnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgdmFyIGNvbXBpbGVCdXR0b24gPSBmdW5jdGlvbihtYXJrdXAsIHNjb3BlKSB7XG4gICAgICAgIHZhciBlbCA9ICRjb21waWxlKG1hcmt1cCkoc2NvcGUpO1xuICAgICAgICBzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9O1xuXG4gICAgaXQoJ3Nob3VsZCBjYWxsIGxvY2F0aW9uLnBhdGggd2hpbGUgc3RyaXBwaW5nIGhhc2gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYnV0dG9uID0gY29tcGlsZUJ1dHRvbignPGJ1dHRvbiBzcC1jbGljay1saW5rPVwiIy9teUFwcHJvdmFsc1wiPmNsaWNrIG1lPC9idXR0b24+JywgJHNjb3BlKTtcbiAgICAgICAgYnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIGV4cGVjdCgkbG9jYXRpb24ucGF0aCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJy9teUFwcHJvdmFscycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjYWxsIGxvY2F0aW9uLnBhdGggd2l0aCBubyBjaGFuZ2VzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGJ1dHRvbiA9IGNvbXBpbGVCdXR0b24oJzxidXR0b24gc3AtY2xpY2stbGluaz1cIi9teUFwcHJvdmFsc1wiPmNsaWNrIG1lPC9idXR0b24+JywgJHNjb3BlKTtcbiAgICAgICAgYnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIGV4cGVjdCgkbG9jYXRpb24ucGF0aCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJy9teUFwcHJvdmFscycpO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
