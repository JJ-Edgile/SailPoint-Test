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

            describe('PluginService', function () {

                var pluginService = undefined,
                    Plugin = undefined,
                    testService = undefined,
                    $httpBackend = undefined,
                    Setting = undefined;

                beforeEach(module(pluginModule, testModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function (_pluginService_, _Plugin_, _testService_, _$httpBackend_, _Setting_) {
                    pluginService = _pluginService_;
                    Plugin = _Plugin_;
                    testService = _testService_;
                    $httpBackend = _$httpBackend_;
                    Setting = _Setting_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getPlugins', function () {

                    var response = {
                        count: 1,
                        objects: [{
                            id: '1',
                            name: 'TestPlugin',
                            displayName: 'Test Plugin'
                        }]
                    };

                    var PLUGINS_URL = '/identityiq/rest/plugins';

                    it('should make call to correct REST endpoint', function () {
                        var promise = undefined;

                        $httpBackend.expectGET(PLUGINS_URL).respond(200, response);

                        promise = pluginService.getPlugins();
                        expect(promise).toBeTruthy();

                        promise.then(function (result) {
                            expect(result.count).toEqual(1);
                            expect(result.objects.length).toEqual(1);
                            expect(result.objects[0].id).toEqual(response.objects[0].id);
                            expect(result.objects[0].name).toEqual(response.objects[0].name);
                            expect(result.objects[0].displayName).toEqual(response.objects[0].displayName);
                        });

                        $httpBackend.flush();
                    });

                    it('should transform the data to Plugin objects', function () {
                        var promise = undefined;

                        $httpBackend.expectGET(PLUGINS_URL).respond(200, response);

                        promise = pluginService.getPlugins();
                        expect(promise).toBeTruthy();

                        promise.then(function (result) {
                            expect(result.count).toEqual(1);
                            expect(result.objects.length).toEqual(1);
                            expect(result.objects[0] instanceof Plugin).toBe(true);
                        });

                        $httpBackend.flush();
                    });
                });

                describe('getPlugin', function () {

                    var pluginResponse = {
                        id: '1',
                        name: 'TestPlugin',
                        displayName: 'Test Plugin',
                        disabled: false,
                        settings: [{
                            name: 'stringTest1',
                            value: undefined,
                            defaultValue: 'default',
                            dataType: 'string'
                        }, {
                            name: 'stringTest2',
                            value: null,
                            defaultValue: 'default',
                            dataType: 'string'
                        }, {
                            name: 'stringTest3',
                            value: '',
                            defaultValue: 'default',
                            dataType: 'string'
                        }, {
                            name: 'stringTest4',
                            value: '123',
                            defaultValue: 'default',
                            dataType: 'string'
                        }, {
                            name: 'boolTest1',
                            value: null,
                            defaultValue: 'true',
                            dataType: 'boolean'
                        }, {
                            name: 'boolTest2',
                            value: false,
                            defaultValue: 'false',
                            dataType: 'boolean'
                        }, {
                            name: 'allowedValuesTest',
                            value: '1',
                            defaultValue: '1',
                            dataType: 'string',
                            allowedValues: ['one', 'two', 'three']
                        }]
                    };

                    var PLUGIN_URL = '/identityiq/rest/plugins/1';

                    it('should transform the data to a Plugin object', function () {
                        var promise = undefined;

                        $httpBackend.expectGET(PLUGIN_URL).respond(200, pluginResponse);

                        promise = pluginService.getPlugin(1);
                        expect(promise).toBeTruthy();

                        promise.then(function (result) {
                            expect(result instanceof Plugin).toBe(true);
                            expect(result.settings[0] instanceof Setting).toBe(true);
                        });

                        $httpBackend.flush();
                    });

                    it('should get a single plugin', function () {
                        var promise = undefined;

                        $httpBackend.expectGET(PLUGIN_URL).respond(200, pluginResponse);

                        promise = pluginService.getPlugin(1);
                        expect(promise).toBeTruthy();

                        promise.then(function (result) {
                            expect(result).not.toBe(null);
                            expect(result instanceof Plugin).toBe(true);
                        });

                        $httpBackend.flush();
                    });

                    it('should return with the proper setting values', function () {
                        var plugin = new Plugin(pluginResponse);

                        expect(plugin).not.toBe(null);
                        expect(plugin.settings[0].value).toBe('default');
                        expect(plugin.settings[1].value).toBe(null);
                        expect(plugin.settings[2].value).toBe('');
                        expect(plugin.settings[3].value).toBe('123');
                        expect(plugin.settings[4].value).toBe(true);
                        expect(plugin.settings[5].value).toBe(false);
                        expect(plugin.settings[6].value.id).toBe('1');
                    });

                    it('should accept a plugin id on the service', function () {

                        spyOn(pluginService, 'getPlugin');
                        pluginService.getPlugin(1);
                        expect(pluginService.getPlugin).toHaveBeenCalledWith(1);
                    });
                });

                describe('updateSettings', function () {
                    var settings = {
                        setting1: 'one',
                        setting2: 2,
                        setting3: false,
                        setting4: null
                    };

                    var PLUGIN_URL = '/identityiq/rest/plugins/1';

                    it('should accept a post on a plugin id', function () {
                        var promise = undefined;

                        $httpBackend.expectPOST(PLUGIN_URL).respond(200);
                        promise = pluginService.updateSettings(1, settings);
                        promise.then(function (response) {
                            //just make sure this resolves
                            expect(true).toBeTruthy();
                        });

                        $httpBackend.flush();
                    });

                    it('should accept a plugin id and setting on the service', function () {

                        spyOn(pluginService, 'updateSettings');
                        pluginService.updateSettings(1, settings);
                        expect(pluginService.updateSettings).toHaveBeenCalledWith(1, settings);
                    });
                });

                describe('togglePlugin', function () {

                    var PLUGIN_URL = '/identityiq/rest/plugins/1';

                    it('should accept a post on a toggle', function () {
                        var promise = undefined;

                        $httpBackend.expectPOST(PLUGIN_URL + '/toggle?disabled=true').respond(200);
                        promise = pluginService.togglePlugin(1, true);
                        promise.then(function (response) {
                            //just make sure this resolves
                            expect(true).toBeTruthy();
                        });

                        $httpBackend.flush();
                    });

                    it('should accept a plugin id toggle on the service', function () {

                        spyOn(pluginService, 'togglePlugin');
                        pluginService.togglePlugin(1, false);
                        expect(pluginService.togglePlugin).toHaveBeenCalledWith(1, false);
                    });
                });

                describe('uninstall plugin', function () {

                    var PLUGIN_URL = '/identityiq/rest/plugins/1';

                    it('should accept a delete on a plugin id', function () {
                        var promise = undefined;

                        $httpBackend.expectDELETE(PLUGIN_URL).respond(200);
                        promise = pluginService.uninstallPlugin(1);
                        promise.then(function (response) {
                            //just make sure this resolves
                            expect(true).toBeTruthy();
                        });

                        $httpBackend.flush();
                    });

                    it('should reject a delete on a plugin id with an error', function () {
                        var promise = undefined;

                        $httpBackend.expectDELETE(PLUGIN_URL).respond(500);
                        promise = pluginService.uninstallPlugin(1);
                        promise.then(function (response) {
                            //should not get here
                            expect(false).toBeTruthy();
                        }, function (error) {
                            //just make sure this resolves
                            expect(true).toBeTruthy();
                        });

                        $httpBackend.flush();
                    });

                    it('should accept a delete on a plugin id with a 404 error', function () {
                        var promise = undefined;

                        $httpBackend.expectDELETE(PLUGIN_URL).respond(404);
                        promise = pluginService.uninstallPlugin(1);
                        promise.then(function (response) {
                            //should not get here
                            expect(false).toBeTruthy();
                        }, function (error) {
                            //expect a truthy value here
                            expect(true).toBeTruthy();
                        });

                        $httpBackend.flush();
                    });

                    it('should accept a plugin id on the service', function () {

                        spyOn(pluginService, 'uninstallPlugin');
                        pluginService.uninstallPlugin(1);
                        expect(pluginService.uninstallPlugin).toHaveBeenCalledWith(1);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbi9QbHVnaW5TZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBCQUEwQix1QkFBdUIsVUFBVSxTQUFTOzs7SUFHNUc7O0lBRUEsSUFBSSxjQUFjO0lBQ2xCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxlQUFlLHNCQUFzQjtXQUN0QyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQUw3QixTQUFTLGlCQUFpQixZQUFNOztnQkFFNUIsSUFBSSxnQkFBYTtvQkFBRSxTQUFNO29CQUFFLGNBQVc7b0JBQUUsZUFBWTtvQkFBRSxVQUFPOztnQkFFN0QsV0FBVyxPQUFPLGNBQWM7O2dCQUVoQyxXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1COzs7Z0JBR3pDLFdBQVcsT0FBTyxVQUFDLGlCQUFpQixVQUFVLGVBQWUsZ0JBQWdCLFdBQWM7b0JBQ3ZGLGdCQUFnQjtvQkFDaEIsU0FBUztvQkFDVCxjQUFjO29CQUNkLGVBQWU7b0JBQ2YsVUFBVTs7O2dCQUdkLFVBQVUsWUFBVztvQkFDakIsYUFBYTtvQkFDYixhQUFhOzs7Z0JBR2pCLFNBQVMsY0FBYyxZQUFNOztvQkFFekIsSUFBSSxXQUFXO3dCQUNYLE9BQU87d0JBQ1AsU0FBUyxDQUFDOzRCQUNOLElBQUk7NEJBQ0osTUFBTTs0QkFDTixhQUFhOzs7O29CQUlyQixJQUFNLGNBQWM7O29CQUVwQixHQUFHLDZDQUE2QyxZQUFNO3dCQUNsRCxJQUFJLFVBQU87O3dCQUVYLGFBQWEsVUFBVSxhQUFhLFFBQVEsS0FBSzs7d0JBRWpELFVBQVUsY0FBYzt3QkFDeEIsT0FBTyxTQUFTOzt3QkFFaEIsUUFBUSxLQUFLLFVBQUEsUUFBVTs0QkFDbkIsT0FBTyxPQUFPLE9BQU8sUUFBUTs0QkFDN0IsT0FBTyxPQUFPLFFB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QUksVUFBTzs7d0JBRVgsYUFBYSxhQUFhLFlBQVksUUFBUTt3QkFDOUMsVUFBVSxjQUFjLGdCQUFnQjt3QkFDeEMsUUFBUSxLQUFLLFVBQVMsVUFBVTs7NEJBRTVCLE9BQU8sT0FBTzsyQkFDZixVQUFTLE9BQU87OzRCQUVmLE9BQU8sTUFBTTs7O3dCQUlqQixhQUFhOzs7b0JBR2pCLEdBQUcsMERBQTBELFlBQU07d0JBQy9ELElBQUksVUFBTzs7d0JBRVgsYUFBYSxhQUFhLFlBQVksUUFBUTt3QkFDOUMsVUFBVSxjQUFjLGdCQUFnQjt3QkFDeEMsUUFBUSxLQUFLLFVBQVMsVUFBVTs7NEJBRTVCLE9BQU8sT0FBTzsyQkFDZixVQUFTLE9BQU87OzRCQUVmLE9BQU8sTUFBTTs7O3dCQUlqQixhQUFhOzs7b0JBR2pCLEdBQUcsNENBQTRDLFlBQU07O3dCQUVqRCxNQUFNLGVBQWU7d0JBQ3JCLGNBQWMsZ0JBQWdCO3dCQUM5QixPQUFPLGNBQWMsaUJBQWlCLHFCQUFxQjs7Ozs7O0dBQXBFIiwiZmlsZSI6InBsdWdpbi9QbHVnaW5TZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwbHVnaW5Nb2R1bGUgZnJvbSAncGx1Z2luL1BsdWdpbk1vZHVsZS5qcyc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnUGx1Z2luU2VydmljZScsICgpID0+IHtcblxuICAgIGxldCBwbHVnaW5TZXJ2aWNlLCBQbHVnaW4sIHRlc3RTZXJ2aWNlLCAkaHR0cEJhY2tlbmQsIFNldHRpbmc7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwbHVnaW5Nb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICB9KSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX3BsdWdpblNlcnZpY2VfLCBfUGx1Z2luXywgX3Rlc3RTZXJ2aWNlXywgXyRodHRwQmFja2VuZF8sIF9TZXR0aW5nXykgPT4ge1xuICAgICAgICBwbHVnaW5TZXJ2aWNlID0gX3BsdWdpblNlcnZpY2VfO1xuICAgICAgICBQbHVnaW4gPSBfUGx1Z2luXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgU2V0dGluZyA9IF9TZXR0aW5nXztcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UGx1Z2lucycsICgpID0+IHtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnVGVzdFBsdWdpbicsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdUZXN0IFBsdWdpbidcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgUExVR0lOU19VUkwgPSAnL2lkZW50aXR5aXEvcmVzdC9wbHVnaW5zJztcblxuICAgICAgICBpdCgnc2hvdWxkIG1ha2UgY2FsbCB0byBjb3JyZWN0IFJFU1QgZW5kcG9pbnQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvbWlzZTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChQTFVHSU5TX1VSTCkucmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgcHJvbWlzZSA9IHBsdWdpblNlcnZpY2UuZ2V0UGx1Z2lucygpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2UpLnRvQmVUcnV0aHkoKTtcblxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5jb3VudCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzdWx0Lm9iamVjdHMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQub2JqZWN0c1swXS5pZCkudG9FcXVhbChyZXNwb25zZS5vYmplY3RzWzBdLmlkKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzdWx0Lm9iamVjdHNbMF0ubmFtZSkudG9FcXVhbChyZXNwb25zZS5vYmplY3RzWzBdLm5hbWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQub2JqZWN0c1swXS5kaXNwbGF5TmFtZSkudG9FcXVhbChyZXNwb25zZS5vYmplY3RzWzBdLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0cmFuc2Zvcm0gdGhlIGRhdGEgdG8gUGx1Z2luIG9iamVjdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvbWlzZTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChQTFVHSU5TX1VSTCkucmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgcHJvbWlzZSA9IHBsdWdpblNlcnZpY2UuZ2V0UGx1Z2lucygpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2UpLnRvQmVUcnV0aHkoKTtcblxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5jb3VudCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzdWx0Lm9iamVjdHMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQub2JqZWN0c1swXSBpbnN0YW5jZW9mIFBsdWdpbikudG9CZSh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UGx1Z2luJywgKCkgPT4ge1xuXG4gICAgICAgIGxldCBwbHVnaW5SZXNwb25zZSA9IHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBuYW1lOiAnVGVzdFBsdWdpbicsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1Rlc3QgUGx1Z2luJyxcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHNldHRpbmdzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc3RyaW5nVGVzdDEnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzdHJpbmdUZXN0MicsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzdHJpbmdUZXN0MycsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc3RyaW5nVGVzdDQnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJzEyMycsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogJ2RlZmF1bHQnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2Jvb2xUZXN0MScsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6ICd0cnVlJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdib29sZWFuJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnYm9vbFRlc3QyJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6ICdmYWxzZScsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnYm9vbGVhbidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2FsbG93ZWRWYWx1ZXNUZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcxJyxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiAnMScsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZFZhbHVlcyA6IFsnb25lJywgJ3R3bycsICd0aHJlZSddXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IFBMVUdJTl9VUkwgPSAnL2lkZW50aXR5aXEvcmVzdC9wbHVnaW5zLzEnO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdHJhbnNmb3JtIHRoZSBkYXRhIHRvIGEgUGx1Z2luIG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9taXNlO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKFBMVUdJTl9VUkwpLnJlc3BvbmQoMjAwLCBwbHVnaW5SZXNwb25zZSk7XG5cbiAgICAgICAgICAgIHByb21pc2UgPSBwbHVnaW5TZXJ2aWNlLmdldFBsdWdpbigxKTtcbiAgICAgICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XG5cbiAgICAgICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQgaW5zdGFuY2VvZiBQbHVnaW4pLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5zZXR0aW5nc1swXSBpbnN0YW5jZW9mIFNldHRpbmcpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZ2V0IGEgc2luZ2xlIHBsdWdpbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9taXNlO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKFBMVUdJTl9VUkwpLnJlc3BvbmQoMjAwLCBwbHVnaW5SZXNwb25zZSk7XG5cbiAgICAgICAgICAgIHByb21pc2UgPSBwbHVnaW5TZXJ2aWNlLmdldFBsdWdpbigxKTtcbiAgICAgICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XG5cbiAgICAgICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQgaW5zdGFuY2VvZiBQbHVnaW4pLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHdpdGggdGhlIHByb3BlciBzZXR0aW5nIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwbHVnaW4gPSBuZXcgUGx1Z2luKHBsdWdpblJlc3BvbnNlKTtcblxuICAgICAgICAgICAgZXhwZWN0KHBsdWdpbikubm90LnRvQmUobnVsbCk7XG4gICAgICAgICAgICBleHBlY3QocGx1Z2luLnNldHRpbmdzWzBdLnZhbHVlKS50b0JlKCdkZWZhdWx0Jyk7XG4gICAgICAgICAgICBleHBlY3QocGx1Z2luLnNldHRpbmdzWzFdLnZhbHVlKS50b0JlKG51bGwpO1xuICAgICAgICAgICAgZXhwZWN0KHBsdWdpbi5zZXR0aW5nc1syXS52YWx1ZSkudG9CZSgnJyk7XG4gICAgICAgICAgICBleHBlY3QocGx1Z2luLnNldHRpbmdzWzNdLnZhbHVlKS50b0JlKCcxMjMnKTtcbiAgICAgICAgICAgIGV4cGVjdChwbHVnaW4uc2V0dGluZ3NbNF0udmFsdWUpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QocGx1Z2luLnNldHRpbmdzWzVdLnZhbHVlKS50b0JlKGZhbHNlKTtcbiAgICAgICAgICAgIGV4cGVjdChwbHVnaW4uc2V0dGluZ3NbNl0udmFsdWUuaWQpLnRvQmUoJzEnKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGFjY2VwdCBhIHBsdWdpbiBpZCBvbiB0aGUgc2VydmljZScsICgpID0+IHtcblxuICAgICAgICAgICAgc3B5T24ocGx1Z2luU2VydmljZSwgJ2dldFBsdWdpbicpO1xuICAgICAgICAgICAgcGx1Z2luU2VydmljZS5nZXRQbHVnaW4oMSk7XG4gICAgICAgICAgICBleHBlY3QocGx1Z2luU2VydmljZS5nZXRQbHVnaW4pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDEpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3VwZGF0ZVNldHRpbmdzJywgKCkgPT4ge1xuICAgICAgICBsZXQgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICBzZXR0aW5nMTogJ29uZScsXG4gICAgICAgICAgICBzZXR0aW5nMjogMixcbiAgICAgICAgICAgIHNldHRpbmczOiBmYWxzZSxcbiAgICAgICAgICAgIHNldHRpbmc0OiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgUExVR0lOX1VSTCA9ICcvaWRlbnRpdHlpcS9yZXN0L3BsdWdpbnMvMSc7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhY2NlcHQgYSBwb3N0IG9uIGEgcGx1Z2luIGlkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHByb21pc2U7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKFBMVUdJTl9VUkwpLnJlc3BvbmQoMjAwKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwbHVnaW5TZXJ2aWNlLnVwZGF0ZVNldHRpbmdzKDEsIHNldHRpbmdzKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vanVzdCBtYWtlIHN1cmUgdGhpcyByZXNvbHZlc1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0cnVlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhY2NlcHQgYSBwbHVnaW4gaWQgYW5kIHNldHRpbmcgb24gdGhlIHNlcnZpY2UnLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIHNweU9uKHBsdWdpblNlcnZpY2UsICd1cGRhdGVTZXR0aW5ncycpO1xuICAgICAgICAgICAgcGx1Z2luU2VydmljZS51cGRhdGVTZXR0aW5ncygxLCBzZXR0aW5ncyk7XG4gICAgICAgICAgICBleHBlY3QocGx1Z2luU2VydmljZS51cGRhdGVTZXR0aW5ncykudG9IYXZlQmVlbkNhbGxlZFdpdGgoMSwgc2V0dGluZ3MpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RvZ2dsZVBsdWdpbicsICgpID0+IHtcblxuICAgICAgICBjb25zdCBQTFVHSU5fVVJMID0gJy9pZGVudGl0eWlxL3Jlc3QvcGx1Z2lucy8xJztcblxuICAgICAgICBpdCgnc2hvdWxkIGFjY2VwdCBhIHBvc3Qgb24gYSB0b2dnbGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvbWlzZTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoUExVR0lOX1VSTCArICcvdG9nZ2xlP2Rpc2FibGVkPXRydWUnKS5yZXNwb25kKDIwMCk7XG4gICAgICAgICAgICBwcm9taXNlID0gcGx1Z2luU2VydmljZS50b2dnbGVQbHVnaW4oMSwgdHJ1ZSk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAvL2p1c3QgbWFrZSBzdXJlIHRoaXMgcmVzb2x2ZXNcbiAgICAgICAgICAgICAgICBleHBlY3QodHJ1ZSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWNjZXB0IGEgcGx1Z2luIGlkIHRvZ2dsZSBvbiB0aGUgc2VydmljZScsICgpID0+IHtcblxuICAgICAgICAgICAgc3B5T24ocGx1Z2luU2VydmljZSwgJ3RvZ2dsZVBsdWdpbicpO1xuICAgICAgICAgICAgcGx1Z2luU2VydmljZS50b2dnbGVQbHVnaW4oMSwgZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KHBsdWdpblNlcnZpY2UudG9nZ2xlUGx1Z2luKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgxLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndW5pbnN0YWxsIHBsdWdpbicsICgpID0+IHtcblxuICAgICAgICBjb25zdCBQTFVHSU5fVVJMID0gJy9pZGVudGl0eWlxL3Jlc3QvcGx1Z2lucy8xJztcblxuICAgICAgICBpdCgnc2hvdWxkIGFjY2VwdCBhIGRlbGV0ZSBvbiBhIHBsdWdpbiBpZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9taXNlO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0REVMRVRFKFBMVUdJTl9VUkwpLnJlc3BvbmQoMjAwKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwbHVnaW5TZXJ2aWNlLnVuaW5zdGFsbFBsdWdpbigxKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vanVzdCBtYWtlIHN1cmUgdGhpcyByZXNvbHZlc1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0cnVlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZWplY3QgYSBkZWxldGUgb24gYSBwbHVnaW4gaWQgd2l0aCBhbiBlcnJvcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9taXNlO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0REVMRVRFKFBMVUdJTl9VUkwpLnJlc3BvbmQoNTAwKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwbHVnaW5TZXJ2aWNlLnVuaW5zdGFsbFBsdWdpbigxKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vc2hvdWxkIG5vdCBnZXQgaGVyZVxuICAgICAgICAgICAgICAgIGV4cGVjdChmYWxzZSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvL2p1c3QgbWFrZSBzdXJlIHRoaXMgcmVzb2x2ZXNcbiAgICAgICAgICAgICAgICBleHBlY3QodHJ1ZSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWNjZXB0IGEgZGVsZXRlIG9uIGEgcGx1Z2luIGlkIHdpdGggYSA0MDQgZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvbWlzZTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdERFTEVURShQTFVHSU5fVVJMKS5yZXNwb25kKDQwNCk7XG4gICAgICAgICAgICBwcm9taXNlID0gcGx1Z2luU2VydmljZS51bmluc3RhbGxQbHVnaW4oMSk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAvL3Nob3VsZCBub3QgZ2V0IGhlcmVcbiAgICAgICAgICAgICAgICBleHBlY3QoZmFsc2UpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgIC8vZXhwZWN0IGEgdHJ1dGh5IHZhbHVlIGhlcmVcbiAgICAgICAgICAgICAgICBleHBlY3QodHJ1ZSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWNjZXB0IGEgcGx1Z2luIGlkIG9uIHRoZSBzZXJ2aWNlJywgKCkgPT4ge1xuXG4gICAgICAgICAgICBzcHlPbihwbHVnaW5TZXJ2aWNlLCAndW5pbnN0YWxsUGx1Z2luJyk7XG4gICAgICAgICAgICBwbHVnaW5TZXJ2aWNlLnVuaW5zdGFsbFBsdWdpbigxKTtcbiAgICAgICAgICAgIGV4cGVjdChwbHVnaW5TZXJ2aWNlLnVuaW5zdGFsbFBsdWdpbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
