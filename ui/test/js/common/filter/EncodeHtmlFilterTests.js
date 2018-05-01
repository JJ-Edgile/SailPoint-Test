System.register(['test/js/TestInitializer', 'common/filter/FilterModule'], function (_export) {

    /**
     * Tests for the EncodeHtmlFilter
     */
    'use strict';

    var filterModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFilterFilterModule) {
            filterModule = _commonFilterFilterModule['default'];
        }],
        execute: function () {
            describe('encodeHtmlFilter', function () {
                // The filter under test
                var encodeHtmlFilter,
                    text = 'Text of some sort',
                    charsToEncode = '& < > " \' /',
                    encodedChars = '&amp; &lt; &gt; &quot; &#39; &#x2F;',
                    formattedText = '<b>bold</b> <i>italic</i> <em>emphasized</em> <s>strike</s> <u>underline</u> ' + '<strong>strong</strong> <code>code</code> <br> <br/> <ul><li>stuff</li></ul> <ol></ol> <p></p>';

                beforeEach(module(filterModule));

                beforeEach(inject(function (_encodeHtmlFilter_) {
                    encodeHtmlFilter = _encodeHtmlFilter_;
                }));

                it('should return the passed value when no html chars present', function () {
                    expect(encodeHtmlFilter(text)).toEqual(text);
                });

                it('should encode all chars appropriately', function () {
                    expect(encodeHtmlFilter(charsToEncode)).toEqual(encodedChars);
                });

                it('should return empty string when source is null', function () {
                    expect(encodeHtmlFilter(null)).toEqual('');
                });

                it('should return empty string when source is undefined', function () {
                    expect(encodeHtmlFilter(undefined)).toEqual('');
                });

                it('should return 0 when source is 0', function () {
                    expect(encodeHtmlFilter(0)).toEqual(0);
                });

                it('should return number when source is number', function () {
                    expect(encodeHtmlFilter(2)).toEqual(2);
                });

                it('should return false when source is false', function () {
                    expect(encodeHtmlFilter(false)).toEqual(false);
                });

                it('should allow some basic formatting tags', function () {
                    expect(encodeHtmlFilter(formattedText)).toEqual(formattedText);

                    var filteredText = encodeHtmlFilter('<B>bold</B> and <tt>teletype</tt>');
                    expect(filteredText).toEqual('<b>bold</b> and &lt;tt&gt;teletype&lt;&#x2F;tt&gt;');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9maWx0ZXIvRW5jb2RlSHRtbEZpbHRlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwrQkFBK0IsVUFBVSxTQUFTOzs7OztJQUE5Rjs7SUFPSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkJBQTJCO1lBQ2pGLGVBQWUsMEJBQTBCOztRQUU3QyxTQUFTLFlBQVk7WUFKN0IsU0FBUyxvQkFBb0IsWUFBVzs7Z0JBRXBDLElBQUk7b0JBQ0EsT0FBTztvQkFDUCxnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2YsZ0JBQWdCLGtGQUNaOztnQkFFUixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxvQkFBb0I7b0JBQzNDLG1CQUFtQjs7O2dCQUd2QixHQUFHLDZEQUE2RCxZQUFXO29CQUN2RSxPQUFPLGlCQUFpQixPQUFPLFFBQVE7OztnQkFHM0MsR0FBRyx5Q0FBeUMsWUFBVztvQkFDbkQsT0FBTyxpQkFBaUIsZ0JBQWdCLFFBQVE7OztnQkFHcEQsR0FBRyxrREFBa0QsWUFBVztvQkFDNUQsT0FBTyxpQkFBaUIsT0FBTyxRQUFROzs7Z0JBRzNDLEdBQUcsdURBQXVELFlBQVc7b0JBQ2pFLE9BQU8saUJBQWlCLFlBQVksUUFBUTs7O2dCQUdoRCxHQUFHLG9DQUFvQyxZQUFXO29CQUM5QyxPQUFPLGlCQUFpQixJQUFJLFFBQVE7OztnQkFHeEMsR0FBRyw4Q0FBOEMsWUFBVztvQkFDeEQsT0FBTyxpQkFBaUIsSUFBSSxRQUFROzs7Z0JBR3hDLEdBQUcsNENBQTRDLFlBQVc7b0JBQ3RELE9BQU8saUJBQWlCLFFBQVEsUUFBUTs7O2dCQUc1QyxHQUFHLDJDQUEyQyxZQUFNO29CQUNoRCxPQUFPLGlCQUFpQixnQkFBZ0IsUUFBUTs7b0JBRWhELElBQUksZUFBZSxpQkFBaUI7b0JBQ3BDLE9BQU8sY0FBYyxRQUFROzs7OztHQVNsQyIsImZpbGUiOiJjb21tb24vZmlsdGVyL0VuY29kZUh0bWxGaWx0ZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZmlsdGVyTW9kdWxlIGZyb20gJ2NvbW1vbi9maWx0ZXIvRmlsdGVyTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIEVuY29kZUh0bWxGaWx0ZXJcbiAqL1xuZGVzY3JpYmUoJ2VuY29kZUh0bWxGaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAvLyBUaGUgZmlsdGVyIHVuZGVyIHRlc3RcbiAgICB2YXIgZW5jb2RlSHRtbEZpbHRlcixcbiAgICAgICAgdGV4dCA9ICdUZXh0IG9mIHNvbWUgc29ydCcsXG4gICAgICAgIGNoYXJzVG9FbmNvZGUgPSAnJiA8ID4gXCIgXFwnIC8nLFxuICAgICAgICBlbmNvZGVkQ2hhcnMgPSAnJmFtcDsgJmx0OyAmZ3Q7ICZxdW90OyAmIzM5OyAmI3gyRjsnLFxuICAgICAgICBmb3JtYXR0ZWRUZXh0ID0gJzxiPmJvbGQ8L2I+IDxpPml0YWxpYzwvaT4gPGVtPmVtcGhhc2l6ZWQ8L2VtPiA8cz5zdHJpa2U8L3M+IDx1PnVuZGVybGluZTwvdT4gJyArXG4gICAgICAgICAgICAnPHN0cm9uZz5zdHJvbmc8L3N0cm9uZz4gPGNvZGU+Y29kZTwvY29kZT4gPGJyPiA8YnIvPiA8dWw+PGxpPnN0dWZmPC9saT48L3VsPiA8b2w+PC9vbD4gPHA+PC9wPic7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmaWx0ZXJNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9lbmNvZGVIdG1sRmlsdGVyXykge1xuICAgICAgICBlbmNvZGVIdG1sRmlsdGVyID0gX2VuY29kZUh0bWxGaWx0ZXJfO1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBwYXNzZWQgdmFsdWUgd2hlbiBubyBodG1sIGNoYXJzIHByZXNlbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGVuY29kZUh0bWxGaWx0ZXIodGV4dCkpLnRvRXF1YWwodGV4dCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGVuY29kZSBhbGwgY2hhcnMgYXBwcm9wcmlhdGVseScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZW5jb2RlSHRtbEZpbHRlcihjaGFyc1RvRW5jb2RlKSkudG9FcXVhbChlbmNvZGVkQ2hhcnMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZW1wdHkgc3RyaW5nIHdoZW4gc291cmNlIGlzIG51bGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGVuY29kZUh0bWxGaWx0ZXIobnVsbCkpLnRvRXF1YWwoJycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZW1wdHkgc3RyaW5nIHdoZW4gc291cmNlIGlzIHVuZGVmaW5lZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZW5jb2RlSHRtbEZpbHRlcih1bmRlZmluZWQpKS50b0VxdWFsKCcnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIDAgd2hlbiBzb3VyY2UgaXMgMCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZW5jb2RlSHRtbEZpbHRlcigwKSkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIG51bWJlciB3aGVuIHNvdXJjZSBpcyBudW1iZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGVuY29kZUh0bWxGaWx0ZXIoMikpLnRvRXF1YWwoMik7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aGVuIHNvdXJjZSBpcyBmYWxzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZW5jb2RlSHRtbEZpbHRlcihmYWxzZSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBzb21lIGJhc2ljIGZvcm1hdHRpbmcgdGFncycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGVuY29kZUh0bWxGaWx0ZXIoZm9ybWF0dGVkVGV4dCkpLnRvRXF1YWwoZm9ybWF0dGVkVGV4dCk7XG5cbiAgICAgICAgbGV0IGZpbHRlcmVkVGV4dCA9IGVuY29kZUh0bWxGaWx0ZXIoJzxCPmJvbGQ8L0I+IGFuZCA8dHQ+dGVsZXR5cGU8L3R0PicpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRUZXh0KS50b0VxdWFsKCc8Yj5ib2xkPC9iPiBhbmQgJmx0O3R0Jmd0O3RlbGV0eXBlJmx0OyYjeDJGO3R0Jmd0OycpO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
