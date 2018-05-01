System.register(['test/js/TestInitializer', 'common/filter/FilterModule'], function (_export) {
    'use strict';

    var filterModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFilterFilterModule) {
            filterModule = _commonFilterFilterModule['default'];
        }],
        execute: function () {

            describe('displayableName', function () {
                var filter;

                beforeEach(module(filterModule));

                beforeEach(inject(function (_displayableNameFilter_) {
                    filter = _displayableNameFilter_;
                }));

                it('returns same value for null', function () {
                    expect(filter(null)).toEqual(null);
                });

                it('returns same value for non-object', function () {
                    var value = '123';
                    expect(filter(value)).toEqual(value);
                });

                it('returns same value for wrong object', function () {
                    var value = { something: 'else' };
                    expect(filter(value)).toEqual(value);
                });

                it('returns displayable name for object with method', function () {
                    var name = 'Mr Bob',
                        value = {
                        getDisplayableName: jasmine.createSpy().and.returnValue(name)
                    },
                        filteredValue = filter(value);

                    expect(value.getDisplayableName).toHaveBeenCalled();
                    expect(filteredValue).toEqual(name);
                });

                it('returns displayable name for object with property', function () {
                    var name = 'Mr Bob',
                        value = {
                        displayableName: name
                    },
                        filteredValue = filter(value);

                    expect(filteredValue).toEqual(name);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9maWx0ZXIvRGlzcGxheWFibGVOYW1lRmlsdGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLCtCQUErQixVQUFVLFNBQVM7SUFBOUY7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJCQUEyQjtZQUNqRixlQUFlLDBCQUEwQjs7UUFFN0MsU0FBUyxZQUFZOztZQUg3QixTQUFTLG1CQUFtQixZQUFXO2dCQUNuQyxJQUFJOztnQkFFSixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyx5QkFBeUI7b0JBQ2hELFNBQVM7OztnQkFHYixHQUFHLCtCQUErQixZQUFXO29CQUN6QyxPQUFPLE9BQU8sT0FBTyxRQUFROzs7Z0JBR2pDLEdBQUcscUNBQXFDLFlBQVc7b0JBQy9DLElBQUksUUFBUTtvQkFDWixPQUFPLE9BQU8sUUFBUSxRQUFROzs7Z0JBR2xDLEdBQUcsdUNBQXVDLFlBQVc7b0JBQ2pELElBQUksUUFBUSxFQUFFLFdBQVc7b0JBQ3pCLE9BQU8sT0FBTyxRQUFRLFFBQVE7OztnQkFHbEMsR0FBRyxtREFBbUQsWUFBVztvQkFDN0QsSUFBSSxPQUFPO3dCQUNQLFFBQVE7d0JBQ0osb0JBQW9CLFFBQVEsWUFBWSxJQUFJLFlBQVk7O3dCQUU1RCxnQkFBZ0IsT0FBTzs7b0JBRTNCLE9BQU8sTUFBTSxvQkFBb0I7b0JBQ2pDLE9BQU8sZUFBZSxRQUFROzs7Z0JBR2xDLEdBQUcscURBQXFELFlBQVc7b0JBQy9ELElBQUksT0FBTzt3QkFDUCxRQUFRO3dCQUNKLGlCQUFpQjs7d0JBRXJCLGdCQUFnQixPQUFPOztvQkFFM0IsT0FBTyxlQUFlLFFBQVE7Ozs7O0dBVW5DIiwiZmlsZSI6ImNvbW1vbi9maWx0ZXIvRGlzcGxheWFibGVOYW1lRmlsdGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGZpbHRlck1vZHVsZSBmcm9tICdjb21tb24vZmlsdGVyL0ZpbHRlck1vZHVsZSc7XG5cbmRlc2NyaWJlKCdkaXNwbGF5YWJsZU5hbWUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZmlsdGVyO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZmlsdGVyTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfZGlzcGxheWFibGVOYW1lRmlsdGVyXykge1xuICAgICAgICBmaWx0ZXIgPSBfZGlzcGxheWFibGVOYW1lRmlsdGVyXztcbiAgICB9KSk7XG5cbiAgICBpdCgncmV0dXJucyBzYW1lIHZhbHVlIGZvciBudWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmaWx0ZXIobnVsbCkpLnRvRXF1YWwobnVsbCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBzYW1lIHZhbHVlIGZvciBub24tb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9ICcxMjMnO1xuICAgICAgICBleHBlY3QoZmlsdGVyKHZhbHVlKSkudG9FcXVhbCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBzYW1lIHZhbHVlIGZvciB3cm9uZyBvYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0geyBzb21ldGhpbmc6ICdlbHNlJyB9O1xuICAgICAgICBleHBlY3QoZmlsdGVyKHZhbHVlKSkudG9FcXVhbCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBkaXNwbGF5YWJsZSBuYW1lIGZvciBvYmplY3Qgd2l0aCBtZXRob2QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5hbWUgPSAnTXIgQm9iJyxcbiAgICAgICAgICAgIHZhbHVlID0ge1xuICAgICAgICAgICAgICAgIGdldERpc3BsYXlhYmxlTmFtZTogamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUobmFtZSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaWx0ZXJlZFZhbHVlID0gZmlsdGVyKHZhbHVlKTtcblxuICAgICAgICBleHBlY3QodmFsdWUuZ2V0RGlzcGxheWFibGVOYW1lKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKG5hbWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZGlzcGxheWFibGUgbmFtZSBmb3Igb2JqZWN0IHdpdGggcHJvcGVydHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5hbWUgPSAnTXIgQm9iJyxcbiAgICAgICAgICAgIHZhbHVlID0ge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogbmFtZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbHRlcmVkVmFsdWUgPSBmaWx0ZXIodmFsdWUpO1xuXG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKG5hbWUpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
