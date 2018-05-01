System.register(['test/js/TestInitializer', 'common/filter/FilterModule'], function (_export) {

    /**
     * Tests for the priority flag filter
     */

    'use strict';

    var filterModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFilterFilterModule) {
            filterModule = _commonFilterFilterModule['default'];
        }],
        execute: function () {
            describe('priorityFlag', function () {

                var highPriorityWorkItem = { priority: 'High', isHighPriority: function () {
                        return true;
                    } },
                    normalPriorityWorkItem = { priority: 'Normal', isHighPriority: function () {
                        return false;
                    } },
                    workItemTitle = 'Title',
                    returnPriorityFlagValue,
                    priorityFlagFilter;

                beforeEach(module(filterModule));

                beforeEach(inject(function (_priorityFlagFilter_) {
                    priorityFlagFilter = _priorityFlagFilter_;
                }));

                it('should return the flag in front of the title if work item is high priority', function () {
                    returnPriorityFlagValue = priorityFlagFilter(workItemTitle, highPriorityWorkItem);
                    expect(returnPriorityFlagValue.indexOf('<i')).not.toEqual(-1);
                    expect(returnPriorityFlagValue.indexOf('high-priority-icon')).not.toEqual(-1);
                    expect(returnPriorityFlagValue.indexOf(workItemTitle)).toEqual(returnPriorityFlagValue.length - workItemTitle.length);
                });

                it('should return only the title if work item is not high priority', function () {
                    returnPriorityFlagValue = priorityFlagFilter(workItemTitle, normalPriorityWorkItem);
                    expect(returnPriorityFlagValue).toEqual(workItemTitle);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9maWx0ZXIvUHJpb3JpdHlGbGFnRmlsdGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLCtCQUErQixVQUFVLFNBQVM7Ozs7OztJQUE5Rjs7SUFRSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkJBQTJCO1lBQ2pGLGVBQWUsMEJBQTBCOztRQUU3QyxTQUFTLFlBQVk7WUFKN0IsU0FBUyxnQkFBZ0IsWUFBVzs7Z0JBRWhDLElBQUksdUJBQXVCLEVBQUMsVUFBVSxRQUFRLGdCQUFnQixZQUFXO3dCQUFFLE9BQU87O29CQUM5RSx5QkFBeUIsRUFBQyxVQUFVLFVBQVUsZ0JBQWdCLFlBQVc7d0JBQUUsT0FBTzs7b0JBQ2xGLGdCQUFnQjtvQkFDaEI7b0JBQ0E7O2dCQUVKLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLHNCQUFzQjtvQkFDN0MscUJBQXFCOzs7Z0JBR3pCLEdBQUcsOEVBQThFLFlBQVc7b0JBQ3hGLDBCQUEwQixtQkFBbUIsZUFBZTtvQkFDNUQsT0FBTyx3QkFBd0IsUUFBUSxPQUFPLElBQUksUUFBUSxDQUFDO29CQUMzRCxPQUFPLHdCQUF3QixRQUFRLHVCQUF1QixJQUFJLFFBQVEsQ0FBQztvQkFDM0UsT0FBTyx3QkFBd0IsUUFBUSxnQkFDbkMsUUFBUSx3QkFBd0IsU0FBUyxjQUFjOzs7Z0JBRy9ELEdBQUcsa0VBQWtFLFlBQVc7b0JBQzVFLDBCQUEwQixtQkFBbUIsZUFBZTtvQkFDNUQsT0FBTyx5QkFBeUIsUUFBUTs7Ozs7R0FhN0MiLCJmaWxlIjoiY29tbW9uL2ZpbHRlci9Qcmlvcml0eUZsYWdGaWx0ZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZmlsdGVyTW9kdWxlIGZyb20gJ2NvbW1vbi9maWx0ZXIvRmlsdGVyTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIHByaW9yaXR5IGZsYWcgZmlsdGVyXG4gKi9cblxuZGVzY3JpYmUoJ3ByaW9yaXR5RmxhZycsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGhpZ2hQcmlvcml0eVdvcmtJdGVtID0ge3ByaW9yaXR5OiAnSGlnaCcsIGlzSGlnaFByaW9yaXR5OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0gfSxcbiAgICAgICAgbm9ybWFsUHJpb3JpdHlXb3JrSXRlbSA9IHtwcmlvcml0eTogJ05vcm1hbCcsIGlzSGlnaFByaW9yaXR5OiBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9IH0sXG4gICAgICAgIHdvcmtJdGVtVGl0bGUgPSAnVGl0bGUnLFxuICAgICAgICByZXR1cm5Qcmlvcml0eUZsYWdWYWx1ZSxcbiAgICAgICAgcHJpb3JpdHlGbGFnRmlsdGVyO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZmlsdGVyTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfcHJpb3JpdHlGbGFnRmlsdGVyXykge1xuICAgICAgICBwcmlvcml0eUZsYWdGaWx0ZXIgPSBfcHJpb3JpdHlGbGFnRmlsdGVyXztcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgZmxhZyBpbiBmcm9udCBvZiB0aGUgdGl0bGUgaWYgd29yayBpdGVtIGlzIGhpZ2ggcHJpb3JpdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuUHJpb3JpdHlGbGFnVmFsdWUgPSBwcmlvcml0eUZsYWdGaWx0ZXIod29ya0l0ZW1UaXRsZSwgaGlnaFByaW9yaXR5V29ya0l0ZW0pO1xuICAgICAgICBleHBlY3QocmV0dXJuUHJpb3JpdHlGbGFnVmFsdWUuaW5kZXhPZignPGknKSkubm90LnRvRXF1YWwoLTEpO1xuICAgICAgICBleHBlY3QocmV0dXJuUHJpb3JpdHlGbGFnVmFsdWUuaW5kZXhPZignaGlnaC1wcmlvcml0eS1pY29uJykpLm5vdC50b0VxdWFsKC0xKTtcbiAgICAgICAgZXhwZWN0KHJldHVyblByaW9yaXR5RmxhZ1ZhbHVlLmluZGV4T2Yod29ya0l0ZW1UaXRsZSkpLlxuICAgICAgICAgICAgdG9FcXVhbChyZXR1cm5Qcmlvcml0eUZsYWdWYWx1ZS5sZW5ndGggLSB3b3JrSXRlbVRpdGxlLmxlbmd0aCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBvbmx5IHRoZSB0aXRsZSBpZiB3b3JrIGl0ZW0gaXMgbm90IGhpZ2ggcHJpb3JpdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuUHJpb3JpdHlGbGFnVmFsdWUgPSBwcmlvcml0eUZsYWdGaWx0ZXIod29ya0l0ZW1UaXRsZSwgbm9ybWFsUHJpb3JpdHlXb3JrSXRlbSk7XG4gICAgICAgIGV4cGVjdChyZXR1cm5Qcmlvcml0eUZsYWdWYWx1ZSkudG9FcXVhbCh3b3JrSXRlbVRpdGxlKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
