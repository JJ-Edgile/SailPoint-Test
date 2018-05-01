System.register(['test/js/TestInitializer', 'common/config/ConfigModule'], function (_export) {
    'use strict';

    var configModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonConfigConfigModule) {
            configModule = _commonConfigConfigModule['default'];
        }],
        execute: function () {

            describe('ConfigService', function () {
                var http, configService, contextPath, $rootScope, ColumnConfig, configServiceConst, tablePreferencesService;

                beforeEach(module(configModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                /* jshint maxparams: 7 */
                beforeEach(inject(function ($httpBackend, _configService_, _$rootScope_, SP_CONTEXT_PATH, _ColumnConfig_, SP_CONFIG_SERVICE, _tablePreferencesService_) {
                    http = $httpBackend;
                    configService = _configService_;
                    $rootScope = _$rootScope_;
                    contextPath = SP_CONTEXT_PATH;
                    configServiceConst = SP_CONFIG_SERVICE;
                    ColumnConfig = _ColumnConfig_;
                    tablePreferencesService = _tablePreferencesService_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                var getConfigEntry = function (keys) {
                    var i,
                        obj = {};
                    for (i = 0; i < keys.length; i++) {
                        obj[keys[i]] = [new ColumnConfig({
                            'dataIndex': 'foo',
                            'label': 'Foo Bar'
                        })];
                    }
                    return obj;
                };

                var getIdentityDetails = function () {
                    return [{
                        'attribute': 'name',
                        'label': 'User Name'
                    }, {
                        'attribute': 'firstname',
                        'label': 'First Name'
                    }, {
                        'attribute': 'lastname',
                        'label': 'Last Name'
                    }, {
                        'attribute': 'email',
                        'label': 'Email'
                    }, {
                        'attribute': 'manager',
                        'label': 'Manager'
                    }];
                };

                /**
                 * Test getIdentityDetailsConfig
                 */
                describe('getIdentityDetailsConfig', function () {

                    /**
                     * Should return X many entries for the first time
                     */
                    it('returns all the identity detail config entries', function () {
                        var tmp,
                            configUrl = contextPath + '/ui/rest/configuration/uiconfig/identity';

                        // First check if endpoint returns 200
                        http.expectGET(configUrl).respond(200, getIdentityDetails());

                        configService.getIdentityDetailsConfig().then(function (result) {
                            tmp = result.data;
                        });

                        http.flush();

                        expect(tmp.length).toEqual(5);
                    });

                    /**
                     * Should return X many entries for the second time pulling from cache
                     */
                    it('returns all the identity detail config entries from cache', function () {
                        var tmp,
                            configUrl = contextPath + '/ui/rest/configuration/uiconfig/identity';

                        // First check if endpoint returns 200
                        http.expectGET(configUrl).respond(200, getIdentityDetails());

                        configService.getIdentityDetailsConfig().then(function (result) {
                            tmp = result.data;
                        });

                        http.flush();

                        expect(tmp.length).toEqual(5);

                        tmp = null;

                        configService.getIdentityDetailsConfig().then(function (result) {
                            tmp = result.data;
                        });

                        // Digest to get the promise resolved.
                        $rootScope.$apply();

                        expect(tmp.length).toEqual(5);
                    });
                });

                describe('table preferences', function () {
                    it('should get table column preferences from backend', function () {
                        var tableId = 'testTableId';

                        spyOn(tablePreferencesService, 'getTablePreferences');

                        configService.getTablePreferences(tableId);

                        expect(tablePreferencesService.getTablePreferences).toHaveBeenCalledWith(tableId);
                    });
                });

                /**
                 * Test getting all the config entries.
                 */
                describe('getColumnConfigEntries', function () {
                    /**
                     * Should return X many entries
                     */
                    it('returns all the config entries', function () {
                        var tmp,
                            configUrl = contextPath + '/ui/rest/configuration/uiconfig/entries';

                        // Mock the response from configUrl and return an array of two entries
                        http.expectGET(configUrl).respond(200, getConfigEntry(['key1', 'key2']));

                        configService.getColumnConfigEntries().then(function (result) {
                            tmp = result.data;
                        });

                        http.flush();

                        expect(Object.keys(tmp).length).toBe(2);
                        expect(tmp.key1).toBeDefined();
                        expect(tmp.key2).toBeDefined();
                        expect(tmp.key3).not.toBeDefined();
                    });

                    /**
                     * Return config entry by keys. two good keys with one bad key
                     */
                    it('returns config entries by key', function () {
                        var tmp,
                            configUrl = contextPath + '/ui/rest/configuration/uiconfig/entries?key=key1&key=key2&key=key3';

                        // Mock the response from configUrl and return an array of two entries
                        http.expectGET(configUrl).respond(200, getConfigEntry(['key1', 'key2']));

                        configService.getColumnConfigEntries(['key1', 'key2', 'key3']).then(function (result) {
                            tmp = result.data;
                        });

                        http.flush();

                        expect(Object.keys(tmp).length).toBe(2);
                        expect(tmp.key1).toBeDefined();
                        expect(tmp.key2).toBeDefined();
                        expect(tmp.key3).not.toBeDefined();
                    });

                    /**
                     * Return config entry by keys from the cache
                     */
                    it('returns config entries from cache', function () {
                        var tmp,
                            configUrl = contextPath + '/ui/rest/configuration/uiconfig/entries?key=key1&key=key2';

                        // Mock the response from configUrl and return an array of two entries
                        http.expectGET(configUrl).respond(200, getConfigEntry(['key1', 'key2']));

                        // First call will get the entry from the REST resource
                        configService.getColumnConfigEntries(['key1', 'key2']).then(function (result) {
                            tmp = result.data;
                        });

                        http.flush();

                        expect(Object.keys(tmp).length).toBe(2);
                        expect(tmp.key1).toBeDefined();
                        expect(tmp.key2).toBeDefined();
                        expect(tmp.key3).not.toBeDefined();

                        tmp = null;

                        // Second call should get it from the cache
                        configService.getColumnConfigEntries(['key1', 'key2']).then(function (result) {
                            tmp = result.data;
                        });

                        // Digest to get the promise resolved.
                        $rootScope.$apply();

                        expect(Object.keys(tmp).length).toBe(2);
                        expect(tmp.key1).toBeDefined();
                        expect(tmp.key2).toBeDefined();
                        expect(tmp.key3).not.toBeDefined();
                    });

                    /**
                     * Ensure returned entries are of appropriate type
                     */
                    it('returns entries of type ColumnConfig', function () {
                        var tmp,
                            configUrl = contextPath + '/ui/rest/configuration/uiconfig/entries?key=key1';

                        // Mock the response from configUrl and return an array of two entries
                        http.expectGET(configUrl).respond(200, getConfigEntry(['key1']));

                        // First call will get the entry from the REST resource
                        configService.getColumnConfigEntries(['key1']).then(function (result) {
                            tmp = result.data;
                        });

                        http.flush();

                        expect(Object.keys(tmp).length).toBe(1);

                        expect(tmp.key1[0].getDataIndex()).toBe('foo');
                        expect(tmp.key1[0].getLabel()).toBe('Foo Bar');
                        expect(tmp.key1[0].isFieldOnly()).toBe(false);

                        expect(tmp.key2).not.toBeDefined();
                    });
                });

                describe('config value', function () {

                    // Setup the dependencies.
                    beforeEach(function () {
                        SailPoint.configData[configServiceConst.ACCESS_REQUEST_MAX_IDENTITY_SELECT] = 2;
                    });

                    it('pukes if registering a value with no key', function () {
                        expect(function () {
                            configService.registerConfigValue(null, 'boom');
                        }).toThrow();
                    });

                    it('returns a value if it has been registered', function () {
                        var key = 'geddy',
                            value = 'lee';
                        configService.registerConfigValue(key, value);
                        expect(configService.getConfigValue(key)).toEqual(value);
                    });

                    it('prefers registered values above SailPoint.configData', function () {
                        var key = configServiceConst.ACCESS_REQUEST_MAX_IDENTITY_SELECT,
                            value = 99;
                        configService.registerConfigValue(key, value);
                        expect(configService.getConfigValue(key)).toEqual(value);
                    });

                    it('returns a value if it is defined in SailPoint.configData', function () {
                        expect(configService.getConfigValue(configServiceConst.ACCESS_REQUEST_MAX_IDENTITY_SELECT)).toBe(2);
                    });

                    it('returns null if it is not defined in SailPoint.configData', function () {
                        expect(configService.getConfigValue('BLAHBLAHBLAH')).toBeNull();
                    });
                });

                describe('column config', function () {
                    var colCfgArray;

                    beforeEach(function () {
                        colCfgArray = [{
                            dataIndex: '12345'
                        }];
                    });

                    it('pukes if registering with null key', function () {
                        expect(function () {
                            configService.registerColumnConfig(null, colCfgArray);
                        }).toThrow();
                    });

                    it('pukes if registering with null column config array', function () {
                        expect(function () {
                            configService.registerColumnConfig('key', null);
                        }).toThrow();
                    });

                    it('pukes if registering with a non-array column config', function () {
                        expect(function () {
                            configService.registerColumnConfig('key', 'not an array');
                        }).toThrow();
                    });

                    it('returns undefined from getColumnConfig() for an unregistered config', function () {
                        var cfg = configService.getColumnConfig('not there');
                        expect(cfg).toBeUndefined();
                    });

                    it('registers a column config', function () {
                        var key = 'key',
                            cfg;
                        configService.registerColumnConfig(key, colCfgArray);
                        cfg = configService.getColumnConfig(key);
                        expect(cfg).not.toBeNull();
                        expect(cfg.length).toEqual(1);
                        expect(cfg[0] instanceof ColumnConfig).toEqual(true);
                        expect(cfg[0].dataIndex).toEqual(colCfgArray[0].dataIndex);
                    });
                });

                describe('isMobile()', function () {
                    it('returns the appropriate config value for the isMobile key', function () {
                        SailPoint.configData[configServiceConst.IS_MOBILE] = true;
                        expect(configService.isMobile()).toEqual(true);
                        SailPoint.configData[configServiceConst.IS_MOBILE] = false;
                        expect(configService.isMobile()).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9jb25maWcvQ29uZmlnU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwrQkFBK0IsVUFBVSxTQUFTO0lBQTlGOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwyQkFBMkI7WUFDakYsZUFBZSwwQkFBMEI7O1FBRTdDLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyxpQkFBaUIsWUFBVztnQkFDakMsSUFBSSxNQUFNLGVBQWUsYUFBYSxZQUFZLGNBQWMsb0JBQW9COztnQkFFcEYsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLG1CQUFtQjs7OztnQkFJekMsV0FBVyxPQUFPLFVBQVMsY0FBYyxpQkFBaUIsY0FBYyxpQkFBaUIsZ0JBQzlELG1CQUFtQiwyQkFBMkI7b0JBQ3JFLE9BQU87b0JBQ1AsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLGNBQWM7b0JBQ2QscUJBQXFCO29CQUNyQixlQUFlO29CQUNmLDBCQUEwQjs7O2dCQUc5QixVQUFVLFlBQVc7b0JBQ2pCLEtBQUs7b0JBQ0wsS0FBSzs7O2dCQUdULElBQUksaUJBQWlCLFVBQVMsTUFBTTtvQkFDaEMsSUFBSTt3QkFBRyxNQUFNO29CQUNiLEtBQUssSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLEtBQUs7d0JBQzlCLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxhQUFhOzRCQUM3QixhQUFhOzRCQUNiLFNBQVM7OztvQkFHakIsT0FBTzs7O2dCQUdYLElBQUkscUJBQXFCLFlBQVc7b0JBQ2hDLE9BQVEsQ0FDSjt3QkFDSSxhQUFhO3dCQUNiLFNBQVM7dUJBRWI7d0JBQ0ksYUFBYTt3QkFDYixTQUFTO3VCQUViO3dCQUNJLGFBQWE7d0JBQ2IsU0FBUzt1QkFFYjt3QkFDSSxhQUFhO3dCQUNiLFNBQVM7dUJBRWI7d0JBQ0ks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V0FBVzs7OztvQkFJbkIsR0FBRyxzQ0FBc0MsWUFBVzt3QkFDaEQsT0FBTyxZQUFXOzRCQUFFLGNBQWMscUJBQXFCLE1BQU07MkJBQWlCOzs7b0JBR2xGLEdBQUcsc0RBQXNELFlBQVc7d0JBQ2hFLE9BQU8sWUFBVzs0QkFBRSxjQUFjLHFCQUFxQixPQUFPOzJCQUFVOzs7b0JBRzVFLEdBQUcsdURBQXVELFlBQVc7d0JBQ2pFLE9BQU8sWUFBVzs0QkFBRSxjQUFjLHFCQUFxQixPQUFPOzJCQUFvQjs7O29CQUd0RixHQUFHLHVFQUF1RSxZQUFXO3dCQUNqRixJQUFJLE1BQU0sY0FBYyxnQkFBZ0I7d0JBQ3hDLE9BQU8sS0FBSzs7O29CQUdoQixHQUFHLDZCQUE2QixZQUFXO3dCQUN2QyxJQUFJLE1BQU07NEJBQ047d0JBQ0osY0FBYyxxQkFBcUIsS0FBSzt3QkFDeEMsTUFBTSxjQUFjLGdCQUFnQjt3QkFDcEMsT0FBTyxLQUFLLElBQUk7d0JBQ2hCLE9BQU8sSUFBSSxRQUFRLFFBQVE7d0JBQzNCLE9BQU8sSUFBSSxjQUFjLGNBQWMsUUFBUTt3QkFDL0MsT0FBTyxJQUFJLEdBQUcsV0FBVyxRQUFRLFlBQVksR0FBRzs7OztnQkFJeEQsU0FBUyxjQUFjLFlBQVc7b0JBQzlCLEdBQUcsNkRBQTZELFlBQVc7d0JBQ3ZFLFVBQVUsV0FBVyxtQkFBbUIsYUFBYTt3QkFDckQsT0FBTyxjQUFjLFlBQVksUUFBUTt3QkFDekMsVUFBVSxXQUFXLG1CQUFtQixhQUFhO3dCQUNyRCxPQUFPLGNBQWMsWUFBWSxRQUFROzs7Ozs7R0FXbEQiLCJmaWxlIjoiY29tbW9uL2NvbmZpZy9Db25maWdTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNvbmZpZ01vZHVsZSBmcm9tICdjb21tb24vY29uZmlnL0NvbmZpZ01vZHVsZSc7XG5cbmRlc2NyaWJlKCdDb25maWdTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGh0dHAsIGNvbmZpZ1NlcnZpY2UsIGNvbnRleHRQYXRoLCAkcm9vdFNjb3BlLCBDb2x1bW5Db25maWcsIGNvbmZpZ1NlcnZpY2VDb25zdCwgdGFibGVQcmVmZXJlbmNlc1NlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjb25maWdNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICB9KSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGh0dHBCYWNrZW5kLCBfY29uZmlnU2VydmljZV8sIF8kcm9vdFNjb3BlXywgU1BfQ09OVEVYVF9QQVRILCBfQ29sdW1uQ29uZmlnXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTUF9DT05GSUdfU0VSVklDRSwgX3RhYmxlUHJlZmVyZW5jZXNTZXJ2aWNlXykge1xuICAgICAgICBodHRwID0gJGh0dHBCYWNrZW5kO1xuICAgICAgICBjb25maWdTZXJ2aWNlID0gX2NvbmZpZ1NlcnZpY2VfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBjb250ZXh0UGF0aCA9IFNQX0NPTlRFWFRfUEFUSDtcbiAgICAgICAgY29uZmlnU2VydmljZUNvbnN0ID0gU1BfQ09ORklHX1NFUlZJQ0U7XG4gICAgICAgIENvbHVtbkNvbmZpZyA9IF9Db2x1bW5Db25maWdfO1xuICAgICAgICB0YWJsZVByZWZlcmVuY2VzU2VydmljZSA9IF90YWJsZVByZWZlcmVuY2VzU2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xuICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cbiAgICB2YXIgZ2V0Q29uZmlnRW50cnkgPSBmdW5jdGlvbihrZXlzKSB7XG4gICAgICAgIHZhciBpLCBvYmogPSB7fTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG9ialtrZXlzW2ldXSA9IFtuZXcgQ29sdW1uQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAnZGF0YUluZGV4JzogJ2ZvbycsXG4gICAgICAgICAgICAgICAgJ2xhYmVsJzogJ0ZvbyBCYXInXG4gICAgICAgICAgICB9KV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuXG4gICAgdmFyIGdldElkZW50aXR5RGV0YWlscyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnYXR0cmlidXRlJzogJ25hbWUnLFxuICAgICAgICAgICAgICAgICdsYWJlbCc6ICdVc2VyIE5hbWUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdhdHRyaWJ1dGUnOiAnZmlyc3RuYW1lJyxcbiAgICAgICAgICAgICAgICAnbGFiZWwnOiAnRmlyc3QgTmFtZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSc6ICdsYXN0bmFtZScsXG4gICAgICAgICAgICAgICAgJ2xhYmVsJzogJ0xhc3QgTmFtZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSc6ICdlbWFpbCcsXG4gICAgICAgICAgICAgICAgJ2xhYmVsJzogJ0VtYWlsJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnYXR0cmlidXRlJzogJ21hbmFnZXInLFxuICAgICAgICAgICAgICAgICdsYWJlbCc6ICdNYW5hZ2VyJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUZXN0IGdldElkZW50aXR5RGV0YWlsc0NvbmZpZ1xuICAgICAqL1xuICAgIGRlc2NyaWJlKCdnZXRJZGVudGl0eURldGFpbHNDb25maWcnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdWxkIHJldHVybiBYIG1hbnkgZW50cmllcyBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgICovXG4gICAgICAgIGl0KCdyZXR1cm5zIGFsbCB0aGUgaWRlbnRpdHkgZGV0YWlsIGNvbmZpZyBlbnRyaWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdG1wLFxuICAgICAgICAgICAgICAgIGNvbmZpZ1VybCA9IGNvbnRleHRQYXRoICsgJy91aS9yZXN0L2NvbmZpZ3VyYXRpb24vdWljb25maWcvaWRlbnRpdHknO1xuXG4gICAgICAgICAgICAvLyBGaXJzdCBjaGVjayBpZiBlbmRwb2ludCByZXR1cm5zIDIwMFxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoY29uZmlnVXJsKS5yZXNwb25kKDIwMCwgZ2V0SWRlbnRpdHlEZXRhaWxzKCkpO1xuXG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlLmdldElkZW50aXR5RGV0YWlsc0NvbmZpZygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdG1wID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuXG4gICAgICAgICAgICBleHBlY3QodG1wLmxlbmd0aCkudG9FcXVhbCg1KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3VsZCByZXR1cm4gWCBtYW55IGVudHJpZXMgZm9yIHRoZSBzZWNvbmQgdGltZSBwdWxsaW5nIGZyb20gY2FjaGVcbiAgICAgICAgICovXG4gICAgICAgIGl0KCdyZXR1cm5zIGFsbCB0aGUgaWRlbnRpdHkgZGV0YWlsIGNvbmZpZyBlbnRyaWVzIGZyb20gY2FjaGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0bXAsXG4gICAgICAgICAgICAgICAgY29uZmlnVXJsID0gY29udGV4dFBhdGggKyAnL3VpL3Jlc3QvY29uZmlndXJhdGlvbi91aWNvbmZpZy9pZGVudGl0eSc7XG5cbiAgICAgICAgICAgIC8vIEZpcnN0IGNoZWNrIGlmIGVuZHBvaW50IHJldHVybnMgMjAwXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChjb25maWdVcmwpLnJlc3BvbmQoMjAwLCBnZXRJZGVudGl0eURldGFpbHMoKSk7XG5cbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2UuZ2V0SWRlbnRpdHlEZXRhaWxzQ29uZmlnKCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0bXAgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0bXAubGVuZ3RoKS50b0VxdWFsKDUpO1xuXG4gICAgICAgICAgICB0bXAgPSBudWxsO1xuXG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlLmdldElkZW50aXR5RGV0YWlsc0NvbmZpZygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdG1wID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gRGlnZXN0IHRvIGdldCB0aGUgcHJvbWlzZSByZXNvbHZlZC5cbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0bXAubGVuZ3RoKS50b0VxdWFsKDUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0YWJsZSBwcmVmZXJlbmNlcycsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBnZXQgdGFibGUgY29sdW1uIHByZWZlcmVuY2VzIGZyb20gYmFja2VuZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0YWJsZUlkID0gJ3Rlc3RUYWJsZUlkJztcblxuICAgICAgICAgICAgc3B5T24odGFibGVQcmVmZXJlbmNlc1NlcnZpY2UsICdnZXRUYWJsZVByZWZlcmVuY2VzJyk7XG5cbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2UuZ2V0VGFibGVQcmVmZXJlbmNlcyh0YWJsZUlkKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRhYmxlUHJlZmVyZW5jZXNTZXJ2aWNlLmdldFRhYmxlUHJlZmVyZW5jZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRhYmxlSWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFRlc3QgZ2V0dGluZyBhbGwgdGhlIGNvbmZpZyBlbnRyaWVzLlxuICAgICAqL1xuICAgIGRlc2NyaWJlKCdnZXRDb2x1bW5Db25maWdFbnRyaWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG91bGQgcmV0dXJuIFggbWFueSBlbnRyaWVzXG4gICAgICAgICAqL1xuICAgICAgICBpdCgncmV0dXJucyBhbGwgdGhlIGNvbmZpZyBlbnRyaWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdG1wLFxuICAgICAgICAgICAgICAgIGNvbmZpZ1VybCA9IGNvbnRleHRQYXRoICsgJy91aS9yZXN0L2NvbmZpZ3VyYXRpb24vdWljb25maWcvZW50cmllcyc7XG5cbiAgICAgICAgICAgIC8vIE1vY2sgdGhlIHJlc3BvbnNlIGZyb20gY29uZmlnVXJsIGFuZCByZXR1cm4gYW4gYXJyYXkgb2YgdHdvIGVudHJpZXNcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGNvbmZpZ1VybCkucmVzcG9uZCgyMDAsIGdldENvbmZpZ0VudHJ5KFsna2V5MScsICdrZXkyJ10pKTtcblxuICAgICAgICAgICAgY29uZmlnU2VydmljZS5nZXRDb2x1bW5Db25maWdFbnRyaWVzKCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0bXAgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChPYmplY3Qua2V5cyh0bXApLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICAgICAgIGV4cGVjdCh0bXAua2V5MSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0bXAua2V5MikudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0bXAua2V5Mykubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gY29uZmlnIGVudHJ5IGJ5IGtleXMuIHR3byBnb29kIGtleXMgd2l0aCBvbmUgYmFkIGtleVxuICAgICAgICAgKi9cbiAgICAgICAgaXQoJ3JldHVybnMgY29uZmlnIGVudHJpZXMgYnkga2V5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdG1wLFxuICAgICAgICAgICAgICAgIGNvbmZpZ1VybCA9IGNvbnRleHRQYXRoICsgJy91aS9yZXN0L2NvbmZpZ3VyYXRpb24vdWljb25maWcvZW50cmllcz9rZXk9a2V5MSZrZXk9a2V5MiZrZXk9a2V5Myc7XG5cbiAgICAgICAgICAgIC8vIE1vY2sgdGhlIHJlc3BvbnNlIGZyb20gY29uZmlnVXJsIGFuZCByZXR1cm4gYW4gYXJyYXkgb2YgdHdvIGVudHJpZXNcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGNvbmZpZ1VybCkucmVzcG9uZCgyMDAsIGdldENvbmZpZ0VudHJ5KFsna2V5MScsICdrZXkyJ10pKTtcblxuICAgICAgICAgICAgY29uZmlnU2VydmljZS5nZXRDb2x1bW5Db25maWdFbnRyaWVzKFsna2V5MScsICdrZXkyJywgJ2tleTMnXSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0bXAgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChPYmplY3Qua2V5cyh0bXApLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICAgICAgIGV4cGVjdCh0bXAua2V5MSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0bXAua2V5MikudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0bXAua2V5Mykubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gY29uZmlnIGVudHJ5IGJ5IGtleXMgZnJvbSB0aGUgY2FjaGVcbiAgICAgICAgICovXG4gICAgICAgIGl0KCdyZXR1cm5zIGNvbmZpZyBlbnRyaWVzIGZyb20gY2FjaGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0bXAsXG4gICAgICAgICAgICAgICAgY29uZmlnVXJsID0gY29udGV4dFBhdGggKyAnL3VpL3Jlc3QvY29uZmlndXJhdGlvbi91aWNvbmZpZy9lbnRyaWVzP2tleT1rZXkxJmtleT1rZXkyJztcblxuICAgICAgICAgICAgLy8gTW9jayB0aGUgcmVzcG9uc2UgZnJvbSBjb25maWdVcmwgYW5kIHJldHVybiBhbiBhcnJheSBvZiB0d28gZW50cmllc1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoY29uZmlnVXJsKS5yZXNwb25kKDIwMCwgZ2V0Q29uZmlnRW50cnkoWydrZXkxJywgJ2tleTInXSkpO1xuXG4gICAgICAgICAgICAvLyBGaXJzdCBjYWxsIHdpbGwgZ2V0IHRoZSBlbnRyeSBmcm9tIHRoZSBSRVNUIHJlc291cmNlXG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlLmdldENvbHVtbkNvbmZpZ0VudHJpZXMoWydrZXkxJywgJ2tleTInXSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0bXAgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChPYmplY3Qua2V5cyh0bXApLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICAgICAgIGV4cGVjdCh0bXAua2V5MSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0bXAua2V5MikudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0bXAua2V5Mykubm90LnRvQmVEZWZpbmVkKCk7XG5cbiAgICAgICAgICAgIHRtcCA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIFNlY29uZCBjYWxsIHNob3VsZCBnZXQgaXQgZnJvbSB0aGUgY2FjaGVcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2UuZ2V0Q29sdW1uQ29uZmlnRW50cmllcyhbJ2tleTEnLCAna2V5MiddKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRtcCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIERpZ2VzdCB0byBnZXQgdGhlIHByb21pc2UgcmVzb2x2ZWQuXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBleHBlY3QoT2JqZWN0LmtleXModG1wKS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgICAgICBleHBlY3QodG1wLmtleTEpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QodG1wLmtleTIpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QodG1wLmtleTMpLm5vdC50b0JlRGVmaW5lZCgpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbnN1cmUgcmV0dXJuZWQgZW50cmllcyBhcmUgb2YgYXBwcm9wcmlhdGUgdHlwZVxuICAgICAgICAgKi9cbiAgICAgICAgaXQoJ3JldHVybnMgZW50cmllcyBvZiB0eXBlIENvbHVtbkNvbmZpZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHRtcCxcbiAgICAgICAgICAgICAgICBjb25maWdVcmwgPSBjb250ZXh0UGF0aCArICcvdWkvcmVzdC9jb25maWd1cmF0aW9uL3VpY29uZmlnL2VudHJpZXM/a2V5PWtleTEnO1xuXG4gICAgICAgICAgICAvLyBNb2NrIHRoZSByZXNwb25zZSBmcm9tIGNvbmZpZ1VybCBhbmQgcmV0dXJuIGFuIGFycmF5IG9mIHR3byBlbnRyaWVzXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChjb25maWdVcmwpLnJlc3BvbmQoMjAwLCBnZXRDb25maWdFbnRyeShbJ2tleTEnXSkpO1xuXG4gICAgICAgICAgICAvLyBGaXJzdCBjYWxsIHdpbGwgZ2V0IHRoZSBlbnRyeSBmcm9tIHRoZSBSRVNUIHJlc291cmNlXG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlLmdldENvbHVtbkNvbmZpZ0VudHJpZXMoWydrZXkxJ10pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdG1wID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuXG4gICAgICAgICAgICBleHBlY3QoT2JqZWN0LmtleXModG1wKS5sZW5ndGgpLnRvQmUoMSk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0bXAua2V5MVswXS5nZXREYXRhSW5kZXgoKSkudG9CZSgnZm9vJyk7XG4gICAgICAgICAgICBleHBlY3QodG1wLmtleTFbMF0uZ2V0TGFiZWwoKSkudG9CZSgnRm9vIEJhcicpO1xuICAgICAgICAgICAgZXhwZWN0KHRtcC5rZXkxWzBdLmlzRmllbGRPbmx5KCkpLnRvQmUoZmFsc2UpO1xuXG4gICAgICAgICAgICBleHBlY3QodG1wLmtleTIpLm5vdC50b0JlRGVmaW5lZCgpO1xuXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NvbmZpZyB2YWx1ZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIC8vIFNldHVwIHRoZSBkZXBlbmRlbmNpZXMuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBTYWlsUG9pbnQuY29uZmlnRGF0YVtjb25maWdTZXJ2aWNlQ29uc3QuQUNDRVNTX1JFUVVFU1RfTUFYX0lERU5USVRZX1NFTEVDVF0gPSAyO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncHVrZXMgaWYgcmVnaXN0ZXJpbmcgYSB2YWx1ZSB3aXRoIG5vIGtleScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjb25maWdTZXJ2aWNlLnJlZ2lzdGVyQ29uZmlnVmFsdWUobnVsbCwgJ2Jvb20nKTsgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBhIHZhbHVlIGlmIGl0IGhhcyBiZWVuIHJlZ2lzdGVyZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSAnZ2VkZHknLFxuICAgICAgICAgICAgICAgIHZhbHVlID0gJ2xlZSc7XG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlLnJlZ2lzdGVyQ29uZmlnVmFsdWUoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnU2VydmljZS5nZXRDb25maWdWYWx1ZShrZXkpKS50b0VxdWFsKHZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3ByZWZlcnMgcmVnaXN0ZXJlZCB2YWx1ZXMgYWJvdmUgU2FpbFBvaW50LmNvbmZpZ0RhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBjb25maWdTZXJ2aWNlQ29uc3QuQUNDRVNTX1JFUVVFU1RfTUFYX0lERU5USVRZX1NFTEVDVCxcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDk5O1xuICAgICAgICAgICAgY29uZmlnU2VydmljZS5yZWdpc3RlckNvbmZpZ1ZhbHVlKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnVmFsdWUoa2V5KSkudG9FcXVhbCh2YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGEgdmFsdWUgaWYgaXQgaXMgZGVmaW5lZCBpbiBTYWlsUG9pbnQuY29uZmlnRGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnVmFsdWUoY29uZmlnU2VydmljZUNvbnN0LkFDQ0VTU19SRVFVRVNUX01BWF9JREVOVElUWV9TRUxFQ1QpKS50b0JlKDIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBudWxsIGlmIGl0IGlzIG5vdCBkZWZpbmVkIGluIFNhaWxQb2ludC5jb25maWdEYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnU2VydmljZS5nZXRDb25maWdWYWx1ZSgnQkxBSEJMQUhCTEFIJykpLnRvQmVOdWxsKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NvbHVtbiBjb25maWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvbENmZ0FycmF5O1xuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb2xDZmdBcnJheSA9IFt7XG4gICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnMTIzNDUnXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIGlmIHJlZ2lzdGVyaW5nIHdpdGggbnVsbCBrZXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY29uZmlnU2VydmljZS5yZWdpc3RlckNvbHVtbkNvbmZpZyhudWxsLCBjb2xDZmdBcnJheSk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIGlmIHJlZ2lzdGVyaW5nIHdpdGggbnVsbCBjb2x1bW4gY29uZmlnIGFycmF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGNvbmZpZ1NlcnZpY2UucmVnaXN0ZXJDb2x1bW5Db25maWcoJ2tleScsIG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdwdWtlcyBpZiByZWdpc3RlcmluZyB3aXRoIGEgbm9uLWFycmF5IGNvbHVtbiBjb25maWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY29uZmlnU2VydmljZS5yZWdpc3RlckNvbHVtbkNvbmZpZygna2V5JywgJ25vdCBhbiBhcnJheScpOyB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBmcm9tIGdldENvbHVtbkNvbmZpZygpIGZvciBhbiB1bnJlZ2lzdGVyZWQgY29uZmlnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY2ZnID0gY29uZmlnU2VydmljZS5nZXRDb2x1bW5Db25maWcoJ25vdCB0aGVyZScpO1xuICAgICAgICAgICAgZXhwZWN0KGNmZykudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmVnaXN0ZXJzIGEgY29sdW1uIGNvbmZpZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGtleSA9ICdrZXknLFxuICAgICAgICAgICAgICAgIGNmZztcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2UucmVnaXN0ZXJDb2x1bW5Db25maWcoa2V5LCBjb2xDZmdBcnJheSk7XG4gICAgICAgICAgICBjZmcgPSBjb25maWdTZXJ2aWNlLmdldENvbHVtbkNvbmZpZyhrZXkpO1xuICAgICAgICAgICAgZXhwZWN0KGNmZykubm90LnRvQmVOdWxsKCk7XG4gICAgICAgICAgICBleHBlY3QoY2ZnLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdChjZmdbMF0gaW5zdGFuY2VvZiBDb2x1bW5Db25maWcpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY2ZnWzBdLmRhdGFJbmRleCkudG9FcXVhbChjb2xDZmdBcnJheVswXS5kYXRhSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc01vYmlsZSgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSBjb25maWcgdmFsdWUgZm9yIHRoZSBpc01vYmlsZSBrZXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFNhaWxQb2ludC5jb25maWdEYXRhW2NvbmZpZ1NlcnZpY2VDb25zdC5JU19NT0JJTEVdID0gdHJ1ZTtcbiAgICAgICAgICAgIGV4cGVjdChjb25maWdTZXJ2aWNlLmlzTW9iaWxlKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBTYWlsUG9pbnQuY29uZmlnRGF0YVtjb25maWdTZXJ2aWNlQ29uc3QuSVNfTU9CSUxFXSA9IGZhbHNlO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2UuaXNNb2JpbGUoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
