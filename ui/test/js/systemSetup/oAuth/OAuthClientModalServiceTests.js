System.register(['test/js/TestInitializer', 'systemSetup/oAuth/OAuthClientConfigModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    /*
     * Tests for the OAuthClientModalService
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
            describe('OAuthClientModalService', function () {

                var oAuthClientModalService, OAuthClient, spModal, $controller, testService, oAuthClientTestData, $scope, oAuthClientToCreate, oAuthClientToUpdate;

                beforeEach(module(oAuthClientConfigModule, testModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_oAuthClientModalService_, _OAuthClient_, _testService_, _spModal_, _oAuthClientTestData_, _$controller_, _$rootScope_) {
                    oAuthClientModalService = _oAuthClientModalService_;
                    OAuthClient = _OAuthClient_;
                    testService = _testService_;
                    spModal = _spModal_;
                    oAuthClientTestData = _oAuthClientTestData_;
                    $controller = _$controller_;
                    $scope = _$rootScope_.$new();

                    //test data
                    oAuthClientToCreate = new OAuthClient(oAuthClientTestData.CLIENT1);
                    oAuthClientToCreate.clientId = null;
                    oAuthClientToUpdate = new OAuthClient(oAuthClientTestData.CLIENT2);
                }));

                describe('show', function () {

                    it('should open create modal', function () {
                        spyOn(spModal, 'open');
                        oAuthClientModalService.show(oAuthClientToCreate);
                        expect(spModal.open).toHaveBeenCalled();
                        expect(spModal.open.calls.mostRecent().args[0].title).toEqual('ui_oauth_client_create');
                    });

                    it('should open edit modal', function () {
                        spyOn(spModal, 'open');
                        oAuthClientModalService.show(oAuthClientToUpdate);
                        expect(spModal.open).toHaveBeenCalled();
                        expect(spModal.open.calls.mostRecent().args[0].title).toEqual('ui_oauth_client_edit');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50TW9kYWxTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDZDQUE2Qyx1QkFBdUIsVUFBVSxTQUFTOzs7Ozs7SUFNL0g7O0lBRUEsSUFBSSx5QkFBeUI7SUFDN0IsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMENBQTBDO1lBQ2hHLDBCQUEwQix5Q0FBeUM7V0FDcEUsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTtZQU43QixTQUFTLDJCQUEyQixZQUFNOztnQkFFdEMsSUFBSSx5QkFBeUIsYUFBYSxTQUFTLGFBQWEsYUFBYSxxQkFBcUIsUUFDbEcscUJBQXFCOztnQkFFckIsV0FBVyxPQUFPLHlCQUF5Qjs7O2dCQUczQyxXQUFXLE9BQU8sVUFBUywyQkFBMkIsZUFBZSxlQUFlLFdBQzVFLHVCQUF1QixlQUFlLGNBQWM7b0JBQ3hELDBCQUEwQjtvQkFDMUIsY0FBYztvQkFDZCxjQUFjO29CQUNkLFVBQVU7b0JBQ1Ysc0JBQXNCO29CQUN0QixjQUFjO29CQUNkLFNBQVMsYUFBYTs7O29CQUd0QixzQkFBc0IsSUFBSSxZQUFZLG9CQUFvQjtvQkFDMUQsb0JBQW9CLFdBQVc7b0JBQy9CLHNCQUFzQixJQUFJLFlBQVksb0JBQW9COzs7Z0JBRzlELFNBQVMsUUFBUSxZQUFNOztvQkFFbkIsR0FBRyw0QkFBNEIsWUFBTTt3QkFDakMsTUFBTSxTQUFTO3dCQUNmLHdCQUF3QixLQUFLO3dCQUM3QixPQUFPLFFBQVEsTUFBTTt3QkFDckIsT0FBTyxRQUFRLEtBQUssTUFBTSxhQUFhLEtBQUssR0FBRyxPQUFPLFFBQVE7OztvQkFHbEUsR0FBRywwQkFBMEIsWUFBTTt3QkFDL0IsTUFBTSxTQUFTO3dCQUNmLHdCQUF3QixLQUFLO3dCQUM3QixPQUFPLFFBQVEsTUFBTTt3QkFDckIsT0FBTyxRQUFRLEtBQUssTUFBTSxhQUFhLEtBQUssR0FBRyxPQUFPLFFBQVE7Ozs7OztHQVd2RSIsImZpbGUiOiJzeXN0ZW1TZXR1cC9vQXV0aC9PQXV0aENsaWVudE1vZGFsU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IG9BdXRoQ2xpZW50Q29uZmlnTW9kdWxlIGZyb20gJ3N5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50Q29uZmlnTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbi8qXG4gKiBUZXN0cyBmb3IgdGhlIE9BdXRoQ2xpZW50TW9kYWxTZXJ2aWNlXG4gKi9cbmRlc2NyaWJlKCdPQXV0aENsaWVudE1vZGFsU2VydmljZScsICgpID0+IHtcblxuICAgIHZhciBvQXV0aENsaWVudE1vZGFsU2VydmljZSwgT0F1dGhDbGllbnQsIHNwTW9kYWwsICRjb250cm9sbGVyLCB0ZXN0U2VydmljZSwgb0F1dGhDbGllbnRUZXN0RGF0YSwgJHNjb3BlLFxuICAgIG9BdXRoQ2xpZW50VG9DcmVhdGUsIG9BdXRoQ2xpZW50VG9VcGRhdGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShvQXV0aENsaWVudENvbmZpZ01vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogNyAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9vQXV0aENsaWVudE1vZGFsU2VydmljZV8sIF9PQXV0aENsaWVudF8sIF90ZXN0U2VydmljZV8sIF9zcE1vZGFsXyxcbiAgICAgICAgICAgIF9vQXV0aENsaWVudFRlc3REYXRhXywgXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfKSB7XG4gICAgICAgIG9BdXRoQ2xpZW50TW9kYWxTZXJ2aWNlID0gX29BdXRoQ2xpZW50TW9kYWxTZXJ2aWNlXztcbiAgICAgICAgT0F1dGhDbGllbnQgPSBfT0F1dGhDbGllbnRfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgIG9BdXRoQ2xpZW50VGVzdERhdGEgPSBfb0F1dGhDbGllbnRUZXN0RGF0YV87XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcblxuICAgICAgICAvL3Rlc3QgZGF0YVxuICAgICAgICBvQXV0aENsaWVudFRvQ3JlYXRlID0gbmV3IE9BdXRoQ2xpZW50KG9BdXRoQ2xpZW50VGVzdERhdGEuQ0xJRU5UMSk7XG4gICAgICAgIG9BdXRoQ2xpZW50VG9DcmVhdGUuY2xpZW50SWQgPSBudWxsO1xuICAgICAgICBvQXV0aENsaWVudFRvVXBkYXRlID0gbmV3IE9BdXRoQ2xpZW50KG9BdXRoQ2xpZW50VGVzdERhdGEuQ0xJRU5UMik7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3cnLCAoKSA9PiB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIGNyZWF0ZSBtb2RhbCcsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJyk7XG4gICAgICAgICAgICBvQXV0aENsaWVudE1vZGFsU2VydmljZS5zaG93KG9BdXRoQ2xpZW50VG9DcmVhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS50aXRsZSkudG9FcXVhbCgndWlfb2F1dGhfY2xpZW50X2NyZWF0ZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG9wZW4gZWRpdCBtb2RhbCcsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJyk7XG4gICAgICAgICAgICBvQXV0aENsaWVudE1vZGFsU2VydmljZS5zaG93KG9BdXRoQ2xpZW50VG9VcGRhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS50aXRsZSkudG9FcXVhbCgndWlfb2F1dGhfY2xpZW50X2VkaXQnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
