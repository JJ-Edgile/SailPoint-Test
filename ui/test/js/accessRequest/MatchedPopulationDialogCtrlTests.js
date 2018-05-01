System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }],
        execute: function () {

            describe('MatchedPopulationDialogCtrl', function () {
                var accessRequestItem = {
                    id: 'someItem'
                },
                    searchData = {
                    filterValues: {
                        filter: 'value'
                    }
                },
                    accessRequestItemsService,
                    ctrl;

                beforeEach(module(accessRequestModule));

                beforeEach(inject(function ($controller) {
                    accessRequestItemsService = {
                        getPopulationIdentities: jasmine.createSpy()
                    };
                    ctrl = $controller('MatchedPopulationDialogCtrl', {
                        accessRequestItem: accessRequestItem,
                        accessRequestItemsService: accessRequestItemsService,
                        searchData: searchData
                    });
                }));

                it('calls accessRequestItemsService for getMatchedIdentities()', function () {
                    var startIdx = 0,
                        limit = 10,
                        sortOrder = {};
                    accessRequestItemsService.getPopulationIdentities.calls.reset();
                    ctrl.getMatchedIdentities(startIdx, limit, searchData.filterValues, sortOrder);
                    expect(accessRequestItemsService.getPopulationIdentities).toHaveBeenCalledWith(accessRequestItem, true, searchData.filterValues, startIdx, limit, sortOrder);
                });

                it('calls accessRequestItemsService for getUnmatchedIdentities()', function () {
                    var startIdx = 0,
                        limit = 10,
                        sortOrder = {};
                    accessRequestItemsService.getPopulationIdentities.calls.reset();
                    ctrl.getUnmatchedIdentities(startIdx, limit, searchData.filterValues, sortOrder);
                    expect(accessRequestItemsService.getPopulationIdentities).toHaveBeenCalledWith(accessRequestItem, false, searchData.filterValues, startIdx, limit, sortOrder);
                });

                it('flips the isRenderNonMatchingIdentities flag when called', function () {
                    expect(ctrl.isRenderUnmatchedIdentities).toBe(false);
                    ctrl.renderUnmatchedIdentities();
                    expect(ctrl.isRenderUnmatchedIdentities).toBe(true);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvTWF0Y2hlZFBvcHVsYXRpb25EaWFsb2dDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNDQUFzQyxVQUFVLFNBQVM7SUFBckc7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsK0JBQStCLFlBQVc7Z0JBQy9DLElBQUksb0JBQW9CO29CQUNwQixJQUFJOztvQkFDTCxhQUFhO29CQUNaLGNBQWM7d0JBQ1YsUUFBUTs7O29CQUViO29CQUEyQjs7Z0JBRTlCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGFBQWE7b0JBQ3BDLDRCQUE0Qjt3QkFDeEIseUJBQXlCLFFBQVE7O29CQUVyQyxPQUFPLFlBQVksK0JBQStCO3dCQUM5QyxtQkFBbUI7d0JBQ25CLDJCQUEyQjt3QkFDM0IsWUFBWTs7OztnQkFJcEIsR0FBSSw4REFBOEQsWUFBVztvQkFDekUsSUFBSSxXQUFXO3dCQUNYLFFBQVE7d0JBQ1IsWUFBWTtvQkFDaEIsMEJBQTBCLHdCQUF3QixNQUFNO29CQUN4RCxLQUFLLHFCQUFxQixVQUFVLE9BQU8sV0FBVyxjQUFjO29CQUNwRSxPQUFPLDBCQUEwQix5QkFDN0IscUJBQXFCLG1CQUFtQixNQUFNLFdBQVcsY0FBYyxVQUFVLE9BQU87OztnQkFHaEcsR0FBSSxnRUFBZ0UsWUFBVztvQkFDM0UsSUFBSSxXQUFXO3dCQUNYLFFBQVE7d0JBQ1IsWUFBWTtvQkFDaEIsMEJBQTBCLHdCQUF3QixNQUFNO29CQUN4RCxLQUFLLHVCQUF1QixVQUFVLE9BQU8sV0FBVyxjQUFjO29CQUN0RSxPQUFPLDBCQUEwQix5QkFDN0IscUJBQXFCLG1CQUFtQixPQUFPLFdBQVcsY0FBYyxVQUFVLE9BQU87OztnQkFHakcsR0FBSSw0REFBNEQsWUFBVztvQkFDdkUsT0FBTyxLQUFLLDZCQUE2QixLQUFLO29CQUM5QyxLQUFLO29CQUNMLE9BQU8sS0FBSyw2QkFBNkIsS0FBSzs7Ozs7R0FXbkQiLCJmaWxlIjoiYWNjZXNzUmVxdWVzdC9NYXRjaGVkUG9wdWxhdGlvbkRpYWxvZ0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYWNjZXNzUmVxdWVzdE1vZHVsZSBmcm9tICdhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnTWF0Y2hlZFBvcHVsYXRpb25EaWFsb2dDdHJsJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFjY2Vzc1JlcXVlc3RJdGVtID0ge1xuICAgICAgICBpZDogJ3NvbWVJdGVtJ1xuICAgIH0sIHNlYXJjaERhdGEgPSB7XG4gICAgICAgIGZpbHRlclZhbHVlczoge1xuICAgICAgICAgICAgZmlsdGVyOiAndmFsdWUnXG4gICAgICAgIH1cbiAgICB9LCBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLCBjdHJsO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZSA9IHtcbiAgICAgICAgICAgIGdldFBvcHVsYXRpb25JZGVudGl0aWVzOiBqYXNtaW5lLmNyZWF0ZVNweSgpXG4gICAgICAgIH07XG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignTWF0Y2hlZFBvcHVsYXRpb25EaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW06IGFjY2Vzc1JlcXVlc3RJdGVtLFxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZTogYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZSxcbiAgICAgICAgICAgIHNlYXJjaERhdGE6IHNlYXJjaERhdGFcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgaXQgKCdjYWxscyBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlIGZvciBnZXRNYXRjaGVkSWRlbnRpdGllcygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdGFydElkeCA9IDAsXG4gICAgICAgICAgICBsaW1pdCA9IDEwLFxuICAgICAgICAgICAgc29ydE9yZGVyID0ge307XG4gICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0UG9wdWxhdGlvbklkZW50aXRpZXMuY2FsbHMucmVzZXQoKTtcbiAgICAgICAgY3RybC5nZXRNYXRjaGVkSWRlbnRpdGllcyhzdGFydElkeCwgbGltaXQsIHNlYXJjaERhdGEuZmlsdGVyVmFsdWVzLCBzb3J0T3JkZXIpO1xuICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRQb3B1bGF0aW9uSWRlbnRpdGllcykuXG4gICAgICAgICAgICB0b0hhdmVCZWVuQ2FsbGVkV2l0aChhY2Nlc3NSZXF1ZXN0SXRlbSwgdHJ1ZSwgc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMsIHN0YXJ0SWR4LCBsaW1pdCwgc29ydE9yZGVyKTtcbiAgICB9KTtcblxuICAgIGl0ICgnY2FsbHMgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZSBmb3IgZ2V0VW5tYXRjaGVkSWRlbnRpdGllcygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdGFydElkeCA9IDAsXG4gICAgICAgICAgICBsaW1pdCA9IDEwLFxuICAgICAgICAgICAgc29ydE9yZGVyID0ge307XG4gICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0UG9wdWxhdGlvbklkZW50aXRpZXMuY2FsbHMucmVzZXQoKTtcbiAgICAgICAgY3RybC5nZXRVbm1hdGNoZWRJZGVudGl0aWVzKHN0YXJ0SWR4LCBsaW1pdCwgc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMsIHNvcnRPcmRlcik7XG4gICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldFBvcHVsYXRpb25JZGVudGl0aWVzKS5cbiAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKGFjY2Vzc1JlcXVlc3RJdGVtLCBmYWxzZSwgc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMsIHN0YXJ0SWR4LCBsaW1pdCwgc29ydE9yZGVyKTtcbiAgICB9KTtcblxuICAgIGl0ICgnZmxpcHMgdGhlIGlzUmVuZGVyTm9uTWF0Y2hpbmdJZGVudGl0aWVzIGZsYWcgd2hlbiBjYWxsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGN0cmwuaXNSZW5kZXJVbm1hdGNoZWRJZGVudGl0aWVzKS50b0JlKGZhbHNlKTtcbiAgICAgICAgY3RybC5yZW5kZXJVbm1hdGNoZWRJZGVudGl0aWVzKCk7XG4gICAgICAgIGV4cGVjdChjdHJsLmlzUmVuZGVyVW5tYXRjaGVkSWRlbnRpdGllcykudG9CZSh0cnVlKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
