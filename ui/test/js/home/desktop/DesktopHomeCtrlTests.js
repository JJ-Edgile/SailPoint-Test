System.register(['test/js/TestInitializer', 'home/desktop/DesktopHomeModule'], function (_export) {

    /**
     * Tests for the DesktopHomeCtrl
     */
    'use strict';

    var desktopHomeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeDesktopDesktopHomeModule) {
            desktopHomeModule = _homeDesktopDesktopHomeModule['default'];
        }],
        execute: function () {
            describe('DesktopHomeCtrl', function () {
                var $scope,
                    ctrl,
                    quickLinkCardService,
                    widgetService,
                    desktopHomeService,
                    spModal,
                    $q,
                    homePage,
                    quickLinkCards = [{
                    'name': 'testQuickLink1',
                    'cssClass': 'ql1',
                    'label': 'Test Quick Link 1',
                    'ariaLabel': 'test quick link one',
                    'allowSelf': true,
                    'allowOthers': true
                }],
                    widgets = [],
                    DesktopHomePage,
                    QuickLinkCard,
                    Widget;

                beforeEach(module(desktopHomeModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function ($controller, _$q_, _$rootScope_, _spModal_, _DesktopHomePage_, _QuickLinkCard_, _Widget_) {
                    $scope = _$rootScope_.$new();
                    spModal = _spModal_;
                    $q = _$q_;
                    DesktopHomePage = _DesktopHomePage_;
                    QuickLinkCard = _QuickLinkCard_;
                    Widget = _Widget_;

                    quickLinkCards = [new QuickLinkCard({
                        'name': 'testQuickLink1',
                        'cssClass': 'ql1',
                        'label': 'Test Quick Link 1',
                        'ariaLabel': 'test quick link one',
                        'allowSelf': true,
                        'allowOthers': true
                    })];

                    widgets = [new Widget({
                        id: '23982743',
                        name: 'widget',
                        title: 'title'
                    })];

                    homePage = new DesktopHomePage({
                        quickLinkCards: quickLinkCards,
                        widgets: widgets,
                        contentOrder: ['QuickLink', 'Widget']
                    });

                    quickLinkCardService = {
                        getQuickLinkCards: jasmine.createSpy('getQuickLinkCards').and.callFake(function () {
                            return $q.when(quickLinkCards);
                        })
                    };

                    widgetService = {
                        getWidgets: jasmine.createSpy('getWidgets').and.callFake(function () {
                            return $q.when(widgets);
                        })
                    };

                    desktopHomeService = {
                        getHomePage: jasmine.createSpy('getHomePage').and.callFake(function () {
                            return $q.when(homePage);
                        }),
                        saveHomePage: jasmine.createSpy('saveHomePage').and.returnValue($q.when())
                    };

                    ctrl = $controller('DesktopHomeCtrl', {
                        quickLinkCardService: quickLinkCardService,
                        widgetService: widgetService,
                        desktopHomeService: desktopHomeService,
                        DesktopHomePage: DesktopHomePage,
                        SP_LCM_ENABLED: true
                    });
                    $scope.$apply();
                }));

                it('fetches home page on init', function () {
                    expect(desktopHomeService.getHomePage).toHaveBeenCalled();
                    $scope.$apply();
                    expect(ctrl.homePage).toEqual(homePage);
                });

                describe('getHomePage()', function () {
                    it('gets the home page when not editing', function () {
                        expect(ctrl.getHomePage()).toBe(homePage);
                    });

                    it('gets the home page scratch pad when editing', function () {
                        var scratchPad = {
                            quickLinkCards: [],
                            widgets: [{}]
                        };
                        ctrl.startEdit();
                        ctrl.homePageScratchPad = scratchPad;
                        expect(ctrl.getHomePage()).toBe(scratchPad);
                    });
                });

                it('returns quick link cards', function () {
                    var foundCards;

                    // Run a digest cycle to resolve the promise.
                    $scope.$apply();

                    foundCards = ctrl.getQuickLinkCards();
                    expect(foundCards.length).toEqual(1);
                    expect(foundCards).toEqual(quickLinkCards);
                });

                it('returns widgets', function () {
                    var foundWidgets;

                    // Run a digest cycle to resolve the promise.
                    $scope.$apply();

                    foundWidgets = ctrl.getWidgets();
                    expect(foundWidgets.length).toEqual(1);
                    expect(foundWidgets).toEqual(widgets);
                });

                describe('hasItems()', function () {
                    it('returns true if there are quick link cards', function () {
                        ctrl.homePage = {
                            quickLinkCards: [{ name: 'testCard' }],
                            widgets: []
                        };
                        expect(ctrl.hasItems()).toEqual(true);
                    });

                    it('returns true if there are widgets', function () {
                        ctrl.homePage = {
                            quickLinkCards: [],
                            widgets: [{ name: 'testWidget' }]
                        };
                        expect(ctrl.hasItems()).toEqual(true);
                    });

                    it('returns false if there are no quick link cards or widgets', function () {
                        ctrl.homePage = {
                            quickLinkCards: [],
                            widgets: []
                        };
                        expect(ctrl.hasItems()).toEqual(false);
                    });
                });

                describe('content types', function () {
                    describe('isQuickLinkContent()', function () {
                        it('returns true if quick link content', function () {
                            expect(ctrl.isQuickLinkContent(DesktopHomePage.ContentTypes.QuickLink)).toEqual(true);
                        });

                        it('returns false if not quick link content', function () {
                            expect(ctrl.isQuickLinkContent(DesktopHomePage.ContentTypes.Widget)).toEqual(false);
                        });
                    });

                    describe('isWidgetContent()', function () {
                        it('returns true if widget content', function () {
                            expect(ctrl.isWidgetContent(DesktopHomePage.ContentTypes.Widget)).toEqual(true);
                        });

                        it('returns false if not widget content', function () {
                            expect(ctrl.isWidgetContent(DesktopHomePage.ContentTypes.QuickLink)).toEqual(false);
                        });
                    });

                    describe('getContentTypes()', function () {
                        it('returns content types', function () {
                            expect(ctrl.getContentTypes()).toBe(DesktopHomePage.ContentTypes);
                        });
                    });

                    describe('isTopContent', function () {
                        it('returns true if the content type should be on top', function () {
                            expect(ctrl.isTopContent(DesktopHomePage.ContentTypes.QuickLink)).toEqual(true);
                        });

                        it('returns false if the content type is not on top', function () {
                            expect(ctrl.isTopContent(DesktopHomePage.ContentTypes.Widget)).toEqual(false);
                        });
                    });

                    describe('setTopContent', function () {
                        it('sets the content type on the front the content order list', function () {
                            ctrl.startEdit();
                            ctrl.setTopContent(DesktopHomePage.ContentTypes.Widget);
                            expect(ctrl.homePageScratchPad.contentOrder).toEqual(['Widget', 'QuickLink']);
                        });
                    });
                });

                it('start edit copies home page and sets editing to true', function () {
                    expect(ctrl.isEditing()).toEqual(false);

                    ctrl.startEdit();

                    expect(ctrl.homePageScratchPad).toEqual(ctrl.homePage);
                    expect(ctrl.isEditing()).toEqual(true);
                });

                it('cancel edit resets scratchpad and sets editing false', function () {
                    expect(ctrl.isEditing()).toEqual(false);

                    ctrl.startEdit();

                    expect(ctrl.isEditing()).toEqual(true);
                    spyOn(spModal, 'open').and.returnValue({ result: $q.when(true) });

                    ctrl.cancelEdit();
                    expect(spModal.open).toHaveBeenCalled();

                    // Run a digest cycle to resolve the promise.
                    $scope.$apply();

                    expect(ctrl.homePageScratchPad).toBeUndefined();
                    expect(ctrl.isEditing()).toEqual(false);
                });

                it('save edit calls service to save home page, clears edit/save state and fetches', function () {
                    var newCards = angular.copy(quickLinkCards),
                        newWidgets = angular.copy(widgets),
                        newOrder = ['Widget', 'QuickLink'],
                        newHomePage;
                    newCards.push({ name: 'whatever' });
                    newWidgets.push({ name: 'newWidget' });

                    newHomePage = new DesktopHomePage({
                        quickLinkCards: newCards,
                        widgets: newWidgets,
                        contentOrder: newOrder
                    });

                    // Reset from the get from initialization
                    desktopHomeService.getHomePage.calls.reset();

                    ctrl.startEdit();
                    ctrl.homePageScratchPad = newHomePage;

                    expect(ctrl.isSaving()).toEqual(false);
                    ctrl.saveEdit();
                    expect(ctrl.isSaving()).toEqual(true);
                    expect(desktopHomeService.saveHomePage).toHaveBeenCalledWith(newHomePage);

                    // Run a digest cycle to resolve the promise.
                    $scope.$apply();

                    expect(ctrl.isSaving()).toEqual(false);
                    expect(ctrl.isEditing()).toEqual(false);
                    expect(desktopHomeService.getHomePage).toHaveBeenCalled();
                });

                describe('removeCard()', function () {
                    it('removes card from scratch pad home page', function () {
                        ctrl.startEdit();
                        ctrl.homePageScratchPad = {
                            quickLinkCards: [{ name: 'quicklink1', label: 'quicklink1' }, { name: 'quicklink2', label: 'quicklink2' }]
                        };

                        ctrl.removeCard(0);

                        expect(ctrl.homePageScratchPad.quickLinkCards.length).toEqual(1);
                        expect(ctrl.homePageScratchPad.quickLinkCards[0]).toEqual({ name: 'quicklink2', label: 'quicklink2' });
                    });

                    it('throws if try to remove card with invalid index', function () {
                        ctrl.startEdit();
                        expect(function () {
                            ctrl.removeCard(-1);
                        }).toThrow();
                        expect(function () {
                            ctrl.removeCard(2);
                        }).toThrow();
                    });
                });

                describe('removeWidget()', function () {
                    it('removes widget from scratch pad home page', function () {
                        ctrl.startEdit();
                        ctrl.homePageScratchPad = {
                            widgets: [{ name: 'widget1', label: 'widget one' }, { name: 'widget2', label: 'widget two' }]
                        };

                        ctrl.removeWidget(0);

                        expect(ctrl.homePageScratchPad.widgets.length).toEqual(1);
                        expect(ctrl.homePageScratchPad.widgets[0]).toEqual({ name: 'widget2', label: 'widget two' });
                    });

                    it('throws if try to remove widget with invalid index', function () {
                        ctrl.startEdit();
                        expect(function () {
                            ctrl.removeWidget(-1);
                        }).toThrow();
                        expect(function () {
                            ctrl.removeWidget(2);
                        }).toThrow();
                    });
                });

                describe('addCard()', function () {
                    it('add card should show dialog', function () {
                        spyOn(spModal, 'open').and.returnValue({ result: $q.when(null) });
                        ctrl.startEdit();
                        ctrl.addCard();

                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('add card should add card', function () {
                        var newCard = { name: 'newquicklink' };
                        spyOn(spModal, 'open').and.returnValue({ result: $q.when([newCard]) });
                        ctrl.startEdit();
                        ctrl.addCard();

                        // Run a digest cycle to resolve the promise.
                        $scope.$apply();

                        expect(ctrl.homePageScratchPad.quickLinkCards.length).toEqual(2);
                        expect(ctrl.homePageScratchPad.quickLinkCards[1]).toEqual(newCard);
                    });
                });

                describe('addWidget()', function () {
                    it('add widget should show dialog', function () {
                        spyOn(spModal, 'open').and.returnValue({ result: $q.when(null) });
                        ctrl.startEdit();
                        ctrl.addWidget();

                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('add card should add card', function () {
                        var newWidget = { name: 'widgetnew' };
                        spyOn(spModal, 'open').and.returnValue({ result: $q.when([newWidget]) });
                        ctrl.startEdit();
                        ctrl.addWidget();

                        // Run a digest cycle to resolve the promise.
                        $scope.$apply();

                        expect(ctrl.homePageScratchPad.widgets.length).toEqual(2);
                        expect(ctrl.homePageScratchPad.widgets[1]).toEqual(newWidget);
                    });
                });

                describe('isLcmEnabled()', function () {
                    it('returns the value of SP_LCM_ENABLED', function () {
                        expect(ctrl.isLcmEnabled()).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvZGVza3RvcC9EZXNrdG9wSG9tZUN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsbUNBQW1DLFVBQVUsU0FBUzs7Ozs7SUFBbEc7O0lBT0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLCtCQUErQjtZQUNyRixvQkFBb0IsOEJBQThCOztRQUV0RCxTQUFTLFlBQVk7WUFKN0IsU0FBUyxtQkFBbUIsWUFBVztnQkFDbkMsSUFBSTtvQkFBUTtvQkFBTTtvQkFBc0I7b0JBQWU7b0JBQW9CO29CQUFTO29CQUFJO29CQUNwRixpQkFBaUIsQ0FBRTtvQkFDZixRQUFRO29CQUNSLFlBQVk7b0JBQ1osU0FBUztvQkFDVCxhQUFhO29CQUNiLGFBQWE7b0JBQ2IsZUFBZTs7b0JBRW5CLFVBQVU7b0JBQUk7b0JBQWlCO29CQUFlOztnQkFFbEQsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLGFBQWEsTUFBTSxjQUFjLFdBQVcsbUJBQzVDLGlCQUFpQixVQUFVO29CQUNsRCxTQUFTLGFBQWE7b0JBQ3RCLFVBQVU7b0JBQ1YsS0FBSztvQkFDTCxrQkFBa0I7b0JBQ2xCLGdCQUFnQjtvQkFDaEIsU0FBUzs7b0JBRVQsaUJBQWlCLENBQUMsSUFBSSxjQUFjO3dCQUNoQyxRQUFRO3dCQUNSLFlBQVk7d0JBQ1osU0FBUzt3QkFDVCxhQUFhO3dCQUNiLGFBQWE7d0JBQ2IsZUFBZTs7O29CQUduQixVQUFVLENBQUMsSUFBSSxPQUFPO3dCQUNsQixJQUFJO3dCQUNKLE1BQU07d0JBQ04sT0FBTzs7O29CQUdYLFdBQVcsSUFBSSxnQkFBZ0I7d0JBQzNCLGdCQUFnQjt3QkFDaEIsU0FBUzt3QkFDVCxjQUFjLENBQUMsYUFBYTs7O29CQUdoQyx1QkFBdUI7d0JBQ25CLG1CQUFtQixRQUFRLFVBQVUscUJBQXFCLElBQUksU0FBUyxZQUFXOzRCQUM5RSxPQUFPLEdBQUcsS0FBSzs7OztvQkFJdkIsZ0JBQWdCO3dCQUNaLFlBQVksUUFBUSxVQUFVLGNBQWMsSUFBSSxTQUFTLFlBQVc7NEJBQ2hFLE9BQU8sR0FBRyxLQUFLOzs7O29CQUl2QixxQkFBcUI7d0JBQ2pCLGFBQWEsUUFBUSxVQUFVLGVBQWUsSUFBSSxTQUFTLFlBQVc7NEJBQ2xFLE9BQU8sR0FBRyxLQUFLOzt3QkFFbkIsY0FBYyxRQUFRLFVBQVUsZ0JBQWdCLElBQUksWUFBWSxHQUFHOzs7b0JBR3ZFLE9BQU8sWUFBWSxtQkFBbUI7d0JBQ2xDLHNCQUFzQjt3QkFDdEIsZUFBZTt3QkFDZixvQkFBb0I7d0JBQ3BCLGlCQUFpQjt3QkFDakIsZ0JBQWdCOztvQkFFcEIsT0FBTzs7O2dCQUdYLEdBQUcsNkJBQTZCLFlBQVc7b0JBQ3ZDLE9BQU8sbUJBQW1CLGFBQWE7b0JBQ3ZDLE9BQU87b0JBQ1AsT0FBTyxLQUFLLFVBQVUsUUFBUTs7O2dCQUdsQyxTQUFTLGlCQUFpQixZQUFXO29CQUNqQyxHQUFHLHVDQUF1QyxZQUFXO3dCQUNqRCxPQUFPLEtBQUssZUFBZSxLQUFLOzs7b0JBR3BDLEdBQUcsK0NBQStDLFlBQVc7d0JBQ3pELElBQUksYUFBYTs0QkFDYixnQkFBZ0I7NEJBQ2hCLFNBQVMsQ0FBQzs7d0JBRWQsS0FBSzt3QkFDTCxLQUFLLHFCQUFxQjt3QkFDMUIsT0FBTyxLQUFLLGVBQWUsS0FBSzs7OztnQkFJeEMsR0FBRyw0QkFBNEIsWUFBVztvQkFDdEMsSUFBSTs7O29CQUdKLE9BQU87O29CQUVQLGFBQWEsS0FBSztvQkFDbEIsT0FBTyxXQUFXLFFBQVEsUUFBUTtvQkFDbEMsT0FBTyxZQUFZLFFBQVE7OztnQkFHL0IsR0FBRyxtQkFBbUIsWUFBVztvQkFDN0IsSUFBSTs7O29CQUdKLE9BQU87O29CQUVQLGVBQWUsS0FBSztvQkFDcEIsT0FBTyxhQUFhLFFBQVEsUUFBUTtvQkFDcEMsT0FBTyxjQUFjLFFBQVE7OztnQkFHakMsU0FBUyxjQUFjLFlBQVc7b0JBQzlCLEdBQUcsOENBQThDLFlBQVc7d0JBQ3hELEtBQUssV0FBVzs0QkFDWixnQkFBZ0IsQ0FBQyxFQUFFLE1BQU07NEJBQ3pCLFNBQVM7O3dCQUViLE9BQU8sS0FBSyxZQUFZLFFBQVE7OztvQkFHcEMsR0FBRyxxQ0FBcUMsWUFBVzt3QkFDL0MsS0FBSyxXQUFXOzRCQUNaLGdCQUFnQjs0QkFDaEIsU0FBUyxDQUFDLEVBQUUsTUFBTTs7d0JBRXRCLE9BQU8sS0FBSyxZQUFZLFFBQVE7OztvQkFHcEMsR0FBRyw2REFBNkQsWUFBVzt3QkFDdkUsS0FBSyxXQUFXOzRCQUNaLGdCQUFnQjs0QkFDaEIsU0FBUzs7d0JBRWIsT0FBTyxLQUFLLFlBQVksUUFBUTs7OztnQkFJeEMsU0FBUyxpQkFBaUIsWUFBVztvQkFDakMsU0FBUyx3QkFBd0IsWUFBVzt3QkFDeEMsR0FBSSxzQ0FBc0MsWUFBVzs0QkFDakQsT0FBTyxLQUFLLG1CQUFtQixnQkFBZ0IsYUFBYSxZQUFZLFFBQVE7Ozt3QkFHcEYsR0FBSSwyQ0FBMkMsWUFBVzs0QkFDdEQsT0FBTyxLQUFLLG1CQUFtQixnQkFBZ0IsYUFBYSxTQUFTLFFBQVE7Ozs7b0JBSXJGLFNBQVMscUJBQXFCLFlBQVc7d0JBQ3JDLEdBQUksa0NBQWtDLFlBQVc7NEJBQzdDLE9BQU8sS0FBSyxnQkFBZ0IsZ0JBQWdCLGFBQWEsU0FBUyxRQUFROzs7d0JBRzlFLEdBQUksdUNBQXVDLFlBQVc7NEJBQ2xELE9BQU8sS0FBSyxnQkFBZ0IsZ0JBQWdCLGFBQWEsWUFBWSxRQUFROzs7O29CQUlyRixTQUFTLHFCQUFxQixZQUFXO3dCQUNyQyxHQUFHLHlCQUF5QixZQUFXOzRCQUNuQyxPQUFPLEtBQUssbUJBQW1CLEtBQUssZ0JBQWdCOzs7O29CQUk1RCxTQUFTLGdCQUFnQixZQUFXO3dCQUNoQyxHQUFHLHFEQUFxRCxZQUFXOzRCQUMvRCxPQUFPLEtBQUssYUFBYSxnQkFBZ0IsYUFBYSxZQUFZLFFBQVE7Ozt3QkFHOUUsR0FBRyxtREFBbUQsWUFBVzs0QkFDN0QsT0FBTyxLQUFLLGFBQWEsZ0JBQWdCLGFBQWEsU0FBUyxRQUFROzs7O29CQUkvRSxTQUFTLGlCQUFpQixZQUFXO3dCQUNqQyxHQUFHLDZEQUE2RCxZQUFXOzRCQUN2RSxLQUFLOzRCQUNMLEtBQUssY0FBYyxnQkFBZ0IsYUFBYTs0QkFDaEQsT0FBTyxLQUFLLG1CQUFtQixjQUFjLFFBQVEsQ0FBQyxVQUFVOzs7OztnQkFLNUUsR0FBRyx3REFBd0QsWUFBVztvQkFDbEUsT0FBTyxLQUFLLGFBQWEsUUFBUTs7b0JBRWpDLEtBQUs7O29CQUVMLE9BQU8sS0FBSyxvQkFBb0IsUUFBUSxLQUFLO29CQUM3QyxPQUFPLEtBQUssYUFBYSxRQUFROzs7Z0JBR3JDLEdBQUcsd0RBQXdELFlBQVc7b0JBQ2xFLE9BQU8sS0FBSyxhQUFhLFFBQVE7O29CQUVqQyxLQUFLOztvQkFFTCxPQUFPLEtBQUssYUFBYSxRQUFRO29CQUNqQyxNQUFNLFNBQVMsUUFBUSxJQUFJLFlBQVksRUFBRSxRQUFRLEdBQUcsS0FBSzs7b0JBRXpELEtBQUs7b0JBQ0wsT0FBTyxRQUFRLE1BQU07OztvQkFHckIsT0FBTzs7b0JBRVAsT0FBTyxLQUFLLG9CQUFvQjtvQkFDaEMsT0FBTyxLQUFLLGFBQWEsUUFBUTs7O2dCQUdyQyxHQUFHLGlGQUFpRixZQUFXO29CQUMzRixJQUFJLFdBQVcsUUFBUSxLQUFLO3dCQUN4QixhQUFhLFFBQVEsS0FBSzt3QkFDMUIsV0FBVyxDQUFDLFVBQVU7d0JBQ3RCO29CQUNKLFNBQVMsS0FBSyxFQUFDLE1BQU07b0JBQ3JCLFdBQVcsS0FBSyxFQUFDLE1BQU07O29CQUV2QixjQUFjLElBQUksZ0JBQWdCO3dCQUM5QixnQkFBZ0I7d0JBQ2hCLFNBQVM7d0JBQ1QsY0FBYzs7OztvQkFJbEIsbUJBQW1CLFlBQVksTUFBTTs7b0JBRXJDLEtBQUs7b0JBQ0wsS0FBSyxxQkFBcUI7O29CQUUxQixPQUFPLEtBQUssWUFBWSxRQUFRO29CQUNoQyxLQUFLO29CQUNMLE9BQU8sS0FBSyxZQUFZLFFBQVE7b0JBQ2hDLE9BQU8sbUJBQW1CLGNBQWMscUJBQXFCOzs7b0JBRzdELE9BQU87O29CQUVQLE9BQU8sS0FBSyxZQUFZLFFBQVE7b0JBQ2hDLE9BQU8sS0FBSyxhQUFhLFFBQVE7b0JBQ2pDLE9BQU8sbUJBQW1CLGFBQWE7OztnQkFHM0MsU0FBUyxnQkFBZ0IsWUFBVztvQkFDaEMsR0FBRywyQ0FBMkMsWUFBVzt3QkFDckQsS0FBSzt3QkFDTCxLQUFLLHFCQUFxQjs0QkFDdEIsZ0JBQWdCLENBQUMsRUFBQyxNQUFNLGNBQWMsT0FBTyxnQkFDekMsRUFBQyxNQUFNLGNBQWMsT0FBTzs7O3dCQUdwQyxLQUFLLFdBQVc7O3dCQUVoQixPQUFPLEtBQUssbUJBQW1CLGVBQWUsUUFBUSxRQUFRO3dCQUM5RCxPQUFPLEtBQUssbUJBQW1CLGVBQWUsSUFDMUMsUUFBUSxFQUFFLE1BQU0sY0FBYyxPQUFPOzs7b0JBRzdDLEdBQUcsbURBQW1ELFlBQVc7d0JBQzdELEtBQUs7d0JBQ0wsT0FBTyxZQUFXOzRCQUFFLEtBQUssV0FBVyxDQUFDOzJCQUFNO3dCQUMzQyxPQUFPLFlBQVc7NEJBQUUsS0FBSyxXQUFXOzJCQUFNOzs7O2dCQUlsRCxTQUFTLGtCQUFrQixZQUFXO29CQUNsQyxHQUFHLDZDQUE2QyxZQUFXO3dCQUN2RCxLQUFLO3dCQUNMLEtBQUsscUJBQXFCOzRCQUN0QixTQUFTLENBQUMsRUFBQyxNQUFNLFdBQVcsT0FBTyxnQkFDL0IsRUFBQyxNQUFNLFdBQVcsT0FBTzs7O3dCQUdqQyxLQUFLLGFBQWE7O3dCQUVsQixPQUFPLEtBQUssbUJBQW1CLFFBQVEsUUFBUSxRQUFRO3dCQUN2RCxPQUFPLEtBQUssbUJBQW1CLFFBQVEsSUFDbkMsUUFBUSxFQUFFLE1BQU0sV0FBVyxPQUFPOzs7b0JBRzFDLEdBQUcscURBQXFELFlBQVc7d0JBQy9ELEtBQUs7d0JBQ0wsT0FBTyxZQUFXOzRCQUFFLEtBQUssYUFBYSxDQUFDOzJCQUFNO3dCQUM3QyxPQUFPLFlBQVc7NEJBQUUsS0FBSyxhQUFhOzJCQUFNOzs7O2dCQUlwRCxTQUFTLGFBQWEsWUFBVztvQkFDN0IsR0FBRywrQkFBK0IsWUFBVzt3QkFDekMsTUFBTSxTQUFTLFFBQVEsSUFBSSxZQUFZLEVBQUUsUUFBUSxHQUFHLEtBQUs7d0JBQ3pELEtBQUs7d0JBQ0wsS0FBSzs7d0JBRUwsT0FBTyxRQUFRLE1BQU07OztvQkFHekIsR0FBRyw0QkFBNEIsWUFBVzt3QkFDdEMsSUFBSSxVQUFVLEVBQUUsTUFBTTt3QkFDdEIsTUFBTSxTQUFTLFFBQVEsSUFBSSxZQUFZLEVBQUUsUUFBUSxHQUFHLEtBQUssQ0FBQzt3QkFDMUQsS0FBSzt3QkFDTCxLQUFLOzs7d0JBR0wsT0FBTzs7d0JBRVAsT0FBTyxLQUFLLG1CQUFtQixlQUFlLFFBQVEsUUFBUTt3QkFDOUQsT0FBTyxLQUFLLG1CQUFtQixlQUFlLElBQUksUUFBUTs7OztnQkFJbEUsU0FBUyxlQUFlLFlBQVc7b0JBQy9CLEdBQUcsaUNBQWlDLFlBQVc7d0JBQzNDLE1BQU0sU0FBUyxRQUFRLElBQUksWUFBWSxFQUFFLFFBQVEsR0FBRyxLQUFLO3dCQUN6RCxLQUFLO3dCQUNMLEtBQUs7O3dCQUVMLE9BQU8sUUFBUSxNQUFNOzs7b0JBR3pCLEdBQUcsNEJBQTRCLFlBQVc7d0JBQ3RDLElBQUksWUFBWSxFQUFFLE1BQU07d0JBQ3hCLE1BQU0sU0FBUyxRQUFRLElBQUksWUFBWSxFQUFFLFFBQVEsR0FBRyxLQUFLLENBQUM7d0JBQzFELEtBQUs7d0JBQ0wsS0FBSzs7O3dCQUdMLE9BQU87O3dCQUVQLE9BQU8sS0FBSyxtQkFBbUIsUUFBUSxRQUFRLFFBQVE7d0JBQ3ZELE9BQU8sS0FBSyxtQkFBbUIsUUFBUSxJQUFJLFFBQVE7Ozs7Z0JBSTNELFNBQVMsa0JBQWtCLFlBQU07b0JBQzdCLEdBQUcsdUNBQXVDLFlBQU07d0JBQzVDLE9BQU8sS0FBSyxnQkFBZ0IsUUFBUTs7Ozs7O0dBd0I3QyIsImZpbGUiOiJob21lL2Rlc2t0b3AvRGVza3RvcEhvbWVDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGRlc2t0b3BIb21lTW9kdWxlIGZyb20gJ2hvbWUvZGVza3RvcC9EZXNrdG9wSG9tZU1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBEZXNrdG9wSG9tZUN0cmxcbiAqL1xuZGVzY3JpYmUoJ0Rlc2t0b3BIb21lQ3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkc2NvcGUsIGN0cmwsIHF1aWNrTGlua0NhcmRTZXJ2aWNlLCB3aWRnZXRTZXJ2aWNlLCBkZXNrdG9wSG9tZVNlcnZpY2UsIHNwTW9kYWwsICRxLCBob21lUGFnZSxcbiAgICAgICAgcXVpY2tMaW5rQ2FyZHMgPSBbIHtcbiAgICAgICAgICAgICduYW1lJzogJ3Rlc3RRdWlja0xpbmsxJyxcbiAgICAgICAgICAgICdjc3NDbGFzcyc6ICdxbDEnLFxuICAgICAgICAgICAgJ2xhYmVsJzogJ1Rlc3QgUXVpY2sgTGluayAxJyxcbiAgICAgICAgICAgICdhcmlhTGFiZWwnOiAndGVzdCBxdWljayBsaW5rIG9uZScsXG4gICAgICAgICAgICAnYWxsb3dTZWxmJzogdHJ1ZSxcbiAgICAgICAgICAgICdhbGxvd090aGVycyc6IHRydWVcbiAgICAgICAgfV0sXG4gICAgICAgIHdpZGdldHMgPSBbXSwgRGVza3RvcEhvbWVQYWdlLCBRdWlja0xpbmtDYXJkLCBXaWRnZXQ7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShkZXNrdG9wSG9tZU1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogNyAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRjb250cm9sbGVyLCBfJHFfLCBfJHJvb3RTY29wZV8sIF9zcE1vZGFsXywgX0Rlc2t0b3BIb21lUGFnZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1F1aWNrTGlua0NhcmRfLCBfV2lkZ2V0Xykge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgIERlc2t0b3BIb21lUGFnZSA9IF9EZXNrdG9wSG9tZVBhZ2VfO1xuICAgICAgICBRdWlja0xpbmtDYXJkID0gX1F1aWNrTGlua0NhcmRfO1xuICAgICAgICBXaWRnZXQgPSBfV2lkZ2V0XztcblxuICAgICAgICBxdWlja0xpbmtDYXJkcyA9IFtuZXcgUXVpY2tMaW5rQ2FyZCh7XG4gICAgICAgICAgICAnbmFtZSc6ICd0ZXN0UXVpY2tMaW5rMScsXG4gICAgICAgICAgICAnY3NzQ2xhc3MnOiAncWwxJyxcbiAgICAgICAgICAgICdsYWJlbCc6ICdUZXN0IFF1aWNrIExpbmsgMScsXG4gICAgICAgICAgICAnYXJpYUxhYmVsJzogJ3Rlc3QgcXVpY2sgbGluayBvbmUnLFxuICAgICAgICAgICAgJ2FsbG93U2VsZic6IHRydWUsXG4gICAgICAgICAgICAnYWxsb3dPdGhlcnMnOiB0cnVlXG4gICAgICAgIH0pXTtcblxuICAgICAgICB3aWRnZXRzID0gW25ldyBXaWRnZXQoe1xuICAgICAgICAgICAgaWQ6ICcyMzk4Mjc0MycsXG4gICAgICAgICAgICBuYW1lOiAnd2lkZ2V0JyxcbiAgICAgICAgICAgIHRpdGxlOiAndGl0bGUnXG4gICAgICAgIH0pXTtcblxuICAgICAgICBob21lUGFnZSA9IG5ldyBEZXNrdG9wSG9tZVBhZ2Uoe1xuICAgICAgICAgICAgcXVpY2tMaW5rQ2FyZHM6IHF1aWNrTGlua0NhcmRzLFxuICAgICAgICAgICAgd2lkZ2V0czogd2lkZ2V0cyxcbiAgICAgICAgICAgIGNvbnRlbnRPcmRlcjogWydRdWlja0xpbmsnLCAnV2lkZ2V0J11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcXVpY2tMaW5rQ2FyZFNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnZXRRdWlja0xpbmtDYXJkczogamFzbWluZS5jcmVhdGVTcHkoJ2dldFF1aWNrTGlua0NhcmRzJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKHF1aWNrTGlua0NhcmRzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgd2lkZ2V0U2VydmljZSA9IHtcbiAgICAgICAgICAgIGdldFdpZGdldHM6IGphc21pbmUuY3JlYXRlU3B5KCdnZXRXaWRnZXRzJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKHdpZGdldHMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICBkZXNrdG9wSG9tZVNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnZXRIb21lUGFnZTogamFzbWluZS5jcmVhdGVTcHkoJ2dldEhvbWVQYWdlJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKGhvbWVQYWdlKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc2F2ZUhvbWVQYWdlOiBqYXNtaW5lLmNyZWF0ZVNweSgnc2F2ZUhvbWVQYWdlJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSlcbiAgICAgICAgfTtcblxuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ0Rlc2t0b3BIb21lQ3RybCcsIHtcbiAgICAgICAgICAgIHF1aWNrTGlua0NhcmRTZXJ2aWNlOiBxdWlja0xpbmtDYXJkU2VydmljZSxcbiAgICAgICAgICAgIHdpZGdldFNlcnZpY2U6IHdpZGdldFNlcnZpY2UsXG4gICAgICAgICAgICBkZXNrdG9wSG9tZVNlcnZpY2U6IGRlc2t0b3BIb21lU2VydmljZSxcbiAgICAgICAgICAgIERlc2t0b3BIb21lUGFnZTogRGVza3RvcEhvbWVQYWdlLFxuICAgICAgICAgICAgU1BfTENNX0VOQUJMRUQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICB9KSk7XG5cbiAgICBpdCgnZmV0Y2hlcyBob21lIHBhZ2Ugb24gaW5pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZGVza3RvcEhvbWVTZXJ2aWNlLmdldEhvbWVQYWdlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgZXhwZWN0KGN0cmwuaG9tZVBhZ2UpLnRvRXF1YWwoaG9tZVBhZ2UpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEhvbWVQYWdlKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2dldHMgdGhlIGhvbWUgcGFnZSB3aGVuIG5vdCBlZGl0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRIb21lUGFnZSgpKS50b0JlKGhvbWVQYWdlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2dldHMgdGhlIGhvbWUgcGFnZSBzY3JhdGNoIHBhZCB3aGVuIGVkaXRpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzY3JhdGNoUGFkID0ge1xuICAgICAgICAgICAgICAgIHF1aWNrTGlua0NhcmRzOiBbXSxcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiBbe31dXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY3RybC5zdGFydEVkaXQoKTtcbiAgICAgICAgICAgIGN0cmwuaG9tZVBhZ2VTY3JhdGNoUGFkID0gc2NyYXRjaFBhZDtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEhvbWVQYWdlKCkpLnRvQmUoc2NyYXRjaFBhZCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgcXVpY2sgbGluayBjYXJkcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZm91bmRDYXJkcztcblxuICAgICAgICAvLyBSdW4gYSBkaWdlc3QgY3ljbGUgdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgIGZvdW5kQ2FyZHMgPSBjdHJsLmdldFF1aWNrTGlua0NhcmRzKCk7XG4gICAgICAgIGV4cGVjdChmb3VuZENhcmRzLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGZvdW5kQ2FyZHMpLnRvRXF1YWwocXVpY2tMaW5rQ2FyZHMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgd2lkZ2V0cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZm91bmRXaWRnZXRzO1xuXG4gICAgICAgIC8vIFJ1biBhIGRpZ2VzdCBjeWNsZSB0byByZXNvbHZlIHRoZSBwcm9taXNlLlxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgZm91bmRXaWRnZXRzID0gY3RybC5nZXRXaWRnZXRzKCk7XG4gICAgICAgIGV4cGVjdChmb3VuZFdpZGdldHMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QoZm91bmRXaWRnZXRzKS50b0VxdWFsKHdpZGdldHMpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc0l0ZW1zKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgcXVpY2sgbGluayBjYXJkcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5ob21lUGFnZSA9IHtcbiAgICAgICAgICAgICAgICBxdWlja0xpbmtDYXJkczogW3sgbmFtZTogJ3Rlc3RDYXJkJ31dLFxuICAgICAgICAgICAgICAgIHdpZGdldHM6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzSXRlbXMoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgd2lkZ2V0cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5ob21lUGFnZSA9IHtcbiAgICAgICAgICAgICAgICBxdWlja0xpbmtDYXJkczogW10sXG4gICAgICAgICAgICAgICAgd2lkZ2V0czogW3sgbmFtZTogJ3Rlc3RXaWRnZXQnfV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNJdGVtcygpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBhcmUgbm8gcXVpY2sgbGluayBjYXJkcyBvciB3aWRnZXRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLmhvbWVQYWdlID0ge1xuICAgICAgICAgICAgICAgIHF1aWNrTGlua0NhcmRzOiBbXSxcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0l0ZW1zKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb250ZW50IHR5cGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRlc2NyaWJlKCdpc1F1aWNrTGlua0NvbnRlbnQoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXQgKCdyZXR1cm5zIHRydWUgaWYgcXVpY2sgbGluayBjb250ZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNRdWlja0xpbmtDb250ZW50KERlc2t0b3BIb21lUGFnZS5Db250ZW50VHlwZXMuUXVpY2tMaW5rKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCAoJ3JldHVybnMgZmFsc2UgaWYgbm90IHF1aWNrIGxpbmsgY29udGVudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzUXVpY2tMaW5rQ29udGVudChEZXNrdG9wSG9tZVBhZ2UuQ29udGVudFR5cGVzLldpZGdldCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdpc1dpZGdldENvbnRlbnQoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXQgKCdyZXR1cm5zIHRydWUgaWYgd2lkZ2V0IGNvbnRlbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1dpZGdldENvbnRlbnQoRGVza3RvcEhvbWVQYWdlLkNvbnRlbnRUeXBlcy5XaWRnZXQpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0ICgncmV0dXJucyBmYWxzZSBpZiBub3Qgd2lkZ2V0IGNvbnRlbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1dpZGdldENvbnRlbnQoRGVza3RvcEhvbWVQYWdlLkNvbnRlbnRUeXBlcy5RdWlja0xpbmspKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnZ2V0Q29udGVudFR5cGVzKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGNvbnRlbnQgdHlwZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDb250ZW50VHlwZXMoKSkudG9CZShEZXNrdG9wSG9tZVBhZ2UuQ29udGVudFR5cGVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnaXNUb3BDb250ZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBjb250ZW50IHR5cGUgc2hvdWxkIGJlIG9uIHRvcCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzVG9wQ29udGVudChEZXNrdG9wSG9tZVBhZ2UuQ29udGVudFR5cGVzLlF1aWNrTGluaykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIGNvbnRlbnQgdHlwZSBpcyBub3Qgb24gdG9wJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNUb3BDb250ZW50KERlc2t0b3BIb21lUGFnZS5Db250ZW50VHlwZXMuV2lkZ2V0KSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3NldFRvcENvbnRlbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0KCdzZXRzIHRoZSBjb250ZW50IHR5cGUgb24gdGhlIGZyb250IHRoZSBjb250ZW50IG9yZGVyIGxpc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjdHJsLnN0YXJ0RWRpdCgpO1xuICAgICAgICAgICAgICAgIGN0cmwuc2V0VG9wQ29udGVudChEZXNrdG9wSG9tZVBhZ2UuQ29udGVudFR5cGVzLldpZGdldCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaG9tZVBhZ2VTY3JhdGNoUGFkLmNvbnRlbnRPcmRlcikudG9FcXVhbChbJ1dpZGdldCcsICdRdWlja0xpbmsnXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc3RhcnQgZWRpdCBjb3BpZXMgaG9tZSBwYWdlIGFuZCBzZXRzIGVkaXRpbmcgdG8gdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoY3RybC5pc0VkaXRpbmcoKSkudG9FcXVhbChmYWxzZSk7XG5cbiAgICAgICAgY3RybC5zdGFydEVkaXQoKTtcblxuICAgICAgICBleHBlY3QoY3RybC5ob21lUGFnZVNjcmF0Y2hQYWQpLnRvRXF1YWwoY3RybC5ob21lUGFnZSk7XG4gICAgICAgIGV4cGVjdChjdHJsLmlzRWRpdGluZygpKS50b0VxdWFsKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbmNlbCBlZGl0IHJlc2V0cyBzY3JhdGNocGFkIGFuZCBzZXRzIGVkaXRpbmcgZmFsc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGN0cmwuaXNFZGl0aW5nKCkpLnRvRXF1YWwoZmFsc2UpO1xuXG4gICAgICAgIGN0cmwuc3RhcnRFZGl0KCk7XG5cbiAgICAgICAgZXhwZWN0KGN0cmwuaXNFZGl0aW5nKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHsgcmVzdWx0OiAkcS53aGVuKHRydWUpIH0pO1xuXG4gICAgICAgIGN0cmwuY2FuY2VsRWRpdCgpO1xuICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cbiAgICAgICAgLy8gUnVuIGEgZGlnZXN0IGN5Y2xlIHRvIHJlc29sdmUgdGhlIHByb21pc2UuXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICBleHBlY3QoY3RybC5ob21lUGFnZVNjcmF0Y2hQYWQpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KGN0cmwuaXNFZGl0aW5nKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NhdmUgZWRpdCBjYWxscyBzZXJ2aWNlIHRvIHNhdmUgaG9tZSBwYWdlLCBjbGVhcnMgZWRpdC9zYXZlIHN0YXRlIGFuZCBmZXRjaGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBuZXdDYXJkcyA9IGFuZ3VsYXIuY29weShxdWlja0xpbmtDYXJkcyksXG4gICAgICAgICAgICBuZXdXaWRnZXRzID0gYW5ndWxhci5jb3B5KHdpZGdldHMpLFxuICAgICAgICAgICAgbmV3T3JkZXIgPSBbJ1dpZGdldCcsICdRdWlja0xpbmsnXSxcbiAgICAgICAgICAgIG5ld0hvbWVQYWdlO1xuICAgICAgICBuZXdDYXJkcy5wdXNoKHtuYW1lOiAnd2hhdGV2ZXInfSk7XG4gICAgICAgIG5ld1dpZGdldHMucHVzaCh7bmFtZTogJ25ld1dpZGdldCd9KTtcblxuICAgICAgICBuZXdIb21lUGFnZSA9IG5ldyBEZXNrdG9wSG9tZVBhZ2Uoe1xuICAgICAgICAgICAgcXVpY2tMaW5rQ2FyZHM6IG5ld0NhcmRzLFxuICAgICAgICAgICAgd2lkZ2V0czogbmV3V2lkZ2V0cyxcbiAgICAgICAgICAgIGNvbnRlbnRPcmRlcjogbmV3T3JkZXJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzZXQgZnJvbSB0aGUgZ2V0IGZyb20gaW5pdGlhbGl6YXRpb25cbiAgICAgICAgZGVza3RvcEhvbWVTZXJ2aWNlLmdldEhvbWVQYWdlLmNhbGxzLnJlc2V0KCk7XG5cbiAgICAgICAgY3RybC5zdGFydEVkaXQoKTtcbiAgICAgICAgY3RybC5ob21lUGFnZVNjcmF0Y2hQYWQgPSBuZXdIb21lUGFnZTtcblxuICAgICAgICBleHBlY3QoY3RybC5pc1NhdmluZygpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgY3RybC5zYXZlRWRpdCgpO1xuICAgICAgICBleHBlY3QoY3RybC5pc1NhdmluZygpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICBleHBlY3QoZGVza3RvcEhvbWVTZXJ2aWNlLnNhdmVIb21lUGFnZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobmV3SG9tZVBhZ2UpO1xuXG4gICAgICAgIC8vIFJ1biBhIGRpZ2VzdCBjeWNsZSB0byByZXNvbHZlIHRoZSBwcm9taXNlLlxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgZXhwZWN0KGN0cmwuaXNTYXZpbmcoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIGV4cGVjdChjdHJsLmlzRWRpdGluZygpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KGRlc2t0b3BIb21lU2VydmljZS5nZXRIb21lUGFnZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JlbW92ZUNhcmQoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgncmVtb3ZlcyBjYXJkIGZyb20gc2NyYXRjaCBwYWQgaG9tZSBwYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLnN0YXJ0RWRpdCgpO1xuICAgICAgICAgICAgY3RybC5ob21lUGFnZVNjcmF0Y2hQYWQgPSB7XG4gICAgICAgICAgICAgICAgcXVpY2tMaW5rQ2FyZHM6IFt7bmFtZTogJ3F1aWNrbGluazEnLCBsYWJlbDogJ3F1aWNrbGluazEnfSxcbiAgICAgICAgICAgICAgICAgICAge25hbWU6ICdxdWlja2xpbmsyJywgbGFiZWw6ICdxdWlja2xpbmsyJ31dXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjdHJsLnJlbW92ZUNhcmQoMCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhvbWVQYWdlU2NyYXRjaFBhZC5xdWlja0xpbmtDYXJkcy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5ob21lUGFnZVNjcmF0Y2hQYWQucXVpY2tMaW5rQ2FyZHNbMF0pLlxuICAgICAgICAgICAgICAgIHRvRXF1YWwoeyBuYW1lOiAncXVpY2tsaW5rMicsIGxhYmVsOiAncXVpY2tsaW5rMicgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3MgaWYgdHJ5IHRvIHJlbW92ZSBjYXJkIHdpdGggaW52YWxpZCBpbmRleCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5zdGFydEVkaXQoKTtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY3RybC5yZW1vdmVDYXJkKC0xKTt9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGN0cmwucmVtb3ZlQ2FyZCgyKTt9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JlbW92ZVdpZGdldCgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdyZW1vdmVzIHdpZGdldCBmcm9tIHNjcmF0Y2ggcGFkIGhvbWUgcGFnZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5zdGFydEVkaXQoKTtcbiAgICAgICAgICAgIGN0cmwuaG9tZVBhZ2VTY3JhdGNoUGFkID0ge1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IFt7bmFtZTogJ3dpZGdldDEnLCBsYWJlbDogJ3dpZGdldCBvbmUnfSxcbiAgICAgICAgICAgICAgICAgICAge25hbWU6ICd3aWRnZXQyJywgbGFiZWw6ICd3aWRnZXQgdHdvJ31dXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjdHJsLnJlbW92ZVdpZGdldCgwKTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaG9tZVBhZ2VTY3JhdGNoUGFkLndpZGdldHMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaG9tZVBhZ2VTY3JhdGNoUGFkLndpZGdldHNbMF0pLlxuICAgICAgICAgICAgICAgIHRvRXF1YWwoeyBuYW1lOiAnd2lkZ2V0MicsIGxhYmVsOiAnd2lkZ2V0IHR3bycgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3MgaWYgdHJ5IHRvIHJlbW92ZSB3aWRnZXQgd2l0aCBpbnZhbGlkIGluZGV4JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLnN0YXJ0RWRpdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjdHJsLnJlbW92ZVdpZGdldCgtMSk7fSkudG9UaHJvdygpO1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjdHJsLnJlbW92ZVdpZGdldCgyKTt9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2FkZENhcmQoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnYWRkIGNhcmQgc2hvdWxkIHNob3cgZGlhbG9nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7IHJlc3VsdDogJHEud2hlbihudWxsKSB9KTtcbiAgICAgICAgICAgIGN0cmwuc3RhcnRFZGl0KCk7XG4gICAgICAgICAgICBjdHJsLmFkZENhcmQoKTtcblxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWRkIGNhcmQgc2hvdWxkIGFkZCBjYXJkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbmV3Q2FyZCA9IHsgbmFtZTogJ25ld3F1aWNrbGluaycgfTtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHsgcmVzdWx0OiAkcS53aGVuKFtuZXdDYXJkXSkgfSk7XG4gICAgICAgICAgICBjdHJsLnN0YXJ0RWRpdCgpO1xuICAgICAgICAgICAgY3RybC5hZGRDYXJkKCk7XG5cbiAgICAgICAgICAgIC8vIFJ1biBhIGRpZ2VzdCBjeWNsZSB0byByZXNvbHZlIHRoZSBwcm9taXNlLlxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5ob21lUGFnZVNjcmF0Y2hQYWQucXVpY2tMaW5rQ2FyZHMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaG9tZVBhZ2VTY3JhdGNoUGFkLnF1aWNrTGlua0NhcmRzWzFdKS50b0VxdWFsKG5ld0NhcmQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhZGRXaWRnZXQoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnYWRkIHdpZGdldCBzaG91bGQgc2hvdyBkaWFsb2cnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHsgcmVzdWx0OiAkcS53aGVuKG51bGwpIH0pO1xuICAgICAgICAgICAgY3RybC5zdGFydEVkaXQoKTtcbiAgICAgICAgICAgIGN0cmwuYWRkV2lkZ2V0KCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FkZCBjYXJkIHNob3VsZCBhZGQgY2FyZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG5ld1dpZGdldCA9IHsgbmFtZTogJ3dpZGdldG5ldycgfTtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHsgcmVzdWx0OiAkcS53aGVuKFtuZXdXaWRnZXRdKSB9KTtcbiAgICAgICAgICAgIGN0cmwuc3RhcnRFZGl0KCk7XG4gICAgICAgICAgICBjdHJsLmFkZFdpZGdldCgpO1xuXG4gICAgICAgICAgICAvLyBSdW4gYSBkaWdlc3QgY3ljbGUgdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaG9tZVBhZ2VTY3JhdGNoUGFkLndpZGdldHMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaG9tZVBhZ2VTY3JhdGNoUGFkLndpZGdldHNbMV0pLnRvRXF1YWwobmV3V2lkZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNMY21FbmFibGVkKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSB2YWx1ZSBvZiBTUF9MQ01fRU5BQkxFRCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzTGNtRW5hYmxlZCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
