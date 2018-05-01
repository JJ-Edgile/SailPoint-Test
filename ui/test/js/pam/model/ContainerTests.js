System.register(['test/js/TestInitializer', 'pam/PamModule'], function (_export) {

    /**
     * Tests for the Container model object.
     */
    'use strict';

    var pamModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }],
        execute: function () {
            describe('Container', function () {
                var containerData = undefined,
                    Container = undefined,
                    container = undefined;

                // Use the model module.
                beforeEach(module(pamModule));

                /**
                 * Setup the Container class and create some data to test with.
                 */
                beforeEach(inject(function (_Container_) {
                    Container = _Container_;
                    containerData = {
                        id: '1',
                        name: 'jeff',
                        groupCount: 1,
                        identityIndirectCount: 2,
                        identityTotalCount: 3,
                        identityDirectCount: 4,
                        privilegedItemCount: 5
                    };
                    container = new Container(containerData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new Container(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new Container('hi mom');
                    }).toThrow();
                    expect(function () {
                        new Container(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns an ID read from data', function () {
                    expect(container.getId()).toEqual(containerData.id);
                });

                it('returns an groupCount read from data', function () {
                    expect(container.getGroupCount()).toEqual(containerData.groupCount);
                });

                it('returns an identityTotalCount read from data', function () {
                    expect(container.getIdentityTotalCount()).toEqual(containerData.identityTotalCount);
                });

                it('returns an privilegedItemCount read from data', function () {
                    expect(container.getPrivilegedItemCount()).toEqual(containerData.privilegedItemCount);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9tb2RlbC9Db250YWluZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsa0JBQWtCLFVBQVUsU0FBUzs7Ozs7SUFLN0U7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGVBQWU7WUFDckUsWUFBWSxjQUFjOztRQUU5QixTQUFTLFlBQVk7WUFON0IsU0FBUyxhQUFhLFlBQVc7Z0JBQzdCLElBQUksZ0JBQWE7b0JBQUUsWUFBUztvQkFBRSxZQUFTOzs7Z0JBR3ZDLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLGFBQWE7b0JBQ3BDLFlBQVk7b0JBQ1osZ0JBQWdCO3dCQUNaLElBQUs7d0JBQ0wsTUFBTTt3QkFDTixZQUFZO3dCQUNaLHVCQUF1Qjt3QkFDdkIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLHFCQUFxQjs7b0JBRXpCLFlBQVksSUFBSSxVQUFVOzs7Z0JBRzlCLEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELE9BQU8sWUFBVzt3QkFBRSxJQUFJLFVBQVU7dUJBQVU7OztnQkFHaEQsR0FBRyxpRUFBaUUsWUFBVztvQkFDM0UsT0FBTyxZQUFXO3dCQUFFLElBQUksVUFBVTt1QkFBYztvQkFDaEQsT0FBTyxZQUFXO3dCQUFFLElBQUksVUFBVSxZQUFXOzRCQUFFLE9BQU87O3VCQUFvQjs7O2dCQUc5RSxHQUFHLGdDQUFnQyxZQUFXO29CQUMxQyxPQUFPLFVBQVUsU0FBUyxRQUFRLGNBQWM7OztnQkFHcEQsR0FBRyx3Q0FBd0MsWUFBVztvQkFDbEQsT0FBTyxVQUFVLGlCQUFpQixRQUFRLGNBQWM7OztnQkFHNUQsR0FBRyxnREFBZ0QsWUFBVztvQkFDMUQsT0FBTyxVQUFVLHlCQUF5QixRQUFRLGNBQWM7OztnQkFHcEUsR0FBRyxpREFBaUQsWUFBVztvQkFDM0QsT0FBTyxVQUFVLDBCQUEwQixRQUFRLGNBQWM7Ozs7O0dBc0J0RSIsImZpbGUiOiJwYW0vbW9kZWwvQ29udGFpbmVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwYW1Nb2R1bGUgZnJvbSAncGFtL1BhbU1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBDb250YWluZXIgbW9kZWwgb2JqZWN0LlxuICovXG5kZXNjcmliZSgnQ29udGFpbmVyJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNvbnRhaW5lckRhdGEsIENvbnRhaW5lciwgY29udGFpbmVyO1xuXG4gICAgLy8gVXNlIHRoZSBtb2RlbCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocGFtTW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgQ29udGFpbmVyIGNsYXNzIGFuZCBjcmVhdGUgc29tZSBkYXRhIHRvIHRlc3Qgd2l0aC5cbiAgICAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfQ29udGFpbmVyXykge1xuICAgICAgICBDb250YWluZXIgPSBfQ29udGFpbmVyXztcbiAgICAgICAgY29udGFpbmVyRGF0YSA9IHtcbiAgICAgICAgICAgIGlkIDogJzEnLFxuICAgICAgICAgICAgbmFtZTogJ2plZmYnLFxuICAgICAgICAgICAgZ3JvdXBDb3VudDogMSxcbiAgICAgICAgICAgIGlkZW50aXR5SW5kaXJlY3RDb3VudDogMixcbiAgICAgICAgICAgIGlkZW50aXR5VG90YWxDb3VudDogMyxcbiAgICAgICAgICAgIGlkZW50aXR5RGlyZWN0Q291bnQ6IDQsXG4gICAgICAgICAgICBwcml2aWxlZ2VkSXRlbUNvdW50OiA1XG4gICAgICAgIH07XG4gICAgICAgIGNvbnRhaW5lciA9IG5ldyBDb250YWluZXIoY29udGFpbmVyRGF0YSk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3JlcXVpcmVzIG5vbi1udWxsIGRhdGEgaW4gdGhlIGNvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IENvbnRhaW5lcihudWxsKTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiB0aGUgZGF0YSBwYXNzZWQgdG8gdGhlIGNvbnN0cnVjdG9yIGlzIG5vdCBhbiBvYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgQ29udGFpbmVyKCdoaSBtb20nKTsgfSkudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBDb250YWluZXIoZnVuY3Rpb24oKSB7IHJldHVybiAnd2hhdCB0aGE/JzsgfSk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFuIElEIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChjb250YWluZXIuZ2V0SWQoKSkudG9FcXVhbChjb250YWluZXJEYXRhLmlkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFuIGdyb3VwQ291bnQgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGNvbnRhaW5lci5nZXRHcm91cENvdW50KCkpLnRvRXF1YWwoY29udGFpbmVyRGF0YS5ncm91cENvdW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFuIGlkZW50aXR5VG90YWxDb3VudCByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoY29udGFpbmVyLmdldElkZW50aXR5VG90YWxDb3VudCgpKS50b0VxdWFsKGNvbnRhaW5lckRhdGEuaWRlbnRpdHlUb3RhbENvdW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFuIHByaXZpbGVnZWRJdGVtQ291bnQgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGNvbnRhaW5lci5nZXRQcml2aWxlZ2VkSXRlbUNvdW50KCkpLnRvRXF1YWwoY29udGFpbmVyRGF0YS5wcml2aWxlZ2VkSXRlbUNvdW50KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
