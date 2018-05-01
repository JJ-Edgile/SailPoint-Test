System.register(['test/js/TestInitializer', 'home/widget/identities/IdentitiesWidgetModule', 'home/widget/WidgetModule', 'test/js/common/directive/FocusTestService'], function (_export) {
    'use strict';

    var identitiesWidgetModule, widgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetIdentitiesIdentitiesWidgetModule) {
            identitiesWidgetModule = _homeWidgetIdentitiesIdentitiesWidgetModule['default'];
        }, function (_homeWidgetWidgetModule) {
            widgetModule = _homeWidgetWidgetModule['default'];
        }, function (_testJsCommonDirectiveFocusTestService) {}],
        execute: function () {

            describe('DirectReportsWidgetDirective', function () {

                var eltDef = '<sp-widget sp-widget="widget" />',
                    george = {
                    id: '1',
                    name: 'gbluth',
                    displayName: 'George Bluth',
                    actions: ['viewIdentity', 'requestAccess', 'manageAccounts', 'managePasswords']
                },
                    michael = {
                    id: '2',
                    name: 'mbluth',
                    displayName: 'Michael Bluth',
                    actions: ['viewIdentity']
                },
                    tobias = {
                    id: '3',
                    name: 'tfunke',
                    displayName: 'Tobias Funke',
                    actions: ['requestAccess']
                },
                    lindsay = {
                    id: '4',
                    name: 'lbfunke',
                    displayName: 'Lindsay Bluth Funke',
                    actions: ['manageAccounts']
                },
                    gob = {
                    id: '5',
                    name: 'gobbluth',
                    displayName: 'Gob Bluth',
                    actions: ['managePasswords']
                },
                    buster = {
                    id: '6',
                    name: 'bbluth',
                    displayName: 'Buster Bluth',
                    actions: []
                },
                    $compile,
                    DirectReport,
                    directReportService,
                    directReports,
                    focusTestService,
                    element,
                    widget,
                    $scope,
                    $timeout,
                    $rootScope;

                beforeEach(module(identitiesWidgetModule, widgetModule));

                /* jshint maxparams: 8 */
                beforeEach(inject(function (_directReportService_, _DirectReport_, ListResultDTO, _focusTestService_, _$compile_, $q, _$rootScope_, _$timeout_) {
                    $compile = _$compile_;
                    directReportService = _directReportService_;
                    DirectReport = _DirectReport_;
                    focusTestService = _focusTestService_;
                    $rootScope = _$rootScope_;
                    $scope = $rootScope.$new();
                    $timeout = _$timeout_;

                    widget = {
                        name: 'DirectReports',
                        title: 'ui_direct_reports_title'
                    };

                    directReports = [new DirectReport(george), new DirectReport(michael), new DirectReport(tobias), new DirectReport(lindsay), new DirectReport(gob), new DirectReport(buster)];

                    spyOn(directReportService, 'getDirectReports').and.callFake(function (query, start, limit) {
                        var trimmed = angular.copy(directReports).slice(start, start + limit);
                        return $q.when(new ListResultDTO({
                            count: directReports.length,
                            objects: trimmed
                        }));
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                /**
                 * Create the directive element.
                 *
                 * @param {Boolean} addToBody  If true, the directive element is added to the body.  If false or
                 *     not specified it is not.  This is required to be true to test focusing, otherwise the focus
                 *     is not set.  However, appending to the body makes PhantomJS not adjust the "top" property
                 *     correctly when scrolling, so we don't always want this to be true.
                 */
                function createElement(addToBody) {
                    $scope.widget = widget;

                    element = $compile(angular.element(eltDef))($scope);

                    if (addToBody) {
                        angular.element('body').append(element);
                    }

                    // Resolve the promises
                    $scope.$apply();
                }

                describe('search', function () {
                    it('has a search box and button in the header', function () {
                        var header, searchElt;
                        createElement();
                        header = element.find('.panel-heading');

                        searchElt = header.find('#directReportSearchText');
                        expect(searchElt.length).toEqual(1);

                        searchElt = header.find('button');
                        expect(searchElt.length).toEqual(1);
                    });

                    it('filters results when pressing enter in the search field', function () {
                        var searchField;
                        createElement(true);
                        directReportService.getDirectReports.calls.reset();
                        searchField = element.find('#directReportSearchText');
                        searchField.val('a').trigger('input');
                        searchField.trigger($.Event('keypress', { keyCode: 13 }));
                        // Need to do this apply/timeout dance since AbstractListCtrl.search has a timeout for animation
                        $scope.$apply();
                        $timeout.flush();
                        $scope.$apply();
                        expect(directReportService.getDirectReports).toHaveBeenCalledWith('a', 0, 40);
                    });

                    it('filters results when clicking the search button', function () {
                        var searchField, searchBtn;
                        createElement(true);
                        directReportService.getDirectReports.calls.reset();
                        searchField = element.find('#directReportSearchText');
                        searchBtn = element.find('.panel-heading').find('button');
                        searchField.val('a').trigger('input');
                        searchBtn.click();
                        // Need to do this apply/timeout dance since AbstractListCtrl.search has a timeout for animation
                        $scope.$apply();
                        $timeout.flush();
                        $scope.$apply();
                        expect(directReportService.getDirectReports).toHaveBeenCalledWith('a', 0, 40);
                    });
                });

                it('shows empty text with no direct reports', function () {
                    var emptyText;
                    directReports = [];
                    createElement();
                    emptyText = element.find('p:contains(\'ui_widget_no_data\')');
                    expect(emptyText.length).toEqual(1);
                });

                it('shows one row per direct report', function () {
                    var rows;
                    // Use 3 direct reports so we don't test paging yet.
                    directReports = directReports.slice(0, 3);
                    createElement();
                    rows = element.find('.list-group-item');
                    expect(rows.length).toEqual(3);
                });

                it('shows a hyperlinked name if viewIdentity is supported', function () {
                    var found;
                    createElement();
                    found = element.find('a:contains(\'' + george.displayName + '\')');
                    expect(found.length).toEqual(1);
                });

                it('shows a text name if viewIdentity is not supported', function () {
                    var found;
                    createElement();
                    found = element.find('a:contains(\'' + tobias.displayName + '\')');
                    expect(found.length).toEqual(0);
                    found = element.find('span:contains(\'' + tobias.displayName + '\')');
                    expect(found.length).toEqual(1);
                });

                function isDisabled(btn) {
                    return !!btn.attr('disabled');
                }

                function isButtonDisabled(report, action) {
                    var row, button, iconCls;
                    row = element.find('.list-group-item:contains(\'' + report.displayName + '\')');
                    expect(row.length).toEqual(1);

                    if ('requestAccess' === action) {
                        iconCls = 'fa-key';
                    } else if ('managePasswords' === action) {
                        iconCls = 'fa-unlock-alt';
                    } else if ('manageAccounts' === action) {
                        iconCls = 'fa-folder';
                    }

                    button = row.find('button i.' + iconCls);
                    expect(button.length).toEqual(1);
                    button = button.parent('button');
                    expect(button.length).toEqual(1);

                    return isDisabled(button);
                }

                it('enables request access button if supported', function () {
                    createElement();
                    expect(isButtonDisabled(george, 'requestAccess')).toEqual(false);
                });

                it('disables request access button if not supported', function () {
                    createElement();
                    expect(isButtonDisabled(michael, 'requestAccess')).toEqual(true);
                });

                it('enables manage accounts button if supported', function () {
                    createElement();
                    expect(isButtonDisabled(george, 'manageAccounts')).toEqual(false);
                });

                it('disables manage accounts button if not supported', function () {
                    createElement();
                    expect(isButtonDisabled(michael, 'manageAccounts')).toEqual(true);
                });

                it('enables manage passwords button if supported', function () {
                    createElement();
                    expect(isButtonDisabled(george, 'managePasswords')).toEqual(false);
                });

                it('disables manage passwords button if not supported', function () {
                    createElement();
                    expect(isButtonDisabled(michael, 'managePasswords')).toEqual(true);
                });

                it('shows the total', function () {
                    var total;
                    createElement();
                    total = element.find('#directReportsWidgetTotal');
                    expect(total.length).toEqual(1);
                    expect(total.text().trim()).toEqual('6');
                });

                describe('paging information', function () {
                    function hasPagingInfo() {
                        return element.find('#directReportsPageInfo').length === 1;
                    }

                    it('is hidden with 5 or less results', function () {
                        // Return 3 results.
                        directReports = directReports.slice(0, 3);
                        createElement();
                        expect(hasPagingInfo()).toEqual(false);
                    });

                    it('is shown with more than 5 results', function () {
                        createElement();
                        expect(hasPagingInfo()).toEqual(true);
                    });
                });

                function getPrevButton() {
                    return element.find('#directReportsPrevBtn');
                }

                function getNextButton() {
                    return element.find('#directReportsNextBtn');
                }

                function goToPage2(addToBody) {
                    createElement(addToBody);
                    clickPageButton(getNextButton());
                    waitForFocus();
                }

                function clickPageButton(pageButton) {
                    pageButton.click();
                }

                function waitForFocus() {
                    // For some reason we have to flush twice.  The first triggers the directive, which adds a
                    // timeout to do the focus.  The second one executes the focus.
                    $timeout.flush();
                    $timeout.flush();
                }

                function getFirstReportName() {
                    var found = element.find('.list-group-item .col-sm-7 a'),
                        name = getText(found);

                    if (!name) {
                        found = element.find('.list-group-item .col-sm-7 span');
                        name = getText(found);
                    }

                    return name;
                }

                function getText(node) {
                    var text;
                    if (node.length > 0) {
                        text = node.contents().get(0).nodeValue;
                        return text ? text.trim() : null;
                    }
                    return null;
                }

                describe('previous button', function () {
                    it('is disabled if on first page', function () {
                        var btn;
                        createElement();
                        btn = getPrevButton();
                        expect(isDisabled(btn)).toEqual(true);
                    });

                    it('is enabled if not on first page', function () {
                        var prevBtn;
                        goToPage2();
                        prevBtn = getPrevButton();
                        expect(isDisabled(prevBtn)).toEqual(false);
                    });

                    it('goes to previous page', function () {
                        goToPage2();
                        clickPageButton(getPrevButton());
                        expect(getFirstReportName()).toEqual(george.displayName);
                    });

                    it('focuses on the first item in the page', function () {
                        var firstRow;
                        // Focusing only works if the element is added to the body.
                        goToPage2(true);
                        clickPageButton(getPrevButton());
                        firstRow = element.find('#directReportRow0')[0];
                        focusTestService.assertNotFocused(firstRow);
                        waitForFocus();
                        focusTestService.assertFocused(firstRow);
                    });
                });

                describe('next button', function () {
                    it('is disabled if on last page', function () {
                        var nextBtn;
                        goToPage2();
                        nextBtn = getNextButton();
                        expect(isDisabled(nextBtn)).toEqual(true);
                    });

                    it('is enabled if not on last page', function () {
                        var nextBtn;
                        createElement();
                        nextBtn = getNextButton();
                        expect(isDisabled(nextBtn)).toEqual(false);
                    });

                    it('goes to next page', function () {
                        var list;

                        goToPage2();

                        // George is still the first in the list...
                        expect(getFirstReportName()).toEqual(george.displayName);

                        // However, the top has been scrolled to -250px so we don't see him.
                        list = element.find('.list-group');
                        expect(list.css('top')).toEqual('-250px');
                    });

                    it('focuses on the first item in the page', function () {
                        var firstRow;
                        // Focusing only works if the element is appended to the body.
                        createElement(true);
                        clickPageButton(getNextButton());
                        firstRow = element.find('#directReportRow5')[0];
                        focusTestService.assertNotFocused(firstRow);
                        waitForFocus();
                        focusTestService.assertFocused(firstRow);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L2lkZW50aXRpZXMvRGlyZWN0UmVwb3J0c1dpZGdldERpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixpREFBaUQsNEJBQTRCLDhDQUE4QyxVQUFVLFNBQVM7SUFBMUw7O0lBR0ksSUFBSSx3QkFBd0I7SUFDNUIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsNkNBQTZDO1lBQ25HLHlCQUF5Qiw0Q0FBNEM7V0FDdEUsVUFBVSx5QkFBeUI7WUFDbEMsZUFBZSx3QkFBd0I7V0FDeEMsVUFBVSx3Q0FBd0M7UUFDckQsU0FBUyxZQUFZOztZQUg3QixTQUFTLGdDQUFnQyxZQUFXOztnQkFFaEQsSUFBSSxTQUFTO29CQUNULFNBQVM7b0JBQ0wsSUFBSTtvQkFDSixNQUFNO29CQUNOLGFBQWE7b0JBQ2IsU0FBUyxDQUFFLGdCQUFnQixpQkFBaUIsa0JBQWtCOztvQkFFbEUsVUFBVTtvQkFDTixJQUFJO29CQUNKLE1BQU07b0JBQ04sYUFBYTtvQkFDYixTQUFTLENBQUU7O29CQUVmLFNBQVM7b0JBQ0wsSUFBSTtvQkFDSixNQUFNO29CQUNOLGFBQWE7b0JBQ2IsU0FBUyxDQUFFOztvQkFFZixVQUFVO29CQUNOLElBQUk7b0JBQ0osTUFBTTtvQkFDTixhQUFhO29CQUNiLFNBQVMsQ0FBRTs7b0JBRWYsTUFBTTtvQkFDRixJQUFJO29CQUNKLE1BQU07b0JBQ04sYUFBYTtvQkFDYixTQUFTLENBQUU7O29CQUVmLFNBQVM7b0JBQ0wsSUFBSTtvQkFDSixNQUFNO29CQUNOLGFBQWE7b0JBQ2IsU0FBUzs7b0JBRWI7b0JBQVU7b0JBQWM7b0JBQXFCO29CQUFlO29CQUFrQjtvQkFBUztvQkFDdkY7b0JBQVE7b0JBQVU7O2dCQUd0QixXQUFXLE9BQU8sd0JBQXdCOzs7Z0JBRzFDLFdBQVcsT0FBTyxVQUFTLHVCQUF1QixnQkFBZ0IsZUFBZSxvQkFDdEQs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O3dCQUNKO3dCQUNBLFVBQVU7d0JBQ1YsT0FBTyxXQUFXLFVBQVUsUUFBUTs7O29CQUd4QyxHQUFHLHlCQUF5QixZQUFXO3dCQUNuQzt3QkFDQSxnQkFBZ0I7d0JBQ2hCLE9BQU8sc0JBQXNCLFFBQVEsT0FBTzs7O29CQUdoRCxHQUFHLHlDQUF5QyxZQUFXO3dCQUNuRCxJQUFJOzt3QkFFSixVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsV0FBVyxRQUFRLEtBQUsscUJBQXFCO3dCQUM3QyxpQkFBaUIsaUJBQWlCO3dCQUNsQzt3QkFDQSxpQkFBaUIsY0FBYzs7OztnQkFJdkMsU0FBUyxlQUFlLFlBQVc7b0JBQy9CLEdBQUcsK0JBQStCLFlBQVc7d0JBQ3pDLElBQUk7d0JBQ0o7d0JBQ0EsVUFBVTt3QkFDVixPQUFPLFdBQVcsVUFBVSxRQUFROzs7b0JBR3hDLEdBQUcsa0NBQWtDLFlBQVc7d0JBQzVDLElBQUk7d0JBQ0o7d0JBQ0EsVUFBVTt3QkFDVixPQUFPLFdBQVcsVUFBVSxRQUFROzs7b0JBR3hDLEdBQUcscUJBQXFCLFlBQVc7d0JBQy9CLElBQUk7O3dCQUVKOzs7d0JBR0EsT0FBTyxzQkFBc0IsUUFBUSxPQUFPOzs7d0JBRzVDLE9BQU8sUUFBUSxLQUFLO3dCQUNwQixPQUFPLEtBQUssSUFBSSxRQUFRLFFBQVE7OztvQkFHcEMsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQsSUFBSTs7d0JBRUosY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLFdBQVcsUUFBUSxLQUFLLHFCQUFxQjt3QkFDN0MsaUJBQWlCLGlCQUFpQjt3QkFDbEM7d0JBQ0EsaUJBQWlCLGNBQWM7Ozs7OztHQVF4QyIsImZpbGUiOiJob21lL3dpZGdldC9pZGVudGl0aWVzL0RpcmVjdFJlcG9ydHNXaWRnZXREaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdGllc1dpZGdldE1vZHVsZSBmcm9tICdob21lL3dpZGdldC9pZGVudGl0aWVzL0lkZW50aXRpZXNXaWRnZXRNb2R1bGUnO1xyXG5pbXBvcnQgd2lkZ2V0TW9kdWxlIGZyb20gJ2hvbWUvd2lkZ2V0L1dpZGdldE1vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9jb21tb24vZGlyZWN0aXZlL0ZvY3VzVGVzdFNlcnZpY2UnO1xyXG5cclxuZGVzY3JpYmUoJ0RpcmVjdFJlcG9ydHNXaWRnZXREaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgZWx0RGVmID0gJzxzcC13aWRnZXQgc3Atd2lkZ2V0PVwid2lkZ2V0XCIgLz4nLFxyXG4gICAgICAgIGdlb3JnZSA9IHtcclxuICAgICAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICAgICAgbmFtZTogJ2dibHV0aCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnR2VvcmdlIEJsdXRoJyxcclxuICAgICAgICAgICAgYWN0aW9uczogWyAndmlld0lkZW50aXR5JywgJ3JlcXVlc3RBY2Nlc3MnLCAnbWFuYWdlQWNjb3VudHMnLCAnbWFuYWdlUGFzc3dvcmRzJyBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtaWNoYWVsID0ge1xyXG4gICAgICAgICAgICBpZDogJzInLFxyXG4gICAgICAgICAgICBuYW1lOiAnbWJsdXRoJyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdNaWNoYWVsIEJsdXRoJyxcclxuICAgICAgICAgICAgYWN0aW9uczogWyAndmlld0lkZW50aXR5JyBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2JpYXMgPSB7XHJcbiAgICAgICAgICAgIGlkOiAnMycsXHJcbiAgICAgICAgICAgIG5hbWU6ICd0ZnVua2UnLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1RvYmlhcyBGdW5rZScsXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IFsgJ3JlcXVlc3RBY2Nlc3MnIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbmRzYXkgPSB7XHJcbiAgICAgICAgICAgIGlkOiAnNCcsXHJcbiAgICAgICAgICAgIG5hbWU6ICdsYmZ1bmtlJyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdMaW5kc2F5IEJsdXRoIEZ1bmtlJyxcclxuICAgICAgICAgICAgYWN0aW9uczogWyAnbWFuYWdlQWNjb3VudHMnIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvYiA9IHtcclxuICAgICAgICAgICAgaWQ6ICc1JyxcclxuICAgICAgICAgICAgbmFtZTogJ2dvYmJsdXRoJyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdHb2IgQmx1dGgnLFxyXG4gICAgICAgICAgICBhY3Rpb25zOiBbICdtYW5hZ2VQYXNzd29yZHMnIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1c3RlciA9IHtcclxuICAgICAgICAgICAgaWQ6ICc2JyxcclxuICAgICAgICAgICAgbmFtZTogJ2JibHV0aCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnQnVzdGVyIEJsdXRoJyxcclxuICAgICAgICAgICAgYWN0aW9uczogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgICRjb21waWxlLCBEaXJlY3RSZXBvcnQsIGRpcmVjdFJlcG9ydFNlcnZpY2UsIGRpcmVjdFJlcG9ydHMsIGZvY3VzVGVzdFNlcnZpY2UsIGVsZW1lbnQsIHdpZGdldCxcclxuICAgICAgICAkc2NvcGUsICR0aW1lb3V0LCAkcm9vdFNjb3BlO1xyXG5cclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0aWVzV2lkZ2V0TW9kdWxlLCB3aWRnZXRNb2R1bGUpKTtcclxuXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA4ICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfZGlyZWN0UmVwb3J0U2VydmljZV8sIF9EaXJlY3RSZXBvcnRfLCBMaXN0UmVzdWx0RFRPLCBfZm9jdXNUZXN0U2VydmljZV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfJGNvbXBpbGVfLCAkcSwgXyRyb290U2NvcGVfLCBfJHRpbWVvdXRfKSB7XHJcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xyXG4gICAgICAgIGRpcmVjdFJlcG9ydFNlcnZpY2UgPSBfZGlyZWN0UmVwb3J0U2VydmljZV87XHJcbiAgICAgICAgRGlyZWN0UmVwb3J0ID0gX0RpcmVjdFJlcG9ydF87XHJcbiAgICAgICAgZm9jdXNUZXN0U2VydmljZSA9IF9mb2N1c1Rlc3RTZXJ2aWNlXztcclxuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xyXG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xyXG4gICAgICAgICR0aW1lb3V0ID0gXyR0aW1lb3V0XztcclxuXHJcbiAgICAgICAgd2lkZ2V0ID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnRGlyZWN0UmVwb3J0cycsXHJcbiAgICAgICAgICAgIHRpdGxlOiAndWlfZGlyZWN0X3JlcG9ydHNfdGl0bGUnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZGlyZWN0UmVwb3J0cyA9IFtcclxuICAgICAgICAgICAgbmV3IERpcmVjdFJlcG9ydChnZW9yZ2UpLFxyXG4gICAgICAgICAgICBuZXcgRGlyZWN0UmVwb3J0KG1pY2hhZWwpLFxyXG4gICAgICAgICAgICBuZXcgRGlyZWN0UmVwb3J0KHRvYmlhcyksXHJcbiAgICAgICAgICAgIG5ldyBEaXJlY3RSZXBvcnQobGluZHNheSksXHJcbiAgICAgICAgICAgIG5ldyBEaXJlY3RSZXBvcnQoZ29iKSxcclxuICAgICAgICAgICAgbmV3IERpcmVjdFJlcG9ydChidXN0ZXIpXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgc3B5T24oZGlyZWN0UmVwb3J0U2VydmljZSwgJ2dldERpcmVjdFJlcG9ydHMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24ocXVlcnksIHN0YXJ0LCBsaW1pdCkge1xyXG4gICAgICAgICAgICB2YXIgdHJpbW1lZCA9IGFuZ3VsYXIuY29weShkaXJlY3RSZXBvcnRzKS5zbGljZShzdGFydCwgc3RhcnQgKyBsaW1pdCk7XHJcbiAgICAgICAgICAgIHJldHVybiAkcS53aGVuKG5ldyBMaXN0UmVzdWx0RFRPKHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiBkaXJlY3RSZXBvcnRzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG9iamVjdHM6IHRyaW1tZWRcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRoZSBkaXJlY3RpdmUgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGFkZFRvQm9keSAgSWYgdHJ1ZSwgdGhlIGRpcmVjdGl2ZSBlbGVtZW50IGlzIGFkZGVkIHRvIHRoZSBib2R5LiAgSWYgZmFsc2Ugb3JcclxuICAgICAqICAgICBub3Qgc3BlY2lmaWVkIGl0IGlzIG5vdC4gIFRoaXMgaXMgcmVxdWlyZWQgdG8gYmUgdHJ1ZSB0byB0ZXN0IGZvY3VzaW5nLCBvdGhlcndpc2UgdGhlIGZvY3VzXHJcbiAgICAgKiAgICAgaXMgbm90IHNldC4gIEhvd2V2ZXIsIGFwcGVuZGluZyB0byB0aGUgYm9keSBtYWtlcyBQaGFudG9tSlMgbm90IGFkanVzdCB0aGUgXCJ0b3BcIiBwcm9wZXJ0eVxyXG4gICAgICogICAgIGNvcnJlY3RseSB3aGVuIHNjcm9sbGluZywgc28gd2UgZG9uJ3QgYWx3YXlzIHdhbnQgdGhpcyB0byBiZSB0cnVlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGFkZFRvQm9keSkge1xyXG4gICAgICAgICRzY29wZS53aWRnZXQgPSB3aWRnZXQ7XHJcblxyXG4gICAgICAgIGVsZW1lbnQgPSAkY29tcGlsZShhbmd1bGFyLmVsZW1lbnQoZWx0RGVmKSkoJHNjb3BlKTtcclxuXHJcbiAgICAgICAgaWYgKGFkZFRvQm9keSkge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKS5hcHBlbmQoZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXNvbHZlIHRoZSBwcm9taXNlc1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnc2VhcmNoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ2hhcyBhIHNlYXJjaCBib3ggYW5kIGJ1dHRvbiBpbiB0aGUgaGVhZGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXIsIHNlYXJjaEVsdDtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBoZWFkZXIgPSBlbGVtZW50LmZpbmQoJy5wYW5lbC1oZWFkaW5nJyk7XHJcblxyXG4gICAgICAgICAgICBzZWFyY2hFbHQgPSBoZWFkZXIuZmluZCgnI2RpcmVjdFJlcG9ydFNlYXJjaFRleHQnKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNlYXJjaEVsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG4gICAgICAgICAgICBzZWFyY2hFbHQgPSBoZWFkZXIuZmluZCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzZWFyY2hFbHQubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZmlsdGVycyByZXN1bHRzIHdoZW4gcHJlc3NpbmcgZW50ZXIgaW4gdGhlIHNlYXJjaCBmaWVsZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VhcmNoRmllbGQ7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGRpcmVjdFJlcG9ydFNlcnZpY2UuZ2V0RGlyZWN0UmVwb3J0cy5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICBzZWFyY2hGaWVsZCA9IGVsZW1lbnQuZmluZCgnI2RpcmVjdFJlcG9ydFNlYXJjaFRleHQnKTtcclxuICAgICAgICAgICAgc2VhcmNoRmllbGQudmFsKCdhJykudHJpZ2dlcignaW5wdXQnKTtcclxuICAgICAgICAgICAgc2VhcmNoRmllbGQudHJpZ2dlcigkLkV2ZW50KCdrZXlwcmVzcycsIHsga2V5Q29kZTogMTMgfSkpO1xyXG4gICAgICAgICAgICAvLyBOZWVkIHRvIGRvIHRoaXMgYXBwbHkvdGltZW91dCBkYW5jZSBzaW5jZSBBYnN0cmFjdExpc3RDdHJsLnNlYXJjaCBoYXMgYSB0aW1lb3V0IGZvciBhbmltYXRpb25cclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkaXJlY3RSZXBvcnRTZXJ2aWNlLmdldERpcmVjdFJlcG9ydHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdhJywgMCwgNDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZmlsdGVycyByZXN1bHRzIHdoZW4gY2xpY2tpbmcgdGhlIHNlYXJjaCBidXR0b24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNlYXJjaEZpZWxkLCBzZWFyY2hCdG47XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGRpcmVjdFJlcG9ydFNlcnZpY2UuZ2V0RGlyZWN0UmVwb3J0cy5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICBzZWFyY2hGaWVsZCA9IGVsZW1lbnQuZmluZCgnI2RpcmVjdFJlcG9ydFNlYXJjaFRleHQnKTtcclxuICAgICAgICAgICAgc2VhcmNoQnRuID0gZWxlbWVudC5maW5kKCcucGFuZWwtaGVhZGluZycpLmZpbmQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBzZWFyY2hGaWVsZC52YWwoJ2EnKS50cmlnZ2VyKCdpbnB1dCcpO1xyXG4gICAgICAgICAgICBzZWFyY2hCdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgLy8gTmVlZCB0byBkbyB0aGlzIGFwcGx5L3RpbWVvdXQgZGFuY2Ugc2luY2UgQWJzdHJhY3RMaXN0Q3RybC5zZWFyY2ggaGFzIGEgdGltZW91dCBmb3IgYW5pbWF0aW9uXHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGlyZWN0UmVwb3J0U2VydmljZS5nZXREaXJlY3RSZXBvcnRzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnYScsIDAsIDQwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG93cyBlbXB0eSB0ZXh0IHdpdGggbm8gZGlyZWN0IHJlcG9ydHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZW1wdHlUZXh0O1xyXG4gICAgICAgIGRpcmVjdFJlcG9ydHMgPSBbXTtcclxuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgZW1wdHlUZXh0ID0gZWxlbWVudC5maW5kKCdwOmNvbnRhaW5zKFxcJ3VpX3dpZGdldF9ub19kYXRhXFwnKScpO1xyXG4gICAgICAgIGV4cGVjdChlbXB0eVRleHQubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dzIG9uZSByb3cgcGVyIGRpcmVjdCByZXBvcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcm93cztcclxuICAgICAgICAvLyBVc2UgMyBkaXJlY3QgcmVwb3J0cyBzbyB3ZSBkb24ndCB0ZXN0IHBhZ2luZyB5ZXQuXHJcbiAgICAgICAgZGlyZWN0UmVwb3J0cyA9IGRpcmVjdFJlcG9ydHMuc2xpY2UoMCwgMyk7XHJcbiAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgIHJvd3MgPSBlbGVtZW50LmZpbmQoJy5saXN0LWdyb3VwLWl0ZW0nKTtcclxuICAgICAgICBleHBlY3Qocm93cy5sZW5ndGgpLnRvRXF1YWwoMyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvd3MgYSBoeXBlcmxpbmtlZCBuYW1lIGlmIHZpZXdJZGVudGl0eSBpcyBzdXBwb3J0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZm91bmQ7XHJcbiAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgIGZvdW5kID0gZWxlbWVudC5maW5kKCdhOmNvbnRhaW5zKFxcJycgKyBnZW9yZ2UuZGlzcGxheU5hbWUgKyAnXFwnKScpO1xyXG4gICAgICAgIGV4cGVjdChmb3VuZC5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvd3MgYSB0ZXh0IG5hbWUgaWYgdmlld0lkZW50aXR5IGlzIG5vdCBzdXBwb3J0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZm91bmQ7XHJcbiAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgIGZvdW5kID0gZWxlbWVudC5maW5kKCdhOmNvbnRhaW5zKFxcJycgKyB0b2JpYXMuZGlzcGxheU5hbWUgKyAnXFwnKScpO1xyXG4gICAgICAgIGV4cGVjdChmb3VuZC5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgZm91bmQgPSBlbGVtZW50LmZpbmQoJ3NwYW46Y29udGFpbnMoXFwnJyArIHRvYmlhcy5kaXNwbGF5TmFtZSArICdcXCcpJyk7XHJcbiAgICAgICAgZXhwZWN0KGZvdW5kLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGlzRGlzYWJsZWQoYnRuKSB7XHJcbiAgICAgICAgcmV0dXJuICEhYnRuLmF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNCdXR0b25EaXNhYmxlZChyZXBvcnQsIGFjdGlvbikge1xyXG4gICAgICAgIHZhciByb3csIGJ1dHRvbiwgaWNvbkNscztcclxuICAgICAgICByb3cgPSBlbGVtZW50LmZpbmQoJy5saXN0LWdyb3VwLWl0ZW06Y29udGFpbnMoXFwnJyArIHJlcG9ydC5kaXNwbGF5TmFtZSArICdcXCcpJyk7XHJcbiAgICAgICAgZXhwZWN0KHJvdy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG4gICAgICAgIGlmICgncmVxdWVzdEFjY2VzcycgPT09IGFjdGlvbikge1xyXG4gICAgICAgICAgICBpY29uQ2xzID0gJ2ZhLWtleSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCdtYW5hZ2VQYXNzd29yZHMnID09PSBhY3Rpb24pIHtcclxuICAgICAgICAgICAgaWNvbkNscyA9ICdmYS11bmxvY2stYWx0JztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoJ21hbmFnZUFjY291bnRzJyA9PT0gYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGljb25DbHMgPSAnZmEtZm9sZGVyJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1dHRvbiA9IHJvdy5maW5kKCdidXR0b24gaS4nICsgaWNvbkNscyk7XHJcbiAgICAgICAgZXhwZWN0KGJ1dHRvbi5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgYnV0dG9uID0gYnV0dG9uLnBhcmVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgZXhwZWN0KGJ1dHRvbi5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpc0Rpc2FibGVkKGJ1dHRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ2VuYWJsZXMgcmVxdWVzdCBhY2Nlc3MgYnV0dG9uIGlmIHN1cHBvcnRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICBleHBlY3QoaXNCdXR0b25EaXNhYmxlZChnZW9yZ2UsICdyZXF1ZXN0QWNjZXNzJykpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2Rpc2FibGVzIHJlcXVlc3QgYWNjZXNzIGJ1dHRvbiBpZiBub3Qgc3VwcG9ydGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgIGV4cGVjdChpc0J1dHRvbkRpc2FibGVkKG1pY2hhZWwsICdyZXF1ZXN0QWNjZXNzJykpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZW5hYmxlcyBtYW5hZ2UgYWNjb3VudHMgYnV0dG9uIGlmIHN1cHBvcnRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICBleHBlY3QoaXNCdXR0b25EaXNhYmxlZChnZW9yZ2UsICdtYW5hZ2VBY2NvdW50cycpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkaXNhYmxlcyBtYW5hZ2UgYWNjb3VudHMgYnV0dG9uIGlmIG5vdCBzdXBwb3J0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgZXhwZWN0KGlzQnV0dG9uRGlzYWJsZWQobWljaGFlbCwgJ21hbmFnZUFjY291bnRzJykpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZW5hYmxlcyBtYW5hZ2UgcGFzc3dvcmRzIGJ1dHRvbiBpZiBzdXBwb3J0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgZXhwZWN0KGlzQnV0dG9uRGlzYWJsZWQoZ2VvcmdlLCAnbWFuYWdlUGFzc3dvcmRzJykpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2Rpc2FibGVzIG1hbmFnZSBwYXNzd29yZHMgYnV0dG9uIGlmIG5vdCBzdXBwb3J0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgZXhwZWN0KGlzQnV0dG9uRGlzYWJsZWQobWljaGFlbCwgJ21hbmFnZVBhc3N3b3JkcycpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dzIHRoZSB0b3RhbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0b3RhbDtcclxuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgdG90YWwgPSBlbGVtZW50LmZpbmQoJyNkaXJlY3RSZXBvcnRzV2lkZ2V0VG90YWwnKTtcclxuICAgICAgICBleHBlY3QodG90YWwubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIGV4cGVjdCh0b3RhbC50ZXh0KCkudHJpbSgpKS50b0VxdWFsKCc2Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgncGFnaW5nIGluZm9ybWF0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gaGFzUGFnaW5nSW5mbygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChlbGVtZW50LmZpbmQoJyNkaXJlY3RSZXBvcnRzUGFnZUluZm8nKS5sZW5ndGggPT09IDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ2lzIGhpZGRlbiB3aXRoIDUgb3IgbGVzcyByZXN1bHRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIFJldHVybiAzIHJlc3VsdHMuXHJcbiAgICAgICAgICAgIGRpcmVjdFJlcG9ydHMgPSBkaXJlY3RSZXBvcnRzLnNsaWNlKDAsIDMpO1xyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYXNQYWdpbmdJbmZvKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgc2hvd24gd2l0aCBtb3JlIHRoYW4gNSByZXN1bHRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhc1BhZ2luZ0luZm8oKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFByZXZCdXR0b24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZmluZCgnI2RpcmVjdFJlcG9ydHNQcmV2QnRuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TmV4dEJ1dHRvbigpIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC5maW5kKCcjZGlyZWN0UmVwb3J0c05leHRCdG4nKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnb1RvUGFnZTIoYWRkVG9Cb2R5KSB7XHJcbiAgICAgICAgY3JlYXRlRWxlbWVudChhZGRUb0JvZHkpO1xyXG4gICAgICAgIGNsaWNrUGFnZUJ1dHRvbihnZXROZXh0QnV0dG9uKCkpO1xyXG4gICAgICAgIHdhaXRGb3JGb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsaWNrUGFnZUJ1dHRvbihwYWdlQnV0dG9uKSB7XHJcbiAgICAgICAgcGFnZUJ1dHRvbi5jbGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdhaXRGb3JGb2N1cygpIHtcclxuICAgICAgICAvLyBGb3Igc29tZSByZWFzb24gd2UgaGF2ZSB0byBmbHVzaCB0d2ljZS4gIFRoZSBmaXJzdCB0cmlnZ2VycyB0aGUgZGlyZWN0aXZlLCB3aGljaCBhZGRzIGFcclxuICAgICAgICAvLyB0aW1lb3V0IHRvIGRvIHRoZSBmb2N1cy4gIFRoZSBzZWNvbmQgb25lIGV4ZWN1dGVzIHRoZSBmb2N1cy5cclxuICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xyXG4gICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Rmlyc3RSZXBvcnROYW1lKCkge1xyXG4gICAgICAgIHZhciBmb3VuZCA9IGVsZW1lbnQuZmluZCgnLmxpc3QtZ3JvdXAtaXRlbSAuY29sLXNtLTcgYScpLFxyXG4gICAgICAgICAgICBuYW1lID0gZ2V0VGV4dChmb3VuZCk7XHJcblxyXG4gICAgICAgIGlmICghbmFtZSkge1xyXG4gICAgICAgICAgICBmb3VuZCA9IGVsZW1lbnQuZmluZCgnLmxpc3QtZ3JvdXAtaXRlbSAuY29sLXNtLTcgc3BhbicpO1xyXG4gICAgICAgICAgICBuYW1lID0gZ2V0VGV4dChmb3VuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRUZXh0KG5vZGUpIHtcclxuICAgICAgICB2YXIgdGV4dDtcclxuICAgICAgICBpZiAobm9kZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRleHQgPSBub2RlLmNvbnRlbnRzKCkuZ2V0KDApLm5vZGVWYWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuICh0ZXh0KSA/IHRleHQudHJpbSgpIDogbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ3ByZXZpb3VzIGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiBvbiBmaXJzdCBwYWdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBidG47XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgYnRuID0gZ2V0UHJldkJ1dHRvbigpO1xyXG4gICAgICAgICAgICBleHBlY3QoaXNEaXNhYmxlZChidG4pKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZW5hYmxlZCBpZiBub3Qgb24gZmlyc3QgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcHJldkJ0bjtcclxuICAgICAgICAgICAgZ29Ub1BhZ2UyKCk7XHJcbiAgICAgICAgICAgIHByZXZCdG4gPSBnZXRQcmV2QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpc0Rpc2FibGVkKHByZXZCdG4pKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2dvZXMgdG8gcHJldmlvdXMgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBnb1RvUGFnZTIoKTtcclxuICAgICAgICAgICAgY2xpY2tQYWdlQnV0dG9uKGdldFByZXZCdXR0b24oKSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChnZXRGaXJzdFJlcG9ydE5hbWUoKSkudG9FcXVhbChnZW9yZ2UuZGlzcGxheU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZm9jdXNlcyBvbiB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZmlyc3RSb3c7XHJcbiAgICAgICAgICAgIC8vIEZvY3VzaW5nIG9ubHkgd29ya3MgaWYgdGhlIGVsZW1lbnQgaXMgYWRkZWQgdG8gdGhlIGJvZHkuXHJcbiAgICAgICAgICAgIGdvVG9QYWdlMih0cnVlKTtcclxuICAgICAgICAgICAgY2xpY2tQYWdlQnV0dG9uKGdldFByZXZCdXR0b24oKSk7XHJcbiAgICAgICAgICAgIGZpcnN0Um93ID0gZWxlbWVudC5maW5kKCcjZGlyZWN0UmVwb3J0Um93MCcpWzBdO1xyXG4gICAgICAgICAgICBmb2N1c1Rlc3RTZXJ2aWNlLmFzc2VydE5vdEZvY3VzZWQoZmlyc3RSb3cpO1xyXG4gICAgICAgICAgICB3YWl0Rm9yRm9jdXMoKTtcclxuICAgICAgICAgICAgZm9jdXNUZXN0U2VydmljZS5hc3NlcnRGb2N1c2VkKGZpcnN0Um93KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCduZXh0IGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiBvbiBsYXN0IHBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG5leHRCdG47XHJcbiAgICAgICAgICAgIGdvVG9QYWdlMigpO1xyXG4gICAgICAgICAgICBuZXh0QnRuID0gZ2V0TmV4dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICBleHBlY3QoaXNEaXNhYmxlZChuZXh0QnRuKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIGVuYWJsZWQgaWYgbm90IG9uIGxhc3QgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbmV4dEJ0bjtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBuZXh0QnRuID0gZ2V0TmV4dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICBleHBlY3QoaXNEaXNhYmxlZChuZXh0QnRuKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdnb2VzIHRvIG5leHQgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbGlzdDtcclxuXHJcbiAgICAgICAgICAgIGdvVG9QYWdlMigpO1xyXG5cclxuICAgICAgICAgICAgLy8gR2VvcmdlIGlzIHN0aWxsIHRoZSBmaXJzdCBpbiB0aGUgbGlzdC4uLlxyXG4gICAgICAgICAgICBleHBlY3QoZ2V0Rmlyc3RSZXBvcnROYW1lKCkpLnRvRXF1YWwoZ2VvcmdlLmRpc3BsYXlOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIHRoZSB0b3AgaGFzIGJlZW4gc2Nyb2xsZWQgdG8gLTI1MHB4IHNvIHdlIGRvbid0IHNlZSBoaW0uXHJcbiAgICAgICAgICAgIGxpc3QgPSBlbGVtZW50LmZpbmQoJy5saXN0LWdyb3VwJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsaXN0LmNzcygndG9wJykpLnRvRXF1YWwoJy0yNTBweCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZm9jdXNlcyBvbiB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZmlyc3RSb3c7XHJcbiAgICAgICAgICAgIC8vIEZvY3VzaW5nIG9ubHkgd29ya3MgaWYgdGhlIGVsZW1lbnQgaXMgYXBwZW5kZWQgdG8gdGhlIGJvZHkuXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGNsaWNrUGFnZUJ1dHRvbihnZXROZXh0QnV0dG9uKCkpO1xyXG4gICAgICAgICAgICBmaXJzdFJvdyA9IGVsZW1lbnQuZmluZCgnI2RpcmVjdFJlcG9ydFJvdzUnKVswXTtcclxuICAgICAgICAgICAgZm9jdXNUZXN0U2VydmljZS5hc3NlcnROb3RGb2N1c2VkKGZpcnN0Um93KTtcclxuICAgICAgICAgICAgd2FpdEZvckZvY3VzKCk7XHJcbiAgICAgICAgICAgIGZvY3VzVGVzdFNlcnZpY2UuYXNzZXJ0Rm9jdXNlZChmaXJzdFJvdyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
