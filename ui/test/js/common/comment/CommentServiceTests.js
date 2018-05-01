System.register(['test/js/TestInitializer', 'common/comment/CommentModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var CommentModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonCommentCommentModule) {
            CommentModule = _commonCommentCommentModule['default'];
        }],
        execute: function () {

            describe('CommentService', function () {
                // Use the module.
                beforeEach(module(CommentModule, 'ngAnimateMock'));

                var $rootScope = undefined,
                    commentService = undefined,
                    spModal = undefined,
                    modalInstance = undefined;

                afterEach(inject(function ($animate) {
                    if (modalInstance) {
                        modalInstance.close();
                        $animate.flush();
                    }
                }));

                beforeEach(inject(function (_$rootScope_, _commentService_, _spModal_) {
                    commentService = _commentService_;
                    spModal = _spModal_;
                    $rootScope = _$rootScope_;

                    // delete any modals that haven't been closed
                    angular.forEach(angular.element('div[class*=modal]'), function (element) {
                        angular.element(element).remove();
                    });

                    /* The functions under test do not return a reference to the modal,
                     * sneak a reference out so we can programatically close it without
                     * falling back to searching the dom for the exit button */
                    var originalOpen = spModal.open;
                    spModal.open = function () {
                        modalInstance = originalOpen.apply(spModal, arguments);
                        return modalInstance;
                    };
                }));

                describe('openCommentDialog()', function () {
                    it('should open a spModal dialog', function () {
                        spyOn(spModal, 'open').and.callThrough();
                        commentService.openCommentDialog();
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('should open a spModal dialog and return a promise that resolves with the comment', function () {
                        spyOn(spModal, 'open').and.callThrough();

                        var myComment = 'This is unacceptable!',
                            response = commentService.openCommentDialog(),
                            returnedValue = undefined;

                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();

                        response.then(function (value) {
                            returnedValue = value;
                        });
                        modalInstance.close(myComment);
                        $rootScope.$apply();
                        expect(returnedValue).toEqual(myComment);
                    });
                });

                describe('Submit Button', function () {
                    it('should be disabled when comments.length is equal to 0', function () {
                        spyOn(spModal, 'open').and.callThrough();
                        commentService.openCommentDialog();
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                        expect(angular.element('button[class*=btn-default]')[0].disabled).toBeTruthy();
                    });

                    it('should be enabled when comments.length is greater than 0', function () {
                        spyOn(spModal, 'open').and.callThrough();
                        commentService.openCommentDialog();
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();

                        var textarea = angular.element('#commentTextArea')[0];
                        textarea.value = 'foo';
                        angular.element(textarea).trigger('change');
                        expect(angular.element('button[class*=btn-default]')[0].disabled).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9jb21tZW50L0NvbW1lbnRTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGlDQUFpQyxVQUFVLFNBQVM7OztJQUc1Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsNkJBQTZCO1lBQ25GLGdCQUFnQiw0QkFBNEI7O1FBRWhELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxrQkFBa0IsWUFBVzs7Z0JBRWxDLFdBQVcsT0FBTyxlQUFlOztnQkFFakMsSUFBSSxhQUFVO29CQUFFLGlCQUFjO29CQUFFLFVBQU87b0JBQUUsZ0JBQWE7O2dCQUV0RCxVQUFVLE9BQU8sVUFBUyxVQUFVO29CQUNoQyxJQUFJLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxTQUFTOzs7O2dCQUlqQixXQUFXLE9BQU8sVUFBUyxjQUFjLGtCQUFrQixXQUFXO29CQUNsRSxpQkFBaUI7b0JBQ2pCLFVBQVU7b0JBQ1YsYUFBYTs7O29CQUdiLFFBQVEsUUFBUSxRQUFRLFFBQVEsc0JBQXNCLFVBQUMsU0FBVzt3QkFDOUQsUUFBUSxRQUFRLFNBQVM7Ozs7OztvQkFNN0IsSUFBSSxlQUFlLFFBQVE7b0JBQzNCLFFBQVEsT0FBTyxZQUFXO3dCQUN0QixnQkFBZ0IsYUFBYSxNQUFNLFNBQVM7d0JBQzVDLE9BQU87Ozs7Z0JBSWYsU0FBUyx1QkFBdUIsWUFBVztvQkFDdkMsR0FBRyxnQ0FBZ0MsWUFBVzt3QkFDMUMsTUFBTSxTQUFTLFFBQVEsSUFBSTt3QkFDM0IsZUFBZTt3QkFDZixXQUFXO3dCQUNYLE9BQU8sUUFBUSxNQUFNOzs7b0JBR3pCLEdBQUcsb0ZBQW9GLFlBQVc7d0JBQzlGLE1BQU0sU0FBUyxRQUFRLElBQUk7O3dCQUUzQixJQUFJLFlBQVk7NEJBQ1osV0FBVyxlQUFlOzRCQUMxQixnQkFBYTs7d0JBRWpCLFdBQVc7d0JBQ1gsT0FBTyxRQUFRLE1BQU07O3dCQUVyQixTQUFTLEtBQUssVUFBUyxPQUFPOzRCQUMxQixnQkFBZ0I7O3dCQUVwQixjQUFjLE1BQU07d0JBQ3BCLFdBQVc7d0JBQ1gsT0FBTyxlQUFlLFFBQVE7Ozs7Z0JBSXRDLFNBQVMsaUJBQWlCLFlBQVc7b0JBQ2pDLEdBQUcseURBQXlELFlBQVc7d0JBQ25FLE1BQU0sU0FBUyxRQUFRLElBQUk7d0JBQzNCLGVBQWU7d0JBQ2YsV0FBVzt3QkFDWCxPQUFPLFFBQVEsTUFBTTt3QkFDckIsT0FBTyxRQUFRLFFBQVEsOEJBQThCLEdBQUcsVUFBVTs7O29CQUd0RSxHQUFHLDREQUE0RCxZQUFXO3dCQUN0RSxNQUFNLFNBQVMsUUFBUSxJQUFJO3dCQUMzQixlQUFlO3dCQUNmLFdBQVc7d0JBQ1gsT0FBTyxRQUFRLE1BQU07O3dCQUVyQixJQUFJLFdBQVcsUUFBUSxRQUFRLG9CQUFvQjt3QkFDbkQsU0FBUyxRQUFRO3dCQUNqQixRQUFRLFFBQVEsVUFBVSxRQUFRO3dCQUNsQyxPQUFPLFFBQVEsUUFBUSw4QkFBOEIsR0FBRyxVQUFVOzs7Ozs7R0FnQjNFIiwiZmlsZSI6ImNvbW1vbi9jb21tZW50L0NvbW1lbnRTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgQ29tbWVudE1vZHVsZSBmcm9tICdjb21tb24vY29tbWVudC9Db21tZW50TW9kdWxlJztcblxuZGVzY3JpYmUoJ0NvbW1lbnRTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gVXNlIHRoZSBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoQ29tbWVudE1vZHVsZSwgJ25nQW5pbWF0ZU1vY2snKSk7XG5cbiAgICBsZXQgJHJvb3RTY29wZSwgY29tbWVudFNlcnZpY2UsIHNwTW9kYWwsIG1vZGFsSW5zdGFuY2U7XG5cbiAgICBhZnRlckVhY2goaW5qZWN0KGZ1bmN0aW9uKCRhbmltYXRlKSB7XG4gICAgICAgIGlmIChtb2RhbEluc3RhbmNlKSB7XG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLmNsb3NlKCk7XG4gICAgICAgICAgICAkYW5pbWF0ZS5mbHVzaCgpO1xuICAgICAgICB9XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfY29tbWVudFNlcnZpY2VfLCBfc3BNb2RhbF8pIHtcbiAgICAgICAgY29tbWVudFNlcnZpY2UgPSBfY29tbWVudFNlcnZpY2VfO1xuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuXG4gICAgICAgIC8vIGRlbGV0ZSBhbnkgbW9kYWxzIHRoYXQgaGF2ZW4ndCBiZWVuIGNsb3NlZFxuICAgICAgICBhbmd1bGFyLmZvckVhY2goYW5ndWxhci5lbGVtZW50KCdkaXZbY2xhc3MqPW1vZGFsXScpLCAoZWxlbWVudCk9PiB7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qIFRoZSBmdW5jdGlvbnMgdW5kZXIgdGVzdCBkbyBub3QgcmV0dXJuIGEgcmVmZXJlbmNlIHRvIHRoZSBtb2RhbCxcbiAgICAgICAgICogc25lYWsgYSByZWZlcmVuY2Ugb3V0IHNvIHdlIGNhbiBwcm9ncmFtYXRpY2FsbHkgY2xvc2UgaXQgd2l0aG91dFxuICAgICAgICAgKiBmYWxsaW5nIGJhY2sgdG8gc2VhcmNoaW5nIHRoZSBkb20gZm9yIHRoZSBleGl0IGJ1dHRvbiAqL1xuICAgICAgICB2YXIgb3JpZ2luYWxPcGVuID0gc3BNb2RhbC5vcGVuO1xuICAgICAgICBzcE1vZGFsLm9wZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UgPSBvcmlnaW5hbE9wZW4uYXBwbHkoc3BNb2RhbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBtb2RhbEluc3RhbmNlO1xuICAgICAgICB9O1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdvcGVuQ29tbWVudERpYWxvZygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiBhIHNwTW9kYWwgZGlhbG9nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgICAgICAgICAgY29tbWVudFNlcnZpY2Uub3BlbkNvbW1lbnREaWFsb2coKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiBhIHNwTW9kYWwgZGlhbG9nIGFuZCByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY29tbWVudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbFRocm91Z2goKTtcblxuICAgICAgICAgICAgbGV0IG15Q29tbWVudCA9ICdUaGlzIGlzIHVuYWNjZXB0YWJsZSEnLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gY29tbWVudFNlcnZpY2Uub3BlbkNvbW1lbnREaWFsb2coKSxcbiAgICAgICAgICAgICAgICByZXR1cm5lZFZhbHVlO1xuXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgICAgICByZXNwb25zZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuZWRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLmNsb3NlKG15Q29tbWVudCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHJldHVybmVkVmFsdWUpLnRvRXF1YWwobXlDb21tZW50KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnU3VibWl0IEJ1dHRvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGJlIGRpc2FibGVkIHdoZW4gY29tbWVudHMubGVuZ3RoIGlzIGVxdWFsIHRvIDAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgICAgICBjb21tZW50U2VydmljZS5vcGVuQ29tbWVudERpYWxvZygpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoJ2J1dHRvbltjbGFzcyo9YnRuLWRlZmF1bHRdJylbMF0uZGlzYWJsZWQpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBlbmFibGVkIHdoZW4gY29tbWVudHMubGVuZ3RoIGlzIGdyZWF0ZXIgdGhhbiAwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgICAgICAgICAgY29tbWVudFNlcnZpY2Uub3BlbkNvbW1lbnREaWFsb2coKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cbiAgICAgICAgICAgIGxldCB0ZXh0YXJlYSA9IGFuZ3VsYXIuZWxlbWVudCgnI2NvbW1lbnRUZXh0QXJlYScpWzBdO1xuICAgICAgICAgICAgdGV4dGFyZWEudmFsdWUgPSAnZm9vJztcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCh0ZXh0YXJlYSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KCdidXR0b25bY2xhc3MqPWJ0bi1kZWZhdWx0XScpWzBdLmRpc2FibGVkKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
