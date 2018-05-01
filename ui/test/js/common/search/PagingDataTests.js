System.register(['test/js/TestInitializer', 'common/search/SearchModule'], function (_export) {

    /**
     * Tests for the PagingData model object.
     */
    'use strict';

    var searchModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonSearchSearchModule) {
            searchModule = _commonSearchSearchModule['default'];
        }],
        execute: function () {
            describe('PagingData', function () {
                var PagingData, data;

                beforeEach(module(searchModule));

                /**
                 * Setup the PagingData class and a default data to test with.
                 */
                beforeEach(inject(function (_PagingData_) {
                    PagingData = _PagingData_;
                    data = new PagingData(10);
                    data.setTotal(30);
                }));

                it('defaults to page size of 12 with default constructor', function () {
                    data = new PagingData();
                    expect(data.itemsPerPage).toEqual(12);
                });

                it('accepts itemsPerPage in the constructor', function () {
                    data = new PagingData(30);
                    expect(data.itemsPerPage).toEqual(30);
                });

                it('starts at page 1', function () {
                    expect(data.currentPage).toEqual(1);
                });

                it('sets the total', function () {
                    data.setTotal(100);
                    expect(data.getTotal()).toEqual(100);
                });

                it('changes the current page if the total shrinks too much', function () {
                    // Start with 3 pages and go to the 3rd page.
                    data.setTotal(30);
                    data.currentPage = 3;

                    // Shrink down to only 1 page worth.  Make sure current page is updated.
                    data.setTotal(8);
                    expect(data.currentPage).toEqual(1);
                });

                it('sets the items per page', function () {
                    data.setItemsPerPage(2);
                    expect(data.itemsPerPage).toEqual(2);
                });

                it('changes the current page if the items per page grows too much', function () {
                    // Start with 3 pages and go to the 3rd page.
                    data.setTotal(30);
                    data.currentPage = 3;

                    // Change items per page to 20 and make sure we go to the second page.
                    data.setItemsPerPage(20);
                    expect(data.currentPage).toEqual(2);
                });

                it('decrements the current page when previous is called', function () {
                    var changed;
                    data.currentPage = 3;
                    changed = data.previous();
                    expect(changed).toEqual(true);
                    expect(data.currentPage).toEqual(2);
                });

                it('does not decrement the current page when previous is called on the first page', function () {
                    var changed = data.previous();
                    expect(changed).toEqual(false);
                    expect(data.currentPage).toEqual(1);
                });

                it('explodes when previous() is called if total has not been set', function () {
                    data = new PagingData(10);
                    expect(function () {
                        data.previous();
                    }).toThrow();
                });

                it('increments the current page when next is called', function () {
                    var changed = data.next();
                    expect(changed).toEqual(true);
                    expect(data.currentPage).toEqual(2);
                });

                it('does not increment the current page when next is called on the last page', function () {
                    var changed;
                    data.currentPage = 3;
                    changed = data.next();
                    expect(changed).toEqual(false);
                    expect(data.currentPage).toEqual(3);
                });

                it('explodes when next() is called if total has not been set', function () {
                    data = new PagingData(10);
                    expect(function () {
                        data.next();
                    }).toThrow();
                });

                it('returns true for hasPrevious() if past the first page', function () {
                    data.currentPage = 3;
                    expect(data.hasPrevious()).toEqual(true);
                });

                it('returns false for hasPrevious() if on the first page', function () {
                    expect(data.hasPrevious()).toEqual(false);
                });

                it('explodes when hasPrevious() is called if total has not been set', function () {
                    data = new PagingData(10);
                    expect(function () {
                        data.hasPrevious();
                    }).toThrow();
                });

                it('returns true for hasNext() if not on the last page', function () {
                    expect(data.hasNext()).toEqual(true);
                });

                it('returns false for hasNext() if on the last page', function () {
                    data.currentPage = 3;
                    expect(data.hasNext()).toEqual(false);
                });

                it('explodes when hasNext() is called if total has not been set', function () {
                    data = new PagingData(10);
                    expect(function () {
                        data.hasNext();
                    }).toThrow();
                });

                it('returns the correct start index on first page', function () {
                    expect(data.getStart()).toEqual(0);
                });

                it('returns the correct start index on non-first page', function () {
                    data.currentPage = 3;
                    expect(data.getStart()).toEqual(20);
                });

                it('returns the correct page count', function () {
                    expect(data.getPageCount(1)).toEqual(1);
                    expect(data.getPageCount(8)).toEqual(1);
                    expect(data.getPageCount(28)).toEqual(3);
                });

                it('returns the correct page count when exactly a single page of objects is given', function () {
                    expect(data.getPageCount(10)).toEqual(1);
                });

                it('returns the true when hasMultiplePages is called with more items than the page size', function () {
                    data.setTotal(11);
                    expect(data.hasMultiplePages()).toBeTruthy();
                });

                it('returns the false when hasMultiplePages is called with fewer items than the page size', function () {
                    data.setTotal(9);
                    expect(data.hasMultiplePages()).toBeFalsy();
                });

                it('returns the false when hasMultiplePages is called with as many items as the page size', function () {
                    data.setTotal(10);
                    expect(data.hasMultiplePages()).toBeFalsy();
                });

                it('resets currentPage to 1 if resetPaging is called', function () {
                    data.currentPage = 3;
                    data.resetCurrentPage();
                    expect(data.currentPage).toEqual(1);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zZWFyY2gvUGFnaW5nRGF0YVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwrQkFBK0IsVUFBVSxTQUFTOzs7OztJQUsxRjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkJBQTJCO1lBQ2pGLGVBQWUsMEJBQTBCOztRQUU3QyxTQUFTLFlBQVk7WUFON0IsU0FBUyxjQUFjLFlBQVc7Z0JBQzlCLElBQUksWUFBWTs7Z0JBRWhCLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLGNBQWM7b0JBQ3JDLGFBQWE7b0JBQ2IsT0FBTyxJQUFJLFdBQVc7b0JBQ3RCLEtBQUssU0FBUzs7O2dCQUdsQixHQUFHLHdEQUF3RCxZQUFXO29CQUNsRSxPQUFPLElBQUk7b0JBQ1gsT0FBTyxLQUFLLGNBQWMsUUFBUTs7O2dCQUd0QyxHQUFHLDJDQUEyQyxZQUFXO29CQUNyRCxPQUFPLElBQUksV0FBVztvQkFDdEIsT0FBTyxLQUFLLGNBQWMsUUFBUTs7O2dCQUd0QyxHQUFHLG9CQUFvQixZQUFXO29CQUM5QixPQUFPLEtBQUssYUFBYSxRQUFROzs7Z0JBR3JDLEdBQUcsa0JBQWtCLFlBQVc7b0JBQzVCLEtBQUssU0FBUztvQkFDZCxPQUFPLEtBQUssWUFBWSxRQUFROzs7Z0JBR3BDLEdBQUcsMERBQTBELFlBQVc7O29CQUVwRSxLQUFLLFNBQVM7b0JBQ2QsS0FBSyxjQUFjOzs7b0JBR25CLEtBQUssU0FBUztvQkFDZCxPQUFPLEtBQUssYUFBYSxRQUFROzs7Z0JBR3JDLEdBQUcsMkJBQTJCLFlBQVc7b0JBQ3JDLEtBQUssZ0JBQWdCO29CQUNyQixPQUFPLEtBQUssY0FBYyxRQUFROzs7Z0JBR3RDLEdBQUcsaUVBQWlFLFlBQVc7O29CQUUzRSxLQUFLLFNBQVM7b0JBQ2QsS0FBSyxjQUFjOzs7b0JBR25CLEtBQUssZ0JBQWdCO29CQUNyQixPQUFPLEtBQUssYUFBYSxRQUFROzs7Z0JBR3JDLEdBQUcsdURBQXVELFlBQVc7b0JBQ2pFLElBQUk7b0JBQ0osS0FBSyxjQUFjO29CQUNuQixVQUFVLEtBQUs7b0JBQ2YsT0FBTyxTQUFTLFFBQVE7b0JBQ3hCLE9BQU8sS0FBSyxhQUFhLFFBQVE7OztnQkFHckMsR0FBRyxpRkFBaUYsWUFBVztvQkFDM0YsSUFBSSxVQUFVLEtBQUs7b0JBQ25CLE9BQU8sU0FBUyxRQUFRO29CQUN4QixPQUFPLEtBQUssYUFBYSxRQUFROzs7Z0JBR3JDLEdBQUcsZ0VBQWdFLFlBQVc7b0JBQzFFLE9BQU8sSUFBSSxXQUFXO29CQUN0QixPQUFPLFlBQVc7d0JBQUUsS0FBSzt1QkFBZTs7O2dCQUc1QyxHQUFHLG1EQUFtRCxZQUFXO29CQUM3RCxJQUFJLFVBQVUsS0FBSztvQkFDbkIsT0FBTyxTQUFTLFFBQVE7b0JBQ3hCLE9BQU8sS0FBSyxhQUFhLFFBQVE7OztnQkFHckMsR0FBRyw0RUFBNEUsWUFBVztvQkFDdEYsSUFBSTtvQkFDSixLQUFLLGNBQWM7b0JBQ25CLFVBQVUsS0FBSztvQkFDZixPQUFPLFNBQVMsUUFBUTtvQkFDeEIsT0FBTyxLQUFLLGFBQWEsUUFBUTs7O2dCQUdyQyxHQUFHLDREQUE0RCxZQUFXO29CQUN0RSxPQUFPLElBQUksV0FBVztvQkFDdEIsT0FBTyxZQUFXO3dCQUFFLEtBQUs7dUJBQVc7OztnQkFHeEMsR0FBRyx5REFBeUQsWUFBVztvQkFDbkUsS0FBSyxjQUFjO29CQUNuQixPQUFPLEtBQUssZUFBZSxRQUFROzs7Z0JBR3ZDLEdBQUcsd0RBQXdELFlBQVc7b0JBQ2xFLE9BQU8sS0FBSyxlQUFlLFFBQVE7OztnQkFHdkMsR0FBRyxtRUFBbUUsWUFBVztvQkFDN0UsT0FBTyxJQUFJLFdBQVc7b0JBQ3RCLE9BQU8sWUFBVzt3QkFBRSxLQUFLO3VCQUFrQjs7O2dCQUcvQyxHQUFHLHNEQUFzRCxZQUFXO29CQUNoRSxPQUFPLEtBQUssV0FBVyxRQUFROzs7Z0JBR25DLEdBQUcsbURBQW1ELFlBQVc7b0JBQzdELEtBQUssY0FBYztvQkFDbkIsT0FBTyxLQUFLLFdBQVcsUUFBUTs7O2dCQUduQyxHQUFHLCtEQUErRCxZQUFXO29CQUN6RSxPQUFPLElBQUksV0FBVztvQkFDdEIsT0FBTyxZQUFXO3dCQUFFLEtBQUs7dUJBQWM7OztnQkFHM0MsR0FBRyxpREFBaUQsWUFBVztvQkFDM0QsT0FBTyxLQUFLLFlBQVksUUFBUTs7O2dCQUdwQyxHQUFHLHFEQUFxRCxZQUFXO29CQUMvRCxLQUFLLGNBQWM7b0JBQ25CLE9BQU8sS0FBSyxZQUFZLFFBQVE7OztnQkFHcEMsR0FBRyxrQ0FBa0MsWUFBVztvQkFDNUMsT0FBTyxLQUFLLGFBQWEsSUFBSSxRQUFRO29CQUNyQyxPQUFPLEtBQUssYUFBYSxJQUFJLFFBQVE7b0JBQ3JDLE9BQU8sS0FBSyxhQUFhLEtBQUssUUFBUTs7O2dCQUcxQyxHQUFHLGlGQUFpRixZQUFXO29CQUMzRixPQUFPLEtBQUssYUFBYSxLQUFLLFFBQVE7OztnQkFHMUMsR0FBRyx1RkFBdUYsWUFBVztvQkFDakcsS0FBSyxTQUFTO29CQUNkLE9BQU8sS0FBSyxvQkFBb0I7OztnQkFHcEMsR0FBRyx5RkFBeUYsWUFBVztvQkFDbkcsS0FBSyxTQUFTO29CQUNkLE9BQU8sS0FBSyxvQkFBb0I7OztnQkFHcEMsR0FBRyx5RkFBeUYsWUFBVztvQkFDbkcsS0FBSyxTQUFTO29CQUNkLE9BQU8sS0FBSyxvQkFBb0I7OztnQkFHcEMsR0FBRyxvREFBb0QsWUFBVztvQkFDOUQsS0FBSyxjQUFjO29CQUNuQixLQUFLO29CQUNMLE9BQU8sS0FBSyxhQUFhLFFBQVE7Ozs7O0dBb0J0QyIsImZpbGUiOiJjb21tb24vc2VhcmNoL1BhZ2luZ0RhdGFUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgc2VhcmNoTW9kdWxlIGZyb20gJ2NvbW1vbi9zZWFyY2gvU2VhcmNoTW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIFBhZ2luZ0RhdGEgbW9kZWwgb2JqZWN0LlxyXG4gKi9cclxuZGVzY3JpYmUoJ1BhZ2luZ0RhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBQYWdpbmdEYXRhLCBkYXRhO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHNlYXJjaE1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIFBhZ2luZ0RhdGEgY2xhc3MgYW5kIGEgZGVmYXVsdCBkYXRhIHRvIHRlc3Qgd2l0aC5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1BhZ2luZ0RhdGFfKSB7XHJcbiAgICAgICAgUGFnaW5nRGF0YSA9IF9QYWdpbmdEYXRhXztcclxuICAgICAgICBkYXRhID0gbmV3IFBhZ2luZ0RhdGEoMTApO1xyXG4gICAgICAgIGRhdGEuc2V0VG90YWwoMzApO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGl0KCdkZWZhdWx0cyB0byBwYWdlIHNpemUgb2YgMTIgd2l0aCBkZWZhdWx0IGNvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZGF0YSA9IG5ldyBQYWdpbmdEYXRhKCk7XHJcbiAgICAgICAgZXhwZWN0KGRhdGEuaXRlbXNQZXJQYWdlKS50b0VxdWFsKDEyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdhY2NlcHRzIGl0ZW1zUGVyUGFnZSBpbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBkYXRhID0gbmV3IFBhZ2luZ0RhdGEoMzApO1xyXG4gICAgICAgIGV4cGVjdChkYXRhLml0ZW1zUGVyUGFnZSkudG9FcXVhbCgzMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc3RhcnRzIGF0IHBhZ2UgMScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChkYXRhLmN1cnJlbnRQYWdlKS50b0VxdWFsKDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3NldHMgdGhlIHRvdGFsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZGF0YS5zZXRUb3RhbCgxMDApO1xyXG4gICAgICAgIGV4cGVjdChkYXRhLmdldFRvdGFsKCkpLnRvRXF1YWwoMTAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdjaGFuZ2VzIHRoZSBjdXJyZW50IHBhZ2UgaWYgdGhlIHRvdGFsIHNocmlua3MgdG9vIG11Y2gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBTdGFydCB3aXRoIDMgcGFnZXMgYW5kIGdvIHRvIHRoZSAzcmQgcGFnZS5cclxuICAgICAgICBkYXRhLnNldFRvdGFsKDMwKTtcclxuICAgICAgICBkYXRhLmN1cnJlbnRQYWdlID0gMztcclxuXHJcbiAgICAgICAgLy8gU2hyaW5rIGRvd24gdG8gb25seSAxIHBhZ2Ugd29ydGguICBNYWtlIHN1cmUgY3VycmVudCBwYWdlIGlzIHVwZGF0ZWQuXHJcbiAgICAgICAgZGF0YS5zZXRUb3RhbCg4KTtcclxuICAgICAgICBleHBlY3QoZGF0YS5jdXJyZW50UGFnZSkudG9FcXVhbCgxKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzZXRzIHRoZSBpdGVtcyBwZXIgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRhdGEuc2V0SXRlbXNQZXJQYWdlKDIpO1xyXG4gICAgICAgIGV4cGVjdChkYXRhLml0ZW1zUGVyUGFnZSkudG9FcXVhbCgyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdjaGFuZ2VzIHRoZSBjdXJyZW50IHBhZ2UgaWYgdGhlIGl0ZW1zIHBlciBwYWdlIGdyb3dzIHRvbyBtdWNoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gU3RhcnQgd2l0aCAzIHBhZ2VzIGFuZCBnbyB0byB0aGUgM3JkIHBhZ2UuXHJcbiAgICAgICAgZGF0YS5zZXRUb3RhbCgzMCk7XHJcbiAgICAgICAgZGF0YS5jdXJyZW50UGFnZSA9IDM7XHJcblxyXG4gICAgICAgIC8vIENoYW5nZSBpdGVtcyBwZXIgcGFnZSB0byAyMCBhbmQgbWFrZSBzdXJlIHdlIGdvIHRvIHRoZSBzZWNvbmQgcGFnZS5cclxuICAgICAgICBkYXRhLnNldEl0ZW1zUGVyUGFnZSgyMCk7XHJcbiAgICAgICAgZXhwZWN0KGRhdGEuY3VycmVudFBhZ2UpLnRvRXF1YWwoMik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZGVjcmVtZW50cyB0aGUgY3VycmVudCBwYWdlIHdoZW4gcHJldmlvdXMgaXMgY2FsbGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNoYW5nZWQ7XHJcbiAgICAgICAgZGF0YS5jdXJyZW50UGFnZSA9IDM7XHJcbiAgICAgICAgY2hhbmdlZCA9IGRhdGEucHJldmlvdXMoKTtcclxuICAgICAgICBleHBlY3QoY2hhbmdlZCkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICBleHBlY3QoZGF0YS5jdXJyZW50UGFnZSkudG9FcXVhbCgyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkb2VzIG5vdCBkZWNyZW1lbnQgdGhlIGN1cnJlbnQgcGFnZSB3aGVuIHByZXZpb3VzIGlzIGNhbGxlZCBvbiB0aGUgZmlyc3QgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjaGFuZ2VkID0gZGF0YS5wcmV2aW91cygpO1xyXG4gICAgICAgIGV4cGVjdChjaGFuZ2VkKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICBleHBlY3QoZGF0YS5jdXJyZW50UGFnZSkudG9FcXVhbCgxKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdleHBsb2RlcyB3aGVuIHByZXZpb3VzKCkgaXMgY2FsbGVkIGlmIHRvdGFsIGhhcyBub3QgYmVlbiBzZXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBkYXRhID0gbmV3IFBhZ2luZ0RhdGEoMTApO1xyXG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgZGF0YS5wcmV2aW91cygpOyB9KS50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnaW5jcmVtZW50cyB0aGUgY3VycmVudCBwYWdlIHdoZW4gbmV4dCBpcyBjYWxsZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY2hhbmdlZCA9IGRhdGEubmV4dCgpO1xyXG4gICAgICAgIGV4cGVjdChjaGFuZ2VkKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIGV4cGVjdChkYXRhLmN1cnJlbnRQYWdlKS50b0VxdWFsKDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2RvZXMgbm90IGluY3JlbWVudCB0aGUgY3VycmVudCBwYWdlIHdoZW4gbmV4dCBpcyBjYWxsZWQgb24gdGhlIGxhc3QgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjaGFuZ2VkO1xyXG4gICAgICAgIGRhdGEuY3VycmVudFBhZ2UgPSAzO1xyXG4gICAgICAgIGNoYW5nZWQgPSBkYXRhLm5leHQoKTtcclxuICAgICAgICBleHBlY3QoY2hhbmdlZCkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgZXhwZWN0KGRhdGEuY3VycmVudFBhZ2UpLnRvRXF1YWwoMyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZXhwbG9kZXMgd2hlbiBuZXh0KCkgaXMgY2FsbGVkIGlmIHRvdGFsIGhhcyBub3QgYmVlbiBzZXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBkYXRhID0gbmV3IFBhZ2luZ0RhdGEoMTApO1xyXG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgZGF0YS5uZXh0KCk7IH0pLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGhhc1ByZXZpb3VzKCkgaWYgcGFzdCB0aGUgZmlyc3QgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRhdGEuY3VycmVudFBhZ2UgPSAzO1xyXG4gICAgICAgIGV4cGVjdChkYXRhLmhhc1ByZXZpb3VzKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgaGFzUHJldmlvdXMoKSBpZiBvbiB0aGUgZmlyc3QgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChkYXRhLmhhc1ByZXZpb3VzKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2V4cGxvZGVzIHdoZW4gaGFzUHJldmlvdXMoKSBpcyBjYWxsZWQgaWYgdG90YWwgaGFzIG5vdCBiZWVuIHNldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRhdGEgPSBuZXcgUGFnaW5nRGF0YSgxMCk7XHJcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBkYXRhLmhhc1ByZXZpb3VzKCk7IH0pLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGhhc05leHQoKSBpZiBub3Qgb24gdGhlIGxhc3QgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChkYXRhLmhhc05leHQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBoYXNOZXh0KCkgaWYgb24gdGhlIGxhc3QgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRhdGEuY3VycmVudFBhZ2UgPSAzO1xyXG4gICAgICAgIGV4cGVjdChkYXRhLmhhc05leHQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZXhwbG9kZXMgd2hlbiBoYXNOZXh0KCkgaXMgY2FsbGVkIGlmIHRvdGFsIGhhcyBub3QgYmVlbiBzZXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBkYXRhID0gbmV3IFBhZ2luZ0RhdGEoMTApO1xyXG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgZGF0YS5oYXNOZXh0KCk7IH0pLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHN0YXJ0IGluZGV4IG9uIGZpcnN0IHBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZGF0YS5nZXRTdGFydCgpKS50b0VxdWFsKDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdGhlIGNvcnJlY3Qgc3RhcnQgaW5kZXggb24gbm9uLWZpcnN0IHBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBkYXRhLmN1cnJlbnRQYWdlID0gMztcclxuICAgICAgICBleHBlY3QoZGF0YS5nZXRTdGFydCgpKS50b0VxdWFsKDIwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHBhZ2UgY291bnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZGF0YS5nZXRQYWdlQ291bnQoMSkpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgZXhwZWN0KGRhdGEuZ2V0UGFnZUNvdW50KDgpKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIGV4cGVjdChkYXRhLmdldFBhZ2VDb3VudCgyOCkpLnRvRXF1YWwoMyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCBwYWdlIGNvdW50IHdoZW4gZXhhY3RseSBhIHNpbmdsZSBwYWdlIG9mIG9iamVjdHMgaXMgZ2l2ZW4nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZGF0YS5nZXRQYWdlQ291bnQoMTApKS50b0VxdWFsKDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdGhlIHRydWUgd2hlbiBoYXNNdWx0aXBsZVBhZ2VzIGlzIGNhbGxlZCB3aXRoIG1vcmUgaXRlbXMgdGhhbiB0aGUgcGFnZSBzaXplJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZGF0YS5zZXRUb3RhbCgxMSk7XHJcbiAgICAgICAgZXhwZWN0KGRhdGEuaGFzTXVsdGlwbGVQYWdlcygpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyB0aGUgZmFsc2Ugd2hlbiBoYXNNdWx0aXBsZVBhZ2VzIGlzIGNhbGxlZCB3aXRoIGZld2VyIGl0ZW1zIHRoYW4gdGhlIHBhZ2Ugc2l6ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRhdGEuc2V0VG90YWwoOSk7XHJcbiAgICAgICAgZXhwZWN0KGRhdGEuaGFzTXVsdGlwbGVQYWdlcygpKS50b0JlRmFsc3koKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRoZSBmYWxzZSB3aGVuIGhhc011bHRpcGxlUGFnZXMgaXMgY2FsbGVkIHdpdGggYXMgbWFueSBpdGVtcyBhcyB0aGUgcGFnZSBzaXplJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZGF0YS5zZXRUb3RhbCgxMCk7XHJcbiAgICAgICAgZXhwZWN0KGRhdGEuaGFzTXVsdGlwbGVQYWdlcygpKS50b0JlRmFsc3koKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXNldHMgY3VycmVudFBhZ2UgdG8gMSBpZiByZXNldFBhZ2luZyBpcyBjYWxsZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBkYXRhLmN1cnJlbnRQYWdlID0gMztcclxuICAgICAgICBkYXRhLnJlc2V0Q3VycmVudFBhZ2UoKTtcclxuICAgICAgICBleHBlY3QoZGF0YS5jdXJyZW50UGFnZSkudG9FcXVhbCgxKTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
