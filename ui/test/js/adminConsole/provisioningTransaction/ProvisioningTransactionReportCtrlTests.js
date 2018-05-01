System.register(['test/js/TestInitializer', 'adminConsole/provisioningTransaction/ProvisioningTransactionModule.js', 'common/util/UtilModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var provisioningTransactionModule, utilModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleProvisioningTransactionProvisioningTransactionModuleJs) {
            provisioningTransactionModule = _adminConsoleProvisioningTransactionProvisioningTransactionModuleJs['default'];
        }, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('ProvisioningTransactionReportCtrl', function () {

                var provisioningTransactionService = undefined,
                    testService = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    spModal = undefined,
                    navigationService = undefined,
                    taskResultId = 1234;

                beforeEach(module(provisioningTransactionModule, utilModule, testModule));

                /* jshint maxparams:8 */
                beforeEach(inject(function (_provisioningTransactionService_, _navigationService_, _testService_, _$controller_, _$rootScope_, _spModal_) {

                    provisioningTransactionService = _provisioningTransactionService_;
                    testService = _testService_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    spModal = _spModal_;
                    navigationService = _navigationService_;
                }));

                beforeEach(function () {
                    spyOn(provisioningTransactionService, 'runReport').and.returnValue(testService.createPromise(false, taskResultId));
                });

                function createController() {
                    return $controller('ProvisioningTransactionReportCtrl', {
                        provisioningTransactionService: provisioningTransactionService,
                        navigationService: navigationService,
                        filterValues: undefined,
                        sortOrder: undefined,
                        status: undefined
                    });
                }

                describe('controller init', function () {
                    it('should init the variables', function () {
                        var ctrl = createController();

                        expect(ctrl.taskResultId).not.toBeDefined();
                        expect(ctrl.isTaskResultIdDefined()).toBe(false);
                    });

                    it('should populate taskResultId', function () {
                        var ctrl = createController();
                        spyOn(ctrl, 'populateTaskResultId');
                        ctrl.populateTaskResultId();

                        $rootScope.$apply();

                        expect(provisioningTransactionService.runReport).toHaveBeenCalled();
                        expect(ctrl.populateTaskResultId).toHaveBeenCalled();
                        expect(ctrl.isTaskResultIdDefined()).toBe(true);
                        expect(ctrl.taskResultId).toEqual(taskResultId);
                    });
                });

                describe('email notification', function () {
                    it('should call the service', function () {
                        var ctrl = createController();
                        ctrl.populateTaskResultId();
                        $rootScope.$apply();
                        spyOn(spModal, 'closeAll');
                        spyOn(ctrl, 'onEmailNotificationPress').and.callThrough();
                        spyOn(provisioningTransactionService, 'addEmailNotification');
                        ctrl.onEmailNotificationPress();

                        expect(ctrl.onEmailNotificationPress).toHaveBeenCalled();
                        expect(provisioningTransactionService.addEmailNotification).toHaveBeenCalledWith(taskResultId);
                        expect(spModal.closeAll).toHaveBeenCalled();
                    });
                });

                describe('view report', function () {

                    it('should call the service', function () {
                        var ctrl = createController();
                        spyOn(ctrl, 'onViewReportPress').and.callThrough();
                        spyOn(navigationService, 'go').and.returnValue(testService.createPromise(false, { count: 0, objects: [] }));
                        ctrl.populateTaskResultId();
                        $rootScope.$apply();
                        ctrl.onViewReportPress();

                        expect(ctrl.onViewReportPress).toHaveBeenCalled();
                        expect(navigationService.go).toHaveBeenCalledWith({ url: '../analyze/reports/viewResult.jsf?id=' + taskResultId });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvblJlcG9ydEN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUVBQXlFLDBCQUEwQix1QkFBdUIsVUFBVSxTQUFTOzs7SUFHckw7O0lBRUEsSUFBSSwrQkFBK0IsWUFBWTtJQUMvQyxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxxRUFBcUU7WUFDM0gsZ0NBQWdDLG9FQUFvRTtXQUNyRyxVQUFVLHVCQUF1QjtZQUNoQyxhQUFhLHNCQUFzQjtXQUNwQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQVA3QixTQUFTLHFDQUFxQyxZQUFNOztnQkFFaEQsSUFBSSxpQ0FBOEI7b0JBQzlCLGNBQVc7b0JBQUUsY0FBVztvQkFBRSxhQUFVO29CQUFFLFVBQU87b0JBQUUsb0JBQWlCO29CQUNoRSxlQUFlOztnQkFFbkIsV0FBVyxPQUFPLCtCQUErQixZQUMvQjs7O2dCQUdsQixXQUFXLE9BQU8sVUFBQyxrQ0FBa0MscUJBQzdDLGVBQWUsZUFBZSxjQUFjLFdBQWM7O29CQUU5RCxpQ0FBaUM7b0JBQ2pDLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxhQUFhO29CQUNiLFVBQVU7b0JBQ1Ysb0JBQW9COzs7Z0JBR3hCLFdBQVcsWUFBTTtvQkFDYixNQUFNLGdDQUFnQyxhQUFhLElBQUksWUFDbkQsWUFBWSxjQUFjLE9BQU87OztnQkFLekMsU0FBUyxtQkFBbUI7b0JBQ3hCLE9BQU8sWUFBWSxxQ0FBcUM7d0JBQ3BELGdDQUFnQzt3QkFDaEMsbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLFdBQVc7d0JBQ1gsUUFBUTs7OztnQkFJaEIsU0FBUyxtQkFBbUIsWUFBTTtvQkFDOUIsR0FBRyw2QkFBNkIsWUFBTTt3QkFDbEMsSUFBSSxPQUFPOzt3QkFFWCxPQUFPLEtBQUssY0FBYyxJQUFJO3dCQUM5QixPQUFPLEtBQUsseUJBQXlCLEtBQUs7OztvQkFHOUMsR0FBRyxnQ0FBZ0MsWUFBTTt3QkFDckMsSUFBSSxPQUFPO3dCQUNYLE1BQU0sTUFBTTt3QkFDWixLQUFLOzt3QkFFTCxXQUFXOzt3QkFFWCxPQUFPLCtCQUErQixXQUFXO3dCQUNqRCxPQUFPLEtBQUssc0JBQXNCO3dCQUNsQyxPQUFPLEtBQUsseUJBQXlCLEtBQUs7d0JBQzFDLE9BQU8sS0FBSyxjQUFjLFFBQVE7Ozs7Z0JBSzFDLFNBQVMsc0JBQXNCLFlBQU07b0JBQ2pDLEdBQUcsMkJBQTJCLFlBQU07d0JBQ2hDLElBQUksT0FBTzt3QkFDWCxLQUFLO3dCQUNMLFdBQVc7d0JBQ1gsTUFBTSxTQUFTO3dCQUNmLE1BQU0sTUFBTSw0QkFBNEIsSUFBSTt3QkFDNUMsTUFBTSxnQ0FBZ0M7d0JBQ3RDLEtBQUs7O3dCQUdMLE9BQU8sS0FBSywwQkFBMEI7d0JBQ3RDLE9BQU8sK0JBQStCLHNCQUFzQixxQkFBcUI7d0JBQ2pGLE9BQU8sUUFBUSxVQUFVOzs7O2dCQUlqQyxTQUFTLGVBQWUsWUFBTTs7b0JBRTFCLEdBQUcsMkJBQTJCLFlBQU07d0JBQ2hDLElBQUksT0FBTzt3QkFDWCxNQUFNLE1BQU0scUJBQXFCLElBQUk7d0JBQ3JDLE1BQU0sbUJBQW1CLE1BQU0sSUFBSSxZQUMvQixZQUFZLGNBQWMsT0FBTyxFQUFFLE9BQU8sR0FBRyxTQUFTO3dCQUUxRCxLQUFLO3dCQUNMLFdBQVc7d0JBQ1gsS0FBSzs7d0JBR0wsT0FBTyxLQUFLLG1CQUFtQjt3QkFDL0IsT0FBTyxrQkFBa0IsSUFBSSxxQkFDekIsRUFBQyxLQUFLLDBDQUEwQzs7Ozs7O0dBUTdEIiwiZmlsZSI6ImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvblJlcG9ydEN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwcm92aXNpb25pbmdUcmFuc2FjdGlvbk1vZHVsZSBmcm9tICdhZG1pbkNvbnNvbGUvcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24vUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25Nb2R1bGUuanMnO1xuaW1wb3J0IHV0aWxNb2R1bGUgZnJvbSAnY29tbW9uL3V0aWwvVXRpbE1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25SZXBvcnRDdHJsJywgKCkgPT4ge1xuXG4gICAgbGV0IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZSxcbiAgICAgICAgdGVzdFNlcnZpY2UsICRjb250cm9sbGVyLCAkcm9vdFNjb3BlLCBzcE1vZGFsLCBuYXZpZ2F0aW9uU2VydmljZSxcbiAgICAgICAgdGFza1Jlc3VsdElkID0gMTIzNDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uTW9kdWxlLCB1dGlsTW9kdWxlLFxuICAgICAgICAgICAgICAgICAgICAgIHRlc3RNb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6OCAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlXywgX25hdmlnYXRpb25TZXJ2aWNlXyxcbiAgICAgICAgICAgIF90ZXN0U2VydmljZV8sIF8kY29udHJvbGxlcl8sIF8kcm9vdFNjb3BlXywgX3NwTW9kYWxfKSA9PiB7XG5cbiAgICAgICAgcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlID0gX3Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICBuYXZpZ2F0aW9uU2VydmljZSA9IF9uYXZpZ2F0aW9uU2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHNweU9uKHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZSwgJ3J1blJlcG9ydCcpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIHRhc2tSZXN1bHRJZClcbiAgICAgICAgKTtcbiAgICB9KTtcblxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdQcm92aXNpb25pbmdUcmFuc2FjdGlvblJlcG9ydEN0cmwnLCB7XG4gICAgICAgICAgICBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2U6IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZSxcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlOiBuYXZpZ2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgIGZpbHRlclZhbHVlczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc29ydE9yZGVyOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdGF0dXM6IHVuZGVmaW5lZFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnY29udHJvbGxlciBpbml0JywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGluaXQgdGhlIHZhcmlhYmxlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC50YXNrUmVzdWx0SWQpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNUYXNrUmVzdWx0SWREZWZpbmVkKCkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHBvcHVsYXRlIHRhc2tSZXN1bHRJZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgc3B5T24oY3RybCwgJ3BvcHVsYXRlVGFza1Jlc3VsdElkJyk7XG4gICAgICAgICAgICBjdHJsLnBvcHVsYXRlVGFza1Jlc3VsdElkKCk7XG5cbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UucnVuUmVwb3J0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5wb3B1bGF0ZVRhc2tSZXN1bHRJZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNUYXNrUmVzdWx0SWREZWZpbmVkKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC50YXNrUmVzdWx0SWQpLnRvRXF1YWwodGFza1Jlc3VsdElkKTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdlbWFpbCBub3RpZmljYXRpb24nLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aGUgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC5wb3B1bGF0ZVRhc2tSZXN1bHRJZCgpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdjbG9zZUFsbCcpO1xuICAgICAgICAgICAgc3B5T24oY3RybCwgJ29uRW1haWxOb3RpZmljYXRpb25QcmVzcycpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgICAgICAgICAgc3B5T24ocHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLCAnYWRkRW1haWxOb3RpZmljYXRpb24nKTtcbiAgICAgICAgICAgIGN0cmwub25FbWFpbE5vdGlmaWNhdGlvblByZXNzKCk7XG5cblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwub25FbWFpbE5vdGlmaWNhdGlvblByZXNzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmFkZEVtYWlsTm90aWZpY2F0aW9uKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0YXNrUmVzdWx0SWQpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwuY2xvc2VBbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndmlldyByZXBvcnQnLCAoKSA9PiB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRoZSBzZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnb25WaWV3UmVwb3J0UHJlc3MnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgIHNweU9uKG5hdmlnYXRpb25TZXJ2aWNlLCAnZ28nKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgeyBjb3VudDogMCwgb2JqZWN0czogW10gfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjdHJsLnBvcHVsYXRlVGFza1Jlc3VsdElkKCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgY3RybC5vblZpZXdSZXBvcnRQcmVzcygpO1xuXG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLm9uVmlld1JlcG9ydFByZXNzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICAgIHt1cmw6ICcuLi9hbmFseXplL3JlcG9ydHMvdmlld1Jlc3VsdC5qc2Y/aWQ9JyArIHRhc2tSZXN1bHRJZH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
