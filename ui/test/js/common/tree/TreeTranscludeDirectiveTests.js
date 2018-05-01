System.register(['test/js/TestInitializer', 'common/tree/TreeModule'], function (_export) {
    'use strict';

    var treeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonTreeTreeModule) {
            treeModule = _commonTreeTreeModule['default'];
        }],
        execute: function () {

            describe('TreeTranscludeDirective', function () {

                var elt = '<sp-tree-transclude></sp-tree-transclude>',
                    element = undefined,
                    $compile = undefined,
                    $scope = undefined,
                    transcludeFunc = undefined;

                beforeEach(module(treeModule));

                beforeEach(inject(function (_$compile_, $rootScope) {
                    $compile = _$compile_;
                    $scope = $rootScope.$new();

                    transcludeFunc = jasmine.createSpy('transcludeFunc');
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function compile(node) {
                    $scope.node = node;
                    $scope.treeTranscludeFunction = transcludeFunc;

                    var element = angular.element(elt);
                    $compile(element)($scope);
                }

                it('explodes if "node" is not in scope', function () {
                    expect(function () {
                        return compile();
                    }).toThrow();
                });

                it('explodes if "treeTranscludeFunction" is not in scope', function () {
                    transcludeFunc = null;
                    expect(function () {
                        return compile({});
                    }).toThrow();
                });

                it('calls the transclusion function with the node in the scope', function () {
                    var node = { hi: 'mom' };
                    compile(node);
                    expect(transcludeFunc).toHaveBeenCalled();
                    expect(transcludeFunc.calls.mostRecent().args[0].node).toEqual(node);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi90cmVlL1RyZWVUcmFuc2NsdWRlRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7SUFDdEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjs7UUFFdkMsU0FBUyxZQUFZOztZQUw3QixTQUFTLDJCQUEyQixZQUFNOztnQkFFdEMsSUFBSSxNQUFNO29CQUNOLFVBQU87b0JBQUUsV0FBUTtvQkFBRSxTQUFNO29CQUFFLGlCQUFjOztnQkFFN0MsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsWUFBWSxZQUFlO29CQUMxQyxXQUFXO29CQUNYLFNBQVMsV0FBVzs7b0JBRXBCLGlCQUFpQixRQUFRLFVBQVU7OztnQkFHdkMsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROzs7O2dCQUloQixTQUFTLFFBQVEsTUFBTTtvQkFDbkIsT0FBTyxPQUFPO29CQUNkLE9BQU8seUJBQXlCOztvQkFFaEMsSUFBSSxVQUFVLFFBQVEsUUFBUTtvQkFDOUIsU0FBUyxTQUFTOzs7Z0JBR3RCLEdBQUcsc0NBQXNDLFlBQU07b0JBQzNDLE9BQU8sWUFBQTt3QkFXUyxPQVhIO3VCQUFXOzs7Z0JBRzVCLEdBQUcsd0RBQXdELFlBQU07b0JBQzdELGlCQUFpQjtvQkFDakIsT0FBTyxZQUFBO3dCQWFTLE9BYkgsUUFBUTt1QkFBSzs7O2dCQUc5QixHQUFHLDhEQUE4RCxZQUFNO29CQUNuRSxJQUFJLE9BQU8sRUFBRSxJQUFJO29CQUNqQixRQUFRO29CQUNSLE9BQU8sZ0JBQWdCO29CQUN2QixPQUFPLGVBQWUsTUFBTSxhQUFhLEtBQUssR0FBRyxNQUFNLFFBQVE7Ozs7O0dBbUJwRSIsImZpbGUiOiJjb21tb24vdHJlZS9UcmVlVHJhbnNjbHVkZURpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCB0cmVlTW9kdWxlIGZyb20gJ2NvbW1vbi90cmVlL1RyZWVNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ1RyZWVUcmFuc2NsdWRlRGlyZWN0aXZlJywgKCkgPT4ge1xyXG5cclxuICAgIGxldCBlbHQgPSAnPHNwLXRyZWUtdHJhbnNjbHVkZT48L3NwLXRyZWUtdHJhbnNjbHVkZT4nLFxyXG4gICAgICAgIGVsZW1lbnQsICRjb21waWxlLCAkc2NvcGUsIHRyYW5zY2x1ZGVGdW5jO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRyZWVNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb21waWxlXywgJHJvb3RTY29wZSkgPT4ge1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuXHJcbiAgICAgICAgdHJhbnNjbHVkZUZ1bmMgPSBqYXNtaW5lLmNyZWF0ZVNweSgndHJhbnNjbHVkZUZ1bmMnKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcGlsZShub2RlKSB7XHJcbiAgICAgICAgJHNjb3BlLm5vZGUgPSBub2RlO1xyXG4gICAgICAgICRzY29wZS50cmVlVHJhbnNjbHVkZUZ1bmN0aW9uID0gdHJhbnNjbHVkZUZ1bmM7XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsdCk7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgIH1cclxuXHJcbiAgICBpdCgnZXhwbG9kZXMgaWYgXCJub2RlXCIgaXMgbm90IGluIHNjb3BlJywgKCkgPT4ge1xyXG4gICAgICAgIGV4cGVjdCgoKSA9PiBjb21waWxlKCkpLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdleHBsb2RlcyBpZiBcInRyZWVUcmFuc2NsdWRlRnVuY3Rpb25cIiBpcyBub3QgaW4gc2NvcGUnLCAoKSA9PiB7XHJcbiAgICAgICAgdHJhbnNjbHVkZUZ1bmMgPSBudWxsO1xyXG4gICAgICAgIGV4cGVjdCgoKSA9PiBjb21waWxlKHt9KSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2NhbGxzIHRoZSB0cmFuc2NsdXNpb24gZnVuY3Rpb24gd2l0aCB0aGUgbm9kZSBpbiB0aGUgc2NvcGUnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB7IGhpOiAnbW9tJyB9O1xyXG4gICAgICAgIGNvbXBpbGUobm9kZSk7XHJcbiAgICAgICAgZXhwZWN0KHRyYW5zY2x1ZGVGdW5jKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgZXhwZWN0KHRyYW5zY2x1ZGVGdW5jLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLm5vZGUpLnRvRXF1YWwobm9kZSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
