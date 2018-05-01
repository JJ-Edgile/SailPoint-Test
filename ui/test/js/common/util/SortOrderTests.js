System.register(['test/js/TestInitializer', 'common/util/UtilModule'], function (_export) {

    /**
     * Tests for the SortOrder object.
     */
    'use strict';

    var utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }],
        execute: function () {
            describe('SortOrder', function () {

                // Fake property names to test with.
                var PROP1 = 'prop1',
                    PROP2 = 'prop2',
                    SortOrder;

                beforeEach(module(utilModule));

                beforeEach(inject(function (_SortOrder_) {
                    SortOrder = _SortOrder_;
                }));

                /**
                 * Check one instance of a SortOrder sort object.
                 *
                 * @param {Object} sort      The sort object with property and direction.
                 * @param {String} property  The expected property.
                 * @param {boolean} asc      The expected direction.
                 */
                var checkSort = function (sort, property, asc) {
                    expect(sort.property).toEqual(property);
                    expect(sort.direction).toEqual(asc ? SortOrder.ORDER_ASC : SortOrder.ORDER_DESC);
                };

                /**
                 * Check that the given SortOrder contains the expected sorting.  Secondary
                 * sorting is only checked if "secondary" is passed in.
                 *
                 * @param {SortOrder} sortOrder   The SortOrder to check.
                 * @param {String} property       The expected primary sort property.
                 * @param {boolean} asc           The expected primary sort direction.
                 * @param {String} secondary      The expected secondary sort property.  If
                 *   not specified, only a primary sort is expected.
                 * @param {boolean} secondaryAsc  The expected secondary sort direction.
                 */
                var checkSortOrder = function (sortOrder, property, asc, secondary, secondaryAsc) {
                    var length = secondary ? 2 : 1,
                        sorts = sortOrder.getSorts();

                    expect(sorts.length).toEqual(length);
                    checkSort(sorts[0], property, asc);

                    if (secondary) {
                        checkSort(sorts[1], secondary, secondaryAsc);
                    }
                };

                it('has no sorting with a default constructor', function () {
                    var sort = new SortOrder();
                    expect(sort.getSorts().length).toEqual(0);
                });

                it('accepts sorting in constructor', function () {
                    var sort = new SortOrder(PROP1, false);
                    checkSortOrder(sort, PROP1, false);
                });

                it('sorts ascending if constructor does not specify direction', function () {
                    var sort = new SortOrder(PROP1);
                    checkSortOrder(sort, PROP1, true);
                });

                it('adds primary ordering with one call to addSort()', function () {
                    var sort = new SortOrder();
                    sort.addSort(PROP1, true);
                    checkSortOrder(sort, PROP1, true);
                });

                it('adds secondary ordering with a second call to addSort()', function () {
                    var sort = new SortOrder();
                    sort.addSort(PROP1, true);
                    sort.addSort(PROP2, false);
                    checkSortOrder(sort, PROP1, true, PROP2, false);
                });

                it('adds second ordering to primary position with a second call to addSort() using unshift param', function () {
                    var sort = new SortOrder();
                    sort.addSort(PROP1, true);
                    sort.addSort(PROP2, false, true);
                    checkSortOrder(sort, PROP2, false, PROP1, true);
                });

                it('adds primary ordering with one call to add()', function () {
                    var toAdd = new SortOrder(PROP1, false);

                    var sort = new SortOrder();
                    sort.add(toAdd);
                    checkSortOrder(sort, PROP1, false);
                });

                it('adds secondary ordering with a second call to add()', function () {
                    var toAdd = new SortOrder(PROP1, false),
                        toAdd2 = new SortOrder(PROP2, true);

                    var sort = new SortOrder();
                    sort.add(toAdd);
                    sort.add(toAdd2);
                    checkSortOrder(sort, PROP1, false, PROP2, true);
                });

                describe('getSortProperty()', function () {
                    it('returns null if no sorts', function () {
                        var sort = new SortOrder();
                        expect(sort.getSortProperty()).toBe(null);
                    });

                    it('returns last sort property if multiple sorts', function () {
                        var toAdd = new SortOrder(PROP1, false),
                            toAdd2 = new SortOrder(PROP2, true);

                        var sort = new SortOrder();
                        sort.add(toAdd);
                        sort.add(toAdd2);
                        expect(sort.getSortProperty()).toBe(PROP2);
                    });

                    it('returns the property if single sort', function () {
                        var sort = new SortOrder(PROP1, false);
                        expect(sort.getSortProperty()).toBe(PROP1);
                    });
                });

                describe('isSortAscending()', function () {
                    it('returns null if no sorts', function () {
                        var sort = new SortOrder();
                        expect(sort.isSortAscending()).toBe(null);
                    });

                    it('returns last sort direction if multiple sorts', function () {
                        var toAdd = new SortOrder(PROP1, false),
                            toAdd2 = new SortOrder(PROP2, true);

                        var sort = new SortOrder();
                        sort.add(toAdd);
                        sort.add(toAdd2);
                        expect(sort.isSortAscending()).toBe(true);
                    });

                    it('returns false if single sort descending', function () {
                        var sort = new SortOrder(PROP1, false);
                        expect(sort.isSortAscending()).toBe(false);
                    });

                    it('returns true if single sort ascending', function () {
                        var sort = new SortOrder(PROP1, true);
                        expect(sort.isSortAscending()).toBe(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsL1NvcnRPcmRlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsVUFBVSxTQUFTOzs7OztJQUExRjs7SUFPSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7WUFKN0IsU0FBUyxhQUFhLFlBQVc7OztnQkFHN0IsSUFBSSxRQUFRO29CQUNSLFFBQVE7b0JBQ1I7O2dCQUVKLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGFBQWE7b0JBQ3BDLFlBQVk7Ozs7Ozs7Ozs7Z0JBVWhCLElBQUksWUFBWSxVQUFTLE1BQU0sVUFBVSxLQUFLO29CQUMxQyxPQUFPLEtBQUssVUFBVSxRQUFRO29CQUM5QixPQUFPLEtBQUssV0FBVyxRQUFTLE1BQU8sVUFBVSxZQUNWLFVBQVU7Ozs7Ozs7Ozs7Ozs7O2dCQWNyRCxJQUFJLGlCQUFpQixVQUFTLFdBQVcsVUFBVSxLQUFLLFdBQVcsY0FBYztvQkFDN0UsSUFBSSxTQUFVLFlBQWEsSUFBSTt3QkFDM0IsUUFBUSxVQUFVOztvQkFFdEIsT0FBTyxNQUFNLFFBQVEsUUFBUTtvQkFDN0IsVUFBVSxNQUFNLElBQUksVUFBVTs7b0JBRTlCLElBQUksV0FBVzt3QkFDWCxVQUFVLE1BQU0sSUFBSSxXQUFXOzs7O2dCQUt2QyxHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxJQUFJLE9BQU8sSUFBSTtvQkFDZixPQUFPLEtBQUssV0FBVyxRQUFRLFFBQVE7OztnQkFHM0MsR0FBRyxrQ0FBa0MsWUFBVztvQkFDNUMsSUFBSSxPQUFPLElBQUksVUFBVSxPQUFPO29CQUNoQyxlQUFlLE1BQU0sT0FBTzs7O2dCQUdoQyxHQUFHLDZEQUE2RCxZQUFXO29CQUN2RSxJQUFJLE9BQU8sSUFBSSxVQUFVO29CQUN6QixlQUFlLE1BQU0sT0FBTzs7O2dCQUdoQyxHQUFHLG9EQUFvRCxZQUFXO29CQUM5RCxJQUFJLE9BQU8sSUFBSTtvQkFDZixLQUFLLFFBQVEsT0FBTztvQkFDcEIsZUFBZSxNQUFNLE9BQU87OztnQkFHaEMsR0FBRywyREFBMkQsWUFBVztvQkFDckUsSUFBSSxPQUFPLElBQUk7b0JBQ2YsS0FBSyxRQUFRLE9BQU87b0JBQ3BCLEtBQUssUUFBUSxPQUFPO29CQUNwQixlQUFlLE1BQU0sT0FBTyxNQUFNLE9BQU87OztnQkFHN0MsR0FBRyxnR0FBZ0csWUFBVztvQkFDMUcsSUFBSSxPQUFPLElBQUk7b0JBQ2YsS0FBSyxRQUFRLE9BQU87b0JBQ3BCLEtBQUssUUFBUSxPQUFPLE9BQU87b0JBQzNCLGVBQWUsTUFBTSxPQUFPLE9BQU8sT0FBTzs7O2dCQUc5QyxHQUFHLGdEQUFnRCxZQUFXO29CQUMxRCxJQUFJLFFBQVEsSUFBSSxVQUFVLE9BQU87O29CQUVqQyxJQUFJLE9BQU8sSUFBSTtvQkFDZixLQUFLLElBQUk7b0JBQ1QsZUFBZSxNQUFNLE9BQU87OztnQkFHaEMsR0FBRyx1REFBdUQsWUFBVztvQkFDakUsSUFBSSxRQUFRLElBQUksVUFBVSxPQUFPO3dCQUM3QixTQUFTLElBQUksVUFBVSxPQUFPOztvQkFFbEMsSUFBSSxPQUFPLElBQUk7b0JBQ2YsS0FBSyxJQUFJO29CQUNULEtBQUssSUFBSTtvQkFDVCxlQUFlLE1BQU0sT0FBTyxPQUFPLE9BQU87OztnQkFHOUMsU0FBUyxxQkFBcUIsWUFBVztvQkFDckMsR0FBSSw0QkFBNEIsWUFBVzt3QkFDdkMsSUFBSSxPQUFPLElBQUk7d0JBQ2YsT0FBTyxLQUFLLG1CQUFtQixLQUFLOzs7b0JBR3hDLEdBQUksZ0RBQWdELFlBQVc7d0JBQzNELElBQUksUUFBUSxJQUFJLFVBQVUsT0FBTzs0QkFDN0IsU0FBUyxJQUFJLFVBQVUsT0FBTzs7d0JBRWxDLElBQUksT0FBTyxJQUFJO3dCQUNmLEtBQUssSUFBSTt3QkFDVCxLQUFLLElBQUk7d0JBQ1QsT0FBTyxLQUFLLG1CQUFtQixLQUFLOzs7b0JBR3hDLEdBQUksdUNBQXVDLFlBQVc7d0JBQ2xELElBQUksT0FBTyxJQUFJLFVBQVUsT0FBTzt3QkFDaEMsT0FBTyxLQUFLLG1CQUFtQixLQUFLOzs7O2dCQUk1QyxTQUFTLHFCQUFxQixZQUFXO29CQUNyQyxHQUFJLDRCQUE0QixZQUFXO3dCQUN2QyxJQUFJLE9BQU8sSUFBSTt3QkFDZixPQUFPLEtBQUssbUJBQW1CLEtBQUs7OztvQkFHeEMsR0FBSSxpREFBaUQsWUFBVzt3QkFDNUQsSUFBSSxRQUFRLElBQUksVUFBVSxPQUFPOzRCQUM3QixTQUFTLElBQUksVUFBVSxPQUFPOzt3QkFFbEMsSUFBSSxPQUFPLElBQUk7d0JBQ2YsS0FBSyxJQUFJO3dCQUNULEtBQUssSUFBSTt3QkFDVCxPQUFPLEtBQUssbUJBQW1CLEtBQUs7OztvQkFHeEMsR0FBSSwyQ0FBMkMsWUFBVzt3QkFDdEQsSUFBSSxPQUFPLElBQUksVUFBVSxPQUFPO3dCQUNoQyxPQUFPLEtBQUssbUJBQW1CLEtBQUs7OztvQkFHeEMsR0FBSSx5Q0FBeUMsWUFBVzt3QkFDcEQsSUFBSSxPQUFPLElBQUksVUFBVSxPQUFPO3dCQUNoQyxPQUFPLEtBQUssbUJBQW1CLEtBQUs7Ozs7OztHQVM3QyIsImZpbGUiOiJjb21tb24vdXRpbC9Tb3J0T3JkZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgdXRpbE1vZHVsZSBmcm9tICdjb21tb24vdXRpbC9VdGlsTW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIFNvcnRPcmRlciBvYmplY3QuXHJcbiAqL1xyXG5kZXNjcmliZSgnU29ydE9yZGVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gRmFrZSBwcm9wZXJ0eSBuYW1lcyB0byB0ZXN0IHdpdGguXHJcbiAgICB2YXIgUFJPUDEgPSAncHJvcDEnLFxyXG4gICAgICAgIFBST1AyID0gJ3Byb3AyJyxcclxuICAgICAgICBTb3J0T3JkZXI7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodXRpbE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9Tb3J0T3JkZXJfKSB7XHJcbiAgICAgICAgU29ydE9yZGVyID0gX1NvcnRPcmRlcl87XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBvbmUgaW5zdGFuY2Ugb2YgYSBTb3J0T3JkZXIgc29ydCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNvcnQgICAgICBUaGUgc29ydCBvYmplY3Qgd2l0aCBwcm9wZXJ0eSBhbmQgZGlyZWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5ICBUaGUgZXhwZWN0ZWQgcHJvcGVydHkuXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFzYyAgICAgIFRoZSBleHBlY3RlZCBkaXJlY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHZhciBjaGVja1NvcnQgPSBmdW5jdGlvbihzb3J0LCBwcm9wZXJ0eSwgYXNjKSB7XHJcbiAgICAgICAgZXhwZWN0KHNvcnQucHJvcGVydHkpLnRvRXF1YWwocHJvcGVydHkpO1xyXG4gICAgICAgIGV4cGVjdChzb3J0LmRpcmVjdGlvbikudG9FcXVhbCgoYXNjKSA/IFNvcnRPcmRlci5PUkRFUl9BU0NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBTb3J0T3JkZXIuT1JERVJfREVTQyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgdGhhdCB0aGUgZ2l2ZW4gU29ydE9yZGVyIGNvbnRhaW5zIHRoZSBleHBlY3RlZCBzb3J0aW5nLiAgU2Vjb25kYXJ5XHJcbiAgICAgKiBzb3J0aW5nIGlzIG9ubHkgY2hlY2tlZCBpZiBcInNlY29uZGFyeVwiIGlzIHBhc3NlZCBpbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1NvcnRPcmRlcn0gc29ydE9yZGVyICAgVGhlIFNvcnRPcmRlciB0byBjaGVjay5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eSAgICAgICBUaGUgZXhwZWN0ZWQgcHJpbWFyeSBzb3J0IHByb3BlcnR5LlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhc2MgICAgICAgICAgIFRoZSBleHBlY3RlZCBwcmltYXJ5IHNvcnQgZGlyZWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlY29uZGFyeSAgICAgIFRoZSBleHBlY3RlZCBzZWNvbmRhcnkgc29ydCBwcm9wZXJ0eS4gIElmXHJcbiAgICAgKiAgIG5vdCBzcGVjaWZpZWQsIG9ubHkgYSBwcmltYXJ5IHNvcnQgaXMgZXhwZWN0ZWQuXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlY29uZGFyeUFzYyAgVGhlIGV4cGVjdGVkIHNlY29uZGFyeSBzb3J0IGRpcmVjdGlvbi5cclxuICAgICAqL1xyXG4gICAgdmFyIGNoZWNrU29ydE9yZGVyID0gZnVuY3Rpb24oc29ydE9yZGVyLCBwcm9wZXJ0eSwgYXNjLCBzZWNvbmRhcnksIHNlY29uZGFyeUFzYykge1xyXG4gICAgICAgIHZhciBsZW5ndGggPSAoc2Vjb25kYXJ5KSA/IDIgOiAxLFxyXG4gICAgICAgICAgICBzb3J0cyA9IHNvcnRPcmRlci5nZXRTb3J0cygpO1xyXG5cclxuICAgICAgICBleHBlY3Qoc29ydHMubGVuZ3RoKS50b0VxdWFsKGxlbmd0aCk7XHJcbiAgICAgICAgY2hlY2tTb3J0KHNvcnRzWzBdLCBwcm9wZXJ0eSwgYXNjKTtcclxuXHJcbiAgICAgICAgaWYgKHNlY29uZGFyeSkge1xyXG4gICAgICAgICAgICBjaGVja1NvcnQoc29ydHNbMV0sIHNlY29uZGFyeSwgc2Vjb25kYXJ5QXNjKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBpdCgnaGFzIG5vIHNvcnRpbmcgd2l0aCBhIGRlZmF1bHQgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcclxuICAgICAgICBleHBlY3Qoc29ydC5nZXRTb3J0cygpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdhY2NlcHRzIHNvcnRpbmcgaW4gY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc29ydCA9IG5ldyBTb3J0T3JkZXIoUFJPUDEsIGZhbHNlKTtcclxuICAgICAgICBjaGVja1NvcnRPcmRlcihzb3J0LCBQUk9QMSwgZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3NvcnRzIGFzY2VuZGluZyBpZiBjb25zdHJ1Y3RvciBkb2VzIG5vdCBzcGVjaWZ5IGRpcmVjdGlvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzb3J0ID0gbmV3IFNvcnRPcmRlcihQUk9QMSk7XHJcbiAgICAgICAgY2hlY2tTb3J0T3JkZXIoc29ydCwgUFJPUDEsIHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2FkZHMgcHJpbWFyeSBvcmRlcmluZyB3aXRoIG9uZSBjYWxsIHRvIGFkZFNvcnQoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzb3J0ID0gbmV3IFNvcnRPcmRlcigpO1xyXG4gICAgICAgIHNvcnQuYWRkU29ydChQUk9QMSwgdHJ1ZSk7XHJcbiAgICAgICAgY2hlY2tTb3J0T3JkZXIoc29ydCwgUFJPUDEsIHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2FkZHMgc2Vjb25kYXJ5IG9yZGVyaW5nIHdpdGggYSBzZWNvbmQgY2FsbCB0byBhZGRTb3J0KCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcclxuICAgICAgICBzb3J0LmFkZFNvcnQoUFJPUDEsIHRydWUpO1xyXG4gICAgICAgIHNvcnQuYWRkU29ydChQUk9QMiwgZmFsc2UpO1xyXG4gICAgICAgIGNoZWNrU29ydE9yZGVyKHNvcnQsIFBST1AxLCB0cnVlLCBQUk9QMiwgZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2FkZHMgc2Vjb25kIG9yZGVyaW5nIHRvIHByaW1hcnkgcG9zaXRpb24gd2l0aCBhIHNlY29uZCBjYWxsIHRvIGFkZFNvcnQoKSB1c2luZyB1bnNoaWZ0IHBhcmFtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNvcnQgPSBuZXcgU29ydE9yZGVyKCk7XHJcbiAgICAgICAgc29ydC5hZGRTb3J0KFBST1AxLCB0cnVlKTtcclxuICAgICAgICBzb3J0LmFkZFNvcnQoUFJPUDIsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICBjaGVja1NvcnRPcmRlcihzb3J0LCBQUk9QMiwgZmFsc2UsIFBST1AxLCB0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdhZGRzIHByaW1hcnkgb3JkZXJpbmcgd2l0aCBvbmUgY2FsbCB0byBhZGQoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0b0FkZCA9IG5ldyBTb3J0T3JkZXIoUFJPUDEsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgdmFyIHNvcnQgPSBuZXcgU29ydE9yZGVyKCk7XHJcbiAgICAgICAgc29ydC5hZGQodG9BZGQpO1xyXG4gICAgICAgIGNoZWNrU29ydE9yZGVyKHNvcnQsIFBST1AxLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnYWRkcyBzZWNvbmRhcnkgb3JkZXJpbmcgd2l0aCBhIHNlY29uZCBjYWxsIHRvIGFkZCgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRvQWRkID0gbmV3IFNvcnRPcmRlcihQUk9QMSwgZmFsc2UpLFxyXG4gICAgICAgICAgICB0b0FkZDIgPSBuZXcgU29ydE9yZGVyKFBST1AyLCB0cnVlKTtcclxuXHJcbiAgICAgICAgdmFyIHNvcnQgPSBuZXcgU29ydE9yZGVyKCk7XHJcbiAgICAgICAgc29ydC5hZGQodG9BZGQpO1xyXG4gICAgICAgIHNvcnQuYWRkKHRvQWRkMik7XHJcbiAgICAgICAgY2hlY2tTb3J0T3JkZXIoc29ydCwgUFJPUDEsIGZhbHNlLCBQUk9QMiwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0U29ydFByb3BlcnR5KCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCAoJ3JldHVybnMgbnVsbCBpZiBubyBzb3J0cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNvcnQuZ2V0U29ydFByb3BlcnR5KCkpLnRvQmUobnVsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ICgncmV0dXJucyBsYXN0IHNvcnQgcHJvcGVydHkgaWYgbXVsdGlwbGUgc29ydHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRvQWRkID0gbmV3IFNvcnRPcmRlcihQUk9QMSwgZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgdG9BZGQyID0gbmV3IFNvcnRPcmRlcihQUk9QMiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcclxuICAgICAgICAgICAgc29ydC5hZGQodG9BZGQpO1xyXG4gICAgICAgICAgICBzb3J0LmFkZCh0b0FkZDIpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc29ydC5nZXRTb3J0UHJvcGVydHkoKSkudG9CZShQUk9QMik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ICgncmV0dXJucyB0aGUgcHJvcGVydHkgaWYgc2luZ2xlIHNvcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNvcnQgPSBuZXcgU29ydE9yZGVyKFBST1AxLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzb3J0LmdldFNvcnRQcm9wZXJ0eSgpKS50b0JlKFBST1AxKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc1NvcnRBc2NlbmRpbmcoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0ICgncmV0dXJucyBudWxsIGlmIG5vIHNvcnRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzb3J0ID0gbmV3IFNvcnRPcmRlcigpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc29ydC5pc1NvcnRBc2NlbmRpbmcoKSkudG9CZShudWxsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQgKCdyZXR1cm5zIGxhc3Qgc29ydCBkaXJlY3Rpb24gaWYgbXVsdGlwbGUgc29ydHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRvQWRkID0gbmV3IFNvcnRPcmRlcihQUk9QMSwgZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgdG9BZGQyID0gbmV3IFNvcnRPcmRlcihQUk9QMiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcclxuICAgICAgICAgICAgc29ydC5hZGQodG9BZGQpO1xyXG4gICAgICAgICAgICBzb3J0LmFkZCh0b0FkZDIpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc29ydC5pc1NvcnRBc2NlbmRpbmcoKSkudG9CZSh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQgKCdyZXR1cm5zIGZhbHNlIGlmIHNpbmdsZSBzb3J0IGRlc2NlbmRpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNvcnQgPSBuZXcgU29ydE9yZGVyKFBST1AxLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzb3J0LmlzU29ydEFzY2VuZGluZygpKS50b0JlKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQgKCdyZXR1cm5zIHRydWUgaWYgc2luZ2xlIHNvcnQgYXNjZW5kaW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzb3J0ID0gbmV3IFNvcnRPcmRlcihQUk9QMSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzb3J0LmlzU29ydEFzY2VuZGluZygpKS50b0JlKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
