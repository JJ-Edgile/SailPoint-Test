System.register(['test/js/TestInitializer', 'common/filter/FilterModule'], function (_export) {
    /* (c) Copyright 2014 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * @author: michael.hide
     * Created: 8/28/14 2:58 PM
     */
    'use strict';

    var filterModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFilterFilterModule) {
            filterModule = _commonFilterFilterModule['default'];
        }],
        execute: function () {
            describe('risk filter', function () {
                // The filter under test
                var riskFilter,
                    filteredValue,
                    bandConfig = {
                    colorBands: [{
                        color: 'low',
                        lower: '0',
                        upper: '250'
                    }, {
                        color: 'medium_low',
                        lower: '251',
                        upper: '500'
                    }, {
                        color: 'medium_high',
                        lower: '501',
                        upper: '750'
                    }, {
                        color: 'high',
                        lower: '751',
                        upper: '1000'
                    }]
                };

                beforeEach(module(filterModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_BAND_CONFIG', bandConfig);
                }));

                beforeEach(inject(function (_riskFilter_) {
                    riskFilter = _riskFilter_;
                }));

                function testRiskFilterFormat(riskValue, riskClass) {
                    var onlyColorHigh = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

                    var expectedResult = '<span class="riskIndicator ' + riskClass + '">' + riskValue + '</span>';
                    filteredValue = riskFilter(riskValue, undefined, onlyColorHigh);
                    expect(filteredValue).toEqual(expectedResult);
                }

                it('should format the riskValue', function () {
                    testRiskFilterFormat(200, 'ri_low');
                    testRiskFilterFormat(300, 'ri_medium_low');
                    testRiskFilterFormat(501, 'ri_medium_high');
                    testRiskFilterFormat(800, 'ri_high');
                });

                it('should return the raw value if it is not a number', function () {
                    filteredValue = riskFilter('abcd');
                    expect(filteredValue).toEqual('abcd');
                });

                it('should return the raw value if it is not defined', function () {
                    filteredValue = riskFilter();
                    expect(filteredValue).not.toBeDefined();
                });

                describe('only color high scores', function () {
                    it('should add color when set to false', function () {
                        testRiskFilterFormat(5, 'ri_low', false);
                    });

                    it('should add color when set to true for a high score', function () {
                        testRiskFilterFormat(833, 'ri_high', true);
                    });

                    it('should not add color when set to true for a low score', function () {
                        filteredValue = riskFilter(500, undefined, true);
                        expect(filteredValue).toEqual(500);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9maWx0ZXIvUmlza0ZpbHRlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwrQkFBK0IsVUFBVSxTQUFTOzs7Ozs7O0lBQzlGOztJQVFJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwyQkFBMkI7WUFDakYsZUFBZSwwQkFBMEI7O1FBRTdDLFNBQVMsWUFBWTtZQUo3QixTQUFTLGVBQWUsWUFBVzs7Z0JBRS9CLElBQUk7b0JBQVk7b0JBQ1osYUFBYTtvQkFDTCxZQUFhLENBQ1Q7d0JBQ0ksT0FBTzt3QkFDUCxPQUFPO3dCQUNQLE9BQU87dUJBRVg7d0JBQ0ksT0FBTzt3QkFDUCxPQUFPO3dCQUNQLE9BQU87dUJBRVg7d0JBQ0ksT0FBTzt3QkFDUCxPQUFPO3dCQUNQLE9BQU87dUJBRVg7d0JBQ0ksT0FBTzt3QkFDUCxPQUFPO3dCQUNQLE9BQU87Ozs7Z0JBSTNCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxrQkFBa0I7OztnQkFHeEMsV0FBVyxPQUFPLFVBQVMsY0FBYztvQkFDckMsYUFBYTs7O2dCQUdqQixTQUFTLHFCQUFxQixXQUFXLFdBQWtDO29CQUczRCxJQUhvQyxnQkFBYSxVQUFBLFVBQUEsS0FBQSxVQUFBLE9BQUEsWUFBRyxRQUFLLFVBQUE7O29CQUNyRSxJQUFJLGlCQUFpQixnQ0FBZ0MsWUFBWSxPQUFPLFlBQVk7b0JBQ3BGLGdCQUFnQixXQUFXLFdBQVcsV0FBVztvQkFDakQsT0FBTyxlQUFlLFFBQVE7OztnQkFHbEMsR0FBRywrQkFBK0IsWUFBVztvQkFDekMscUJBQXFCLEtBQUs7b0JBQzFCLHFCQUFxQixLQUFLO29CQUMxQixxQkFBcUIsS0FBSztvQkFDMUIscUJBQXFCLEtBQUs7OztnQkFHOUIsR0FBRyxxREFBcUQsWUFBVztvQkFDL0QsZ0JBQWdCLFdBQVc7b0JBQzNCLE9BQU8sZUFBZSxRQUFROzs7Z0JBR2xDLEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlELGdCQUFnQjtvQkFDaEIsT0FBTyxlQUFlLElBQUk7OztnQkFHOUIsU0FBUywwQkFBMEIsWUFBTTtvQkFDckMsR0FBRyxzQ0FBc0MsWUFBTTt3QkFDM0MscUJBQXFCLEdBQUcsVUFBVTs7O29CQUd0QyxHQUFHLHNEQUFzRCxZQUFNO3dCQUMzRCxxQkFBcUIsS0FBSyxXQUFXOzs7b0JBR3pDLEdBQUcseURBQXlELFlBQU07d0JBQzlELGdCQUFnQixXQUFXLEtBQUssV0FBVzt3QkFDM0MsT0FBTyxlQUFlLFFBQVE7Ozs7OztHQVV2QyIsImZpbGUiOiJjb21tb24vZmlsdGVyL1Jpc2tGaWx0ZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNCBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBmaWx0ZXJNb2R1bGUgZnJvbSAnY29tbW9uL2ZpbHRlci9GaWx0ZXJNb2R1bGUnO1xuXG4vKipcbiAqIEBhdXRob3I6IG1pY2hhZWwuaGlkZVxuICogQ3JlYXRlZDogOC8yOC8xNCAyOjU4IFBNXG4gKi9cbmRlc2NyaWJlKCdyaXNrIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIFRoZSBmaWx0ZXIgdW5kZXIgdGVzdFxuICAgIHZhciByaXNrRmlsdGVyLCBmaWx0ZXJlZFZhbHVlLFxuICAgICAgICBiYW5kQ29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGNvbG9yQmFuZHMgOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnbG93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VyOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cHBlcjogJzI1MCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdtZWRpdW1fbG93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VyOiAnMjUxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyOiAnNTAwJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ21lZGl1bV9oaWdoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VyOiAnNTAxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyOiAnNzUwJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2hpZ2gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXI6ICc3NTEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBwZXI6ICcxMDAwJ1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICB9O1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZmlsdGVyTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQkFORF9DT05GSUcnLCBiYW5kQ29uZmlnKTtcbiAgICB9KSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfcmlza0ZpbHRlcl8pIHtcbiAgICAgICAgcmlza0ZpbHRlciA9IF9yaXNrRmlsdGVyXztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiB0ZXN0Umlza0ZpbHRlckZvcm1hdChyaXNrVmFsdWUsIHJpc2tDbGFzcywgb25seUNvbG9ySGlnaCA9IGZhbHNlKSB7XG4gICAgICAgIHZhciBleHBlY3RlZFJlc3VsdCA9ICc8c3BhbiBjbGFzcz1cInJpc2tJbmRpY2F0b3IgJyArIHJpc2tDbGFzcyArICdcIj4nICsgcmlza1ZhbHVlICsgJzwvc3Bhbj4nO1xuICAgICAgICBmaWx0ZXJlZFZhbHVlID0gcmlza0ZpbHRlcihyaXNrVmFsdWUsIHVuZGVmaW5lZCwgb25seUNvbG9ySGlnaCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKGV4cGVjdGVkUmVzdWx0KTtcbiAgICB9XG5cbiAgICBpdCgnc2hvdWxkIGZvcm1hdCB0aGUgcmlza1ZhbHVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRlc3RSaXNrRmlsdGVyRm9ybWF0KDIwMCwgJ3JpX2xvdycpO1xuICAgICAgICB0ZXN0Umlza0ZpbHRlckZvcm1hdCgzMDAsICdyaV9tZWRpdW1fbG93Jyk7XG4gICAgICAgIHRlc3RSaXNrRmlsdGVyRm9ybWF0KDUwMSwgJ3JpX21lZGl1bV9oaWdoJyk7XG4gICAgICAgIHRlc3RSaXNrRmlsdGVyRm9ybWF0KDgwMCwgJ3JpX2hpZ2gnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSByYXcgdmFsdWUgaWYgaXQgaXMgbm90IGEgbnVtYmVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZpbHRlcmVkVmFsdWUgPSByaXNrRmlsdGVyKCdhYmNkJyk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKCdhYmNkJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgcmF3IHZhbHVlIGlmIGl0IGlzIG5vdCBkZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZpbHRlcmVkVmFsdWUgPSByaXNrRmlsdGVyKCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbmx5IGNvbG9yIGhpZ2ggc2NvcmVzJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGFkZCBjb2xvciB3aGVuIHNldCB0byBmYWxzZScsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RSaXNrRmlsdGVyRm9ybWF0KDUsICdyaV9sb3cnLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGNvbG9yIHdoZW4gc2V0IHRvIHRydWUgZm9yIGEgaGlnaCBzY29yZScsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RSaXNrRmlsdGVyRm9ybWF0KDgzMywgJ3JpX2hpZ2gnLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgYWRkIGNvbG9yIHdoZW4gc2V0IHRvIHRydWUgZm9yIGEgbG93IHNjb3JlJywgKCkgPT4ge1xuICAgICAgICAgICAgZmlsdGVyZWRWYWx1ZSA9IHJpc2tGaWx0ZXIoNTAwLCB1bmRlZmluZWQsIHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsdWUpLnRvRXF1YWwoNTAwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
