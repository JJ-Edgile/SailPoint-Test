System.register(['test/js/TestInitializer', 'common/model/ModelModule', './ModelTestData'], function (_export) {
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }, function (_ModelTestData) {}],
        execute: function () {

            /**
             * Tests for the AccessRequestItemPopulationStatistics model object.
             */
            describe('AccessRequestItemPopulationStatistics', function () {
                var populationStatisticsData, popStats, AccessRequestItemPopulationStatistics;

                beforeEach(module(modelModule));

                beforeEach(inject(function (_AccessRequestItemPopulationStatistics_, modelTestData) {
                    AccessRequestItemPopulationStatistics = _AccessRequestItemPopulationStatistics_;
                    populationStatisticsData = modelTestData.POPULATION_STATISTICS;
                    popStats = new AccessRequestItemPopulationStatistics(populationStatisticsData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new AccessRequestItemPopulationStatistics(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new AccessRequestItemPopulationStatistics('hi mom');
                    }).toThrow();
                    expect(function () {
                        new AccessRequestItemPopulationStatistics(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns total from data', function () {
                    expect(popStats.getTotal()).toEqual(populationStatisticsData.total);
                });

                it('returns count from data', function () {
                    expect(popStats.getCount()).toEqual(populationStatisticsData.count);
                });

                it('returns highRisk from data', function () {
                    expect(popStats.isHighRisk()).toEqual(populationStatisticsData.highRisk);
                });

                it('returns rounded percentage value from count and total', function () {
                    expect(popStats.getPercentage()).toEqual(0.5);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9BY2Nlc3NSZXF1ZXN0SXRlbVBvcHVsYXRpb25TdGF0aXN0aWNzVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixvQkFBb0IsVUFBVSxTQUFTO0lBQzNHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7V0FDdkMsVUFBVSxnQkFBZ0I7UUFDN0IsU0FBUyxZQUFZOzs7OztZQUQ3QixTQUFTLHlDQUF5QyxZQUFXO2dCQUN6RCxJQUFJLDBCQUNBLFVBQ0E7O2dCQUVKLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLHlDQUF5QyxlQUFlO29CQUMvRSx3Q0FBd0M7b0JBQ3hDLDJCQUEyQixjQUFjO29CQUN6QyxXQUFXLElBQUksc0NBQXNDOzs7Z0JBR3pELEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELE9BQU8sWUFBVzt3QkFBRSxJQUFJLHNDQUFzQzt1QkFBVTs7O2dCQUc1RSxHQUFHLGlFQUFpRSxZQUFXO29CQUMzRSxPQUFPLFlBQVc7d0JBQUUsSUFBSSxzQ0FBc0M7dUJBQWM7b0JBQzVFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLHNDQUFzQyxZQUFXOzRCQUFFLE9BQU87O3VCQUFvQjs7O2dCQUcxRyxHQUFHLDJCQUEyQixZQUFXO29CQUNyQyxPQUFPLFNBQVMsWUFBWSxRQUFRLHlCQUF5Qjs7O2dCQUdqRSxHQUFHLDJCQUEyQixZQUFXO29CQUNyQyxPQUFPLFNBQVMsWUFBWSxRQUFRLHlCQUF5Qjs7O2dCQUdqRSxHQUFHLDhCQUE4QixZQUFXO29CQUN4QyxPQUFPLFNBQVMsY0FBYyxRQUFRLHlCQUF5Qjs7O2dCQUduRSxHQUFHLHlEQUF5RCxZQUFXO29CQUNuRSxPQUFPLFNBQVMsaUJBQWlCLFFBQVE7Ozs7O0dBaUI5QyIsImZpbGUiOiJjb21tb24vbW9kZWwvQWNjZXNzUmVxdWVzdEl0ZW1Qb3B1bGF0aW9uU3RhdGlzdGljc1Rlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbW9kZWxNb2R1bGUgZnJvbSAnY29tbW9uL21vZGVsL01vZGVsTW9kdWxlJztcbmltcG9ydCAnLi9Nb2RlbFRlc3REYXRhJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIEFjY2Vzc1JlcXVlc3RJdGVtUG9wdWxhdGlvblN0YXRpc3RpY3MgbW9kZWwgb2JqZWN0LlxuICovXG5kZXNjcmliZSgnQWNjZXNzUmVxdWVzdEl0ZW1Qb3B1bGF0aW9uU3RhdGlzdGljcycsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBwb3B1bGF0aW9uU3RhdGlzdGljc0RhdGEsXG4gICAgICAgIHBvcFN0YXRzLFxuICAgICAgICBBY2Nlc3NSZXF1ZXN0SXRlbVBvcHVsYXRpb25TdGF0aXN0aWNzO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kZWxNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9BY2Nlc3NSZXF1ZXN0SXRlbVBvcHVsYXRpb25TdGF0aXN0aWNzXywgbW9kZWxUZXN0RGF0YSkge1xuICAgICAgICBBY2Nlc3NSZXF1ZXN0SXRlbVBvcHVsYXRpb25TdGF0aXN0aWNzID0gX0FjY2Vzc1JlcXVlc3RJdGVtUG9wdWxhdGlvblN0YXRpc3RpY3NfO1xuICAgICAgICBwb3B1bGF0aW9uU3RhdGlzdGljc0RhdGEgPSBtb2RlbFRlc3REYXRhLlBPUFVMQVRJT05fU1RBVElTVElDUztcbiAgICAgICAgcG9wU3RhdHMgPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW1Qb3B1bGF0aW9uU3RhdGlzdGljcyhwb3B1bGF0aW9uU3RhdGlzdGljc0RhdGEpO1xuICAgIH0pKTtcblxuICAgIGl0KCdyZXF1aXJlcyBub24tbnVsbCBkYXRhIGluIHRoZSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbVBvcHVsYXRpb25TdGF0aXN0aWNzKG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHRoZSBkYXRhIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbVBvcHVsYXRpb25TdGF0aXN0aWNzKCdoaSBtb20nKTsgfSkudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbVBvcHVsYXRpb25TdGF0aXN0aWNzKGZ1bmN0aW9uKCkgeyByZXR1cm4gJ3doYXQgdGhhPyc7IH0pOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0b3RhbCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHBvcFN0YXRzLmdldFRvdGFsKCkpLnRvRXF1YWwocG9wdWxhdGlvblN0YXRpc3RpY3NEYXRhLnRvdGFsKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGNvdW50IGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocG9wU3RhdHMuZ2V0Q291bnQoKSkudG9FcXVhbChwb3B1bGF0aW9uU3RhdGlzdGljc0RhdGEuY291bnQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgaGlnaFJpc2sgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChwb3BTdGF0cy5pc0hpZ2hSaXNrKCkpLnRvRXF1YWwocG9wdWxhdGlvblN0YXRpc3RpY3NEYXRhLmhpZ2hSaXNrKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHJvdW5kZWQgcGVyY2VudGFnZSB2YWx1ZSBmcm9tIGNvdW50IGFuZCB0b3RhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocG9wU3RhdHMuZ2V0UGVyY2VudGFnZSgpKS50b0VxdWFsKDAuNSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
