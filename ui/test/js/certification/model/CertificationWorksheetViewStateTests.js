System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/certification/model/MockViewState'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsCertificationModelMockViewState) {}],
        execute: function () {

            describe('certificationWorksheetViewState', function () {

                var CertificationWorksheetViewState = undefined,
                    CertificationItem = undefined,
                    Certification = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_Certification_, _CertificationItem_, _CertificationWorksheetViewState_) {
                    Certification = _Certification_;
                    CertificationItem = _CertificationItem_;
                    CertificationWorksheetViewState = _CertificationWorksheetViewState_;
                }));

                describe('initializeTabState', function () {
                    it('proper config keys', function () {
                        var cert = { type: Certification.Type.DataOwner },
                            baseWorksheetKey = 'myTestBaseWorksheetKey',
                            returnedItemsKey = 'myTestReturnedItemsKey',
                            state = new CertificationWorksheetViewState(cert);

                        spyOn(state, 'getBaseWorksheetKey').and.returnValue(baseWorksheetKey);
                        spyOn(state, 'getReturnedItemsKey').and.returnValue(returnedItemsKey);

                        state.initializeTabConfigs();

                        expect(state.actionRequiredTab.tables[0].columnConfigKey).toEqual('uiCertificationItemPolicyViolationsColumns');
                        expect(state.actionRequiredTab.tables[1].columnConfigKey).toEqual(returnedItemsKey);
                        expect(state.decisionsLeftTab.tables[0].columnConfigKey).toEqual(baseWorksheetKey);
                        expect(state.decisionsLeftTab.tables[0].tableId).toEqual(baseWorksheetKey + '-DecisionsLeft');
                        expect(state.completeTab.tables[0].columnConfigKey).toEqual(baseWorksheetKey);
                        expect(state.completeTab.tables[0].tableId).toEqual(baseWorksheetKey + '-Complete');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbldvcmtzaGVldFZpZXdTdGF0ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsOENBQThDLFVBQVUsU0FBUzs7O0lBRzlJOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdDQUF3QztRQUNyRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsbUNBQW1DLFlBQU07O2dCQUU5QyxJQUFJLGtDQUErQjtvQkFBRSxvQkFBaUI7b0JBQUUsZ0JBQWE7O2dCQUVyRSxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxpQkFBaUIscUJBQXFCLG1DQUFzQztvQkFDM0YsZ0JBQWdCO29CQUNoQixvQkFBb0I7b0JBQ3BCLGtDQUFrQzs7O2dCQUd0QyxTQUFTLHNCQUFzQixZQUFNO29CQUNqQyxHQUFHLHNCQUFzQixZQUFNO3dCQUMzQixJQUFJLE9BQU8sRUFBRSxNQUFNLGNBQWMsS0FBSzs0QkFDbEMsbUJBQW1COzRCQUNuQixtQkFBbUI7NEJBQ25CLFFBQVEsSUFBSSxnQ0FBZ0M7O3dCQUVoRCxNQUFNLE9BQU8sdUJBQXVCLElBQUksWUFBWTt3QkFDcEQsTUFBTSxPQUFPLHVCQUF1QixJQUFJLFlBQVk7O3dCQUVwRCxNQUFNOzt3QkFFTixPQUFPLE1BQU0sa0JBQWtCLE9BQU8sR0FBRyxpQkFDcEMsUUFBUTt3QkFDYixPQUFPLE1BQU0sa0JBQWtCLE9BQU8sR0FBRyxpQkFBaUIsUUFBUTt3QkFDbEUsT0FBTyxNQUFNLGlCQUFpQixPQUFPLEdBQUcsaUJBQWlCLFFBQVE7d0JBQ2pFLE9BQU8sTUFBTSxpQkFBaUIsT0FBTyxHQUFHLFNBQVMsUUFBUSxtQkFBbUI7d0JBQzVFLE9BQU8sTUFBTSxZQUFZLE9BQU8sR0FBRyxpQkFBaUIsUUFBUTt3QkFDNUQsT0FBTyxNQUFNLFlBQVksT0FBTyxHQUFHLFNBQVMsUUFBUSxtQkFBbUI7Ozs7OztHQWFoRiIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL21vZGVsL0NlcnRpZmljYXRpb25Xb3Jrc2hlZXRWaWV3U3RhdGVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY2VydGlmaWNhdGlvbi9tb2RlbC9Nb2NrVmlld1N0YXRlJztcblxuZGVzY3JpYmUoJ2NlcnRpZmljYXRpb25Xb3Jrc2hlZXRWaWV3U3RhdGUnLCAoKSA9PiB7XG5cbiAgICBsZXQgQ2VydGlmaWNhdGlvbldvcmtzaGVldFZpZXdTdGF0ZSwgQ2VydGlmaWNhdGlvbkl0ZW0sIENlcnRpZmljYXRpb247XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX0NlcnRpZmljYXRpb25fLCBfQ2VydGlmaWNhdGlvbkl0ZW1fLCBfQ2VydGlmaWNhdGlvbldvcmtzaGVldFZpZXdTdGF0ZV8pID0+IHtcbiAgICAgICAgQ2VydGlmaWNhdGlvbiA9IF9DZXJ0aWZpY2F0aW9uXztcbiAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0gPSBfQ2VydGlmaWNhdGlvbkl0ZW1fO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uV29ya3NoZWV0Vmlld1N0YXRlID0gX0NlcnRpZmljYXRpb25Xb3Jrc2hlZXRWaWV3U3RhdGVfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdpbml0aWFsaXplVGFiU3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdwcm9wZXIgY29uZmlnIGtleXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2VydCA9IHsgdHlwZTogQ2VydGlmaWNhdGlvbi5UeXBlLkRhdGFPd25lciB9LFxuICAgICAgICAgICAgICAgIGJhc2VXb3Jrc2hlZXRLZXkgPSAnbXlUZXN0QmFzZVdvcmtzaGVldEtleScsXG4gICAgICAgICAgICAgICAgcmV0dXJuZWRJdGVtc0tleSA9ICdteVRlc3RSZXR1cm5lZEl0ZW1zS2V5JyxcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IG5ldyBDZXJ0aWZpY2F0aW9uV29ya3NoZWV0Vmlld1N0YXRlKGNlcnQpO1xuXG4gICAgICAgICAgICBzcHlPbihzdGF0ZSwgJ2dldEJhc2VXb3Jrc2hlZXRLZXknKS5hbmQucmV0dXJuVmFsdWUoYmFzZVdvcmtzaGVldEtleSk7XG4gICAgICAgICAgICBzcHlPbihzdGF0ZSwgJ2dldFJldHVybmVkSXRlbXNLZXknKS5hbmQucmV0dXJuVmFsdWUocmV0dXJuZWRJdGVtc0tleSk7XG5cbiAgICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVUYWJDb25maWdzKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5hY3Rpb25SZXF1aXJlZFRhYi50YWJsZXNbMF0uY29sdW1uQ29uZmlnS2V5KVxuICAgICAgICAgICAgICAgIC50b0VxdWFsKCd1aUNlcnRpZmljYXRpb25JdGVtUG9saWN5VmlvbGF0aW9uc0NvbHVtbnMnKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5hY3Rpb25SZXF1aXJlZFRhYi50YWJsZXNbMV0uY29sdW1uQ29uZmlnS2V5KS50b0VxdWFsKHJldHVybmVkSXRlbXNLZXkpO1xuICAgICAgICAgICAgZXhwZWN0KHN0YXRlLmRlY2lzaW9uc0xlZnRUYWIudGFibGVzWzBdLmNvbHVtbkNvbmZpZ0tleSkudG9FcXVhbChiYXNlV29ya3NoZWV0S2V5KTtcbiAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5kZWNpc2lvbnNMZWZ0VGFiLnRhYmxlc1swXS50YWJsZUlkKS50b0VxdWFsKGJhc2VXb3Jrc2hlZXRLZXkgKyAnLURlY2lzaW9uc0xlZnQnKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5jb21wbGV0ZVRhYi50YWJsZXNbMF0uY29sdW1uQ29uZmlnS2V5KS50b0VxdWFsKGJhc2VXb3Jrc2hlZXRLZXkpO1xuICAgICAgICAgICAgZXhwZWN0KHN0YXRlLmNvbXBsZXRlVGFiLnRhYmxlc1swXS50YWJsZUlkKS50b0VxdWFsKGJhc2VXb3Jrc2hlZXRLZXkgKyAnLUNvbXBsZXRlJyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
