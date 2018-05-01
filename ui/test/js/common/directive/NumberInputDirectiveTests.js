System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('NumberInputDirective', function () {
                var elementDefinition = '<input sp-number-input="" type="text" ng-model="ngModel"/>',
                    $scope,
                    $compile;

                beforeEach(module(directiveModule));

                beforeEach(inject(function ($rootScope, _$compile_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                }));

                function createElement() {
                    var element = angular.element(elementDefinition);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                it('strips non numerical chars from value', function () {
                    var element = createElement();
                    element.val('12abc~!@#$%^&*ABC()"\'><?_=[]{}\/\\3').trigger('input');
                    $scope.$digest();
                    expect(element.val()).toEqual('123');
                });

                it('strips spaces value', function () {
                    var element = createElement();
                    element.val('1 2 3 4').trigger('input');
                    $scope.$digest();
                    expect(element.val()).toEqual('1234');
                });

                it('allows decimal points', function () {
                    var element = createElement();
                    element.val('123.44').trigger('input');
                    $scope.$digest();
                    expect(element.val()).toEqual('123.44');
                });

                it('allows commas', function () {
                    var element = createElement();
                    element.val('123,456').trigger('input');
                    $scope.$digest();
                    expect(element.val()).toEqual('123,456');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvTnVtYmVySW5wdXREaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLFVBQVUsU0FBUzs7SUFDcEc7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixrQkFBa0IsZ0NBQWdDOztRQUV0RCxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsd0JBQXdCLFlBQVc7Z0JBQ3hDLElBQUksb0JBQW9CO29CQUNwQjtvQkFBUTs7Z0JBRVosV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxZQUFZO29CQUMvQyxTQUFTLFdBQVc7b0JBQ3BCLFdBQVc7OztnQkFHZixTQUFTLGdCQUFnQjtvQkFDckIsSUFBSSxVQUFVLFFBQVEsUUFBUTtvQkFDOUIsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87OztnQkFHWCxHQUFHLHlDQUF5QyxZQUFXO29CQUNuRCxJQUFJLFVBQVU7b0JBQ2QsUUFBUSxJQUFJLHdDQUF3QyxRQUFRO29CQUM1RCxPQUFPO29CQUNQLE9BQU8sUUFBUSxPQUFPLFFBQVE7OztnQkFHbEMsR0FBRyx1QkFBdUIsWUFBVztvQkFDakMsSUFBSSxVQUFVO29CQUNkLFFBQVEsSUFBSSxXQUFXLFFBQVE7b0JBQy9CLE9BQU87b0JBQ1AsT0FBTyxRQUFRLE9BQU8sUUFBUTs7O2dCQUdsQyxHQUFHLHlCQUF5QixZQUFXO29CQUNuQyxJQUFJLFVBQVU7b0JBQ2QsUUFBUSxJQUFJLFVBQVUsUUFBUTtvQkFDOUIsT0FBTztvQkFDUCxPQUFPLFFBQVEsT0FBTyxRQUFROzs7Z0JBR2xDLEdBQUcsaUJBQWlCLFlBQVc7b0JBQzNCLElBQUksVUFBVTtvQkFDZCxRQUFRLElBQUksV0FBVyxRQUFRO29CQUMvQixPQUFPO29CQUNQLE9BQU8sUUFBUSxPQUFPLFFBQVE7Ozs7O0dBV25DIiwiZmlsZSI6ImNvbW1vbi9kaXJlY3RpdmUvTnVtYmVySW5wdXREaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNSBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBkaXJlY3RpdmVNb2R1bGUgZnJvbSAnY29tbW9uL2RpcmVjdGl2ZS9EaXJlY3RpdmVNb2R1bGUnO1xuXG5kZXNjcmliZSgnTnVtYmVySW5wdXREaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWxlbWVudERlZmluaXRpb24gPSAnPGlucHV0IHNwLW51bWJlci1pbnB1dD1cIlwiIHR5cGU9XCJ0ZXh0XCIgbmctbW9kZWw9XCJuZ01vZGVsXCIvPicsXG4gICAgICAgICRzY29wZSwgJGNvbXBpbGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShkaXJlY3RpdmVNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRyb290U2NvcGUsIF8kY29tcGlsZV8pIHtcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaXQoJ3N0cmlwcyBub24gbnVtZXJpY2FsIGNoYXJzIGZyb20gdmFsdWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGVsZW1lbnQudmFsKCcxMmFiY34hQCMkJV4mKkFCQygpXCJcXCc+PD9fPVtde31cXC9cXFxcMycpLnRyaWdnZXIoJ2lucHV0Jyk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LnZhbCgpKS50b0VxdWFsKCcxMjMnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzdHJpcHMgc3BhY2VzIHZhbHVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICBlbGVtZW50LnZhbCgnMSAyIDMgNCcpLnRyaWdnZXIoJ2lucHV0Jyk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LnZhbCgpKS50b0VxdWFsKCcxMjM0Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIGRlY2ltYWwgcG9pbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICBlbGVtZW50LnZhbCgnMTIzLjQ0JykudHJpZ2dlcignaW5wdXQnKTtcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQudmFsKCkpLnRvRXF1YWwoJzEyMy40NCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyBjb21tYXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGVsZW1lbnQudmFsKCcxMjMsNDU2JykudHJpZ2dlcignaW5wdXQnKTtcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQudmFsKCkpLnRvRXF1YWwoJzEyMyw0NTYnKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
