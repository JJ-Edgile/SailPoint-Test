System.register(['test/js/TestInitializer', 'workitem/WorkItemModule'], function (_export) {

    /**
     * Tests for the workitem priority filter
     */

    'use strict';

    var workItemModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }],
        execute: function () {
            describe('priorityFilter', function () {
                // The filter under test
                var priorityFilter;

                beforeEach(module(workItemModule));

                beforeEach(inject(function (_priorityFilter_) {
                    priorityFilter = _priorityFilter_;
                }));

                it('should localize to Normal when no priority specified', function () {
                    var filteredString = priorityFilter();
                    expect(filteredString).toEqual('#{msgs.work_item_level_normal}');
                });

                it('should localize to Normal when priority is normal', function () {
                    var filteredString = priorityFilter('Normal');
                    expect(filteredString).toEqual('#{msgs.work_item_level_normal}');
                });

                it('should localize to High when priority is high', function () {
                    var filteredString = priorityFilter('High');
                    expect(filteredString).toEqual('#{msgs.work_item_level_high}');
                });

                it('should localize to Low when priority is low', function () {
                    var filteredString = priorityFilter('Low');
                    expect(filteredString).toEqual('#{msgs.work_item_level_low}');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL1ByaW9yaXR5RmlsdGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixVQUFVLFNBQVM7Ozs7OztJQU12Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTtZQU43QixTQUFTLGtCQUFrQixZQUFXOztnQkFFbEMsSUFBSTs7Z0JBRUosV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsa0JBQWtCO29CQUN6QyxpQkFBaUI7OztnQkFHckIsR0FBRyx3REFBd0QsWUFBVztvQkFDbEUsSUFBSSxpQkFBaUI7b0JBQ3JCLE9BQU8sZ0JBQWdCLFFBQVE7OztnQkFHbkMsR0FBRyxxREFBcUQsWUFBVztvQkFDL0QsSUFBSSxpQkFBaUIsZUFBZTtvQkFDcEMsT0FBTyxnQkFBZ0IsUUFBUTs7O2dCQUduQyxHQUFHLGlEQUFpRCxZQUFXO29CQUMzRCxJQUFJLGlCQUFpQixlQUFlO29CQUNwQyxPQUFPLGdCQUFnQixRQUFROzs7Z0JBR25DLEdBQUcsK0NBQStDLFlBQVc7b0JBQ3pELElBQUksaUJBQWlCLGVBQWU7b0JBQ3BDLE9BQU8sZ0JBQWdCLFFBQVE7Ozs7O0dBWXBDIiwiZmlsZSI6IndvcmtpdGVtL1ByaW9yaXR5RmlsdGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3b3JrSXRlbU1vZHVsZSBmcm9tICd3b3JraXRlbS9Xb3JrSXRlbU1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSB3b3JraXRlbSBwcmlvcml0eSBmaWx0ZXJcbiAqL1xuXG5kZXNjcmliZSgncHJpb3JpdHlGaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAvLyBUaGUgZmlsdGVyIHVuZGVyIHRlc3RcbiAgICB2YXIgcHJpb3JpdHlGaWx0ZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3b3JrSXRlbU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3ByaW9yaXR5RmlsdGVyXykge1xuICAgICAgICBwcmlvcml0eUZpbHRlciA9IF9wcmlvcml0eUZpbHRlcl87XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCBsb2NhbGl6ZSB0byBOb3JtYWwgd2hlbiBubyBwcmlvcml0eSBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbHRlcmVkU3RyaW5nID0gcHJpb3JpdHlGaWx0ZXIoKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkU3RyaW5nKS50b0VxdWFsKCcje21zZ3Mud29ya19pdGVtX2xldmVsX25vcm1hbH0nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbG9jYWxpemUgdG8gTm9ybWFsIHdoZW4gcHJpb3JpdHkgaXMgbm9ybWFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXJlZFN0cmluZyA9IHByaW9yaXR5RmlsdGVyKCdOb3JtYWwnKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkU3RyaW5nKS50b0VxdWFsKCcje21zZ3Mud29ya19pdGVtX2xldmVsX25vcm1hbH0nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbG9jYWxpemUgdG8gSGlnaCB3aGVuIHByaW9yaXR5IGlzIGhpZ2gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbHRlcmVkU3RyaW5nID0gcHJpb3JpdHlGaWx0ZXIoJ0hpZ2gnKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkU3RyaW5nKS50b0VxdWFsKCcje21zZ3Mud29ya19pdGVtX2xldmVsX2hpZ2h9Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGxvY2FsaXplIHRvIExvdyB3aGVuIHByaW9yaXR5IGlzIGxvdycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsdGVyZWRTdHJpbmcgPSBwcmlvcml0eUZpbHRlcignTG93Jyk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFN0cmluZykudG9FcXVhbCgnI3ttc2dzLndvcmtfaXRlbV9sZXZlbF9sb3d9Jyk7XG4gICAgfSk7XG5cblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
