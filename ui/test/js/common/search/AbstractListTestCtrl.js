System.register(['common/search/SearchModule', 'common/search/AbstractListCtrl'], function (_export) {

    /**
     * Define a simple controller to test listing with.
     */
    /* jshint maxparams: 9 */
    'use strict';

    AbstractListTestCtrl.$inject = ["SearchData", "$q", "$timeout", "configService", "initialPageState", "searchSpy", "loadFiltersSpy", "COL_CONFIG_KEY", "disableLoad"];
    var AbstractListCtrl;
    function AbstractListTestCtrl(SearchData, $q, $timeout, configService, initialPageState, searchSpy, loadFiltersSpy, COL_CONFIG_KEY, disableLoad) {

        // Call the super class constructor with the required parameters.
        AbstractListTestCtrl._super.call(this, SearchData, $q, $timeout, configService, initialPageState);

        ////////////////////////////////////////////////////////////////////////
        //
        // AbtractListCtrl Methods
        //
        ////////////////////////////////////////////////////////////////////////

        this.doSearch = function (searchTerm, filterValues, startIdx, itemsPerPage, sortOrder) {
            return searchSpy(searchTerm, filterValues, startIdx, itemsPerPage, sortOrder);
        };

        this.doLoadFilters = function () {
            return loadFiltersSpy();
        };

        this.getColumnConfigKey = function () {
            return COL_CONFIG_KEY;
        };

        this.disableInitialLoad = disableLoad;

        ////////////////////////////////////////////////////////////////////////
        //
        // INITIALIZATION
        //
        ////////////////////////////////////////////////////////////////////////

        // Initialize when the controller is constructed.
        this.initialize();
    }

    // Make this controller extend AbstractListCtrl.
    return {
        setters: [function (_commonSearchSearchModule) {}, function (_commonSearchAbstractListCtrl) {
            AbstractListCtrl = _commonSearchAbstractListCtrl['default'];
        }],
        execute: function () {
            SailPoint.extend(AbstractListTestCtrl, AbstractListCtrl);

            angular.module('sailpoint.search').controller('AbstractListTestCtrl', AbstractListTestCtrl);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zZWFyY2gvQWJzdHJhY3RMaXN0VGVzdEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsOEJBQThCLG1DQUFtQyxVQUFVLFNBQVM7Ozs7OztJQUFyRzs7O0lBUUksSUFBSTtJQUNSLFNBQVMscUJBQXFCLFlBQVksSUFBSSxVQUFVLGVBQzFCLGtCQUFrQixXQUFXLGdCQUM3QixnQkFBZ0IsYUFBYTs7O1FBR3ZELHFCQUFxQixPQUFPLEtBQUssTUFBTSxZQUFZLElBQUksVUFBVSxlQUFlOzs7Ozs7OztRQVFoRixLQUFLLFdBQVcsVUFBUyxZQUFZLGNBQWMsVUFBVSxjQUFjLFdBQVc7WUFDbEYsT0FBTyxVQUFVLFlBQVksY0FBYyxVQUFVLGNBQWM7OztRQUd2RSxLQUFLLGdCQUFnQixZQUFXO1lBQzVCLE9BQU87OztRQUdYLEtBQUsscUJBQXFCLFlBQVc7WUFDakMsT0FBTzs7O1FBR1gsS0FBSyxxQkFBcUI7Ozs7Ozs7OztRQVMxQixLQUFLOzs7O0lBRUwsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLDJCQUEyQixJQUFJLFVBQVUsK0JBQStCO1lBQ3hGLG1CQUFtQiw4QkFBOEI7O1FBRXJELFNBQVMsWUFBWTtZQUY3QixVQUFVLE9BQU8sc0JBQXNCOztZQUV2QyxRQUFRLE9BQU8sb0JBQ1gsV0FBVyx3QkFBd0I7OztHQUtwQyIsImZpbGUiOiJjb21tb24vc2VhcmNoL0Fic3RyYWN0TGlzdFRlc3RDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICdjb21tb24vc2VhcmNoL1NlYXJjaE1vZHVsZSc7XHJcbmltcG9ydCBBYnN0cmFjdExpc3RDdHJsIGZyb20gJ2NvbW1vbi9zZWFyY2gvQWJzdHJhY3RMaXN0Q3RybCc7XHJcblxyXG4vKipcclxuICogRGVmaW5lIGEgc2ltcGxlIGNvbnRyb2xsZXIgdG8gdGVzdCBsaXN0aW5nIHdpdGguXHJcbiAqL1xyXG4vKiBqc2hpbnQgbWF4cGFyYW1zOiA5ICovXHJcbmZ1bmN0aW9uIEFic3RyYWN0TGlzdFRlc3RDdHJsKFNlYXJjaERhdGEsICRxLCAkdGltZW91dCwgY29uZmlnU2VydmljZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFBhZ2VTdGF0ZSwgc2VhcmNoU3B5LCBsb2FkRmlsdGVyc1NweSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ09MX0NPTkZJR19LRVksIGRpc2FibGVMb2FkKSB7XHJcblxyXG4gICAgLy8gQ2FsbCB0aGUgc3VwZXIgY2xhc3MgY29uc3RydWN0b3Igd2l0aCB0aGUgcmVxdWlyZWQgcGFyYW1ldGVycy5cclxuICAgIEFic3RyYWN0TGlzdFRlc3RDdHJsLl9zdXBlci5jYWxsKHRoaXMsIFNlYXJjaERhdGEsICRxLCAkdGltZW91dCwgY29uZmlnU2VydmljZSwgaW5pdGlhbFBhZ2VTdGF0ZSk7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvL1xyXG4gICAgLy8gQWJ0cmFjdExpc3RDdHJsIE1ldGhvZHNcclxuICAgIC8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICB0aGlzLmRvU2VhcmNoID0gZnVuY3Rpb24oc2VhcmNoVGVybSwgZmlsdGVyVmFsdWVzLCBzdGFydElkeCwgaXRlbXNQZXJQYWdlLCBzb3J0T3JkZXIpIHtcclxuICAgICAgICByZXR1cm4gc2VhcmNoU3B5KHNlYXJjaFRlcm0sIGZpbHRlclZhbHVlcywgc3RhcnRJZHgsIGl0ZW1zUGVyUGFnZSwgc29ydE9yZGVyKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kb0xvYWRGaWx0ZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvYWRGaWx0ZXJzU3B5KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZ2V0Q29sdW1uQ29uZmlnS2V5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIENPTF9DT05GSUdfS0VZO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmRpc2FibGVJbml0aWFsTG9hZCA9IGRpc2FibGVMb2FkO1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy9cclxuICAgIC8vIElOSVRJQUxJWkFUSU9OXHJcbiAgICAvL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSB3aGVuIHRoZSBjb250cm9sbGVyIGlzIGNvbnN0cnVjdGVkLlxyXG4gICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbn1cclxuXHJcbi8vIE1ha2UgdGhpcyBjb250cm9sbGVyIGV4dGVuZCBBYnN0cmFjdExpc3RDdHJsLlxyXG5TYWlsUG9pbnQuZXh0ZW5kKEFic3RyYWN0TGlzdFRlc3RDdHJsLCBBYnN0cmFjdExpc3RDdHJsKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdzYWlscG9pbnQuc2VhcmNoJykuXHJcbiAgICBjb250cm9sbGVyKCdBYnN0cmFjdExpc3RUZXN0Q3RybCcsIEFic3RyYWN0TGlzdFRlc3RDdHJsKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
