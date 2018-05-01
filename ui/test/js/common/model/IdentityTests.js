System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the Identity model object.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('Identity', function () {
                var identityData, Identity, identity;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Setup the Identity class and create some data to test with.
                 */
                beforeEach(inject(function (_Identity_) {
                    Identity = _Identity_;
                    identityData = {
                        id: '1',
                        name: 'jbob',
                        displayName: 'Jay Bob',
                        managerName: 'Joe Bob',
                        location: 'Austin',
                        department: 'Agriculture'
                    };
                    identity = new Identity(identityData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new Identity(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new Identity('hi mom');
                    }).toThrow();
                    expect(function () {
                        new Identity(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns an ID read from data', function () {
                    expect(identity.getId()).toEqual(identityData.id);
                });

                it('returns a name read from data', function () {
                    expect(identity.getName()).toEqual(identityData.name);
                });

                it('returns a displayable name read from data', function () {
                    expect(identity.getDisplayableName()).toEqual(identityData.displayName);
                });

                it('returns a manager name read from data', function () {
                    expect(identity.getManagerName()).toEqual(identityData.managerName);
                });

                it('returns attributes read from data', function () {
                    expect(identity.getAttributes().location).toEqual(identityData.location);
                    expect(identity.getAttributes().department).toEqual(identityData.department);
                });

                it('getAttribute() returns data', function () {
                    expect(identity.getAttribute('location')).toEqual(identityData.location);
                    expect(identity.getAttribute('department')).toEqual(identityData.department);
                });

                it('getAttribute() returns undefined for non-existent attribute', function () {
                    expect(identity.getAttribute('not there')).toBeUndefined();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9JZGVudGl0eVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw2QkFBNkIsVUFBVSxTQUFTOzs7OztJQUt4Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGNBQWMsd0JBQXdCOztRQUUxQyxTQUFTLFlBQVk7WUFON0IsU0FBUyxZQUFZLFlBQVc7Z0JBQzVCLElBQUksY0FDQSxVQUNBOzs7Z0JBR0osV0FBVyxPQUFPOzs7OztnQkFLbEIsV0FBVyxPQUFPLFVBQVMsWUFBWTtvQkFDbkMsV0FBVztvQkFDWCxlQUFlO3dCQUNYLElBQUk7d0JBQ0osTUFBTTt3QkFDTixhQUFhO3dCQUNiLGFBQWE7d0JBQ2IsVUFBVTt3QkFDVixZQUFZOztvQkFFaEIsV0FBVyxJQUFJLFNBQVM7OztnQkFHNUIsR0FBRyw2Q0FBNkMsWUFBVztvQkFDdkQsT0FBTyxZQUFXO3dCQUFFLElBQUksU0FBUzt1QkFBVTs7O2dCQUcvQyxHQUFHLGlFQUFpRSxZQUFXO29CQUMzRSxPQUFPLFlBQVc7d0JBQUUsSUFBSSxTQUFTO3VCQUFjO29CQUMvQyxPQUFPLFlBQVc7d0JBQUUsSUFBSSxTQUFTLFlBQVc7NEJBQUUsT0FBTzs7dUJBQW9COzs7Z0JBRzdFLEdBQUcsZ0NBQWdDLFlBQVc7b0JBQzFDLE9BQU8sU0FBUyxTQUFTLFFBQVEsYUFBYTs7O2dCQUdsRCxHQUFHLGlDQUFpQyxZQUFXO29CQUMzQyxPQUFPLFNBQVMsV0FBVyxRQUFRLGFBQWE7OztnQkFHcEQsR0FBRyw2Q0FBNkMsWUFBVztvQkFDdkQsT0FBTyxTQUFTLHNCQUFzQixRQUFRLGFBQWE7OztnQkFHL0QsR0FBRyx5Q0FBeUMsWUFBVztvQkFDbkQsT0FBTyxTQUFTLGtCQUFrQixRQUFRLGFBQWE7OztnQkFHM0QsR0FBRyxxQ0FBcUMsWUFBVztvQkFDL0MsT0FBTyxTQUFTLGdCQUFnQixVQUFVLFFBQVEsYUFBYTtvQkFDL0QsT0FBTyxTQUFTLGdCQUFnQixZQUFZLFFBQVEsYUFBYTs7O2dCQUdyRSxHQUFHLCtCQUErQixZQUFXO29CQUN6QyxPQUFPLFNBQVMsYUFBYSxhQUFhLFFBQVEsYUFBYTtvQkFDL0QsT0FBTyxTQUFTLGFBQWEsZUFBZSxRQUFRLGFBQWE7OztnQkFHckUsR0FBRywrREFBK0QsWUFBVztvQkFDekUsT0FBTyxTQUFTLGFBQWEsY0FBYzs7Ozs7R0FrQmhEIiwiZmlsZSI6ImNvbW1vbi9tb2RlbC9JZGVudGl0eVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbW9kZWxNb2R1bGUgZnJvbSAnY29tbW9uL21vZGVsL01vZGVsTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIElkZW50aXR5IG1vZGVsIG9iamVjdC5cbiAqL1xuZGVzY3JpYmUoJ0lkZW50aXR5JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGlkZW50aXR5RGF0YSxcbiAgICAgICAgSWRlbnRpdHksXG4gICAgICAgIGlkZW50aXR5O1xuXG4gICAgLy8gVXNlIHRoZSBtb2RlbCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kZWxNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBJZGVudGl0eSBjbGFzcyBhbmQgY3JlYXRlIHNvbWUgZGF0YSB0byB0ZXN0IHdpdGguXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0lkZW50aXR5Xykge1xuICAgICAgICBJZGVudGl0eSA9IF9JZGVudGl0eV87XG4gICAgICAgIGlkZW50aXR5RGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBuYW1lOiAnamJvYicsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0pheSBCb2InLFxuICAgICAgICAgICAgbWFuYWdlck5hbWU6ICdKb2UgQm9iJyxcbiAgICAgICAgICAgIGxvY2F0aW9uOiAnQXVzdGluJyxcbiAgICAgICAgICAgIGRlcGFydG1lbnQ6ICdBZ3JpY3VsdHVyZSdcbiAgICAgICAgfTtcbiAgICAgICAgaWRlbnRpdHkgPSBuZXcgSWRlbnRpdHkoaWRlbnRpdHlEYXRhKTtcbiAgICB9KSk7XG5cbiAgICBpdCgncmVxdWlyZXMgbm9uLW51bGwgZGF0YSBpbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgSWRlbnRpdHkobnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IElkZW50aXR5KCdoaSBtb20nKTsgfSkudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBJZGVudGl0eShmdW5jdGlvbigpIHsgcmV0dXJuICd3aGF0IHRoYT8nOyB9KTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYW4gSUQgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5LmdldElkKCkpLnRvRXF1YWwoaWRlbnRpdHlEYXRhLmlkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgbmFtZSByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoaWRlbnRpdHkuZ2V0TmFtZSgpKS50b0VxdWFsKGlkZW50aXR5RGF0YS5uYW1lKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgZGlzcGxheWFibGUgbmFtZSByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoaWRlbnRpdHkuZ2V0RGlzcGxheWFibGVOYW1lKCkpLnRvRXF1YWwoaWRlbnRpdHlEYXRhLmRpc3BsYXlOYW1lKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgbWFuYWdlciBuYW1lIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChpZGVudGl0eS5nZXRNYW5hZ2VyTmFtZSgpKS50b0VxdWFsKGlkZW50aXR5RGF0YS5tYW5hZ2VyTmFtZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhdHRyaWJ1dGVzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChpZGVudGl0eS5nZXRBdHRyaWJ1dGVzKCkubG9jYXRpb24pLnRvRXF1YWwoaWRlbnRpdHlEYXRhLmxvY2F0aW9uKTtcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5LmdldEF0dHJpYnV0ZXMoKS5kZXBhcnRtZW50KS50b0VxdWFsKGlkZW50aXR5RGF0YS5kZXBhcnRtZW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdnZXRBdHRyaWJ1dGUoKSByZXR1cm5zIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5LmdldEF0dHJpYnV0ZSgnbG9jYXRpb24nKSkudG9FcXVhbChpZGVudGl0eURhdGEubG9jYXRpb24pO1xuICAgICAgICBleHBlY3QoaWRlbnRpdHkuZ2V0QXR0cmlidXRlKCdkZXBhcnRtZW50JykpLnRvRXF1YWwoaWRlbnRpdHlEYXRhLmRlcGFydG1lbnQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2dldEF0dHJpYnV0ZSgpIHJldHVybnMgdW5kZWZpbmVkIGZvciBub24tZXhpc3RlbnQgYXR0cmlidXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChpZGVudGl0eS5nZXRBdHRyaWJ1dGUoJ25vdCB0aGVyZScpKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
