System.register(['angular', 'home/widget/workitems/AbstractWorkItemsWidgetDirectiveCtrl', 'home/widget/workitems/WorkItemsWidgetModule'], function (_export) {

    /**
     * Define a simple controller to test abstract work items widget ctrl with.
     */
    'use strict';

    AbstractWorkItemsWidgetDirectiveTestCtrl.$inject = ["workItemService", "navigationService", "SortOrder", "getTypesSpy", "getColumnsSpy"];
    var angular, AbstractWorkItemsWidgetDirectiveCtrl, workItemsWidgetModule;
    function AbstractWorkItemsWidgetDirectiveTestCtrl(workItemService, navigationService, SortOrder, getTypesSpy, getColumnsSpy) {

        // Call the super class constructor with the required parameters.
        AbstractWorkItemsWidgetDirectiveTestCtrl._super.call(this, workItemService, navigationService, SortOrder);

        ////////////////////////////////////////////////////////////////////////
        //
        // AbstractWorkItemsWidgetDirectiveCtrl Methods
        //
        ////////////////////////////////////////////////////////////////////////

        this.getTypes = function () {
            return getTypesSpy();
        };

        this.getColumns = function () {
            return getColumnsSpy();
        };

        this.getSrTypesText = function () {
            return '';
        };

        ////////////////////////////////////////////////////////////////////////
        //
        // INITIALIZATION
        //
        ////////////////////////////////////////////////////////////////////////

        // Initialize when the controller is constructed.
        this.initialize();
    }

    // Make this controller extend AbstractWorkItemsWidgetDirectiveCtrl.
    return {
        setters: [function (_angular) {
            angular = _angular['default'];
        }, function (_homeWidgetWorkitemsAbstractWorkItemsWidgetDirectiveCtrl) {
            AbstractWorkItemsWidgetDirectiveCtrl = _homeWidgetWorkitemsAbstractWorkItemsWidgetDirectiveCtrl['default'];
        }, function (_homeWidgetWorkitemsWorkItemsWidgetModule) {
            workItemsWidgetModule = _homeWidgetWorkitemsWorkItemsWidgetModule['default'];
        }],
        execute: function () {
            SailPoint.extend(AbstractWorkItemsWidgetDirectiveTestCtrl, AbstractWorkItemsWidgetDirectiveCtrl);

            angular.module(workItemsWidgetModule).controller('AbstractWorkItemsWidgetDirectiveTestCtrl', AbstractWorkItemsWidgetDirectiveTestCtrl);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L3dvcmtpdGVtcy9BYnN0cmFjdFdvcmtJdGVtc1dpZGdldERpcmVjdGl2ZVRlc3RDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLFdBQVcsOERBQThELGdEQUFnRCxVQUFVLFNBQVM7Ozs7O0lBQTdKOzs7SUFPSSxJQUFJLFNBQVMsc0NBQXNDO0lBRXZELFNBQVMseUNBQXlDLGlCQUFpQixtQkFBbUIsV0FDcEMsYUFBYSxlQUFlOzs7UUFHMUUseUNBQXlDLE9BQU8sS0FBSyxNQUFNLGlCQUFpQixtQkFBbUI7Ozs7Ozs7O1FBUS9GLEtBQUssV0FBVyxZQUFXO1lBQ3ZCLE9BQU87OztRQUdYLEtBQUssYUFBYSxZQUFXO1lBQ3pCLE9BQU87OztRQUdYLEtBQUssaUJBQWlCLFlBQVc7WUFDN0IsT0FBTzs7Ozs7Ozs7OztRQVVYLEtBQUs7Ozs7SUFFTCxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsVUFBVTtZQUMxQixVQUFVLFNBQVM7V0FDcEIsVUFBVSwwREFBMEQ7WUFDbkUsdUNBQXVDLHlEQUF5RDtXQUNqRyxVQUFVLDJDQUEyQztZQUNwRCx3QkFBd0IsMENBQTBDOztRQUV0RSxTQUFTLFlBQVk7WUFON0IsVUFBVSxPQUFPLDBDQUEwQzs7WUFFM0QsUUFBUSxPQUFPLHVCQUNYLFdBQVcsNENBQTRDOzs7R0FTeEQiLCJmaWxlIjoiaG9tZS93aWRnZXQvd29ya2l0ZW1zL0Fic3RyYWN0V29ya0l0ZW1zV2lkZ2V0RGlyZWN0aXZlVGVzdEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IEFic3RyYWN0V29ya0l0ZW1zV2lkZ2V0RGlyZWN0aXZlQ3RybCBmcm9tICdob21lL3dpZGdldC93b3JraXRlbXMvQWJzdHJhY3RXb3JrSXRlbXNXaWRnZXREaXJlY3RpdmVDdHJsJztcbmltcG9ydCB3b3JrSXRlbXNXaWRnZXRNb2R1bGUgZnJvbSAnaG9tZS93aWRnZXQvd29ya2l0ZW1zL1dvcmtJdGVtc1dpZGdldE1vZHVsZSc7XG5cbi8qKlxuICogRGVmaW5lIGEgc2ltcGxlIGNvbnRyb2xsZXIgdG8gdGVzdCBhYnN0cmFjdCB3b3JrIGl0ZW1zIHdpZGdldCBjdHJsIHdpdGguXG4gKi9cbmZ1bmN0aW9uIEFic3RyYWN0V29ya0l0ZW1zV2lkZ2V0RGlyZWN0aXZlVGVzdEN0cmwod29ya0l0ZW1TZXJ2aWNlLCBuYXZpZ2F0aW9uU2VydmljZSwgU29ydE9yZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRUeXBlc1NweSwgZ2V0Q29sdW1uc1NweSkge1xuXG4gICAgLy8gQ2FsbCB0aGUgc3VwZXIgY2xhc3MgY29uc3RydWN0b3Igd2l0aCB0aGUgcmVxdWlyZWQgcGFyYW1ldGVycy5cbiAgICBBYnN0cmFjdFdvcmtJdGVtc1dpZGdldERpcmVjdGl2ZVRlc3RDdHJsLl9zdXBlci5jYWxsKHRoaXMsIHdvcmtJdGVtU2VydmljZSwgbmF2aWdhdGlvblNlcnZpY2UsIFNvcnRPcmRlcik7XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvL1xuICAgIC8vIEFic3RyYWN0V29ya0l0ZW1zV2lkZ2V0RGlyZWN0aXZlQ3RybCBNZXRob2RzXG4gICAgLy9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIHRoaXMuZ2V0VHlwZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGdldFR5cGVzU3B5KCk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q29sdW1ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZ2V0Q29sdW1uc1NweSgpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFNyVHlwZXNUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9O1xuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy9cbiAgICAvLyBJTklUSUFMSVpBVElPTlxuICAgIC8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvLyBJbml0aWFsaXplIHdoZW4gdGhlIGNvbnRyb2xsZXIgaXMgY29uc3RydWN0ZWQuXG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG59XG5cbi8vIE1ha2UgdGhpcyBjb250cm9sbGVyIGV4dGVuZCBBYnN0cmFjdFdvcmtJdGVtc1dpZGdldERpcmVjdGl2ZUN0cmwuXG5TYWlsUG9pbnQuZXh0ZW5kKEFic3RyYWN0V29ya0l0ZW1zV2lkZ2V0RGlyZWN0aXZlVGVzdEN0cmwsIEFic3RyYWN0V29ya0l0ZW1zV2lkZ2V0RGlyZWN0aXZlQ3RybCk7XG5cbmFuZ3VsYXIubW9kdWxlKHdvcmtJdGVtc1dpZGdldE1vZHVsZSkuXG4gICAgY29udHJvbGxlcignQWJzdHJhY3RXb3JrSXRlbXNXaWRnZXREaXJlY3RpdmVUZXN0Q3RybCcsIEFic3RyYWN0V29ya0l0ZW1zV2lkZ2V0RGlyZWN0aXZlVGVzdEN0cmwpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
