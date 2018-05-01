System.register(['test/js/TestInitializer', 'plugin/PluginModule.js', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var pluginModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pluginPluginModuleJs) {
            pluginModule = _pluginPluginModuleJs['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('PluginConfigurationPageCtrl', function () {

                var pluginService = undefined,
                    testService = undefined,
                    $controller = undefined,
                    $stateParams = undefined,
                    ctrl = undefined,
                    spModal = undefined,
                    $q = undefined,
                    $scope = undefined,
                    dummyPlugin = {
                    settings: [{
                        name: 'setting1',
                        value: 1
                    }]
                },
                    dummyForm = {
                    setting1: 1
                },
                    fake404 = {
                    status: 404
                };

                beforeEach(module(pluginModule, testModule));

                beforeEach(inject(function (_$rootScope_, _pluginService_, _testService_, _$controller_, _spModal_, _$q_) {
                    $scope = _$rootScope_;
                    pluginService = _pluginService_;
                    testService = _testService_;
                    $controller = _$controller_;
                    spModal = _spModal_;
                    $q = _$q_;
                    $stateParams = {
                        pluginId: '123fakeId',
                        pluginDisplayName: '123 fake plugin'
                    };
                }));

                function createController() {
                    return $controller('PluginConfigurationPageCtrl', {
                        pluginService: pluginService,
                        $stateParams: $stateParams,
                        spModal: spModal
                    });
                }

                it('should fetch plugin upon construction', function () {
                    spyOn(pluginService, 'getPlugin').and.returnValue(testService.createPromise(false, []));
                    createController();
                    expect(pluginService.getPlugin).toHaveBeenCalled();
                });

                it('should have called the save on the service', function () {
                    spyOn(pluginService, 'updateSettings').and.returnValue(testService.createPromise(false, []));
                    ctrl = createController();
                    ctrl.plugin = dummyPlugin;
                    ctrl.form = dummyForm;
                    ctrl.onSave();
                    expect(pluginService.updateSettings).toHaveBeenCalled();
                });

                it('should pop up a modal if the get rejects', function () {
                    spyOn(pluginService, 'getPlugin').and.returnValue(testService.createPromise(true, [], fake404));
                    spyOn(spModal, 'open').and.returnValue({
                        result: $q.defer().promise
                    });
                    createController();
                    $scope.$apply();

                    expect(pluginService.getPlugin).toHaveBeenCalled();
                    expect(spModal.open).toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbi9QbHVnaW5Db25maWd1cmF0aW9uUGFnZUN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMEJBQTBCLHVCQUF1QixVQUFVLFNBQVM7OztJQUc1Rzs7SUFFQSxJQUFJLGNBQWM7SUFDbEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGVBQWUsc0JBQXNCO1dBQ3RDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsK0JBQStCLFlBQU07O2dCQUUxQyxJQUFJLGdCQUFhO29CQUFFLGNBQVc7b0JBQUUsY0FBVztvQkFBRSxlQUFZO29CQUFFLE9BQUk7b0JBQUUsVUFBTztvQkFBRSxLQUFFO29CQUFFLFNBQU07b0JBQ2hGLGNBQWM7b0JBQ1YsVUFBVSxDQUNOO3dCQUNJLE1BQU07d0JBQ04sT0FBTzs7O29CQUluQixZQUFZO29CQUNSLFVBQVU7O29CQUVkLFVBQVU7b0JBQ04sUUFBUTs7O2dCQUdoQixXQUFXLE9BQU8sY0FBYzs7Z0JBRWhDLFdBQVcsT0FBTyxVQUFDLGNBQWMsaUJBQWlCLGVBQWUsZUFBZSxXQUFXLE1BQVM7b0JBQ2hHLFNBQVM7b0JBQ1QsZ0JBQWdCO29CQUNoQixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsVUFBVTtvQkFDVixLQUFLO29CQUNMLGVBQWU7d0JBQ1gsVUFBVTt3QkFDVixtQkFBbUI7Ozs7Z0JBSTNCLFNBQVMsbUJBQW1CO29CQUN4QixPQUFPLFlBQVksK0JBQStCO3dCQUM5QyxlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsU0FBUzs7OztnQkFJakIsR0FBRyx5Q0FBeUMsWUFBTTtvQkFDOUMsTUFBTSxlQUFlLGFBQWEsSUFBSSxZQUFZLFlBQVksY0FBYyxPQUFPO29CQUNuRjtvQkFDQSxPQUFPLGNBQWMsV0FBVzs7O2dCQUdwQyxHQUFHLDhDQUE4QyxZQUFNO29CQUNuRCxNQUFNLGVBQWUsa0JBQWtCLElBQUksWUFBWSxZQUFZLGNBQWMsT0FBTztvQkFDeEYsT0FBTztvQkFDUCxLQUFLLFNBQVM7b0JBQ2QsS0FBSyxPQUFPO29CQUNaLEtBQUs7b0JBQ0wsT0FBTyxjQUFjLGdCQUFnQjs7O2dCQUd6QyxHQUFHLDRDQUE0QyxZQUFNO29CQUNqRCxNQUFNLGVBQWUsYUFBYSxJQUFJLFlBQVksWUFBWSxjQUFjLE1BQU0sSUFBSTtvQkFDdEYsTUFBTSxTQUFTLFFBQVEsSUFBSSxZQUFZO3dCQUNuQyxRQUFRLEdBQUcsUUFBUTs7b0JBRXZCO29CQUNBLE9BQU87O29CQUVQLE9BQU8sY0FBYyxXQUFXO29CQUNoQyxPQUFPLFFBQVEsTUFBTTs7Ozs7R0FrQjFCIiwiZmlsZSI6InBsdWdpbi9QbHVnaW5Db25maWd1cmF0aW9uUGFnZUN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwbHVnaW5Nb2R1bGUgZnJvbSAncGx1Z2luL1BsdWdpbk1vZHVsZS5qcyc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnUGx1Z2luQ29uZmlndXJhdGlvblBhZ2VDdHJsJywgKCkgPT4ge1xuXG4gICAgbGV0IHBsdWdpblNlcnZpY2UsIHRlc3RTZXJ2aWNlLCAkY29udHJvbGxlciwgJHN0YXRlUGFyYW1zLCBjdHJsLCBzcE1vZGFsLCAkcSwgJHNjb3BlLFxuICAgICAgICBkdW1teVBsdWdpbiA9IHtcbiAgICAgICAgICAgIHNldHRpbmdzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc2V0dGluZzEnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgZHVtbXlGb3JtID0ge1xuICAgICAgICAgICAgc2V0dGluZzE6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZmFrZTQwNCA9IHtcbiAgICAgICAgICAgIHN0YXR1czogNDA0XG4gICAgICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwbHVnaW5Nb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJHJvb3RTY29wZV8sIF9wbHVnaW5TZXJ2aWNlXywgX3Rlc3RTZXJ2aWNlXywgXyRjb250cm9sbGVyXywgX3NwTW9kYWxfLCBfJHFfKSA9PiB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgcGx1Z2luU2VydmljZSA9IF9wbHVnaW5TZXJ2aWNlXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgJHN0YXRlUGFyYW1zID0ge1xuICAgICAgICAgICAgcGx1Z2luSWQ6ICcxMjNmYWtlSWQnLFxuICAgICAgICAgICAgcGx1Z2luRGlzcGxheU5hbWU6ICcxMjMgZmFrZSBwbHVnaW4nXG4gICAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdQbHVnaW5Db25maWd1cmF0aW9uUGFnZUN0cmwnLCB7XG4gICAgICAgICAgICBwbHVnaW5TZXJ2aWNlOiBwbHVnaW5TZXJ2aWNlLFxuICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiAkc3RhdGVQYXJhbXMsXG4gICAgICAgICAgICBzcE1vZGFsOiBzcE1vZGFsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGl0KCdzaG91bGQgZmV0Y2ggcGx1Z2luIHVwb24gY29uc3RydWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihwbHVnaW5TZXJ2aWNlLCAnZ2V0UGx1Z2luJykuYW5kLnJldHVyblZhbHVlKHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIFtdKSk7XG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgZXhwZWN0KHBsdWdpblNlcnZpY2UuZ2V0UGx1Z2luKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgY2FsbGVkIHRoZSBzYXZlIG9uIHRoZSBzZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihwbHVnaW5TZXJ2aWNlLCAndXBkYXRlU2V0dGluZ3MnKS5hbmQucmV0dXJuVmFsdWUodGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgW10pKTtcbiAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgY3RybC5wbHVnaW4gPSBkdW1teVBsdWdpbjtcbiAgICAgICAgY3RybC5mb3JtID0gZHVtbXlGb3JtO1xuICAgICAgICBjdHJsLm9uU2F2ZSgpO1xuICAgICAgICBleHBlY3QocGx1Z2luU2VydmljZS51cGRhdGVTZXR0aW5ncykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBwb3AgdXAgYSBtb2RhbCBpZiB0aGUgZ2V0IHJlamVjdHMnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKHBsdWdpblNlcnZpY2UsICdnZXRQbHVnaW4nKS5hbmQucmV0dXJuVmFsdWUodGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZSh0cnVlLCBbXSwgZmFrZTQwNCkpO1xuICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7XG4gICAgICAgICAgICByZXN1bHQ6ICRxLmRlZmVyKCkucHJvbWlzZVxuICAgICAgICB9KTtcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgZXhwZWN0KHBsdWdpblNlcnZpY2UuZ2V0UGx1Z2luKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
