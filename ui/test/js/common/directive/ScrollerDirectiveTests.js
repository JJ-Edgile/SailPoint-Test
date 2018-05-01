System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('ScrollBottomDirective', function () {
                var element,
                    $scope,
                    $compile,
                    defer,
                    elementHTML = '<div style="height: 100px;overflow-y: scroll;" sp-scroller="trigger">' + '<div style="height: 300px;" id="blah">blah</div>' + '<div style="height: 300px;" id="hah">hah!</div>' + '</div>',
                    elementWithOptionsHTML = '<div style="height: 100px;overflow-y: scroll;" ' + ' id="scrollDiv">' + '<div style="height: 300px;" id="blah">blah</div>' + '<div sp-scroller="triggerBoolean" sp-scroller-options="options" style="height: 300px;">hah!</div>' + '</div>';

                beforeEach(module(directiveModule));
                beforeEach(inject(function (_$compile_, $rootScope, $q) {
                    defer = $q.defer();
                    $scope = $rootScope;
                    $compile = _$compile_;
                }));

                afterEach(function () {
                    element.remove();
                });

                function createElementWithPromise() {
                    //make mock promise
                    $scope.trigger = defer.promise;
                    spyOn($scope.trigger, 'then').and.callThrough();
                    element = angular.element(elementHTML);
                    //add element to the dom so jQuery can work with it
                    element.appendTo(document.body);
                    $compile(element)($scope);
                    $scope.$apply();
                }

                function createElementWithBoolean(position, animate) {
                    //make mock promise
                    $scope.triggerBoolean = false;
                    $scope.options = {
                        position: position,
                        animate: animate,
                        selector: '#scrollDiv',
                        isPromise: false
                    };

                    element = angular.element(elementWithOptionsHTML);
                    //add element to the dom so jQuery can work with it
                    element.appendTo(document.body);
                    $compile(element)($scope);
                    $scope.$apply();
                }

                describe('default behavior with promise', function () {
                    beforeEach(function () {
                        createElementWithPromise();
                    });

                    it('should attach an action to the promise', function () {
                        expect($scope.trigger.then).toHaveBeenCalled();
                    });

                    it('should scroll when triggered', function () {
                        expect(element[0].scrollTop).toBe(0);
                        //trigger promise success
                        defer.resolve();
                        //digest to trigger promise
                        $scope.$apply();
                        expect(element[0].scrollTop).toBeGreaterThan(0);
                    });
                });

                describe('scroller options', function () {
                    function testTriggerChange(newValue, doScroll, expectedPosition) {
                        $scope.triggerBoolean = newValue;
                        $scope.$apply();

                        if (doScroll) {
                            //digest to trigger scroll
                            expect(element[0].scrollTop).toBe(expectedPosition);
                        } else {
                            //nothing to flush since scroll wasnt triggered.
                            expect(element[0].scrollTop).not.toBe(expectedPosition);
                        }
                    }

                    it('should scroll to given position when triggered', function () {
                        createElementWithBoolean(200);
                        testTriggerChange(true, true, 200);
                    });

                    it('only scrolls when changing from falsy to truthy', function () {
                        createElementWithBoolean(200);
                        testTriggerChange(true, true, 200);

                        $scope.options.position = 100;
                        // true to undefined, should not scroll
                        testTriggerChange(undefined, false, 100);

                        // undefined to something truthy, should scroll
                        testTriggerChange('abc', true, 100);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvU2Nyb2xsZXJEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLFVBQVUsU0FBUztJQUNoRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsaUNBQWlDO1lBQ3ZGLGtCQUFrQixnQ0FBZ0M7O1FBRXRELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyx5QkFBeUIsWUFBVztnQkFDekMsSUFBSTtvQkFBUztvQkFBUTtvQkFBVTtvQkFDM0IsY0FBYywwRUFDVixxREFDQSxvREFDQTtvQkFDSix5QkFBeUIsb0RBQ3JCLHFCQUNBLHFEQUNBLHNHQUNBOztnQkFFUixXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWSxJQUFJO29CQUNuRCxRQUFRLEdBQUc7b0JBQ1gsU0FBUztvQkFDVCxXQUFXOzs7Z0JBR2YsVUFBVSxZQUFXO29CQUNqQixRQUFROzs7Z0JBR1osU0FBUywyQkFBMkI7O29CQUVoQyxPQUFPLFVBQVUsTUFBTTtvQkFDdkIsTUFBTSxPQUFPLFNBQVMsUUFBUSxJQUFJO29CQUNsQyxVQUFVLFFBQVEsUUFBUTs7b0JBRTFCLFFBQVEsU0FBUyxTQUFTO29CQUMxQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87OztnQkFHWCxTQUFTLHlCQUF5QixVQUFVLFNBQVM7O29CQUVqRCxPQUFPLGlCQUFpQjtvQkFDeEIsT0FBTyxVQUFVO3dCQUNiLFVBQVU7d0JBQ1YsU0FBUzt3QkFDVCxVQUFVO3dCQUNWLFdBQVc7OztvQkFHZixVQUFVLFFBQVEsUUFBUTs7b0JBRTFCLFFBQVEsU0FBUyxTQUFTO29CQUMxQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87OztnQkFHWCxTQUFTLGlDQUFpQyxZQUFXO29CQUNqRCxXQUFXLFlBQVc7d0JBQ2xCOzs7b0JBR0osR0FBRywwQ0FBMEMsWUFBVzt3QkFDcEQsT0FBTyxPQUFPLFFBQVEsTUFBTTs7O29CQUdoQyxHQUFHLGdDQUFnQyxZQUFXO3dCQUMxQyxPQUFPLFFBQVEsR0FBRyxXQUFXLEtBQUs7O3dCQUVsQyxNQUFNOzt3QkFFTixPQUFPO3dCQUNQLE9BQU8sUUFBUSxHQUFHLFdBQVcsZ0JBQWdCOzs7O2dCQUtyRCxTQUFTLG9CQUFvQixZQUFXO29CQUNwQyxTQUFTLGtCQUFrQixVQUFVLFVBQVUsa0JBQWtCO3dCQUM3RCxPQUFPLGlCQUFpQjt3QkFDeEIsT0FBTzs7d0JBRVAsSUFBSSxVQUFVOzs0QkFFVixPQUFPLFFBQVEsR0FBRyxXQUFXLEtBQUs7K0JBQy9COzs0QkFFSCxPQUFPLFFBQVEsR0FBRyxXQUFXLElBQUksS0FBSzs7OztvQkFJOUMsR0FBRyxrREFBa0QsWUFBVzt3QkFDNUQseUJBQXlCO3dCQUN6QixrQkFBa0IsTUFBTSxNQUFNOzs7b0JBR2xDLEdBQUcsbURBQW1ELFlBQVc7d0JBQzdELHlCQUF5Qjt3QkFDekIsa0JBQWtCLE1BQU0sTUFBTTs7d0JBRzlCLE9BQU8sUUFBUSxXQUFXOzt3QkFFMUIsa0JBQWtCLFdBQVcsT0FBTzs7O3dCQUdwQyxrQkFBa0IsT0FBTyxNQUFNOzs7Ozs7R0FPeEMiLCJmaWxlIjoiY29tbW9uL2RpcmVjdGl2ZS9TY3JvbGxlckRpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGlyZWN0aXZlTW9kdWxlIGZyb20gJ2NvbW1vbi9kaXJlY3RpdmUvRGlyZWN0aXZlTW9kdWxlJztcblxuZGVzY3JpYmUoJ1Njcm9sbEJvdHRvbURpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbGVtZW50LCAkc2NvcGUsICRjb21waWxlLCBkZWZlcixcbiAgICAgICAgZWxlbWVudEhUTUwgPSAnPGRpdiBzdHlsZT1cImhlaWdodDogMTAwcHg7b3ZlcmZsb3cteTogc2Nyb2xsO1wiIHNwLXNjcm9sbGVyPVwidHJpZ2dlclwiPicgK1xuICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJoZWlnaHQ6IDMwMHB4O1wiIGlkPVwiYmxhaFwiPmJsYWg8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OiAzMDBweDtcIiBpZD1cImhhaFwiPmhhaCE8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nLFxuICAgICAgICBlbGVtZW50V2l0aE9wdGlvbnNIVE1MID0gJzxkaXYgc3R5bGU9XCJoZWlnaHQ6IDEwMHB4O292ZXJmbG93LXk6IHNjcm9sbDtcIiAnICtcbiAgICAgICAgICAgICcgaWQ9XCJzY3JvbGxEaXZcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OiAzMDBweDtcIiBpZD1cImJsYWhcIj5ibGFoPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBzcC1zY3JvbGxlcj1cInRyaWdnZXJCb29sZWFuXCIgc3Atc2Nyb2xsZXItb3B0aW9ucz1cIm9wdGlvbnNcIiBzdHlsZT1cImhlaWdodDogMzAwcHg7XCI+aGFoITwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShkaXJlY3RpdmVNb2R1bGUpKTtcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbXBpbGVfLCAkcm9vdFNjb3BlLCAkcSkge1xuICAgICAgICBkZWZlciA9ICRxLmRlZmVyKCk7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50V2l0aFByb21pc2UoKSB7XG4gICAgICAgIC8vbWFrZSBtb2NrIHByb21pc2VcbiAgICAgICAgJHNjb3BlLnRyaWdnZXIgPSBkZWZlci5wcm9taXNlO1xuICAgICAgICBzcHlPbigkc2NvcGUudHJpZ2dlciwgJ3RoZW4nKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50SFRNTCk7XG4gICAgICAgIC8vYWRkIGVsZW1lbnQgdG8gdGhlIGRvbSBzbyBqUXVlcnkgY2FuIHdvcmsgd2l0aCBpdFxuICAgICAgICBlbGVtZW50LmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFdpdGhCb29sZWFuKHBvc2l0aW9uLCBhbmltYXRlKSB7XG4gICAgICAgIC8vbWFrZSBtb2NrIHByb21pc2VcbiAgICAgICAgJHNjb3BlLnRyaWdnZXJCb29sZWFuID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5vcHRpb25zID0ge1xuICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgYW5pbWF0ZTogYW5pbWF0ZSxcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnI3Njcm9sbERpdicsXG4gICAgICAgICAgICBpc1Byb21pc2U6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50V2l0aE9wdGlvbnNIVE1MKTtcbiAgICAgICAgLy9hZGQgZWxlbWVudCB0byB0aGUgZG9tIHNvIGpRdWVyeSBjYW4gd29yayB3aXRoIGl0XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZGVmYXVsdCBiZWhhdmlvciB3aXRoIHByb21pc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnRXaXRoUHJvbWlzZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGF0dGFjaCBhbiBhY3Rpb24gdG8gdGhlIHByb21pc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUudHJpZ2dlci50aGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2Nyb2xsIHdoZW4gdHJpZ2dlcmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudFswXS5zY3JvbGxUb3ApLnRvQmUoMCk7XG4gICAgICAgICAgICAvL3RyaWdnZXIgcHJvbWlzZSBzdWNjZXNzXG4gICAgICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgICAgICAgICAvL2RpZ2VzdCB0byB0cmlnZ2VyIHByb21pc2VcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50WzBdLnNjcm9sbFRvcCkudG9CZUdyZWF0ZXJUaGFuKDApO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Njcm9sbGVyIG9wdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gdGVzdFRyaWdnZXJDaGFuZ2UobmV3VmFsdWUsIGRvU2Nyb2xsLCBleHBlY3RlZFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAkc2NvcGUudHJpZ2dlckJvb2xlYW4gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgaWYgKGRvU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgLy9kaWdlc3QgdG8gdHJpZ2dlciBzY3JvbGxcbiAgICAgICAgICAgICAgICBleHBlY3QoZWxlbWVudFswXS5zY3JvbGxUb3ApLnRvQmUoZXhwZWN0ZWRQb3NpdGlvbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vbm90aGluZyB0byBmbHVzaCBzaW5jZSBzY3JvbGwgd2FzbnQgdHJpZ2dlcmVkLlxuICAgICAgICAgICAgICAgIGV4cGVjdChlbGVtZW50WzBdLnNjcm9sbFRvcCkubm90LnRvQmUoZXhwZWN0ZWRQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnc2hvdWxkIHNjcm9sbCB0byBnaXZlbiBwb3NpdGlvbiB3aGVuIHRyaWdnZXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudFdpdGhCb29sZWFuKDIwMCk7XG4gICAgICAgICAgICB0ZXN0VHJpZ2dlckNoYW5nZSh0cnVlLCB0cnVlLCAyMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnb25seSBzY3JvbGxzIHdoZW4gY2hhbmdpbmcgZnJvbSBmYWxzeSB0byB0cnV0aHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnRXaXRoQm9vbGVhbigyMDApO1xuICAgICAgICAgICAgdGVzdFRyaWdnZXJDaGFuZ2UodHJ1ZSwgdHJ1ZSwgMjAwKTtcblxuXG4gICAgICAgICAgICAkc2NvcGUub3B0aW9ucy5wb3NpdGlvbiA9IDEwMDtcbiAgICAgICAgICAgIC8vIHRydWUgdG8gdW5kZWZpbmVkLCBzaG91bGQgbm90IHNjcm9sbFxuICAgICAgICAgICAgdGVzdFRyaWdnZXJDaGFuZ2UodW5kZWZpbmVkLCBmYWxzZSwgMTAwKTtcblxuICAgICAgICAgICAgLy8gdW5kZWZpbmVkIHRvIHNvbWV0aGluZyB0cnV0aHksIHNob3VsZCBzY3JvbGxcbiAgICAgICAgICAgIHRlc3RUcmlnZ2VyQ2hhbmdlKCdhYmMnLCB0cnVlLCAxMDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
