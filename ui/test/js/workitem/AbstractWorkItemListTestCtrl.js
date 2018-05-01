System.register(['angular', 'workitem/WorkItemModule', 'workitem/AbstractWorkItemListCtrl'], function (_export) {

    /**
     * Define a simple controller to test AbstractWorkItemListCtrl.
     */
    /* jshint maxparams: 8 */
    'use strict';

    AbstractWorkItemListTestCtrl.$inject = ["SearchData", "$q", "$timeout", "configService", "initialPageState", "searchSpy", "SortOrder", "workItemService"];
    var angular, workItemModule, AbstractWorkItemListCtrl;
    function AbstractWorkItemListTestCtrl(SearchData, $q, $timeout, configService, initialPageState, searchSpy, SortOrder, workItemService) {

        AbstractWorkItemListTestCtrl._super.call(this, SearchData, $q, $timeout, configService, SortOrder, workItemService, initialPageState);

        this.doSearch = function (searchTerm, filterValues, startIdx, itemsPerPage, sortOrder) {
            return searchSpy(searchTerm, filterValues, startIdx, itemsPerPage, sortOrder);
        };

        ////////////////////////////////////////////////////////////////////////
        //
        // INITIALIZATION
        //
        ////////////////////////////////////////////////////////////////////////

        // Initialize when the controller is constructed.
        this.initialize();
    }

    // Make this controller extend AbstractWorkItemListCtrl.
    return {
        setters: [function (_angular) {
            angular = _angular['default'];
        }, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }, function (_workitemAbstractWorkItemListCtrl) {
            AbstractWorkItemListCtrl = _workitemAbstractWorkItemListCtrl['default'];
        }],
        execute: function () {
            SailPoint.extend(AbstractWorkItemListTestCtrl, AbstractWorkItemListCtrl);

            angular.module(workItemModule).controller('AbstractWorkItemListTestCtrl', AbstractWorkItemListTestCtrl);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL0Fic3RyYWN0V29ya0l0ZW1MaXN0VGVzdEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsV0FBVywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7Ozs7O0lBQWhIOzs7SUFRSSxJQUFJLFNBQVMsZ0JBQWdCO0lBRWpDLFNBQVMsNkJBQTZCLFlBQVksSUFBSSxVQUFVLGVBQzFCLGtCQUFrQixXQUFXLFdBQVcsaUJBQWlCOztRQUUzRiw2QkFBNkIsT0FBTyxLQUFLLE1BQU0sWUFBWSxJQUFJLFVBQVUsZUFBZSxXQUNwRixpQkFBaUI7O1FBRXJCLEtBQUssV0FBVyxVQUFTLFlBQVksY0FBYyxVQUFVLGNBQWMsV0FBVztZQUNsRixPQUFPLFVBQVUsWUFBWSxjQUFjLFVBQVUsY0FBYzs7Ozs7Ozs7OztRQVV2RSxLQUFLOzs7O0lBQ0wsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLFVBQVU7WUFDMUIsVUFBVSxTQUFTO1dBQ3BCLFVBQVUseUJBQXlCO1lBQ2xDLGlCQUFpQix3QkFBd0I7V0FDMUMsVUFBVSxtQ0FBbUM7WUFDNUMsMkJBQTJCLGtDQUFrQzs7UUFFakUsU0FBUyxZQUFZO1lBTDdCLFVBQVUsT0FBTyw4QkFBOEI7O1lBRS9DLFFBQVEsT0FBTyxnQkFDWCxXQUFXLGdDQUFnQzs7O0dBUTVDIiwiZmlsZSI6IndvcmtpdGVtL0Fic3RyYWN0V29ya0l0ZW1MaXN0VGVzdEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IHdvcmtJdGVtTW9kdWxlIGZyb20gJ3dvcmtpdGVtL1dvcmtJdGVtTW9kdWxlJztcbmltcG9ydCBBYnN0cmFjdFdvcmtJdGVtTGlzdEN0cmwgZnJvbSAnd29ya2l0ZW0vQWJzdHJhY3RXb3JrSXRlbUxpc3RDdHJsJztcblxuLyoqXG4gKiBEZWZpbmUgYSBzaW1wbGUgY29udHJvbGxlciB0byB0ZXN0IEFic3RyYWN0V29ya0l0ZW1MaXN0Q3RybC5cbiAqL1xuLyoganNoaW50IG1heHBhcmFtczogOCAqL1xuZnVuY3Rpb24gQWJzdHJhY3RXb3JrSXRlbUxpc3RUZXN0Q3RybChTZWFyY2hEYXRhLCAkcSwgJHRpbWVvdXQsIGNvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxQYWdlU3RhdGUsIHNlYXJjaFNweSwgU29ydE9yZGVyLCB3b3JrSXRlbVNlcnZpY2UpIHtcblxuICAgIEFic3RyYWN0V29ya0l0ZW1MaXN0VGVzdEN0cmwuX3N1cGVyLmNhbGwodGhpcywgU2VhcmNoRGF0YSwgJHEsICR0aW1lb3V0LCBjb25maWdTZXJ2aWNlLCBTb3J0T3JkZXIsXG4gICAgICAgIHdvcmtJdGVtU2VydmljZSwgaW5pdGlhbFBhZ2VTdGF0ZSk7XG5cbiAgICB0aGlzLmRvU2VhcmNoID0gZnVuY3Rpb24oc2VhcmNoVGVybSwgZmlsdGVyVmFsdWVzLCBzdGFydElkeCwgaXRlbXNQZXJQYWdlLCBzb3J0T3JkZXIpIHtcbiAgICAgICAgcmV0dXJuIHNlYXJjaFNweShzZWFyY2hUZXJtLCBmaWx0ZXJWYWx1ZXMsIHN0YXJ0SWR4LCBpdGVtc1BlclBhZ2UsIHNvcnRPcmRlcik7XG4gICAgfTtcblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vXG4gICAgLy8gSU5JVElBTElaQVRJT05cbiAgICAvL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB3aGVuIHRoZSBjb250cm9sbGVyIGlzIGNvbnN0cnVjdGVkLlxuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xufVxuXG4vLyBNYWtlIHRoaXMgY29udHJvbGxlciBleHRlbmQgQWJzdHJhY3RXb3JrSXRlbUxpc3RDdHJsLlxuU2FpbFBvaW50LmV4dGVuZChBYnN0cmFjdFdvcmtJdGVtTGlzdFRlc3RDdHJsLCBBYnN0cmFjdFdvcmtJdGVtTGlzdEN0cmwpO1xuXG5hbmd1bGFyLm1vZHVsZSh3b3JrSXRlbU1vZHVsZSkuXG4gICAgY29udHJvbGxlcignQWJzdHJhY3RXb3JrSXRlbUxpc3RUZXN0Q3RybCcsIEFic3RyYWN0V29ya0l0ZW1MaXN0VGVzdEN0cmwpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
