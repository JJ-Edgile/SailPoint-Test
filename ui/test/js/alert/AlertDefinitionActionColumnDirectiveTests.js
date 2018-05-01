System.register(['test/js/TestInitializer', 'alert/AlertModule', 'test/js/TestModule'], function (_export) {
    /*
     *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var alertModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_alertAlertModule) {
            alertModule = _alertAlertModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('spAlertDefinitionActionColumn', function () {

                var AlertDefinition = undefined,
                    AlertDefinitionTestData = undefined;

                beforeEach(module(alertModule, testModule));

                beforeEach(inject(function (_AlertDefinition_, _alertDefinitionTestData_) {
                    AlertDefinition = _AlertDefinition_;
                    AlertDefinitionTestData = _alertDefinitionTestData_;
                }));

                function createAlertDefinition() {
                    return new AlertDefinition(AlertDefinitionTestData.ALERTDEF1);
                }

                describe('AlertDefinitionActionColumnDirectiveCtrl', function () {

                    var alertDefinitionService = undefined,
                        $controller = undefined,
                        spModal = undefined;

                    beforeEach(inject(function (_$controller_, _alertDefinitionService_, _spModal_) {
                        alertDefinitionService = _alertDefinitionService_;
                        $controller = _$controller_;
                        spModal = _spModal_;
                    }));

                    function createController() {
                        return $controller('AlertDefinitionActionColumnDirectiveCtrl', {
                            alertDefinitionService: alertDefinitionService,
                            AlertDefinition: AlertDefinition,
                            spModal: spModal
                        });
                    }

                    describe('showDeleteModal', function () {

                        it('should call spModal service', function () {
                            var ctrl = createController(),
                                item = createAlertDefinition();

                            spyOn(ctrl.spModal, 'open');
                            ctrl.showDeleteModal(item);
                            expect(ctrl.spModal.open).toHaveBeenCalled();
                        });
                    });

                    describe('showDetails', function () {
                        it('should change state', function () {
                            var ctrl = createController(),
                                item = createAlertDefinition();

                            spyOn(ctrl.$state, 'go');
                            ctrl.showDetails(item);
                            expect(ctrl.$state.go).toHaveBeenCalledWith('alertDefinition', { alertDefinitionId: '1' });
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L0FsZXJ0RGVmaW5pdGlvbkFjdGlvbkNvbHVtbkRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQkFBcUIsdUJBQXVCLFVBQVUsU0FBUzs7Ozs7SUFLdkc7O0lBRUEsSUFBSSxhQUFhO0lBQ2pCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1CQUFtQjtZQUN6RSxjQUFjLGtCQUFrQjtXQUNqQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQUw3QixTQUFTLGlDQUFpQyxZQUFNOztnQkFFNUMsSUFBSSxrQkFBZTtvQkFBRSwwQkFBdUI7O2dCQUU1QyxXQUFXLE9BQU8sYUFBYTs7Z0JBRS9CLFdBQVcsT0FBTyxVQUFDLG1CQUFtQiwyQkFBOEI7b0JBQ2hFLGtCQUFrQjtvQkFDbEIsMEJBQTBCOzs7Z0JBRzlCLFNBQVMsd0JBQXdCO29CQUM3QixPQUFPLElBQUksZ0JBQWdCLHdCQUF3Qjs7O2dCQUd2RCxTQUFTLDRDQUE0QyxZQUFNOztvQkFFdkQsSUFBSSx5QkFBc0I7d0JBQUUsY0FBVzt3QkFBRSxVQUFPOztvQkFFaEQsV0FBVyxPQUFPLFVBQUMsZUFBZSwwQkFBMEIsV0FBYzt3QkFDdEUseUJBQXlCO3dCQUN6QixjQUFjO3dCQUNkLFVBQVU7OztvQkFHZCxTQUFTLG1CQUFtQjt3QkFDeEIsT0FBTyxZQUFZLDRDQUE0Qzs0QkFDM0Qsd0JBQXdCOzRCQUN4QixpQkFBaUI7NEJBQ2pCLFNBQVM7Ozs7b0JBS2pCLFNBQVMsbUJBQW1CLFlBQU07O3dCQUU5QixHQUFHLCtCQUErQixZQUFNOzRCQUNwQyxJQUFJLE9BQU87Z0NBQ1YsT0FBTzs7NEJBRVIsTUFBTSxLQUFLLFNBQVM7NEJBQ3BCLEtBQUssZ0JBQWdCOzRCQUNyQixPQUFPLEtBQUssUUFBUSxNQUFNOzs7O29CQUtsQyxTQUFTLGVBQWUsWUFBTTt3QkFDMUIsR0FBRyx1QkFBdUIsWUFBTTs0QkFDNUIsSUFBSSxPQUFPO2dDQUNYLE9BQU87OzRCQUVQLE1BQU0sS0FBSyxRQUFROzRCQUNuQixLQUFLLFlBQVk7NEJBQ2pCLE9BQU8sS0FBSyxPQUFPLElBQUkscUJBQXFCLG1CQUFtQixFQUFDLG1CQUFtQjs7Ozs7OztHQWVoRyIsImZpbGUiOiJhbGVydC9BbGVydERlZmluaXRpb25BY3Rpb25Db2x1bW5EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgKGMpIENvcHlyaWdodCAyMDA4IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBhbGVydE1vZHVsZSBmcm9tICdhbGVydC9BbGVydE1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnc3BBbGVydERlZmluaXRpb25BY3Rpb25Db2x1bW4nLCAoKSA9PiB7XG5cbiAgICBsZXQgQWxlcnREZWZpbml0aW9uLCBBbGVydERlZmluaXRpb25UZXN0RGF0YTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFsZXJ0TW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX0FsZXJ0RGVmaW5pdGlvbl8sIF9hbGVydERlZmluaXRpb25UZXN0RGF0YV8pID0+IHtcbiAgICAgICAgQWxlcnREZWZpbml0aW9uID0gX0FsZXJ0RGVmaW5pdGlvbl87XG4gICAgICAgIEFsZXJ0RGVmaW5pdGlvblRlc3REYXRhID0gX2FsZXJ0RGVmaW5pdGlvblRlc3REYXRhXztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVBbGVydERlZmluaXRpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQWxlcnREZWZpbml0aW9uKEFsZXJ0RGVmaW5pdGlvblRlc3REYXRhLkFMRVJUREVGMSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ0FsZXJ0RGVmaW5pdGlvbkFjdGlvbkNvbHVtbkRpcmVjdGl2ZUN0cmwnLCAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGFsZXJ0RGVmaW5pdGlvblNlcnZpY2UsICRjb250cm9sbGVyLCBzcE1vZGFsO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJGNvbnRyb2xsZXJfLCBfYWxlcnREZWZpbml0aW9uU2VydmljZV8sIF9zcE1vZGFsXykgPT4ge1xuICAgICAgICAgICAgYWxlcnREZWZpbml0aW9uU2VydmljZSA9IF9hbGVydERlZmluaXRpb25TZXJ2aWNlXztcbiAgICAgICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdBbGVydERlZmluaXRpb25BY3Rpb25Db2x1bW5EaXJlY3RpdmVDdHJsJywge1xuICAgICAgICAgICAgICAgIGFsZXJ0RGVmaW5pdGlvblNlcnZpY2U6IGFsZXJ0RGVmaW5pdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQWxlcnREZWZpbml0aW9uOiBBbGVydERlZmluaXRpb24sXG4gICAgICAgICAgICAgICAgc3BNb2RhbDogc3BNb2RhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGRlc2NyaWJlKCdzaG93RGVsZXRlTW9kYWwnLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgY2FsbCBzcE1vZGFsIHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVBbGVydERlZmluaXRpb24oKTtcblxuICAgICAgICAgICAgICAgIHNweU9uKGN0cmwuc3BNb2RhbCwgJ29wZW4nKTtcbiAgICAgICAgICAgICAgICBjdHJsLnNob3dEZWxldGVNb2RhbChpdGVtKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5zcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdzaG93RGV0YWlscycsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgY2hhbmdlIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVBbGVydERlZmluaXRpb24oKTtcblxuICAgICAgICAgICAgICAgIHNweU9uKGN0cmwuJHN0YXRlLCAnZ28nKTtcbiAgICAgICAgICAgICAgICBjdHJsLnNob3dEZXRhaWxzKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLiRzdGF0ZS5nbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2FsZXJ0RGVmaW5pdGlvbicsIHthbGVydERlZmluaXRpb25JZDogJzEnfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
