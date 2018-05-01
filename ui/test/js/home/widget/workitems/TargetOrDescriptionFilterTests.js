System.register(['test/js/TestInitializer', 'home/widget/workitems/WorkItemsWidgetModule'], function (_export) {
    'use strict';

    var workItemsWidgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetWorkitemsWorkItemsWidgetModule) {
            workItemsWidgetModule = _homeWidgetWorkitemsWorkItemsWidgetModule['default'];
        }],
        execute: function () {

            describe('TargetOrDescriptionFilter', function () {

                var targetOrDescriptionFilter, target, workItem, description;

                beforeEach(module(workItemsWidgetModule));

                beforeEach(inject(function (_targetOrDescriptionFilter_) {
                    targetOrDescriptionFilter = _targetOrDescriptionFilter_;

                    workItem = {
                        getDescription: function () {
                            return description;
                        }
                    };

                    target = {};
                    description = null;
                }));

                it('returns null with a null target and object', function () {
                    var value = targetOrDescriptionFilter(null, null);
                    expect(value).toBeNull();
                });

                it('returns the target display name if available', function () {
                    var value;

                    // Make the displayable name filter return a string.
                    target.displayableName = 'yo adrian!!';

                    value = targetOrDescriptionFilter(target, workItem);
                    expect(value).toEqual(target.displayableName);
                });

                it('returns the description if available', function () {
                    var value;

                    // Setup a description to return from the work item.
                    description = 'i did it!!!!';

                    value = targetOrDescriptionFilter(null, workItem);
                    expect(value).toEqual(description);
                });

                it('returns null with a null target and object without a description', function () {
                    var value;

                    // Get rid of the getDescription() method.
                    delete workItem.description;

                    value = targetOrDescriptionFilter(null, workItem);
                    expect(value).toBeNull();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L3dvcmtpdGVtcy9UYXJnZXRPckRlc2NyaXB0aW9uRmlsdGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGdEQUFnRCxVQUFVLFNBQVM7SUFBL0c7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJDQUEyQztZQUNqRyx3QkFBd0IsMENBQTBDOztRQUV0RSxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsNkJBQTZCLFlBQVc7O2dCQUU3QyxJQUFJLDJCQUEyQixRQUFRLFVBQVU7O2dCQUVqRCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyw2QkFBNkI7b0JBQ3BELDRCQUE0Qjs7b0JBRTVCLFdBQVc7d0JBQ1AsZ0JBQWdCLFlBQVc7NEJBQ3ZCLE9BQU87Ozs7b0JBSWYsU0FBUztvQkFDVCxjQUFjOzs7Z0JBR2xCLEdBQUcsOENBQThDLFlBQVc7b0JBQ3hELElBQUksUUFBUSwwQkFBMEIsTUFBTTtvQkFDNUMsT0FBTyxPQUFPOzs7Z0JBR2xCLEdBQUcsZ0RBQWdELFlBQVc7b0JBQzFELElBQUk7OztvQkFHSixPQUFPLGtCQUFrQjs7b0JBRXpCLFFBQVEsMEJBQTBCLFFBQVE7b0JBQzFDLE9BQU8sT0FBTyxRQUFRLE9BQU87OztnQkFHakMsR0FBRyx3Q0FBd0MsWUFBVztvQkFDbEQsSUFBSTs7O29CQUdKLGNBQWM7O29CQUVkLFFBQVEsMEJBQTBCLE1BQU07b0JBQ3hDLE9BQU8sT0FBTyxRQUFROzs7Z0JBRzFCLEdBQUcsb0VBQW9FLFlBQVc7b0JBQzlFLElBQUk7OztvQkFHSixPQUFPLFNBQVM7O29CQUVoQixRQUFRLDBCQUEwQixNQUFNO29CQUN4QyxPQUFPLE9BQU87Ozs7O0dBVW5CIiwiZmlsZSI6ImhvbWUvd2lkZ2V0L3dvcmtpdGVtcy9UYXJnZXRPckRlc2NyaXB0aW9uRmlsdGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IHdvcmtJdGVtc1dpZGdldE1vZHVsZSBmcm9tICdob21lL3dpZGdldC93b3JraXRlbXMvV29ya0l0ZW1zV2lkZ2V0TW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdUYXJnZXRPckRlc2NyaXB0aW9uRmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIHRhcmdldE9yRGVzY3JpcHRpb25GaWx0ZXIsIHRhcmdldCwgd29ya0l0ZW0sIGRlc2NyaXB0aW9uO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHdvcmtJdGVtc1dpZGdldE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF90YXJnZXRPckRlc2NyaXB0aW9uRmlsdGVyXykge1xyXG4gICAgICAgIHRhcmdldE9yRGVzY3JpcHRpb25GaWx0ZXIgPSBfdGFyZ2V0T3JEZXNjcmlwdGlvbkZpbHRlcl87XHJcblxyXG4gICAgICAgIHdvcmtJdGVtID0ge1xyXG4gICAgICAgICAgICBnZXREZXNjcmlwdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0YXJnZXQgPSB7fTtcclxuICAgICAgICBkZXNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgbnVsbCB3aXRoIGEgbnVsbCB0YXJnZXQgYW5kIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRhcmdldE9yRGVzY3JpcHRpb25GaWx0ZXIobnVsbCwgbnVsbCk7XHJcbiAgICAgICAgZXhwZWN0KHZhbHVlKS50b0JlTnVsbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdGhlIHRhcmdldCBkaXNwbGF5IG5hbWUgaWYgYXZhaWxhYmxlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHRoZSBkaXNwbGF5YWJsZSBuYW1lIGZpbHRlciByZXR1cm4gYSBzdHJpbmcuXHJcbiAgICAgICAgdGFyZ2V0LmRpc3BsYXlhYmxlTmFtZSA9ICd5byBhZHJpYW4hISc7XHJcblxyXG4gICAgICAgIHZhbHVlID0gdGFyZ2V0T3JEZXNjcmlwdGlvbkZpbHRlcih0YXJnZXQsIHdvcmtJdGVtKTtcclxuICAgICAgICBleHBlY3QodmFsdWUpLnRvRXF1YWwodGFyZ2V0LmRpc3BsYXlhYmxlTmFtZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyB0aGUgZGVzY3JpcHRpb24gaWYgYXZhaWxhYmxlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlO1xyXG5cclxuICAgICAgICAvLyBTZXR1cCBhIGRlc2NyaXB0aW9uIHRvIHJldHVybiBmcm9tIHRoZSB3b3JrIGl0ZW0uXHJcbiAgICAgICAgZGVzY3JpcHRpb24gPSAnaSBkaWQgaXQhISEhJztcclxuXHJcbiAgICAgICAgdmFsdWUgPSB0YXJnZXRPckRlc2NyaXB0aW9uRmlsdGVyKG51bGwsIHdvcmtJdGVtKTtcclxuICAgICAgICBleHBlY3QodmFsdWUpLnRvRXF1YWwoZGVzY3JpcHRpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgbnVsbCB3aXRoIGEgbnVsbCB0YXJnZXQgYW5kIG9iamVjdCB3aXRob3V0IGEgZGVzY3JpcHRpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdmFsdWU7XHJcblxyXG4gICAgICAgIC8vIEdldCByaWQgb2YgdGhlIGdldERlc2NyaXB0aW9uKCkgbWV0aG9kLlxyXG4gICAgICAgIGRlbGV0ZSB3b3JrSXRlbS5kZXNjcmlwdGlvbjtcclxuXHJcbiAgICAgICAgdmFsdWUgPSB0YXJnZXRPckRlc2NyaXB0aW9uRmlsdGVyKG51bGwsIHdvcmtJdGVtKTtcclxuICAgICAgICBleHBlY3QodmFsdWUpLnRvQmVOdWxsKCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
