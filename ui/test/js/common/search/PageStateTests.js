System.register(['test/js/TestInitializer', 'common/search/SearchModule'], function (_export) {

    /**
     * Tests for the PageState model object.
     */
    'use strict';

    var searchModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonSearchSearchModule) {
            searchModule = _commonSearchSearchModule['default'];
        }],
        execute: function () {
            describe('PageState', function () {
                var state, PageState;

                beforeEach(module(searchModule));

                /**
                 * Setup the PageState class and a default state to test with.
                 */
                beforeEach(inject(function (_PageState_) {
                    PageState = _PageState_;
                    state = new PageState();
                }));

                it('defaults to having paging and search data', function () {
                    // Make sure that these are non-null and defined.
                    expect(state.pagingData).toBeTruthy();
                    expect(state.searchData).toBeTruthy();
                });

                it('sets the values if provided', function () {
                    var searchData = {
                        filterValues: {}
                    },
                        pagingData = {
                        itemsPerPage: 10
                    };

                    state = new PageState(pagingData, searchData);
                    expect(state.pagingData).toBe(pagingData);
                    expect(state.searchData).toBe(searchData);
                });

                describe('sortOrder', function () {
                    it('defaults to having no sortOrder', function () {
                        expect(state.sortOrder).not.toBeDefined();
                    });

                    describe('setSort()', function () {
                        it('throws with undefined property', function () {
                            expect(function () {
                                state.setSort();
                            }).toThrow();
                        });

                        it('sets sortOrder with property and ascending defined', function () {
                            state.setSort('whatever', false);
                            expect(state.sortOrder.getSortProperty()).toBe('whatever');
                            expect(state.sortOrder.isSortAscending()).toBe(false);
                        });

                        it('sets ascending to opposite of current value if undefined and same property', function () {
                            state.setSort('whatever');
                            expect(state.sortOrder.getSortProperty()).toBe('whatever');
                            expect(state.sortOrder.isSortAscending()).toBe(true);
                            state.setSort('whatever');
                            expect(state.sortOrder.getSortProperty()).toBe('whatever');
                            expect(state.sortOrder.isSortAscending()).toBe(false);
                        });
                    });

                    describe('clearSort()', function () {
                        it('clears the sortOrder', function () {
                            state.setSort('whatever');
                            state.clearSort();
                            expect(state.sortOrder).not.toBeDefined();
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zZWFyY2gvUGFnZVN0YXRlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLCtCQUErQixVQUFVLFNBQVM7Ozs7O0lBSzFGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwyQkFBMkI7WUFDakYsZUFBZSwwQkFBMEI7O1FBRTdDLFNBQVMsWUFBWTtZQU43QixTQUFTLGFBQWEsWUFBVztnQkFDN0IsSUFBSSxPQUFPOztnQkFFWCxXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyxhQUFhO29CQUNwQyxZQUFZO29CQUNaLFFBQVEsSUFBSTs7O2dCQUdoQixHQUFHLDZDQUE2QyxZQUFXOztvQkFFdkQsT0FBTyxNQUFNLFlBQVk7b0JBQ3pCLE9BQU8sTUFBTSxZQUFZOzs7Z0JBRzdCLEdBQUcsK0JBQStCLFlBQVc7b0JBQ3pDLElBQUksYUFBYTt3QkFDYixjQUFjOzt3QkFDZixhQUFhO3dCQUNaLGNBQWM7OztvQkFHbEIsUUFBUSxJQUFJLFVBQVUsWUFBWTtvQkFDbEMsT0FBTyxNQUFNLFlBQVksS0FBSztvQkFDOUIsT0FBTyxNQUFNLFlBQVksS0FBSzs7O2dCQUdsQyxTQUFTLGFBQWEsWUFBVztvQkFDN0IsR0FBRyxtQ0FBbUMsWUFBVzt3QkFDN0MsT0FBTyxNQUFNLFdBQVcsSUFBSTs7O29CQUdoQyxTQUFTLGFBQWEsWUFBVzt3QkFDN0IsR0FBSSxrQ0FBa0MsWUFBVzs0QkFDN0MsT0FBTyxZQUFXO2dDQUFFLE1BQU07K0JBQWE7Ozt3QkFHM0MsR0FBSSxzREFBc0QsWUFBVzs0QkFDakUsTUFBTSxRQUFRLFlBQVk7NEJBQzFCLE9BQU8sTUFBTSxVQUFVLG1CQUFtQixLQUFLOzRCQUMvQyxPQUFPLE1BQU0sVUFBVSxtQkFBbUIsS0FBSzs7O3dCQUduRCxHQUFJLDhFQUE4RSxZQUFXOzRCQUN6RixNQUFNLFFBQVE7NEJBQ2QsT0FBTyxNQUFNLFVBQVUsbUJBQW1CLEtBQUs7NEJBQy9DLE9BQU8sTUFBTSxVQUFVLG1CQUFtQixLQUFLOzRCQUMvQyxNQUFNLFFBQVE7NEJBQ2QsT0FBTyxNQUFNLFVBQVUsbUJBQW1CLEtBQUs7NEJBQy9DLE9BQU8sTUFBTSxVQUFVLG1CQUFtQixLQUFLOzs7O29CQUl2RCxTQUFTLGVBQWUsWUFBVzt3QkFDL0IsR0FBSSx3QkFBd0IsWUFBVzs0QkFDbkMsTUFBTSxRQUFROzRCQUNkLE1BQU07NEJBQ04sT0FBTyxNQUFNLFdBQVcsSUFBSTs7Ozs7OztHQWlCekMiLCJmaWxlIjoiY29tbW9uL3NlYXJjaC9QYWdlU3RhdGVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgc2VhcmNoTW9kdWxlIGZyb20gJ2NvbW1vbi9zZWFyY2gvU2VhcmNoTW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIFBhZ2VTdGF0ZSBtb2RlbCBvYmplY3QuXHJcbiAqL1xyXG5kZXNjcmliZSgnUGFnZVN0YXRlJywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3RhdGUsIFBhZ2VTdGF0ZTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShzZWFyY2hNb2R1bGUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIHRoZSBQYWdlU3RhdGUgY2xhc3MgYW5kIGEgZGVmYXVsdCBzdGF0ZSB0byB0ZXN0IHdpdGguXHJcbiAgICAgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9QYWdlU3RhdGVfKSB7XHJcbiAgICAgICAgUGFnZVN0YXRlID0gX1BhZ2VTdGF0ZV87XHJcbiAgICAgICAgc3RhdGUgPSBuZXcgUGFnZVN0YXRlKCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgaXQoJ2RlZmF1bHRzIHRvIGhhdmluZyBwYWdpbmcgYW5kIHNlYXJjaCBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlc2UgYXJlIG5vbi1udWxsIGFuZCBkZWZpbmVkLlxyXG4gICAgICAgIGV4cGVjdChzdGF0ZS5wYWdpbmdEYXRhKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgZXhwZWN0KHN0YXRlLnNlYXJjaERhdGEpLnRvQmVUcnV0aHkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzZXRzIHRoZSB2YWx1ZXMgaWYgcHJvdmlkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2VhcmNoRGF0YSA9IHtcclxuICAgICAgICAgICAgZmlsdGVyVmFsdWVzOiB7fVxyXG4gICAgICAgIH0sIHBhZ2luZ0RhdGEgPSB7XHJcbiAgICAgICAgICAgIGl0ZW1zUGVyUGFnZTogMTBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdGF0ZSA9IG5ldyBQYWdlU3RhdGUocGFnaW5nRGF0YSwgc2VhcmNoRGF0YSk7XHJcbiAgICAgICAgZXhwZWN0KHN0YXRlLnBhZ2luZ0RhdGEpLnRvQmUocGFnaW5nRGF0YSk7XHJcbiAgICAgICAgZXhwZWN0KHN0YXRlLnNlYXJjaERhdGEpLnRvQmUoc2VhcmNoRGF0YSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc29ydE9yZGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ2RlZmF1bHRzIHRvIGhhdmluZyBubyBzb3J0T3JkZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KHN0YXRlLnNvcnRPcmRlcikubm90LnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdzZXRTb3J0KCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXQgKCd0aHJvd3Mgd2l0aCB1bmRlZmluZWQgcHJvcGVydHknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgc3RhdGUuc2V0U29ydCgpO30pLnRvVGhyb3coKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCAoJ3NldHMgc29ydE9yZGVyIHdpdGggcHJvcGVydHkgYW5kIGFzY2VuZGluZyBkZWZpbmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5zZXRTb3J0KCd3aGF0ZXZlcicsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5zb3J0T3JkZXIuZ2V0U29ydFByb3BlcnR5KCkpLnRvQmUoJ3doYXRldmVyJyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3RhdGUuc29ydE9yZGVyLmlzU29ydEFzY2VuZGluZygpKS50b0JlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCAoJ3NldHMgYXNjZW5kaW5nIHRvIG9wcG9zaXRlIG9mIGN1cnJlbnQgdmFsdWUgaWYgdW5kZWZpbmVkIGFuZCBzYW1lIHByb3BlcnR5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5zZXRTb3J0KCd3aGF0ZXZlcicpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHN0YXRlLnNvcnRPcmRlci5nZXRTb3J0UHJvcGVydHkoKSkudG9CZSgnd2hhdGV2ZXInKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5zb3J0T3JkZXIuaXNTb3J0QXNjZW5kaW5nKCkpLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5zZXRTb3J0KCd3aGF0ZXZlcicpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHN0YXRlLnNvcnRPcmRlci5nZXRTb3J0UHJvcGVydHkoKSkudG9CZSgnd2hhdGV2ZXInKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5zb3J0T3JkZXIuaXNTb3J0QXNjZW5kaW5nKCkpLnRvQmUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2NsZWFyU29ydCgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGl0ICgnY2xlYXJzIHRoZSBzb3J0T3JkZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnNldFNvcnQoJ3doYXRldmVyJyk7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5jbGVhclNvcnQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5zb3J0T3JkZXIpLm5vdC50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
