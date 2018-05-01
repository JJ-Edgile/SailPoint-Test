System.register(['test/js/TestInitializer', 'adminConsole/provisioningTransaction/ProvisioningTransactionModule.js', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var provisioningTransactionModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleProvisioningTransactionProvisioningTransactionModuleJs) {
            provisioningTransactionModule = _adminConsoleProvisioningTransactionProvisioningTransactionModuleJs['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('spProvisioningTransactionActionColumn', function () {

                var elementDefinition = '<sp-provisioning-transaction-action-column sp-model="item" />',
                    ProvisioningTransaction = undefined,
                    provisioningTransactionTestData = undefined,
                    $compile = undefined,
                    $scope = undefined;

                beforeEach(module(provisioningTransactionModule, testModule));

                beforeEach(inject(function (_ProvisioningTransaction_, _$compile_, _provisioningTransactionTestData_, _$rootScope_) {
                    ProvisioningTransaction = _ProvisioningTransaction_;
                    provisioningTransactionTestData = _provisioningTransactionTestData_;
                    $compile = _$compile_;
                    $scope = _$rootScope_.$new();
                }));

                function createElement(item) {
                    var element = angular.element(elementDefinition);

                    $scope.item = item;
                    $compile(element)($scope);
                    $scope.$apply();

                    return element;
                }

                function createProvisioningTransaction() {
                    return new ProvisioningTransaction(provisioningTransactionTestData.PTO1);
                }

                it('should render relevant buttons', function () {
                    var provTrans = createProvisioningTransaction(),
                        el = createElement(provTrans);

                    // find details button
                    expect(el.find('i.fa-info-circle').length).toEqual(1);
                });

                describe('ProvisioningTransactionActionColumnDirectiveCtrl', function () {

                    var provisioningTransactionService = undefined,
                        spModal = undefined,
                        $controller = undefined,
                        $q = undefined;

                    beforeEach(inject(function (_$controller_, _$q_, _provisioningTransactionService_, _spModal_) {
                        provisioningTransactionService = _provisioningTransactionService_;
                        $controller = _$controller_;
                        $q = _$q_;
                        spModal = _spModal_;
                        spyOn(provisioningTransactionService, 'retry');
                    }));

                    function createController(isAdmin, hasRights) {

                        return $controller('ProvisioningTransactionActionColumnDirectiveCtrl', {
                            provisioningTransactionService: provisioningTransactionService,
                            SP_SYSTEM_ADMIN: isAdmin,
                            FULL_PROVISIONING_TRANSACTION_ACCESS: hasRights,
                            ProvisioningTransaction: ProvisioningTransaction
                        });
                    }

                    describe('showRetry()', function () {
                        it('should return true if item allows retry and user has access', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            item.retry = true;
                            item.status = 'Pending';
                            ctrl = createController(false, true);
                            expect(ctrl.showRetry(item)).toBeTruthy();
                        });

                        it('should return true if item allows retry and user is spadmin without right', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            item.retry = true;
                            item.status = 'Pending';
                            ctrl = createController('true', false);
                            expect(ctrl.showRetry(item)).toBeTruthy();
                        });

                        it('should return false if item allows retry and user is not admin nor has access', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            item.retry = true;
                            item.status = 'Pending';
                            ctrl = createController(false, false);
                            expect(ctrl.showRetry(item)).toBeFalsy();
                        });

                        it('should return false if item does not allow retry and user has access', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            item.retry = false;
                            item.status = 'Pending';
                            ctrl = createController(false, true);
                            expect(ctrl.showRetry(item)).toBeFalsy();
                        });

                        it('should return false if item allows retry and user has access but it is not pending', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            item.retry = true;
                            ctrl = createController(false, true);
                            expect(ctrl.showRetry(item)).toBeFalsy();
                        });
                    });

                    describe('retry()', function () {

                        beforeEach(function () {
                            spyOn(provisioningTransactionService, 'reloadData');
                        });

                        it('should call the service and alert success', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction(),
                                deferred = $q.defer();
                            provisioningTransactionService.retry.and.returnValue(deferred.promise);
                            spyOn(spModal, 'open').and.returnValue({ result: deferred.promise });
                            ctrl = createController(false, true);
                            ctrl.retry(item);
                            expect(provisioningTransactionService.retry).toHaveBeenCalledWith(item.id);
                            deferred.resolve();
                            $scope.$apply();
                            expect(spModal.open).toHaveBeenCalled();
                        });

                        it('should call the service and pop up a modal on error', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction(),
                                deferred = $q.defer();
                            provisioningTransactionService.retry.and.returnValue(deferred.promise);
                            spyOn(spModal, 'open').and.returnValue({ result: deferred.promise });
                            ctrl = createController(false, true);
                            ctrl.retry(item);
                            expect(provisioningTransactionService.retry).toHaveBeenCalled();
                            deferred.reject();
                            $scope.$apply();
                            expect(spModal.open).toHaveBeenCalled();
                        });
                    });

                    describe('isOverridden()', function () {
                        it('should return false initially', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            ctrl = createController(false, true);
                            expect(ctrl.isOverridden(item)).toBeFalsy();
                        });

                        it('should return true after set', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            ctrl = createController(false, true);
                            ctrl.overridden = item;
                            expect(ctrl.isOverridden(item)).toBeTruthy();
                        });

                        it('should reset when item changes', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction(),
                                item2 = {};
                            ctrl = createController(false, true);
                            ctrl.overridden = item;
                            expect(ctrl.isOverridden(item)).toBeTruthy();
                            expect(ctrl.isOverridden(item2)).toBeFalsy();
                            expect(ctrl.isOverridden(item)).toBeFalsy();
                        });
                    });

                    describe('showOverride()', function () {
                        it('should return true if forceable', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            item.forced = false;
                            item.forceable = true;
                            item.status = 'Failed';
                            ctrl = createController(false, true);
                            expect(ctrl.showOverride(item)).toBeTruthy();
                        });

                        it('should return false if not failed', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            item.forced = false;
                            item.forceable = true;
                            item.status = 'Success';
                            ctrl = createController(false, true);
                            expect(ctrl.showOverride(item)).toBeFalsy();
                        });

                        it('should return false if already forced', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            item.forced = true;
                            item.forceable = true;
                            item.status = 'Failed';
                            ctrl = createController(false, true);
                            expect(ctrl.showOverride(item)).toBeFalsy();
                        });

                        it('should return false if not forceable', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            item.forced = false;
                            item.forceable = false;
                            item.status = 'Failed';
                            ctrl = createController(false, true);
                            expect(ctrl.showOverride(item)).toBeFalsy();
                        });
                    });

                    describe('override()', function () {
                        var $q = undefined,
                            spModal = undefined,
                            deferredDialog = undefined,
                            deferredRest = undefined,
                            modalResult = {
                            assignTo: 'selection',
                            identity: 'someId',
                            comment: 'somecomment'
                        };

                        beforeEach(inject(function (_$q_, _spModal_) {
                            $q = _$q_;
                            spModal = _spModal_;
                            spyOn(spModal, 'open');
                            deferredDialog = $q.defer();
                            deferredRest = $q.defer();
                            spyOn(provisioningTransactionService, 'showOverrideDialog').and.returnValue({
                                result: deferredDialog.promise
                            });
                            spyOn(provisioningTransactionService, 'override').and.returnValue(deferredRest.promise);
                        }));

                        it('should call dialog service and override on success', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            ctrl = createController(false, true);
                            expect(ctrl.overridden).toBeFalsy();
                            ctrl.override(item);
                            expect(provisioningTransactionService.showOverrideDialog).toHaveBeenCalled();
                            expect(provisioningTransactionService.override).not.toHaveBeenCalled();
                            deferredDialog.resolve(modalResult);
                            $scope.$apply();
                            expect(provisioningTransactionService.override).toHaveBeenCalledWith(item.id, 'selection', 'somecomment');
                            expect(ctrl.overridden).toBeTruthy();
                        });

                        it('should call dialog service and not override on dismiss', function () {
                            var ctrl = undefined,
                                item = createProvisioningTransaction();
                            ctrl = createController(false, true);
                            expect(ctrl.overridden).toBeFalsy();
                            ctrl.override(item);
                            expect(provisioningTransactionService.showOverrideDialog).toHaveBeenCalled();
                            expect(provisioningTransactionService.override).not.toHaveBeenCalled();
                            deferredDialog.reject();
                            $scope.$apply();
                            expect(provisioningTransactionService.override).not.toHaveBeenCalled();
                            expect(ctrl.overridden).toBeFalsy();
                        });
                    });

                    describe('showDetails', function () {

                        it('should call the provisioning transaction service', function () {
                            var ctrl = createController(false, false),
                                item = createProvisioningTransaction();

                            spyOn(provisioningTransactionService, 'openDetailsDialog');

                            ctrl.showDetails(item);

                            expect(provisioningTransactionService.openDetailsDialog).toHaveBeenCalledWith(item);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbkFjdGlvbkNvbHVtbkRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5RUFBeUUsdUJBQXVCLFVBQVUsU0FBUzs7O0lBRzNKOztJQUVBLElBQUksK0JBQStCO0lBQ25DLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHFFQUFxRTtZQUMzSCxnQ0FBZ0Msb0VBQW9FO1dBQ3JHLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMseUNBQXlDLFlBQU07O2dCQUVwRCxJQUFJLG9CQUFpQjtvQkFDakIsMEJBQXVCO29CQUFFLGtDQUErQjtvQkFBRSxXQUFRO29CQUFFLFNBQU07O2dCQUU5RSxXQUFXLE9BQU8sK0JBQStCOztnQkFFakQsV0FBVyxPQUFPLFVBQUMsMkJBQTJCLFlBQzNCLG1DQUFtQyxjQUFpQjtvQkFDbkUsMEJBQTBCO29CQUMxQixrQ0FBa0M7b0JBQ2xDLFdBQVc7b0JBQ1gsU0FBUyxhQUFhOzs7Z0JBRzFCLFNBQVMsY0FBYyxNQUFNO29CQUN6QixJQUFJLFVBQVUsUUFBUSxRQUFROztvQkFFOUIsT0FBTyxPQUFPO29CQUNkLFNBQVMsU0FBUztvQkFDbEIsT0FBTzs7b0JBRVAsT0FBTzs7O2dCQUdYLFNBQVMsZ0NBQWdDO29CQUNyQyxPQUFPLElBQUksd0JBQXdCLGdDQUFnQzs7O2dCQUd2RSxHQUFHLGtDQUFrQyxZQUFNO29CQUN2QyxJQUFJLFlBQVk7d0JBQ1osS0FBSyxjQUFjOzs7b0JBR3ZCLE9BQU8sR0FBRyxLQUFLLG9CQUFvQixRQUFRLFFBQVE7OztnQkFJdkQsU0FBUyxvREFBb0QsWUFBTTs7b0JBRS9ELElBQUksaUNBQThCO3dCQUFFLFVBQU87d0JBQUUsY0FBVzt3QkFB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eUMzRiIsImZpbGUiOiJhZG1pbkNvbnNvbGUvcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24vUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25BY3Rpb25Db2x1bW5EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwcm92aXNpb25pbmdUcmFuc2FjdGlvbk1vZHVsZSBmcm9tICdhZG1pbkNvbnNvbGUvcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24vUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25Nb2R1bGUuanMnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ3NwUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25BY3Rpb25Db2x1bW4nLCAoKSA9PiB7XG5cbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPSBgPHNwLXByb3Zpc2lvbmluZy10cmFuc2FjdGlvbi1hY3Rpb24tY29sdW1uIHNwLW1vZGVsPVwiaXRlbVwiIC8+YCxcbiAgICAgICAgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24sIHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uVGVzdERhdGEsICRjb21waWxlLCAkc2NvcGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwcm92aXNpb25pbmdUcmFuc2FjdGlvbk1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbl8sIF8kY29tcGlsZV8sXG4gICAgICAgICAgICAgICAgICAgICAgIF9wcm92aXNpb25pbmdUcmFuc2FjdGlvblRlc3REYXRhXywgXyRyb290U2NvcGVfKSA9PiB7XG4gICAgICAgIFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uID0gX1Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uXztcbiAgICAgICAgcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25UZXN0RGF0YSA9IF9wcm92aXNpb25pbmdUcmFuc2FjdGlvblRlc3REYXRhXztcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoaXRlbSkge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XG5cbiAgICAgICAgJHNjb3BlLml0ZW0gPSBpdGVtO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24ocHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25UZXN0RGF0YS5QVE8xKTtcbiAgICB9XG5cbiAgICBpdCgnc2hvdWxkIHJlbmRlciByZWxldmFudCBidXR0b25zJywgKCkgPT4ge1xuICAgICAgICBsZXQgcHJvdlRyYW5zID0gY3JlYXRlUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oKSxcbiAgICAgICAgICAgIGVsID0gY3JlYXRlRWxlbWVudChwcm92VHJhbnMpO1xuXG4gICAgICAgIC8vIGZpbmQgZGV0YWlscyBidXR0b25cbiAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ2kuZmEtaW5mby1jaXJjbGUnKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdQcm92aXNpb25pbmdUcmFuc2FjdGlvbkFjdGlvbkNvbHVtbkRpcmVjdGl2ZUN0cmwnLCAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZSwgc3BNb2RhbCwgJGNvbnRyb2xsZXIsICRxO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJGNvbnRyb2xsZXJfLCBfJHFfLCBfcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlXywgX3NwTW9kYWxfKSA9PiB7XG4gICAgICAgICAgICBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UgPSBfcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlXztcbiAgICAgICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgICAgICRxID0gXyRxXztcbiAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICAgICBzcHlPbihwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UsICdyZXRyeScpO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihpc0FkbWluLCBoYXNSaWdodHMpIHtcblxuICAgICAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdQcm92aXNpb25pbmdUcmFuc2FjdGlvbkFjdGlvbkNvbHVtbkRpcmVjdGl2ZUN0cmwnLCB7XG4gICAgICAgICAgICAgICAgcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlOiBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgU1BfU1lTVEVNX0FETUlOOiBpc0FkbWluLFxuICAgICAgICAgICAgICAgIEZVTExfUFJPVklTSU9OSU5HX1RSQU5TQUNUSU9OX0FDQ0VTUzogaGFzUmlnaHRzLFxuICAgICAgICAgICAgICAgIFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uOiBQcm92aXNpb25pbmdUcmFuc2FjdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBkZXNjcmliZSgnc2hvd1JldHJ5KCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGl0ZW0gYWxsb3dzIHJldHJ5IGFuZCB1c2VyIGhhcyBhY2Nlc3MnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwsIGl0ZW0gPSBjcmVhdGVQcm92aXNpb25pbmdUcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgICAgIGl0ZW0ucmV0cnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGl0ZW0uc3RhdHVzID0gJ1BlbmRpbmcnO1xuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5zaG93UmV0cnkoaXRlbSkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGl0ZW0gYWxsb3dzIHJldHJ5IGFuZCB1c2VyIGlzIHNwYWRtaW4gd2l0aG91dCByaWdodCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCwgaXRlbSA9IGNyZWF0ZVByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgaXRlbS5yZXRyeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaXRlbS5zdGF0dXMgPSAnUGVuZGluZyc7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoJ3RydWUnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd1JldHJ5KGl0ZW0pKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgaXRlbSBhbGxvd3MgcmV0cnkgYW5kIHVzZXIgaXMgbm90IGFkbWluIG5vciBoYXMgYWNjZXNzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsLCBpdGVtID0gY3JlYXRlUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBpdGVtLnJldHJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpdGVtLnN0YXR1cyA9ICdQZW5kaW5nJztcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dSZXRyeShpdGVtKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgaXRlbSBkb2VzIG5vdCBhbGxvdyByZXRyeSBhbmQgdXNlciBoYXMgYWNjZXNzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsLCBpdGVtID0gY3JlYXRlUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBpdGVtLnJldHJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaXRlbS5zdGF0dXMgPSAnUGVuZGluZyc7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dSZXRyeShpdGVtKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgaXRlbSBhbGxvd3MgcmV0cnkgYW5kIHVzZXIgaGFzIGFjY2VzcyBidXQgaXQgaXMgbm90IHBlbmRpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwsIGl0ZW0gPSBjcmVhdGVQcm92aXNpb25pbmdUcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgICAgIGl0ZW0ucmV0cnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5zaG93UmV0cnkoaXRlbSkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdyZXRyeSgpJywgKCkgPT4ge1xuXG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzcHlPbihwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UsICdyZWxvYWREYXRhJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRoZSBzZXJ2aWNlIGFuZCBhbGVydCBzdWNjZXNzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsLCBpdGVtID0gY3JlYXRlUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oKSwgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgICAgIHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5yZXRyeS5hbmQucmV0dXJuVmFsdWUoZGVmZXJyZWQucHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoe3Jlc3VsdDogZGVmZXJyZWQucHJvbWlzZX0pO1xuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBjdHJsLnJldHJ5KGl0ZW0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UucmV0cnkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aGUgc2VydmljZSBhbmQgcG9wIHVwIGEgbW9kYWwgb24gZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwsIGl0ZW0gPSBjcmVhdGVQcm92aXNpb25pbmdUcmFuc2FjdGlvbigpLCBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLnJldHJ5LmFuZC5yZXR1cm5WYWx1ZShkZWZlcnJlZC5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7cmVzdWx0OiBkZWZlcnJlZC5wcm9taXNlfSk7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIGN0cmwucmV0cnkoaXRlbSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5yZXRyeSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2lzT3ZlcnJpZGRlbigpJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaW5pdGlhbGx5JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsLCBpdGVtID0gY3JlYXRlUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNPdmVycmlkZGVuKGl0ZW0pKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGFmdGVyIHNldCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCwgaXRlbSA9IGNyZWF0ZVByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIGN0cmwub3ZlcnJpZGRlbiA9IGl0ZW07XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNPdmVycmlkZGVuKGl0ZW0pKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXNldCB3aGVuIGl0ZW0gY2hhbmdlcycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCwgaXRlbSA9IGNyZWF0ZVByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uKCksIGl0ZW0yID0ge307XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIGN0cmwub3ZlcnJpZGRlbiA9IGl0ZW07XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNPdmVycmlkZGVuKGl0ZW0pKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNPdmVycmlkZGVuKGl0ZW0yKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNPdmVycmlkZGVuKGl0ZW0pKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnc2hvd092ZXJyaWRlKCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGZvcmNlYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCwgaXRlbSA9IGNyZWF0ZVByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JjZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpdGVtLmZvcmNlYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaXRlbS5zdGF0dXMgPSAnRmFpbGVkJztcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd092ZXJyaWRlKGl0ZW0pKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgbm90IGZhaWxlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCwgaXRlbSA9IGNyZWF0ZVByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JjZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpdGVtLmZvcmNlYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaXRlbS5zdGF0dXMgPSAnU3VjY2Vzcyc7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dPdmVycmlkZShpdGVtKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgYWxyZWFkeSBmb3JjZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwsIGl0ZW0gPSBjcmVhdGVQcm92aXNpb25pbmdUcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9yY2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpdGVtLmZvcmNlYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaXRlbS5zdGF0dXMgPSAnRmFpbGVkJztcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd092ZXJyaWRlKGl0ZW0pKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBub3QgZm9yY2VhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsLCBpdGVtID0gY3JlYXRlUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBpdGVtLmZvcmNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9yY2VhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaXRlbS5zdGF0dXMgPSAnRmFpbGVkJztcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd092ZXJyaWRlKGl0ZW0pKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnb3ZlcnJpZGUoKScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCAkcSwgc3BNb2RhbCwgZGVmZXJyZWREaWFsb2csIGRlZmVycmVkUmVzdCwgbW9kYWxSZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2lnblRvOiAnc2VsZWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHk6ICdzb21lSWQnLFxuICAgICAgICAgICAgICAgICAgICBjb21tZW50OiAnc29tZWNvbW1lbnQnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRxXywgX3NwTW9kYWxfKSA9PiB7XG4gICAgICAgICAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZERpYWxvZyA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWRSZXN0ID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICBzcHlPbihwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UsICdzaG93T3ZlcnJpZGVEaWFsb2cnKS5hbmQucmV0dXJuVmFsdWUoe1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IGRlZmVycmVkRGlhbG9nLnByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3B5T24ocHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLCAnb3ZlcnJpZGUnKS5hbmQucmV0dXJuVmFsdWUoZGVmZXJyZWRSZXN0LnByb21pc2UpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZGlhbG9nIHNlcnZpY2UgYW5kIG92ZXJyaWRlIG9uIHN1Y2Nlc3MnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwsIGl0ZW0gPSBjcmVhdGVQcm92aXNpb25pbmdUcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5vdmVycmlkZGVuKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgICAgICBjdHJsLm92ZXJyaWRlKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2Uuc2hvd092ZXJyaWRlRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5vdmVycmlkZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZERpYWxvZy5yZXNvbHZlKG1vZGFsUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5vdmVycmlkZSlcbiAgICAgICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0uaWQsICdzZWxlY3Rpb24nLCAnc29tZWNvbW1lbnQnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5vdmVycmlkZGVuKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGRpYWxvZyBzZXJ2aWNlIGFuZCBub3Qgb3ZlcnJpZGUgb24gZGlzbWlzcycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCwgaXRlbSA9IGNyZWF0ZVByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLm92ZXJyaWRkZW4pLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgICAgIGN0cmwub3ZlcnJpZGUoaXRlbSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5zaG93T3ZlcnJpZGVEaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLm92ZXJyaWRlKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkRGlhbG9nLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLm92ZXJyaWRlKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLm92ZXJyaWRkZW4pLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdzaG93RGV0YWlscycsICgpID0+IHtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRoZSBwcm92aXNpb25pbmcgdHJhbnNhY3Rpb24gc2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIGZhbHNlKSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZVByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICBzcHlPbihwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UsICdvcGVuRGV0YWlsc0RpYWxvZycpO1xuXG4gICAgICAgICAgICAgICAgY3RybC5zaG93RGV0YWlscyhpdGVtKTtcblxuICAgICAgICAgICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2Uub3BlbkRldGFpbHNEaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
