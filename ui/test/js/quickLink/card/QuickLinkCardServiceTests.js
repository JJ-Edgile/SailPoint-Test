System.register(['test/js/TestInitializer', 'quickLink/card/QuickLinkCardModule'], function (_export) {

    /**
     * Tests for the QuickLinkCardService
     */
    'use strict';

    var quickLinkCardModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_quickLinkCardQuickLinkCardModule) {
            quickLinkCardModule = _quickLinkCardQuickLinkCardModule['default'];
        }],
        execute: function () {
            describe('QuickLinkCardService', function () {
                var $rootScope,
                    $httpBackend,
                    quickLinkCardService,
                    promise,
                    QuickLinkCard,
                    quickLinkCardUrl = '/ui/rest/me/quickLinkCards',
                    quickLinkCardUrlWithAllTrue = '/ui/rest/me/quickLinkCards?all=true',
                    response = [{
                    name: 'testQuickLink1',
                    cssClass: 'ql1',
                    label: 'Test Quick Link 1',
                    ariaLabel: 'test quick link one',
                    allowSelf: true,
                    allowOthers: true
                }, {
                    name: 'testQuickLink2',
                    cssClass: 'ql2',
                    label: 'Test Quick Link 2',
                    ariaLabel: 'test quick link two',
                    allowSelf: false,
                    allowOthers: false
                }];

                beforeEach(module(quickLinkCardModule));

                beforeEach(inject(function (_quickLinkCardService_, $q, _$rootScope_, _$httpBackend_, _QuickLinkCard_) {
                    $rootScope = _$rootScope_;
                    quickLinkCardService = _quickLinkCardService_;
                    $httpBackend = _$httpBackend_;
                    QuickLinkCard = _QuickLinkCard_;
                }));

                function verifyCards(cards) {
                    var i;

                    expect(cards.length).toEqual(response.length);

                    for (i = 0; i < cards.length; ++i) {
                        expect(cards[i].constructor).toEqual(QuickLinkCard);
                        expect(cards[i].name).toEqual(response[i].name);
                        expect(cards[i].cssClass).toEqual(response[i].cssClass);
                        expect(cards[i].label).toEqual(response[i].label);
                        expect(cards[i].ariaLabel).toEqual(response[i].ariaLabel);
                        expect(cards[i].allowSelf).toEqual(response[i].allowSelf);
                        expect(cards[i].allowOthers).toEqual(response[i].allowOthers);
                    }
                }

                function testGetQuickLinkCardsWithUrl(url, all) {
                    var cards;
                    $httpBackend.expectGET(url).respond(200, response);
                    promise = quickLinkCardService.getQuickLinkCards(all);
                    promise.then(function (returnedCards) {
                        cards = returnedCards;
                    });
                    $httpBackend.flush();
                    verifyCards(cards);
                }

                it('returns quick link cards', function () {
                    testGetQuickLinkCardsWithUrl(quickLinkCardUrl, null);
                });

                it('sets all param true when all is true', function () {
                    testGetQuickLinkCardsWithUrl(quickLinkCardUrlWithAllTrue, true);
                });

                it('sets all param false when all is false', function () {
                    testGetQuickLinkCardsWithUrl(quickLinkCardUrl, false);
                });

                it('saves quick links cards', function () {
                    var cards = [{
                        name: 'testQuickLink1',
                        cssClass: 'ql1',
                        label: 'Test Quick Link 1',
                        ariaLabel: 'test quick link one',
                        allowSelf: true,
                        allowOthers: true
                    }, {
                        name: 'testQuickLink2',
                        cssClass: 'ql2',
                        label: 'Test Quick Link 2',
                        ariaLabel: 'test quick link two',
                        allowSelf: false,
                        allowOthers: false
                    }];

                    $httpBackend.expect('PUT', 'ui/rest/me/quickLinkCards', cards).respond(200, cards);
                    quickLinkCardService.saveQuickLinkCards(cards);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1aWNrTGluay9jYXJkL1F1aWNrTGlua0NhcmRTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHVDQUF1QyxVQUFVLFNBQVM7Ozs7O0lBQXRHOztJQU9JLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZO1lBSjdCLFNBQVMsd0JBQXdCLFlBQVc7Z0JBQ3hDLElBQUk7b0JBQVk7b0JBQWM7b0JBQXNCO29CQUFTO29CQUN6RCxtQkFBbUI7b0JBQ25CLDhCQUE4QjtvQkFDOUIsV0FBWSxDQUNKO29CQUNJLE1BQU07b0JBQ04sVUFBVTtvQkFDVixPQUFPO29CQUNQLFdBQVc7b0JBQ1gsV0FBVztvQkFDWCxhQUFhO21CQUVqQjtvQkFDSSxNQUFNO29CQUNOLFVBQVU7b0JBQ1YsT0FBTztvQkFDUCxXQUFXO29CQUNYLFdBQVc7b0JBQ1gsYUFBYTs7O2dCQUk3QixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyx3QkFBd0IsSUFBSSxjQUFjLGdCQUFnQixpQkFBaUI7b0JBQ2xHLGFBQWE7b0JBQ2IsdUJBQXVCO29CQUN2QixlQUFlO29CQUNmLGdCQUFnQjs7O2dCQUdwQixTQUFTLFlBQVksT0FBTztvQkFDeEIsSUFBSTs7b0JBRUosT0FBTyxNQUFNLFFBQVEsUUFBUSxTQUFTOztvQkFFdEMsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsRUFBRSxHQUFHO3dCQUMvQixPQUFPLE1BQU0sR0FBRyxhQUFhLFFBQVE7d0JBQ3JDLE9BQU8sTUFBTSxHQUFHLE1BQU0sUUFBUSxTQUFTLEdBQUc7d0JBQzFDLE9BQU8sTUFBTSxHQUFHLFVBQVUsUUFBUSxTQUFTLEdBQUc7d0JBQzlDLE9BQU8sTUFBTSxHQUFHLE9BQU8sUUFBUSxTQUFTLEdBQUc7d0JBQzNDLE9BQU8sTUFBTSxHQUFHLFdBQVcsUUFBUSxTQUFTLEdBQUc7d0JBQy9DLE9BQU8sTUFBTSxHQUFHLFdBQVcsUUFBUSxTQUFTLEdBQUc7d0JBQy9DLE9BQU8sTUFBTSxHQUFHLGFBQWEsUUFBUSxTQUFTLEdBQUc7Ozs7Z0JBSXpELFNBQVMsNkJBQTZCLEtBQUssS0FBSztvQkFDNUMsSUFBSTtvQkFDSixhQUFhLFVBQVUsS0FBSyxRQUFRLEtBQUs7b0JBQ3pDLFVBQVUscUJBQXFCLGtCQUFrQjtvQkFDakQsUUFBUSxLQUFLLFVBQVMsZUFBZTt3QkFDakMsUUFBUTs7b0JBRVosYUFBYTtvQkFDYixZQUFZOzs7Z0JBSWhCLEdBQUcsNEJBQTRCLFlBQVc7b0JBQ3RDLDZCQUE2QixrQkFBa0I7OztnQkFHbkQsR0FBRyx3Q0FBd0MsWUFBVztvQkFDbEQsNkJBQTZCLDZCQUE2Qjs7O2dCQUc5RCxHQUFHLDBDQUEwQyxZQUFXO29CQUNwRCw2QkFBNkIsa0JBQWtCOzs7Z0JBR25ELEdBQUcsMkJBQTJCLFlBQVc7b0JBQ3JDLElBQUksUUFBUSxDQUNSO3dCQUNJLE1BQU07d0JBQ04sVUFBVTt3QkFDVixPQUFPO3dCQUNQLFdBQVc7d0JBQ1gsV0FBVzt3QkFDWCxhQUFhO3VCQUVqQjt3QkFDSSxNQUFNO3dCQUNOLFVBQVU7d0JBQ1YsT0FBTzt3QkFDUCxXQUFXO3dCQUNYLFdBQVc7d0JBQ1gsYUFBYTs7O29CQUlyQixhQUFhLE9BQU8sT0FBTyw2QkFBNkIsT0FBTyxRQUFRLEtBQUs7b0JBQzVFLHFCQUFxQixtQkFBbUI7Ozs7O0dBTzdDIiwiZmlsZSI6InF1aWNrTGluay9jYXJkL1F1aWNrTGlua0NhcmRTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHF1aWNrTGlua0NhcmRNb2R1bGUgZnJvbSAncXVpY2tMaW5rL2NhcmQvUXVpY2tMaW5rQ2FyZE1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBRdWlja0xpbmtDYXJkU2VydmljZVxuICovXG5kZXNjcmliZSgnUXVpY2tMaW5rQ2FyZFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHJvb3RTY29wZSwgJGh0dHBCYWNrZW5kLCBxdWlja0xpbmtDYXJkU2VydmljZSwgcHJvbWlzZSwgUXVpY2tMaW5rQ2FyZCxcbiAgICAgICAgcXVpY2tMaW5rQ2FyZFVybCA9ICcvdWkvcmVzdC9tZS9xdWlja0xpbmtDYXJkcycsXG4gICAgICAgIHF1aWNrTGlua0NhcmRVcmxXaXRoQWxsVHJ1ZSA9ICcvdWkvcmVzdC9tZS9xdWlja0xpbmtDYXJkcz9hbGw9dHJ1ZScsXG4gICAgICAgIHJlc3BvbnNlID0gIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0UXVpY2tMaW5rMScsXG4gICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzOiAncWwxJyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdUZXN0IFF1aWNrIExpbmsgMScsXG4gICAgICAgICAgICAgICAgICAgIGFyaWFMYWJlbDogJ3Rlc3QgcXVpY2sgbGluayBvbmUnLFxuICAgICAgICAgICAgICAgICAgICBhbGxvd1NlbGY6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGFsbG93T3RoZXJzOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0UXVpY2tMaW5rMicsXG4gICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzOiAncWwyJyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdUZXN0IFF1aWNrIExpbmsgMicsXG4gICAgICAgICAgICAgICAgICAgIGFyaWFMYWJlbDogJ3Rlc3QgcXVpY2sgbGluayB0d28nLFxuICAgICAgICAgICAgICAgICAgICBhbGxvd1NlbGY6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBhbGxvd090aGVyczogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShxdWlja0xpbmtDYXJkTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfcXVpY2tMaW5rQ2FyZFNlcnZpY2VfLCAkcSwgXyRyb290U2NvcGVfLCBfJGh0dHBCYWNrZW5kXywgX1F1aWNrTGlua0NhcmRfKSB7XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIHF1aWNrTGlua0NhcmRTZXJ2aWNlID0gX3F1aWNrTGlua0NhcmRTZXJ2aWNlXztcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIFF1aWNrTGlua0NhcmQgPSBfUXVpY2tMaW5rQ2FyZF87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gdmVyaWZ5Q2FyZHMoY2FyZHMpIHtcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgZXhwZWN0KGNhcmRzLmxlbmd0aCkudG9FcXVhbChyZXNwb25zZS5sZW5ndGgpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYXJkcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZXhwZWN0KGNhcmRzW2ldLmNvbnN0cnVjdG9yKS50b0VxdWFsKFF1aWNrTGlua0NhcmQpO1xuICAgICAgICAgICAgZXhwZWN0KGNhcmRzW2ldLm5hbWUpLnRvRXF1YWwocmVzcG9uc2VbaV0ubmFtZSk7XG4gICAgICAgICAgICBleHBlY3QoY2FyZHNbaV0uY3NzQ2xhc3MpLnRvRXF1YWwocmVzcG9uc2VbaV0uY3NzQ2xhc3MpO1xuICAgICAgICAgICAgZXhwZWN0KGNhcmRzW2ldLmxhYmVsKS50b0VxdWFsKHJlc3BvbnNlW2ldLmxhYmVsKTtcbiAgICAgICAgICAgIGV4cGVjdChjYXJkc1tpXS5hcmlhTGFiZWwpLnRvRXF1YWwocmVzcG9uc2VbaV0uYXJpYUxhYmVsKTtcbiAgICAgICAgICAgIGV4cGVjdChjYXJkc1tpXS5hbGxvd1NlbGYpLnRvRXF1YWwocmVzcG9uc2VbaV0uYWxsb3dTZWxmKTtcbiAgICAgICAgICAgIGV4cGVjdChjYXJkc1tpXS5hbGxvd090aGVycykudG9FcXVhbChyZXNwb25zZVtpXS5hbGxvd090aGVycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0ZXN0R2V0UXVpY2tMaW5rQ2FyZHNXaXRoVXJsKHVybCwgYWxsKSB7XG4gICAgICAgIHZhciBjYXJkcztcbiAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVCh1cmwpLnJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgIHByb21pc2UgPSBxdWlja0xpbmtDYXJkU2VydmljZS5nZXRRdWlja0xpbmtDYXJkcyhhbGwpO1xuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmV0dXJuZWRDYXJkcykge1xuICAgICAgICAgICAgY2FyZHMgPSByZXR1cm5lZENhcmRzO1xuICAgICAgICB9KTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIHZlcmlmeUNhcmRzKGNhcmRzKTtcblxuICAgIH1cblxuICAgIGl0KCdyZXR1cm5zIHF1aWNrIGxpbmsgY2FyZHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGVzdEdldFF1aWNrTGlua0NhcmRzV2l0aFVybChxdWlja0xpbmtDYXJkVXJsLCBudWxsKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZXRzIGFsbCBwYXJhbSB0cnVlIHdoZW4gYWxsIGlzIHRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGVzdEdldFF1aWNrTGlua0NhcmRzV2l0aFVybChxdWlja0xpbmtDYXJkVXJsV2l0aEFsbFRydWUsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NldHMgYWxsIHBhcmFtIGZhbHNlIHdoZW4gYWxsIGlzIGZhbHNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRlc3RHZXRRdWlja0xpbmtDYXJkc1dpdGhVcmwocXVpY2tMaW5rQ2FyZFVybCwgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NhdmVzIHF1aWNrIGxpbmtzIGNhcmRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjYXJkcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAndGVzdFF1aWNrTGluazEnLFxuICAgICAgICAgICAgICAgIGNzc0NsYXNzOiAncWwxJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1Rlc3QgUXVpY2sgTGluayAxJyxcbiAgICAgICAgICAgICAgICBhcmlhTGFiZWw6ICd0ZXN0IHF1aWNrIGxpbmsgb25lJyxcbiAgICAgICAgICAgICAgICBhbGxvd1NlbGY6IHRydWUsXG4gICAgICAgICAgICAgICAgYWxsb3dPdGhlcnM6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3RRdWlja0xpbmsyJyxcbiAgICAgICAgICAgICAgICBjc3NDbGFzczogJ3FsMicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdUZXN0IFF1aWNrIExpbmsgMicsXG4gICAgICAgICAgICAgICAgYXJpYUxhYmVsOiAndGVzdCBxdWljayBsaW5rIHR3bycsXG4gICAgICAgICAgICAgICAgYWxsb3dTZWxmOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhbGxvd090aGVyczogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0KCdQVVQnLCAndWkvcmVzdC9tZS9xdWlja0xpbmtDYXJkcycsIGNhcmRzKS5yZXNwb25kKDIwMCwgY2FyZHMpO1xuICAgICAgICBxdWlja0xpbmtDYXJkU2VydmljZS5zYXZlUXVpY2tMaW5rQ2FyZHMoY2FyZHMpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
