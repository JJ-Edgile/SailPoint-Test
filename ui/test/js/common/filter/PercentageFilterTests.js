System.register(['test/js/TestInitializer', 'common/filter/FilterModule'], function (_export) {

    /**
     * Tests for the percentage filter
     */

    'use strict';

    var filterModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFilterFilterModule) {
            filterModule = _commonFilterFilterModule['default'];
        }],
        execute: function () {
            describe('percentageFilter', function () {
                // The filter under test
                var percentageFilter;

                beforeEach(module(filterModule));

                beforeEach(inject(function (_percentageFilter_) {
                    percentageFilter = _percentageFilter_;
                }));

                it('should return empty string when input is not number', function () {
                    var filteredText = percentageFilter('not a number');
                    expect(filteredText).toEqual('');
                });

                it('should return empty string when decimal input is not number', function () {
                    var filteredText = percentageFilter(0.11, 'not a number');
                    expect(filteredText).toEqual('');
                });

                it('should return percentage value without any decimals by default', function () {
                    var filteredText = percentageFilter(0.1234);
                    expect(filteredText).toEqual('12%');
                });

                it('should round when no decimals places specified', function () {
                    var filteredText = percentageFilter(0.1264);
                    expect(filteredText).toEqual('13%');
                });

                it('should round up with decimals places specified', function () {
                    var filteredText = percentageFilter(0.1268, 1);
                    expect(filteredText).toEqual('12.7%');
                });

                it('should round down with decimals places specified', function () {
                    var filteredText = percentageFilter(0.1263, 1);
                    expect(filteredText).toEqual('12.6%');
                });

                it('should return percentage value with correct number of decimals', function () {
                    var filteredText = percentageFilter(0.1234, 2);
                    expect(filteredText).toEqual('12.34%');
                });

                it('should return percentage value with correct number of decimals with zeros', function () {
                    var filteredText = percentageFilter(0.1234, 3);
                    expect(filteredText).toEqual('12.340%');
                });

                it('should not round up to 100 when between 99 and 100', function () {
                    var filteredText = percentageFilter(199 / 200);
                    expect(filteredText).toEqual('99%');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9maWx0ZXIvUGVyY2VudGFnZUZpbHRlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwrQkFBK0IsVUFBVSxTQUFTOzs7Ozs7SUFBOUY7O0lBUUksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJCQUEyQjtZQUNqRixlQUFlLDBCQUEwQjs7UUFFN0MsU0FBUyxZQUFZO1lBSjdCLFNBQVMsb0JBQW9CLFlBQVc7O2dCQUVwQyxJQUFJOztnQkFFSixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxvQkFBb0I7b0JBQzNDLG1CQUFtQjs7O2dCQUd2QixHQUFHLHVEQUF1RCxZQUFXO29CQUNqRSxJQUFJLGVBQWUsaUJBQWlCO29CQUNwQyxPQUFPLGNBQWMsUUFBUTs7O2dCQUdqQyxHQUFHLCtEQUErRCxZQUFXO29CQUN6RSxJQUFJLGVBQWUsaUJBQWlCLE1BQU07b0JBQzFDLE9BQU8sY0FBYyxRQUFROzs7Z0JBR2pDLEdBQUcsa0VBQWtFLFlBQVc7b0JBQzVFLElBQUksZUFBZSxpQkFBaUI7b0JBQ3BDLE9BQU8sY0FBYyxRQUFROzs7Z0JBR2pDLEdBQUcsa0RBQWtELFlBQVc7b0JBQzVELElBQUksZUFBZSxpQkFBaUI7b0JBQ3BDLE9BQU8sY0FBYyxRQUFROzs7Z0JBR2pDLEdBQUcsa0RBQWtELFlBQVc7b0JBQzVELElBQUksZUFBZSxpQkFBaUIsUUFBUTtvQkFDNUMsT0FBTyxjQUFjLFFBQVE7OztnQkFHakMsR0FBRyxvREFBb0QsWUFBVztvQkFDOUQsSUFBSSxlQUFlLGlCQUFpQixRQUFRO29CQUM1QyxPQUFPLGNBQWMsUUFBUTs7O2dCQUdqQyxHQUFHLGtFQUFrRSxZQUFXO29CQUM1RSxJQUFJLGVBQWUsaUJBQWlCLFFBQVE7b0JBQzVDLE9BQU8sY0FBYyxRQUFROzs7Z0JBR2pDLEdBQUcsNkVBQTZFLFlBQVc7b0JBQ3ZGLElBQUksZUFBZSxpQkFBaUIsUUFBUTtvQkFDNUMsT0FBTyxjQUFjLFFBQVE7OztnQkFHakMsR0FBRyxzREFBc0QsWUFBVztvQkFDaEUsSUFBSSxlQUFlLGlCQUFpQixNQUFNO29CQUMxQyxPQUFPLGNBQWMsUUFBUTs7Ozs7R0FVbEMiLCJmaWxlIjoiY29tbW9uL2ZpbHRlci9QZXJjZW50YWdlRmlsdGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGZpbHRlck1vZHVsZSBmcm9tICdjb21tb24vZmlsdGVyL0ZpbHRlck1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBwZXJjZW50YWdlIGZpbHRlclxuICovXG5cbmRlc2NyaWJlKCdwZXJjZW50YWdlRmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gVGhlIGZpbHRlciB1bmRlciB0ZXN0XG4gICAgdmFyIHBlcmNlbnRhZ2VGaWx0ZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmaWx0ZXJNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9wZXJjZW50YWdlRmlsdGVyXykge1xuICAgICAgICBwZXJjZW50YWdlRmlsdGVyID0gX3BlcmNlbnRhZ2VGaWx0ZXJfO1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGVtcHR5IHN0cmluZyB3aGVuIGlucHV0IGlzIG5vdCBudW1iZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbHRlcmVkVGV4dCA9IHBlcmNlbnRhZ2VGaWx0ZXIoJ25vdCBhIG51bWJlcicpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRUZXh0KS50b0VxdWFsKCcnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGVtcHR5IHN0cmluZyB3aGVuIGRlY2ltYWwgaW5wdXQgaXMgbm90IG51bWJlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsdGVyZWRUZXh0ID0gcGVyY2VudGFnZUZpbHRlcigwLjExLCAnbm90IGEgbnVtYmVyJyk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFRleHQpLnRvRXF1YWwoJycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gcGVyY2VudGFnZSB2YWx1ZSB3aXRob3V0IGFueSBkZWNpbWFscyBieSBkZWZhdWx0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXJlZFRleHQgPSBwZXJjZW50YWdlRmlsdGVyKDAuMTIzNCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFRleHQpLnRvRXF1YWwoJzEyJScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByb3VuZCB3aGVuIG5vIGRlY2ltYWxzIHBsYWNlcyBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbHRlcmVkVGV4dCA9IHBlcmNlbnRhZ2VGaWx0ZXIoMC4xMjY0KTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVGV4dCkudG9FcXVhbCgnMTMlJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJvdW5kIHVwIHdpdGggZGVjaW1hbHMgcGxhY2VzIHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsdGVyZWRUZXh0ID0gcGVyY2VudGFnZUZpbHRlcigwLjEyNjgsIDEpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRUZXh0KS50b0VxdWFsKCcxMi43JScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByb3VuZCBkb3duIHdpdGggZGVjaW1hbHMgcGxhY2VzIHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsdGVyZWRUZXh0ID0gcGVyY2VudGFnZUZpbHRlcigwLjEyNjMsIDEpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRUZXh0KS50b0VxdWFsKCcxMi42JScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gcGVyY2VudGFnZSB2YWx1ZSB3aXRoIGNvcnJlY3QgbnVtYmVyIG9mIGRlY2ltYWxzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXJlZFRleHQgPSBwZXJjZW50YWdlRmlsdGVyKDAuMTIzNCwgMik7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFRleHQpLnRvRXF1YWwoJzEyLjM0JScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gcGVyY2VudGFnZSB2YWx1ZSB3aXRoIGNvcnJlY3QgbnVtYmVyIG9mIGRlY2ltYWxzIHdpdGggemVyb3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbHRlcmVkVGV4dCA9IHBlcmNlbnRhZ2VGaWx0ZXIoMC4xMjM0LCAzKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVGV4dCkudG9FcXVhbCgnMTIuMzQwJScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3Qgcm91bmQgdXAgdG8gMTAwIHdoZW4gYmV0d2VlbiA5OSBhbmQgMTAwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXJlZFRleHQgPSBwZXJjZW50YWdlRmlsdGVyKDE5OSAvIDIwMCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFRleHQpLnRvRXF1YWwoJzk5JScpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
