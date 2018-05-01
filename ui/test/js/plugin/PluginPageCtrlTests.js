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

            describe('PluginPageCtrl', function () {

                var pluginService = undefined,
                    testService = undefined,
                    $controller = undefined;

                beforeEach(module(pluginModule, testModule));

                beforeEach(inject(function (_pluginService_, _testService_, _$controller_) {
                    pluginService = _pluginService_;
                    testService = _testService_;
                    $controller = _$controller_;
                }));

                function createController() {
                    return $controller('PluginPageCtrl', {
                        pluginService: pluginService
                    });
                }

                it('should fetch plugins upon construction', function () {
                    spyOn(pluginService, 'getPlugins').and.returnValue(testService.createPromise(false, []));
                    createController();
                    expect(pluginService.getPlugins).toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbi9QbHVnaW5QYWdlQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQkFBMEIsdUJBQXVCLFVBQVUsU0FBUzs7O0lBRzVHOztJQUVBLElBQUksY0FBYztJQUNsQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsZUFBZSxzQkFBc0I7V0FDdEMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxrQkFBa0IsWUFBTTs7Z0JBRTdCLElBQUksZ0JBQWE7b0JBQUUsY0FBVztvQkFBRSxjQUFXOztnQkFFM0MsV0FBVyxPQUFPLGNBQWM7O2dCQUVoQyxXQUFXLE9BQU8sVUFBQyxpQkFBaUIsZUFBZSxlQUFrQjtvQkFDakUsZ0JBQWdCO29CQUNoQixjQUFjO29CQUNkLGNBQWM7OztnQkFHbEIsU0FBUyxtQkFBbUI7b0JBQ3hCLE9BQU8sWUFBWSxrQkFBa0I7d0JBQ2pDLGVBQWU7Ozs7Z0JBSXZCLEdBQUcsMENBQTBDLFlBQU07b0JBQy9DLE1BQU0sZUFBZSxjQUFjLElBQUksWUFBWSxZQUFZLGNBQWMsT0FBTztvQkFDcEY7b0JBQ0EsT0FBTyxjQUFjLFlBQVk7Ozs7O0dBZXRDIiwiZmlsZSI6InBsdWdpbi9QbHVnaW5QYWdlQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBsdWdpbk1vZHVsZSBmcm9tICdwbHVnaW4vUGx1Z2luTW9kdWxlLmpzJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdQbHVnaW5QYWdlQ3RybCcsICgpID0+IHtcblxuICAgIGxldCBwbHVnaW5TZXJ2aWNlLCB0ZXN0U2VydmljZSwgJGNvbnRyb2xsZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwbHVnaW5Nb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfcGx1Z2luU2VydmljZV8sIF90ZXN0U2VydmljZV8sIF8kY29udHJvbGxlcl8pID0+IHtcbiAgICAgICAgcGx1Z2luU2VydmljZSA9IF9wbHVnaW5TZXJ2aWNlXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdQbHVnaW5QYWdlQ3RybCcsIHtcbiAgICAgICAgICAgIHBsdWdpblNlcnZpY2U6IHBsdWdpblNlcnZpY2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXQoJ3Nob3VsZCBmZXRjaCBwbHVnaW5zIHVwb24gY29uc3RydWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihwbHVnaW5TZXJ2aWNlLCAnZ2V0UGx1Z2lucycpLmFuZC5yZXR1cm5WYWx1ZSh0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCBbXSkpO1xuICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgIGV4cGVjdChwbHVnaW5TZXJ2aWNlLmdldFBsdWdpbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
