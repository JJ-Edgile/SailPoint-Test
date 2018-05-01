System.register(['test/js/TestInitializer', 'common/search/SearchModule', 'test/js/common/util/SpDateServiceMocker'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var searchModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonSearchSearchModule) {
            searchModule = _commonSearchSearchModule['default'];
        }, function (_testJsCommonUtilSpDateServiceMocker) {}],
        execute: function () {

            describe('filterValueService', function () {
                var MID_DAY_STRING = '1410152400000|1410238799999';
                var MIDNIGHT_STRING = '1410152400000|1410238799999';
                var filterValueService = undefined;

                function PrototypeHasValue() {}
                PrototypeHasValue.prototype.foo = 'defaultValue';

                beforeEach(module(searchModule));

                beforeEach(inject(function (_filterValueService_) {
                    filterValueService = _filterValueService_;
                }));

                describe('getQueryParams', function () {
                    var MID_DAY = 1410171835732,
                        MIDNIGHT = 1410152400000,
                        ELEVEN_FITTY_NINE = 1410238799999;

                    beforeEach(inject(function (spDateService, spDateServiceMocker) {
                        // Mock the spDateService to return what we expect even though the
                        // timezone may vary depending on the machine that runs the test.
                        spyOn(spDateService, 'setDateComponents').and.callFake(spDateServiceMocker.mockSetDateComponents([{
                            date: MID_DAY,
                            hours: 0,
                            minutes: 0,
                            seconds: 0,
                            millis: 0,
                            returnValue: new Date(MIDNIGHT)
                        }, {
                            date: MIDNIGHT,
                            hours: 0,
                            minutes: 0,
                            seconds: 0,
                            millis: 0,
                            returnValue: new Date(MIDNIGHT)
                        }, {
                            date: ELEVEN_FITTY_NINE,
                            hours: 0,
                            minutes: 0,
                            seconds: 0,
                            millis: 0,
                            returnValue: new Date(MIDNIGHT)
                        }, {
                            date: MID_DAY,
                            hours: 23,
                            minutes: 59,
                            seconds: 59,
                            millis: 999,
                            returnValue: new Date(ELEVEN_FITTY_NINE)
                        }, {
                            date: MIDNIGHT,
                            hours: 23,
                            minutes: 59,
                            seconds: 59,
                            millis: 999,
                            returnValue: new Date(ELEVEN_FITTY_NINE)
                        }, {
                            date: ELEVEN_FITTY_NINE,
                            hours: 23,
                            minutes: 59,
                            seconds: 59,
                            millis: 999,
                            returnValue: new Date(ELEVEN_FITTY_NINE)
                        }]));
                    }));

                    it('should accept null params', function () {
                        var params = filterValueService.getQueryParams(null);
                        expect(params).not.toBeDefined();
                    });

                    it('should accept undefined params', function () {
                        var filters, params;
                        params = filterValueService.getQueryParams(filters);
                        expect(params).not.toBeDefined();
                    });

                    it('should convert dates to a start/end format', function () {
                        // Mid-day -> Mon Sep 08 2014 05:23:55 GMT-0500 (Central Daylight Time)
                        // Midnight -> Mon Sep 08 2014 00:00:00 GMT-0500 (Central Daylight Time)
                        // 11:59 -> Mon Sep 08 2014 23:59:59 GMT-0500 (Central Daylight Time)
                        var midDay = new Date(MID_DAY),
                            midnight = new Date(MIDNIGHT),
                            elevenFittyNine = new Date(ELEVEN_FITTY_NINE),
                            params = {
                            midDay: {
                                value: midDay
                            },
                            midnight: {
                                value: midnight
                            },
                            elevenFittyNine: {
                                value: elevenFittyNine
                            }
                        };

                        params = filterValueService.getQueryParams(params);

                        expect(params.midDay.value).toEqual(MID_DAY_STRING);
                        expect(params.midnight.value).toEqual(MIDNIGHT_STRING);
                        expect(params.elevenFittyNine.value).toEqual('1410152400000|1410238799999');
                    });

                    it('should covert a date range to a pipe separated string', function () {
                        var midDay = new Date(MID_DAY),
                            midNight = new Date(MIDNIGHT),
                            dateRange = {
                            value: {
                                startDate: midDay,
                                endDate: midNight
                            }
                        },
                            dateRangeOnlyStart = {
                            value: {
                                startDate: midDay,
                                endDate: undefined
                            }
                        },
                            params = {
                            dateRangeFilter: dateRange,
                            dateRangeOnlyStartFilter: dateRangeOnlyStart
                        },
                            queryParams = filterValueService.getQueryParams(params);
                        expect(queryParams.dateRangeFilter.value).toEqual(MID_DAY_STRING + '|' + MIDNIGHT_STRING);
                        expect(queryParams.dateRangeOnlyStartFilter.value).toEqual(MID_DAY_STRING + '||');
                    });

                    it('should convert object to given objectValueProperty', function () {
                        var params = {
                            filterThis: {
                                value: {
                                    thing1: true,
                                    name: 'Thing1',
                                    id: 'ThingID',
                                    somethingelse: 'thisandthat'
                                }
                            },
                            filterThat: {
                                value: {
                                    derp: 'derp',
                                    id: 'thatThing'
                                }
                            }
                        },
                            newParams = filterValueService.getQueryParams(params, 'id');
                        expect(newParams.filterThis.value).toEqual('ThingID');

                        // should get name with missing objectValueProperty
                        newParams = filterValueService.getQueryParams(params);
                        expect(newParams.filterThis.value).toEqual('Thing1');

                        // should get id if name not defined with missing objectValueProperty
                        expect(newParams.filterThat.value).toEqual('thatThing');

                        // Should check in order if array is passed
                        newParams = filterValueService.getQueryParams(params, ['nothing', 'somethingelse', 'derp']);
                        expect(newParams.filterThis.value).toEqual('thisandthat');
                        expect(newParams.filterThat.value).toEqual('derp');

                        // Should leave object alone with null objectValueProperty value
                        newParams = filterValueService.getQueryParams(params, null);
                        expect(newParams.filterThis.value).toEqual(params.filterThis.value);
                    });

                    it('should exclude FilterValue if not valid value', function () {
                        var params = {
                            someFilter: {
                                value: '1234'
                            }
                        },
                            newParams = undefined;
                        spyOn(filterValueService, 'hasValidValue').and.returnValue(false);
                        newParams = filterValueService.getQueryParams(params);
                        expect(newParams.someFilter).not.toBeDefined();
                    });

                    it('should keep FilterValue with invalid value if preserveInvalidVaues is true', function () {
                        var params = {
                            someFilter: {
                                value: '1234'
                            }
                        },
                            newParams = undefined;
                        spyOn(filterValueService, 'hasValidValue').and.returnValue(false);
                        newParams = filterValueService.getQueryParams(params, undefined, true);
                        expect(newParams.someFilter).toEqual(params.someFilter);
                    });

                    it('should convert all entries in value array', function () {
                        var params = {
                            someFilter: {
                                value: [{
                                    id: 'entry1',
                                    displayName: 'blah'
                                }, {
                                    id: 'entry2',
                                    displayName: 'blah2'
                                }]
                            }
                        },
                            newParams = undefined;
                        newParams = filterValueService.getQueryParams(params);
                        expect(newParams.someFilter.value).toEqual(['entry1', 'entry2']);
                    });
                });

                describe('clearValue()', function () {
                    it('sets an array value to an empty array', function () {
                        var param = {
                            value: ['1', '2', '3']
                        };

                        filterValueService.clearValue(param);
                        expect(param.value).toEqual([]);
                    });

                    it('sets a non-array value to undefined', function () {
                        var param = {
                            value: 'abcd'
                        };

                        filterValueService.clearValue(param);
                        expect(param.value).toEqual(undefined);
                    });

                    it('sets a date range to empty date range', function () {
                        var param = {
                            value: {
                                startDate: new Date(),
                                endDate: new Date()
                            }
                        },
                            result = {
                            startDate: undefined,
                            endDate: undefined
                        };
                        filterValueService.clearValue(param);
                        expect(param.value).toEqual(result);
                    });
                });

                describe('hasValidValue()', function () {
                    it('returns false if value is undefined', function () {
                        var filterValue = {
                            value: undefined
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(false);
                    });

                    it('returns false if value is empty string', function () {
                        var filterValue = {
                            value: ''
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(false);
                    });

                    it('returns false if value is strings that are just spaces', function () {
                        var filterValue = {
                            value: '      '
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(false);
                    });

                    it('returns true for non-empty strings', function () {
                        var filterValue = {
                            value: 'yay'
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(true);
                    });

                    it('returns false if value is empty object', function () {
                        var filterValue = {
                            value: {}
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(false);
                    });

                    /* Tracking less than obvious behavior */
                    it('scrubs objects that do not declare properties', function () {
                        var filterValue = {
                            value: new PrototypeHasValue()
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(false);
                    });

                    it('leaves non-empty objects', function () {
                        var filterValue = {
                            value: { something: 'good' }
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(true);
                    });

                    it('returns false for empty arrays', function () {
                        var filterValue = {
                            value: []
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(false);
                    });

                    it('returns true for non-empty arrays', function () {
                        var filterValue = {
                            value: ['uno', 'dos']
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(true);
                    });

                    it('returns true for values that are numbers', function () {
                        var filterValue = {
                            value: 43
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(true);
                    });

                    it('returns true for for values that are dates', function () {
                        var filterValue = {
                            value: new Date()
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(true);
                    });

                    it('returns true for values that are booleans', function () {
                        var filterValue = {
                            value: true
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(true);
                        filterValue.value = false;
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(true);
                    });

                    it('returns false if it is a date range with neither start or end date set', function () {
                        var filterValue = {
                            value: {
                                startDate: null,
                                endDate: null
                            }
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(false);
                    });

                    it('returns true for valid date range', function () {
                        var filterValue = {
                            value: {
                                startDate: new Date(),
                                endDate: null
                            }
                        };
                        expect(filterValueService.hasValidValue(filterValue)).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zZWFyY2gvRmlsdGVyVmFsdWVTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDhCQUE4Qiw0Q0FBNEMsVUFBVSxTQUFTOzs7SUFHckk7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJCQUEyQjtZQUNqRixlQUFlLDBCQUEwQjtXQUMxQyxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsc0JBQXNCLFlBQU07Z0JBQ2pDLElBQU0saUJBQWlCO2dCQUN2QixJQUFNLGtCQUFrQjtnQkFDeEIsSUFBSSxxQkFBa0I7O2dCQUV0QixTQUFTLG9CQUFvQjtnQkFDN0Isa0JBQWtCLFVBQVUsTUFBTTs7Z0JBRWxDLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLHNCQUF5QjtvQkFDeEMscUJBQXFCOzs7Z0JBR3pCLFNBQVMsa0JBQWtCLFlBQVc7b0JBQ2xDLElBQUksVUFBVTt3QkFDVixXQUFXO3dCQUNYLG9CQUFvQjs7b0JBRXhCLFdBQVcsT0FBTyxVQUFTLGVBQWUscUJBQXFCOzs7d0JBRzNELE1BQU0sZUFBZSxxQkFBcUIsSUFBSSxTQUMxQyxvQkFBb0Isc0JBQXNCLENBQUM7NEJBQ3ZDLE1BQU07NEJBQ04sT0FBTzs0QkFDUCxTQUFTOzRCQUNULFNBQVM7NEJBQ1QsUUFBUTs0QkFDUixhQUFhLElBQUksS0FBSzsyQkFDdkI7NEJBQ0MsTUFBTTs0QkFDTixPQUFPOzRCQUNQLFNBQVM7NEJBQ1QsU0FBUzs0QkFDVCxRQUFROzRCQUNSLGFBQWEsSUFBSSxLQUFLOzJCQUN2Qjs0QkFDQyxNQUFNOzRCQUNOLE9BQU87NEJBQ1AsU0FBUzs0QkFDVCxTQUFTOzRCQUNULFFBQVE7NEJBQ1IsYUFBYSxJQUFJLEtBQUs7MkJBQ3ZCOzRCQUNDLE1BQU07NEJBQ04sT0FBTzs0QkFDUCxTQUFTOzRCQUNU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LGNBQWMsY0FBYyxRQUFROzs7b0JBR2xFLEdBQUcsMEVBQTBFLFlBQU07d0JBQy9FLElBQUksY0FBYzs0QkFDZCxPQUFPO2dDQUNILFdBQVc7Z0NBQ1gsU0FBUzs7O3dCQUdqQixPQUFPLG1CQUFtQixjQUFjLGNBQWMsUUFBUTs7O29CQUdsRSxHQUFHLHFDQUFxQyxZQUFNO3dCQUMxQyxJQUFJLGNBQWM7NEJBQ2QsT0FBTztnQ0FDSCxXQUFXLElBQUk7Z0NBQ2YsU0FBUzs7O3dCQUdqQixPQUFPLG1CQUFtQixjQUFjLGNBQWMsUUFBUTs7Ozs7O0dBZXZFIiwiZmlsZSI6ImNvbW1vbi9zZWFyY2gvRmlsdGVyVmFsdWVTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgc2VhcmNoTW9kdWxlIGZyb20gJ2NvbW1vbi9zZWFyY2gvU2VhcmNoTW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9jb21tb24vdXRpbC9TcERhdGVTZXJ2aWNlTW9ja2VyJztcblxuZGVzY3JpYmUoJ2ZpbHRlclZhbHVlU2VydmljZScsICgpID0+IHtcbiAgICBjb25zdCBNSURfREFZX1NUUklORyA9ICcxNDEwMTUyNDAwMDAwfDE0MTAyMzg3OTk5OTknO1xuICAgIGNvbnN0IE1JRE5JR0hUX1NUUklORyA9ICcxNDEwMTUyNDAwMDAwfDE0MTAyMzg3OTk5OTknO1xuICAgIGxldCBmaWx0ZXJWYWx1ZVNlcnZpY2U7XG5cbiAgICBmdW5jdGlvbiBQcm90b3R5cGVIYXNWYWx1ZSgpIHt9XG4gICAgUHJvdG90eXBlSGFzVmFsdWUucHJvdG90eXBlLmZvbyA9ICdkZWZhdWx0VmFsdWUnO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoc2VhcmNoTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX2ZpbHRlclZhbHVlU2VydmljZV8pID0+IHtcbiAgICAgICAgZmlsdGVyVmFsdWVTZXJ2aWNlID0gX2ZpbHRlclZhbHVlU2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2dldFF1ZXJ5UGFyYW1zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBNSURfREFZID0gMTQxMDE3MTgzNTczMixcbiAgICAgICAgICAgIE1JRE5JR0hUID0gMTQxMDE1MjQwMDAwMCxcbiAgICAgICAgICAgIEVMRVZFTl9GSVRUWV9OSU5FID0gMTQxMDIzODc5OTk5OTtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihzcERhdGVTZXJ2aWNlLCBzcERhdGVTZXJ2aWNlTW9ja2VyKSB7XG4gICAgICAgICAgICAvLyBNb2NrIHRoZSBzcERhdGVTZXJ2aWNlIHRvIHJldHVybiB3aGF0IHdlIGV4cGVjdCBldmVuIHRob3VnaCB0aGVcbiAgICAgICAgICAgIC8vIHRpbWV6b25lIG1heSB2YXJ5IGRlcGVuZGluZyBvbiB0aGUgbWFjaGluZSB0aGF0IHJ1bnMgdGhlIHRlc3QuXG4gICAgICAgICAgICBzcHlPbihzcERhdGVTZXJ2aWNlLCAnc2V0RGF0ZUNvbXBvbmVudHMnKS5hbmQuY2FsbEZha2UoXG4gICAgICAgICAgICAgICAgc3BEYXRlU2VydmljZU1vY2tlci5tb2NrU2V0RGF0ZUNvbXBvbmVudHMoW3tcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogTUlEX0RBWSxcbiAgICAgICAgICAgICAgICAgICAgaG91cnM6IDAsXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZXM6IDAsXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZHM6IDAsXG4gICAgICAgICAgICAgICAgICAgIG1pbGxpczogMCxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWU6IG5ldyBEYXRlKE1JRE5JR0hUKVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogTUlETklHSFQsXG4gICAgICAgICAgICAgICAgICAgIGhvdXJzOiAwLFxuICAgICAgICAgICAgICAgICAgICBtaW51dGVzOiAwLFxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRzOiAwLFxuICAgICAgICAgICAgICAgICAgICBtaWxsaXM6IDAsXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlOiBuZXcgRGF0ZShNSUROSUdIVClcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IEVMRVZFTl9GSVRUWV9OSU5FLFxuICAgICAgICAgICAgICAgICAgICBob3VyczogMCxcbiAgICAgICAgICAgICAgICAgICAgbWludXRlczogMCxcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kczogMCxcbiAgICAgICAgICAgICAgICAgICAgbWlsbGlzOiAwLFxuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZTogbmV3IERhdGUoTUlETklHSFQpXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBNSURfREFZLFxuICAgICAgICAgICAgICAgICAgICBob3VyczogMjMsXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZXM6IDU5LFxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRzOiA1OSxcbiAgICAgICAgICAgICAgICAgICAgbWlsbGlzOiA5OTksXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlOiBuZXcgRGF0ZShFTEVWRU5fRklUVFlfTklORSlcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IE1JRE5JR0hULFxuICAgICAgICAgICAgICAgICAgICBob3VyczogMjMsXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZXM6IDU5LFxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRzOiA1OSxcbiAgICAgICAgICAgICAgICAgICAgbWlsbGlzOiA5OTksXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlOiBuZXcgRGF0ZShFTEVWRU5fRklUVFlfTklORSlcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IEVMRVZFTl9GSVRUWV9OSU5FLFxuICAgICAgICAgICAgICAgICAgICBob3VyczogMjMsXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZXM6IDU5LFxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRzOiA1OSxcbiAgICAgICAgICAgICAgICAgICAgbWlsbGlzOiA5OTksXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlOiBuZXcgRGF0ZShFTEVWRU5fRklUVFlfTklORSlcbiAgICAgICAgICAgICAgICB9XSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIGFjY2VwdCBudWxsIHBhcmFtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IGZpbHRlclZhbHVlU2VydmljZS5nZXRRdWVyeVBhcmFtcyhudWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChwYXJhbXMpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGFjY2VwdCB1bmRlZmluZWQgcGFyYW1zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVycywgcGFyYW1zO1xuICAgICAgICAgICAgcGFyYW1zID0gZmlsdGVyVmFsdWVTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1zKGZpbHRlcnMpO1xuICAgICAgICAgICAgZXhwZWN0KHBhcmFtcykubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY29udmVydCBkYXRlcyB0byBhIHN0YXJ0L2VuZCBmb3JtYXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIE1pZC1kYXkgLT4gTW9uIFNlcCAwOCAyMDE0IDA1OjIzOjU1IEdNVC0wNTAwIChDZW50cmFsIERheWxpZ2h0IFRpbWUpXG4gICAgICAgICAgICAvLyBNaWRuaWdodCAtPiBNb24gU2VwIDA4IDIwMTQgMDA6MDA6MDAgR01ULTA1MDAgKENlbnRyYWwgRGF5bGlnaHQgVGltZSlcbiAgICAgICAgICAgIC8vIDExOjU5IC0+IE1vbiBTZXAgMDggMjAxNCAyMzo1OTo1OSBHTVQtMDUwMCAoQ2VudHJhbCBEYXlsaWdodCBUaW1lKVxuICAgICAgICAgICAgdmFyIG1pZERheSA9IG5ldyBEYXRlKE1JRF9EQVkpLFxuICAgICAgICAgICAgICAgIG1pZG5pZ2h0ID0gbmV3IERhdGUoTUlETklHSFQpLFxuICAgICAgICAgICAgICAgIGVsZXZlbkZpdHR5TmluZSA9IG5ldyBEYXRlKEVMRVZFTl9GSVRUWV9OSU5FKSxcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIG1pZERheToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG1pZERheVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtaWRuaWdodDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG1pZG5pZ2h0XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVsZXZlbkZpdHR5TmluZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZXZlbkZpdHR5TmluZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcGFyYW1zID0gZmlsdGVyVmFsdWVTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1zKHBhcmFtcyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChwYXJhbXMubWlkRGF5LnZhbHVlKS50b0VxdWFsKE1JRF9EQVlfU1RSSU5HKTtcbiAgICAgICAgICAgIGV4cGVjdChwYXJhbXMubWlkbmlnaHQudmFsdWUpLnRvRXF1YWwoTUlETklHSFRfU1RSSU5HKTtcbiAgICAgICAgICAgIGV4cGVjdChwYXJhbXMuZWxldmVuRml0dHlOaW5lLnZhbHVlKS50b0VxdWFsKCcxNDEwMTUyNDAwMDAwfDE0MTAyMzg3OTk5OTknKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjb3ZlcnQgYSBkYXRlIHJhbmdlIHRvIGEgcGlwZSBzZXBhcmF0ZWQgc3RyaW5nJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1pZERheSA9IG5ldyBEYXRlKE1JRF9EQVkpLFxuICAgICAgICAgICAgICAgIG1pZE5pZ2h0ID0gbmV3IERhdGUoTUlETklHSFQpLFxuICAgICAgICAgICAgICAgIGRhdGVSYW5nZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogbWlkRGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogbWlkTmlnaHRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0ZVJhbmdlT25seVN0YXJ0ID0ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiBtaWREYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmREYXRlOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlUmFuZ2VGaWx0ZXI6IGRhdGVSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVJhbmdlT25seVN0YXJ0RmlsdGVyIDogZGF0ZVJhbmdlT25seVN0YXJ0XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtcyA9IGZpbHRlclZhbHVlU2VydmljZS5nZXRRdWVyeVBhcmFtcyhwYXJhbXMpO1xuICAgICAgICAgICAgZXhwZWN0KHF1ZXJ5UGFyYW1zLmRhdGVSYW5nZUZpbHRlci52YWx1ZSkudG9FcXVhbChgJHtNSURfREFZX1NUUklOR318JHtNSUROSUdIVF9TVFJJTkd9YCk7XG4gICAgICAgICAgICBleHBlY3QocXVlcnlQYXJhbXMuZGF0ZVJhbmdlT25seVN0YXJ0RmlsdGVyLnZhbHVlKS50b0VxdWFsKGAke01JRF9EQVlfU1RSSU5HfXx8YCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY29udmVydCBvYmplY3QgdG8gZ2l2ZW4gb2JqZWN0VmFsdWVQcm9wZXJ0eScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJUaGlzOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGluZzE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnVGhpbmcxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnVGhpbmdJRCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb21ldGhpbmdlbHNlOiAndGhpc2FuZHRoYXQnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZpbHRlclRoYXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcnA6ICdkZXJwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAndGhhdFRoaW5nJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxuZXdQYXJhbXMgPSBmaWx0ZXJWYWx1ZVNlcnZpY2UuZ2V0UXVlcnlQYXJhbXMocGFyYW1zLCAnaWQnKTtcbiAgICAgICAgICAgIGV4cGVjdChuZXdQYXJhbXMuZmlsdGVyVGhpcy52YWx1ZSkudG9FcXVhbCgnVGhpbmdJRCcpO1xuXG4gICAgICAgICAgICAvLyBzaG91bGQgZ2V0IG5hbWUgd2l0aCBtaXNzaW5nIG9iamVjdFZhbHVlUHJvcGVydHlcbiAgICAgICAgICAgIG5ld1BhcmFtcyA9IGZpbHRlclZhbHVlU2VydmljZS5nZXRRdWVyeVBhcmFtcyhwYXJhbXMpO1xuICAgICAgICAgICAgZXhwZWN0KG5ld1BhcmFtcy5maWx0ZXJUaGlzLnZhbHVlKS50b0VxdWFsKCdUaGluZzEnKTtcblxuICAgICAgICAgICAgLy8gc2hvdWxkIGdldCBpZCBpZiBuYW1lIG5vdCBkZWZpbmVkIHdpdGggbWlzc2luZyBvYmplY3RWYWx1ZVByb3BlcnR5XG4gICAgICAgICAgICBleHBlY3QobmV3UGFyYW1zLmZpbHRlclRoYXQudmFsdWUpLnRvRXF1YWwoJ3RoYXRUaGluZycpO1xuXG4gICAgICAgICAgICAvLyBTaG91bGQgY2hlY2sgaW4gb3JkZXIgaWYgYXJyYXkgaXMgcGFzc2VkXG4gICAgICAgICAgICBuZXdQYXJhbXMgPSBmaWx0ZXJWYWx1ZVNlcnZpY2UuZ2V0UXVlcnlQYXJhbXMocGFyYW1zLCBbJ25vdGhpbmcnLCAnc29tZXRoaW5nZWxzZScsICdkZXJwJ10pO1xuICAgICAgICAgICAgZXhwZWN0KG5ld1BhcmFtcy5maWx0ZXJUaGlzLnZhbHVlKS50b0VxdWFsKCd0aGlzYW5kdGhhdCcpO1xuICAgICAgICAgICAgZXhwZWN0KG5ld1BhcmFtcy5maWx0ZXJUaGF0LnZhbHVlKS50b0VxdWFsKCdkZXJwJyk7XG5cbiAgICAgICAgICAgIC8vIFNob3VsZCBsZWF2ZSBvYmplY3QgYWxvbmUgd2l0aCBudWxsIG9iamVjdFZhbHVlUHJvcGVydHkgdmFsdWVcbiAgICAgICAgICAgIG5ld1BhcmFtcyA9IGZpbHRlclZhbHVlU2VydmljZS5nZXRRdWVyeVBhcmFtcyhwYXJhbXMsIG51bGwpO1xuICAgICAgICAgICAgZXhwZWN0KG5ld1BhcmFtcy5maWx0ZXJUaGlzLnZhbHVlKS50b0VxdWFsKHBhcmFtcy5maWx0ZXJUaGlzLnZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBleGNsdWRlIEZpbHRlclZhbHVlIGlmIG5vdCB2YWxpZCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgc29tZUZpbHRlcjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJzEyMzQnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgbmV3UGFyYW1zO1xuICAgICAgICAgICAgc3B5T24oZmlsdGVyVmFsdWVTZXJ2aWNlLCAnaGFzVmFsaWRWYWx1ZScpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICBuZXdQYXJhbXMgPSBmaWx0ZXJWYWx1ZVNlcnZpY2UuZ2V0UXVlcnlQYXJhbXMocGFyYW1zKTtcbiAgICAgICAgICAgIGV4cGVjdChuZXdQYXJhbXMuc29tZUZpbHRlcikubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQga2VlcCBGaWx0ZXJWYWx1ZSB3aXRoIGludmFsaWQgdmFsdWUgaWYgcHJlc2VydmVJbnZhbGlkVmF1ZXMgaXMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgc29tZUZpbHRlcjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJzEyMzQnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgbmV3UGFyYW1zO1xuICAgICAgICAgICAgc3B5T24oZmlsdGVyVmFsdWVTZXJ2aWNlLCAnaGFzVmFsaWRWYWx1ZScpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICBuZXdQYXJhbXMgPSBmaWx0ZXJWYWx1ZVNlcnZpY2UuZ2V0UXVlcnlQYXJhbXMocGFyYW1zLCB1bmRlZmluZWQsIHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KG5ld1BhcmFtcy5zb21lRmlsdGVyKS50b0VxdWFsKHBhcmFtcy5zb21lRmlsdGVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjb252ZXJ0IGFsbCBlbnRyaWVzIGluIHZhbHVlIGFycmF5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBzb21lRmlsdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdlbnRyeTEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdibGFoJ1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2VudHJ5MicsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2JsYWgyJ1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG5ld1BhcmFtcztcbiAgICAgICAgICAgIG5ld1BhcmFtcyA9IGZpbHRlclZhbHVlU2VydmljZS5nZXRRdWVyeVBhcmFtcyhwYXJhbXMpO1xuICAgICAgICAgICAgZXhwZWN0KG5ld1BhcmFtcy5zb21lRmlsdGVyLnZhbHVlKS50b0VxdWFsKFsnZW50cnkxJywgJ2VudHJ5MiddKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2xlYXJWYWx1ZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2V0cyBhbiBhcnJheSB2YWx1ZSB0byBhbiBlbXB0eSBhcnJheScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogWycxJywgJzInLCAnMyddXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmaWx0ZXJWYWx1ZVNlcnZpY2UuY2xlYXJWYWx1ZShwYXJhbSk7XG4gICAgICAgICAgICBleHBlY3QocGFyYW0udmFsdWUpLnRvRXF1YWwoW10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2V0cyBhIG5vbi1hcnJheSB2YWx1ZSB0byB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICAgICAgdmFsdWU6ICdhYmNkJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZmlsdGVyVmFsdWVTZXJ2aWNlLmNsZWFyVmFsdWUocGFyYW0pO1xuICAgICAgICAgICAgZXhwZWN0KHBhcmFtLnZhbHVlKS50b0VxdWFsKHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzZXRzIGEgZGF0ZSByYW5nZSB0byBlbXB0eSBkYXRlIHJhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogbmV3IERhdGUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICBzdGFydERhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBlbmREYXRlOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmaWx0ZXJWYWx1ZVNlcnZpY2UuY2xlYXJWYWx1ZShwYXJhbSk7XG4gICAgICAgICAgICBleHBlY3QocGFyYW0udmFsdWUpLnRvRXF1YWwocmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFzVmFsaWRWYWx1ZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB2YWx1ZSBpcyB1bmRlZmluZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJWYWx1ZSA9IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclZhbHVlU2VydmljZS5oYXNWYWxpZFZhbHVlKGZpbHRlclZhbHVlKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHZhbHVlIGlzIGVtcHR5IHN0cmluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlclZhbHVlID0ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiAnJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJWYWx1ZVNlcnZpY2UuaGFzVmFsaWRWYWx1ZShmaWx0ZXJWYWx1ZSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB2YWx1ZSBpcyBzdHJpbmdzIHRoYXQgYXJlIGp1c3Qgc3BhY2VzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgdmFsdWU6ICcgICAgICAnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclZhbHVlU2VydmljZS5oYXNWYWxpZFZhbHVlKGZpbHRlclZhbHVlKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIG5vbi1lbXB0eSBzdHJpbmdzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgdmFsdWU6ICd5YXknXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclZhbHVlU2VydmljZS5oYXNWYWxpZFZhbHVlKGZpbHRlclZhbHVlKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdmFsdWUgaXMgZW1wdHkgb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclZhbHVlU2VydmljZS5oYXNWYWxpZFZhbHVlKGZpbHRlclZhbHVlKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qIFRyYWNraW5nIGxlc3MgdGhhbiBvYnZpb3VzIGJlaGF2aW9yICovXG4gICAgICAgIGl0KCdzY3J1YnMgb2JqZWN0cyB0aGF0IGRvIG5vdCBkZWNsYXJlIHByb3BlcnRpZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJWYWx1ZSA9IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmV3IFByb3RvdHlwZUhhc1ZhbHVlKClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3QoZmlsdGVyVmFsdWVTZXJ2aWNlLmhhc1ZhbGlkVmFsdWUoZmlsdGVyVmFsdWUpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2xlYXZlcyBub24tZW1wdHkgb2JqZWN0cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlclZhbHVlID0ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB7IHNvbWV0aGluZzogJ2dvb2QnfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJWYWx1ZVNlcnZpY2UuaGFzVmFsaWRWYWx1ZShmaWx0ZXJWYWx1ZSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBlbXB0eSBhcnJheXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJWYWx1ZSA9IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3QoZmlsdGVyVmFsdWVTZXJ2aWNlLmhhc1ZhbGlkVmFsdWUoZmlsdGVyVmFsdWUpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3Igbm9uLWVtcHR5IGFycmF5cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlclZhbHVlID0ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBbJ3VubycsICdkb3MnXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJWYWx1ZVNlcnZpY2UuaGFzVmFsaWRWYWx1ZShmaWx0ZXJWYWx1ZSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIHZhbHVlcyB0aGF0IGFyZSBudW1iZXJzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IDQzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclZhbHVlU2VydmljZS5oYXNWYWxpZFZhbHVlKGZpbHRlclZhbHVlKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgZm9yIHZhbHVlcyB0aGF0IGFyZSBkYXRlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlclZhbHVlID0ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclZhbHVlU2VydmljZS5oYXNWYWxpZFZhbHVlKGZpbHRlclZhbHVlKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgdmFsdWVzIHRoYXQgYXJlIGJvb2xlYW5zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3QoZmlsdGVyVmFsdWVTZXJ2aWNlLmhhc1ZhbGlkVmFsdWUoZmlsdGVyVmFsdWUpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZmlsdGVyVmFsdWUudmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJWYWx1ZVNlcnZpY2UuaGFzVmFsaWRWYWx1ZShmaWx0ZXJWYWx1ZSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGl0IGlzIGEgZGF0ZSByYW5nZSB3aXRoIG5laXRoZXIgc3RhcnQgb3IgZW5kIGRhdGUgc2V0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpbHRlclZhbHVlID0ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3QoZmlsdGVyVmFsdWVTZXJ2aWNlLmhhc1ZhbGlkVmFsdWUoZmlsdGVyVmFsdWUpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgdmFsaWQgZGF0ZSByYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJWYWx1ZSA9IHtcbiAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclZhbHVlU2VydmljZS5oYXNWYWxpZFZhbHVlKGZpbHRlclZhbHVlKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
