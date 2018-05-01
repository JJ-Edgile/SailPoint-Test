System.register(['test/js/TestInitializer', 'common/filter/FilterModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var filterModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFilterFilterModule) {
            filterModule = _commonFilterFilterModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            /**
             * Tests for the empty text filter
             */

            describe('emptyTextFilter', function () {
                // The filter under test
                var emptyTextFilter,
                    text = 'Text of some sort',
                    emptyText = 'Default value',
                    emptyTextKey = 'key',
                    emptyTextValue = 'value';

                beforeEach(module(filterModule));

                beforeEach(inject(function (_emptyTextFilter_, spTranslateFilter) {
                    emptyTextFilter = _emptyTextFilter_;

                    // Mock spTranslate to test localization
                    spTranslateFilter.configureCatalog({
                        key: emptyTextValue,
                        'ui_not_applicable': 'n/a'
                    });
                }));

                it('should return the passed value when not falsey', function () {
                    var filteredText = emptyTextFilter(text, emptyText);
                    expect(filteredText).toEqual(text);
                });

                it('should return the empty value when value is empty', function () {
                    var filteredText = emptyTextFilter('', emptyText);
                    expect(filteredText).toEqual(emptyText);
                });

                it('should return the empty value when value is null', function () {
                    var filteredText = emptyTextFilter(null, emptyText);
                    expect(filteredText).toEqual(emptyText);
                });

                it('should return the empty value when value is undefined', function () {
                    var filteredText = emptyTextFilter(undefined, emptyText);
                    expect(filteredText).toEqual(emptyText);
                });

                it('should return the localized empty value when empty text is key and text is falsey', function () {
                    var filteredText = emptyTextFilter('', emptyTextKey);
                    expect(filteredText).toEqual(emptyTextValue);
                });

                it('should return the default localized empty value when empty text is not provided and text is falsey', function () {
                    var filteredText = emptyTextFilter('');
                    expect(filteredText).toEqual('n/a');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9maWx0ZXIvRW1wdHlUZXh0RmlsdGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDhCQUE4Qiw0Q0FBNEMsVUFBVSxTQUFTO0lBQXpJOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwyQkFBMkI7WUFDakYsZUFBZSwwQkFBMEI7V0FDMUMsVUFBVSxzQ0FBc0M7UUFDbkQsU0FBUyxZQUFZOzs7Ozs7WUFFN0IsU0FBUyxtQkFBbUIsWUFBVzs7Z0JBRW5DLElBQUk7b0JBQ0EsT0FBTztvQkFDUCxZQUFZO29CQUNaLGVBQWU7b0JBQ2YsaUJBQWlCOztnQkFFckIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsbUJBQW1CLG1CQUFtQjtvQkFDN0Qsa0JBQWtCOzs7b0JBR2xCLGtCQUFrQixpQkFBaUI7d0JBQy9CLEtBQUs7d0JBQ0wscUJBQXFCOzs7O2dCQUk3QixHQUFHLGtEQUFrRCxZQUFXO29CQUM1RCxJQUFJLGVBQWUsZ0JBQWdCLE1BQU07b0JBQ3pDLE9BQU8sY0FBYyxRQUFROzs7Z0JBR2pDLEdBQUcscURBQXFELFlBQVc7b0JBQy9ELElBQUksZUFBZSxnQkFBZ0IsSUFBSTtvQkFDdkMsT0FBTyxjQUFjLFFBQVE7OztnQkFHakMsR0FBRyxvREFBb0QsWUFBVztvQkFDOUQsSUFBSSxlQUFlLGdCQUFnQixNQUFNO29CQUN6QyxPQUFPLGNBQWMsUUFBUTs7O2dCQUdqQyxHQUFHLHlEQUF5RCxZQUFXO29CQUNuRSxJQUFJLGVBQWUsZ0JBQWdCLFdBQVc7b0JBQzlDLE9BQU8sY0FBYyxRQUFROzs7Z0JBR2pDLEdBQUcscUZBQXFGLFlBQVc7b0JBQy9GLElBQUksZUFBZSxnQkFBZ0IsSUFBSTtvQkFDdkMsT0FBTyxjQUFjLFFBQVE7OztnQkFHakMsR0FBRyxzR0FBc0csWUFBTTtvQkFDM0csSUFBSSxlQUFlLGdCQUFnQjtvQkFDbkMsT0FBTyxjQUFjLFFBQVE7Ozs7O0dBU2xDIiwiZmlsZSI6ImNvbW1vbi9maWx0ZXIvRW1wdHlUZXh0RmlsdGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGZpbHRlck1vZHVsZSBmcm9tICdjb21tb24vZmlsdGVyL0ZpbHRlck1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2kxOG4vTW9ja1RyYW5zbGF0ZUZpbHRlcic7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBlbXB0eSB0ZXh0IGZpbHRlclxuICovXG5cbmRlc2NyaWJlKCdlbXB0eVRleHRGaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAvLyBUaGUgZmlsdGVyIHVuZGVyIHRlc3RcbiAgICB2YXIgZW1wdHlUZXh0RmlsdGVyLFxuICAgICAgICB0ZXh0ID0gJ1RleHQgb2Ygc29tZSBzb3J0JyxcbiAgICAgICAgZW1wdHlUZXh0ID0gJ0RlZmF1bHQgdmFsdWUnLFxuICAgICAgICBlbXB0eVRleHRLZXkgPSAna2V5JyxcbiAgICAgICAgZW1wdHlUZXh0VmFsdWUgPSAndmFsdWUnO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZmlsdGVyTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfZW1wdHlUZXh0RmlsdGVyXywgc3BUcmFuc2xhdGVGaWx0ZXIpIHtcbiAgICAgICAgZW1wdHlUZXh0RmlsdGVyID0gX2VtcHR5VGV4dEZpbHRlcl87XG5cbiAgICAgICAgLy8gTW9jayBzcFRyYW5zbGF0ZSB0byB0ZXN0IGxvY2FsaXphdGlvblxuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlci5jb25maWd1cmVDYXRhbG9nKHtcbiAgICAgICAgICAgIGtleTogZW1wdHlUZXh0VmFsdWUsXG4gICAgICAgICAgICAndWlfbm90X2FwcGxpY2FibGUnOiAnbi9hJ1xuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgcGFzc2VkIHZhbHVlIHdoZW4gbm90IGZhbHNleScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsdGVyZWRUZXh0ID0gZW1wdHlUZXh0RmlsdGVyKHRleHQsIGVtcHR5VGV4dCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFRleHQpLnRvRXF1YWwodGV4dCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgZW1wdHkgdmFsdWUgd2hlbiB2YWx1ZSBpcyBlbXB0eScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsdGVyZWRUZXh0ID0gZW1wdHlUZXh0RmlsdGVyKCcnLCBlbXB0eVRleHQpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRUZXh0KS50b0VxdWFsKGVtcHR5VGV4dCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgZW1wdHkgdmFsdWUgd2hlbiB2YWx1ZSBpcyBudWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXJlZFRleHQgPSBlbXB0eVRleHRGaWx0ZXIobnVsbCwgZW1wdHlUZXh0KTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVGV4dCkudG9FcXVhbChlbXB0eVRleHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGVtcHR5IHZhbHVlIHdoZW4gdmFsdWUgaXMgdW5kZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXJlZFRleHQgPSBlbXB0eVRleHRGaWx0ZXIodW5kZWZpbmVkLCBlbXB0eVRleHQpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRUZXh0KS50b0VxdWFsKGVtcHR5VGV4dCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgbG9jYWxpemVkIGVtcHR5IHZhbHVlIHdoZW4gZW1wdHkgdGV4dCBpcyBrZXkgYW5kIHRleHQgaXMgZmFsc2V5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXJlZFRleHQgPSBlbXB0eVRleHRGaWx0ZXIoJycsIGVtcHR5VGV4dEtleSk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFRleHQpLnRvRXF1YWwoZW1wdHlUZXh0VmFsdWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGRlZmF1bHQgbG9jYWxpemVkIGVtcHR5IHZhbHVlIHdoZW4gZW1wdHkgdGV4dCBpcyBub3QgcHJvdmlkZWQgYW5kIHRleHQgaXMgZmFsc2V5JywgKCkgPT4ge1xuICAgICAgICB2YXIgZmlsdGVyZWRUZXh0ID0gZW1wdHlUZXh0RmlsdGVyKCcnKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVGV4dCkudG9FcXVhbCgnbi9hJyk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
