System.register(['test/js/TestInitializer', 'home/widget/identities/IdentitiesWidgetModule'], function (_export) {
    'use strict';

    var identitiesWidgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetIdentitiesIdentitiesWidgetModule) {
            identitiesWidgetModule = _homeWidgetIdentitiesIdentitiesWidgetModule['default'];
        }],
        execute: function () {

            describe('DirectReport', function () {

                var DirectReport,
                    reportData = {
                    id: '123',
                    name: 'hkornfeld',
                    displayName: 'Herbert Kornfeld',
                    actions: ['editorial', 'mockery']
                };

                beforeEach(module(identitiesWidgetModule));

                beforeEach(inject(function (_DirectReport_) {
                    DirectReport = _DirectReport_;
                }));

                describe('constructor', function () {
                    it('pukes with no data', function () {
                        expect(function () {
                            new DirectReport(null);
                        }).toThrow();
                    });

                    it('pukes with no id', function () {
                        var data = angular.copy(reportData);
                        delete data.id;
                        expect(function () {
                            new DirectReport(data);
                        }).toThrow();
                    });

                    it('pukes with no name', function () {
                        var data = angular.copy(reportData);
                        delete data.name;
                        expect(function () {
                            new DirectReport(data);
                        }).toThrow();
                    });

                    it('pukes with no display name', function () {
                        var data = angular.copy(reportData);
                        delete data.displayName;
                        expect(function () {
                            new DirectReport(data);
                        }).toThrow();
                    });

                    it('allows null actions', function () {
                        var data = angular.copy(reportData);
                        delete data.actions;
                        expect(function () {
                            new DirectReport(data);
                        }).not.toThrow();
                    });
                });

                describe('isSupportedAction()', function () {
                    it('returns false if actions is null', function () {
                        var data = angular.copy(reportData),
                            report;
                        delete data.actions;
                        report = new DirectReport(data);
                        expect(report.isSupportedAction(reportData.actions[0])).toEqual(false);
                    });

                    it('returns false if action param is null', function () {
                        var report = new DirectReport(reportData);
                        expect(report.isSupportedAction(null)).toEqual(false);
                    });

                    it('returns false for missing action', function () {
                        var report = new DirectReport(reportData);
                        expect(report.isSupportedAction('notSupported')).toEqual(false);
                    });

                    it('returns true for supported action', function () {
                        var report = new DirectReport(reportData);
                        expect(report.isSupportedAction(reportData.actions[0])).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L2lkZW50aXRpZXMvRGlyZWN0UmVwb3J0VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGtEQUFrRCxVQUFVLFNBQVM7SUFBakg7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDZDQUE2QztZQUNuRyx5QkFBeUIsNENBQTRDOztRQUV6RSxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsZ0JBQWdCLFlBQVc7O2dCQUVoQyxJQUFJO29CQUNBLGFBQWE7b0JBQ1QsSUFBSTtvQkFDSixNQUFNO29CQUNOLGFBQWE7b0JBQ2IsU0FBUyxDQUFFLGFBQWE7OztnQkFHaEMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsZ0JBQWdCO29CQUN2QyxlQUFlOzs7Z0JBR25CLFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLHNCQUFzQixZQUFXO3dCQUNoQyxPQUFPLFlBQVc7NEJBQUUsSUFBSSxhQUFhOzJCQUFVOzs7b0JBR25ELEdBQUcsb0JBQW9CLFlBQVc7d0JBQzlCLElBQUksT0FBTyxRQUFRLEtBQUs7d0JBQ3hCLE9BQU8sS0FBSzt3QkFDWixPQUFPLFlBQVc7NEJBQUUsSUFBSSxhQUFhOzJCQUFVOzs7b0JBR25ELEdBQUcsc0JBQXNCLFlBQVc7d0JBQ2hDLElBQUksT0FBTyxRQUFRLEtBQUs7d0JBQ3hCLE9BQU8sS0FBSzt3QkFDWixPQUFPLFlBQVc7NEJBQUUsSUFBSSxhQUFhOzJCQUFVOzs7b0JBR25ELEdBQUcsOEJBQThCLFlBQVc7d0JBQ3hDLElBQUksT0FBTyxRQUFRLEtBQUs7d0JBQ3hCLE9BQU8sS0FBSzt3QkFDWixPQUFPLFlBQVc7NEJBQUUsSUFBSSxhQUFhOzJCQUFVOzs7b0JBR25ELEdBQUcsdUJBQXVCLFlBQVc7d0JBQ2pDLElBQUksT0FBTyxRQUFRLEtBQUs7d0JBQ3hCLE9BQU8sS0FBSzt3QkFDWixPQUFPLFlBQVc7NEJBQUUsSUFBSSxhQUFhOzJCQUFVLElBQUk7Ozs7Z0JBSTNELFNBQVMsdUJBQXVCLFlBQVc7b0JBQ3ZDLEdBQUcsb0NBQW9DLFlBQVc7d0JBQzlDLElBQUksT0FBTyxRQUFRLEtBQUs7NEJBQ3BCO3dCQUNKLE9BQU8sS0FBSzt3QkFDWixTQUFTLElBQUksYUFBYTt3QkFDMUIsT0FBTyxPQUFPLGtCQUFrQixXQUFXLFFBQVEsS0FBSyxRQUFROzs7b0JBR3BFLEdBQUcseUNBQXlDLFlBQVc7d0JBQ25ELElBQUksU0FBUyxJQUFJLGFBQWE7d0JBQzlCLE9BQU8sT0FBTyxrQkFBa0IsT0FBTyxRQUFROzs7b0JBR25ELEdBQUcsb0NBQW9DLFlBQVc7d0JBQzlDLElBQUksU0FBUyxJQUFJLGFBQWE7d0JBQzlCLE9BQU8sT0FBTyxrQkFBa0IsaUJBQWlCLFFBQVE7OztvQkFHN0QsR0FBRyxxQ0FBcUMsWUFBVzt3QkFDL0MsSUFBSSxTQUFTLElBQUksYUFBYTt3QkFDOUIsT0FBTyxPQUFPLGtCQUFrQixXQUFXLFFBQVEsS0FBSyxRQUFROzs7Ozs7R0FxQnpFIiwiZmlsZSI6ImhvbWUvd2lkZ2V0L2lkZW50aXRpZXMvRGlyZWN0UmVwb3J0VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGlkZW50aXRpZXNXaWRnZXRNb2R1bGUgZnJvbSAnaG9tZS93aWRnZXQvaWRlbnRpdGllcy9JZGVudGl0aWVzV2lkZ2V0TW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdEaXJlY3RSZXBvcnQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgRGlyZWN0UmVwb3J0LFxyXG4gICAgICAgIHJlcG9ydERhdGEgPSB7XHJcbiAgICAgICAgICAgIGlkOiAnMTIzJyxcclxuICAgICAgICAgICAgbmFtZTogJ2hrb3JuZmVsZCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnSGVyYmVydCBLb3JuZmVsZCcsXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IFsgJ2VkaXRvcmlhbCcsICdtb2NrZXJ5JyBdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0aWVzV2lkZ2V0TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0RpcmVjdFJlcG9ydF8pIHtcclxuICAgICAgICBEaXJlY3RSZXBvcnQgPSBfRGlyZWN0UmVwb3J0XztcclxuICAgIH0pKTtcclxuXHJcbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgncHVrZXMgd2l0aCBubyBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IERpcmVjdFJlcG9ydChudWxsKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncHVrZXMgd2l0aCBubyBpZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGFuZ3VsYXIuY29weShyZXBvcnREYXRhKTtcclxuICAgICAgICAgICAgZGVsZXRlIGRhdGEuaWQ7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IERpcmVjdFJlcG9ydChkYXRhKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncHVrZXMgd2l0aCBubyBuYW1lJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gYW5ndWxhci5jb3B5KHJlcG9ydERhdGEpO1xyXG4gICAgICAgICAgICBkZWxldGUgZGF0YS5uYW1lO1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBEaXJlY3RSZXBvcnQoZGF0YSk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gZGlzcGxheSBuYW1lJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gYW5ndWxhci5jb3B5KHJlcG9ydERhdGEpO1xyXG4gICAgICAgICAgICBkZWxldGUgZGF0YS5kaXNwbGF5TmFtZTtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgRGlyZWN0UmVwb3J0KGRhdGEpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhbGxvd3MgbnVsbCBhY3Rpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gYW5ndWxhci5jb3B5KHJlcG9ydERhdGEpO1xyXG4gICAgICAgICAgICBkZWxldGUgZGF0YS5hY3Rpb25zO1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBEaXJlY3RSZXBvcnQoZGF0YSk7IH0pLm5vdC50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNTdXBwb3J0ZWRBY3Rpb24oKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGFjdGlvbnMgaXMgbnVsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGFuZ3VsYXIuY29weShyZXBvcnREYXRhKSxcclxuICAgICAgICAgICAgICAgIHJlcG9ydDtcclxuICAgICAgICAgICAgZGVsZXRlIGRhdGEuYWN0aW9ucztcclxuICAgICAgICAgICAgcmVwb3J0ID0gbmV3IERpcmVjdFJlcG9ydChkYXRhKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlcG9ydC5pc1N1cHBvcnRlZEFjdGlvbihyZXBvcnREYXRhLmFjdGlvbnNbMF0pKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgYWN0aW9uIHBhcmFtIGlzIG51bGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHJlcG9ydCA9IG5ldyBEaXJlY3RSZXBvcnQocmVwb3J0RGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXBvcnQuaXNTdXBwb3J0ZWRBY3Rpb24obnVsbCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgbWlzc2luZyBhY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHJlcG9ydCA9IG5ldyBEaXJlY3RSZXBvcnQocmVwb3J0RGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXBvcnQuaXNTdXBwb3J0ZWRBY3Rpb24oJ25vdFN1cHBvcnRlZCcpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3Igc3VwcG9ydGVkIGFjdGlvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVwb3J0ID0gbmV3IERpcmVjdFJlcG9ydChyZXBvcnREYXRhKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlcG9ydC5pc1N1cHBvcnRlZEFjdGlvbihyZXBvcnREYXRhLmFjdGlvbnNbMF0pKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
