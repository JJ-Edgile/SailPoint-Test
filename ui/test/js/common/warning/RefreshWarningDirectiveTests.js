System.register(['test/js/TestInitializer', 'common/warning/WarningModule'], function (_export) {
    'use strict';

    var warningModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonWarningWarningModule) {
            warningModule = _commonWarningWarningModule['default'];
        }],
        execute: function () {

            describe('RefreshWarningDirective', function () {
                var element, $scope, $window, $compile;

                //returns dom code for an sp-refresh-warning element
                function getElementDefintion(msg) {
                    return angular.isDefined(msg) ? '<sp-refresh-warning sp-warning-message="' + msg + '"/>' : '<sp-refresh-warning />';
                }

                beforeEach(module(warningModule));
                beforeEach(inject(function (_$compile_, $rootScope, _$window_) {
                    $scope = $rootScope;
                    $compile = _$compile_;
                    $window = _$window_;

                    element = angular.element(getElementDefintion());
                    //add element to the dom
                    element.appendTo(document.body);
                    $compile(element)($scope);
                    $scope.$apply();
                }));

                it('should define onbeforeunload when placed in the dom', function () {
                    expect($window.onbeforeunload).toBeDefined();
                    expect(typeof $window.onbeforeunload).toEqual('function');
                    expect($window.onbeforeunload()).toEqual('#{msgs.ui_refresh_warning}');
                    //remove element and trigger destroy function for cleanup
                    element.remove();
                    $scope.$destroy();
                });

                it('should reset onbeforeunload removed from the dom', function () {
                    expect($window.onbeforeunload).toBeDefined();
                    expect(typeof $window.onbeforeunload).toEqual('function');
                    expect($window.onbeforeunload()).toEqual('#{msgs.ui_refresh_warning}');

                    //remove element and trigger destroy function
                    element.remove();
                    $scope.$destroy();

                    //expect onbeforeunload to be reset to an empty function
                    expect($window.onbeforeunload).toBeDefined();
                    expect(typeof $window.onbeforeunload).toEqual('function');
                    expect($window.onbeforeunload()).not.toBeDefined();
                });

                it('should reset override service when removed from the dom', function () {
                    var overrideService;
                    inject(function (refreshWarningOverrideService) {
                        overrideService = refreshWarningOverrideService;
                    });
                    expect($window.onbeforeunload).toBeDefined();
                    expect(typeof $window.onbeforeunload).toEqual('function');
                    expect($window.onbeforeunload()).toEqual('#{msgs.ui_refresh_warning}');

                    overrideService.enableOverride();
                    expect($window.onbeforeunload()).not.toBeDefined();
                    expect(overrideService.isOverride()).toBeTruthy();

                    //remove element and trigger destroy function
                    element.remove();
                    $scope.$destroy();

                    //expect onbeforeunload to be reset to an empty function
                    expect(overrideService.isOverride()).toBeFalsy();
                });

                it('should not trigger if the override is enabled', function () {
                    var overrideService;
                    inject(function (refreshWarningOverrideService) {
                        overrideService = refreshWarningOverrideService;
                    });
                    expect($window.onbeforeunload).toBeDefined();
                    expect(typeof $window.onbeforeunload).toEqual('function');
                    expect($window.onbeforeunload()).toEqual('#{msgs.ui_refresh_warning}');
                    overrideService.enableOverride();
                    expect($window.onbeforeunload()).not.toBeDefined();
                    //remove element and trigger destroy function for cleanup
                    element.remove();
                    $scope.$destroy();
                });

                it('should use message if provided', function () {
                    var warningMessage = 'some new warning';

                    //remove default element and trigger destroy function for cleanup
                    element.remove();
                    $scope.$destroy();

                    element = angular.element(getElementDefintion(warningMessage));
                    //add element to the dom
                    element.appendTo(document.body);
                    $compile(element)($scope);
                    $scope.$apply();

                    expect($window.onbeforeunload()).toEqual(warningMessage);
                    //remove element and trigger destroy function for cleanup
                    element.remove();
                    $scope.$destroy();
                });

                describe('windows phone', function () {
                    it('should not define onbeforeunload when user agent is windows phone', inject(function (browserUtil) {

                        element.remove();
                        $scope.$destroy();
                        $window.onbeforeunload = null;

                        spyOn(browserUtil, 'isWindowsPhone').and.callFake(function () {
                            return true;
                        });

                        element = angular.element(getElementDefintion());
                        //add element to the dom
                        element.appendTo(document.body);
                        $compile(element)($scope);
                        $scope.$apply();

                        expect($window.onbeforeunload).toBeNull();
                        element.remove();
                        $scope.$destroy();
                    }));
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93YXJuaW5nL1JlZnJlc2hXYXJuaW5nRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGlDQUFpQyxVQUFVLFNBQVM7SUFBaEc7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDZCQUE2QjtZQUNuRixnQkFBZ0IsNEJBQTRCOztRQUVoRCxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsMkJBQTJCLFlBQVc7Z0JBQzNDLElBQUksU0FBUyxRQUFRLFNBQVM7OztnQkFHOUIsU0FBUyxvQkFBb0IsS0FBSztvQkFDOUIsT0FBTyxRQUFTLFVBQVUsT0FDdEIsNkNBQTZDLE1BQU0sUUFBUTs7O2dCQUluRSxXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWSxXQUFXO29CQUMxRCxTQUFTO29CQUNULFdBQVc7b0JBQ1gsVUFBVTs7b0JBRVYsVUFBVSxRQUFRLFFBQVE7O29CQUUxQixRQUFRLFNBQVMsU0FBUztvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixPQUFPOzs7Z0JBR1gsR0FBRyx1REFBdUQsWUFBVztvQkFDakUsT0FBTyxRQUFRLGdCQUFnQjtvQkFDL0IsT0FBTyxPQUFPLFFBQVEsZ0JBQWdCLFFBQVE7b0JBQzlDLE9BQU8sUUFBUSxrQkFBa0IsUUFBUTs7b0JBRXpDLFFBQVE7b0JBQ1IsT0FBTzs7O2dCQUdYLEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlELE9BQU8sUUFBUSxnQkFBZ0I7b0JBQy9CLE9BQU8sT0FBTyxRQUFRLGdCQUFnQixRQUFRO29CQUM5QyxPQUFPLFFBQVEsa0JBQWtCLFFBQVE7OztvQkFHekMsUUFBUTtvQkFDUixPQUFPOzs7b0JBR1AsT0FBTyxRQUFRLGdCQUFnQjtvQkFDL0IsT0FBTyxPQUFPLFFBQVEsZ0JBQWdCLFFBQVE7b0JBQzlDLE9BQU8sUUFBUSxrQkFBa0IsSUFBSTs7O2dCQUd6QyxHQUFHLDJEQUEyRCxZQUFXO29CQUNyRSxJQUFJO29CQUNKLE9BQU8sVUFBUywrQkFBK0I7d0JBQzNDLGtCQUFrQjs7b0JBRXRCLE9BQU8sUUFBUSxnQkFBZ0I7b0JBQy9CLE9BQU8sT0FBTyxRQUFRLGdCQUFnQixRQUFRO29CQUM5QyxPQUFPLFFBQVEsa0JBQWtCLFFBQVE7O29CQUV6QyxnQkFBZ0I7b0JBQ2hCLE9BQU8sUUFBUSxrQkFBa0IsSUFBSTtvQkFDckMsT0FBTyxnQkFBZ0IsY0FBYzs7O29CQUdyQyxRQUFRO29CQUNSLE9BQU87OztvQkFHUCxPQUFPLGdCQUFnQixjQUFjOzs7Z0JBR3pDLEdBQUcsaURBQWlELFlBQVc7b0JBQzNELElBQUk7b0JBQ0osT0FBTyxVQUFTLCtCQUErQjt3QkFDM0Msa0JBQWtCOztvQkFFdEIsT0FBTyxRQUFRLGdCQUFnQjtvQkFDL0IsT0FBTyxPQUFPLFFBQVEsZ0JBQWdCLFFBQVE7b0JBQzlDLE9BQU8sUUFBUSxrQkFBa0IsUUFBUTtvQkFDekMsZ0JBQWdCO29CQUNoQixPQUFPLFFBQVEsa0JBQWtCLElBQUk7O29CQUVyQyxRQUFRO29CQUNSLE9BQU87OztnQkFHWCxHQUFHLGtDQUFrQyxZQUFXO29CQUM1QyxJQUFJLGlCQUFpQjs7O29CQUdyQixRQUFRO29CQUNSLE9BQU87O29CQUVQLFVBQVUsUUFBUSxRQUFRLG9CQUFvQjs7b0JBRTlDLFFBQVEsU0FBUyxTQUFTO29CQUMxQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87O29CQUVQLE9BQU8sUUFBUSxrQkFBa0IsUUFBUTs7b0JBRXpDLFFBQVE7b0JBQ1IsT0FBTzs7O2dCQUlYLFNBQVMsaUJBQWlCLFlBQVc7b0JBQ2pDLEdBQUcscUVBQ0MsT0FBTyxVQUFTLGFBQWE7O3dCQUV6QixRQUFRO3dCQUNSLE9BQU87d0JBQ1AsUUFBUSxpQkFBaUI7O3dCQUV6QixNQUFNLGFBQWEsa0JBQWtCLElBQUksU0FBUyxZQUFXOzRCQUFFLE9BQU87Ozt3QkFFdEUsVUFBVSxRQUFRLFFBQVE7O3dCQUUxQixRQUFRLFNBQVMsU0FBUzt3QkFDMUIsU0FBUyxTQUFTO3dCQUNsQixPQUFPOzt3QkFFUCxPQUFPLFFBQVEsZ0JBQWdCO3dCQUMvQixRQUFRO3dCQUNSLE9BQU87Ozs7OztHQVNwQiIsImZpbGUiOiJjb21tb24vd2FybmluZy9SZWZyZXNoV2FybmluZ0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3YXJuaW5nTW9kdWxlIGZyb20gJ2NvbW1vbi93YXJuaW5nL1dhcm5pbmdNb2R1bGUnO1xuXG5kZXNjcmliZSgnUmVmcmVzaFdhcm5pbmdEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWxlbWVudCwgJHNjb3BlLCAkd2luZG93LCAkY29tcGlsZTtcblxuICAgIC8vcmV0dXJucyBkb20gY29kZSBmb3IgYW4gc3AtcmVmcmVzaC13YXJuaW5nIGVsZW1lbnRcbiAgICBmdW5jdGlvbiBnZXRFbGVtZW50RGVmaW50aW9uKG1zZykge1xuICAgICAgICByZXR1cm4gKGFuZ3VsYXIuaXNEZWZpbmVkKG1zZykpID9cbiAgICAgICAgICAgICc8c3AtcmVmcmVzaC13YXJuaW5nIHNwLXdhcm5pbmctbWVzc2FnZT1cIicgKyBtc2cgKyAnXCIvPicgOiAnPHNwLXJlZnJlc2gtd2FybmluZyAvPic7XG5cbiAgICB9XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3YXJuaW5nTW9kdWxlKSk7XG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb21waWxlXywgJHJvb3RTY29wZSwgXyR3aW5kb3dfKSB7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJHdpbmRvdyA9IF8kd2luZG93XztcblxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGdldEVsZW1lbnREZWZpbnRpb24oKSk7XG4gICAgICAgIC8vYWRkIGVsZW1lbnQgdG8gdGhlIGRvbVxuICAgICAgICBlbGVtZW50LmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCBkZWZpbmUgb25iZWZvcmV1bmxvYWQgd2hlbiBwbGFjZWQgaW4gdGhlIGRvbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoJHdpbmRvdy5vbmJlZm9yZXVubG9hZCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KHR5cGVvZiAkd2luZG93Lm9uYmVmb3JldW5sb2FkKS50b0VxdWFsKCdmdW5jdGlvbicpO1xuICAgICAgICBleHBlY3QoJHdpbmRvdy5vbmJlZm9yZXVubG9hZCgpKS50b0VxdWFsKCcje21zZ3MudWlfcmVmcmVzaF93YXJuaW5nfScpO1xuICAgICAgICAvL3JlbW92ZSBlbGVtZW50IGFuZCB0cmlnZ2VyIGRlc3Ryb3kgZnVuY3Rpb24gZm9yIGNsZWFudXBcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgJHNjb3BlLiRkZXN0cm95KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlc2V0IG9uYmVmb3JldW5sb2FkIHJlbW92ZWQgZnJvbSB0aGUgZG9tJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCgkd2luZG93Lm9uYmVmb3JldW5sb2FkKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3QodHlwZW9mICR3aW5kb3cub25iZWZvcmV1bmxvYWQpLnRvRXF1YWwoJ2Z1bmN0aW9uJyk7XG4gICAgICAgIGV4cGVjdCgkd2luZG93Lm9uYmVmb3JldW5sb2FkKCkpLnRvRXF1YWwoJyN7bXNncy51aV9yZWZyZXNoX3dhcm5pbmd9Jyk7XG5cbiAgICAgICAgLy9yZW1vdmUgZWxlbWVudCBhbmQgdHJpZ2dlciBkZXN0cm95IGZ1bmN0aW9uXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICRzY29wZS4kZGVzdHJveSgpO1xuXG4gICAgICAgIC8vZXhwZWN0IG9uYmVmb3JldW5sb2FkIHRvIGJlIHJlc2V0IHRvIGFuIGVtcHR5IGZ1bmN0aW9uXG4gICAgICAgIGV4cGVjdCgkd2luZG93Lm9uYmVmb3JldW5sb2FkKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3QodHlwZW9mICR3aW5kb3cub25iZWZvcmV1bmxvYWQpLnRvRXF1YWwoJ2Z1bmN0aW9uJyk7XG4gICAgICAgIGV4cGVjdCgkd2luZG93Lm9uYmVmb3JldW5sb2FkKCkpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXNldCBvdmVycmlkZSBzZXJ2aWNlIHdoZW4gcmVtb3ZlZCBmcm9tIHRoZSBkb20nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG92ZXJyaWRlU2VydmljZTtcbiAgICAgICAgaW5qZWN0KGZ1bmN0aW9uKHJlZnJlc2hXYXJuaW5nT3ZlcnJpZGVTZXJ2aWNlKSB7XG4gICAgICAgICAgICBvdmVycmlkZVNlcnZpY2UgPSByZWZyZXNoV2FybmluZ092ZXJyaWRlU2VydmljZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV4cGVjdCgkd2luZG93Lm9uYmVmb3JldW5sb2FkKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3QodHlwZW9mICR3aW5kb3cub25iZWZvcmV1bmxvYWQpLnRvRXF1YWwoJ2Z1bmN0aW9uJyk7XG4gICAgICAgIGV4cGVjdCgkd2luZG93Lm9uYmVmb3JldW5sb2FkKCkpLnRvRXF1YWwoJyN7bXNncy51aV9yZWZyZXNoX3dhcm5pbmd9Jyk7XG5cbiAgICAgICAgb3ZlcnJpZGVTZXJ2aWNlLmVuYWJsZU92ZXJyaWRlKCk7XG4gICAgICAgIGV4cGVjdCgkd2luZG93Lm9uYmVmb3JldW5sb2FkKCkpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3Qob3ZlcnJpZGVTZXJ2aWNlLmlzT3ZlcnJpZGUoKSkudG9CZVRydXRoeSgpO1xuXG4gICAgICAgIC8vcmVtb3ZlIGVsZW1lbnQgYW5kIHRyaWdnZXIgZGVzdHJveSBmdW5jdGlvblxuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAkc2NvcGUuJGRlc3Ryb3koKTtcblxuICAgICAgICAvL2V4cGVjdCBvbmJlZm9yZXVubG9hZCB0byBiZSByZXNldCB0byBhbiBlbXB0eSBmdW5jdGlvblxuICAgICAgICBleHBlY3Qob3ZlcnJpZGVTZXJ2aWNlLmlzT3ZlcnJpZGUoKSkudG9CZUZhbHN5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCB0cmlnZ2VyIGlmIHRoZSBvdmVycmlkZSBpcyBlbmFibGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvdmVycmlkZVNlcnZpY2U7XG4gICAgICAgIGluamVjdChmdW5jdGlvbihyZWZyZXNoV2FybmluZ092ZXJyaWRlU2VydmljZSkge1xuICAgICAgICAgICAgb3ZlcnJpZGVTZXJ2aWNlID0gcmVmcmVzaFdhcm5pbmdPdmVycmlkZVNlcnZpY2U7XG4gICAgICAgIH0pO1xuICAgICAgICBleHBlY3QoJHdpbmRvdy5vbmJlZm9yZXVubG9hZCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KHR5cGVvZiAkd2luZG93Lm9uYmVmb3JldW5sb2FkKS50b0VxdWFsKCdmdW5jdGlvbicpO1xuICAgICAgICBleHBlY3QoJHdpbmRvdy5vbmJlZm9yZXVubG9hZCgpKS50b0VxdWFsKCcje21zZ3MudWlfcmVmcmVzaF93YXJuaW5nfScpO1xuICAgICAgICBvdmVycmlkZVNlcnZpY2UuZW5hYmxlT3ZlcnJpZGUoKTtcbiAgICAgICAgZXhwZWN0KCR3aW5kb3cub25iZWZvcmV1bmxvYWQoKSkubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIC8vcmVtb3ZlIGVsZW1lbnQgYW5kIHRyaWdnZXIgZGVzdHJveSBmdW5jdGlvbiBmb3IgY2xlYW51cFxuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAkc2NvcGUuJGRlc3Ryb3koKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdXNlIG1lc3NhZ2UgaWYgcHJvdmlkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdhcm5pbmdNZXNzYWdlID0gJ3NvbWUgbmV3IHdhcm5pbmcnO1xuXG4gICAgICAgIC8vcmVtb3ZlIGRlZmF1bHQgZWxlbWVudCBhbmQgdHJpZ2dlciBkZXN0cm95IGZ1bmN0aW9uIGZvciBjbGVhbnVwXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICRzY29wZS4kZGVzdHJveSgpO1xuXG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZ2V0RWxlbWVudERlZmludGlvbih3YXJuaW5nTWVzc2FnZSkpO1xuICAgICAgICAvL2FkZCBlbGVtZW50IHRvIHRoZSBkb21cbiAgICAgICAgZWxlbWVudC5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgIGV4cGVjdCgkd2luZG93Lm9uYmVmb3JldW5sb2FkKCkpLnRvRXF1YWwod2FybmluZ01lc3NhZ2UpO1xuICAgICAgICAvL3JlbW92ZSBlbGVtZW50IGFuZCB0cmlnZ2VyIGRlc3Ryb3kgZnVuY3Rpb24gZm9yIGNsZWFudXBcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgJHNjb3BlLiRkZXN0cm95KCk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd3aW5kb3dzIHBob25lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgbm90IGRlZmluZSBvbmJlZm9yZXVubG9hZCB3aGVuIHVzZXIgYWdlbnQgaXMgd2luZG93cyBwaG9uZScsXG4gICAgICAgICAgICBpbmplY3QoZnVuY3Rpb24oYnJvd3NlclV0aWwpIHtcblxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRkZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgJHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBzcHlPbihicm93c2VyVXRpbCwgJ2lzV2luZG93c1Bob25lJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSk7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGdldEVsZW1lbnREZWZpbnRpb24oKSk7XG4gICAgICAgICAgICAgICAgLy9hZGQgZWxlbWVudCB0byB0aGUgZG9tXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgICAgIGV4cGVjdCgkd2luZG93Lm9uYmVmb3JldW5sb2FkKS50b0JlTnVsbCgpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRkZXN0cm95KCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
