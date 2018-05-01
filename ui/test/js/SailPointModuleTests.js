System.register(['test/js/TestInitializer', 'SailPointModule'], function (_export) {

    /**
     * Test the SailPointModule
     */
    'use strict';

    var sailpointModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_SailPointModule) {
            sailpointModule = _SailPointModule['default'];
        }],
        execute: function () {
            describe('SailPointModule', function () {
                var $rootScope,
                    $state,
                    lcmState = {
                    name: 'requiredLcm',
                    data: {
                        lcmConfig: {
                            isLcm: true
                        }
                    }
                },
                    falseLcmConfigState = {
                    name: 'requiredLcm',
                    data: {
                        lcmConfig: {
                            isLcm: false
                        }
                    }
                },
                    nonLcmState = {
                    name: 'noLcmNeeded'
                },
                    selfServiceState = {
                    name: 'selfServiceState',
                    data: {
                        lcmConfig: {
                            isLcm: true,
                            isSelfService: true
                        }
                    }

                },
                    noState = {},
                    event;

                function init(lcmEnabled, selfServiceEnabled) {
                    module(sailpointModule, function ($provide) {
                        $provide.constant('SP_LCM_ENABLED', lcmEnabled);
                        $provide.constant('SP_LCM_SELF_SERVICE_ENABLED', selfServiceEnabled);
                    });

                    inject(function (_$rootScope_, _$state_) {
                        $rootScope = _$rootScope_;
                        $state = _$state_;
                    });

                    spyOn($state, 'go');
                }

                describe('with LCM Disabled', function () {
                    beforeEach(function () {
                        init(false, false);
                    });

                    it('should cancel when transferring to LCM required states', function () {
                        event = $rootScope.$broadcast('$stateChangeStart', lcmState, undefined, nonLcmState);
                        expect(event.defaultPrevented).toBeTruthy();
                        expect($state.go).not.toHaveBeenCalled();
                    });

                    it('should cancel and reroute to home when transferring to LCM required state from no state', function () {
                        event = $rootScope.$broadcast('$stateChangeStart', lcmState, undefined, noState);
                        expect(event.defaultPrevented).toBeTruthy();
                        expect($state.go).toHaveBeenCalled();
                    });

                    it('should not cancel when transferring to a non-LCM required state', function () {
                        event = $rootScope.$broadcast('$stateChangeStart', nonLcmState, undefined, noState);
                        expect(event.defaultPrevented).toBeFalsy();
                        expect($state.go).not.toHaveBeenCalled();
                    });

                    it('should not cancel when transferring to a state with isLcm set to false', function () {
                        event = $rootScope.$broadcast('$stateChangeStart', falseLcmConfigState, undefined, noState);
                        expect(event.defaultPrevented).toBeFalsy();
                        expect($state.go).not.toHaveBeenCalled();
                    });

                    it('should cancel when transferring to a self service state', function () {
                        event = $rootScope.$broadcast('$stateChangeStart', selfServiceState, undefined, noState);
                        expect(event.defaultPrevented).toBeTruthy();
                        expect($state.go).toHaveBeenCalled();
                    });
                });

                describe('with LCM Enabled', function () {
                    beforeEach(function () {
                        init(true, false);
                    });

                    it('should not cancel LCM required states', function () {
                        event = $rootScope.$broadcast('$stateChangeStart', lcmState, undefined, nonLcmState);
                        expect(event.defaultPrevented).toBeFalsy();
                        expect($state.go).not.toHaveBeenCalled();
                    });

                    it('should not cancel non-LCM required states', function () {
                        event = $rootScope.$broadcast('$stateChangeStart', nonLcmState, undefined, lcmState);
                        expect(event.defaultPrevented).toBeFalsy();
                        expect($state.go).not.toHaveBeenCalled();
                    });

                    it('should cancel when transferring to a self service state', function () {
                        event = $rootScope.$broadcast('$stateChangeStart', selfServiceState, undefined, noState);
                        expect(event.defaultPrevented).toBeTruthy();
                        expect($state.go).toHaveBeenCalled();
                    });
                });

                describe('with LCM and Self Service Enabled', function () {
                    beforeEach(function () {
                        init(true, true);
                    });

                    it('should not cancel LCM required states', function () {
                        event = $rootScope.$broadcast('$stateChangeStart', lcmState, undefined, nonLcmState);
                        expect(event.defaultPrevented).toBeFalsy();
                        expect($state.go).not.toHaveBeenCalled();
                    });

                    it('should not cancel non-LCM required states', function () {
                        event = $rootScope.$broadcast('$stateChangeStart', nonLcmState, undefined, lcmState);
                        expect(event.defaultPrevented).toBeFalsy();
                        expect($state.go).not.toHaveBeenCalled();
                    });

                    it('should not cancel when transferring to a self service state', function () {
                        event = $rootScope.$broadcast('$stateChangeStart', selfServiceState, undefined, noState);
                        expect(event.defaultPrevented).toBeFalsy();
                        expect($state.go).not.toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNhaWxQb2ludE1vZHVsZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixvQkFBb0IsVUFBVSxTQUFTOzs7OztJQUFuRjs7SUFPSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsa0JBQWtCO1lBQ3hFLGtCQUFrQixpQkFBaUI7O1FBRXZDLFNBQVMsWUFBWTtZQUo3QixTQUFTLG1CQUFtQixZQUFXO2dCQUNuQyxJQUFJO29CQUFZO29CQUNaLFdBQVc7b0JBQ1AsTUFBTTtvQkFDTixNQUFNO3dCQUNGLFdBQVc7NEJBQ1AsT0FBTzs7OztvQkFJbkIsc0JBQXNCO29CQUNsQixNQUFNO29CQUNOLE1BQU07d0JBQ0YsV0FBVzs0QkFDUCxPQUFPOzs7O29CQUluQixjQUFjO29CQUNWLE1BQU07O29CQUVWLG1CQUFtQjtvQkFDZixNQUFNO29CQUNOLE1BQU07d0JBQ0YsV0FBVzs0QkFDUCxPQUFPOzRCQUNQLGVBQWU7Ozs7O29CQUszQixVQUFVO29CQUNWOztnQkFFSixTQUFTLEtBQUssWUFBWSxvQkFBb0I7b0JBQzFDLE9BQU8saUJBQWlCLFVBQVMsVUFBVTt3QkFDdkMsU0FBUyxTQUFTLGtCQUFrQjt3QkFDcEMsU0FBUyxTQUFTLCtCQUErQjs7O29CQUdyRCxPQUFPLFVBQVMsY0FBYyxVQUFVO3dCQUNwQyxhQUFhO3dCQUNiLFNBQVM7OztvQkFHYixNQUFNLFFBQVE7OztnQkFHbEIsU0FBUyxxQkFBcUIsWUFBVztvQkFDckMsV0FBVyxZQUFXO3dCQUNsQixLQUFLLE9BQU87OztvQkFHaEIsR0FBRywwREFBMEQsWUFBVzt3QkFDcEUsUUFBUSxXQUFXLFdBQVcscUJBQXFCLFVBQVUsV0FBVzt3QkFDeEUsT0FBTyxNQUFNLGtCQUFrQjt3QkFDL0IsT0FBTyxPQUFPLElBQUksSUFBSTs7O29CQUcxQixHQUFHLDJGQUEyRixZQUFXO3dCQUNyRyxRQUFRLFdBQVcsV0FBVyxxQkFBcUIsVUFBVSxXQUFXO3dCQUN4RSxPQUFPLE1BQU0sa0JBQWtCO3dCQUMvQixPQUFPLE9BQU8sSUFBSTs7O29CQUd0QixHQUFHLG1FQUFtRSxZQUFXO3dCQUM3RSxRQUFRLFdBQVcsV0FBVyxxQkFBcUIsYUFBYSxXQUFXO3dCQUMzRSxPQUFPLE1BQU0sa0JBQWtCO3dCQUMvQixPQUFPLE9BQU8sSUFBSSxJQUFJOzs7b0JBRzFCLEdBQUcsMEVBQTBFLFlBQVc7d0JBQ3BGLFFBQVEsV0FBVyxXQUFXLHFCQUFxQixxQkFBcUIsV0FBVzt3QkFDbkYsT0FBTyxNQUFNLGtCQUFrQjt3QkFDL0IsT0FBTyxPQUFPLElBQUksSUFBSTs7O29CQUcxQixHQUFHLDJEQUEyRCxZQUFXO3dCQUNyRSxRQUFRLFdBQVcsV0FBVyxxQkFBcUIsa0JBQWtCLFdBQVc7d0JBQ2hGLE9BQU8sTUFBTSxrQkFBa0I7d0JBQy9CLE9BQU8sT0FBTyxJQUFJOzs7O2dCQUsxQixTQUFTLG9CQUFvQixZQUFXO29CQUNwQyxXQUFXLFlBQVc7d0JBQ2xCLEtBQUssTUFBTTs7O29CQUdmLEdBQUcseUNBQXlDLFlBQVc7d0JBQ25ELFFBQVEsV0FBVyxXQUFXLHFCQUFxQixVQUFVLFdBQVc7d0JBQ3hFLE9BQU8sTUFBTSxrQkFBa0I7d0JBQy9CLE9BQU8sT0FBTyxJQUFJLElBQUk7OztvQkFHMUIsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsUUFBUSxXQUFXLFdBQVcscUJBQXFCLGFBQWEsV0FBVzt3QkFDM0UsT0FBTyxNQUFNLGtCQUFrQjt3QkFDL0IsT0FBTyxPQUFPLElBQUksSUFBSTs7O29CQUcxQixHQUFHLDJEQUEyRCxZQUFXO3dCQUNyRSxRQUFRLFdBQVcsV0FBVyxxQkFBcUIsa0JBQWtCLFdBQVc7d0JBQ2hGLE9BQU8sTUFBTSxrQkFBa0I7d0JBQy9CLE9BQU8sT0FBTyxJQUFJOzs7O2dCQUkxQixTQUFTLHFDQUFxQyxZQUFXO29CQUNyRCxXQUFXLFlBQVc7d0JBQ2xCLEtBQUssTUFBTTs7O29CQUdmLEdBQUcseUNBQXlDLFlBQVc7d0JBQ25ELFFBQVEsV0FBVyxXQUFXLHFCQUFxQixVQUFVLFdBQVc7d0JBQ3hFLE9BQU8sTUFBTSxrQkFBa0I7d0JBQy9CLE9BQU8sT0FBTyxJQUFJLElBQUk7OztvQkFHMUIsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsUUFBUSxXQUFXLFdBQVcscUJBQXFCLGFBQWEsV0FBVzt3QkFDM0UsT0FBTyxNQUFNLGtCQUFrQjt3QkFDL0IsT0FBTyxPQUFPLElBQUksSUFBSTs7O29CQUcxQixHQUFHLCtEQUErRCxZQUFXO3dCQUN6RSxRQUFRLFdBQVcsV0FBVyxxQkFBcUIsa0JBQWtCLFdBQVc7d0JBQ2hGLE9BQU8sTUFBTSxrQkFBa0I7d0JBQy9CLE9BQU8sT0FBTyxJQUFJLElBQUk7Ozs7OztHQVcvQiIsImZpbGUiOiJTYWlsUG9pbnRNb2R1bGVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgc2FpbHBvaW50TW9kdWxlIGZyb20gJ1NhaWxQb2ludE1vZHVsZSc7XG5cbi8qKlxuICogVGVzdCB0aGUgU2FpbFBvaW50TW9kdWxlXG4gKi9cbmRlc2NyaWJlKCdTYWlsUG9pbnRNb2R1bGUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHJvb3RTY29wZSwgJHN0YXRlLFxuICAgICAgICBsY21TdGF0ZSA9IHtcbiAgICAgICAgICAgIG5hbWU6ICdyZXF1aXJlZExjbScsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbGNtQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICAgIGlzTGNtOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWxzZUxjbUNvbmZpZ1N0YXRlID0ge1xuICAgICAgICAgICAgbmFtZTogJ3JlcXVpcmVkTGNtJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBsY21Db25maWc6IHtcbiAgICAgICAgICAgICAgICAgICAgaXNMY206IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBub25MY21TdGF0ZSA9IHtcbiAgICAgICAgICAgIG5hbWU6ICdub0xjbU5lZWRlZCdcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZlNlcnZpY2VTdGF0ZSA9IHtcbiAgICAgICAgICAgIG5hbWU6ICdzZWxmU2VydmljZVN0YXRlJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBsY21Db25maWc6IHtcbiAgICAgICAgICAgICAgICAgICAgaXNMY206IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZlNlcnZpY2U6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICAgICAgbm9TdGF0ZSA9IHt9LFxuICAgICAgICBldmVudDtcblxuICAgIGZ1bmN0aW9uIGluaXQobGNtRW5hYmxlZCwgc2VsZlNlcnZpY2VFbmFibGVkKSB7XG4gICAgICAgIG1vZHVsZShzYWlscG9pbnRNb2R1bGUsIGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfTENNX0VOQUJMRUQnLCBsY21FbmFibGVkKTtcbiAgICAgICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9MQ01fU0VMRl9TRVJWSUNFX0VOQUJMRUQnLCBzZWxmU2VydmljZUVuYWJsZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJHN0YXRlXykge1xuICAgICAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgICAgICRzdGF0ZSA9IF8kc3RhdGVfO1xuICAgICAgICB9KTtcblxuICAgICAgICBzcHlPbigkc3RhdGUsICdnbycpO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCd3aXRoIExDTSBEaXNhYmxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaW5pdChmYWxzZSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbmNlbCB3aGVuIHRyYW5zZmVycmluZyB0byBMQ00gcmVxdWlyZWQgc3RhdGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBldmVudCA9ICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3RhcnQnLCBsY21TdGF0ZSwgdW5kZWZpbmVkLCBub25MY21TdGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzdGF0ZS5nbykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYW5jZWwgYW5kIHJlcm91dGUgdG8gaG9tZSB3aGVuIHRyYW5zZmVycmluZyB0byBMQ00gcmVxdWlyZWQgc3RhdGUgZnJvbSBubyBzdGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXZlbnQgPSAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRzdGF0ZUNoYW5nZVN0YXJ0JywgbGNtU3RhdGUsIHVuZGVmaW5lZCwgbm9TdGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzdGF0ZS5nbykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYW5jZWwgd2hlbiB0cmFuc2ZlcnJpbmcgdG8gYSBub24tTENNIHJlcXVpcmVkIHN0YXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBldmVudCA9ICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3RhcnQnLCBub25MY21TdGF0ZSwgdW5kZWZpbmVkLCBub1N0YXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChldmVudC5kZWZhdWx0UHJldmVudGVkKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc3RhdGUuZ28pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGNhbmNlbCB3aGVuIHRyYW5zZmVycmluZyB0byBhIHN0YXRlIHdpdGggaXNMY20gc2V0IHRvIGZhbHNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBldmVudCA9ICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3RhcnQnLCBmYWxzZUxjbUNvbmZpZ1N0YXRlLCB1bmRlZmluZWQsIG5vU3RhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzdGF0ZS5nbykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYW5jZWwgd2hlbiB0cmFuc2ZlcnJpbmcgdG8gYSBzZWxmIHNlcnZpY2Ugc3RhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV2ZW50ID0gJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckc3RhdGVDaGFuZ2VTdGFydCcsIHNlbGZTZXJ2aWNlU3RhdGUsIHVuZGVmaW5lZCwgbm9TdGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzdGF0ZS5nbykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3dpdGggTENNIEVuYWJsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGluaXQodHJ1ZSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYW5jZWwgTENNIHJlcXVpcmVkIHN0YXRlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXZlbnQgPSAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRzdGF0ZUNoYW5nZVN0YXJ0JywgbGNtU3RhdGUsIHVuZGVmaW5lZCwgbm9uTGNtU3RhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzdGF0ZS5nbykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2FuY2VsIG5vbi1MQ00gcmVxdWlyZWQgc3RhdGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBldmVudCA9ICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3RhcnQnLCBub25MY21TdGF0ZSwgdW5kZWZpbmVkLCBsY21TdGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QoJHN0YXRlLmdvKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbmNlbCB3aGVuIHRyYW5zZmVycmluZyB0byBhIHNlbGYgc2VydmljZSBzdGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXZlbnQgPSAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRzdGF0ZUNoYW5nZVN0YXJ0Jywgc2VsZlNlcnZpY2VTdGF0ZSwgdW5kZWZpbmVkLCBub1N0YXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChldmVudC5kZWZhdWx0UHJldmVudGVkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoJHN0YXRlLmdvKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3dpdGggTENNIGFuZCBTZWxmIFNlcnZpY2UgRW5hYmxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaW5pdCh0cnVlLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2FuY2VsIExDTSByZXF1aXJlZCBzdGF0ZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV2ZW50ID0gJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckc3RhdGVDaGFuZ2VTdGFydCcsIGxjbVN0YXRlLCB1bmRlZmluZWQsIG5vbkxjbVN0YXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChldmVudC5kZWZhdWx0UHJldmVudGVkKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc3RhdGUuZ28pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGNhbmNlbCBub24tTENNIHJlcXVpcmVkIHN0YXRlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXZlbnQgPSAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRzdGF0ZUNoYW5nZVN0YXJ0Jywgbm9uTGNtU3RhdGUsIHVuZGVmaW5lZCwgbGNtU3RhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzdGF0ZS5nbykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2FuY2VsIHdoZW4gdHJhbnNmZXJyaW5nIHRvIGEgc2VsZiBzZXJ2aWNlIHN0YXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBldmVudCA9ICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3RhcnQnLCBzZWxmU2VydmljZVN0YXRlLCB1bmRlZmluZWQsIG5vU3RhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzdGF0ZS5nbykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
