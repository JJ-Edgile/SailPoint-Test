System.register(['test/js/TestInitializer', 'home/desktop/DesktopHomeModule'], function (_export) {
    'use strict';

    var desktopHomeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeDesktopDesktopHomeModule) {
            desktopHomeModule = _homeDesktopDesktopHomeModule['default'];
        }],
        execute: function () {

            describe('DesktopHomePage', function () {
                var DesktopHomePage, QuickLinkCard, Widget;

                beforeEach(module(desktopHomeModule));

                beforeEach(inject(function (_DesktopHomePage_, _QuickLinkCard_, _Widget_) {
                    DesktopHomePage = _DesktopHomePage_;
                    QuickLinkCard = _QuickLinkCard_;
                    Widget = _Widget_;
                }));

                it('throws with no data', function () {
                    expect(function () {
                        new DesktopHomePage(null);
                    }).toThrow();
                });

                describe('quickLinkCards', function () {
                    it('sets and maps them to QuickLinkCard objects', function () {
                        var cardData = {
                            id: '1234',
                            name: 'card1'
                        },
                            homePageData = {
                            quickLinkCards: [cardData]
                        },
                            homePage = new DesktopHomePage(homePageData);

                        expect(homePage.quickLinkCards).toEqual([new QuickLinkCard(cardData)]);
                    });

                    it('initializes to empty array with no data', function () {
                        var homePage = new DesktopHomePage({});
                        expect(homePage.quickLinkCards).toEqual([]);
                    });
                });

                describe('widgets', function () {
                    it('sets and maps them to Widget objects', function () {
                        var widgetData = {
                            id: '1234',
                            name: 'widget1'
                        },
                            homePageData = {
                            widgets: [widgetData]
                        },
                            homePage = new DesktopHomePage(homePageData);

                        expect(homePage.widgets).toEqual([new Widget(widgetData)]);
                    });

                    it('initializes to empty array with no data', function () {
                        var homePage = new DesktopHomePage({});
                        expect(homePage.widgets).toEqual([]);
                    });
                });

                it('sets contentOrder', function () {
                    var homePageData = {
                        contentOrder: ['onething', 'twothing']
                    },
                        homePage = new DesktopHomePage(homePageData);

                    expect(homePage.contentOrder).toEqual(homePageData.contentOrder);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvZGVza3RvcC9EZXN0b3BIb21lUGFnZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixtQ0FBbUMsVUFBVSxTQUFTO0lBQWxHOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwrQkFBK0I7WUFDckYsb0JBQW9CLDhCQUE4Qjs7UUFFdEQsU0FBUyxZQUFZOztZQUg3QixTQUFTLG1CQUFtQixZQUFXO2dCQUNuQyxJQUFJLGlCQUFpQixlQUFlOztnQkFFcEMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsbUJBQW1CLGlCQUFpQixVQUFVO29CQUNyRSxrQkFBa0I7b0JBQ2xCLGdCQUFnQjtvQkFDaEIsU0FBUzs7O2dCQUliLEdBQUcsdUJBQXVCLFlBQVc7b0JBQ2pDLE9BQU8sWUFBVzt3QkFBRSxJQUFJLGdCQUFnQjt1QkFBVTs7O2dCQUd0RCxTQUFTLGtCQUFrQixZQUFXO29CQUNsQyxHQUFJLCtDQUErQyxZQUFXO3dCQUMxRCxJQUFJLFdBQVc7NEJBQ1gsSUFBSTs0QkFDSixNQUFNOzs0QkFDUCxlQUFlOzRCQUNkLGdCQUFnQixDQUFDOzs0QkFDbEIsV0FBVyxJQUFJLGdCQUFnQjs7d0JBRWxDLE9BQU8sU0FBUyxnQkFBZ0IsUUFBUSxDQUFDLElBQUksY0FBYzs7O29CQUcvRCxHQUFJLDJDQUEyQyxZQUFXO3dCQUN0RCxJQUFJLFdBQVcsSUFBSSxnQkFBZ0I7d0JBQ25DLE9BQU8sU0FBUyxnQkFBZ0IsUUFBUTs7OztnQkFJaEQsU0FBUyxXQUFXLFlBQVc7b0JBQzNCLEdBQUksd0NBQXdDLFlBQVc7d0JBQ25ELElBQUksYUFBYTs0QkFDYixJQUFJOzRCQUNKLE1BQU07OzRCQUNQLGVBQWU7NEJBQ2QsU0FBUyxDQUFDOzs0QkFDWCxXQUFXLElBQUksZ0JBQWdCOzt3QkFFbEMsT0FBTyxTQUFTLFNBQVMsUUFBUSxDQUFDLElBQUksT0FBTzs7O29CQUdqRCxHQUFJLDJDQUEyQyxZQUFXO3dCQUN0RCxJQUFJLFdBQVcsSUFBSSxnQkFBZ0I7d0JBQ25DLE9BQU8sU0FBUyxTQUFTLFFBQVE7Ozs7Z0JBSXpDLEdBQUkscUJBQXFCLFlBQVc7b0JBQ2hDLElBQUksZUFBZTt3QkFDZixjQUFjLENBQUMsWUFBVzs7d0JBQzNCLFdBQVcsSUFBSSxnQkFBZ0I7O29CQUVsQyxPQUFPLFNBQVMsY0FBYyxRQUFRLGFBQWE7Ozs7O0dBZ0J4RCIsImZpbGUiOiJob21lL2Rlc2t0b3AvRGVzdG9wSG9tZVBhZ2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGVza3RvcEhvbWVNb2R1bGUgZnJvbSAnaG9tZS9kZXNrdG9wL0Rlc2t0b3BIb21lTW9kdWxlJztcblxuZGVzY3JpYmUoJ0Rlc2t0b3BIb21lUGFnZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBEZXNrdG9wSG9tZVBhZ2UsIFF1aWNrTGlua0NhcmQsIFdpZGdldDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRlc2t0b3BIb21lTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfRGVza3RvcEhvbWVQYWdlXywgX1F1aWNrTGlua0NhcmRfLCBfV2lkZ2V0Xykge1xuICAgICAgICBEZXNrdG9wSG9tZVBhZ2UgPSBfRGVza3RvcEhvbWVQYWdlXztcbiAgICAgICAgUXVpY2tMaW5rQ2FyZCA9IF9RdWlja0xpbmtDYXJkXztcbiAgICAgICAgV2lkZ2V0ID0gX1dpZGdldF87XG4gICAgfSkpO1xuXG5cbiAgICBpdCgndGhyb3dzIHdpdGggbm8gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBEZXNrdG9wSG9tZVBhZ2UobnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdxdWlja0xpbmtDYXJkcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCAoJ3NldHMgYW5kIG1hcHMgdGhlbSB0byBRdWlja0xpbmtDYXJkIG9iamVjdHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjYXJkRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdjYXJkMSdcbiAgICAgICAgICAgIH0sIGhvbWVQYWdlRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBxdWlja0xpbmtDYXJkczogW2NhcmREYXRhXVxuICAgICAgICAgICAgfSwgaG9tZVBhZ2UgPSBuZXcgRGVza3RvcEhvbWVQYWdlKGhvbWVQYWdlRGF0YSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChob21lUGFnZS5xdWlja0xpbmtDYXJkcykudG9FcXVhbChbbmV3IFF1aWNrTGlua0NhcmQoY2FyZERhdGEpXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0ICgnaW5pdGlhbGl6ZXMgdG8gZW1wdHkgYXJyYXkgd2l0aCBubyBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaG9tZVBhZ2UgPSBuZXcgRGVza3RvcEhvbWVQYWdlKHt9KTtcbiAgICAgICAgICAgIGV4cGVjdChob21lUGFnZS5xdWlja0xpbmtDYXJkcykudG9FcXVhbChbXSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3dpZGdldHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQgKCdzZXRzIGFuZCBtYXBzIHRoZW0gdG8gV2lkZ2V0IG9iamVjdHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB3aWRnZXREYXRhID0ge1xuICAgICAgICAgICAgICAgIGlkOiAnMTIzNCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3dpZGdldDEnXG4gICAgICAgICAgICB9LCBob21lUGFnZURhdGEgPSB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0czogW3dpZGdldERhdGFdXG4gICAgICAgICAgICB9LCBob21lUGFnZSA9IG5ldyBEZXNrdG9wSG9tZVBhZ2UoaG9tZVBhZ2VEYXRhKTtcblxuICAgICAgICAgICAgZXhwZWN0KGhvbWVQYWdlLndpZGdldHMpLnRvRXF1YWwoW25ldyBXaWRnZXQod2lkZ2V0RGF0YSldKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQgKCdpbml0aWFsaXplcyB0byBlbXB0eSBhcnJheSB3aXRoIG5vIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBob21lUGFnZSA9IG5ldyBEZXNrdG9wSG9tZVBhZ2Uoe30pO1xuICAgICAgICAgICAgZXhwZWN0KGhvbWVQYWdlLndpZGdldHMpLnRvRXF1YWwoW10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0ICgnc2V0cyBjb250ZW50T3JkZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGhvbWVQYWdlRGF0YSA9IHtcbiAgICAgICAgICAgIGNvbnRlbnRPcmRlcjogWydvbmV0aGluZycsJ3R3b3RoaW5nJ11cbiAgICAgICAgfSwgaG9tZVBhZ2UgPSBuZXcgRGVza3RvcEhvbWVQYWdlKGhvbWVQYWdlRGF0YSk7XG5cbiAgICAgICAgZXhwZWN0KGhvbWVQYWdlLmNvbnRlbnRPcmRlcikudG9FcXVhbChob21lUGFnZURhdGEuY29udGVudE9yZGVyKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
