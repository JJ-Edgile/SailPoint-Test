System.register(['test/js/TestInitializer', 'systemSetup/oAuth/OAuthClientConfigModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    /*
     * Tests for the OAuthClientModalCtrl
     */
    'use strict';

    var oAuthClientConfigModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_systemSetupOAuthOAuthClientConfigModule) {
            oAuthClientConfigModule = _systemSetupOAuthOAuthClientConfigModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('OAuthClientModalCtrl', function () {

                var OAuthClient, $controller, testService, oAuthClientTestData, $scope;

                beforeEach(module(oAuthClientConfigModule, testModule));

                beforeEach(inject(function (_oAuthClientConfigService_, _OAuthClient_, _testService_, _oAuthClientTestData_, _$controller_, _$rootScope_) {
                    OAuthClient = _OAuthClient_;
                    testService = _testService_;
                    oAuthClientTestData = _oAuthClientTestData_;
                    $controller = _$controller_;
                    $scope = _$rootScope_.$new();
                }));

                describe('createClient', function () {
                    var oAuthClientConfigService = undefined,
                        $q = undefined,
                        spModal = undefined,
                        oAuthClientToCreate = undefined,
                        oAuthClientToUpdate = undefined,
                        deferred = undefined;

                    beforeEach(inject(function (_$q_, _spModal_, _oAuthClientConfigService_) {
                        $q = _$q_;
                        spModal = _spModal_;
                        oAuthClientConfigService = _oAuthClientConfigService_;
                        oAuthClientToCreate = new OAuthClient(oAuthClientTestData.CLIENT1);
                        oAuthClientToCreate.clientId = null;
                        oAuthClientToUpdate = new OAuthClient(oAuthClientTestData.CLIENT2);
                        deferred = $q.defer();
                    }));

                    function createController(client) {
                        return $controller('OAuthClientModalCtrl', {
                            client: client,
                            oAuthClientConfigService: oAuthClientConfigService,
                            spModal: spModal
                        });
                    }

                    it('should create and reload table', function () {
                        var ctrl = createController(oAuthClientToCreate);
                        spyOn(oAuthClientConfigService, 'create').and.returnValue(deferred.promise);
                        spyOn(oAuthClientConfigService, 'reloadData');
                        ctrl.save();
                        expect(oAuthClientConfigService.create).toHaveBeenCalled();
                        deferred.resolve();
                        $scope.$apply();
                        expect(oAuthClientConfigService.reloadData).toHaveBeenCalled();
                    });

                    it('should update and reload table', function () {
                        var ctrl = createController(oAuthClientToUpdate);
                        spyOn(oAuthClientConfigService, 'update').and.returnValue(deferred.promise);
                        spyOn(oAuthClientConfigService, 'reloadData');
                        ctrl.save();
                        expect(oAuthClientConfigService.update).toHaveBeenCalled();
                        deferred.resolve();
                        $scope.$apply();
                        expect(oAuthClientConfigService.reloadData).toHaveBeenCalled();
                    });

                    it('should delete and reload table', function () {
                        var ctrl = createController(oAuthClientToUpdate);
                        spyOn(oAuthClientConfigService, 'remove').and.returnValue(deferred.promise);
                        spyOn(oAuthClientConfigService, 'reloadData');
                        ctrl.remove();
                        expect(oAuthClientConfigService.remove).toHaveBeenCalled();
                        deferred.resolve();
                        $scope.$apply();
                        expect(oAuthClientConfigService.reloadData).toHaveBeenCalled();
                    });

                    it('should regenerate keys and reload table', function () {
                        var ctrl = createController(oAuthClientToUpdate);
                        spyOn(oAuthClientConfigService, 'regenerateKeys').and.returnValue(deferred.promise);
                        spyOn(oAuthClientConfigService, 'reloadData');
                        ctrl.regenerateKeys();
                        expect(oAuthClientConfigService.regenerateKeys).toHaveBeenCalled();
                        deferred.resolve();
                        $scope.$apply();
                        expect(oAuthClientConfigService.reloadData).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50TW9kYWxDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDZDQUE2Qyx1QkFBdUIsVUFBVSxTQUFTOzs7Ozs7SUFNL0g7O0lBRUEsSUFBSSx5QkFBeUI7SUFDN0IsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMENBQTBDO1lBQ2hHLDBCQUEwQix5Q0FBeUM7V0FDcEUsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTtZQU43QixTQUFTLHdCQUF3QixZQUFNOztnQkFFbkMsSUFBSSxhQUFhLGFBQWEsYUFBYSxxQkFBcUI7O2dCQUVoRSxXQUFXLE9BQU8seUJBQXlCOztnQkFFM0MsV0FBVyxPQUFPLFVBQVMsNEJBQTRCLGVBQWUsZUFDbkQsdUJBQXVCLGVBQWUsY0FBYztvQkFDbkUsY0FBYztvQkFDZCxjQUFjO29CQUNkLHNCQUFzQjtvQkFDdEIsY0FBYztvQkFDZCxTQUFTLGFBQWE7OztnQkFHMUIsU0FBUyxnQkFBZ0IsWUFBTTtvQkFDM0IsSUFBSSwyQkFBd0I7d0JBQUUsS0FBRTt3QkFBRSxVQUFPO3dCQUFFLHNCQUFtQjt3QkFBRSxzQkFBbUI7d0JBQUUsV0FBUTs7b0JBRTdGLFdBQVcsT0FBTyxVQUFTLE1BQU0sV0FBVyw0QkFBNEI7d0JBQ3BFLEtBQUs7d0JBQ0wsVUFBVTt3QkFDViwyQkFBMkI7d0JBQzNCLHNCQUFzQixJQUFJLFlBQVksb0JBQW9CO3dCQUMxRCxvQkFBb0IsV0FBVzt3QkFDL0Isc0JBQXNCLElBQUksWUFBWSxvQkFBb0I7d0JBQzFELFdBQVcsR0FBRzs7O29CQUdsQixTQUFTLGlCQUFpQixRQUFRO3dCQUM5QixPQUFPLFlBQVksd0JBQXdCOzRCQUN2QyxRQUFROzRCQUNSLDBCQUEwQjs0QkFDMUIsU0FBUzs7OztvQkFJakIsR0FBRyxrQ0FBa0MsWUFBTTt3QkFDdkMsSUFBSSxPQUFPLGlCQUFpQjt3QkFDNUIsTUFBTSwwQkFBMEIsVUFBVSxJQUFJLFlBQVksU0FBUzt3QkFDbkUsTUFBTSwwQkFBMEI7d0JBQ2hDLEtBQUs7d0JBQ0wsT0FBTyx5QkFBeUIsUUFBUTt3QkFDeEMsU0FBUzt3QkFDVCxPQUFPO3dCQUNQLE9BQU8seUJBQXlCLFlBQVk7OztvQkFHaEQsR0FBRyxrQ0FBa0MsWUFBTTt3QkFDdkMsSUFBSSxPQUFPLGlCQUFpQjt3QkFDNUIsTUFBTSwwQkFBMEIsVUFBVSxJQUFJLFlBQVksU0FBUzt3QkFDbkUsTUFBTSwwQkFBMEI7d0JBQ2hDLEtBQUs7d0JBQ0wsT0FBTyx5QkFBeUIsUUFBUTt3QkFDeEMsU0FBUzt3QkFDVCxPQUFPO3dCQUNQLE9BQU8seUJBQXlCLFlBQVk7OztvQkFHaEQsR0FBRyxrQ0FBa0MsWUFBTTt3QkFDdkMsSUFBSSxPQUFPLGlCQUFpQjt3QkFDNUIsTUFBTSwwQkFBMEIsVUFBVSxJQUFJLFlBQVksU0FBUzt3QkFDbkUsTUFBTSwwQkFBMEI7d0JBQ2hDLEtBQUs7d0JBQ0wsT0FBTyx5QkFBeUIsUUFBUTt3QkFDeEMsU0FBUzt3QkFDVCxPQUFPO3dCQUNQLE9BQU8seUJBQXlCLFlBQVk7OztvQkFHaEQsR0FBRywyQ0FBMkMsWUFBTTt3QkFDaEQsSUFBSSxPQUFPLGlCQUFpQjt3QkFDNUIsTUFBTSwwQkFBMEIsa0JBQWtCLElBQUksWUFBWSxTQUFTO3dCQUMzRSxNQUFNLDBCQUEwQjt3QkFDaEMsS0FBSzt3QkFDTCxPQUFPLHlCQUF5QixnQkFBZ0I7d0JBQ2hELFNBQVM7d0JBQ1QsT0FBTzt3QkFDUCxPQUFPLHlCQUF5QixZQUFZOzs7Ozs7R0FpQnJEIiwiZmlsZSI6InN5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50TW9kYWxDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgb0F1dGhDbGllbnRDb25maWdNb2R1bGUgZnJvbSAnc3lzdGVtU2V0dXAvb0F1dGgvT0F1dGhDbGllbnRDb25maWdNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuLypcbiAqIFRlc3RzIGZvciB0aGUgT0F1dGhDbGllbnRNb2RhbEN0cmxcbiAqL1xuZGVzY3JpYmUoJ09BdXRoQ2xpZW50TW9kYWxDdHJsJywgKCkgPT4ge1xuXG4gICAgdmFyIE9BdXRoQ2xpZW50LCAkY29udHJvbGxlciwgdGVzdFNlcnZpY2UsIG9BdXRoQ2xpZW50VGVzdERhdGEsICRzY29wZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG9BdXRoQ2xpZW50Q29uZmlnTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfb0F1dGhDbGllbnRDb25maWdTZXJ2aWNlXywgX09BdXRoQ2xpZW50XywgX3Rlc3RTZXJ2aWNlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgX29BdXRoQ2xpZW50VGVzdERhdGFfLCBfJGNvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8pIHtcbiAgICAgICAgT0F1dGhDbGllbnQgPSBfT0F1dGhDbGllbnRfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgIG9BdXRoQ2xpZW50VGVzdERhdGEgPSBfb0F1dGhDbGllbnRUZXN0RGF0YV87XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY3JlYXRlQ2xpZW50JywgKCkgPT4ge1xuICAgICAgICBsZXQgb0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLCAkcSwgc3BNb2RhbCwgb0F1dGhDbGllbnRUb0NyZWF0ZSwgb0F1dGhDbGllbnRUb1VwZGF0ZSwgZGVmZXJyZWQ7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRxXywgX3NwTW9kYWxfLCBfb0F1dGhDbGllbnRDb25maWdTZXJ2aWNlXykge1xuICAgICAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgICAgIG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZSA9IF9vQXV0aENsaWVudENvbmZpZ1NlcnZpY2VfO1xuICAgICAgICAgICAgb0F1dGhDbGllbnRUb0NyZWF0ZSA9IG5ldyBPQXV0aENsaWVudChvQXV0aENsaWVudFRlc3REYXRhLkNMSUVOVDEpO1xuICAgICAgICAgICAgb0F1dGhDbGllbnRUb0NyZWF0ZS5jbGllbnRJZCA9IG51bGw7XG4gICAgICAgICAgICBvQXV0aENsaWVudFRvVXBkYXRlID0gbmV3IE9BdXRoQ2xpZW50KG9BdXRoQ2xpZW50VGVzdERhdGEuQ0xJRU5UMik7XG4gICAgICAgICAgICBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKGNsaWVudCkge1xuICAgICAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdPQXV0aENsaWVudE1vZGFsQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBjbGllbnQ6IGNsaWVudCxcbiAgICAgICAgICAgICAgICBvQXV0aENsaWVudENvbmZpZ1NlcnZpY2U6IG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZSxcbiAgICAgICAgICAgICAgICBzcE1vZGFsOiBzcE1vZGFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGFuZCByZWxvYWQgdGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIob0F1dGhDbGllbnRUb0NyZWF0ZSk7XG4gICAgICAgICAgICBzcHlPbihvQXV0aENsaWVudENvbmZpZ1NlcnZpY2UsICdjcmVhdGUnKS5hbmQucmV0dXJuVmFsdWUoZGVmZXJyZWQucHJvbWlzZSk7XG4gICAgICAgICAgICBzcHlPbihvQXV0aENsaWVudENvbmZpZ1NlcnZpY2UsICdyZWxvYWREYXRhJyk7XG4gICAgICAgICAgICBjdHJsLnNhdmUoKTtcbiAgICAgICAgICAgIGV4cGVjdChvQXV0aENsaWVudENvbmZpZ1NlcnZpY2UuY3JlYXRlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qob0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLnJlbG9hZERhdGEpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgYW5kIHJlbG9hZCB0YWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihvQXV0aENsaWVudFRvVXBkYXRlKTtcbiAgICAgICAgICAgIHNweU9uKG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZSwgJ3VwZGF0ZScpLmFuZC5yZXR1cm5WYWx1ZShkZWZlcnJlZC5wcm9taXNlKTtcbiAgICAgICAgICAgIHNweU9uKG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZSwgJ3JlbG9hZERhdGEnKTtcbiAgICAgICAgICAgIGN0cmwuc2F2ZSgpO1xuICAgICAgICAgICAgZXhwZWN0KG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS51cGRhdGUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChvQXV0aENsaWVudENvbmZpZ1NlcnZpY2UucmVsb2FkRGF0YSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGRlbGV0ZSBhbmQgcmVsb2FkIHRhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKG9BdXRoQ2xpZW50VG9VcGRhdGUpO1xuICAgICAgICAgICAgc3B5T24ob0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLCAncmVtb3ZlJykuYW5kLnJldHVyblZhbHVlKGRlZmVycmVkLnByb21pc2UpO1xuICAgICAgICAgICAgc3B5T24ob0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLCAncmVsb2FkRGF0YScpO1xuICAgICAgICAgICAgY3RybC5yZW1vdmUoKTtcbiAgICAgICAgICAgIGV4cGVjdChvQXV0aENsaWVudENvbmZpZ1NlcnZpY2UucmVtb3ZlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qob0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLnJlbG9hZERhdGEpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZWdlbmVyYXRlIGtleXMgYW5kIHJlbG9hZCB0YWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihvQXV0aENsaWVudFRvVXBkYXRlKTtcbiAgICAgICAgICAgIHNweU9uKG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZSwgJ3JlZ2VuZXJhdGVLZXlzJykuYW5kLnJldHVyblZhbHVlKGRlZmVycmVkLnByb21pc2UpO1xuICAgICAgICAgICAgc3B5T24ob0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLCAncmVsb2FkRGF0YScpO1xuICAgICAgICAgICAgY3RybC5yZWdlbmVyYXRlS2V5cygpO1xuICAgICAgICAgICAgZXhwZWN0KG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS5yZWdlbmVyYXRlS2V5cykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS5yZWxvYWREYXRhKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
