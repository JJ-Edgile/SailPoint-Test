System.register(['test/js/TestInitializer', 'alert/AlertModule', 'common/util/UtilModule', 'test/js/TestModule'], function (_export) {
    /*
    *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
    */

    'use strict';

    var alertModule, utilModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_alertAlertModule) {
            alertModule = _alertAlertModule['default'];
        }, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('AlertDefinitionDetailsCtrl', function () {

                var alertDefinitionService = undefined,
                    AlertDefinition = undefined,
                    testService = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    $state = undefined,
                    AlertDefinitionTestData = undefined,
                    $stateParams = undefined;

                beforeEach(module(alertModule, utilModule, testModule));

                /* jshint maxparams : 8 */
                beforeEach(inject(function (_alertDefinitionService_, _AlertDefinition_, _testService_, _$controller_, _$rootScope_, _$state_, _alertDefinitionTestData_, _$stateParams_) {
                    alertDefinitionService = _alertDefinitionService_;
                    AlertDefinition = _AlertDefinition_;
                    testService = _testService_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    $state = _$state_;
                    AlertDefinitionTestData = _alertDefinitionTestData_;
                    $stateParams = _$stateParams_;
                }));

                beforeEach(function () {
                    spyOn(alertDefinitionService, 'getAlertDefinitionDetails').and.returnValue(testService.createPromise(false, AlertDefinitionTestData.ALERTDEF1));
                });

                function createController() {
                    return $controller('AlertDefinitionDetailsCtrl', {
                        alertDefinitionService: alertDefinitionService,
                        AlertDefinition: AlertDefinition,
                        $state: $state
                    });
                }

                describe('constructor', function () {

                    describe('Non create stateParam id', function () {
                        beforeEach(inject(function ($stateParams) {
                            $stateParams.alertDefinitionId = '1';
                        }));

                        afterEach(inject(function ($stateParams) {
                            $stateParams.alertDefinitionId = undefined;
                        }));

                        it('should fetch the AlertDefinition for non create', function () {
                            createController();
                            expect(alertDefinitionService.getAlertDefinitionDetails).toHaveBeenCalledWith('1');
                        });

                        it('should set the alertDefinition', function () {
                            var ctrl = createController();
                            $rootScope.$digest();
                            expect(ctrl.getAlertDefinition()).toEqual(AlertDefinitionTestData.ALERTDEF1);
                        });
                    });

                    describe('Create', function () {
                        beforeEach(inject(function ($stateParams) {
                            $stateParams.isCreate = true;
                        }));

                        afterEach(inject(function ($stateParams) {
                            $stateParams.isCreate = false;
                        }));

                        it('should not call to the alertDefService', function () {
                            createController();
                            expect(alertDefinitionService.getAlertDefinitionDetails).not.toHaveBeenCalled();
                        });
                    });
                });

                describe('save', function () {
                    beforeEach(function () {
                        spyOn(alertDefinitionService, 'update').and.returnValue(testService.createPromise(false, null));
                    });

                    beforeEach(function () {
                        spyOn(alertDefinitionService, 'create').and.returnValue(testService.createPromise(false, null));
                    });

                    describe('create', function () {
                        beforeEach(inject(function ($stateParams) {
                            $stateParams.isCreate = true;
                        }));

                        afterEach(inject(function ($stateParams) {
                            $stateParams.isCreate = false;
                        }));

                        it('should call AlertDefinitionService', function () {
                            var ctrl = createController();
                            ctrl.save();
                            expect(alertDefinitionService.create).toHaveBeenCalledWith(new AlertDefinition({}));
                        });

                        it('should call scope go', function () {
                            var ctrl = createController();
                            spyOn($state, 'go');
                            ctrl.save();
                            $rootScope.$digest();
                            expect($state.go).toHaveBeenCalledWith('alerts', { currentTab: 'alertDefTab' });
                        });
                    });

                    describe('update', function () {
                        beforeEach(inject(function ($stateParams) {
                            $stateParams.alertDefinitionId = '1';
                        }));

                        afterEach(inject(function ($stateParams) {
                            $stateParams.alertDefinitionId = undefined;
                        }));

                        it('should call AlertDef Service', function () {
                            var ctrl = createController();
                            $rootScope.$digest();
                            ctrl.save();
                            expect(alertDefinitionService.update).toHaveBeenCalledWith(AlertDefinitionTestData.ALERTDEF1);
                        });

                        it('should call scope go', function () {
                            var ctrl = createController();
                            spyOn($state, 'go');
                            ctrl.save();
                            $rootScope.$digest();
                            expect($state.go).toHaveBeenCalledWith('alerts', { currentTab: 'alertDefTab' });
                        });
                    });
                });

                describe('cancel', function () {
                    it('should call state go', function () {
                        var ctrl = createController();
                        spyOn($state, 'go');
                        ctrl.cancel();
                        expect($state.go).toHaveBeenCalledWith('alerts', { currentTab: 'alertDefTab' });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L0FsZXJ0RGVmaW5pdGlvbkRldGFpbHNDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFCQUFxQiwwQkFBMEIsdUJBQXVCLFVBQVUsU0FBUzs7Ozs7SUFLakk7O0lBRUEsSUFBSSxhQUFhLFlBQVk7SUFDN0IsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUJBQW1CO1lBQ3pFLGNBQWMsa0JBQWtCO1dBQ2pDLFVBQVUsdUJBQXVCO1lBQ2hDLGFBQWEsc0JBQXNCO1dBQ3BDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBUDdCLFNBQVMsOEJBQThCLFlBQU07O2dCQUV6QyxJQUFJLHlCQUFzQjtvQkFBRSxrQkFBZTtvQkFBRSxjQUFXO29CQUFFLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSxTQUFNO29CQUFFLDBCQUF1QjtvQkFDOUcsZUFBWTs7Z0JBRWhCLFdBQVcsT0FBTyxhQUFhLFlBQVk7OztnQkFHM0MsV0FBVyxPQUFPLFVBQUMsMEJBQTBCLG1CQUFtQixlQUFlLGVBQWUsY0FDMUYsVUFBVSwyQkFBMkIsZ0JBQW1CO29CQUN4RCx5QkFBeUI7b0JBQ3pCLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsU0FBUztvQkFDVCwwQkFBMEI7b0JBQzFCLGVBQWU7OztnQkFHbkIsV0FBVyxZQUFNO29CQUNiLE1BQU0sd0JBQXdCLDZCQUE2QixJQUFJLFlBQzNELFlBQVksY0FBYyxPQUFPLHdCQUF3Qjs7O2dCQUlqRSxTQUFTLG1CQUFtQjtvQkFDeEIsT0FBTyxZQUFZLDhCQUE4Qjt3QkFDN0Msd0JBQXdCO3dCQUN4QixpQkFBaUI7d0JBQ2pCLFFBQVE7Ozs7Z0JBSWhCLFNBQVMsZUFBZSxZQUFNOztvQkFFMUIsU0FBUyw0QkFBNEIsWUFBTTt3QkFDdkMsV0FBVyxPQUFPLFVBQVMsY0FBYzs0QkFDckMsYUFBYSxvQkFBb0I7Ozt3QkFHckMsVUFBVSxPQUFPLFVBQVMsY0FBYzs0QkFDcEMsYUFBYSxvQkFBb0I7Ozt3QkFHckMsR0FBRyxtREFBbUQsWUFBTTs0QkFDeEQ7NEJBQ0EsT0FBTyx1QkFBdUIsMkJBQTJCLHFCQUFxQjs7O3dCQUdsRixHQUFHLGtDQUFrQyxZQUFNOzRCQUN2QyxJQUFJLE9BQU87NEJBQ1gsV0FBVzs0QkFDWCxPQUFPLEtBQUssc0JBQXNCLFFBQVEsd0JBQXdCOzs7O29CQUkxRSxTQUFTLFVBQVUsWUFBTTt3QkFDckIsV0FBVyxPQUFPLFVBQVMsY0FBYzs0QkFDckMsYUFBYSxXQUFXOzs7d0JBRzVCLFVBQVUsT0FBTyxVQUFTLGNBQWM7NEJBQ3BDLGFBQWEsV0FBVzs7O3dCQUc1QixHQUFHLDBDQUEwQyxZQUFNOzRCQUMvQzs0QkFDQSxPQUFPLHVCQUF1QiwyQkFBMkIsSUFBSTs7Ozs7Z0JBT3pFLFNBQVMsUUFBUSxZQUFNO29CQUNuQixXQUFXLFlBQU07d0JBQ2IsTUFBTSx3QkFBd0IsVUFBVSxJQUFJLFlBQ3hDLFlBQVksY0FBYyxPQUFPOzs7b0JBSXpDLFdBQVcsWUFBTTt3QkFDYixNQUFNLHdCQUF3QixVQUFVLElBQUksWUFDeEMsWUFBWSxjQUFjLE9BQU87OztvQkFJekMsU0FBUyxVQUFVLFlBQU07d0JBQ3JCLFdBQVcsT0FBTyxVQUFTLGNBQWM7NEJBQ3JDLGFBQWEsV0FBVzs7O3dCQUc1QixVQUFVLE9BQU8sVUFBUyxjQUFjOzRCQUNwQyxhQUFhLFdBQVc7Ozt3QkFHNUIsR0FBRyxzQ0FBc0MsWUFBTTs0QkFDM0MsSUFBSSxPQUFPOzRCQUNYLEtBQUs7NEJBQ0wsT0FBTyx1QkFBdUIsUUFBUSxxQkFBcUIsSUFBSSxnQkFBZ0I7Ozt3QkFHbkYsR0FBRyx3QkFBd0IsWUFBTTs0QkFDN0IsSUFBSSxPQUFPOzRCQUNYLE1BQU0sUUFBUTs0QkFDZCxLQUFLOzRCQUNMLFdBQVc7NEJBQ1gsT0FBTyxPQUFPLElBQUkscUJBQXFCLFVBQVUsRUFBQyxZQUFZOzs7O29CQUt0RSxTQUFTLFVBQVUsWUFBTTt3QkFDckIsV0FBVyxPQUFPLFVBQVMsY0FBYzs0QkFDckMsYUFBYSxvQkFBb0I7Ozt3QkFHckMsVUFBVSxPQUFPLFVBQVMsY0FBYzs0QkFDcEMsYUFBYSxvQkFBb0I7Ozt3QkFHckMsR0FBRyxnQ0FBZ0MsWUFBTTs0QkFDckMsSUFBSSxPQUFPOzRCQUNYLFdBQVc7NEJBQ1gsS0FBSzs0QkFDTCxPQUFPLHVCQUF1QixRQUFRLHFCQUFxQix3QkFBd0I7Ozt3QkFJdkYsR0FBRyx3QkFBd0IsWUFBTTs0QkFDN0IsSUFBSSxPQUFPOzRCQUNYLE1BQU0sUUFBUTs0QkFDZCxLQUFLOzRCQUNMLFdBQVc7NEJBQ1gsT0FBTyxPQUFPLElBQUkscUJBQXFCLFVBQVUsRUFBQyxZQUFZOzs7OztnQkFLMUUsU0FBUyxVQUFVLFlBQU07b0JBQ3JCLEdBQUcsd0JBQXdCLFlBQU07d0JBQzdCLElBQUksT0FBTzt3QkFDWCxNQUFNLFFBQVE7d0JBQ2QsS0FBSzt3QkFDTCxPQUFPLE9BQU8sSUFBSSxxQkFBcUIsVUFBVSxFQUFDLFlBQVk7Ozs7OztHQVV2RSIsImZpbGUiOiJhbGVydC9BbGVydERlZmluaXRpb25EZXRhaWxzQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiogIChjKSBDb3B5cmlnaHQgMjAwOCBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYWxlcnRNb2R1bGUgZnJvbSAnYWxlcnQvQWxlcnRNb2R1bGUnO1xuaW1wb3J0IHV0aWxNb2R1bGUgZnJvbSAnY29tbW9uL3V0aWwvVXRpbE1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnQWxlcnREZWZpbml0aW9uRGV0YWlsc0N0cmwnLCAoKSA9PiB7XG5cbiAgICBsZXQgYWxlcnREZWZpbml0aW9uU2VydmljZSwgQWxlcnREZWZpbml0aW9uLCB0ZXN0U2VydmljZSwgJGNvbnRyb2xsZXIsICRyb290U2NvcGUsICRzdGF0ZSwgQWxlcnREZWZpbml0aW9uVGVzdERhdGEsXG4gICAgICAgICRzdGF0ZVBhcmFtcztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFsZXJ0TW9kdWxlLCB1dGlsTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zIDogOCAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfYWxlcnREZWZpbml0aW9uU2VydmljZV8sIF9BbGVydERlZmluaXRpb25fLCBfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8sXG4gICAgICAgIF8kc3RhdGVfLCBfYWxlcnREZWZpbml0aW9uVGVzdERhdGFfLCBfJHN0YXRlUGFyYW1zXykgPT4ge1xuICAgICAgICBhbGVydERlZmluaXRpb25TZXJ2aWNlID0gX2FsZXJ0RGVmaW5pdGlvblNlcnZpY2VfO1xuICAgICAgICBBbGVydERlZmluaXRpb24gPSBfQWxlcnREZWZpbml0aW9uXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRzdGF0ZSA9IF8kc3RhdGVfO1xuICAgICAgICBBbGVydERlZmluaXRpb25UZXN0RGF0YSA9IF9hbGVydERlZmluaXRpb25UZXN0RGF0YV87XG4gICAgICAgICRzdGF0ZVBhcmFtcyA9IF8kc3RhdGVQYXJhbXNfO1xuICAgIH0pKTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBzcHlPbihhbGVydERlZmluaXRpb25TZXJ2aWNlLCAnZ2V0QWxlcnREZWZpbml0aW9uRGV0YWlscycpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIEFsZXJ0RGVmaW5pdGlvblRlc3REYXRhLkFMRVJUREVGMSlcbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignQWxlcnREZWZpbml0aW9uRGV0YWlsc0N0cmwnLCB7XG4gICAgICAgICAgICBhbGVydERlZmluaXRpb25TZXJ2aWNlOiBhbGVydERlZmluaXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgQWxlcnREZWZpbml0aW9uOiBBbGVydERlZmluaXRpb24sXG4gICAgICAgICAgICAkc3RhdGU6ICRzdGF0ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG5cbiAgICAgICAgZGVzY3JpYmUoJ05vbiBjcmVhdGUgc3RhdGVQYXJhbSBpZCcsICgpID0+IHtcbiAgICAgICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcykge1xuICAgICAgICAgICAgICAgICRzdGF0ZVBhcmFtcy5hbGVydERlZmluaXRpb25JZCA9ICcxJztcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgYWZ0ZXJFYWNoKGluamVjdChmdW5jdGlvbigkc3RhdGVQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAkc3RhdGVQYXJhbXMuYWxlcnREZWZpbml0aW9uSWQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgZmV0Y2ggdGhlIEFsZXJ0RGVmaW5pdGlvbiBmb3Igbm9uIGNyZWF0ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGFsZXJ0RGVmaW5pdGlvblNlcnZpY2UuZ2V0QWxlcnREZWZpbml0aW9uRGV0YWlscykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJzEnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNldCB0aGUgYWxlcnREZWZpbml0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEFsZXJ0RGVmaW5pdGlvbigpKS50b0VxdWFsKEFsZXJ0RGVmaW5pdGlvblRlc3REYXRhLkFMRVJUREVGMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ0NyZWF0ZScsICgpID0+IHtcbiAgICAgICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcykge1xuICAgICAgICAgICAgICAgICRzdGF0ZVBhcmFtcy5pc0NyZWF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGFmdGVyRWFjaChpbmplY3QoZnVuY3Rpb24oJHN0YXRlUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlUGFyYW1zLmlzQ3JlYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgbm90IGNhbGwgdG8gdGhlIGFsZXJ0RGVmU2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGFsZXJ0RGVmaW5pdGlvblNlcnZpY2UuZ2V0QWxlcnREZWZpbml0aW9uRGV0YWlscykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2F2ZScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihhbGVydERlZmluaXRpb25TZXJ2aWNlLCAndXBkYXRlJykuYW5kLnJldHVyblZhbHVlKFxuICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIG51bGwpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGFsZXJ0RGVmaW5pdGlvblNlcnZpY2UsICdjcmVhdGUnKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgbnVsbClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdjcmVhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkc3RhdGVQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAkc3RhdGVQYXJhbXMuaXNDcmVhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBhZnRlckVhY2goaW5qZWN0KGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcykge1xuICAgICAgICAgICAgICAgICRzdGF0ZVBhcmFtcy5pc0NyZWF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgQWxlcnREZWZpbml0aW9uU2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICBjdHJsLnNhdmUoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoYWxlcnREZWZpbml0aW9uU2VydmljZS5jcmVhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG5ldyBBbGVydERlZmluaXRpb24oe30pKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgc2NvcGUgZ28nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgc3B5T24oJHN0YXRlLCAnZ28nKTtcbiAgICAgICAgICAgICAgICBjdHJsLnNhdmUoKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoJHN0YXRlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnYWxlcnRzJywge2N1cnJlbnRUYWI6ICdhbGVydERlZlRhYid9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkc3RhdGVQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAkc3RhdGVQYXJhbXMuYWxlcnREZWZpbml0aW9uSWQgPSAnMSc7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGFmdGVyRWFjaChpbmplY3QoZnVuY3Rpb24oJHN0YXRlUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlUGFyYW1zLmFsZXJ0RGVmaW5pdGlvbklkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgQWxlcnREZWYgU2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgICAgICBjdHJsLnNhdmUoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoYWxlcnREZWZpbml0aW9uU2VydmljZS51cGRhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKEFsZXJ0RGVmaW5pdGlvblRlc3REYXRhLkFMRVJUREVGMSk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgc2NvcGUgZ28nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgc3B5T24oJHN0YXRlLCAnZ28nKTtcbiAgICAgICAgICAgICAgICBjdHJsLnNhdmUoKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoJHN0YXRlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnYWxlcnRzJywge2N1cnJlbnRUYWI6ICdhbGVydERlZlRhYid9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjYW5jZWwnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBzdGF0ZSBnbycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgc3B5T24oJHN0YXRlLCAnZ28nKTtcbiAgICAgICAgICAgIGN0cmwuY2FuY2VsKCk7XG4gICAgICAgICAgICBleHBlY3QoJHN0YXRlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnYWxlcnRzJywge2N1cnJlbnRUYWI6ICdhbGVydERlZlRhYid9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
