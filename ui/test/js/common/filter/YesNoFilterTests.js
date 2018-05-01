System.register(['test/js/TestInitializer', 'common/filter/FilterModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var filterModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFilterFilterModule) {
            filterModule = _commonFilterFilterModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            /**
             * Tests for the yes no filter
             */

            describe('yesNoFilter', function () {
                // The filter under test
                var yesNoFilter,
                    textYes = 'Yes',
                    textNo = 'No';

                beforeEach(module(filterModule));

                beforeEach(inject(function (_yesNoFilter_, spTranslateFilter) {
                    yesNoFilter = _yesNoFilter_;

                    // Mock spTranslate to test localization
                    spTranslateFilter.configureCatalog({
                        'ui_yes': textYes,
                        'ui_no': textNo
                    });
                }));

                it('should return Yes when truthy', function () {
                    var filteredText = yesNoFilter(true);
                    expect(filteredText).toEqual(textYes);
                });

                it('should return No when falsey', function () {
                    var filteredText = yesNoFilter(false);
                    expect(filteredText).toEqual(textNo);
                });

                it('should return No when empty', function () {
                    var filteredText = yesNoFilter();
                    expect(filteredText).toEqual(textNo);
                });

                it('should return No when null', function () {
                    var filteredText = yesNoFilter(null);
                    expect(filteredText).toEqual(textNo);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9maWx0ZXIvWWVzTm9GaWx0ZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsOEJBQThCLDRDQUE0QyxVQUFVLFNBQVM7SUFBekk7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJCQUEyQjtZQUNqRixlQUFlLDBCQUEwQjtXQUMxQyxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7Ozs7OztZQUU3QixTQUFTLGVBQWUsWUFBVzs7Z0JBRS9CLElBQUk7b0JBQWEsVUFBVTtvQkFBTyxTQUFTOztnQkFFM0MsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsZUFBZSxtQkFBbUI7b0JBQ3pELGNBQWM7OztvQkFHZCxrQkFBa0IsaUJBQWlCO3dCQUMvQixVQUFVO3dCQUNWLFNBQVU7Ozs7Z0JBSWxCLEdBQUcsaUNBQWlDLFlBQVc7b0JBQzNDLElBQUksZUFBZSxZQUFZO29CQUMvQixPQUFPLGNBQWMsUUFBUTs7O2dCQUdqQyxHQUFHLGdDQUFnQyxZQUFXO29CQUMxQyxJQUFJLGVBQWUsWUFBWTtvQkFDL0IsT0FBTyxjQUFjLFFBQVE7OztnQkFHakMsR0FBRywrQkFBK0IsWUFBVztvQkFDekMsSUFBSSxlQUFlO29CQUNuQixPQUFPLGNBQWMsUUFBUTs7O2dCQUdqQyxHQUFHLDhCQUE4QixZQUFXO29CQUN4QyxJQUFJLGVBQWUsWUFBWTtvQkFDL0IsT0FBTyxjQUFjLFFBQVE7Ozs7O0dBV2xDIiwiZmlsZSI6ImNvbW1vbi9maWx0ZXIvWWVzTm9GaWx0ZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZmlsdGVyTW9kdWxlIGZyb20gJ2NvbW1vbi9maWx0ZXIvRmlsdGVyTW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIHllcyBubyBmaWx0ZXJcbiAqL1xuXG5kZXNjcmliZSgneWVzTm9GaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAvLyBUaGUgZmlsdGVyIHVuZGVyIHRlc3RcbiAgICB2YXIgeWVzTm9GaWx0ZXIsIHRleHRZZXMgPSAnWWVzJywgdGV4dE5vID0gJ05vJztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZpbHRlck1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3llc05vRmlsdGVyXywgc3BUcmFuc2xhdGVGaWx0ZXIpIHtcbiAgICAgICAgeWVzTm9GaWx0ZXIgPSBfeWVzTm9GaWx0ZXJfO1xuXG4gICAgICAgIC8vIE1vY2sgc3BUcmFuc2xhdGUgdG8gdGVzdCBsb2NhbGl6YXRpb25cbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XG4gICAgICAgICAgICAndWlfeWVzJzogdGV4dFllcyxcbiAgICAgICAgICAgICd1aV9ubycgOiB0ZXh0Tm9cbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gWWVzIHdoZW4gdHJ1dGh5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXJlZFRleHQgPSB5ZXNOb0ZpbHRlcih0cnVlKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVGV4dCkudG9FcXVhbCh0ZXh0WWVzKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIE5vIHdoZW4gZmFsc2V5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXJlZFRleHQgPSB5ZXNOb0ZpbHRlcihmYWxzZSk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFRleHQpLnRvRXF1YWwodGV4dE5vKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIE5vIHdoZW4gZW1wdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbHRlcmVkVGV4dCA9IHllc05vRmlsdGVyKCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFRleHQpLnRvRXF1YWwodGV4dE5vKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIE5vIHdoZW4gbnVsbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsdGVyZWRUZXh0ID0geWVzTm9GaWx0ZXIobnVsbCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFRleHQpLnRvRXF1YWwodGV4dE5vKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
