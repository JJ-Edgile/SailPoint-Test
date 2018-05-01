System.register(['test/js/TestInitializer', 'common/util/UtilModule', 'test/js/common/util/SpDateServiceMocker'], function (_export) {
    'use strict';

    var utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }, function (_testJsCommonUtilSpDateServiceMocker) {}],
        execute: function () {

            describe('spDateServiceMocker', function () {
                var spDateServiceMocker;

                beforeEach(module(utilModule));

                beforeEach(inject(function (_spDateServiceMocker_) {
                    spDateServiceMocker = _spDateServiceMocker_;
                }));

                describe('mockSetDateComponents', function () {
                    var DATE = new Date(),
                        DATE2 = new Date(DATE.getTime() + 5000),
                        HOURS = 8,
                        MINUTES = 4,
                        SECONDS = 32,
                        MILLIS = 473,
                        RETURN_DATE = new Date(DATE.getTime() + 10000),
                        RETURN_DATE2 = new Date(DATE.getTime() + 50000),
                        func;

                    beforeEach(function () {
                        func = spDateServiceMocker.mockSetDateComponents([{
                            date: DATE,
                            hours: HOURS,
                            minutes: MINUTES,
                            seconds: SECONDS,
                            millis: MILLIS,
                            returnValue: RETURN_DATE
                        }, {
                            date: DATE2,
                            hours: HOURS + 1,
                            minutes: MINUTES + 1,
                            seconds: SECONDS + 1,
                            millis: MILLIS + 1,
                            returnValue: RETURN_DATE2
                        }]);
                    });

                    it('blows chunks with no mock data', function () {
                        expect(function () {
                            spDateServiceMocker.mockSetDateComponents(null);
                        }).toThrow();
                    });

                    it('blows chunks when setting date components that have not been configured.', function () {
                        expect(function () {
                            func(DATE + 1, HOURS, MINUTES, SECONDS, MILLIS);
                        }).toThrow();
                        expect(function () {
                            func(DATE, HOURS + 1, MINUTES, SECONDS, MILLIS);
                        }).toThrow();
                        expect(function () {
                            func(DATE, HOURS, MINUTES + 1, SECONDS, MILLIS);
                        }).toThrow();
                        expect(function () {
                            func(DATE, HOURS, MINUTES, SECONDS + 1, MILLIS);
                        }).toThrow();
                        expect(function () {
                            func(DATE, HOURS, MINUTES, SECONDS, MILLIS + 1);
                        }).toThrow();
                    });

                    it('returns the configured date for the first mock data in the list', function () {
                        expect(func(DATE, HOURS, MINUTES, SECONDS, MILLIS)).toEqual(RETURN_DATE);
                    });

                    it('returns the configured date for the second mock data in the list', function () {
                        expect(func(DATE2, HOURS + 1, MINUTES + 1, SECONDS + 1, MILLIS + 1)).toEqual(RETURN_DATE2);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsL1NwRGF0ZVNlcnZpY2VNb2NrZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMEJBQTBCLDRDQUE0QyxVQUFVLFNBQVM7SUFBckk7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjtXQUNwQyxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBRjdCLFNBQVMsdUJBQXVCLFlBQVc7Z0JBQ3ZDLElBQUk7O2dCQUVKLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLHVCQUF1QjtvQkFDOUMsc0JBQXNCOzs7Z0JBRzFCLFNBQVMseUJBQXlCLFlBQVc7b0JBQ3pDLElBQUksT0FBTyxJQUFJO3dCQUNYLFFBQVEsSUFBSSxLQUFLLEtBQUssWUFBWTt3QkFDbEMsUUFBUTt3QkFDUixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsU0FBUzt3QkFDVCxjQUFjLElBQUksS0FBSyxLQUFLLFlBQVk7d0JBQ3hDLGVBQWUsSUFBSSxLQUFLLEtBQUssWUFBWTt3QkFDekM7O29CQUVKLFdBQVcsWUFBVzt3QkFDbEIsT0FBTyxvQkFBb0Isc0JBQXNCLENBQUM7NEJBQzlDLE1BQU07NEJBQ04sT0FBTzs0QkFDUCxTQUFTOzRCQUNULFNBQVM7NEJBQ1QsUUFBUTs0QkFDUixhQUFhOzJCQUNkOzRCQUNDLE1BQU07NEJBQ04sT0FBTyxRQUFROzRCQUNmLFNBQVMsVUFBVTs0QkFDbkIsU0FBUyxVQUFVOzRCQUNuQixRQUFRLFNBQVM7NEJBQ2pCLGFBQWE7Ozs7b0JBSXJCLEdBQUcsa0NBQWtDLFlBQVc7d0JBQzVDLE9BQU8sWUFBVzs0QkFBRSxvQkFBb0Isc0JBQXNCOzJCQUFVOzs7b0JBRzVFLEdBQUcsNEVBQTRFLFlBQVc7d0JBQ3RGLE9BQU8sWUFBVzs0QkFBRSxLQUFLLE9BQU8sR0FBRyxPQUFPLFNBQVMsU0FBUzsyQkFBWTt3QkFDeEUsT0FBTyxZQUFXOzRCQUFFLEtBQUssTUFBTSxRQUFRLEdBQUcsU0FBUyxTQUFTOzJCQUFZO3dCQUN4RSxPQUFPLFlBQVc7NEJBQUUsS0FBSyxNQUFNLE9BQU8sVUFBVSxHQUFHLFNBQVM7MkJBQVk7d0JBQ3hFLE9BQU8sWUFBVzs0QkFBRSxLQUFLLE1BQU0sT0FBTyxTQUFTLFVBQVUsR0FBRzsyQkFBWTt3QkFDeEUsT0FBTyxZQUFXOzRCQUFFLEtBQUssTUFBTSxPQUFPLFNBQVMsU0FBUyxTQUFTOzJCQUFPOzs7b0JBRzVFLEdBQUcsbUVBQW1FLFlBQVc7d0JBQzdFLE9BQU8sS0FBSyxNQUFNLE9BQU8sU0FBUyxTQUFTLFNBQVMsUUFBUTs7O29CQUdoRSxHQUFHLG9FQUFvRSxZQUFXO3dCQUM5RSxPQUFPLEtBQUssT0FBTyxRQUFRLEdBQUcsVUFBVSxHQUFHLFVBQVUsR0FBRyxTQUFTLElBQUksUUFBUTs7Ozs7O0dBc0J0RiIsImZpbGUiOiJjb21tb24vdXRpbC9TcERhdGVTZXJ2aWNlTW9ja2VyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHV0aWxNb2R1bGUgZnJvbSAnY29tbW9uL3V0aWwvVXRpbE1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL3V0aWwvU3BEYXRlU2VydmljZU1vY2tlcic7XG5cbmRlc2NyaWJlKCdzcERhdGVTZXJ2aWNlTW9ja2VyJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNwRGF0ZVNlcnZpY2VNb2NrZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh1dGlsTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfc3BEYXRlU2VydmljZU1vY2tlcl8pIHtcbiAgICAgICAgc3BEYXRlU2VydmljZU1vY2tlciA9IF9zcERhdGVTZXJ2aWNlTW9ja2VyXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnbW9ja1NldERhdGVDb21wb25lbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBEQVRFID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgIERBVEUyID0gbmV3IERhdGUoREFURS5nZXRUaW1lKCkgKyA1MDAwKSxcbiAgICAgICAgICAgIEhPVVJTID0gOCxcbiAgICAgICAgICAgIE1JTlVURVMgPSA0LFxuICAgICAgICAgICAgU0VDT05EUyA9IDMyLFxuICAgICAgICAgICAgTUlMTElTID0gNDczLFxuICAgICAgICAgICAgUkVUVVJOX0RBVEUgPSBuZXcgRGF0ZShEQVRFLmdldFRpbWUoKSArIDEwMDAwKSxcbiAgICAgICAgICAgIFJFVFVSTl9EQVRFMiA9IG5ldyBEYXRlKERBVEUuZ2V0VGltZSgpICsgNTAwMDApLFxuICAgICAgICAgICAgZnVuYztcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZnVuYyA9IHNwRGF0ZVNlcnZpY2VNb2NrZXIubW9ja1NldERhdGVDb21wb25lbnRzKFt7XG4gICAgICAgICAgICAgICAgZGF0ZTogREFURSxcbiAgICAgICAgICAgICAgICBob3VyczogSE9VUlMsXG4gICAgICAgICAgICAgICAgbWludXRlczogTUlOVVRFUyxcbiAgICAgICAgICAgICAgICBzZWNvbmRzOiBTRUNPTkRTLFxuICAgICAgICAgICAgICAgIG1pbGxpczogTUlMTElTLFxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlOiBSRVRVUk5fREFURVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRhdGU6IERBVEUyLFxuICAgICAgICAgICAgICAgIGhvdXJzOiBIT1VSUyArIDEsXG4gICAgICAgICAgICAgICAgbWludXRlczogTUlOVVRFUyArIDEsXG4gICAgICAgICAgICAgICAgc2Vjb25kczogU0VDT05EUyArIDEsXG4gICAgICAgICAgICAgICAgbWlsbGlzOiBNSUxMSVMgKyAxLFxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlOiBSRVRVUk5fREFURTJcbiAgICAgICAgICAgIH1dKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2Jsb3dzIGNodW5rcyB3aXRoIG5vIG1vY2sgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBzcERhdGVTZXJ2aWNlTW9ja2VyLm1vY2tTZXREYXRlQ29tcG9uZW50cyhudWxsKTsgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYmxvd3MgY2h1bmtzIHdoZW4gc2V0dGluZyBkYXRlIGNvbXBvbmVudHMgdGhhdCBoYXZlIG5vdCBiZWVuIGNvbmZpZ3VyZWQuJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGZ1bmMoREFURSArIDEsIEhPVVJTLCBNSU5VVEVTLCBTRUNPTkRTLCBNSUxMSVMpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGZ1bmMoREFURSwgSE9VUlMgKyAxLCBNSU5VVEVTLCBTRUNPTkRTLCBNSUxMSVMpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGZ1bmMoREFURSwgSE9VUlMsIE1JTlVURVMgKyAxLCBTRUNPTkRTLCBNSUxMSVMpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGZ1bmMoREFURSwgSE9VUlMsIE1JTlVURVMsIFNFQ09ORFMgKyAxLCBNSUxMSVMpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGZ1bmMoREFURSwgSE9VUlMsIE1JTlVURVMsIFNFQ09ORFMsIE1JTExJUyArIDEpOyB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBjb25maWd1cmVkIGRhdGUgZm9yIHRoZSBmaXJzdCBtb2NrIGRhdGEgaW4gdGhlIGxpc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jKERBVEUsIEhPVVJTLCBNSU5VVEVTLCBTRUNPTkRTLCBNSUxMSVMpKS50b0VxdWFsKFJFVFVSTl9EQVRFKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIGNvbmZpZ3VyZWQgZGF0ZSBmb3IgdGhlIHNlY29uZCBtb2NrIGRhdGEgaW4gdGhlIGxpc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jKERBVEUyLCBIT1VSUyArIDEsIE1JTlVURVMgKyAxLCBTRUNPTkRTICsgMSwgTUlMTElTICsgMSkpLnRvRXF1YWwoUkVUVVJOX0RBVEUyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
