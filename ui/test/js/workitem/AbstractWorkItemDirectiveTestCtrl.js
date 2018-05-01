System.register(['angular', 'workitem/WorkItemModule'], function (_export) {

    /**
     * Define a simple controller to test AbstractWorkItemDirectiveCtrl.
     */
    'use strict';

    AbstractWorkItemDirectiveTestCtrl.$inject = ["navigationService"];
    var angular, abstractWorkItemModule;
    function AbstractWorkItemDirectiveTestCtrl(navigationService) {
        AbstractWorkItemDirectiveTestCtrl._super.call(this, navigationService);
    }

    // Make this controller extend AbstractWorkItemListCtrl.
    return {
        setters: [function (_angular) {
            angular = _angular['default'];
        }, function (_workitemWorkItemModule) {
            abstractWorkItemModule = _workitemWorkItemModule['default'];
        }],
        execute: function () {
            angular.module(abstractWorkItemModule).config(['$controllerProvider', 'AbstractWorkItemDirectiveCtrl', function ($controllerProvider, AbstractWorkItemDirectiveCtrl) {
                SailPoint.extend(AbstractWorkItemDirectiveTestCtrl, AbstractWorkItemDirectiveCtrl);
                $controllerProvider.register('AbstractWorkItemDirectiveTestCtrl', AbstractWorkItemDirectiveTestCtrl);
            }]);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL0Fic3RyYWN0V29ya0l0ZW1EaXJlY3RpdmVUZXN0Q3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQyxXQUFXLDRCQUE0QixVQUFVLFNBQVM7Ozs7O0lBQTNFOzs7SUFPSSxJQUFJLFNBQVM7SUFDakIsU0FBUyxrQ0FBa0MsbUJBQW1CO1FBQzFELGtDQUFrQyxPQUFPLEtBQUssTUFBTTs7OztJQUlwRCxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsVUFBVTtZQUMxQixVQUFVLFNBQVM7V0FDcEIsVUFBVSx5QkFBeUI7WUFDbEMseUJBQXlCLHdCQUF3Qjs7UUFFckQsU0FBUyxZQUFZO1lBTjdCLFFBQVEsT0FBTyx3QkFBd0IsT0FBTyxDQUFDLHVCQUF1QixpQ0FDbEUsVUFBUyxxQkFBcUIsK0JBQStCO2dCQUN6RCxVQUFVLE9BQU8sbUNBQW1DO2dCQUNwRCxvQkFBb0IsU0FBUyxxQ0FBcUM7Ozs7R0FVdkUiLCJmaWxlIjoid29ya2l0ZW0vQWJzdHJhY3RXb3JrSXRlbURpcmVjdGl2ZVRlc3RDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBhYnN0cmFjdFdvcmtJdGVtTW9kdWxlIGZyb20gJ3dvcmtpdGVtL1dvcmtJdGVtTW9kdWxlJztcblxuLyoqXG4gKiBEZWZpbmUgYSBzaW1wbGUgY29udHJvbGxlciB0byB0ZXN0IEFic3RyYWN0V29ya0l0ZW1EaXJlY3RpdmVDdHJsLlxuICovXG5mdW5jdGlvbiBBYnN0cmFjdFdvcmtJdGVtRGlyZWN0aXZlVGVzdEN0cmwobmF2aWdhdGlvblNlcnZpY2UpIHtcbiAgICBBYnN0cmFjdFdvcmtJdGVtRGlyZWN0aXZlVGVzdEN0cmwuX3N1cGVyLmNhbGwodGhpcywgbmF2aWdhdGlvblNlcnZpY2UpO1xufVxuXG4vLyBNYWtlIHRoaXMgY29udHJvbGxlciBleHRlbmQgQWJzdHJhY3RXb3JrSXRlbUxpc3RDdHJsLlxuYW5ndWxhci5tb2R1bGUoYWJzdHJhY3RXb3JrSXRlbU1vZHVsZSkuY29uZmlnKFsnJGNvbnRyb2xsZXJQcm92aWRlcicsICdBYnN0cmFjdFdvcmtJdGVtRGlyZWN0aXZlQ3RybCcsXG4gICAgZnVuY3Rpb24oJGNvbnRyb2xsZXJQcm92aWRlciwgQWJzdHJhY3RXb3JrSXRlbURpcmVjdGl2ZUN0cmwpIHtcbiAgICAgICAgU2FpbFBvaW50LmV4dGVuZChBYnN0cmFjdFdvcmtJdGVtRGlyZWN0aXZlVGVzdEN0cmwsIEFic3RyYWN0V29ya0l0ZW1EaXJlY3RpdmVDdHJsKTtcbiAgICAgICAgJGNvbnRyb2xsZXJQcm92aWRlci5yZWdpc3RlcignQWJzdHJhY3RXb3JrSXRlbURpcmVjdGl2ZVRlc3RDdHJsJywgQWJzdHJhY3RXb3JrSXRlbURpcmVjdGl2ZVRlc3RDdHJsKTtcbiAgICB9XSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
