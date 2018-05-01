System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationTableScope', function () {

                var CertificationTableScope = undefined,
                    FilterValue = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationTableScope_, _FilterValue_) {
                    CertificationTableScope = _CertificationTableScope_;
                    FilterValue = _FilterValue_;
                }));

                describe('constructor', function () {
                    it('sets the properties as provided', function () {
                        var data = {
                            statuses: ['A'],
                            includedTypes: ['B'],
                            excludedTypes: ['C'],
                            entity: {
                                D: 'E'
                            }
                        },
                            test = new CertificationTableScope(data);
                        expect(test.statuses).toEqual(data.statuses);
                        expect(test.includedTypes).toEqual(data.includedTypes);
                        expect(test.excludedTypes).toEqual(data.excludedTypes);
                        expect(test.entity).toEqual(data.entity);
                    });

                    it('sets properties to undefined if no data provided', function () {
                        var test = new CertificationTableScope();
                        expect(test.statuses).toEqual(undefined);
                        expect(test.includedTypes).toEqual(undefined);
                        expect(test.excludedTypes).toEqual(undefined);
                        expect(test.entity).toEqual(undefined);
                    });
                });

                describe('matches()', function () {
                    function testMatches(propertyName, firstValue, secondValue, expectedMatch) {
                        var firstData = {},
                            secondData = {};
                        firstData[propertyName] = firstValue;
                        secondData[propertyName] = secondValue;
                        expect(new CertificationTableScope(firstData).matches(new CertificationTableScope(secondData))).toEqual(expectedMatch);
                    }

                    it('returns false if no table config is passed', function () {
                        expect(new CertificationTableScope().matches(undefined)).toEqual(false);
                    });

                    it('returns false if statuses do not match', function () {
                        testMatches('statuses', ['A', 'B'], ['C'], false);
                        testMatches('statuses', ['A', 'B'], undefined, false);
                    });

                    it('returns false if includedTypes do not match', function () {
                        testMatches('includedTypes', ['A', 'B'], ['C'], false);
                        testMatches('includedTypes', ['A', 'B'], undefined, false);
                    });

                    it('returns false if excludedTypes do not match', function () {
                        testMatches('excludedTypes', ['A', 'B'], ['C'], false);
                        testMatches('excludedTypes', ['A', 'B'], undefined, false);
                    });

                    it('return false if entities do not match', function () {
                        testMatches('entity', { id: '123' }, { id: '456' }, false);
                        testMatches('entity', { id: '123' }, undefined, false);
                    });

                    it('returns true if everything matches', function () {
                        var firstData = {
                            statuses: ['Status1', 'Status2'],
                            includedTypes: ['Type1', 'Type2'],
                            excludedTypes: ['3'],
                            entity: {
                                id: 'person'
                            }
                        },
                            secondData = {
                            statuses: ['Status2', 'Status1'],
                            includedTypes: ['Type2', 'Type1'],
                            excludedTypes: ['3'],
                            entity: {
                                id: 'person'
                            }
                        };
                        expect(new CertificationTableScope(firstData).matches(secondData)).toEqual(true);
                        expect(new CertificationTableScope(firstData).matches(firstData)).toEqual(true);
                    });
                });

                describe('getFilterValues()', function () {
                    function testFilterValue(data, property, value, operation) {
                        var scope = new CertificationTableScope(data),
                            filterValues = scope.getFilterValues(),
                            filterValue = filterValues[property];
                        expect(filterValue).toBeDefined();
                        expect(filterValue.value).toEqual(value);
                        expect(filterValue.operation).toEqual(operation);
                    }
                    it('adds filter for statuses', function () {
                        var data = {
                            statuses: ['A']
                        };
                        testFilterValue(data, 'summaryStatus', data.statuses, FilterValue.Operation.Equals);
                    });

                    it('adds filter for includedTypes', function () {
                        var data = {
                            includedTypes: ['A', 'B']
                        };
                        testFilterValue(data, 'includedType', data.includedTypes, FilterValue.Operation.Equals);
                    });

                    it('adds filter for excludedTypes', function () {
                        var data = {
                            excludedTypes: ['A', 'B']
                        };
                        testFilterValue(data, 'excludedType', data.excludedTypes, FilterValue.Operation.NotEquals);
                    });

                    it('adds filter for entity', function () {
                        var data = {
                            entity: {
                                id: 'dude'
                            }
                        };
                        testFilterValue(data, 'entity', data.entity.id, FilterValue.Operation.Equals);
                    });
                });

                describe('addQueryParameters()', function () {
                    function testQueryParam(data, property, value) {
                        var scope = new CertificationTableScope(data),
                            params = {};
                        scope.addQueryParameters(params);
                        expect(params[property]).toEqual(value);
                    }

                    it('blows up with no params', function () {
                        expect(function () {
                            new CertificationTableScope().addQueryParameters();
                        }).toThrow();
                    });

                    it('adds param for statuses', function () {
                        var data = {
                            statuses: ['A']
                        };
                        testQueryParam(data, 'summaryStatus', data.statuses);
                    });

                    it('adds param for includedTypes', function () {
                        var data = {
                            includedTypes: ['B', 'C']
                        };
                        testQueryParam(data, 'includedType', data.includedTypes);
                    });

                    it('adds param for excludedTypes', function () {
                        var data = {
                            excludedTypes: ['dD']
                        };
                        testQueryParam(data, 'excludedType', data.excludedTypes);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvblRhYmxlU2NvcGVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7O0lBR2pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZOztZQUw3QixTQUFTLDJCQUEyQixZQUFNOztnQkFFdEMsSUFBSSwwQkFBdUI7b0JBQUUsY0FBVzs7Z0JBRXhDLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLDJCQUEyQixlQUFrQjtvQkFDNUQsMEJBQTBCO29CQUMxQixjQUFjOzs7Z0JBR2xCLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLG1DQUFtQyxZQUFNO3dCQUN4QyxJQUFJLE9BQU87NEJBQ0gsVUFBVSxDQUFDOzRCQUNYLGVBQWUsQ0FBQzs0QkFDaEIsZUFBZSxDQUFDOzRCQUNoQixRQUFRO2dDQUNKLEdBQUc7Ozs0QkFHWCxPQUFPLElBQUksd0JBQXdCO3dCQUN2QyxPQUFPLEtBQUssVUFBVSxRQUFRLEtBQUs7d0JBQ25DLE9BQU8sS0FBSyxlQUFlLFFBQVEsS0FBSzt3QkFDeEMsT0FBTyxLQUFLLGVBQWUsUUFBUSxLQUFLO3dCQUN4QyxPQUFPLEtBQUssUUFBUSxRQUFRLEtBQUs7OztvQkFHckMsR0FBRyxvREFBb0QsWUFBTTt3QkFDekQsSUFBSSxPQUFPLElBQUk7d0JBQ2YsT0FBTyxLQUFLLFVBQVUsUUFBUTt3QkFDOUIsT0FBTyxLQUFLLGVBQWUsUUFBUTt3QkFDbkMsT0FBTyxLQUFLLGVBQWUsUUFBUTt3QkFDbkMsT0FBTyxLQUFLLFFBQVEsUUFBUTs7OztnQkFJcEMsU0FBUyxhQUFhLFlBQU07b0JBQ3hCLFNBQVMsWUFBWSxjQUFjLFlBQVksYUFBYSxlQUFlO3dC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QUEyQixZQUFNO3dCQUNoQyxJQUFJLE9BQU87NEJBQ1AsVUFBVSxDQUFDOzt3QkFFZixlQUFlLE1BQU0saUJBQWlCLEtBQUs7OztvQkFHL0MsR0FBRyxnQ0FBZ0MsWUFBTTt3QkFDckMsSUFBSSxPQUFPOzRCQUNQLGVBQWUsQ0FBQyxLQUFLOzt3QkFFekIsZUFBZSxNQUFNLGdCQUFnQixLQUFLOzs7b0JBRzlDLEdBQUcsZ0NBQWdDLFlBQU07d0JBQ3JDLElBQUksT0FBTzs0QkFDUCxlQUFlLENBQUM7O3dCQUVwQixlQUFlLE1BQU0sZ0JBQWdCLEtBQUs7Ozs7OztHQWdCbkQiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9tb2RlbC9DZXJ0aWZpY2F0aW9uVGFibGVTY29wZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcblxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25UYWJsZVNjb3BlJywgKCkgPT4ge1xuXG4gICAgbGV0IENlcnRpZmljYXRpb25UYWJsZVNjb3BlLCBGaWx0ZXJWYWx1ZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfQ2VydGlmaWNhdGlvblRhYmxlU2NvcGVfLCBfRmlsdGVyVmFsdWVfKSA9PiB7XG4gICAgICAgIENlcnRpZmljYXRpb25UYWJsZVNjb3BlID0gX0NlcnRpZmljYXRpb25UYWJsZVNjb3BlXztcbiAgICAgICAgRmlsdGVyVmFsdWUgPSBfRmlsdGVyVmFsdWVfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcbiAgICAgICAgaXQoJ3NldHMgdGhlIHByb3BlcnRpZXMgYXMgcHJvdmlkZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzZXM6IFsnQSddLFxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlZFR5cGVzOiBbJ0InXSxcbiAgICAgICAgICAgICAgICAgICAgZXhjbHVkZWRUeXBlczogWydDJ10sXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eToge1xuICAgICAgICAgICAgICAgICAgICAgICAgRDogJ0UnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRlc3QgPSBuZXcgQ2VydGlmaWNhdGlvblRhYmxlU2NvcGUoZGF0YSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5zdGF0dXNlcykudG9FcXVhbChkYXRhLnN0YXR1c2VzKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmluY2x1ZGVkVHlwZXMpLnRvRXF1YWwoZGF0YS5pbmNsdWRlZFR5cGVzKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmV4Y2x1ZGVkVHlwZXMpLnRvRXF1YWwoZGF0YS5leGNsdWRlZFR5cGVzKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmVudGl0eSkudG9FcXVhbChkYXRhLmVudGl0eSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzZXRzIHByb3BlcnRpZXMgdG8gdW5kZWZpbmVkIGlmIG5vIGRhdGEgcHJvdmlkZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVzdCA9IG5ldyBDZXJ0aWZpY2F0aW9uVGFibGVTY29wZSgpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3Quc3RhdHVzZXMpLnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmluY2x1ZGVkVHlwZXMpLnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmV4Y2x1ZGVkVHlwZXMpLnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmVudGl0eSkudG9FcXVhbCh1bmRlZmluZWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdtYXRjaGVzKCknLCAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHRlc3RNYXRjaGVzKHByb3BlcnR5TmFtZSwgZmlyc3RWYWx1ZSwgc2Vjb25kVmFsdWUsIGV4cGVjdGVkTWF0Y2gpIHtcbiAgICAgICAgICAgIGxldCBmaXJzdERhdGEgPSB7fSwgc2Vjb25kRGF0YSA9IHt9O1xuICAgICAgICAgICAgZmlyc3REYXRhW3Byb3BlcnR5TmFtZV0gPSBmaXJzdFZhbHVlO1xuICAgICAgICAgICAgc2Vjb25kRGF0YVtwcm9wZXJ0eU5hbWVdID0gc2Vjb25kVmFsdWU7XG4gICAgICAgICAgICBleHBlY3QobmV3IENlcnRpZmljYXRpb25UYWJsZVNjb3BlKGZpcnN0RGF0YSkubWF0Y2hlcyhuZXcgQ2VydGlmaWNhdGlvblRhYmxlU2NvcGUoc2Vjb25kRGF0YSkpKVxuICAgICAgICAgICAgICAgIC50b0VxdWFsKGV4cGVjdGVkTWF0Y2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm8gdGFibGUgY29uZmlnIGlzIHBhc3NlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChuZXcgQ2VydGlmaWNhdGlvblRhYmxlU2NvcGUoKS5tYXRjaGVzKHVuZGVmaW5lZCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBzdGF0dXNlcyBkbyBub3QgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0TWF0Y2hlcygnc3RhdHVzZXMnLCBbJ0EnLCAnQiddLCBbJ0MnXSwgZmFsc2UpO1xuICAgICAgICAgICAgdGVzdE1hdGNoZXMoJ3N0YXR1c2VzJywgWydBJywgJ0InXSwgdW5kZWZpbmVkLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGluY2x1ZGVkVHlwZXMgZG8gbm90IG1hdGNoJywgKCkgPT4ge1xuICAgICAgICAgICAgdGVzdE1hdGNoZXMoJ2luY2x1ZGVkVHlwZXMnLCBbJ0EnLCAnQiddLCBbJ0MnXSwgZmFsc2UpO1xuICAgICAgICAgICAgdGVzdE1hdGNoZXMoJ2luY2x1ZGVkVHlwZXMnLCBbJ0EnLCAnQiddLCB1bmRlZmluZWQsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgZXhjbHVkZWRUeXBlcyBkbyBub3QgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0TWF0Y2hlcygnZXhjbHVkZWRUeXBlcycsIFsnQScsICdCJ10sIFsnQyddLCBmYWxzZSk7XG4gICAgICAgICAgICB0ZXN0TWF0Y2hlcygnZXhjbHVkZWRUeXBlcycsIFsnQScsICdCJ10sIHVuZGVmaW5lZCwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJuIGZhbHNlIGlmIGVudGl0aWVzIGRvIG5vdCBtYXRjaCcsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RNYXRjaGVzKCdlbnRpdHknLCB7IGlkOiAnMTIzJ30sIHsgaWQ6ICc0NTYnfSwgZmFsc2UpO1xuICAgICAgICAgICAgdGVzdE1hdGNoZXMoJ2VudGl0eScsIHsgaWQ6ICcxMjMnfSwgdW5kZWZpbmVkLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgZXZlcnl0aGluZyBtYXRjaGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWydTdGF0dXMxJywgJ1N0YXR1czInXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlZFR5cGVzOiBbJ1R5cGUxJywgJ1R5cGUyJ10sXG4gICAgICAgICAgICAgICAgZXhjbHVkZWRUeXBlczogWyczJ10sXG4gICAgICAgICAgICAgICAgZW50aXR5OiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAncGVyc29uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHNlY29uZERhdGEgPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzZXM6IFsnU3RhdHVzMicsICdTdGF0dXMxJ10sXG4gICAgICAgICAgICAgICAgaW5jbHVkZWRUeXBlczogWydUeXBlMicsICdUeXBlMSddLFxuICAgICAgICAgICAgICAgIGV4Y2x1ZGVkVHlwZXM6IFsnMyddLFxuICAgICAgICAgICAgICAgIGVudGl0eToge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3BlcnNvbidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KG5ldyBDZXJ0aWZpY2F0aW9uVGFibGVTY29wZShmaXJzdERhdGEpLm1hdGNoZXMoc2Vjb25kRGF0YSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QobmV3IENlcnRpZmljYXRpb25UYWJsZVNjb3BlKGZpcnN0RGF0YSkubWF0Y2hlcyhmaXJzdERhdGEpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRGaWx0ZXJWYWx1ZXMoKScsICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gdGVzdEZpbHRlclZhbHVlKGRhdGEsIHByb3BlcnR5LCB2YWx1ZSwgb3BlcmF0aW9uKSB7XG4gICAgICAgICAgICBsZXQgc2NvcGUgPSBuZXcgQ2VydGlmaWNhdGlvblRhYmxlU2NvcGUoZGF0YSksXG4gICAgICAgICAgICAgICAgZmlsdGVyVmFsdWVzID0gc2NvcGUuZ2V0RmlsdGVyVmFsdWVzKCksXG4gICAgICAgICAgICAgICAgZmlsdGVyVmFsdWUgPSBmaWx0ZXJWYWx1ZXNbcHJvcGVydHldO1xuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclZhbHVlKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclZhbHVlLnZhbHVlKS50b0VxdWFsKHZhbHVlKTtcbiAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJWYWx1ZS5vcGVyYXRpb24pLnRvRXF1YWwob3BlcmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpdCgnYWRkcyBmaWx0ZXIgZm9yIHN0YXR1c2VzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzZXM6IFsnQSddXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGVzdEZpbHRlclZhbHVlKGRhdGEsICdzdW1tYXJ5U3RhdHVzJywgZGF0YS5zdGF0dXNlcywgRmlsdGVyVmFsdWUuT3BlcmF0aW9uLkVxdWFscyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIGZpbHRlciBmb3IgaW5jbHVkZWRUeXBlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGluY2x1ZGVkVHlwZXM6IFsnQScsICdCJ11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0ZXN0RmlsdGVyVmFsdWUoZGF0YSwgJ2luY2x1ZGVkVHlwZScsIGRhdGEuaW5jbHVkZWRUeXBlcywgRmlsdGVyVmFsdWUuT3BlcmF0aW9uLkVxdWFscyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIGZpbHRlciBmb3IgZXhjbHVkZWRUeXBlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVkVHlwZXM6IFsnQScsICdCJ11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0ZXN0RmlsdGVyVmFsdWUoZGF0YSwgJ2V4Y2x1ZGVkVHlwZScsIGRhdGEuZXhjbHVkZWRUeXBlcywgRmlsdGVyVmFsdWUuT3BlcmF0aW9uLk5vdEVxdWFscyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FkZHMgZmlsdGVyIGZvciBlbnRpdHknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBlbnRpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdkdWRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0ZXN0RmlsdGVyVmFsdWUoZGF0YSwgJ2VudGl0eScsIGRhdGEuZW50aXR5LmlkLCBGaWx0ZXJWYWx1ZS5PcGVyYXRpb24uRXF1YWxzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYWRkUXVlcnlQYXJhbWV0ZXJzKCknLCAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHRlc3RRdWVyeVBhcmFtKGRhdGEsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IHNjb3BlID0gbmV3IENlcnRpZmljYXRpb25UYWJsZVNjb3BlKGRhdGEpLFxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgc2NvcGUuYWRkUXVlcnlQYXJhbWV0ZXJzKHBhcmFtcyk7XG4gICAgICAgICAgICBleHBlY3QocGFyYW1zW3Byb3BlcnR5XSkudG9FcXVhbCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnYmxvd3MgdXAgd2l0aCBubyBwYXJhbXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyBuZXcgQ2VydGlmaWNhdGlvblRhYmxlU2NvcGUoKS5hZGRRdWVyeVBhcmFtZXRlcnMoKTt9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIHBhcmFtIGZvciBzdGF0dXNlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1c2VzOiBbJ0EnXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRlc3RRdWVyeVBhcmFtKGRhdGEsICdzdW1tYXJ5U3RhdHVzJywgZGF0YS5zdGF0dXNlcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIHBhcmFtIGZvciBpbmNsdWRlZFR5cGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZWRUeXBlczogWydCJywgJ0MnXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRlc3RRdWVyeVBhcmFtKGRhdGEsICdpbmNsdWRlZFR5cGUnLCBkYXRhLmluY2x1ZGVkVHlwZXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWRkcyBwYXJhbSBmb3IgZXhjbHVkZWRUeXBlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVkVHlwZXM6IFsnZEQnXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRlc3RRdWVyeVBhcmFtKGRhdGEsICdleGNsdWRlZFR5cGUnLCBkYXRhLmV4Y2x1ZGVkVHlwZXMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
