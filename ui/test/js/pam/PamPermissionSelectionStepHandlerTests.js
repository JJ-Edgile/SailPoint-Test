System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    /**
     * Tests for the PamPermissionSelectionStepHandler.
     */
    'use strict';

    var pamModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('PamPermissionSelectionStepHandler', function () {

                var pamActionsService = undefined,
                    $q = undefined,
                    PamPermissionSelectionStepHandler = undefined,
                    SelectionModel = undefined,
                    handler = undefined,
                    pamPermissionService = undefined,
                    testService = undefined,
                    $scope = undefined,
                    $rootScope = undefined;

                // Load the test module to get the testService and access request module.
                beforeEach(module(testModule, pamModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 11 */
                beforeEach(inject(function (_$q_, _pamActionsService_, _SelectionModel_, _PamPermissionSelectionStepHandler_, _pamPermissionService_, _testService_, _$rootScope_) {

                    SelectionModel = _SelectionModel_;
                    PamPermissionSelectionStepHandler = _PamPermissionSelectionStepHandler_;
                    pamActionsService = _pamActionsService_;
                    pamPermissionService = _pamPermissionService_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;
                    $scope = $rootScope.$new();
                    spyOn(pamPermissionService, 'getPermissions').and.callFake(function () {
                        return testService.createPromise(false, {
                            data: []
                        }, {});
                    });
                    handler = new PamPermissionSelectionStepHandler($q, pamPermissionService, pamActionsService, {}, SelectionModel);
                }));

                describe('togglePermissionSelection', function () {

                    it('adds a permission to the selectionModel', function () {
                        var permission = 'Add Identity';
                        handler.permissionSelectionModel.clear();
                        expect(handler.isSaveDisabled()).toEqual(true);
                        handler.togglePermissionSelection(permission);
                        expect(handler.permissionSelectionModel.getSelections().length).toEqual(1);
                        expect(handler.isSaveDisabled()).toEqual(false);
                    });
                });

                describe('save', function () {
                    it('should call pamActionsService.provisionIdentities()', function () {

                        spyOn(pamActionsService, 'provisionIdentities').and.callFake(function () {
                            return testService.createPromise(false, {
                                data: []
                            }, {});
                        });

                        handler.save();
                        $scope.$apply();
                        expect(pamActionsService.provisionIdentities).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1QZXJtaXNzaW9uU2VsZWN0aW9uU3RlcEhhbmRsZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsaUJBQWlCLHVCQUF1QixVQUFVLFNBQVM7Ozs7Ozs7O0lBUW5HOztJQUVBLElBQUksV0FBVztJQUNmLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGVBQWU7WUFDckUsWUFBWSxjQUFjO1dBQzNCLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7WUFON0IsU0FBUyxxQ0FBcUMsWUFBVzs7Z0JBRXJELElBQUksb0JBQWlCO29CQUFFLEtBQUU7b0JBQUUsb0NBQWlDO29CQUFFLGlCQUFjO29CQUFFLFVBQU87b0JBQUUsdUJBQW9CO29CQUN2RyxjQUFXO29CQUFFLFNBQU07b0JBQUUsYUFBVTs7O2dCQUduQyxXQUFXLE9BQU8sWUFBWTs7Ozs7O2dCQU05QixXQUFXLE9BQU8sVUFBUyxNQUFNLHFCQUFxQixrQkFBa0IscUNBQzdDLHdCQUF3QixlQUFlLGNBQWM7O29CQUU1RSxpQkFBaUI7b0JBQ2pCLG9DQUFvQztvQkFDcEMsb0JBQW9CO29CQUNwQix1QkFBdUI7b0JBQ3ZCLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixTQUFTLFdBQVc7b0JBQ3BCLE1BQU0sc0JBQXNCLGtCQUFrQixJQUFJLFNBQVMsWUFBVzt3QkFDbEUsT0FBTyxZQUFZLGNBQWMsT0FBTzs0QkFDcEMsTUFBTTsyQkFDUDs7b0JBRVAsVUFBVSxJQUFJLGtDQUFrQyxJQUFJLHNCQUFzQixtQkFBbUIsSUFDekY7OztnQkFHUixTQUFTLDZCQUE2QixZQUFXOztvQkFFN0MsR0FBRywyQ0FBMkMsWUFBVzt3QkFDckQsSUFBTSxhQUFhO3dCQUNuQixRQUFRLHlCQUF5Qjt3QkFDakMsT0FBTyxRQUFRLGtCQUFrQixRQUFRO3dCQUN6QyxRQUFRLDBCQUEwQjt3QkFDbEMsT0FBTyxRQUFRLHlCQUF5QixnQkFBZ0IsUUFBUSxRQUFRO3dCQUN4RSxPQUFPLFFBQVEsa0JBQWtCLFFBQVE7Ozs7Z0JBSWpELFNBQVMsUUFBUSxZQUFXO29CQUN4QixHQUFHLHVEQUF1RCxZQUFXOzt3QkFFakUsTUFBTSxtQkFBbUIsdUJBQXVCLElBQUksU0FBUyxZQUFXOzRCQUNwRSxPQUFPLFlBQVksY0FBYyxPQUFPO2dDQUNwQyxNQUFNOytCQUNQOzs7d0JBR1AsUUFBUTt3QkFDUixPQUFPO3dCQUNQLE9BQU8sa0JBQWtCLHFCQUFxQjs7Ozs7O0dBa0J2RCIsImZpbGUiOiJwYW0vUGFtUGVybWlzc2lvblNlbGVjdGlvblN0ZXBIYW5kbGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwYW1Nb2R1bGUgZnJvbSAncGFtL1BhbU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBQYW1QZXJtaXNzaW9uU2VsZWN0aW9uU3RlcEhhbmRsZXIuXG4gKi9cbmRlc2NyaWJlKCdQYW1QZXJtaXNzaW9uU2VsZWN0aW9uU3RlcEhhbmRsZXInLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBwYW1BY3Rpb25zU2VydmljZSwgJHEsIFBhbVBlcm1pc3Npb25TZWxlY3Rpb25TdGVwSGFuZGxlciwgU2VsZWN0aW9uTW9kZWwsIGhhbmRsZXIsIHBhbVBlcm1pc3Npb25TZXJ2aWNlLFxuICAgICAgICB0ZXN0U2VydmljZSwgJHNjb3BlLCAkcm9vdFNjb3BlO1xuXG4gICAgLy8gTG9hZCB0aGUgdGVzdCBtb2R1bGUgdG8gZ2V0IHRoZSB0ZXN0U2VydmljZSBhbmQgYWNjZXNzIHJlcXVlc3QgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIHBhbU1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogSW5qZWN0IHRoZSBkZXBlbmRlbmNpZXMgYW5kIHNldHVwIG1vY2tzLlxuICAgICAqL1xuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDExICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRxXywgX3BhbUFjdGlvbnNTZXJ2aWNlXywgX1NlbGVjdGlvbk1vZGVsXywgX1BhbVBlcm1pc3Npb25TZWxlY3Rpb25TdGVwSGFuZGxlcl8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BhbVBlcm1pc3Npb25TZXJ2aWNlXywgX3Rlc3RTZXJ2aWNlXywgXyRyb290U2NvcGVfKSB7XG5cbiAgICAgICAgU2VsZWN0aW9uTW9kZWwgPSBfU2VsZWN0aW9uTW9kZWxfO1xuICAgICAgICBQYW1QZXJtaXNzaW9uU2VsZWN0aW9uU3RlcEhhbmRsZXIgPSBfUGFtUGVybWlzc2lvblNlbGVjdGlvblN0ZXBIYW5kbGVyXztcbiAgICAgICAgcGFtQWN0aW9uc1NlcnZpY2UgPSBfcGFtQWN0aW9uc1NlcnZpY2VfO1xuICAgICAgICBwYW1QZXJtaXNzaW9uU2VydmljZSA9IF9wYW1QZXJtaXNzaW9uU2VydmljZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgIHNweU9uKHBhbVBlcm1pc3Npb25TZXJ2aWNlLCAnZ2V0UGVybWlzc2lvbnMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwge1xuICAgICAgICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIH0pO1xuICAgICAgICBoYW5kbGVyID0gbmV3IFBhbVBlcm1pc3Npb25TZWxlY3Rpb25TdGVwSGFuZGxlcigkcSwgcGFtUGVybWlzc2lvblNlcnZpY2UsIHBhbUFjdGlvbnNTZXJ2aWNlLCB7fSxcbiAgICAgICAgICAgIFNlbGVjdGlvbk1vZGVsKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgndG9nZ2xlUGVybWlzc2lvblNlbGVjdGlvbicsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdhZGRzIGEgcGVybWlzc2lvbiB0byB0aGUgc2VsZWN0aW9uTW9kZWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IHBlcm1pc3Npb24gPSAnQWRkIElkZW50aXR5JztcbiAgICAgICAgICAgIGhhbmRsZXIucGVybWlzc2lvblNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgaGFuZGxlci50b2dnbGVQZXJtaXNzaW9uU2VsZWN0aW9uKHBlcm1pc3Npb24pO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIucGVybWlzc2lvblNlbGVjdGlvbk1vZGVsLmdldFNlbGVjdGlvbnMoKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2F2ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgcGFtQWN0aW9uc1NlcnZpY2UucHJvdmlzaW9uSWRlbnRpdGllcygpJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHNweU9uKHBhbUFjdGlvbnNTZXJ2aWNlLCAncHJvdmlzaW9uSWRlbnRpdGllcycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBoYW5kbGVyLnNhdmUoKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChwYW1BY3Rpb25zU2VydmljZS5wcm92aXNpb25JZGVudGl0aWVzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
