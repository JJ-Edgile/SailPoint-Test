System.register(['test/js/TestInitializer', 'approval/ApprovalModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var approvalModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_approvalApprovalModule) {
            approvalModule = _approvalApprovalModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('ApprovalSunriseSunsetFilter', function () {
                var $filter,
                    filter,
                    feb28 = 1425103200000,
                    requestedAccessItem = {};

                beforeEach(module(approvalModule));

                beforeEach(inject(function (_$filter_, sunriseSunsetFilter, spTranslateFilter) {
                    $filter = _$filter_;
                    filter = sunriseSunsetFilter;
                    requestedAccessItem.sunriseDate = undefined;
                    requestedAccessItem.sunsetDate = undefined;

                    // Mock spTranslate to test localization
                    spTranslateFilter.configureCatalog({
                        'ui_date_start': 'Start {0}',
                        'ui_date_end': 'End {0}',
                        'ui_date_range': '{0} to {0}'
                    });
                }));

                it('should return an empty string for undefined dates', function () {
                    var filteredVal = filter(undefined, requestedAccessItem);
                    expect(filteredVal).toBeFalsy();
                    expect(filteredVal.length).toEqual(0);
                });

                it('should have start in the return for a sunrise date with no sunset', function () {
                    requestedAccessItem.sunriseDate = feb28;
                    var filteredVal = filter(undefined, requestedAccessItem);
                    expect(filteredVal).toBeTruthy();
                    expect(filteredVal.length).toBeGreaterThan(0);
                    expect(filteredVal.indexOf('Start')).toEqual(0);
                });

                it('should have end in the return for a sunset date with no sunrise', function () {
                    requestedAccessItem.sunsetDate = feb28;
                    var filteredVal = filter(undefined, requestedAccessItem);
                    expect(filteredVal).toBeTruthy();
                    expect(filteredVal.length).toBeGreaterThan(0);
                    expect(filteredVal.indexOf('End')).toEqual(0);
                });

                it('should have to in the return for a sunrise date with a sunset', function () {
                    requestedAccessItem.sunriseDate = feb28;
                    requestedAccessItem.sunsetDate = feb28;
                    var filteredVal = filter(undefined, requestedAccessItem);
                    expect(filteredVal).toBeTruthy();
                    expect(filteredVal.length).toBeGreaterThan(0);
                    expect(filteredVal.indexOf('to')).toBeGreaterThan(0);
                });

                it('should function as a renderer', function () {
                    requestedAccessItem.sunriseDate = feb28;
                    requestedAccessItem.sunsetDate = feb28;
                    var filteredVal = $filter('sunriseSunset')('', requestedAccessItem);
                    expect(filteredVal).toBeTruthy();
                    expect(filteredVal.length).toBeGreaterThan(0);
                    expect(filteredVal.indexOf('to')).toBeGreaterThan(0);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL0FwcHJvdmFsU3VucmlzZVN1bnNldEZpbHRlclRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQiw0Q0FBNEMsVUFBVSxTQUFTO0lBQ2xJOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsK0JBQStCLFlBQVc7Z0JBQy9DLElBQUk7b0JBQVM7b0JBQVEsUUFBUTtvQkFBZSxzQkFBc0I7O2dCQUVsRSxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxXQUFXLHFCQUFxQixtQkFBbUI7b0JBQzFFLFVBQVU7b0JBQ1YsU0FBUztvQkFDVCxvQkFBb0IsY0FBYztvQkFDbEMsb0JBQW9CLGFBQWE7OztvQkFHakMsa0JBQWtCLGlCQUFpQjt3QkFDL0IsaUJBQWlCO3dCQUNqQixlQUFlO3dCQUNmLGlCQUFpQjs7OztnQkFJekIsR0FBRyxxREFBcUQsWUFBVztvQkFDL0QsSUFBSSxjQUFjLE9BQU8sV0FBVztvQkFDcEMsT0FBTyxhQUFhO29CQUNwQixPQUFPLFlBQVksUUFBUSxRQUFROzs7Z0JBR3ZDLEdBQUcscUVBQXFFLFlBQVc7b0JBQy9FLG9CQUFvQixjQUFjO29CQUNsQyxJQUFJLGNBQWMsT0FBTyxXQUFXO29CQUNwQyxPQUFPLGFBQWE7b0JBQ3BCLE9BQU8sWUFBWSxRQUFRLGdCQUFnQjtvQkFDM0MsT0FBTyxZQUFZLFFBQVEsVUFBVSxRQUFROzs7Z0JBR2pELEdBQUcsbUVBQW1FLFlBQVc7b0JBQzdFLG9CQUFvQixhQUFhO29CQUNqQyxJQUFJLGNBQWMsT0FBTyxXQUFXO29CQUNwQyxPQUFPLGFBQWE7b0JBQ3BCLE9BQU8sWUFBWSxRQUFRLGdCQUFnQjtvQkFDM0MsT0FBTyxZQUFZLFFBQVEsUUFBUSxRQUFROzs7Z0JBRy9DLEdBQUcsaUVBQWlFLFlBQVc7b0JBQzNFLG9CQUFvQixjQUFjO29CQUNsQyxvQkFBb0IsYUFBYTtvQkFDakMsSUFBSSxjQUFjLE9BQU8sV0FBVztvQkFDcEMsT0FBTyxhQUFhO29CQUNwQixPQUFPLFlBQVksUUFBUSxnQkFBZ0I7b0JBQzNDLE9BQU8sWUFBWSxRQUFRLE9BQU8sZ0JBQWdCOzs7Z0JBR3RELEdBQUcsaUNBQWlDLFlBQVc7b0JBQzNDLG9CQUFvQixjQUFjO29CQUNsQyxvQkFBb0IsYUFBYTtvQkFDakMsSUFBSSxjQUFjLFFBQVEsaUJBQWlCLElBQUk7b0JBQy9DLE9BQU8sYUFBYTtvQkFDcEIsT0FBTyxZQUFZLFFBQVEsZ0JBQWdCO29CQUMzQyxPQUFPLFlBQVksUUFBUSxPQUFPLGdCQUFnQjs7Ozs7R0FjdkQiLCJmaWxlIjoiYXBwcm92YWwvQXBwcm92YWxTdW5yaXNlU3Vuc2V0RmlsdGVyVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGFwcHJvdmFsTW9kdWxlIGZyb20gJ2FwcHJvdmFsL0FwcHJvdmFsTW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcblxuZGVzY3JpYmUoJ0FwcHJvdmFsU3VucmlzZVN1bnNldEZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkZmlsdGVyLCBmaWx0ZXIsIGZlYjI4ID0gMTQyNTEwMzIwMDAwMCwgcmVxdWVzdGVkQWNjZXNzSXRlbSA9IHt9O1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYXBwcm92YWxNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kZmlsdGVyXywgc3VucmlzZVN1bnNldEZpbHRlciwgc3BUcmFuc2xhdGVGaWx0ZXIpIHtcbiAgICAgICAgJGZpbHRlciA9IF8kZmlsdGVyXztcbiAgICAgICAgZmlsdGVyID0gc3VucmlzZVN1bnNldEZpbHRlcjtcbiAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5zdW5yaXNlRGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5zdW5zZXREYXRlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIE1vY2sgc3BUcmFuc2xhdGUgdG8gdGVzdCBsb2NhbGl6YXRpb25cbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XG4gICAgICAgICAgICAndWlfZGF0ZV9zdGFydCc6ICdTdGFydCB7MH0nLFxuICAgICAgICAgICAgJ3VpX2RhdGVfZW5kJzogJ0VuZCB7MH0nLFxuICAgICAgICAgICAgJ3VpX2RhdGVfcmFuZ2UnOiAnezB9IHRvIHswfSdcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIGZvciB1bmRlZmluZWQgZGF0ZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbHRlcmVkVmFsID0gZmlsdGVyKHVuZGVmaW5lZCwgcmVxdWVzdGVkQWNjZXNzSXRlbSk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbCkudG9CZUZhbHN5KCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbC5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgc3RhcnQgaW4gdGhlIHJldHVybiBmb3IgYSBzdW5yaXNlIGRhdGUgd2l0aCBubyBzdW5zZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5zdW5yaXNlRGF0ZSA9IGZlYjI4O1xuICAgICAgICB2YXIgZmlsdGVyZWRWYWwgPSBmaWx0ZXIodW5kZWZpbmVkLCByZXF1ZXN0ZWRBY2Nlc3NJdGVtKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbC5sZW5ndGgpLnRvQmVHcmVhdGVyVGhhbigwKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsLmluZGV4T2YoJ1N0YXJ0JykpLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZW5kIGluIHRoZSByZXR1cm4gZm9yIGEgc3Vuc2V0IGRhdGUgd2l0aCBubyBzdW5yaXNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlcXVlc3RlZEFjY2Vzc0l0ZW0uc3Vuc2V0RGF0ZSA9IGZlYjI4O1xuICAgICAgICB2YXIgZmlsdGVyZWRWYWwgPSBmaWx0ZXIodW5kZWZpbmVkLCByZXF1ZXN0ZWRBY2Nlc3NJdGVtKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbC5sZW5ndGgpLnRvQmVHcmVhdGVyVGhhbigwKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsLmluZGV4T2YoJ0VuZCcpKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIHRvIGluIHRoZSByZXR1cm4gZm9yIGEgc3VucmlzZSBkYXRlIHdpdGggYSBzdW5zZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5zdW5yaXNlRGF0ZSA9IGZlYjI4O1xuICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtLnN1bnNldERhdGUgPSBmZWIyODtcbiAgICAgICAgdmFyIGZpbHRlcmVkVmFsID0gZmlsdGVyKHVuZGVmaW5lZCwgcmVxdWVzdGVkQWNjZXNzSXRlbSk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbCkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRWYWwubGVuZ3RoKS50b0JlR3JlYXRlclRoYW4oMCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbC5pbmRleE9mKCd0bycpKS50b0JlR3JlYXRlclRoYW4oMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGZ1bmN0aW9uIGFzIGEgcmVuZGVyZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5zdW5yaXNlRGF0ZSA9IGZlYjI4O1xuICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtLnN1bnNldERhdGUgPSBmZWIyODtcbiAgICAgICAgdmFyIGZpbHRlcmVkVmFsID0gJGZpbHRlcignc3VucmlzZVN1bnNldCcpKCcnLCByZXF1ZXN0ZWRBY2Nlc3NJdGVtKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbC5sZW5ndGgpLnRvQmVHcmVhdGVyVGhhbigwKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsLmluZGV4T2YoJ3RvJykpLnRvQmVHcmVhdGVyVGhhbigwKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
