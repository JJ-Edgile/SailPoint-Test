System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationEntityListDirectiveConfig', function () {

                var CertificationEntityListDirectiveConfig = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationEntityListDirectiveConfig_) {
                    CertificationEntityListDirectiveConfig = _CertificationEntityListDirectiveConfig_;
                }));

                it('initializes values with defaults if no config is passed in', function () {
                    var config = new CertificationEntityListDirectiveConfig();
                    checkConfig(config, false, false, null, null);
                });

                it('initializes values passed in through the config', function () {
                    var statuses = ['blah'];
                    var excludedStatuses = ['blum'];

                    var config = new CertificationEntityListDirectiveConfig({
                        showBulkDecisions: true,
                        showSearch: true,
                        statuses: statuses,
                        excludedStatuses: excludedStatuses
                    });
                    checkConfig(config, true, true, statuses, excludedStatuses);
                });

                function checkConfig(config, showBulk, showSearch, statuses, excludedStatuses) {
                    expect(config.showBulkDecisions).toEqual(showBulk);
                    expect(config.showSearch).toEqual(showSearch);
                    expect(config.statuses).toEqual(statuses);
                    expect(config.excludedStatuses).toEqual(excludedStatuses);
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkVudGl0eUxpc3REaXJlY3RpdmVDb25maWdUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUztJQUNqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7O1FBRTVELFNBQVMsWUFBWTs7WUFMN0IsU0FBUywwQ0FBMEMsWUFBVzs7Z0JBRTFELElBQUkseUNBQXNDOztnQkFFMUMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsMENBQTZDO29CQUM1RCx5Q0FBeUM7OztnQkFHN0MsR0FBRyw4REFBOEQsWUFBTTtvQkFDbkUsSUFBSSxTQUFTLElBQUk7b0JBQ2pCLFlBQVksUUFBUSxPQUFPLE9BQU8sTUFBTTs7O2dCQUc1QyxHQUFHLG1EQUFtRCxZQUFNO29CQUN4RCxJQUFJLFdBQVcsQ0FBRTtvQkFDakIsSUFBSSxtQkFBbUIsQ0FBRTs7b0JBRXpCLElBQUksU0FBUyxJQUFJLHVDQUF1Qzt3QkFDcEQsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFVBQVU7d0JBQ1Ysa0JBQWtCOztvQkFFdEIsWUFBWSxRQUFRLE1BQU0sTUFBTSxVQUFVOzs7Z0JBRzlDLFNBQVMsWUFBWSxRQUFRLFVBQVUsWUFBWSxVQUFVLGtCQUFrQjtvQkFDM0UsT0FBTyxPQUFPLG1CQUFtQixRQUFRO29CQUN6QyxPQUFPLE9BQU8sWUFBWSxRQUFRO29CQUNsQyxPQUFPLE9BQU8sVUFBVSxRQUFRO29CQUNoQyxPQUFPLE9BQU8sa0JBQWtCLFFBQVE7Ozs7O0dBWTdDIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkVudGl0eUxpc3REaXJlY3RpdmVDb25maWdUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25FbnRpdHlMaXN0RGlyZWN0aXZlQ29uZmlnJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbGV0IENlcnRpZmljYXRpb25FbnRpdHlMaXN0RGlyZWN0aXZlQ29uZmlnO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX0NlcnRpZmljYXRpb25FbnRpdHlMaXN0RGlyZWN0aXZlQ29uZmlnXykgPT4ge1xyXG4gICAgICAgIENlcnRpZmljYXRpb25FbnRpdHlMaXN0RGlyZWN0aXZlQ29uZmlnID0gX0NlcnRpZmljYXRpb25FbnRpdHlMaXN0RGlyZWN0aXZlQ29uZmlnXztcclxuICAgIH0pKTtcclxuXHJcbiAgICBpdCgnaW5pdGlhbGl6ZXMgdmFsdWVzIHdpdGggZGVmYXVsdHMgaWYgbm8gY29uZmlnIGlzIHBhc3NlZCBpbicsICgpID0+IHtcclxuICAgICAgICBsZXQgY29uZmlnID0gbmV3IENlcnRpZmljYXRpb25FbnRpdHlMaXN0RGlyZWN0aXZlQ29uZmlnKCk7XHJcbiAgICAgICAgY2hlY2tDb25maWcoY29uZmlnLCBmYWxzZSwgZmFsc2UsIG51bGwsIG51bGwpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2luaXRpYWxpemVzIHZhbHVlcyBwYXNzZWQgaW4gdGhyb3VnaCB0aGUgY29uZmlnJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBzdGF0dXNlcyA9IFsgJ2JsYWgnIF07XHJcbiAgICAgICAgbGV0IGV4Y2x1ZGVkU3RhdHVzZXMgPSBbICdibHVtJyBdO1xyXG5cclxuICAgICAgICBsZXQgY29uZmlnID0gbmV3IENlcnRpZmljYXRpb25FbnRpdHlMaXN0RGlyZWN0aXZlQ29uZmlnKHtcclxuICAgICAgICAgICAgc2hvd0J1bGtEZWNpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgICAgIHNob3dTZWFyY2g6IHRydWUsXHJcbiAgICAgICAgICAgIHN0YXR1c2VzOiBzdGF0dXNlcyxcclxuICAgICAgICAgICAgZXhjbHVkZWRTdGF0dXNlczogZXhjbHVkZWRTdGF0dXNlc1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNoZWNrQ29uZmlnKGNvbmZpZywgdHJ1ZSwgdHJ1ZSwgc3RhdHVzZXMsIGV4Y2x1ZGVkU3RhdHVzZXMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tDb25maWcoY29uZmlnLCBzaG93QnVsaywgc2hvd1NlYXJjaCwgc3RhdHVzZXMsIGV4Y2x1ZGVkU3RhdHVzZXMpIHtcclxuICAgICAgICBleHBlY3QoY29uZmlnLnNob3dCdWxrRGVjaXNpb25zKS50b0VxdWFsKHNob3dCdWxrKTtcclxuICAgICAgICBleHBlY3QoY29uZmlnLnNob3dTZWFyY2gpLnRvRXF1YWwoc2hvd1NlYXJjaCk7XHJcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5zdGF0dXNlcykudG9FcXVhbChzdGF0dXNlcyk7XHJcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5leGNsdWRlZFN0YXR1c2VzKS50b0VxdWFsKGV4Y2x1ZGVkU3RhdHVzZXMpO1xyXG4gICAgfVxyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
