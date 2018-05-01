System.register(['test/js/TestInitializer', 'plugin/PluginModule.js', 'test/js/TestModule'], function (_export) {
    'use strict';

    var pluginModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pluginPluginModuleJs) {
            pluginModule = _pluginPluginModuleJs['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('PluginDirective', function () {

                var elementDefinition = '<sp-plugin sp-plugin="plugin"></sp-plugin>',
                    spModal = undefined,
                    $scope = undefined,
                    $q = undefined,
                    $compile = undefined,
                    element = undefined,
                    testService = undefined,
                    pluginService = undefined,
                    $window = undefined,
                    plugin = undefined;

                function createElement() {
                    var defintion = arguments.length <= 0 || arguments[0] === undefined ? elementDefinition : arguments[0];

                    var element = angular.element(defintion);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                beforeEach(module(testModule, pluginModule));

                beforeEach(module(function ($provide) {
                    $window = { location: { reload: angular.noop } };
                    $provide.value('$window', $window);
                }));

                beforeEach(inject(function (_$rootScope_, _$compile_, _$q_, _pluginService_, _testService_) {
                    $scope = _$rootScope_;
                    $q = _$q_;
                    $compile = _$compile_;
                    testService = _testService_;
                    pluginService = _pluginService_;

                    plugin = {
                        name: 'TestPlugin',
                        displayName: 'Test Plugin',
                        disabled: false,
                        version: '1.0',
                        installDate: 1,
                        certificationLevel: 'Gold'
                    };

                    pluginService.togglePlugin = testService.createPromiseSpy(false, {});
                }));

                it('is created', function () {
                    element = createElement();
                    expect(element).not.toBeNull();
                    expect(element.find('.list-group-item').length).toEqual(3);
                });

                describe('PluginDirectiveCtrl', function () {
                    var $controller = undefined,
                        spTranslateFilter = undefined,
                        fake404 = {
                        status: 404
                    },
                        fake500 = {
                        status: 500
                    };

                    beforeEach(inject(function (_$controller_, _$window_, _pluginService_, _spTranslateFilter_, _spModal_) {
                        pluginService = _pluginService_;
                        $controller = _$controller_;
                        $window = _$window_;
                        spModal = _spModal_;
                        spTranslateFilter = _spTranslateFilter_;
                    }));

                    function createController() {
                        return $controller('PluginDirectiveCtrl', {
                            pluginService: pluginService,
                            spTranslateFilter: spTranslateFilter,
                            $window: $window,
                            spModal: spModal
                        });
                    }

                    describe('enable button', function () {

                        it('should be in the enabled state', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            ctrl.plugin = plugin;
                            expect(ctrl).not.toBeNull();
                            expect(ctrl.plugin.disabled).toBe(false);
                        });

                        it('should be in the disabled state', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            expect(ctrl).not.toBeNull();
                            plugin.disabled = true;
                            ctrl.plugin = plugin;
                            expect(ctrl.plugin.disabled).toBe(true);
                        });

                        it('should call the service after toggling', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            plugin.disabled = true;
                            ctrl.plugin = plugin;
                            ctrl.toggleDisabled(false);
                            expect(pluginService.togglePlugin).toHaveBeenCalled();
                        });

                        it('should not call the service after toggling', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            ctrl.plugin = plugin;
                            spyOn(spModal, 'open').and.returnValue({});
                            ctrl.toggleDisabled();
                            expect(pluginService.togglePlugin).not.toHaveBeenCalled();
                        });

                        it('should call the service after toggling after confirmation', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            ctrl.plugin = plugin;
                            spyOn(spModal, 'confirm').and.returnValue($q.when());
                            ctrl.toggleDisabled();
                            $scope.$apply();
                            expect(spModal.confirm).toHaveBeenCalled();
                            expect(pluginService.togglePlugin).toHaveBeenCalled();
                        });

                        it('should open the not found modal if plugin not found', function () {
                            pluginService.togglePlugin = testService.createPromiseSpy(true, {}, fake404);
                            var ctrl = undefined;
                            ctrl = createController();
                            ctrl.plugin = plugin;
                            spyOn(spModal, 'confirm').and.returnValue($q.when());
                            spyOn(spModal, 'open').and.returnValue({
                                result: $q.defer().promise
                            });
                            ctrl.toggleDisabled();
                            $scope.$apply();

                            expect(spModal.confirm).toHaveBeenCalled();
                            expect(pluginService.togglePlugin).toHaveBeenCalled();
                            expect(spModal.open).toHaveBeenCalled();
                        });
                    });

                    describe('uninstall button', function () {

                        it('should open the confirm modal', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            ctrl.plugin = plugin;
                            spyOn(spModal, 'confirm').and.returnValue($q.when());
                            ctrl.uninstallPlugin();
                            expect(spModal.confirm).toHaveBeenCalled();
                        });

                        it('should call the service when confirmed', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            ctrl.plugin = plugin;
                            spyOn(spModal, 'confirm').and.returnValue($q.when());
                            spyOn(pluginService, 'uninstallPlugin').and.returnValue($q.when());
                            ctrl.uninstallPlugin();
                            $scope.$apply();
                            expect(pluginService.uninstallPlugin).toHaveBeenCalled();
                        });

                        it('should not call the service when not confirmed', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            ctrl.plugin = plugin;
                            spyOn(spModal, 'confirm').and.returnValue($q.reject());
                            spyOn(pluginService, 'uninstallPlugin').and.returnValue($q.when());
                            ctrl.uninstallPlugin();
                            $scope.$apply();
                            expect(pluginService.uninstallPlugin).not.toHaveBeenCalled();
                        });

                        it('should open the plugin not found modal if plugin is not found', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            ctrl.plugin = plugin;
                            spyOn(spModal, 'confirm').and.returnValue($q.when());
                            spyOn(spModal, 'open').and.returnValue({
                                result: $q.defer().promise
                            });
                            spyOn(pluginService, 'uninstallPlugin').and.returnValue(testService.createPromise(true, [], fake404));
                            ctrl.uninstallPlugin();
                            $scope.$apply();
                            expect(pluginService.uninstallPlugin).toHaveBeenCalled();
                            expect(spModal.open).toHaveBeenCalled();
                        });

                        it('should open the plugin uninstall error modal for server side error', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            ctrl.plugin = plugin;
                            spyOn(spModal, 'confirm').and.returnValue($q.when());
                            spyOn(spModal, 'open').and.returnValue({
                                result: $q.defer().promise
                            });
                            spyOn(pluginService, 'uninstallPlugin').and.returnValue(testService.createPromise(true, [], fake500));
                            ctrl.uninstallPlugin();
                            $scope.$apply();
                            expect(pluginService.uninstallPlugin).toHaveBeenCalled();
                            expect(spModal.open).toHaveBeenCalled();
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbi9QbHVnaW5EaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMEJBQTBCLHVCQUF1QixVQUFVLFNBQVM7SUFBaEg7O0lBR0ksSUFBSSxjQUFjO0lBQ2xCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxlQUFlLHNCQUFzQjtXQUN0QyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLG1CQUFtQixZQUFXOztnQkFFbkMsSUFBSSxvQkFDQTtvQkFBOEMsVUFBTztvQkFDckQsU0FBTTtvQkFBRSxLQUFFO29CQUFFLFdBQVE7b0JBQUUsVUFBTztvQkFBRSxjQUFXO29CQUFFLGdCQUFhO29CQUFFLFVBQU87b0JBQUUsU0FBTTs7Z0JBRTlFLFNBQVMsZ0JBQTZDO29CQWN0QyxJQWRPLFlBQVMsVUFBQSxVQUFBLEtBQUEsVUFBQSxPQUFBLFlBQUcsb0JBQWlCLFVBQUE7O29CQUNoRCxJQUFJLFVBQVUsUUFBUSxRQUFRO29CQUM5QixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFdBQVcsT0FBTyxZQUFZOztnQkFFOUIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLFFBQVE7b0JBQ3hDLFNBQVMsTUFBTSxXQUFXOzs7Z0JBRzlCLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWSxNQUFNLGlCQUFpQixlQUFlO29CQUN2RixTQUFTO29CQUNULEtBQUs7b0JBQ0wsV0FBVztvQkFDWCxjQUFjO29CQUNkLGdCQUFnQjs7b0JBRWhCLFNBQVM7d0JBQ0wsTUFBTTt3QkFDTixhQUFhO3dCQUNiLFVBQVU7d0JBQ1YsU0FBUzt3QkFDVCxhQUFhO3dCQUNiLG9CQUFvQjs7O29CQUd4QixjQUFjLGVBQWUsWUFBWSxpQkFB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QWtELFlBQU07NEJBQ3ZELElBQUksT0FBSTs0QkFDUixPQUFPOzRCQUNQLEtBQUssU0FBUzs0QkFDZCxNQUFNLFNBQVMsV0FBVyxJQUFJLFlBQVksR0FBRzs0QkFDN0MsTUFBTSxlQUFlLG1CQUFtQixJQUFJLFlBQVksR0FBRzs0QkFDM0QsS0FBSzs0QkFDTCxPQUFPOzRCQUNQLE9BQU8sY0FBYyxpQkFBaUIsSUFBSTs7O3dCQUc5QyxHQUFHLGlFQUFpRSxZQUFNOzRCQUN0RSxJQUFJLE9BQUk7NEJBQ1IsT0FBTzs0QkFDUCxLQUFLLFNBQVM7NEJBQ2QsTUFBTSxTQUFTLFdBQVcsSUFBSSxZQUFZLEdBQUc7NEJBQzdDLE1BQU0sU0FBUyxRQUFRLElBQUksWUFBWTtnQ0FDbkMsUUFBUSxHQUFHLFFBQVE7OzRCQUV2QixNQUFNLGVBQWUsbUJBQW1CLElBQUksWUFBWSxZQUFZLGNBQWMsTUFBTSxJQUFJOzRCQUM1RixLQUFLOzRCQUNMLE9BQU87NEJBQ1AsT0FBTyxjQUFjLGlCQUFpQjs0QkFDdEMsT0FBTyxRQUFRLE1BQU07Ozt3QkFHekIsR0FBRyxzRUFBc0UsWUFBTTs0QkFDM0UsSUFBSSxPQUFJOzRCQUNSLE9BQU87NEJBQ1AsS0FBSyxTQUFTOzRCQUNkLE1BQU0sU0FBUyxXQUFXLElBQUksWUFBWSxHQUFHOzRCQUM3QyxNQUFNLFNBQVMsUUFBUSxJQUFJLFlBQVk7Z0NBQ25DLFFBQVEsR0FBRyxRQUFROzs0QkFFdkIsTUFBTSxlQUFlLG1CQUFtQixJQUFJLFlBQVksWUFBWSxjQUFjLE1BQU0sSUFBSTs0QkFDNUYsS0FBSzs0QkFDTCxPQUFPOzRCQUNQLE9BQU8sY0FBYyxpQkFBaUI7NEJBQ3RDLE9BQU8sUUFBUSxNQUFNOzs7Ozs7O0dBc0JsQyIsImZpbGUiOiJwbHVnaW4vUGx1Z2luRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBsdWdpbk1vZHVsZSBmcm9tICdwbHVnaW4vUGx1Z2luTW9kdWxlLmpzJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdQbHVnaW5EaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBlbGVtZW50RGVmaW5pdGlvbiA9XG4gICAgICAgICc8c3AtcGx1Z2luIHNwLXBsdWdpbj1cInBsdWdpblwiPjwvc3AtcGx1Z2luPicsIHNwTW9kYWwsXG4gICAgICAgICRzY29wZSwgJHEsICRjb21waWxlLCBlbGVtZW50LCB0ZXN0U2VydmljZSwgcGx1Z2luU2VydmljZSwgJHdpbmRvdywgcGx1Z2luO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChkZWZpbnRpb24gPSBlbGVtZW50RGVmaW5pdGlvbikge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChkZWZpbnRpb24pO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIHBsdWdpbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHdpbmRvdyA9IHsgbG9jYXRpb246IHsgcmVsb2FkOiBhbmd1bGFyLm5vb3AgfSB9O1xuICAgICAgICAkcHJvdmlkZS52YWx1ZSgnJHdpbmRvdycsICR3aW5kb3cpO1xuICAgIH0pKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgXyRjb21waWxlXywgXyRxXywgX3BsdWdpblNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfKSB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgcGx1Z2luU2VydmljZSA9IF9wbHVnaW5TZXJ2aWNlXztcblxuICAgICAgICBwbHVnaW4gPSB7XG4gICAgICAgICAgICBuYW1lOiAnVGVzdFBsdWdpbicsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1Rlc3QgUGx1Z2luJyxcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHZlcnNpb246ICcxLjAnLFxuICAgICAgICAgICAgaW5zdGFsbERhdGU6IDEsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uTGV2ZWw6ICdHb2xkJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHBsdWdpblNlcnZpY2UudG9nZ2xlUGx1Z2luID0gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge30pO1xuICAgIH0pKTtcblxuICAgIGl0KCdpcyBjcmVhdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50KS5ub3QudG9CZU51bGwoKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmxpc3QtZ3JvdXAtaXRlbScpLmxlbmd0aCkudG9FcXVhbCgzKTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1BsdWdpbkRpcmVjdGl2ZUN0cmwnLCAoKSA9PiB7XG4gICAgICAgIGxldCAkY29udHJvbGxlciwgc3BUcmFuc2xhdGVGaWx0ZXIsXG4gICAgICAgICAgICBmYWtlNDA0ID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogNDA0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFrZTUwMCA9IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDUwMFxuICAgICAgICAgICAgfTtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb250cm9sbGVyXywgXyR3aW5kb3dfLCBfcGx1Z2luU2VydmljZV8sIF9zcFRyYW5zbGF0ZUZpbHRlcl8sIF9zcE1vZGFsXykgPT4ge1xuICAgICAgICAgICAgcGx1Z2luU2VydmljZSA9IF9wbHVnaW5TZXJ2aWNlXztcbiAgICAgICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgICAgICR3aW5kb3cgPSBfJHdpbmRvd187XG4gICAgICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIgPSBfc3BUcmFuc2xhdGVGaWx0ZXJfO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgICAgIHJldHVybiAkY29udHJvbGxlcignUGx1Z2luRGlyZWN0aXZlQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBwbHVnaW5TZXJ2aWNlOiBwbHVnaW5TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyOiBzcFRyYW5zbGF0ZUZpbHRlcixcbiAgICAgICAgICAgICAgICAkd2luZG93OiAkd2luZG93LFxuICAgICAgICAgICAgICAgIHNwTW9kYWw6IHNwTW9kYWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVzY3JpYmUoJ2VuYWJsZSBidXR0b24nLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgYmUgaW4gdGhlIGVuYWJsZWQgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmw7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICBjdHJsLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybCkubm90LnRvQmVOdWxsKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwucGx1Z2luLmRpc2FibGVkKS50b0JlKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGJlIGluIHRoZSBkaXNhYmxlZCBzdGF0ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybDtcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsKS5ub3QudG9CZU51bGwoKTtcbiAgICAgICAgICAgICAgICBwbHVnaW4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGN0cmwucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnBsdWdpbi5kaXNhYmxlZCkudG9CZSh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIHNlcnZpY2UgYWZ0ZXIgdG9nZ2xpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmw7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICBwbHVnaW4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGN0cmwucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICAgICAgICAgIGN0cmwudG9nZ2xlRGlzYWJsZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwbHVnaW5TZXJ2aWNlLnRvZ2dsZVBsdWdpbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgbm90IGNhbGwgdGhlIHNlcnZpY2UgYWZ0ZXIgdG9nZ2xpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmw7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICBjdHJsLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7fSk7XG4gICAgICAgICAgICAgICAgY3RybC50b2dnbGVEaXNhYmxlZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwbHVnaW5TZXJ2aWNlLnRvZ2dsZVBsdWdpbikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIHNlcnZpY2UgYWZ0ZXIgdG9nZ2xpbmcgYWZ0ZXIgY29uZmlybWF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsO1xuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgY3RybC5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ2NvbmZpcm0nKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKTtcbiAgICAgICAgICAgICAgICBjdHJsLnRvZ2dsZURpc2FibGVkKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLmNvbmZpcm0pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocGx1Z2luU2VydmljZS50b2dnbGVQbHVnaW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIG9wZW4gdGhlIG5vdCBmb3VuZCBtb2RhbCBpZiBwbHVnaW4gbm90IGZvdW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHBsdWdpblNlcnZpY2UudG9nZ2xlUGx1Z2luID0gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweSh0cnVlLCB7fSwgZmFrZTQwNCk7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmw7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICBjdHJsLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnY29uZmlybScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiAkcS5kZWZlcigpLnByb21pc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjdHJsLnRvZ2dsZURpc2FibGVkKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwuY29uZmlybSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwbHVnaW5TZXJ2aWNlLnRvZ2dsZVBsdWdpbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgndW5pbnN0YWxsIGJ1dHRvbicsICgpID0+IHtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIHRoZSBjb25maXJtIG1vZGFsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsO1xuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgY3RybC5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ2NvbmZpcm0nKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKTtcbiAgICAgICAgICAgICAgICBjdHJsLnVuaW5zdGFsbFBsdWdpbigpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLmNvbmZpcm0pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIHNlcnZpY2Ugd2hlbiBjb25maXJtZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmw7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICBjdHJsLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnY29uZmlybScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICAgICAgICAgIHNweU9uKHBsdWdpblNlcnZpY2UsICd1bmluc3RhbGxQbHVnaW4nKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKTtcbiAgICAgICAgICAgICAgICBjdHJsLnVuaW5zdGFsbFBsdWdpbigpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocGx1Z2luU2VydmljZS51bmluc3RhbGxQbHVnaW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIHRoZSBzZXJ2aWNlIHdoZW4gbm90IGNvbmZpcm1lZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybDtcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgICAgIGN0cmwucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdjb25maXJtJykuYW5kLnJldHVyblZhbHVlKCRxLnJlamVjdCgpKTtcbiAgICAgICAgICAgICAgICBzcHlPbihwbHVnaW5TZXJ2aWNlLCAndW5pbnN0YWxsUGx1Z2luJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XG4gICAgICAgICAgICAgICAgY3RybC51bmluc3RhbGxQbHVnaW4oKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHBsdWdpblNlcnZpY2UudW5pbnN0YWxsUGx1Z2luKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgb3BlbiB0aGUgcGx1Z2luIG5vdCBmb3VuZCBtb2RhbCBpZiBwbHVnaW4gaXMgbm90IGZvdW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsO1xuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgY3RybC5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ2NvbmZpcm0nKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKTtcbiAgICAgICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogJHEuZGVmZXIoKS5wcm9taXNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3B5T24ocGx1Z2luU2VydmljZSwgJ3VuaW5zdGFsbFBsdWdpbicpLmFuZC5yZXR1cm5WYWx1ZSh0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKHRydWUsIFtdLCBmYWtlNDA0KSk7XG4gICAgICAgICAgICAgICAgY3RybC51bmluc3RhbGxQbHVnaW4oKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHBsdWdpblNlcnZpY2UudW5pbnN0YWxsUGx1Z2luKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgb3BlbiB0aGUgcGx1Z2luIHVuaW5zdGFsbCBlcnJvciBtb2RhbCBmb3Igc2VydmVyIHNpZGUgZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmw7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICBjdHJsLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnY29uZmlybScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiAkcS5kZWZlcigpLnByb21pc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzcHlPbihwbHVnaW5TZXJ2aWNlLCAndW5pbnN0YWxsUGx1Z2luJykuYW5kLnJldHVyblZhbHVlKHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UodHJ1ZSwgW10sIGZha2U1MDApKTtcbiAgICAgICAgICAgICAgICBjdHJsLnVuaW5zdGFsbFBsdWdpbigpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocGx1Z2luU2VydmljZS51bmluc3RhbGxQbHVnaW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
