System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {

    /**
     * MatchHeightDirective tests. Test child panels of container element are set to same size.
     */
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {
            describe('MatchHeightDirective', function () {
                var element, $scope, $compile, defer;

                function getElementDefinition() {
                    return '<div class="sp-body-container" style="height: 825px">' + // container
                    '  <div class="row" style="float:left; width: 50%">' + '    <div class="panel1" sp-match-height=".panel2" style="height: 200px"></div>' + '  </div>' + '  <div class="row">' + '    <div class="panel2" style="height: 600px"></div>' + '  </div>' + '  <div class="sp-footer" style="height: 25px"></div>' + '</div>'; // end container
                }

                beforeEach(module(directiveModule));

                beforeEach(inject(function (_$compile_, $rootScope, $q) {
                    defer = $q.defer();
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                    jasmine.clock().install();
                }));

                afterEach(function () {
                    element.remove();
                    jasmine.clock().uninstall();
                });

                it('should match height of sp-body-container', function () {
                    element = angular.element(getElementDefinition());
                    //add element to the dom so jQuery can work with it
                    element.appendTo(document.body);
                    $compile(element)($scope);
                    $scope.$apply();
                    // since MatchHeightDirective uses a setTimeout we have to manually advance the clock
                    jasmine.clock().tick(101);
                    $scope.$apply();

                    var $els1 = element.find('div.panel1'),
                        $els2 = element.find('div.panel2'),
                        footer = angular.element('.sp-footer');

                    // have to measure the position
                    expect($els1.height()).toBe(element.height() - ($els1.position().top + (element.height() - footer.position().top)));
                    expect($els2.height()).toBe(600);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvTWF0Y2hIZWlnaHREaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLFVBQVUsU0FBUzs7Ozs7SUFBcEc7O0lBT0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixrQkFBa0IsZ0NBQWdDOztRQUV0RCxTQUFTLFlBQVk7WUFKN0IsU0FBUyx3QkFBd0IsWUFBVztnQkFDeEMsSUFBSSxTQUFTLFFBQVEsVUFBVTs7Z0JBRS9CLFNBQVMsdUJBQXVCO29CQUM1QixPQUFPO29CQUNILHVEQUNBLG1GQUNBLGFBQ0Esd0JBQ0EseURBQ0EsYUFDQSx5REFDQTs7O2dCQUdSLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWSxJQUFJO29CQUNuRCxRQUFRLEdBQUc7b0JBQ1gsU0FBUyxXQUFXO29CQUNwQixXQUFXO29CQUNYLFFBQVEsUUFBUTs7O2dCQUdwQixVQUFVLFlBQVc7b0JBQ2pCLFFBQVE7b0JBQ1IsUUFBUSxRQUFROzs7Z0JBR3BCLEdBQUcsNENBQTRDLFlBQVc7b0JBQ3RELFVBQVUsUUFBUSxRQUFROztvQkFFMUIsUUFBUSxTQUFTLFNBQVM7b0JBQzFCLFNBQVMsU0FBUztvQkFDbEIsT0FBTzs7b0JBRVAsUUFBUSxRQUFRLEtBQUs7b0JBQ3JCLE9BQU87O29CQUVQLElBQUksUUFBUSxRQUFRLEtBQUs7d0JBQ3JCLFFBQVEsUUFBUSxLQUFLO3dCQUNyQixTQUFTLFFBQVEsUUFBUTs7O29CQUc3QixPQUFPLE1BQU0sVUFBVSxLQUFLLFFBQVEsWUFDL0IsTUFBTSxXQUFXLE9BQU8sUUFBUSxXQUFXLE9BQU8sV0FBVztvQkFDbEUsT0FBTyxNQUFNLFVBQVUsS0FBSzs7Ozs7R0FFakMiLCJmaWxlIjoiY29tbW9uL2RpcmVjdGl2ZS9NYXRjaEhlaWdodERpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBkaXJlY3RpdmVNb2R1bGUgZnJvbSAnY29tbW9uL2RpcmVjdGl2ZS9EaXJlY3RpdmVNb2R1bGUnO1xuXG4vKipcbiAqIE1hdGNoSGVpZ2h0RGlyZWN0aXZlIHRlc3RzLiBUZXN0IGNoaWxkIHBhbmVscyBvZiBjb250YWluZXIgZWxlbWVudCBhcmUgc2V0IHRvIHNhbWUgc2l6ZS5cbiAqL1xuZGVzY3JpYmUoJ01hdGNoSGVpZ2h0RGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsZW1lbnQsICRzY29wZSwgJGNvbXBpbGUsIGRlZmVyO1xuXG4gICAgZnVuY3Rpb24gZ2V0RWxlbWVudERlZmluaXRpb24oKSB7XG4gICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cInNwLWJvZHktY29udGFpbmVyXCIgc3R5bGU9XCJoZWlnaHQ6IDgyNXB4XCI+JyArIC8vIGNvbnRhaW5lclxuICAgICAgICAgICAgJyAgPGRpdiBjbGFzcz1cInJvd1wiIHN0eWxlPVwiZmxvYXQ6bGVmdDsgd2lkdGg6IDUwJVwiPicgK1xuICAgICAgICAgICAgJyAgICA8ZGl2IGNsYXNzPVwicGFuZWwxXCIgc3AtbWF0Y2gtaGVpZ2h0PVwiLnBhbmVsMlwiIHN0eWxlPVwiaGVpZ2h0OiAyMDBweFwiPjwvZGl2PicgK1xuICAgICAgICAgICAgJyAgPC9kaXY+JyArXG4gICAgICAgICAgICAnICA8ZGl2IGNsYXNzPVwicm93XCI+JyArXG4gICAgICAgICAgICAnICAgIDxkaXYgY2xhc3M9XCJwYW5lbDJcIiBzdHlsZT1cImhlaWdodDogNjAwcHhcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICcgIDwvZGl2PicgK1xuICAgICAgICAgICAgJyAgPGRpdiBjbGFzcz1cInNwLWZvb3RlclwiIHN0eWxlPVwiaGVpZ2h0OiAyNXB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JzsgLy8gZW5kIGNvbnRhaW5lclxuICAgIH1cblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb21waWxlXywgJHJvb3RTY29wZSwgJHEpIHtcbiAgICAgICAgZGVmZXIgPSAkcS5kZWZlcigpO1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICBqYXNtaW5lLmNsb2NrKCkuaW5zdGFsbCgpO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgamFzbWluZS5jbG9jaygpLnVuaW5zdGFsbCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBtYXRjaCBoZWlnaHQgb2Ygc3AtYm9keS1jb250YWluZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChnZXRFbGVtZW50RGVmaW5pdGlvbigpKTtcbiAgICAgICAgLy9hZGQgZWxlbWVudCB0byB0aGUgZG9tIHNvIGpRdWVyeSBjYW4gd29yayB3aXRoIGl0XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgLy8gc2luY2UgTWF0Y2hIZWlnaHREaXJlY3RpdmUgdXNlcyBhIHNldFRpbWVvdXQgd2UgaGF2ZSB0byBtYW51YWxseSBhZHZhbmNlIHRoZSBjbG9ja1xuICAgICAgICBqYXNtaW5lLmNsb2NrKCkudGljaygxMDEpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgbGV0ICRlbHMxID0gZWxlbWVudC5maW5kKCdkaXYucGFuZWwxJyksXG4gICAgICAgICAgICAkZWxzMiA9IGVsZW1lbnQuZmluZCgnZGl2LnBhbmVsMicpLFxuICAgICAgICAgICAgZm9vdGVyID0gYW5ndWxhci5lbGVtZW50KCcuc3AtZm9vdGVyJyk7XG5cbiAgICAgICAgLy8gaGF2ZSB0byBtZWFzdXJlIHRoZSBwb3NpdGlvblxuICAgICAgICBleHBlY3QoJGVsczEuaGVpZ2h0KCkpLnRvQmUoZWxlbWVudC5oZWlnaHQoKSAtXG4gICAgICAgICAgICAoJGVsczEucG9zaXRpb24oKS50b3AgKyAoZWxlbWVudC5oZWlnaHQoKSAtIGZvb3Rlci5wb3NpdGlvbigpLnRvcCkpKTtcbiAgICAgICAgZXhwZWN0KCRlbHMyLmhlaWdodCgpKS50b0JlKDYwMCk7XG5cbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
