System.register(['test/js/TestInitializer', 'common/comment/CommentModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var CommentModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonCommentCommentModule) {
            CommentModule = _commonCommentCommentModule['default'];
        }],
        execute: function () {

            describe('CommentDialogCtrl', function () {
                // Use the module.
                beforeEach(module(CommentModule));

                var $controller = undefined,
                    $rootScope = undefined,
                    modalInstance = undefined;

                beforeEach(inject(function (_$controller_, _$rootScope_) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                }));

                function createController(comments, description) {
                    modalInstance = {
                        close: jasmine.createSpy('close'),
                        dismiss: jasmine.createSpy('dismiss')
                    };
                    var ctrl = $controller('CommentDialogCtrl', {
                        $uibModalInstance: modalInstance,
                        description: description,
                        comments: comments,
                        readOnly: false
                    });
                    return ctrl;
                }

                it('should initialize with description', function () {
                    var description = 'some description',
                        ctrl = createController('some comments', description);
                    expect(ctrl.description).toEqual(description);
                });

                it('should initialize with comments', function () {
                    var comments = 'some comments',
                        ctrl = createController('some comments', null);
                    expect(ctrl.comments).toEqual(comments);
                });

                describe('complete()', function () {
                    it('should reject with no value when no comment was entered', function () {
                        var ctrl = createController();
                        ctrl.complete();
                        expect(modalInstance.dismiss).toHaveBeenCalled();
                    });

                    it('should resolve with the correct comment', function () {
                        var myComment = 'I do not like you',
                            ctrl = createController(myComment);
                        ctrl.complete();
                        expect(modalInstance.close).toHaveBeenCalledWith(myComment);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9jb21tZW50L0NvbW1lbnREaWFsb2dDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGlDQUFpQyxVQUFVLFNBQVM7OztJQUc1Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsNkJBQTZCO1lBQ25GLGdCQUFnQiw0QkFBNEI7O1FBRWhELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxxQkFBcUIsWUFBVzs7Z0JBRXJDLFdBQVcsT0FBTzs7Z0JBRWxCLElBQUksY0FBVztvQkFBRSxhQUFVO29CQUFFLGdCQUFhOztnQkFFMUMsV0FBVyxPQUFPLFVBQVMsZUFBZSxjQUFjO29CQUNwRCxjQUFjO29CQUNkLGFBQWE7OztnQkFHakIsU0FBUyxpQkFBaUIsVUFBVSxhQUFhO29CQUM3QyxnQkFBZ0I7d0JBQ1osT0FBTyxRQUFRLFVBQVU7d0JBQ3pCLFNBQVMsUUFBUSxVQUFVOztvQkFFL0IsSUFBSSxPQUFPLFlBQVkscUJBQXFCO3dCQUN4QyxtQkFBbUI7d0JBQ25CLGFBQWE7d0JBQ2IsVUFBVTt3QkFDVixVQUFVOztvQkFFZCxPQUFPOzs7Z0JBR1gsR0FBRyxzQ0FBc0MsWUFBTTtvQkFDM0MsSUFBSSxjQUFjO3dCQUNkLE9BQU8saUJBQWlCLGlCQUFpQjtvQkFDN0MsT0FBTyxLQUFLLGFBQWEsUUFBUTs7O2dCQUdyQyxHQUFHLG1DQUFtQyxZQUFNO29CQUN4QyxJQUFJLFdBQVc7d0JBQ1gsT0FBTyxpQkFBaUIsaUJBQWlCO29CQUM3QyxPQUFPLEtBQUssVUFBVSxRQUFROzs7Z0JBR2xDLFNBQVMsY0FBYyxZQUFXO29CQUM5QixHQUFHLDJEQUEyRCxZQUFXO3dCQUNyRSxJQUFJLE9BQU87d0JBQ1gsS0FBSzt3QkFDTCxPQUFPLGNBQWMsU0FBUzs7O29CQUdsQyxHQUFHLDJDQUEyQyxZQUFXO3dCQUNyRCxJQUFJLFlBQVk7NEJBQ1osT0FBTyxpQkFBaUI7d0JBQzVCLEtBQUs7d0JBQ0wsT0FBTyxjQUFjLE9BQU8scUJBQXFCOzs7Ozs7R0FlMUQiLCJmaWxlIjoiY29tbW9uL2NvbW1lbnQvQ29tbWVudERpYWxvZ0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBDb21tZW50TW9kdWxlIGZyb20gJ2NvbW1vbi9jb21tZW50L0NvbW1lbnRNb2R1bGUnO1xuXG5kZXNjcmliZSgnQ29tbWVudERpYWxvZ0N0cmwnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBVc2UgdGhlIG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShDb21tZW50TW9kdWxlKSk7XG5cbiAgICBsZXQgJGNvbnRyb2xsZXIsICRyb290U2NvcGUsIG1vZGFsSW5zdGFuY2U7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8pIHtcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoY29tbWVudHMsIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIG1vZGFsSW5zdGFuY2UgPSB7XG4gICAgICAgICAgICBjbG9zZTogamFzbWluZS5jcmVhdGVTcHkoJ2Nsb3NlJyksXG4gICAgICAgICAgICBkaXNtaXNzOiBqYXNtaW5lLmNyZWF0ZVNweSgnZGlzbWlzcycpXG4gICAgICAgIH07XG4gICAgICAgIGxldCBjdHJsID0gJGNvbnRyb2xsZXIoJ0NvbW1lbnREaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2U6IG1vZGFsSW5zdGFuY2UsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBjb21tZW50czogY29tbWVudHMsXG4gICAgICAgICAgICByZWFkT25seTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjdHJsO1xuICAgIH1cblxuICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIGRlc2NyaXB0aW9uJywgKCkgPT4ge1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSAnc29tZSBkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcignc29tZSBjb21tZW50cycsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgZXhwZWN0KGN0cmwuZGVzY3JpcHRpb24pLnRvRXF1YWwoZGVzY3JpcHRpb24pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggY29tbWVudHMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBjb21tZW50cyA9ICdzb21lIGNvbW1lbnRzJyxcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCdzb21lIGNvbW1lbnRzJywgbnVsbCk7XG4gICAgICAgIGV4cGVjdChjdHJsLmNvbW1lbnRzKS50b0VxdWFsKGNvbW1lbnRzKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb21wbGV0ZSgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmVqZWN0IHdpdGggbm8gdmFsdWUgd2hlbiBubyBjb21tZW50IHdhcyBlbnRlcmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwuY29tcGxldGUoKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEluc3RhbmNlLmRpc21pc3MpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXNvbHZlIHdpdGggdGhlIGNvcnJlY3QgY29tbWVudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IG15Q29tbWVudCA9ICdJIGRvIG5vdCBsaWtlIHlvdScsXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIobXlDb21tZW50KTtcbiAgICAgICAgICAgIGN0cmwuY29tcGxldGUoKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEluc3RhbmNlLmNsb3NlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChteUNvbW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
