System.register(['test/js/TestInitializer', 'systemSetup/oAuth/OAuthClientConfigModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    /*
     * Tests for the OAuthClientConfigPageCtrl
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
            describe('OAuthClientConfigPageCtrl', function () {

                var oAuthClientConfigService = undefined,
                    OAuthClient = undefined,
                    oAuthClientModalService = undefined,
                    testService = undefined,
                    oAuthClientTestData = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    SortOrder = undefined;

                beforeEach(module(oAuthClientConfigModule, testModule));

                /* jshint maxparams:8 */
                beforeEach(inject(function (_oAuthClientConfigService_, _OAuthClient_, _testService_, _oAuthClientTestData_, _$controller_, _$rootScope_, _SortOrder_, _oAuthClientModalService_) {
                    oAuthClientConfigService = _oAuthClientConfigService_;
                    OAuthClient = _OAuthClient_;
                    testService = _testService_;
                    oAuthClientTestData = _oAuthClientTestData_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    SortOrder = _SortOrder_;
                    oAuthClientModalService = _oAuthClientModalService_;
                }));

                function createController(hasFullAccess) {
                    return $controller('OAuthClientConfigPageCtrl', {
                        OAUTH_CLIENT_FULL_ACCESS: hasFullAccess
                    });
                }

                describe('isEditEnabled', function () {
                    it('should return true', function () {
                        var ctrl = createController(true);

                        expect(ctrl.isEditEnabled()).toBe(true);
                    });
                });

                describe('getItems', function () {

                    beforeEach(function () {
                        spyOn(oAuthClientConfigService, 'getClients').and.returnValue(testService.createPromise(false, oAuthClientTestData.RESPONSE));
                    });

                    it('should return results', function () {
                        var ctrl = createController(false),
                            result = ctrl.getItems(0, 10),
                            realResult = undefined;

                        result.then(function (value) {
                            realResult = value.data;
                        });
                        $rootScope.$apply();

                        expect(oAuthClientConfigService.getClients).toHaveBeenCalled();
                        expect(realResult).toBeDefined();
                        expect(realResult.count).toEqual(2);
                    });

                    it('should set a sort', function () {
                        var ctrl = createController(false),
                            sort = new SortOrder(),
                            result = undefined,
                            realResult = undefined;
                        sort.addSort('name', false);
                        result = ctrl.getItems(0, 10, sort);

                        result.then(function (value) {
                            realResult = value.data;
                        });
                        $rootScope.$apply();

                        expect(oAuthClientConfigService.getClients).toHaveBeenCalled();
                        expect(oAuthClientConfigService.getClients).toHaveBeenCalledWith(0, 10, sort);
                        expect(realResult).toBeDefined();
                        expect(realResult.count).toEqual(2);
                    });
                });

                describe('refresh', function () {

                    it('should trigger a table refresh', function () {
                        var ctrl = createController(false);

                        spyOn(ctrl.tableConfig.refreshTrigger, 'refresh');

                        ctrl.refresh();

                        expect(ctrl.tableConfig.refreshTrigger.refresh).toHaveBeenCalled();
                    });
                });

                describe('createClient', function () {

                    it('should open create Modal', function () {
                        var ctrl = createController(true);

                        spyOn(ctrl.oAuthClientModalService, 'show');

                        ctrl.showCreateModal();

                        expect(ctrl.oAuthClientModalService.show).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50Q29uZmlnUGFnZUN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNkNBQTZDLHVCQUF1QixVQUFVLFNBQVM7Ozs7OztJQU0vSDs7SUFFQSxJQUFJLHlCQUF5QjtJQUM3QixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwwQ0FBMEM7WUFDaEcsMEJBQTBCLHlDQUF5QztXQUNwRSxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsNkJBQTZCLFlBQU07O2dCQUV4QyxJQUFJLDJCQUF3QjtvQkFBRSxjQUFXO29CQUFFLDBCQUF1QjtvQkFBRSxjQUFXO29CQUFFLHNCQUFtQjtvQkFDaEcsY0FBVztvQkFBRSxhQUFVO29CQUFFLFlBQVM7O2dCQUV0QyxXQUFXLE9BQU8seUJBQXlCOzs7Z0JBRzNDLFdBQVcsT0FBTyxVQUFDLDRCQUE0QixlQUFlLGVBQ3RELHVCQUF1QixlQUFlLGNBQWMsYUFBYSwyQkFBOEI7b0JBQ25HLDJCQUEyQjtvQkFDM0IsY0FBYztvQkFDZCxjQUFjO29CQUNkLHNCQUFzQjtvQkFDdEIsY0FBYztvQkFDZCxhQUFhO29CQUNiLFlBQVk7b0JBQ1osMEJBQTBCOzs7Z0JBRzlCLFNBQVMsaUJBQWlCLGVBQWU7b0JBQ3JDLE9BQU8sWUFBWSw2QkFBNkI7d0JBQzVDLDBCQUEwQjs7OztnQkFJbEMsU0FBUyxpQkFBaUIsWUFBTTtvQkFDNUIsR0FBRyxzQkFBc0IsWUFBTTt3QkFDM0IsSUFBSSxPQUFPLGlCQUFpQjs7d0JBRTVCLE9BQU8sS0FBSyxpQkFBaUIsS0FBSzs7OztnQkFJMUMsU0FBUyxZQUFZLFlBQU07O29CQUV2QixXQUFXLFlBQU07d0JBQ2IsTUFBTSwwQkFBMEIsY0FBYyxJQUFJLFlBQzlDLFlBQVksY0FBYyxPQUFPLG9CQUFvQjs7O29CQUk3RCxHQUFHLHlCQUF5QixZQUFNO3dCQUM5QixJQUFJLE9BQU8saUJBQWlCOzRCQUN4QixTQUFTLEtBQUssU0FBUyxHQUFHOzRCQUMxQixhQUFVOzt3QkFFZCxPQUFPLEtBQUssVUFBQyxPQUFVOzRCQUNuQixhQUFhLE1BQU07O3dCQUV2QixXQUFXOzt3QkFFWCxPQUFPLHlCQUF5QixZQUFZO3dCQUM1QyxPQUFPLFlBQVk7d0JBQ25CLE9BQU8sV0FBVyxPQUFPLFFBQVE7OztvQkFJckMsR0FBRyxxQkFBcUIsWUFBTTt3QkFDMUIsSUFBSSxPQUFPLGlCQUFpQjs0QkFDeEIsT0FBTyxJQUFJOzRCQUNYLFNBQU07NEJBQ04sYUFBVTt3QkFDZCxLQUFLLFFBQVEsUUFBUTt3QkFDckIsU0FBUyxLQUFLLFNBQVMsR0FBRyxJQUFJOzt3QkFFOUIsT0FBTyxLQUFLLFVBQUMsT0FBVTs0QkFDbkIsYUFBYSxNQUFNOzt3QkFFdkIsV0FBVzs7d0JBRVgsT0FBTyx5QkFBeUIsWUFBWTt3QkFDNUMsT0FBTyx5QkFBeUIsWUFBWSxxQkFDcEMsR0FBRyxJQUFJO3dCQUNmLE9BQU8sWUFBWTt3QkFDbkIsT0FBTyxXQUFXLE9BQU8sUUFBUTs7OztnQkFNekMsU0FBUyxXQUFXLFlBQU07O29CQUV0QixHQUFHLGtDQUFrQyxZQUFNO3dCQUN2QyxJQUFJLE9BQU8saUJBQWlCOzt3QkFFNUIsTUFBTSxLQUFLLFlBQVksZ0JBQWdCOzt3QkFFdkMsS0FBSzs7d0JBRUwsT0FBTyxLQUFLLFlBQVksZUFBZSxTQUFTOzs7O2dCQUt4RCxTQUFTLGdCQUFnQixZQUFNOztvQkFFM0IsR0FBRyw0QkFBNEIsWUFBTTt3QkFDakMsSUFBSSxPQUFPLGlCQUFpQjs7d0JBRTVCLE1BQU0sS0FBSyx5QkFBeUI7O3dCQUVwQyxLQUFLOzt3QkFFTCxPQUFPLEtBQUssd0JBQXdCLE1BQU07Ozs7OztHQVduRCIsImZpbGUiOiJzeXN0ZW1TZXR1cC9vQXV0aC9PQXV0aENsaWVudENvbmZpZ1BhZ2VDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgb0F1dGhDbGllbnRDb25maWdNb2R1bGUgZnJvbSAnc3lzdGVtU2V0dXAvb0F1dGgvT0F1dGhDbGllbnRDb25maWdNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuLypcbiAqIFRlc3RzIGZvciB0aGUgT0F1dGhDbGllbnRDb25maWdQYWdlQ3RybFxuICovXG5kZXNjcmliZSgnT0F1dGhDbGllbnRDb25maWdQYWdlQ3RybCcsICgpID0+IHtcblxuICAgIGxldCBvQXV0aENsaWVudENvbmZpZ1NlcnZpY2UsIE9BdXRoQ2xpZW50LCBvQXV0aENsaWVudE1vZGFsU2VydmljZSwgdGVzdFNlcnZpY2UsIG9BdXRoQ2xpZW50VGVzdERhdGEsXG4gICAgICAgICRjb250cm9sbGVyLCAkcm9vdFNjb3BlLCBTb3J0T3JkZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShvQXV0aENsaWVudENvbmZpZ01vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczo4ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9vQXV0aENsaWVudENvbmZpZ1NlcnZpY2VfLCBfT0F1dGhDbGllbnRfLCBfdGVzdFNlcnZpY2VfLFxuICAgICAgICAgICAgX29BdXRoQ2xpZW50VGVzdERhdGFfLCBfJGNvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8sIF9Tb3J0T3JkZXJfLCBfb0F1dGhDbGllbnRNb2RhbFNlcnZpY2VfKSA9PiB7XG4gICAgICAgIG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZSA9IF9vQXV0aENsaWVudENvbmZpZ1NlcnZpY2VfO1xuICAgICAgICBPQXV0aENsaWVudCA9IF9PQXV0aENsaWVudF87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgb0F1dGhDbGllbnRUZXN0RGF0YSA9IF9vQXV0aENsaWVudFRlc3REYXRhXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBTb3J0T3JkZXIgPSBfU29ydE9yZGVyXztcbiAgICAgICAgb0F1dGhDbGllbnRNb2RhbFNlcnZpY2UgPSBfb0F1dGhDbGllbnRNb2RhbFNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoaGFzRnVsbEFjY2Vzcykge1xuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ09BdXRoQ2xpZW50Q29uZmlnUGFnZUN0cmwnLCB7XG4gICAgICAgICAgICBPQVVUSF9DTElFTlRfRlVMTF9BQ0NFU1M6IGhhc0Z1bGxBY2Nlc3NcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2lzRWRpdEVuYWJsZWQnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRWRpdEVuYWJsZWQoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0SXRlbXMnLCAoKSA9PiB7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihvQXV0aENsaWVudENvbmZpZ1NlcnZpY2UsICdnZXRDbGllbnRzJykuYW5kLnJldHVyblZhbHVlKFxuICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIG9BdXRoQ2xpZW50VGVzdERhdGEuUkVTUE9OU0UpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlKSxcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjdHJsLmdldEl0ZW1zKDAsIDEwKSxcbiAgICAgICAgICAgICAgICByZWFsUmVzdWx0O1xuXG4gICAgICAgICAgICByZXN1bHQudGhlbigodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICByZWFsUmVzdWx0ID0gdmFsdWUuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS5nZXRDbGllbnRzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QocmVhbFJlc3VsdCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZWFsUmVzdWx0LmNvdW50KS50b0VxdWFsKDIpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGEgc29ydCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSksXG4gICAgICAgICAgICAgICAgc29ydCA9IG5ldyBTb3J0T3JkZXIoKSxcbiAgICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgICAgcmVhbFJlc3VsdDtcbiAgICAgICAgICAgIHNvcnQuYWRkU29ydCgnbmFtZScsIGZhbHNlKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGN0cmwuZ2V0SXRlbXMoMCwgMTAsIHNvcnQpO1xuXG4gICAgICAgICAgICByZXN1bHQudGhlbigodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICByZWFsUmVzdWx0ID0gdmFsdWUuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS5nZXRDbGllbnRzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3Qob0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLmdldENsaWVudHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICAgICAgICAwLCAxMCwgc29ydCk7XG4gICAgICAgICAgICBleHBlY3QocmVhbFJlc3VsdCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZWFsUmVzdWx0LmNvdW50KS50b0VxdWFsKDIpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVmcmVzaCcsICgpID0+IHtcblxuICAgICAgICBpdCgnc2hvdWxkIHRyaWdnZXIgYSB0YWJsZSByZWZyZXNoJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlKTtcblxuICAgICAgICAgICAgc3B5T24oY3RybC50YWJsZUNvbmZpZy5yZWZyZXNoVHJpZ2dlciwgJ3JlZnJlc2gnKTtcblxuICAgICAgICAgICAgY3RybC5yZWZyZXNoKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnRhYmxlQ29uZmlnLnJlZnJlc2hUcmlnZ2VyLnJlZnJlc2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjcmVhdGVDbGllbnQnLCAoKSA9PiB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIGNyZWF0ZSBNb2RhbCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcih0cnVlKTtcblxuICAgICAgICAgICAgc3B5T24oY3RybC5vQXV0aENsaWVudE1vZGFsU2VydmljZSwgJ3Nob3cnKTtcblxuICAgICAgICAgICAgY3RybC5zaG93Q3JlYXRlTW9kYWwoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwub0F1dGhDbGllbnRNb2RhbFNlcnZpY2Uuc2hvdykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
