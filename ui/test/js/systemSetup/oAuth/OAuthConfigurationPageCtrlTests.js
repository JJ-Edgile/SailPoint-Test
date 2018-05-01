System.register(['test/js/TestInitializer', 'systemSetup/oAuth/OAuthConfigurationModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    /*
     * Tests for the OAuthConfigurationPageCtrl
     */
    'use strict';

    var oAuthConfigurationModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_systemSetupOAuthOAuthConfigurationModule) {
            oAuthConfigurationModule = _systemSetupOAuthOAuthConfigurationModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('OAuthConfigurationPageCtrl', function () {

                var oAuthConfigurationService = undefined,
                    testService = undefined,
                    $controller = undefined,
                    $rootScope = undefined;

                beforeEach(module(oAuthConfigurationModule, testModule));

                beforeEach(inject(function (_oAuthConfigurationService_, _testService_, _$controller_, _$rootScope_) {
                    oAuthConfigurationService = _oAuthConfigurationService_;
                    testService = _testService_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                }));

                function createController(hasFullAccess) {
                    return $controller('OAuthConfigurationPageCtrl', {
                        OAUTH_CLIENT_FULL_ACCESS: hasFullAccess
                    });
                }

                describe('isEditEnabled', function () {
                    it('should return true', function () {
                        var ctrl = createController(true);

                        expect(ctrl.isEditEnabled()).toBe(true);
                    });
                });

                describe('save', function () {

                    it('should invoke service.update', function () {
                        var ctrl = createController(true);
                        spyOn(ctrl.oAuthConfigurationService, 'update').and.returnValue(testService.createPromise(true, { accessTokenExpiresInSeconds: 12000 }));
                        ctrl.save();
                        expect(ctrl.oAuthConfigurationService.update).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbVNldHVwL29BdXRoL09BdXRoQ29uZmlndXJhdGlvblBhZ2VDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDhDQUE4Qyx1QkFBdUIsVUFBVSxTQUFTOzs7Ozs7SUFNaEk7O0lBRUEsSUFBSSwwQkFBMEI7SUFDOUIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkNBQTJDO1lBQ2pHLDJCQUEyQiwwQ0FBMEM7V0FDdEUsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTtZQU43QixTQUFTLDhCQUE4QixZQUFNOztnQkFFekMsSUFBSSw0QkFBeUI7b0JBQUUsY0FBVztvQkFDdEMsY0FBVztvQkFBRSxhQUFVOztnQkFFM0IsV0FBVyxPQUFPLDBCQUEwQjs7Z0JBRTVDLFdBQVcsT0FBTyxVQUFDLDZCQUE0QixlQUFlLGVBQ3RELGNBQWlCO29CQUNyQiw0QkFBNEI7b0JBQzVCLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxhQUFhOzs7Z0JBR2pCLFNBQVMsaUJBQWlCLGVBQWU7b0JBQ3JDLE9BQU8sWUFBWSw4QkFBOEI7d0JBQzdDLDBCQUEwQjs7OztnQkFJbEMsU0FBUyxpQkFBaUIsWUFBTTtvQkFDNUIsR0FBRyxzQkFBc0IsWUFBTTt3QkFDM0IsSUFBSSxPQUFPLGlCQUFpQjs7d0JBRTVCLE9BQU8sS0FBSyxpQkFBaUIsS0FBSzs7OztnQkFJMUMsU0FBUyxRQUFRLFlBQU07O29CQUVuQixHQUFHLGdDQUFnQyxZQUFNO3dCQUNyQyxJQUFJLE9BQU8saUJBQWlCO3dCQUM1QixNQUFNLEtBQUssMkJBQTJCLFVBQVUsSUFBSSxZQUNoRCxZQUFZLGNBQWMsTUFBTSxFQUFFLDZCQUE2Qjt3QkFFbkUsS0FBSzt3QkFDTCxPQUFPLEtBQUssMEJBQTBCLFFBQVE7Ozs7OztHQVl2RCIsImZpbGUiOiJzeXN0ZW1TZXR1cC9vQXV0aC9PQXV0aENvbmZpZ3VyYXRpb25QYWdlQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IG9BdXRoQ29uZmlndXJhdGlvbk1vZHVsZSBmcm9tICdzeXN0ZW1TZXR1cC9vQXV0aC9PQXV0aENvbmZpZ3VyYXRpb25Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuLypcbiAqIFRlc3RzIGZvciB0aGUgT0F1dGhDb25maWd1cmF0aW9uUGFnZUN0cmxcbiAqL1xuZGVzY3JpYmUoJ09BdXRoQ29uZmlndXJhdGlvblBhZ2VDdHJsJywgKCkgPT4ge1xuXG4gICAgbGV0IG9BdXRoQ29uZmlndXJhdGlvblNlcnZpY2UsIHRlc3RTZXJ2aWNlLFxuICAgICAgICAkY29udHJvbGxlciwgJHJvb3RTY29wZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG9BdXRoQ29uZmlndXJhdGlvbk1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9vQXV0aENvbmZpZ3VyYXRpb25TZXJ2aWNlXyxfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfLFxuICAgICAgICAgICAgXyRyb290U2NvcGVfKSA9PiB7XG4gICAgICAgIG9BdXRoQ29uZmlndXJhdGlvblNlcnZpY2UgPSBfb0F1dGhDb25maWd1cmF0aW9uU2VydmljZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoaGFzRnVsbEFjY2Vzcykge1xuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ09BdXRoQ29uZmlndXJhdGlvblBhZ2VDdHJsJywge1xuICAgICAgICAgICAgT0FVVEhfQ0xJRU5UX0ZVTExfQUNDRVNTOiBoYXNGdWxsQWNjZXNzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdpc0VkaXRFbmFibGVkJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHRydWUpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0VkaXRFbmFibGVkKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NhdmUnLCAoKSA9PiB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBpbnZva2Ugc2VydmljZS51cGRhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIodHJ1ZSk7XG4gICAgICAgICAgICBzcHlPbihjdHJsLm9BdXRoQ29uZmlndXJhdGlvblNlcnZpY2UsICd1cGRhdGUnKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZSh0cnVlLCB7IGFjY2Vzc1Rva2VuRXhwaXJlc0luU2Vjb25kczogMTIwMDAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjdHJsLnNhdmUoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLm9BdXRoQ29uZmlndXJhdGlvblNlcnZpY2UudXBkYXRlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
