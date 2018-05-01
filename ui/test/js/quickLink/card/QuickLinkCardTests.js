System.register(['test/js/TestInitializer', 'quickLink/card/QuickLinkCardModule'], function (_export) {

    /**
     * Tests for the QuickLinkCard model object
     */
    'use strict';

    var quickLinkCardModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_quickLinkCardQuickLinkCardModule) {
            quickLinkCardModule = _quickLinkCardQuickLinkCardModule['default'];
        }],
        execute: function () {
            describe('QuickLinkCard', function () {
                var QuickLinkCard,
                    testCard,
                    testCardData = {
                    name: 'testQuickLink1',
                    cssClass: 'ql1',
                    label: 'Test Quick Link 1',
                    text: 'Quick Link 1 text',
                    ariaLabel: 'test quick link one',
                    allowSelf: true,
                    allowOthers: true
                };

                beforeEach(module(quickLinkCardModule));

                beforeEach(inject(function (_QuickLinkCard_) {
                    QuickLinkCard = _QuickLinkCard_;
                    testCard = new QuickLinkCard(testCardData);
                }));

                it('requires data object in constructor', function () {
                    expect(function () {
                        new QuickLinkCard(null);
                    }).toThrow();
                    expect(function () {
                        new QuickLinkCard('not an  object');
                    }).toThrow();
                });

                it('constructs a proper QuickLinkData object', function () {
                    expect(testCard instanceof QuickLinkCard).toBeTruthy();
                    expect(testCard.name).toEqual(testCardData.name);
                    expect(testCard.cssClass).toEqual(testCardData.cssClass);
                    expect(testCard.label).toEqual(testCardData.label);
                    expect(testCard.text).toEqual(testCardData.text);
                    expect(testCard.ariaLabel).toEqual(testCardData.ariaLabel);
                    expect(testCard.allowSelf).toEqual(testCardData.allowSelf);
                    expect(testCard.allowOthers).toEqual(testCardData.allowOthers);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1aWNrTGluay9jYXJkL1F1aWNrTGlua0NhcmRUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsdUNBQXVDLFVBQVUsU0FBUzs7Ozs7SUFBdEc7O0lBT0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7WUFKN0IsU0FBUyxpQkFBaUIsWUFBVztnQkFDakMsSUFBSTtvQkFBZTtvQkFDZixlQUFnQjtvQkFDUixNQUFNO29CQUNOLFVBQVU7b0JBQ1YsT0FBTztvQkFDUCxNQUFNO29CQUNOLFdBQVc7b0JBQ1gsV0FBVztvQkFDWCxhQUFhOzs7Z0JBR3pCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGlCQUFpQjtvQkFDeEMsZ0JBQWdCO29CQUNoQixXQUFXLElBQUksY0FBYzs7O2dCQUdqQyxHQUFHLHVDQUF1QyxZQUFXO29CQUNqRCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxjQUFjO3VCQUFVO29CQUNoRCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxjQUFjO3VCQUFzQjs7O2dCQUdoRSxHQUFHLDRDQUE0QyxZQUFXO29CQUN0RCxPQUFPLG9CQUFvQixlQUFlO29CQUMxQyxPQUFPLFNBQVMsTUFBTSxRQUFRLGFBQWE7b0JBQzNDLE9BQU8sU0FBUyxVQUFVLFFBQVEsYUFBYTtvQkFDL0MsT0FBTyxTQUFTLE9BQU8sUUFBUSxhQUFhO29CQUM1QyxPQUFPLFNBQVMsTUFBTSxRQUFRLGFBQWE7b0JBQzNDLE9BQU8sU0FBUyxXQUFXLFFBQVEsYUFBYTtvQkFDaEQsT0FBTyxTQUFTLFdBQVcsUUFBUSxhQUFhO29CQUNoRCxPQUFPLFNBQVMsYUFBYSxRQUFRLGFBQWE7Ozs7O0dBZXZEIiwiZmlsZSI6InF1aWNrTGluay9jYXJkL1F1aWNrTGlua0NhcmRUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcXVpY2tMaW5rQ2FyZE1vZHVsZSBmcm9tICdxdWlja0xpbmsvY2FyZC9RdWlja0xpbmtDYXJkTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFF1aWNrTGlua0NhcmQgbW9kZWwgb2JqZWN0XG4gKi9cbmRlc2NyaWJlKCdRdWlja0xpbmtDYXJkJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIFF1aWNrTGlua0NhcmQsIHRlc3RDYXJkLFxuICAgICAgICB0ZXN0Q2FyZERhdGEgPSAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0UXVpY2tMaW5rMScsXG4gICAgICAgICAgICAgICAgY3NzQ2xhc3M6ICdxbDEnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGVzdCBRdWljayBMaW5rIDEnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICdRdWljayBMaW5rIDEgdGV4dCcsXG4gICAgICAgICAgICAgICAgYXJpYUxhYmVsOiAndGVzdCBxdWljayBsaW5rIG9uZScsXG4gICAgICAgICAgICAgICAgYWxsb3dTZWxmOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFsbG93T3RoZXJzOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShxdWlja0xpbmtDYXJkTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfUXVpY2tMaW5rQ2FyZF8pIHtcbiAgICAgICAgUXVpY2tMaW5rQ2FyZCA9IF9RdWlja0xpbmtDYXJkXztcbiAgICAgICAgdGVzdENhcmQgPSBuZXcgUXVpY2tMaW5rQ2FyZCh0ZXN0Q2FyZERhdGEpO1xuICAgIH0pKTtcblxuICAgIGl0KCdyZXF1aXJlcyBkYXRhIG9iamVjdCBpbiBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBRdWlja0xpbmtDYXJkKG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFF1aWNrTGlua0NhcmQoJ25vdCBhbiAgb2JqZWN0Jyk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdjb25zdHJ1Y3RzIGEgcHJvcGVyIFF1aWNrTGlua0RhdGEgb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh0ZXN0Q2FyZCBpbnN0YW5jZW9mIFF1aWNrTGlua0NhcmQpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KHRlc3RDYXJkLm5hbWUpLnRvRXF1YWwodGVzdENhcmREYXRhLm5hbWUpO1xuICAgICAgICBleHBlY3QodGVzdENhcmQuY3NzQ2xhc3MpLnRvRXF1YWwodGVzdENhcmREYXRhLmNzc0NsYXNzKTtcbiAgICAgICAgZXhwZWN0KHRlc3RDYXJkLmxhYmVsKS50b0VxdWFsKHRlc3RDYXJkRGF0YS5sYWJlbCk7XG4gICAgICAgIGV4cGVjdCh0ZXN0Q2FyZC50ZXh0KS50b0VxdWFsKHRlc3RDYXJkRGF0YS50ZXh0KTtcbiAgICAgICAgZXhwZWN0KHRlc3RDYXJkLmFyaWFMYWJlbCkudG9FcXVhbCh0ZXN0Q2FyZERhdGEuYXJpYUxhYmVsKTtcbiAgICAgICAgZXhwZWN0KHRlc3RDYXJkLmFsbG93U2VsZikudG9FcXVhbCh0ZXN0Q2FyZERhdGEuYWxsb3dTZWxmKTtcbiAgICAgICAgZXhwZWN0KHRlc3RDYXJkLmFsbG93T3RoZXJzKS50b0VxdWFsKHRlc3RDYXJkRGF0YS5hbGxvd090aGVycyk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
