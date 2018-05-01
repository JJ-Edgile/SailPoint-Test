System.register(['test/js/TestInitializer', 'common/model/ModelModule', './ModelTestData'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }, function (_ModelTestData) {}],
        execute: function () {

            /**
             * Tests for the RoleEntitlementItem model object.
             */
            describe('RoleEntitlementItem', function () {

                var RoleEntitlementItem, roleEntitlementItem, roleEntitlementData;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Setup the RoleEntitlementItem class and create some data to test with.
                 */
                beforeEach(inject(function (_RoleEntitlementItem_, modelTestData) {
                    RoleEntitlementItem = _RoleEntitlementItem_;
                    roleEntitlementData = modelTestData.ROLE_ENTITLEMENT_DATA;
                    roleEntitlementItem = new RoleEntitlementItem(roleEntitlementData);
                }));

                it('requires a non-null item in the constructor', function () {
                    expect(function () {
                        new RoleEntitlementItem(null);
                    }).toThrow();
                });

                it('description should be set', function () {
                    expect(roleEntitlementItem.description).toEqual(roleEntitlementData.description);
                });

                it('applicationName should be set', function () {
                    expect(roleEntitlementItem.applicationName).toEqual(roleEntitlementData.applicationName);
                });

                it('value should be set', function () {
                    expect(roleEntitlementItem.value).toEqual(roleEntitlementData.value);
                });

                it('property should be set', function () {
                    expect(roleEntitlementItem.property).toEqual(roleEntitlementData.property);
                });

                it('roleName should be set', function () {
                    expect(roleEntitlementItem.roleName).toEqual(roleEntitlementData.roleName);
                });

                it('displayValue should be set', function () {
                    expect(roleEntitlementItem.displayValue).toEqual(roleEntitlementData.displayValue);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9Sb2xlRW50aXRsZW1lbnRJdGVtVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixvQkFBb0IsVUFBVSxTQUFTOztJQUMvRzs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGNBQWMsd0JBQXdCO1dBQ3ZDLFVBQVUsZ0JBQWdCO1FBQzdCLFNBQVMsWUFBWTs7Ozs7WUFFN0IsU0FBUyx1QkFBdUIsWUFBVzs7Z0JBRXZDLElBQUkscUJBQXFCLHFCQUFxQjs7O2dCQUc5QyxXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyx1QkFBdUIsZUFBZTtvQkFDN0Qsc0JBQXNCO29CQUN0QixzQkFBc0IsY0FBYztvQkFDcEMsc0JBQXNCLElBQUksb0JBQW9COzs7Z0JBR2xELEdBQUcsK0NBQStDLFlBQVc7b0JBQ3pELE9BQU8sWUFBVzt3QkFDZCxJQUFJLG9CQUFvQjt1QkFDekI7OztnQkFHUCxHQUFHLDZCQUE2QixZQUFXO29CQUN2QyxPQUFPLG9CQUFvQixhQUFhLFFBQVEsb0JBQW9COzs7Z0JBR3hFLEdBQUcsaUNBQWlDLFlBQVc7b0JBQzNDLE9BQU8sb0JBQW9CLGlCQUFpQixRQUFRLG9CQUFvQjs7O2dCQUc1RSxHQUFHLHVCQUF1QixZQUFXO29CQUNqQyxPQUFPLG9CQUFvQixPQUFPLFFBQVEsb0JBQW9COzs7Z0JBR2xFLEdBQUcsMEJBQTBCLFlBQVc7b0JBQ3BDLE9BQU8sb0JBQW9CLFVBQVUsUUFBUSxvQkFBb0I7OztnQkFHckUsR0FBRywwQkFBMEIsWUFBVztvQkFDcEMsT0FBTyxvQkFBb0IsVUFBVSxRQUFRLG9CQUFvQjs7O2dCQUdyRSxHQUFHLDhCQUE4QixZQUFXO29CQUN4QyxPQUFPLG9CQUFvQixjQUFjLFFBQVEsb0JBQW9COzs7OztHQVExRSIsImZpbGUiOiJjb21tb24vbW9kZWwvUm9sZUVudGl0bGVtZW50SXRlbVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE1IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IG1vZGVsTW9kdWxlIGZyb20gJ2NvbW1vbi9tb2RlbC9Nb2RlbE1vZHVsZSc7XG5pbXBvcnQgJy4vTW9kZWxUZXN0RGF0YSc7XG5cblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFJvbGVFbnRpdGxlbWVudEl0ZW0gbW9kZWwgb2JqZWN0LlxuICovXG5kZXNjcmliZSgnUm9sZUVudGl0bGVtZW50SXRlbScsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIFJvbGVFbnRpdGxlbWVudEl0ZW0sIHJvbGVFbnRpdGxlbWVudEl0ZW0sIHJvbGVFbnRpdGxlbWVudERhdGE7XG5cbiAgICAvLyBVc2UgdGhlIG1vZGVsIG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtb2RlbE1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIFJvbGVFbnRpdGxlbWVudEl0ZW0gY2xhc3MgYW5kIGNyZWF0ZSBzb21lIGRhdGEgdG8gdGVzdCB3aXRoLlxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9Sb2xlRW50aXRsZW1lbnRJdGVtXywgbW9kZWxUZXN0RGF0YSkge1xuICAgICAgICBSb2xlRW50aXRsZW1lbnRJdGVtID0gX1JvbGVFbnRpdGxlbWVudEl0ZW1fO1xuICAgICAgICByb2xlRW50aXRsZW1lbnREYXRhID0gbW9kZWxUZXN0RGF0YS5ST0xFX0VOVElUTEVNRU5UX0RBVEE7XG4gICAgICAgIHJvbGVFbnRpdGxlbWVudEl0ZW0gPSBuZXcgUm9sZUVudGl0bGVtZW50SXRlbShyb2xlRW50aXRsZW1lbnREYXRhKTtcbiAgICB9KSk7XG5cbiAgICBpdCgncmVxdWlyZXMgYSBub24tbnVsbCBpdGVtIGluIHRoZSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuZXcgUm9sZUVudGl0bGVtZW50SXRlbShudWxsKTtcbiAgICAgICAgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Rlc2NyaXB0aW9uIHNob3VsZCBiZSBzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJvbGVFbnRpdGxlbWVudEl0ZW0uZGVzY3JpcHRpb24pLnRvRXF1YWwocm9sZUVudGl0bGVtZW50RGF0YS5kZXNjcmlwdGlvbik7XG4gICAgfSk7XG5cbiAgICBpdCgnYXBwbGljYXRpb25OYW1lIHNob3VsZCBiZSBzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJvbGVFbnRpdGxlbWVudEl0ZW0uYXBwbGljYXRpb25OYW1lKS50b0VxdWFsKHJvbGVFbnRpdGxlbWVudERhdGEuYXBwbGljYXRpb25OYW1lKTtcbiAgICB9KTtcblxuICAgIGl0KCd2YWx1ZSBzaG91bGQgYmUgc2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyb2xlRW50aXRsZW1lbnRJdGVtLnZhbHVlKS50b0VxdWFsKHJvbGVFbnRpdGxlbWVudERhdGEudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Byb3BlcnR5IHNob3VsZCBiZSBzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJvbGVFbnRpdGxlbWVudEl0ZW0ucHJvcGVydHkpLnRvRXF1YWwocm9sZUVudGl0bGVtZW50RGF0YS5wcm9wZXJ0eSk7XG4gICAgfSk7XG5cbiAgICBpdCgncm9sZU5hbWUgc2hvdWxkIGJlIHNldCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qocm9sZUVudGl0bGVtZW50SXRlbS5yb2xlTmFtZSkudG9FcXVhbChyb2xlRW50aXRsZW1lbnREYXRhLnJvbGVOYW1lKTtcbiAgICB9KTtcblxuICAgIGl0KCdkaXNwbGF5VmFsdWUgc2hvdWxkIGJlIHNldCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qocm9sZUVudGl0bGVtZW50SXRlbS5kaXNwbGF5VmFsdWUpLnRvRXF1YWwocm9sZUVudGl0bGVtZW50RGF0YS5kaXNwbGF5VmFsdWUpO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
