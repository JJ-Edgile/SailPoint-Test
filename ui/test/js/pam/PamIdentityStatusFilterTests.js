System.register(['test/js/TestInitializer', 'pam/PamModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var pamModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }],
        execute: function () {

            describe('PamIdentityStatusFilter', function () {
                var pamIdentityStatusFilter = undefined,
                    filteredVal = undefined,
                    spTranslateFilter = undefined,
                    activeText = undefined,
                    inactiveText = undefined;
                var MSG_KEY_ACTIVE = 'ui_pam_container_identity_inactive';
                var MSG_KEY_INACTIVE = 'ui_pam_container_identity_active';

                beforeEach(module(pamModule));

                beforeEach(inject(function (_pamIdentityStatusFilter_, _spTranslateFilter_) {
                    pamIdentityStatusFilter = _pamIdentityStatusFilter_;
                    spTranslateFilter = _spTranslateFilter_;

                    activeText = spTranslateFilter(MSG_KEY_ACTIVE);
                    inactiveText = spTranslateFilter(MSG_KEY_INACTIVE);
                }));

                it('should return inactive text for undefined status', function () {
                    filteredVal = pamIdentityStatusFilter(undefined);
                    expect(filteredVal).toEqual(inactiveText);
                });

                it('should return inactive text for inactive status', function () {
                    filteredVal = pamIdentityStatusFilter(false);
                    expect(filteredVal).toEqual(inactiveText);
                });

                it('should return active text for active status', function () {
                    filteredVal = pamIdentityStatusFilter(true);
                    expect(filteredVal).toEqual(activeText);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1JZGVudGl0eVN0YXR1c0ZpbHRlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixrQkFBa0IsVUFBVSxTQUFTOzs7O0lBSTdFOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxlQUFlO1lBQ3JFLFlBQVksY0FBYzs7UUFFOUIsU0FBUyxZQUFZOztZQUw3QixTQUFTLDJCQUEyQixZQUFXO2dCQUMzQyxJQUFJLDBCQUF1QjtvQkFBRSxjQUFXO29CQUFFLG9CQUFpQjtvQkFBRSxhQUFVO29CQUFFLGVBQVk7Z0JBQ3JGLElBQU0saUJBQWlCO2dCQUN2QixJQUFNLG1CQUFtQjs7Z0JBRXpCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLDJCQUEyQixxQkFBcUI7b0JBQ3ZFLDBCQUEwQjtvQkFDMUIsb0JBQW9COztvQkFFcEIsYUFBYSxrQkFBa0I7b0JBQy9CLGVBQWUsa0JBQWtCOzs7Z0JBR3JDLEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlELGNBQWMsd0JBQXdCO29CQUN0QyxPQUFPLGFBQWEsUUFBUTs7O2dCQUdoQyxHQUFHLG1EQUFtRCxZQUFXO29CQUM3RCxjQUFjLHdCQUF3QjtvQkFDdEMsT0FBTyxhQUFhLFFBQVE7OztnQkFHaEMsR0FBRywrQ0FBK0MsWUFBVztvQkFDekQsY0FBYyx3QkFBd0I7b0JBQ3RDLE9BQU8sYUFBYSxRQUFROzs7OztHQWdCakMiLCJmaWxlIjoicGFtL1BhbUlkZW50aXR5U3RhdHVzRmlsdGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE2LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwYW1Nb2R1bGUgZnJvbSAncGFtL1BhbU1vZHVsZSc7XG5cbmRlc2NyaWJlKCdQYW1JZGVudGl0eVN0YXR1c0ZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBwYW1JZGVudGl0eVN0YXR1c0ZpbHRlciwgZmlsdGVyZWRWYWwsIHNwVHJhbnNsYXRlRmlsdGVyLCBhY3RpdmVUZXh0LCBpbmFjdGl2ZVRleHQ7XG4gICAgY29uc3QgTVNHX0tFWV9BQ1RJVkUgPSAndWlfcGFtX2NvbnRhaW5lcl9pZGVudGl0eV9pbmFjdGl2ZSc7XG4gICAgY29uc3QgTVNHX0tFWV9JTkFDVElWRSA9ICd1aV9wYW1fY29udGFpbmVyX2lkZW50aXR5X2FjdGl2ZSc7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwYW1Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9wYW1JZGVudGl0eVN0YXR1c0ZpbHRlcl8sIF9zcFRyYW5zbGF0ZUZpbHRlcl8pIHtcbiAgICAgICAgcGFtSWRlbnRpdHlTdGF0dXNGaWx0ZXIgPSBfcGFtSWRlbnRpdHlTdGF0dXNGaWx0ZXJfO1xuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlciA9IF9zcFRyYW5zbGF0ZUZpbHRlcl87XG5cbiAgICAgICAgYWN0aXZlVGV4dCA9IHNwVHJhbnNsYXRlRmlsdGVyKE1TR19LRVlfQUNUSVZFKTtcbiAgICAgICAgaW5hY3RpdmVUZXh0ID0gc3BUcmFuc2xhdGVGaWx0ZXIoTVNHX0tFWV9JTkFDVElWRSk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gaW5hY3RpdmUgdGV4dCBmb3IgdW5kZWZpbmVkIHN0YXR1cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBmaWx0ZXJlZFZhbCA9IHBhbUlkZW50aXR5U3RhdHVzRmlsdGVyKHVuZGVmaW5lZCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbCkudG9FcXVhbChpbmFjdGl2ZVRleHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gaW5hY3RpdmUgdGV4dCBmb3IgaW5hY3RpdmUgc3RhdHVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZpbHRlcmVkVmFsID0gcGFtSWRlbnRpdHlTdGF0dXNGaWx0ZXIoZmFsc2UpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRWYWwpLnRvRXF1YWwoaW5hY3RpdmVUZXh0KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGFjdGl2ZSB0ZXh0IGZvciBhY3RpdmUgc3RhdHVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZpbHRlcmVkVmFsID0gcGFtSWRlbnRpdHlTdGF0dXNGaWx0ZXIodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbCkudG9FcXVhbChhY3RpdmVUZXh0KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
