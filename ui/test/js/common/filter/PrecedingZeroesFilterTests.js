System.register(['test/js/TestInitializer', 'common/filter/FilterModule'], function (_export) {
    /* (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Tests for the preceding zeroes filter
     */

    'use strict';

    var filterModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFilterFilterModule) {
            filterModule = _commonFilterFilterModule['default'];
        }],
        execute: function () {
            describe('precedingZeroesFilter', function () {
                // The filter under test
                var precedingZeroesFilter;

                beforeEach(module(filterModule));

                beforeEach(inject(function (_precedingZeroesFilter_) {
                    precedingZeroesFilter = _precedingZeroesFilter_;
                }));

                it('should remove zeroes from the beinging of a string', function () {
                    var string = '000000000042',
                        filteredString = precedingZeroesFilter(string);
                    expect(filteredString).toEqual('42');
                });

                it('should not remove internal zeros', function () {
                    var string = '0004500201',
                        filteredString = precedingZeroesFilter(string);
                    expect(filteredString).toEqual('4500201');
                });

                it('should not remove trailing zeros', function () {
                    var string = '10000000',
                        filteredString = precedingZeroesFilter(string);
                    expect(filteredString).toEqual(string);
                });

                it('should return undefined when given undefined', function () {
                    var filteredString = precedingZeroesFilter(undefined);
                    expect(filteredString).toEqual(undefined);
                });

                it('should not do anything to strings without leading zeroes', function () {
                    var string = '12304560',
                        filteredString = precedingZeroesFilter(string);
                    expect(filteredString).toEqual(string);
                });

                it('should not barf with null', function () {
                    var string = null,
                        filteredString = precedingZeroesFilter(string);
                    expect(filteredString).toEqual(string);
                });

                it('should not barf with undefined', function () {
                    var string,
                        filteredString = precedingZeroesFilter(string);
                    expect(filteredString).toEqual(string);
                });

                it('should passthrough the empty string', function () {
                    var string = '',
                        filteredString = precedingZeroesFilter(string);
                    expect(filteredString).toEqual(string);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9maWx0ZXIvUHJlY2VkaW5nWmVyb2VzRmlsdGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLCtCQUErQixVQUFVLFNBQVM7Ozs7Ozs7SUFPMUY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJCQUEyQjtZQUNqRixlQUFlLDBCQUEwQjs7UUFFN0MsU0FBUyxZQUFZO1lBTDdCLFNBQVMseUJBQXlCLFlBQVc7O2dCQUV6QyxJQUFJOztnQkFFSixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyx5QkFBeUI7b0JBQ2hELHdCQUF3Qjs7O2dCQUc1QixHQUFHLHNEQUFzRCxZQUFXO29CQUNoRSxJQUFJLFNBQVM7d0JBQ1QsaUJBQWlCLHNCQUFzQjtvQkFDM0MsT0FBTyxnQkFBZ0IsUUFBUTs7O2dCQUduQyxHQUFHLG9DQUFvQyxZQUFXO29CQUM5QyxJQUFJLFNBQVM7d0JBQ1QsaUJBQWlCLHNCQUFzQjtvQkFDM0MsT0FBTyxnQkFBZ0IsUUFBUTs7O2dCQUduQyxHQUFHLG9DQUFvQyxZQUFXO29CQUM5QyxJQUFJLFNBQVM7d0JBQ1QsaUJBQWlCLHNCQUFzQjtvQkFDM0MsT0FBTyxnQkFBZ0IsUUFBUTs7O2dCQUduQyxHQUFHLGdEQUFnRCxZQUFXO29CQUMxRCxJQUFJLGlCQUFpQixzQkFBc0I7b0JBQzNDLE9BQU8sZ0JBQWdCLFFBQVE7OztnQkFHbkMsR0FBRyw0REFBNEQsWUFBVztvQkFDdEUsSUFBSSxTQUFTO3dCQUNULGlCQUFpQixzQkFBc0I7b0JBQzNDLE9BQU8sZ0JBQWdCLFFBQVE7OztnQkFHbkMsR0FBRyw2QkFBNkIsWUFBVztvQkFDdkMsSUFBSSxTQUFTO3dCQUNULGlCQUFpQixzQkFBc0I7b0JBQzNDLE9BQU8sZ0JBQWdCLFFBQVE7OztnQkFHbkMsR0FBRyxrQ0FBa0MsWUFBVztvQkFDNUMsSUFBSTt3QkFDQSxpQkFBaUIsc0JBQXNCO29CQUMzQyxPQUFPLGdCQUFnQixRQUFROzs7Z0JBR25DLEdBQUcsdUNBQXVDLFlBQVc7b0JBQ2pELElBQUksU0FBUzt3QkFDVCxpQkFBaUIsc0JBQXNCO29CQUMzQyxPQUFPLGdCQUFnQixRQUFROzs7OztHQVdwQyIsImZpbGUiOiJjb21tb24vZmlsdGVyL1ByZWNlZGluZ1plcm9lc0ZpbHRlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBmaWx0ZXJNb2R1bGUgZnJvbSAnY29tbW9uL2ZpbHRlci9GaWx0ZXJNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgcHJlY2VkaW5nIHplcm9lcyBmaWx0ZXJcbiAqL1xuXG5kZXNjcmliZSgncHJlY2VkaW5nWmVyb2VzRmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gVGhlIGZpbHRlciB1bmRlciB0ZXN0XG4gICAgdmFyIHByZWNlZGluZ1plcm9lc0ZpbHRlcjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZpbHRlck1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3ByZWNlZGluZ1plcm9lc0ZpbHRlcl8pIHtcbiAgICAgICAgcHJlY2VkaW5nWmVyb2VzRmlsdGVyID0gX3ByZWNlZGluZ1plcm9lc0ZpbHRlcl87XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCByZW1vdmUgemVyb2VzIGZyb20gdGhlIGJlaW5naW5nIG9mIGEgc3RyaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdHJpbmcgPSAnMDAwMDAwMDAwMDQyJyxcbiAgICAgICAgICAgIGZpbHRlcmVkU3RyaW5nID0gcHJlY2VkaW5nWmVyb2VzRmlsdGVyKHN0cmluZyk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFN0cmluZykudG9FcXVhbCgnNDInKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHJlbW92ZSBpbnRlcm5hbCB6ZXJvcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3RyaW5nID0gJzAwMDQ1MDAyMDEnLFxuICAgICAgICAgICAgZmlsdGVyZWRTdHJpbmcgPSBwcmVjZWRpbmdaZXJvZXNGaWx0ZXIoc3RyaW5nKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkU3RyaW5nKS50b0VxdWFsKCc0NTAwMjAxJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCByZW1vdmUgdHJhaWxpbmcgemVyb3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN0cmluZyA9ICcxMDAwMDAwMCcsXG4gICAgICAgICAgICBmaWx0ZXJlZFN0cmluZyA9IHByZWNlZGluZ1plcm9lc0ZpbHRlcihzdHJpbmcpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRTdHJpbmcpLnRvRXF1YWwoc3RyaW5nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHVuZGVmaW5lZCB3aGVuIGdpdmVuIHVuZGVmaW5lZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsdGVyZWRTdHJpbmcgPSBwcmVjZWRpbmdaZXJvZXNGaWx0ZXIodW5kZWZpbmVkKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkU3RyaW5nKS50b0VxdWFsKHVuZGVmaW5lZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCBkbyBhbnl0aGluZyB0byBzdHJpbmdzIHdpdGhvdXQgbGVhZGluZyB6ZXJvZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN0cmluZyA9ICcxMjMwNDU2MCcsXG4gICAgICAgICAgICBmaWx0ZXJlZFN0cmluZyA9IHByZWNlZGluZ1plcm9lc0ZpbHRlcihzdHJpbmcpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRTdHJpbmcpLnRvRXF1YWwoc3RyaW5nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IGJhcmYgd2l0aCBudWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdHJpbmcgPSBudWxsLFxuICAgICAgICAgICAgZmlsdGVyZWRTdHJpbmcgPSBwcmVjZWRpbmdaZXJvZXNGaWx0ZXIoc3RyaW5nKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkU3RyaW5nKS50b0VxdWFsKHN0cmluZyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCBiYXJmIHdpdGggdW5kZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdHJpbmcsXG4gICAgICAgICAgICBmaWx0ZXJlZFN0cmluZyA9IHByZWNlZGluZ1plcm9lc0ZpbHRlcihzdHJpbmcpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRTdHJpbmcpLnRvRXF1YWwoc3RyaW5nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcGFzc3Rocm91Z2ggdGhlIGVtcHR5IHN0cmluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3RyaW5nID0gJycsXG4gICAgICAgICAgICBmaWx0ZXJlZFN0cmluZyA9IHByZWNlZGluZ1plcm9lc0ZpbHRlcihzdHJpbmcpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRTdHJpbmcpLnRvRXF1YWwoc3RyaW5nKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
