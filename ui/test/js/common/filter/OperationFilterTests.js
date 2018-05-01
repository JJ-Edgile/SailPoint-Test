System.register(['test/js/TestInitializer', 'common/filter/FilterModule'], function (_export) {

    /**
     * Tests for the operation filter
     */

    'use strict';

    var filterModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFilterFilterModule) {
            filterModule = _commonFilterFilterModule['default'];
        }],
        execute: function () {
            describe('operationFilter', function () {
                // The filter under test
                var operationFilter,
                    messageKey = 'ui_my_approvals_new_account_requested';

                beforeEach(module(filterModule));

                beforeEach(inject(function (_operationFilter_) {
                    operationFilter = _operationFilter_;
                }));

                it('should return the passed value when false', function () {
                    var value = 'testValue',
                        filteredText = operationFilter(value, false);
                    expect(filteredText).toEqual(value);
                });

                it('should return the empty value when value is empty', function () {
                    var filteredText = operationFilter('', false);
                    expect(filteredText).toEqual('');
                });

                it('should add account creation message when true', function () {
                    var value = 'testValue',
                        filteredText = operationFilter(value, true);
                    expect(filteredText).toEqual(value + ' ' + messageKey);
                });

                it('should add account creation message when passed object with newAccount set to true', function () {
                    var value = 'testValue',
                        testObject = { newAccount: true },
                        filteredText = operationFilter(value, testObject);
                    expect(filteredText).toEqual(value + ' ' + messageKey);
                });

                it('should not add account creation message when passed object with newAccount set to false', function () {
                    var value = 'testValue',
                        testObject = { newAccount: false },
                        filteredText = operationFilter(value, testObject);
                    expect(filteredText).toEqual(value);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9maWx0ZXIvT3BlcmF0aW9uRmlsdGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLCtCQUErQixVQUFVLFNBQVM7Ozs7OztJQUE5Rjs7SUFRSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkJBQTJCO1lBQ2pGLGVBQWUsMEJBQTBCOztRQUU3QyxTQUFTLFlBQVk7WUFKN0IsU0FBUyxtQkFBbUIsWUFBVzs7Z0JBRW5DLElBQUk7b0JBQ0EsYUFBYTs7Z0JBRWpCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLG1CQUFtQjtvQkFDMUMsa0JBQWtCOzs7Z0JBR3RCLEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELElBQUksUUFBUTt3QkFDUixlQUFlLGdCQUFnQixPQUFPO29CQUMxQyxPQUFPLGNBQWMsUUFBUTs7O2dCQUdqQyxHQUFHLHFEQUFxRCxZQUFXO29CQUMvRCxJQUFJLGVBQWUsZ0JBQWdCLElBQUk7b0JBQ3ZDLE9BQU8sY0FBYyxRQUFROzs7Z0JBR2pDLEdBQUcsaURBQWlELFlBQVc7b0JBQzNELElBQUksUUFBUTt3QkFDUixlQUFlLGdCQUFnQixPQUFPO29CQUMxQyxPQUFPLGNBQWMsUUFBUSxRQUFRLE1BQU07OztnQkFHL0MsR0FBRyxzRkFBc0YsWUFBVztvQkFDaEcsSUFBSSxRQUFRO3dCQUNSLGFBQWEsRUFBRSxZQUFZO3dCQUMzQixlQUFlLGdCQUFnQixPQUFPO29CQUMxQyxPQUFPLGNBQWMsUUFBUSxRQUFRLE1BQU07OztnQkFHL0MsR0FBRywyRkFBMkYsWUFBVztvQkFDckcsSUFBSSxRQUFRO3dCQUNSLGFBQWEsRUFBRSxZQUFZO3dCQUMzQixlQUFlLGdCQUFnQixPQUFPO29CQUMxQyxPQUFPLGNBQWMsUUFBUTs7Ozs7R0FVbEMiLCJmaWxlIjoiY29tbW9uL2ZpbHRlci9PcGVyYXRpb25GaWx0ZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZmlsdGVyTW9kdWxlIGZyb20gJ2NvbW1vbi9maWx0ZXIvRmlsdGVyTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIG9wZXJhdGlvbiBmaWx0ZXJcbiAqL1xuXG5kZXNjcmliZSgnb3BlcmF0aW9uRmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gVGhlIGZpbHRlciB1bmRlciB0ZXN0XG4gICAgdmFyIG9wZXJhdGlvbkZpbHRlcixcbiAgICAgICAgbWVzc2FnZUtleSA9ICd1aV9teV9hcHByb3ZhbHNfbmV3X2FjY291bnRfcmVxdWVzdGVkJztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZpbHRlck1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX29wZXJhdGlvbkZpbHRlcl8pIHtcbiAgICAgICAgb3BlcmF0aW9uRmlsdGVyID0gX29wZXJhdGlvbkZpbHRlcl87XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIHBhc3NlZCB2YWx1ZSB3aGVuIGZhbHNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9ICd0ZXN0VmFsdWUnLFxuICAgICAgICAgICAgZmlsdGVyZWRUZXh0ID0gb3BlcmF0aW9uRmlsdGVyKHZhbHVlLCBmYWxzZSk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFRleHQpLnRvRXF1YWwodmFsdWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGVtcHR5IHZhbHVlIHdoZW4gdmFsdWUgaXMgZW1wdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbHRlcmVkVGV4dCA9IG9wZXJhdGlvbkZpbHRlcignJywgZmFsc2UpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRUZXh0KS50b0VxdWFsKCcnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWRkIGFjY291bnQgY3JlYXRpb24gbWVzc2FnZSB3aGVuIHRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gJ3Rlc3RWYWx1ZScsXG4gICAgICAgICAgICBmaWx0ZXJlZFRleHQgPSBvcGVyYXRpb25GaWx0ZXIodmFsdWUsIHRydWUpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRUZXh0KS50b0VxdWFsKHZhbHVlICsgJyAnICsgbWVzc2FnZUtleSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGFkZCBhY2NvdW50IGNyZWF0aW9uIG1lc3NhZ2Ugd2hlbiBwYXNzZWQgb2JqZWN0IHdpdGggbmV3QWNjb3VudCBzZXQgdG8gdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSAndGVzdFZhbHVlJyxcbiAgICAgICAgICAgIHRlc3RPYmplY3QgPSB7IG5ld0FjY291bnQ6IHRydWUgfSxcbiAgICAgICAgICAgIGZpbHRlcmVkVGV4dCA9IG9wZXJhdGlvbkZpbHRlcih2YWx1ZSwgdGVzdE9iamVjdCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFRleHQpLnRvRXF1YWwodmFsdWUgKyAnICcgKyBtZXNzYWdlS2V5KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IGFkZCBhY2NvdW50IGNyZWF0aW9uIG1lc3NhZ2Ugd2hlbiBwYXNzZWQgb2JqZWN0IHdpdGggbmV3QWNjb3VudCBzZXQgdG8gZmFsc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gJ3Rlc3RWYWx1ZScsXG4gICAgICAgICAgICB0ZXN0T2JqZWN0ID0geyBuZXdBY2NvdW50OiBmYWxzZSB9LFxuICAgICAgICAgICAgZmlsdGVyZWRUZXh0ID0gb3BlcmF0aW9uRmlsdGVyKHZhbHVlLCB0ZXN0T2JqZWN0KTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVGV4dCkudG9FcXVhbCh2YWx1ZSk7XG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
