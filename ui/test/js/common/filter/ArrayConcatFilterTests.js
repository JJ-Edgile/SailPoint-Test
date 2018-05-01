System.register(['test/js/TestInitializer', 'common/filter/FilterModule'], function (_export) {
    'use strict';

    var filterModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFilterFilterModule) {
            filterModule = _commonFilterFilterModule['default'];
        }],
        execute: function () {

            describe('arrayConcat', function () {
                var filter = undefined;

                beforeEach(module(filterModule));

                beforeEach(inject(function (_arrayConcatFilter_) {
                    filter = _arrayConcatFilter_;
                }));

                it('returns same value for null', function () {
                    expect(filter(null)).toEqual(null);
                });

                it('returns same value for non array string', function () {
                    var value = '123';
                    expect(filter(value)).toEqual(value);
                });

                it('returns same value for wrong object', function () {
                    var value = { something: 'else' };
                    expect(filter(value)).toEqual(value);
                });

                it('returns concatenation of array', function () {
                    var output = 'orange, apple, banana',
                        value = ['orange', 'apple', 'banana'],
                        filteredValue = filter(value);
                    expect(filteredValue).toEqual(output);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9maWx0ZXIvQXJyYXlDb25jYXRGaWx0ZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsK0JBQStCLFVBQVUsU0FBUztJQUE5Rjs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkJBQTJCO1lBQ2pGLGVBQWUsMEJBQTBCOztRQUU3QyxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsZUFBZSxZQUFXO2dCQUMvQixJQUFJLFNBQU07O2dCQUVWLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLHFCQUFxQjtvQkFDNUMsU0FBUzs7O2dCQUdiLEdBQUcsK0JBQStCLFlBQVc7b0JBQ3pDLE9BQU8sT0FBTyxPQUFPLFFBQVE7OztnQkFHakMsR0FBRywyQ0FBMkMsWUFBVztvQkFDckQsSUFBSSxRQUFRO29CQUNaLE9BQU8sT0FBTyxRQUFRLFFBQVE7OztnQkFHbEMsR0FBRyx1Q0FBdUMsWUFBVztvQkFDakQsSUFBSSxRQUFRLEVBQUUsV0FBVztvQkFDekIsT0FBTyxPQUFPLFFBQVEsUUFBUTs7O2dCQUdsQyxHQUFHLGtDQUFrQyxZQUFXO29CQUM1QyxJQUFJLFNBQVM7d0JBQ2IsUUFBUSxDQUFDLFVBQVUsU0FBUzt3QkFDNUIsZ0JBQWdCLE9BQU87b0JBQ3ZCLE9BQU8sZUFBZSxRQUFROzs7OztHQVVuQyIsImZpbGUiOiJjb21tb24vZmlsdGVyL0FycmF5Q29uY2F0RmlsdGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGZpbHRlck1vZHVsZSBmcm9tICdjb21tb24vZmlsdGVyL0ZpbHRlck1vZHVsZSc7XG5cbmRlc2NyaWJlKCdhcnJheUNvbmNhdCcsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBmaWx0ZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmaWx0ZXJNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9hcnJheUNvbmNhdEZpbHRlcl8pIHtcbiAgICAgICAgZmlsdGVyID0gX2FycmF5Q29uY2F0RmlsdGVyXztcbiAgICB9KSk7XG5cbiAgICBpdCgncmV0dXJucyBzYW1lIHZhbHVlIGZvciBudWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmaWx0ZXIobnVsbCkpLnRvRXF1YWwobnVsbCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBzYW1lIHZhbHVlIGZvciBub24gYXJyYXkgc3RyaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9ICcxMjMnO1xuICAgICAgICBleHBlY3QoZmlsdGVyKHZhbHVlKSkudG9FcXVhbCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBzYW1lIHZhbHVlIGZvciB3cm9uZyBvYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHZhbHVlID0geyBzb21ldGhpbmc6ICdlbHNlJyB9O1xuICAgICAgICBleHBlY3QoZmlsdGVyKHZhbHVlKSkudG9FcXVhbCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBjb25jYXRlbmF0aW9uIG9mIGFycmF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBvdXRwdXQgPSAnb3JhbmdlLCBhcHBsZSwgYmFuYW5hJyxcbiAgICAgICAgdmFsdWUgPSBbJ29yYW5nZScsICdhcHBsZScsICdiYW5hbmEnXSxcbiAgICAgICAgZmlsdGVyZWRWYWx1ZSA9IGZpbHRlcih2YWx1ZSk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKG91dHB1dCk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
