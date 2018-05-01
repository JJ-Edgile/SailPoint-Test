System.register(['test/js/TestInitializer', 'common/search/SearchModule'], function (_export) {

    /**
     * Tests for the SearchData model object.
     */
    'use strict';

    var searchModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonSearchSearchModule) {
            searchModule = _commonSearchSearchModule['default'];
        }],
        execute: function () {
            describe('SearchData', function () {
                var SearchData, searchData, copyData, FilterValue, filterValueService;

                beforeEach(module(searchModule));

                /**
                 * Setup the SearchData class and a default data to test with.
                 */
                beforeEach(inject(function (_SearchData_, _FilterValue_, _filterValueService_) {
                    FilterValue = _FilterValue_;
                    filterValueService = _filterValueService_;

                    SearchData = _SearchData_;
                    searchData = new SearchData();

                    copyData = new SearchData();
                    copyData.searchTerm = 'sup homie?!';
                    copyData.filterValues['willItBlend?'] = new FilterValue({
                        value: true
                    });
                    copyData.filterValues['liquidatedColor'] = new FilterValue({
                        value: 'green'
                    });
                }));

                describe('constructor', function () {
                    it('defaults to no search term', function () {
                        expect(searchData.searchTerm).toBeUndefined();
                    });

                    it('defaults to an empty filter values object', function () {
                        expect(searchData.filterValues).toEqual({});
                    });

                    it('should copy values when constructed with parameter', function () {
                        var newSearchData = new SearchData(copyData);
                        expect(newSearchData.searchTerm).toEqual(copyData.searchTerm);
                        expect(newSearchData.filterValues).toEqual(copyData.filterValues);
                    });
                });

                it('allows setting a search term', function () {
                    searchData.searchTerm = 'bazinga!';
                    expect(searchData.searchTerm).toEqual('bazinga!');
                });

                describe('filter values', function () {
                    describe('clearFilterValues()', function () {
                        it('calls filterValueService.clearValues for each filter value', function () {
                            searchData.filterValues.hi = new FilterValue({
                                value: 'mom'
                            });
                            searchData.filterValues.bye = new FilterValue({
                                value: 'felecia'
                            });

                            spyOn(filterValueService, 'clearValue');
                            searchData.clearFilterValues();
                            expect(filterValueService.clearValue.calls.count()).toEqual(2);
                            expect(filterValueService.clearValue.calls.all()[0].args).toEqual([searchData.filterValues.hi]);
                            expect(filterValueService.clearValue.calls.all()[1].args).toEqual([searchData.filterValues.bye]);
                        });
                    });

                    describe('hasFilterValues()', function () {
                        it('returns true if any valid values are set', function () {
                            searchData.filterValues.hi = new FilterValue({
                                value: 'mom'
                            });
                            spyOn(filterValueService, 'hasValidValue').and.returnValue(true);
                            expect(searchData.hasFilterValues()).toEqual(true);
                        });

                        it('returns false if no valid values are set', function () {
                            searchData.filterValues.hi = new FilterValue({
                                value: 'mom'
                            });
                            spyOn(filterValueService, 'hasValidValue').and.returnValue(false);
                            expect(searchData.hasFilterValues()).toEqual(false);
                        });
                    });

                    describe('initializeFilterValues()', function () {
                        it('adds empty FilterValue objects for any filters', function () {
                            var filters = [{
                                property: 'hi'
                            }, {
                                property: 'bye'
                            }];
                            searchData.initializeFilterValues(filters);
                            expect(searchData.filterValues.hi).toEqual(new FilterValue({
                                operation: FilterValue.Operation.Equals
                            }));
                            expect(searchData.filterValues.bye).toEqual(new FilterValue({
                                operation: FilterValue.Operation.Equals
                            }));
                        });

                        it('leaves existing filters alone if already defined', function () {
                            var filters = [{
                                property: 'hi'
                            }],
                                existingValue = new FilterValue({
                                value: 'mom'
                            });

                            searchData.filterValues.hi = existingValue;
                            searchData.initializeFilterValues(filters);
                            expect(searchData.filterValues.hi).toEqual(existingValue);
                        });
                    });

                    describe('clearFilterValue()', function () {
                        it('clears the value in the FilterValue for the given filter', function () {
                            var filters = [{
                                property: 'hi'
                            }, {
                                property: 'bye'
                            }];

                            searchData.filterValues.hi = new FilterValue({
                                value: 'mom'
                            });
                            searchData.filterValues.bye = new FilterValue({
                                value: 'felecia'
                            });
                            searchData.clearFilterValue(filters[0]);
                            expect(searchData.filterValues.hi.value).not.toBeDefined();
                            expect(searchData.filterValues.bye.value).toEqual('felecia');
                        });
                    });
                });

                describe('filter groups', function () {
                    it('should start with undefined filter groups', function () {
                        expect(searchData.filterGroups).not.toBeDefined();
                    });

                    it('should start with undefined additional filters', function () {
                        expect(searchData.additionalFilters).not.toBeDefined();
                    });

                    describe('initializeFilters()', function () {
                        it('setupFilterGroups groups filters', function () {
                            // less than 4 filters: there should be one group
                            var filters = [{}, {}, {}];
                            searchData.initializeFilters(filters);
                            expect(searchData.filterGroups.length).toEqual(1);

                            // 4 filters: there should be one group
                            searchData.filterGroups = undefined;
                            filters = [{}, {}, {}, {}];
                            searchData.initializeFilters(filters);
                            expect(searchData.filterGroups.length).toEqual(1);

                            // 5 filters: there should be two groups
                            searchData.filterGroups = undefined;
                            filters = [{}, {}, {}, {}, {}];
                            searchData.initializeFilters(filters);
                            expect(searchData.filterGroups.length).toEqual(2);
                        });

                        it('setupFilterGroups groups filters into 2 arrays for additional filters', function () {
                            // 5 filters with one marked as additional filter
                            var filters = [{}, {}, {}, {}, {}];
                            filters[0].additional = true;
                            searchData.initializeFilters(filters);
                            expect(searchData.filterGroups.length).toEqual(1);
                            // array to store any additional filters
                            expect(searchData.additionalFilters.length).toEqual(1);
                        });
                    });

                    describe('areFiltersInitialized', function () {
                        it('returns false if neither filter groups or additional filters are defined', function () {
                            expect(searchData.areFiltersInitialized()).toEqual(false);
                        });

                        it('returns true if filter groups are defined but empty', function () {
                            searchData.filterGroups = [];
                            expect(searchData.areFiltersInitialized()).toEqual(true);
                        });

                        it('return true if filter groups are non empty', function () {
                            searchData.filterGroups = [{ some: 'filter ' }];
                            expect(searchData.areFiltersInitialized()).toEqual(true);
                        });

                        it('returns true if additional filters are defined but empty', function () {
                            searchData.additionalFilters = [];
                            expect(searchData.areFiltersInitialized()).toEqual(true);
                        });

                        it('return true if additional filters are non empty', function () {
                            searchData.additionalFilters = [{ some: 'filter ' }];
                            expect(searchData.areFiltersInitialized()).toEqual(true);
                        });
                    });

                    describe('hasFilters', function () {
                        it('returns false if there are no filters', function () {
                            expect(searchData.hasFilters()).toEqual(false);
                            searchData.filterGroups = [];
                            searchData.additionalFilters = [];
                            expect(searchData.hasFilters()).toEqual(false);
                        });

                        it('returns true if there filters', function () {
                            searchData.filterGroups = [[{ some: 'Filter' }]];
                            expect(searchData.hasFilters()).toEqual(true);
                            searchData.filterGroups = undefined;
                            searchData.additionalFilters = [{ some: 'Filter' }];
                            expect(searchData.hasFilters()).toEqual(true);
                        });
                    });

                    describe('pushAdditionalFilterToGroups()', function () {
                        it('adds a new filter group to addedFilterGroups if first additional filter', function () {
                            var additionalFilters = [{
                                property: 'prop1'
                            }];
                            searchData.additionalFilters = angular.copy(additionalFilters);
                            searchData.addedFilterGroups = [];
                            searchData.pushAdditionalFilterToGroups(additionalFilters[0]);
                            expect(searchData.addedFilterGroups).toEqual([[additionalFilters[0]]]);
                        });

                        it('adds to existing filter group in addedFilterGroups', function () {
                            var additionalFilters = [{
                                property: 'prop1'
                            }];
                            searchData.additionalFilters = angular.copy(additionalFilters);
                            searchData.addedFilterGroups = [[{}]];
                            searchData.pushAdditionalFilterToGroups(additionalFilters[0]);
                            expect(searchData.addedFilterGroups).toEqual([[{}, additionalFilters[0]]]);
                        });

                        it('removes from additionalFilters list', function () {
                            var additionalFilters = [{
                                property: 'prop1'
                            }];
                            searchData.additionalFilters = additionalFilters;
                            searchData.addedFilterGroups = [];
                            searchData.pushAdditionalFilterToGroups(additionalFilters[0]);
                            expect(searchData.additionalFilters.length).toEqual(0);
                        });
                    });

                    describe('popAdditionalFilterFromGroups()', function () {
                        it('removes a filter from addedFilterGroups', function () {
                            var filter1 = {
                                property: 'prop'
                            },
                                filter2 = {
                                property: 'prop1'
                            };
                            searchData.additionalFilters = [];
                            searchData.addedFilterGroups = [[filter1, filter2]];
                            searchData.popAdditionalFilterFromGroups(filter1);
                            expect(searchData.addedFilterGroups).toEqual([[filter2]]);
                        });

                        it('removes empty filter group from addedFilterGroups', function () {
                            var filter1 = {
                                property: 'prop1'
                            },
                                filter2 = {
                                property: 'prop2'
                            },
                                filter3 = {
                                property: 'prop3'
                            },
                                filter4 = {
                                property: 'prop4'
                            },
                                filter5 = {
                                property: 'prop5'
                            };
                            searchData.additionalFilters = [];
                            searchData.addedFilterGroups = [[filter1, filter2, filter3, filter4], [filter5]];
                            searchData.popAdditionalFilterFromGroups(filter2);
                            expect(searchData.addedFilterGroups.length).toEqual(1);
                            expect(searchData.addedFilterGroups[0]).toEqual([filter1, filter3, filter4, filter5]);
                        });

                        it('clears filter value', function () {
                            var filter1 = {
                                property: 'prop1'
                            };
                            spyOn(searchData, 'clearFilterValue');
                            searchData.addedFilterGroups = [[filter1]];
                            searchData.additionalFilters = [];
                            searchData.popAdditionalFilterFromGroups(filter1);
                            expect(searchData.clearFilterValue).toHaveBeenCalledWith(filter1);
                        });

                        it('adds filter back to additionalFilters list', function () {
                            var filter1 = {
                                property: 'prop1'
                            };
                            searchData.addedFilterGroups = [[filter1]];
                            searchData.additionalFilters = [];
                            searchData.popAdditionalFilterFromGroups(filter1);
                            expect(searchData.additionalFilters).toEqual([filter1]);
                        });
                    });

                    describe('popAllAdditionalFiltersFromGroups()', function () {
                        it('pops all the filters', function () {
                            var filter1 = {
                                property: 'prop1'
                            },
                                filter2 = {
                                property: 'prop2'
                            },
                                filter3 = {
                                property: 'prop3'
                            },
                                filter4 = {
                                property: 'prop4'
                            },
                                filter5 = {
                                property: 'prop5'
                            };
                            searchData.additionalFilters = [];
                            searchData.addedFilterGroups = [[filter1, filter2, filter3, filter4], [filter5]];
                            spyOn(searchData, 'popAdditionalFilterFromGroups').and.callThrough();
                            searchData.popAllAdditionalFiltersFromGroups();
                            expect(searchData.popAdditionalFilterFromGroups.calls.count()).toEqual(5);
                            expect(searchData.addedFilterGroups).toEqual([]);
                        });
                    });

                    describe('hasAdditionalFilters()', function () {
                        it('returns true if there are any additional filters', function () {
                            searchData.addedFilterGroups = [];
                            searchData.additionalFilters = [{}];
                            expect(searchData.hasAdditionalFilters()).toEqual(true);
                        });

                        it('returns true if there are any added filters in addedFilterGroups', function () {
                            searchData.addedFilterGroups = [[{}]];
                            searchData.additionalFilters = [];
                            expect(searchData.hasAdditionalFilters()).toEqual(true);
                        });

                        it('returns false if no additional filter or added filter groups', function () {
                            searchData.addedFilterGroups = [];
                            searchData.additionalFilters = [];
                            expect(searchData.hasAdditionalFilters()).toEqual(false);
                        });

                        it('returns false if no additional filter or added filter groups are defined', function () {
                            searchData.addedFilterGroups = undefined;
                            searchData.additionalFilters = undefined;
                            expect(searchData.hasAdditionalFilters()).toEqual(false);
                        });
                    });
                });

                describe('merge()', function () {
                    it('should merge SearchData values', function () {
                        searchData.merge(copyData);
                        expect(searchData.searchTerm).toEqual(copyData.searchTerm);
                        expect(searchData.filterValues).toEqual(copyData.filterValues);
                    });

                    it('should not overwrite the filter groups or additional filters if not defined', function () {
                        var filterGroups = [[{}, {}]],
                            additionalFilters = [{}],
                            addedFilterGroups = [[{}]];
                        searchData.filterGroups = filterGroups;
                        searchData.additionalFilters = additionalFilters;
                        searchData.addedFilterGroups = addedFilterGroups;
                        searchData.merge(copyData);
                        expect(searchData.filterGroups).toEqual(filterGroups);
                        expect(searchData.additionalFilters).toEqual(additionalFilters);
                        expect(searchData.addedFilterGroups).toEqual(addedFilterGroups);
                    });

                    it('should copy filter groups and additional filters if defined', function () {
                        var filterGroups = [[{}, {}]],
                            additionalFilters = [{}],
                            addedFilterGroups = [[{}]];
                        copyData.filterGroups = filterGroups;
                        copyData.additionalFilters = additionalFilters;
                        copyData.addedFilterGroups = addedFilterGroups;
                        searchData.merge(copyData);
                        expect(searchData.filterGroups).toEqual(filterGroups);
                        expect(searchData.additionalFilters).toEqual(additionalFilters);
                        expect(searchData.addedFilterGroups).toEqual(addedFilterGroups);
                    });
                });

                it('should update filterValues rather than replace it', function () {
                    var filterValues = searchData.filterValues;
                    searchData.clearFilterValues();
                    // Assure we are using object equality
                    expect(searchData.filterValues === filterValues).toBeTruthy();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zZWFyY2gvU2VhcmNoRGF0YVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwrQkFBK0IsVUFBVSxTQUFTOzs7OztJQUsxRjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkJBQTJCO1lBQ2pGLGVBQWUsMEJBQTBCOztRQUU3QyxTQUFTLFlBQVk7WUFON0IsU0FBUyxjQUFjLFlBQVc7Z0JBQzlCLElBQUksWUFBWSxZQUFZLFVBQVUsYUFBYTs7Z0JBRW5ELFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLGNBQWMsZUFBZSxzQkFBc0I7b0JBQzFFLGNBQWM7b0JBQ2QscUJBQXFCOztvQkFFckIsYUFBYTtvQkFDYixhQUFhLElBQUk7O29CQUVqQixXQUFXLElBQUk7b0JBQ2YsU0FBUyxhQUFhO29CQUN0QixTQUFTLGFBQWEsa0JBQWtCLElBQUksWUFBWTt3QkFDcEQsT0FBTzs7b0JBRVgsU0FBUyxhQUFhLHFCQUFxQixJQUFJLFlBQVk7d0JBQ3ZELE9BQU87Ozs7Z0JBSWYsU0FBUyxlQUFlLFlBQVc7b0JBQy9CLEdBQUcsOEJBQThCLFlBQVc7d0JBQ3hDLE9BQU8sV0FBVyxZQUFZOzs7b0JBR2xDLEdBQUcsNkNBQTZDLFlBQVc7d0JBQ3ZELE9BQU8sV0FBVyxjQUFjLFFBQVE7OztvQkFHNUMsR0FBRyxzREFBc0QsWUFBVzt3QkFDaEUsSUFBSSxnQkFBZ0IsSUFBSSxXQUFXO3dCQUNuQyxPQUFPLGNBQWMsWUFBWSxRQUFRLFNBQVM7d0JBQ2xELE9BQU8sY0FBYyxjQUFjLFFBQVEsU0FBUzs7OztnQkFJNUQsR0FBRyxnQ0FBZ0MsWUFBVztvQkFDMUMsV0FBVyxhQUFhO29CQUN4QixPQUFPLFdBQVcsWUFBWSxRQUFROzs7Z0JBRzFDLFNBQVMsaUJBQWlCLFlBQVc7b0JBQ2pDLFNBQVMsdUJBQXVCLFlBQU07d0JBQ2xD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QUFvQjt3QkFDN0IsV0FBVyxNQUFNO3dCQUNqQixPQUFPLFdBQVcsY0FBYyxRQUFRO3dCQUN4QyxPQUFPLFdBQVcsbUJBQW1CLFFBQVE7d0JBQzdDLE9BQU8sV0FBVyxtQkFBbUIsUUFBUTs7OztnQkFJckQsR0FBRyxxREFBcUQsWUFBVztvQkFDL0QsSUFBSSxlQUFlLFdBQVc7b0JBQzlCLFdBQVc7O29CQUVYLE9BQU8sV0FBVyxpQkFBaUIsY0FBYzs7Ozs7R0FzQnREIiwiZmlsZSI6ImNvbW1vbi9zZWFyY2gvU2VhcmNoRGF0YVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBzZWFyY2hNb2R1bGUgZnJvbSAnY29tbW9uL3NlYXJjaC9TZWFyY2hNb2R1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgU2VhcmNoRGF0YSBtb2RlbCBvYmplY3QuXHJcbiAqL1xyXG5kZXNjcmliZSgnU2VhcmNoRGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIFNlYXJjaERhdGEsIHNlYXJjaERhdGEsIGNvcHlEYXRhLCBGaWx0ZXJWYWx1ZSwgZmlsdGVyVmFsdWVTZXJ2aWNlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHNlYXJjaE1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIFNlYXJjaERhdGEgY2xhc3MgYW5kIGEgZGVmYXVsdCBkYXRhIHRvIHRlc3Qgd2l0aC5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1NlYXJjaERhdGFfLCBfRmlsdGVyVmFsdWVfLCBfZmlsdGVyVmFsdWVTZXJ2aWNlXykge1xyXG4gICAgICAgIEZpbHRlclZhbHVlID0gX0ZpbHRlclZhbHVlXztcclxuICAgICAgICBmaWx0ZXJWYWx1ZVNlcnZpY2UgPSBfZmlsdGVyVmFsdWVTZXJ2aWNlXztcclxuXHJcbiAgICAgICAgU2VhcmNoRGF0YSA9IF9TZWFyY2hEYXRhXztcclxuICAgICAgICBzZWFyY2hEYXRhID0gbmV3IFNlYXJjaERhdGEoKTtcclxuXHJcbiAgICAgICAgY29weURhdGEgPSBuZXcgU2VhcmNoRGF0YSgpO1xyXG4gICAgICAgIGNvcHlEYXRhLnNlYXJjaFRlcm0gPSAnc3VwIGhvbWllPyEnO1xyXG4gICAgICAgIGNvcHlEYXRhLmZpbHRlclZhbHVlc1snd2lsbEl0QmxlbmQ/J10gPSBuZXcgRmlsdGVyVmFsdWUoe1xyXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvcHlEYXRhLmZpbHRlclZhbHVlc1snbGlxdWlkYXRlZENvbG9yJ10gPSBuZXcgRmlsdGVyVmFsdWUoe1xyXG4gICAgICAgICAgICB2YWx1ZTogJ2dyZWVuJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdkZWZhdWx0cyB0byBubyBzZWFyY2ggdGVybScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5zZWFyY2hUZXJtKS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkZWZhdWx0cyB0byBhbiBlbXB0eSBmaWx0ZXIgdmFsdWVzIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMpLnRvRXF1YWwoe30pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGNvcHkgdmFsdWVzIHdoZW4gY29uc3RydWN0ZWQgd2l0aCBwYXJhbWV0ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG5ld1NlYXJjaERhdGEgPSBuZXcgU2VhcmNoRGF0YShjb3B5RGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChuZXdTZWFyY2hEYXRhLnNlYXJjaFRlcm0pLnRvRXF1YWwoY29weURhdGEuc2VhcmNoVGVybSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChuZXdTZWFyY2hEYXRhLmZpbHRlclZhbHVlcykudG9FcXVhbChjb3B5RGF0YS5maWx0ZXJWYWx1ZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2FsbG93cyBzZXR0aW5nIGEgc2VhcmNoIHRlcm0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZWFyY2hEYXRhLnNlYXJjaFRlcm0gPSAnYmF6aW5nYSEnO1xyXG4gICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLnNlYXJjaFRlcm0pLnRvRXF1YWwoJ2JhemluZ2EhJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZmlsdGVyIHZhbHVlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRlc2NyaWJlKCdjbGVhckZpbHRlclZhbHVlcygpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdCgnY2FsbHMgZmlsdGVyVmFsdWVTZXJ2aWNlLmNsZWFyVmFsdWVzIGZvciBlYWNoIGZpbHRlciB2YWx1ZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuZmlsdGVyVmFsdWVzLmhpID0gbmV3IEZpbHRlclZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ21vbSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMuYnllID0gbmV3IEZpbHRlclZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2ZlbGVjaWEnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzcHlPbihmaWx0ZXJWYWx1ZVNlcnZpY2UsICdjbGVhclZhbHVlJyk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmNsZWFyRmlsdGVyVmFsdWVzKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZmlsdGVyVmFsdWVTZXJ2aWNlLmNsZWFyVmFsdWUuY2FsbHMuY291bnQoKSkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJWYWx1ZVNlcnZpY2UuY2xlYXJWYWx1ZS5jYWxscy5hbGwoKVswXS5hcmdzKS50b0VxdWFsKFtzZWFyY2hEYXRhLmZpbHRlclZhbHVlcy5oaV0pO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZpbHRlclZhbHVlU2VydmljZS5jbGVhclZhbHVlLmNhbGxzLmFsbCgpWzFdLmFyZ3MpLnRvRXF1YWwoW3NlYXJjaERhdGEuZmlsdGVyVmFsdWVzLmJ5ZV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2hhc0ZpbHRlclZhbHVlcygpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGFueSB2YWxpZCB2YWx1ZXMgYXJlIHNldCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuZmlsdGVyVmFsdWVzLmhpID0gbmV3IEZpbHRlclZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ21vbSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc3B5T24oZmlsdGVyVmFsdWVTZXJ2aWNlLCAnaGFzVmFsaWRWYWx1ZScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmhhc0ZpbHRlclZhbHVlcygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vIHZhbGlkIHZhbHVlcyBhcmUgc2V0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMuaGkgPSBuZXcgRmlsdGVyVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnbW9tJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihmaWx0ZXJWYWx1ZVNlcnZpY2UsICdoYXNWYWxpZFZhbHVlJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmhhc0ZpbHRlclZhbHVlcygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdpbml0aWFsaXplRmlsdGVyVmFsdWVzKCknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdhZGRzIGVtcHR5IEZpbHRlclZhbHVlIG9iamVjdHMgZm9yIGFueSBmaWx0ZXJzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnaGknXHJcbiAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2J5ZSdcclxuICAgICAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5pbml0aWFsaXplRmlsdGVyVmFsdWVzKGZpbHRlcnMpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuZmlsdGVyVmFsdWVzLmhpKS50b0VxdWFsKG5ldyBGaWx0ZXJWYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uOiBGaWx0ZXJWYWx1ZS5PcGVyYXRpb24uRXF1YWxzXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMuYnllKS50b0VxdWFsKG5ldyBGaWx0ZXJWYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uOiBGaWx0ZXJWYWx1ZS5PcGVyYXRpb24uRXF1YWxzXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2xlYXZlcyBleGlzdGluZyBmaWx0ZXJzIGFsb25lIGlmIGFscmVhZHkgZGVmaW5lZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJzID0gW3tcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2hpJ1xyXG4gICAgICAgICAgICAgICAgfV0sIGV4aXN0aW5nVmFsdWUgPSBuZXcgRmlsdGVyVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnbW9tJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMuaGkgPSBleGlzdGluZ1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5pbml0aWFsaXplRmlsdGVyVmFsdWVzKGZpbHRlcnMpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuZmlsdGVyVmFsdWVzLmhpKS50b0VxdWFsKGV4aXN0aW5nVmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2NsZWFyRmlsdGVyVmFsdWUoKScsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ2NsZWFycyB0aGUgdmFsdWUgaW4gdGhlIEZpbHRlclZhbHVlIGZvciB0aGUgZ2l2ZW4gZmlsdGVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnaGknXHJcbiAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2J5ZSdcclxuICAgICAgICAgICAgICAgIH1dO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuZmlsdGVyVmFsdWVzLmhpID0gbmV3IEZpbHRlclZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ21vbSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMuYnllID0gbmV3IEZpbHRlclZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2ZlbGVjaWEnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuY2xlYXJGaWx0ZXJWYWx1ZShmaWx0ZXJzWzBdKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmZpbHRlclZhbHVlcy5oaS52YWx1ZSkubm90LnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMuYnllLnZhbHVlKS50b0VxdWFsKCdmZWxlY2lhJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2ZpbHRlciBncm91cHMnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBzdGFydCB3aXRoIHVuZGVmaW5lZCBmaWx0ZXIgZ3JvdXBzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5maWx0ZXJHcm91cHMpLm5vdC50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHN0YXJ0IHdpdGggdW5kZWZpbmVkIGFkZGl0aW9uYWwgZmlsdGVycycsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuYWRkaXRpb25hbEZpbHRlcnMpLm5vdC50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnaW5pdGlhbGl6ZUZpbHRlcnMoKScsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ3NldHVwRmlsdGVyR3JvdXBzIGdyb3VwcyBmaWx0ZXJzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXNzIHRoYW4gNCBmaWx0ZXJzOiB0aGVyZSBzaG91bGQgYmUgb25lIGdyb3VwXHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVycyA9IFsge30sIHt9LCB7fSBdO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5pbml0aWFsaXplRmlsdGVycyhmaWx0ZXJzKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmZpbHRlckdyb3Vwcy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gNCBmaWx0ZXJzOiB0aGVyZSBzaG91bGQgYmUgb25lIGdyb3VwXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmZpbHRlckdyb3VwcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnMgPSBbIHt9LCB7fSwge30sIHt9XTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuaW5pdGlhbGl6ZUZpbHRlcnMoZmlsdGVycyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5maWx0ZXJHcm91cHMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIDUgZmlsdGVyczogdGhlcmUgc2hvdWxkIGJlIHR3byBncm91cHNcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuZmlsdGVyR3JvdXBzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVycyA9IFsge30sIHt9LCB7fSwge30sIHt9XTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuaW5pdGlhbGl6ZUZpbHRlcnMoZmlsdGVycyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5maWx0ZXJHcm91cHMubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzZXR1cEZpbHRlckdyb3VwcyBncm91cHMgZmlsdGVycyBpbnRvIDIgYXJyYXlzIGZvciBhZGRpdGlvbmFsIGZpbHRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8vIDUgZmlsdGVycyB3aXRoIG9uZSBtYXJrZWQgYXMgYWRkaXRpb25hbCBmaWx0ZXJcclxuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJzID0gWyB7fSwge30sIHt9LCB7fSwge30gXTtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnNbMF0uYWRkaXRpb25hbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmluaXRpYWxpemVGaWx0ZXJzKGZpbHRlcnMpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuZmlsdGVyR3JvdXBzLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgICAgIC8vIGFycmF5IHRvIHN0b3JlIGFueSBhZGRpdGlvbmFsIGZpbHRlcnNcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmFkZGl0aW9uYWxGaWx0ZXJzLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdhcmVGaWx0ZXJzSW5pdGlhbGl6ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5laXRoZXIgZmlsdGVyIGdyb3VwcyBvciBhZGRpdGlvbmFsIGZpbHRlcnMgYXJlIGRlZmluZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5hcmVGaWx0ZXJzSW5pdGlhbGl6ZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBmaWx0ZXIgZ3JvdXBzIGFyZSBkZWZpbmVkIGJ1dCBlbXB0eScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuZmlsdGVyR3JvdXBzID0gW107XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5hcmVGaWx0ZXJzSW5pdGlhbGl6ZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJuIHRydWUgaWYgZmlsdGVyIGdyb3VwcyBhcmUgbm9uIGVtcHR5JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5maWx0ZXJHcm91cHMgPSBbeyBzb21lOiAnZmlsdGVyICd9XTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmFyZUZpbHRlcnNJbml0aWFsaXplZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYWRkaXRpb25hbCBmaWx0ZXJzIGFyZSBkZWZpbmVkIGJ1dCBlbXB0eScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuYWRkaXRpb25hbEZpbHRlcnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmFyZUZpbHRlcnNJbml0aWFsaXplZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm4gdHJ1ZSBpZiBhZGRpdGlvbmFsIGZpbHRlcnMgYXJlIG5vbiBlbXB0eScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuYWRkaXRpb25hbEZpbHRlcnMgPSBbeyBzb21lOiAnZmlsdGVyICd9XTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmFyZUZpbHRlcnNJbml0aWFsaXplZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2hhc0ZpbHRlcnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ICgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBhcmUgbm8gZmlsdGVycycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmhhc0ZpbHRlcnMoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmZpbHRlckdyb3VwcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5hZGRpdGlvbmFsRmlsdGVycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuaGFzRmlsdGVycygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGZpbHRlcnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmZpbHRlckdyb3VwcyA9IFtbe3NvbWU6ICdGaWx0ZXInfV1dO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuaGFzRmlsdGVycygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5maWx0ZXJHcm91cHMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmFkZGl0aW9uYWxGaWx0ZXJzID0gW3tzb21lOiAnRmlsdGVyJ31dO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuaGFzRmlsdGVycygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ3B1c2hBZGRpdGlvbmFsRmlsdGVyVG9Hcm91cHMoKScsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ2FkZHMgYSBuZXcgZmlsdGVyIGdyb3VwIHRvIGFkZGVkRmlsdGVyR3JvdXBzIGlmIGZpcnN0IGFkZGl0aW9uYWwgZmlsdGVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxGaWx0ZXJzID0gW3tcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ3Byb3AxJ1xyXG4gICAgICAgICAgICAgICAgfV07XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmFkZGl0aW9uYWxGaWx0ZXJzID0gYW5ndWxhci5jb3B5KGFkZGl0aW9uYWxGaWx0ZXJzKTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuYWRkZWRGaWx0ZXJHcm91cHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEucHVzaEFkZGl0aW9uYWxGaWx0ZXJUb0dyb3VwcyhhZGRpdGlvbmFsRmlsdGVyc1swXSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5hZGRlZEZpbHRlckdyb3VwcykudG9FcXVhbChbW2FkZGl0aW9uYWxGaWx0ZXJzWzBdXV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdhZGRzIHRvIGV4aXN0aW5nIGZpbHRlciBncm91cCBpbiBhZGRlZEZpbHRlckdyb3VwcycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBhZGRpdGlvbmFsRmlsdGVycyA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdwcm9wMSdcclxuICAgICAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5hZGRpdGlvbmFsRmlsdGVycyA9IGFuZ3VsYXIuY29weShhZGRpdGlvbmFsRmlsdGVycyk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmFkZGVkRmlsdGVyR3JvdXBzID0gW1t7fV1dO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5wdXNoQWRkaXRpb25hbEZpbHRlclRvR3JvdXBzKGFkZGl0aW9uYWxGaWx0ZXJzWzBdKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmFkZGVkRmlsdGVyR3JvdXBzKS50b0VxdWFsKFtbe30sYWRkaXRpb25hbEZpbHRlcnNbMF1dXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JlbW92ZXMgZnJvbSBhZGRpdGlvbmFsRmlsdGVycyBsaXN0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxGaWx0ZXJzID0gW3tcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ3Byb3AxJ1xyXG4gICAgICAgICAgICAgICAgfV07XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmFkZGl0aW9uYWxGaWx0ZXJzID0gYWRkaXRpb25hbEZpbHRlcnM7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmFkZGVkRmlsdGVyR3JvdXBzID0gW107XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLnB1c2hBZGRpdGlvbmFsRmlsdGVyVG9Hcm91cHMoYWRkaXRpb25hbEZpbHRlcnNbMF0pO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuYWRkaXRpb25hbEZpbHRlcnMubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ3BvcEFkZGl0aW9uYWxGaWx0ZXJGcm9tR3JvdXBzKCknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdyZW1vdmVzIGEgZmlsdGVyIGZyb20gYWRkZWRGaWx0ZXJHcm91cHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyMSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ3Byb3AnXHJcbiAgICAgICAgICAgICAgICB9LCBmaWx0ZXIyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAncHJvcDEnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5hZGRpdGlvbmFsRmlsdGVycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5hZGRlZEZpbHRlckdyb3VwcyA9IFtbZmlsdGVyMSwgZmlsdGVyMl1dO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5wb3BBZGRpdGlvbmFsRmlsdGVyRnJvbUdyb3VwcyhmaWx0ZXIxKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmFkZGVkRmlsdGVyR3JvdXBzKS50b0VxdWFsKFtbZmlsdGVyMl1dKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmVtb3ZlcyBlbXB0eSBmaWx0ZXIgZ3JvdXAgZnJvbSBhZGRlZEZpbHRlckdyb3VwcycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXIxID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAncHJvcDEnXHJcbiAgICAgICAgICAgICAgICB9LCBmaWx0ZXIyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAncHJvcDInXHJcbiAgICAgICAgICAgICAgICB9LCBmaWx0ZXIzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAncHJvcDMnXHJcbiAgICAgICAgICAgICAgICB9LCBmaWx0ZXI0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAncHJvcDQnXHJcbiAgICAgICAgICAgICAgICB9LCBmaWx0ZXI1ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAncHJvcDUnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5hZGRpdGlvbmFsRmlsdGVycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5hZGRlZEZpbHRlckdyb3VwcyA9IFtbZmlsdGVyMSwgZmlsdGVyMiwgZmlsdGVyMywgZmlsdGVyNF0sIFtmaWx0ZXI1XV07XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLnBvcEFkZGl0aW9uYWxGaWx0ZXJGcm9tR3JvdXBzKGZpbHRlcjIpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuYWRkZWRGaWx0ZXJHcm91cHMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuYWRkZWRGaWx0ZXJHcm91cHNbMF0pLnRvRXF1YWwoW2ZpbHRlcjEsIGZpbHRlcjMsIGZpbHRlcjQsIGZpbHRlcjVdKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnY2xlYXJzIGZpbHRlciB2YWx1ZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXIxID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAncHJvcDEnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgc3B5T24oc2VhcmNoRGF0YSwgJ2NsZWFyRmlsdGVyVmFsdWUnKTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuYWRkZWRGaWx0ZXJHcm91cHMgPSBbW2ZpbHRlcjFdXTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuYWRkaXRpb25hbEZpbHRlcnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEucG9wQWRkaXRpb25hbEZpbHRlckZyb21Hcm91cHMoZmlsdGVyMSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5jbGVhckZpbHRlclZhbHVlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChmaWx0ZXIxKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnYWRkcyBmaWx0ZXIgYmFjayB0byBhZGRpdGlvbmFsRmlsdGVycyBsaXN0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcjEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdwcm9wMSdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmFkZGVkRmlsdGVyR3JvdXBzID0gW1tmaWx0ZXIxXV07XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmFkZGl0aW9uYWxGaWx0ZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLnBvcEFkZGl0aW9uYWxGaWx0ZXJGcm9tR3JvdXBzKGZpbHRlcjEpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuYWRkaXRpb25hbEZpbHRlcnMpLnRvRXF1YWwoW2ZpbHRlcjFdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdwb3BBbGxBZGRpdGlvbmFsRmlsdGVyc0Zyb21Hcm91cHMoKScsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ3BvcHMgYWxsIHRoZSBmaWx0ZXJzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcjEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdwcm9wMSdcclxuICAgICAgICAgICAgICAgIH0sIGZpbHRlcjIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdwcm9wMidcclxuICAgICAgICAgICAgICAgIH0sIGZpbHRlcjMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdwcm9wMydcclxuICAgICAgICAgICAgICAgIH0sIGZpbHRlcjQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdwcm9wNCdcclxuICAgICAgICAgICAgICAgIH0sIGZpbHRlcjUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdwcm9wNSdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmFkZGl0aW9uYWxGaWx0ZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmFkZGVkRmlsdGVyR3JvdXBzID0gW1tmaWx0ZXIxLCBmaWx0ZXIyLCBmaWx0ZXIzLCBmaWx0ZXI0XSwgW2ZpbHRlcjVdXTtcclxuICAgICAgICAgICAgICAgIHNweU9uKHNlYXJjaERhdGEsICdwb3BBZGRpdGlvbmFsRmlsdGVyRnJvbUdyb3VwcycpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5wb3BBbGxBZGRpdGlvbmFsRmlsdGVyc0Zyb21Hcm91cHMoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLnBvcEFkZGl0aW9uYWxGaWx0ZXJGcm9tR3JvdXBzLmNhbGxzLmNvdW50KCkpLnRvRXF1YWwoNSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5hZGRlZEZpbHRlckdyb3VwcykudG9FcXVhbChbXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnaGFzQWRkaXRpb25hbEZpbHRlcnMoKScsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgYW55IGFkZGl0aW9uYWwgZmlsdGVycycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuYWRkZWRGaWx0ZXJHcm91cHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuYWRkaXRpb25hbEZpbHRlcnMgPSBbe31dO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuaGFzQWRkaXRpb25hbEZpbHRlcnMoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBhbnkgYWRkZWQgZmlsdGVycyBpbiBhZGRlZEZpbHRlckdyb3VwcycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuYWRkZWRGaWx0ZXJHcm91cHMgPSBbW3t9XV07XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmFkZGl0aW9uYWxGaWx0ZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5oYXNBZGRpdGlvbmFsRmlsdGVycygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vIGFkZGl0aW9uYWwgZmlsdGVyIG9yIGFkZGVkIGZpbHRlciBncm91cHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmFkZGVkRmlsdGVyR3JvdXBzID0gW107XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLmFkZGl0aW9uYWxGaWx0ZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5oYXNBZGRpdGlvbmFsRmlsdGVycygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBubyBhZGRpdGlvbmFsIGZpbHRlciBvciBhZGRlZCBmaWx0ZXIgZ3JvdXBzIGFyZSBkZWZpbmVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRGF0YS5hZGRlZEZpbHRlckdyb3VwcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuYWRkaXRpb25hbEZpbHRlcnMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5oYXNBZGRpdGlvbmFsRmlsdGVycygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnbWVyZ2UoKScsICgpID0+IHtcclxuICAgICAgICBpdCgnc2hvdWxkIG1lcmdlIFNlYXJjaERhdGEgdmFsdWVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaERhdGEubWVyZ2UoY29weURhdGEpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5zZWFyY2hUZXJtKS50b0VxdWFsKGNvcHlEYXRhLnNlYXJjaFRlcm0pO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMpLnRvRXF1YWwoY29weURhdGEuZmlsdGVyVmFsdWVzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3Qgb3ZlcndyaXRlIHRoZSBmaWx0ZXIgZ3JvdXBzIG9yIGFkZGl0aW9uYWwgZmlsdGVycyBpZiBub3QgZGVmaW5lZCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGZpbHRlckdyb3VwcyA9IFtbe30sIHt9XV0sXHJcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRmlsdGVycyA9IFt7fV0sXHJcbiAgICAgICAgICAgICAgICBhZGRlZEZpbHRlckdyb3VwcyA9IFtbe31dXTtcclxuICAgICAgICAgICAgc2VhcmNoRGF0YS5maWx0ZXJHcm91cHMgPSBmaWx0ZXJHcm91cHM7XHJcbiAgICAgICAgICAgIHNlYXJjaERhdGEuYWRkaXRpb25hbEZpbHRlcnMgPSBhZGRpdGlvbmFsRmlsdGVycztcclxuICAgICAgICAgICAgc2VhcmNoRGF0YS5hZGRlZEZpbHRlckdyb3VwcyA9IGFkZGVkRmlsdGVyR3JvdXBzO1xyXG4gICAgICAgICAgICBzZWFyY2hEYXRhLm1lcmdlKGNvcHlEYXRhKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuZmlsdGVyR3JvdXBzKS50b0VxdWFsKGZpbHRlckdyb3Vwcyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmFkZGl0aW9uYWxGaWx0ZXJzKS50b0VxdWFsKGFkZGl0aW9uYWxGaWx0ZXJzKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuYWRkZWRGaWx0ZXJHcm91cHMpLnRvRXF1YWwoYWRkZWRGaWx0ZXJHcm91cHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGNvcHkgZmlsdGVyIGdyb3VwcyBhbmQgYWRkaXRpb25hbCBmaWx0ZXJzIGlmIGRlZmluZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJHcm91cHMgPSBbW3t9LCB7fV1dLFxyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbEZpbHRlcnMgPSBbe31dLFxyXG4gICAgICAgICAgICAgICAgYWRkZWRGaWx0ZXJHcm91cHMgPSBbW3t9XV07XHJcbiAgICAgICAgICAgIGNvcHlEYXRhLmZpbHRlckdyb3VwcyA9IGZpbHRlckdyb3VwcztcclxuICAgICAgICAgICAgY29weURhdGEuYWRkaXRpb25hbEZpbHRlcnMgPSBhZGRpdGlvbmFsRmlsdGVycztcclxuICAgICAgICAgICAgY29weURhdGEuYWRkZWRGaWx0ZXJHcm91cHMgPSBhZGRlZEZpbHRlckdyb3VwcztcclxuICAgICAgICAgICAgc2VhcmNoRGF0YS5tZXJnZShjb3B5RGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmZpbHRlckdyb3VwcykudG9FcXVhbChmaWx0ZXJHcm91cHMpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5hZGRpdGlvbmFsRmlsdGVycykudG9FcXVhbChhZGRpdGlvbmFsRmlsdGVycyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmFkZGVkRmlsdGVyR3JvdXBzKS50b0VxdWFsKGFkZGVkRmlsdGVyR3JvdXBzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgdXBkYXRlIGZpbHRlclZhbHVlcyByYXRoZXIgdGhhbiByZXBsYWNlIGl0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGZpbHRlclZhbHVlcyA9IHNlYXJjaERhdGEuZmlsdGVyVmFsdWVzO1xyXG4gICAgICAgIHNlYXJjaERhdGEuY2xlYXJGaWx0ZXJWYWx1ZXMoKTtcclxuICAgICAgICAvLyBBc3N1cmUgd2UgYXJlIHVzaW5nIG9iamVjdCBlcXVhbGl0eVxyXG4gICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmZpbHRlclZhbHVlcyA9PT0gZmlsdGVyVmFsdWVzKS50b0JlVHJ1dGh5KCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
