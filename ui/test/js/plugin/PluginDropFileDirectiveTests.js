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

            describe('PluginDropFileDirective', function () {

                var elementDefinition = '<div sp-plugin-drop-file></div>',
                    $scope = undefined,
                    $q = undefined,
                    $compile = undefined,
                    $timeout = undefined,
                    element = undefined,
                    testService = undefined,
                    changeEvent = undefined,
                    dropEvent = undefined,
                    fakeJpgFile = undefined,
                    fakeZipFile = undefined,
                    pluginService = undefined,
                    $window = undefined;

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

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_$rootScope_, _$compile_, _$q_, _$timeout_, _pluginService_, _testService_, $animate) {
                    $scope = _$rootScope_;
                    $q = _$q_;
                    $compile = _$compile_;
                    $timeout = _$timeout_;
                    testService = _testService_;
                    pluginService = _pluginService_;
                    // Since we are mocking out $window, $animate is having NPEs looking up document.
                    // So just disable all animations, we dont care about them.
                    $animate.enabled(false);
                    fakeZipFile = {
                        name: 'fakeZipFile.zip',
                        type: 'application/zip'
                    };

                    fakeJpgFile = {
                        name: 'fakeFile.jpg',
                        type: 'image/jpg'
                    };
                    dropEvent = {
                        type: 'drop',
                        originalEvent: {
                            dataTransfer: {
                                files: [fakeZipFile]
                            }
                        }
                    };
                    changeEvent = {
                        type: 'change',
                        target: {
                            files: [fakeZipFile]
                        }
                    };

                    pluginService.installPlugin = testService.createPromiseSpy(false, {});
                }));

                it('is created', function () {
                    element = createElement();
                    expect(element).not.toBeNull();
                    expect(element.find('.fa-upload').length).toEqual(1);
                    expect(element.find('.box-dragndrop span').hasClass('text-info')).toEqual(true);
                });

                it('changes initial state with change event', function () {
                    element = createElement();
                    element.triggerHandler(changeEvent);
                    expect(element.find('.box-dragndrop span').hasClass('text-success')).toEqual(true);
                });

                it('changes initial state with drop event', function () {
                    element = createElement();
                    element.triggerHandler(dropEvent);
                    expect(element.find('.box-dragndrop span').hasClass('text-success')).toEqual(true);
                });

                describe('PluginDropFileDirectiveCtrl', function () {
                    var $controller = undefined,
                        spTranslateFilter = undefined;

                    beforeEach(inject(function (_$controller_, _$q_, _pluginService_, _spTranslateFilter_) {
                        pluginService = _pluginService_;
                        $controller = _$controller_;
                        $q = _$q_;
                        spTranslateFilter = _spTranslateFilter_;
                    }));

                    function createController() {

                        return $controller('PluginDropFileDirectiveCtrl', {
                            pluginService: pluginService,
                            spTranslateFilter: spTranslateFilter,
                            $q: $q
                        });
                    }

                    describe('file drop', function () {
                        it('should be in the success state', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            expect(ctrl).not.toBeNull();
                            ctrl.fileSubmitted([fakeZipFile]);
                            $scope.$digest();
                            expect(ctrl.isInitial()).toBe(false);
                            expect(ctrl.isSuccess()).toBe(true);
                        });

                        it('should be in an error state', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            expect(ctrl).not.toBeNull();
                            ctrl.fileSubmitted([fakeJpgFile]);
                            expect(ctrl.isInitial()).toBe(false);
                            expect(ctrl.isError()).toBe(true);
                        });

                        it('should be in an error state after submitting multiple files', function () {
                            var ctrl = undefined;
                            ctrl = createController();
                            expect(ctrl).not.toBeNull();
                            ctrl.fileSubmitted([fakeZipFile, fakeZipFile]);
                            expect(ctrl.isInitial()).toBe(false);
                            expect(ctrl.isError()).toBe(true);
                        });
                    });

                    describe('submit file', function () {

                        it('should reload the page upon success', function () {
                            var ctrl = createController();

                            spyOn($window.location, 'reload').and.callThrough();

                            ctrl.fileSubmitted([fakeZipFile]);
                            $scope.$digest();
                            expect($window.location.reload).toHaveBeenCalled();
                        });

                        it('should set the message upon error', function () {
                            var ctrl = createController(),
                                error = { message: 'an error occurred' };

                            pluginService.installPlugin = testService.createPromiseSpy(true, null, error);
                            spyOn($window.location, 'reload').and.callThrough();

                            ctrl.fileSubmitted([fakeZipFile]);
                            $scope.$digest();

                            expect(ctrl.statusMessage).toEqual(error.message);
                            expect($window.location.reload).not.toHaveBeenCalled();
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbi9QbHVnaW5Ecm9wRmlsZURpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQkFBMEIsdUJBQXVCLFVBQVUsU0FBUztJQUFoSDs7SUFHSSxJQUFJLGNBQWM7SUFDbEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGVBQWUsc0JBQXNCO1dBQ3RDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsMkJBQTJCLFlBQVc7O2dCQUUzQyxJQUFJLG9CQUNBO29CQUNBLFNBQU07b0JBQUUsS0FBRTtvQkFBRSxXQUFRO29CQUFFLFdBQVE7b0JBQUUsVUFBTztvQkFBRSxjQUFXO29CQUFFLGNBQVc7b0JBQUUsWUFBUztvQkFDNUUsY0FBVztvQkFBRSxjQUFXO29CQUFFLGdCQUFhO29CQUFFLFVBQU87O2dCQUVwRCxTQUFTLGdCQUE2QztvQkFnQnRDLElBaEJPLFlBQVMsVUFBQSxVQUFBLEtBQUEsVUFBQSxPQUFBLFlBQUcsb0JBQWlCLFVBQUE7O29CQUNoRCxJQUFJLFVBQVUsUUFBUSxRQUFRO29CQUM5QixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFdBQVcsT0FBTyxZQUFZOztnQkFFOUIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLFFBQVE7b0JBQ3hDLFNBQVMsTUFBTSxXQUFXOzs7O2dCQUk5QixXQUFXLE9BQU8sVUFBUyxjQUFjLFlBQVksTUFBTSxZQUFZLGlCQUFpQixlQUFlLFVBQVU7b0JBQzdHLFNBQVM7b0JBQ1QsS0FBSztvQkFDTCxXQUFXO29CQUNYLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxnQkFBZ0I7OztvQkFHaEIsU0FBUyxRQUFRO29CQUNqQixjQUFjO3dCQUNWLE1BQU07d0JBQ04sTUFBTTs7O29CQUdWLGNBQWM7d0JBQ04sTUFBTTt3QkFDTixNQUFNOztvQkFFZCxZQUFZO3dCQUNSLE1BQU07d0JBQ04sZUFBZTs0QkFDWCxjQUFjO2dDQUNWLE9BQU8sQ0FBQzs7OztvQkFJcEIsY0FBYzt3QkFDVixNQUFNO3dCQUNOLFFBQVE7NEJBQ0osT0FBTyxDQUFDOzs7O29CQUloQixjQUFjLGdCQUFnQixZQUFZLGlCQUFpQixPQUFPOzs7Z0JBR3RFLEdBQUcsY0FBYyxZQUFXO29CQUN4QixVQUFVO29CQUNWLE9BQU8sU0FBUyxJQUFJO29CQUNwQixPQUFPLFFBQVEsS0FBSyxjQUFjLFFBQVEsUUFBUTtvQkFDbEQsT0FBTyxRQUFRLEtBQUssdUJBQXVCLFNBQVMsY0FBYyxRQUFROzs7Z0JBSTlFLEdBQUcsMkNBQTJDLFlBQVc7b0JBQ3JELFVBQVU7b0JBQ1YsUUFBUSxlQUFlO29CQUN2QixPQUFPLFFBQVEsS0FBSyx1QkFBdUIsU0FBUyxpQkFBaUIsUUFBUTs7O2dCQUdqRixHQUFHLHlDQUF5QyxZQUFXO29CQUNuRCxVQUFVO29CQUNWLFFBQVEsZUFBZTtvQkFDdkIsT0FBTyxRQUFRLEtBQUssdUJBQXVCLFNBQVMsaUJBQWlCLFFBQVE7OztnQkFHakYsU0FBUywrQkFBK0IsWUFBTTtvQkFDMUMsSUFBSSxjQUFXO3dCQUFFLG9CQUFpQjs7b0JBRWxDLFdBQVcsT0FBTyxVQUFDLGVBQWUsTUFBTSxpQkFBaUIscUJBQXdCO3dCQUM3RSxnQkFBZ0I7d0JBQ2hCLGNBQWM7d0JBQ2QsS0FBSzt3QkFDTCxvQkFBb0I7OztvQkFHeEIsU0FBUyxtQkFBbUI7O3dCQUV4QixPQUFPLFlBQVksK0JBQStCOzRCQUM5QyxlQUFlOzRCQUNmLG1CQUFtQjs0QkFDbkIsSUFBSTs7OztvQkFJWixTQUFTLGFBQWEsWUFBTTt3QkFDeEIsR0FBRyxrQ0FBa0MsWUFBTTs0QkFDdkMsSUFBSSxPQUFJOzRCQUNSLE9BQU87NEJBQ1AsT0FBTyxNQUFNLElBQUk7NEJBQ2pCLEtBQUssY0FBYyxDQUFDOzRCQUNwQixPQUFPOzRCQUNQLE9BQU8sS0FBSyxhQUFhLEtBQUs7NEJBQzlCLE9BQU8sS0FBSyxhQUFhLEtBQUs7Ozt3QkFHbEMsR0FBRywrQkFBK0IsWUFBTTs0QkFDcEMsSUFBSSxPQUFJOzRCQUNSLE9BQU87NEJBQ1AsT0FBTyxNQUFNLElBQUk7NEJBQ2pCLEtBQUssY0FBYyxDQUFDOzRCQUNwQixPQUFPLEtBQUssYUFBYSxLQUFLOzRCQUM5QixPQUFPLEtBQUssV0FBVyxLQUFLOzs7d0JBR2hDLEdBQUcsK0RBQStELFlBQU07NEJBQ3BFLElBQUksT0FBSTs0QkFDUixPQUFPOzRCQUNQLE9BQU8sTUFBTSxJQUFJOzRCQUNqQixLQUFLLGNBQWMsQ0FBQyxhQUFhOzRCQUNqQyxPQUFPLEtBQUssYUFBYSxLQUFLOzRCQUM5QixPQUFPLEtBQUssV0FBVyxLQUFLOzs7O29CQUlwQyxTQUFTLGVBQWUsWUFBTTs7d0JBRTFCLEdBQUcsdUNBQXVDLFlBQU07NEJBQzVDLElBQUksT0FBTzs7NEJBRVgsTUFBTSxRQUFRLFVBQVUsVUFBVSxJQUFJOzs0QkFFdEMsS0FBSyxjQUFjLENBQUM7NEJBQ3BCLE9BQU87NEJBQ1AsT0FBTyxRQUFRLFNBQVMsUUFBUTs7O3dCQUdwQyxHQUFHLHFDQUFxQyxZQUFNOzRCQUMxQyxJQUFJLE9BQU87Z0NBQ1AsUUFBUSxFQUFFLFNBQVM7OzRCQUV2QixjQUFjLGdCQUFnQixZQUFZLGlCQUFpQixNQUFNLE1BQU07NEJBQ3ZFLE1BQU0sUUFBUSxVQUFVLFVBQVUsSUFBSTs7NEJBRXRDLEtBQUssY0FBYyxDQUFDOzRCQUNwQixPQUFPOzs0QkFFUCxPQUFPLEtBQUssZUFBZSxRQUFRLE1BQU07NEJBQ3pDLE9BQU8sUUFBUSxTQUFTLFFBQVEsSUFBSTs7Ozs7OztHQXdCakQiLCJmaWxlIjoicGx1Z2luL1BsdWdpbkRyb3BGaWxlRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBsdWdpbk1vZHVsZSBmcm9tICdwbHVnaW4vUGx1Z2luTW9kdWxlLmpzJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdQbHVnaW5Ecm9wRmlsZURpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IGVsZW1lbnREZWZpbml0aW9uID1cbiAgICAgICAgJzxkaXYgc3AtcGx1Z2luLWRyb3AtZmlsZT48L2Rpdj4nLFxuICAgICAgICAkc2NvcGUsICRxLCAkY29tcGlsZSwgJHRpbWVvdXQsIGVsZW1lbnQsIHRlc3RTZXJ2aWNlLCBjaGFuZ2VFdmVudCwgZHJvcEV2ZW50LFxuICAgICAgICBmYWtlSnBnRmlsZSwgZmFrZVppcEZpbGUsIHBsdWdpblNlcnZpY2UsICR3aW5kb3c7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGRlZmludGlvbiA9IGVsZW1lbnREZWZpbml0aW9uKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGRlZmludGlvbik7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSwgcGx1Z2luTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkd2luZG93ID0geyBsb2NhdGlvbjogeyByZWxvYWQ6IGFuZ3VsYXIubm9vcCB9IH07XG4gICAgICAgICRwcm92aWRlLnZhbHVlKCckd2luZG93JywgJHdpbmRvdyk7XG4gICAgfSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogNyAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgXyRjb21waWxlXywgXyRxXywgXyR0aW1lb3V0XywgX3BsdWdpblNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfLCAkYW5pbWF0ZSkge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkdGltZW91dCA9IF8kdGltZW91dF87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgcGx1Z2luU2VydmljZSA9IF9wbHVnaW5TZXJ2aWNlXztcbiAgICAgICAgLy8gU2luY2Ugd2UgYXJlIG1vY2tpbmcgb3V0ICR3aW5kb3csICRhbmltYXRlIGlzIGhhdmluZyBOUEVzIGxvb2tpbmcgdXAgZG9jdW1lbnQuXG4gICAgICAgIC8vIFNvIGp1c3QgZGlzYWJsZSBhbGwgYW5pbWF0aW9ucywgd2UgZG9udCBjYXJlIGFib3V0IHRoZW0uXG4gICAgICAgICRhbmltYXRlLmVuYWJsZWQoZmFsc2UpO1xuICAgICAgICBmYWtlWmlwRmlsZSA9IHtcbiAgICAgICAgICAgIG5hbWU6ICdmYWtlWmlwRmlsZS56aXAnLFxuICAgICAgICAgICAgdHlwZTogJ2FwcGxpY2F0aW9uL3ppcCdcbiAgICAgICAgfTtcblxuICAgICAgICBmYWtlSnBnRmlsZSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnZmFrZUZpbGUuanBnJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvanBnJ1xuICAgICAgICB9O1xuICAgICAgICBkcm9wRXZlbnQgPSB7XG4gICAgICAgICAgICB0eXBlOiAnZHJvcCcsXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiB7XG4gICAgICAgICAgICAgICAgZGF0YVRyYW5zZmVyOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVzOiBbZmFrZVppcEZpbGVdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjaGFuZ2VFdmVudCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdjaGFuZ2UnLFxuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgZmlsZXM6IFtmYWtlWmlwRmlsZV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBwbHVnaW5TZXJ2aWNlLmluc3RhbGxQbHVnaW4gPSB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7fSk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ2lzIGNyZWF0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQpLm5vdC50b0JlTnVsbCgpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcuZmEtdXBsb2FkJykubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcuYm94LWRyYWduZHJvcCBzcGFuJykuaGFzQ2xhc3MoJ3RleHQtaW5mbycpKS50b0VxdWFsKHRydWUpO1xuXG4gICAgfSk7XG5cbiAgICBpdCgnY2hhbmdlcyBpbml0aWFsIHN0YXRlIHdpdGggY2hhbmdlIGV2ZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGVsZW1lbnQudHJpZ2dlckhhbmRsZXIoY2hhbmdlRXZlbnQpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcuYm94LWRyYWduZHJvcCBzcGFuJykuaGFzQ2xhc3MoJ3RleHQtc3VjY2VzcycpKS50b0VxdWFsKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NoYW5nZXMgaW5pdGlhbCBzdGF0ZSB3aXRoIGRyb3AgZXZlbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgZWxlbWVudC50cmlnZ2VySGFuZGxlcihkcm9wRXZlbnQpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcuYm94LWRyYWduZHJvcCBzcGFuJykuaGFzQ2xhc3MoJ3RleHQtc3VjY2VzcycpKS50b0VxdWFsKHRydWUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1BsdWdpbkRyb3BGaWxlRGlyZWN0aXZlQ3RybCcsICgpID0+IHtcbiAgICAgICAgbGV0ICRjb250cm9sbGVyLCBzcFRyYW5zbGF0ZUZpbHRlcjtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb250cm9sbGVyXywgXyRxXywgX3BsdWdpblNlcnZpY2VfLCBfc3BUcmFuc2xhdGVGaWx0ZXJfKSA9PiB7XG4gICAgICAgICAgICBwbHVnaW5TZXJ2aWNlID0gX3BsdWdpblNlcnZpY2VfO1xuICAgICAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIgPSBfc3BUcmFuc2xhdGVGaWx0ZXJfO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcblxuICAgICAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdQbHVnaW5Ecm9wRmlsZURpcmVjdGl2ZUN0cmwnLCB7XG4gICAgICAgICAgICAgICAgcGx1Z2luU2VydmljZTogcGx1Z2luU2VydmljZSxcbiAgICAgICAgICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlcjogc3BUcmFuc2xhdGVGaWx0ZXIsXG4gICAgICAgICAgICAgICAgJHE6ICRxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc2NyaWJlKCdmaWxlIGRyb3AnLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIGJlIGluIHRoZSBzdWNjZXNzIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsO1xuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwpLm5vdC50b0JlTnVsbCgpO1xuICAgICAgICAgICAgICAgIGN0cmwuZmlsZVN1Ym1pdHRlZChbZmFrZVppcEZpbGVdKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzSW5pdGlhbCgpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1N1Y2Nlc3MoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGJlIGluIGFuIGVycm9yIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsO1xuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwpLm5vdC50b0JlTnVsbCgpO1xuICAgICAgICAgICAgICAgIGN0cmwuZmlsZVN1Ym1pdHRlZChbZmFrZUpwZ0ZpbGVdKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc0luaXRpYWwoKSkudG9CZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNFcnJvcigpKS50b0JlKHRydWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgYmUgaW4gYW4gZXJyb3Igc3RhdGUgYWZ0ZXIgc3VibWl0dGluZyBtdWx0aXBsZSBmaWxlcycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybDtcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsKS5ub3QudG9CZU51bGwoKTtcbiAgICAgICAgICAgICAgICBjdHJsLmZpbGVTdWJtaXR0ZWQoW2Zha2VaaXBGaWxlLCBmYWtlWmlwRmlsZV0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzSW5pdGlhbCgpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc0Vycm9yKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3N1Ym1pdCBmaWxlJywgKCkgPT4ge1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJlbG9hZCB0aGUgcGFnZSB1cG9uIHN1Y2Nlc3MnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG5cbiAgICAgICAgICAgICAgICBzcHlPbigkd2luZG93LmxvY2F0aW9uLCAncmVsb2FkJykuYW5kLmNhbGxUaHJvdWdoKCk7XG5cbiAgICAgICAgICAgICAgICBjdHJsLmZpbGVTdWJtaXR0ZWQoW2Zha2VaaXBGaWxlXSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNldCB0aGUgbWVzc2FnZSB1cG9uIGVycm9yJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHsgbWVzc2FnZTogJ2FuIGVycm9yIG9jY3VycmVkJyB9O1xuXG4gICAgICAgICAgICAgICAgcGx1Z2luU2VydmljZS5pbnN0YWxsUGx1Z2luID0gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweSh0cnVlLCBudWxsLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgc3B5T24oJHdpbmRvdy5sb2NhdGlvbiwgJ3JlbG9hZCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xuXG4gICAgICAgICAgICAgICAgY3RybC5maWxlU3VibWl0dGVkKFtmYWtlWmlwRmlsZV0pO1xuICAgICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG5cbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5zdGF0dXNNZXNzYWdlKS50b0VxdWFsKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCgkd2luZG93LmxvY2F0aW9uLnJlbG9hZCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
