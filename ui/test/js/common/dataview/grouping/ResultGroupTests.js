System.register(['test/js/TestInitializer', 'common/dataview/grouping/GroupingModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var groupingModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewGroupingGroupingModule) {
            groupingModule = _commonDataviewGroupingGroupingModule['default'];
        }],
        execute: function () {

            describe('ResultGroup', function () {
                var ResultGroup = undefined,
                    objectUtilService = undefined,
                    resultGroup = undefined,
                    FilterValue = undefined;

                beforeEach(module(groupingModule));

                beforeEach(inject(function (_ResultGroup_, _objectUtilService_, _FilterValue_) {
                    ResultGroup = _ResultGroup_;
                    objectUtilService = _objectUtilService_;
                    resultGroup = new ResultGroup({
                        properties: { thing: '1', dummy: true },
                        count: 2
                    });
                    FilterValue = _FilterValue_;
                }));

                describe('constructor', function () {
                    it('throws with no data', function () {
                        expect(function () {
                            return new ResultGroup();
                        }).toThrow();
                    });

                    it('initializes with data', function () {
                        var data = {
                            properties: { a: 'b' },
                            count: 2,
                            objectIds: ['abc'],
                            filterValues: {
                                realA: {
                                    value: 'b',
                                    operation: 'Equals'
                                }
                            }
                        },
                            resultGroup = new ResultGroup(data);
                        expect(resultGroup.properties).toEqual(data.properties);
                        expect(resultGroup.objectIds).toEqual(data.objectIds);
                        expect(resultGroup.count).toEqual(data.count);
                        expect(resultGroup.filterValues).toBeDefined();
                        expect(resultGroup.filterValues.realA).toEqual(new FilterValue(data.filterValues.realA));
                    });
                });

                describe('isObjectInGroup()', function () {
                    it('returns true if object matches group properties', function () {
                        var item = {
                            thing: '1',
                            dummy: true
                        };
                        expect(resultGroup.isObjectInGroup(item)).toEqual(true);
                    });

                    it('returns true if object matches objectIds', function () {
                        var data = {
                            count: 2,
                            objectIds: ['abc']
                        },
                            resultGroup = new ResultGroup(data),
                            item = {
                            id: 'abc'
                        };
                        expect(resultGroup.isObjectInGroup(item)).toEqual(true);
                    });

                    it('returns false if object does not match', function () {
                        var item = {
                            properties: { a: 'a' }
                        };
                        expect(resultGroup.isObjectInGroup(item)).toEqual(false);
                    });

                    it('returns false if object is undefined', function () {
                        expect(resultGroup.isObjectInGroup()).toEqual(false);
                    });
                });

                describe('matchesProperties()', function () {

                    it('returns false if otherGroup is not defined', function () {
                        expect(resultGroup.matchesProperties()).toEqual(false);
                    });

                    it('returns false if property values do not match', function () {
                        expect(resultGroup.matchesProperties({
                            properties: {
                                thing: '2',
                                dummy: true
                            }
                        })).toEqual(false);
                    });

                    it('returns false if more properties in one group than the other', function () {
                        expect(resultGroup.matchesProperties({
                            properties: {
                                dummy: true
                            }
                        })).toEqual(false);
                    });

                    it('returns true if properties match', function () {
                        expect(resultGroup.matchesProperties(resultGroup)).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy9ncm91cGluZy9SZXN1bHRHcm91cFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0Q0FBNEMsVUFBVSxTQUFTOztJQUV2Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLGlCQUFpQixzQ0FBc0M7O1FBRTNELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxlQUFlLFlBQU07Z0JBQzFCLElBQUksY0FBVztvQkFBRSxvQkFBaUI7b0JBQUUsY0FBVztvQkFBRSxjQUFXOztnQkFFNUQsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsZUFBZSxxQkFBcUIsZUFBa0I7b0JBQ3JFLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQixjQUFjLElBQUksWUFBWTt3QkFDMUIsWUFBWSxFQUFFLE9BQU8sS0FBSyxPQUFPO3dCQUNqQyxPQUFPOztvQkFFWCxjQUFjOzs7Z0JBR2xCLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLHVCQUF1QixZQUFNO3dCQUM1QixPQUFPLFlBQUE7NEJBV1MsT0FYSCxJQUFJOzJCQUFlOzs7b0JBR3BDLEdBQUcseUJBQXlCLFlBQU07d0JBQzlCLElBQUksT0FBTzs0QkFDUCxZQUFZLEVBQUUsR0FBRzs0QkFDakIsT0FBTzs0QkFDUCxXQUFXLENBQUM7NEJBQ1osY0FBYztnQ0FDVixPQUFPO29DQUNILE9BQU87b0NBQ1AsV0FBVzs7Ozs0QkFHcEIsY0FBYyxJQUFJLFlBQVk7d0JBQ2pDLE9BQU8sWUFBWSxZQUFZLFFBQVEsS0FBSzt3QkFDNUMsT0FBTyxZQUFZLFdBQVcsUUFBUSxLQUFLO3dCQUMzQyxPQUFPLFlBQVksT0FBTyxRQUFRLEtBQUs7d0JBQ3ZDLE9BQU8sWUFBWSxjQUFjO3dCQUNqQyxPQUFPLFlBQVksYUFBYSxPQUFPLFFBQVEsSUFBSSxZQUFZLEtBQUssYUFBYTs7OztnQkFJekYsU0FBUyxxQkFBcUIsWUFBTTtvQkFDaEMsR0FBRyxtREFBbUQsWUFBTTt3QkFDeEQsSUFBSSxPQUFPOzRCQUNQLE9BQU87NEJBQ1AsT0FBTzs7d0JBRVgsT0FBTyxZQUFZLGdCQUFnQixPQUFPLFFBQVE7OztvQkFHdEQsR0FBRyw0Q0FBNEMsWUFBTTt3QkFDakQsSUFBSSxPQUFPOzRCQUNILE9BQU87NEJBQ1AsV0FBVyxDQUFDOzs0QkFDYixjQUFjLElBQUksWUFBWTs0QkFDakMsT0FBTzs0QkFDSCxJQUFJOzt3QkFFWixPQUFPLFlBQVksZ0JBQWdCLE9BQU8sUUFBUTs7O29CQUd0RCxHQUFHLDBDQUEwQyxZQUFNO3dCQUMvQyxJQUFJLE9BQU87NEJBQ1AsWUFBWSxFQUFDLEdBQUc7O3dCQUVwQixPQUFPLFlBQVksZ0JBQWdCLE9BQU8sUUFBUTs7O29CQUd0RCxHQUFHLHdDQUF3QyxZQUFNO3dCQUM3QyxPQUFPLFlBQVksbUJBQW1CLFFBQVE7Ozs7Z0JBSXRELFNBQVMsdUJBQXVCLFlBQU07O29CQUVsQyxHQUFHLDhDQUE4QyxZQUFNO3dCQUNuRCxPQUFPLFlBQVkscUJBQXFCLFFBQVE7OztvQkFHcEQsR0FBRyxpREFBaUQsWUFBTTt3QkFDdEQsT0FBTyxZQUFZLGtCQUFrQjs0QkFDakMsWUFBWTtnQ0FDUixPQUFPO2dDQUNQLE9BQU87OzRCQUVYLFFBQVE7OztvQkFHaEIsR0FBRyxnRUFBZ0UsWUFBTTt3QkFDckUsT0FBTyxZQUFZLGtCQUFrQjs0QkFDakMsWUFBWTtnQ0FDUixPQUFPOzs0QkFFWCxRQUFROzs7b0JBR2hCLEdBQUcsb0NBQW9DLFlBQU07d0JBQ3pDLE9BQU8sWUFBWSxrQkFBa0IsY0FBYyxRQUFROzs7Ozs7R0FvQnBFIiwiZmlsZSI6ImNvbW1vbi9kYXRhdmlldy9ncm91cGluZy9SZXN1bHRHcm91cFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBncm91cGluZ01vZHVsZSBmcm9tICdjb21tb24vZGF0YXZpZXcvZ3JvdXBpbmcvR3JvdXBpbmdNb2R1bGUnO1xuXG5kZXNjcmliZSgnUmVzdWx0R3JvdXAnLCAoKSA9PiB7XG4gICAgbGV0IFJlc3VsdEdyb3VwLCBvYmplY3RVdGlsU2VydmljZSwgcmVzdWx0R3JvdXAsIEZpbHRlclZhbHVlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZ3JvdXBpbmdNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUmVzdWx0R3JvdXBfLCBfb2JqZWN0VXRpbFNlcnZpY2VfLCBfRmlsdGVyVmFsdWVfKSA9PiB7XG4gICAgICAgIFJlc3VsdEdyb3VwID0gX1Jlc3VsdEdyb3VwXztcbiAgICAgICAgb2JqZWN0VXRpbFNlcnZpY2UgPSBfb2JqZWN0VXRpbFNlcnZpY2VfO1xuICAgICAgICByZXN1bHRHcm91cCA9IG5ldyBSZXN1bHRHcm91cCh7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7IHRoaW5nOiAnMScsIGR1bW15OiB0cnVlIH0sXG4gICAgICAgICAgICBjb3VudDogMlxuICAgICAgICB9KTtcbiAgICAgICAgRmlsdGVyVmFsdWUgPSBfRmlsdGVyVmFsdWVfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIGRhdGEnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbmV3IFJlc3VsdEdyb3VwKCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2luaXRpYWxpemVzIHdpdGggZGF0YScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHsgYTogJ2InfSxcbiAgICAgICAgICAgICAgICBjb3VudDogMixcbiAgICAgICAgICAgICAgICBvYmplY3RJZHM6IFsnYWJjJ10sXG4gICAgICAgICAgICAgICAgZmlsdGVyVmFsdWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWxBOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2InLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAnRXF1YWxzJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgcmVzdWx0R3JvdXAgPSBuZXcgUmVzdWx0R3JvdXAoZGF0YSk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0R3JvdXAucHJvcGVydGllcykudG9FcXVhbChkYXRhLnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdEdyb3VwLm9iamVjdElkcykudG9FcXVhbChkYXRhLm9iamVjdElkcyk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0R3JvdXAuY291bnQpLnRvRXF1YWwoZGF0YS5jb3VudCk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0R3JvdXAuZmlsdGVyVmFsdWVzKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdEdyb3VwLmZpbHRlclZhbHVlcy5yZWFsQSkudG9FcXVhbChuZXcgRmlsdGVyVmFsdWUoZGF0YS5maWx0ZXJWYWx1ZXMucmVhbEEpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNPYmplY3RJbkdyb3VwKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgb2JqZWN0IG1hdGNoZXMgZ3JvdXAgcHJvcGVydGllcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0ge1xuICAgICAgICAgICAgICAgIHRoaW5nOiAnMScsXG4gICAgICAgICAgICAgICAgZHVtbXk6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0R3JvdXAuaXNPYmplY3RJbkdyb3VwKGl0ZW0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIG9iamVjdCBtYXRjaGVzIG9iamVjdElkcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBjb3VudDogMixcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0SWRzOiBbJ2FiYyddXG4gICAgICAgICAgICAgICAgfSwgcmVzdWx0R3JvdXAgPSBuZXcgUmVzdWx0R3JvdXAoZGF0YSksXG4gICAgICAgICAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdhYmMnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHRHcm91cC5pc09iamVjdEluR3JvdXAoaXRlbSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG9iamVjdCBkb2VzIG5vdCBtYXRjaCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0ge1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHthOiAnYSd9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdEdyb3VwLmlzT2JqZWN0SW5Hcm91cChpdGVtKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG9iamVjdCBpcyB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0R3JvdXAuaXNPYmplY3RJbkdyb3VwKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdtYXRjaGVzUHJvcGVydGllcygpJywgKCkgPT4ge1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG90aGVyR3JvdXAgaXMgbm90IGRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0R3JvdXAubWF0Y2hlc1Byb3BlcnRpZXMoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHByb3BlcnR5IHZhbHVlcyBkbyBub3QgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0R3JvdXAubWF0Y2hlc1Byb3BlcnRpZXMoe1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpbmc6ICcyJyxcbiAgICAgICAgICAgICAgICAgICAgZHVtbXk6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG1vcmUgcHJvcGVydGllcyBpbiBvbmUgZ3JvdXAgdGhhbiB0aGUgb3RoZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0R3JvdXAubWF0Y2hlc1Byb3BlcnRpZXMoe1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgZHVtbXk6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgcHJvcGVydGllcyBtYXRjaCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHRHcm91cC5tYXRjaGVzUHJvcGVydGllcyhyZXN1bHRHcm91cCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
