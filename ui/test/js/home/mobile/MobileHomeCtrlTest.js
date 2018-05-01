System.register(['test/js/TestInitializer', 'home/mobile/MobileHomeModule'], function (_export) {

    /**
     * Tests for the MobileHomeCtrl
     */
    'use strict';

    var mobileHomeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeMobileMobileHomeModule) {
            mobileHomeModule = _homeMobileMobileHomeModule['default'];
        }],
        execute: function () {
            describe('MobileHomeCtrl', function () {
                var $rootScope,
                    ctrl,
                    quickLinkCardService,
                    quickLinkService,
                    launchResult = {
                    'action': 'quick action'
                },
                    cards = [{
                    'name': 'testQuickLink1',
                    'cssClass': 'ql1',
                    'mobile': true,
                    'label': 'Test Quick Link 1',
                    'ariaLabel': 'test quick link one',
                    'allowSelf': true,
                    'allowOthers': true
                }, {
                    'name': 'testQuickLink2'
                }];

                beforeEach(module(mobileHomeModule));

                /* don't try to load home route template. this causes unexpected GET request */
                beforeEach(module(function ($urlRouterProvider) {
                    $urlRouterProvider.deferIntercept();
                }));

                beforeEach(inject(function (_$rootScope_, _quickLinkCardService_, $controller, $q, _quickLinkService_, _quickLinkLaunchService_) {
                    $rootScope = _$rootScope_;
                    quickLinkCardService = _quickLinkCardService_;
                    quickLinkService = _quickLinkService_;

                    spyOn(quickLinkCardService, 'getMobileQuickLinkCards').and.callFake(function () {
                        return $q.when(cards);
                    });

                    spyOn(quickLinkService, 'launchQuickLink').and.callFake(function () {
                        return $q.when(launchResult);
                    });

                    spyOn(_quickLinkLaunchService_, 'handleQuickLinkLaunch');

                    ctrl = $controller('MobileHomeCtrl', {
                        quickLinkCardService: quickLinkCardService
                    });
                }));

                it('fetches the mobile quick link cards from QuickLinkCardService on init', function () {
                    expect(quickLinkCardService.getMobileQuickLinkCards).toHaveBeenCalled();
                });

                it('returns mobile quick link cards', function () {
                    var menuItems;

                    // Run a digest cycle to resolve the promise.
                    $rootScope.$apply();

                    menuItems = ctrl.getMenuItems();
                    expect(menuItems.length).toEqual(2);
                });

                it('launches quick link', function () {
                    ctrl.launchQuickLink('quicklink name');
                    expect(quickLinkService.launchQuickLink).toHaveBeenCalled();
                });

                it('does not launch a quick link if one is launching already', function () {
                    ctrl.launchQuickLink(cards[0]);
                    expect(quickLinkService.launchQuickLink).toHaveBeenCalled();
                    quickLinkService.launchQuickLink.calls.reset();
                    ctrl.launchQuickLink(cards[1]);
                    expect(quickLinkService.launchQuickLink).not.toHaveBeenCalled();
                    $rootScope.$apply();
                });

                describe('isLaunching', function () {
                    it('returns true if launching', function () {
                        ctrl.launchQuickLink(cards[0]);
                        expect(ctrl.isLaunching(cards[0])).toBe(true);
                    });

                    it('returns false if nothing is launching', function () {
                        expect(ctrl.isLaunching(cards[0])).toBe(false);
                    });

                    it('returns false if not the card that is launching', function () {
                        ctrl.launchQuickLink(cards[0]);
                        expect(ctrl.isLaunching(cards[1])).toBe(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvbW9iaWxlL01vYmlsZUhvbWVDdHJsVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsaUNBQWlDLFVBQVUsU0FBUzs7Ozs7SUFBaEc7O0lBT0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDZCQUE2QjtZQUNuRixtQkFBbUIsNEJBQTRCOztRQUVuRCxTQUFTLFlBQVk7WUFKN0IsU0FBUyxrQkFBa0IsWUFBVztnQkFDbEMsSUFBSTtvQkFBWTtvQkFBTTtvQkFBc0I7b0JBQ3hDLGVBQWU7b0JBQ1gsVUFBVTs7b0JBRWQsUUFBUSxDQUNKO29CQUNJLFFBQVE7b0JBQ1IsWUFBWTtvQkFDWixVQUFVO29CQUNWLFNBQVM7b0JBQ1QsYUFBYTtvQkFDYixhQUFhO29CQUNiLGVBQWU7bUJBRW5CO29CQUNJLFFBQVE7OztnQkFJcEIsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLG9CQUFvQjtvQkFDM0MsbUJBQW1COzs7Z0JBR3ZCLFdBQVcsT0FBTyxVQUFTLGNBQWMsd0JBQXdCLGFBQWEsSUFDbkQsb0JBQW9CLDBCQUEwQjtvQkFDckUsYUFBYTtvQkFDYix1QkFBdUI7b0JBQ3ZCLG1CQUFtQjs7b0JBRW5CLE1BQU0sc0JBQXNCLDJCQUN4QixJQUFJLFNBQVMsWUFBVzt3QkFDcEIsT0FBTyxHQUFHLEtBQUs7OztvQkFHdkIsTUFBTSxrQkFBa0IsbUJBQ3BCLElBQUksU0FBUyxZQUFXO3dCQUNwQixPQUFPLEdBQUcsS0FBSzs7O29CQUd2QixNQUFNLDBCQUEwQjs7b0JBRWhDLE9BQU8sWUFBWSxrQkFBa0I7d0JBQ2pDLHNCQUFzQjs7OztnQkFJOUIsR0FBRyx5RUFBeUUsWUFBVztvQkFDbkYsT0FBTyxxQkFBcUIseUJBQXlCOzs7Z0JBR3pELEdBQUcsbUNBQW1DLFlBQVc7b0JBQzdDLElBQUk7OztvQkFHSixXQUFXOztvQkFFWCxZQUFZLEtBQUs7b0JBQ2pCLE9BQU8sVUFBVSxRQUFRLFFBQVE7OztnQkFHckMsR0FBRyx1QkFBdUIsWUFBVztvQkFDakMsS0FBSyxnQkFBZ0I7b0JBQ3JCLE9BQU8saUJBQWlCLGlCQUFpQjs7O2dCQUc3QyxHQUFHLDREQUE0RCxZQUFXO29CQUN0RSxLQUFLLGdCQUFnQixNQUFNO29CQUMzQixPQUFPLGlCQUFpQixpQkFBaUI7b0JBQ3pDLGlCQUFpQixnQkFBZ0IsTUFBTTtvQkFDdkMsS0FBSyxnQkFBZ0IsTUFBTTtvQkFDM0IsT0FBTyxpQkFBaUIsaUJBQWlCLElBQUk7b0JBQzdDLFdBQVc7OztnQkFHZixTQUFTLGVBQWUsWUFBVztvQkFDL0IsR0FBRyw2QkFBNkIsWUFBVzt3QkFDdkMsS0FBSyxnQkFBZ0IsTUFBTTt3QkFDM0IsT0FBTyxLQUFLLFlBQVksTUFBTSxLQUFLLEtBQUs7OztvQkFHNUMsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQsT0FBTyxLQUFLLFlBQVksTUFBTSxLQUFLLEtBQUs7OztvQkFHNUMsR0FBRyxtREFBbUQsWUFBVzt3QkFDN0QsS0FBSyxnQkFBZ0IsTUFBTTt3QkFDM0IsT0FBTyxLQUFLLFlBQVksTUFBTSxLQUFLLEtBQUs7Ozs7OztHQVFqRCIsImZpbGUiOiJob21lL21vYmlsZS9Nb2JpbGVIb21lQ3RybFRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IG1vYmlsZUhvbWVNb2R1bGUgZnJvbSAnaG9tZS9tb2JpbGUvTW9iaWxlSG9tZU1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBNb2JpbGVIb21lQ3RybFxuICovXG5kZXNjcmliZSgnTW9iaWxlSG9tZUN0cmwnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHJvb3RTY29wZSwgY3RybCwgcXVpY2tMaW5rQ2FyZFNlcnZpY2UsIHF1aWNrTGlua1NlcnZpY2UsXG4gICAgICAgIGxhdW5jaFJlc3VsdCA9IHtcbiAgICAgICAgICAgICdhY3Rpb24nOiAncXVpY2sgYWN0aW9uJ1xuICAgICAgICB9LFxuICAgICAgICBjYXJkcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICd0ZXN0UXVpY2tMaW5rMScsXG4gICAgICAgICAgICAgICAgJ2Nzc0NsYXNzJzogJ3FsMScsXG4gICAgICAgICAgICAgICAgJ21vYmlsZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ2xhYmVsJzogJ1Rlc3QgUXVpY2sgTGluayAxJyxcbiAgICAgICAgICAgICAgICAnYXJpYUxhYmVsJzogJ3Rlc3QgcXVpY2sgbGluayBvbmUnLFxuICAgICAgICAgICAgICAgICdhbGxvd1NlbGYnOiB0cnVlLFxuICAgICAgICAgICAgICAgICdhbGxvd090aGVycyc6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ25hbWUnOiAndGVzdFF1aWNrTGluazInXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtb2JpbGVIb21lTW9kdWxlICkpO1xuXG4gICAgLyogZG9uJ3QgdHJ5IHRvIGxvYWQgaG9tZSByb3V0ZSB0ZW1wbGF0ZS4gdGhpcyBjYXVzZXMgdW5leHBlY3RlZCBHRVQgcmVxdWVzdCAqL1xuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIuZGVmZXJJbnRlcmNlcHQoKTtcbiAgICB9KSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF9xdWlja0xpbmtDYXJkU2VydmljZV8sICRjb250cm9sbGVyLCAkcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcXVpY2tMaW5rU2VydmljZV8sIF9xdWlja0xpbmtMYXVuY2hTZXJ2aWNlXykge1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBxdWlja0xpbmtDYXJkU2VydmljZSA9IF9xdWlja0xpbmtDYXJkU2VydmljZV87XG4gICAgICAgIHF1aWNrTGlua1NlcnZpY2UgPSBfcXVpY2tMaW5rU2VydmljZV87XG5cbiAgICAgICAgc3B5T24ocXVpY2tMaW5rQ2FyZFNlcnZpY2UsICdnZXRNb2JpbGVRdWlja0xpbmtDYXJkcycpLlxuICAgICAgICAgICAgYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKGNhcmRzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNweU9uKHF1aWNrTGlua1NlcnZpY2UsICdsYXVuY2hRdWlja0xpbmsnKS5cbiAgICAgICAgICAgIGFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihsYXVuY2hSZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc3B5T24oX3F1aWNrTGlua0xhdW5jaFNlcnZpY2VfLCAnaGFuZGxlUXVpY2tMaW5rTGF1bmNoJyk7XG5cbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdNb2JpbGVIb21lQ3RybCcsIHtcbiAgICAgICAgICAgIHF1aWNrTGlua0NhcmRTZXJ2aWNlOiBxdWlja0xpbmtDYXJkU2VydmljZVxuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBpdCgnZmV0Y2hlcyB0aGUgbW9iaWxlIHF1aWNrIGxpbmsgY2FyZHMgZnJvbSBRdWlja0xpbmtDYXJkU2VydmljZSBvbiBpbml0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChxdWlja0xpbmtDYXJkU2VydmljZS5nZXRNb2JpbGVRdWlja0xpbmtDYXJkcykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgbW9iaWxlIHF1aWNrIGxpbmsgY2FyZHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1lbnVJdGVtcztcblxuICAgICAgICAvLyBSdW4gYSBkaWdlc3QgY3ljbGUgdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcblxuICAgICAgICBtZW51SXRlbXMgPSBjdHJsLmdldE1lbnVJdGVtcygpO1xuICAgICAgICBleHBlY3QobWVudUl0ZW1zLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICB9KTtcblxuICAgIGl0KCdsYXVuY2hlcyBxdWljayBsaW5rJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGN0cmwubGF1bmNoUXVpY2tMaW5rKCdxdWlja2xpbmsgbmFtZScpO1xuICAgICAgICBleHBlY3QocXVpY2tMaW5rU2VydmljZS5sYXVuY2hRdWlja0xpbmspLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCBsYXVuY2ggYSBxdWljayBsaW5rIGlmIG9uZSBpcyBsYXVuY2hpbmcgYWxyZWFkeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjdHJsLmxhdW5jaFF1aWNrTGluayhjYXJkc1swXSk7XG4gICAgICAgIGV4cGVjdChxdWlja0xpbmtTZXJ2aWNlLmxhdW5jaFF1aWNrTGluaykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBxdWlja0xpbmtTZXJ2aWNlLmxhdW5jaFF1aWNrTGluay5jYWxscy5yZXNldCgpO1xuICAgICAgICBjdHJsLmxhdW5jaFF1aWNrTGluayhjYXJkc1sxXSk7XG4gICAgICAgIGV4cGVjdChxdWlja0xpbmtTZXJ2aWNlLmxhdW5jaFF1aWNrTGluaykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc0xhdW5jaGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGxhdW5jaGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5sYXVuY2hRdWlja0xpbmsoY2FyZHNbMF0pO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNMYXVuY2hpbmcoY2FyZHNbMF0pKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBub3RoaW5nIGlzIGxhdW5jaGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNMYXVuY2hpbmcoY2FyZHNbMF0pKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm90IHRoZSBjYXJkIHRoYXQgaXMgbGF1bmNoaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLmxhdW5jaFF1aWNrTGluayhjYXJkc1swXSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0xhdW5jaGluZyhjYXJkc1sxXSkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
