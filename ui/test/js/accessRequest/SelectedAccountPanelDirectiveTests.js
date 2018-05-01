System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('SelectedAccountPanelDirective', function () {

                var elementDefinition = '<sp-selected-account-panel sp-requested-item="requestedItem" sp-on-click="doIt()" sp-disabled="false"/>',
                    totalSelections,
                    completeSelections,
                    $scope,
                    $compile,
                    requestedItem,
                    accessRequestAccountSelectionService;

                // Use the access request module.
                beforeEach(module(accessRequestModule));

                beforeEach(inject(function (_$compile_, $rootScope, _accessRequestAccountSelectionService_, spTranslateFilter) {
                    $compile = _$compile_;
                    $scope = $rootScope.$new();
                    accessRequestAccountSelectionService = _accessRequestAccountSelectionService_;

                    // Mock spTranslateFilter to test localization
                    spTranslateFilter.configureCatalog({
                        'ui_access_request_x_of_y_accounts_selected': '{0} OF {1} ACCOUNTS SELECTED',
                        'ui_access_request_accounts_selected': '{0} ACCOUNTS SELECTED',
                        'ui_access_request_account_selected': 'UNO ACCOUNT SELECTED'
                    });

                    // Used by our fake service.
                    totalSelections = 2;
                    completeSelections = 2;

                    // Spy on the total/completed methods and return our fake values.
                    spyOn(accessRequestAccountSelectionService, 'getTotalAccountSelectionCount').and.callFake(function () {
                        return totalSelections;
                    });
                    spyOn(accessRequestAccountSelectionService, 'getCompletedAccountSelectionCount').and.callFake(function () {
                        return completeSelections;
                    });

                    // Create a fake RequestedAccessItem.
                    requestedItem = {
                        hasMissingAccountSelections: function () {
                            return totalSelections > completeSelections;
                        }
                    };
                }));

                function createElement(item, disabled) {
                    var element;

                    $scope.requestedItem = item;
                    $scope.doIt = jasmine.createSpy();

                    var elDef = elementDefinition;
                    if (disabled) {
                        elDef = elementDefinition.replace('sp-disabled="false"', 'sp-disabled="true"');
                    }
                    element = angular.element(elDef);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                it('does not render if requestedItem is null', function () {
                    var elt = createElement(null);
                    checkNotRendered(elt);
                });

                it('does not render when there are no account selections', function () {
                    var elt;
                    totalSelections = 0;
                    elt = createElement(requestedItem);
                    checkNotRendered(elt);
                });

                function checkNotRendered(elt) {
                    expect(elt.children().length).toEqual(0);
                }

                it('looks dangerous if there are missing account selections', function () {
                    var elt, found;
                    completeSelections = 1;
                    elt = createElement(requestedItem);

                    // Look for the border.
                    found = elt.find('.b-danger');
                    expect(found.length).toEqual(1);

                    // Look for dangerous text.
                    found = elt.find('p.text-danger');
                    expect(found.length).toEqual(1);
                });

                it('calls spOnClick when button is clicked', function () {
                    var elt = createElement(requestedItem),
                        btn = elt.find('button');

                    btn.click();

                    expect($scope.doIt).toHaveBeenCalled();
                });

                it('shows x of y message when there are missing account selections', function () {
                    var elt;
                    completeSelections = 1;
                    elt = createElement(requestedItem);
                    checkMessage(elt, '1 OF 2 ACCOUNTS SELECTED');
                });

                it('shows singular account selected message when there is one account selection', function () {
                    var elt;
                    completeSelections = 1;
                    totalSelections = 1;
                    elt = createElement(requestedItem);
                    checkMessage(elt, 'UNO ACCOUNT SELECTED');
                });

                it('shows plural account selected message when there are multiple selections', function () {
                    var elt;
                    completeSelections = 3;
                    totalSelections = 3;
                    elt = createElement(requestedItem);
                    checkMessage(elt, '3 ACCOUNTS SELECTED');
                });

                it('disables button when spDisabled is true', function () {
                    var elt = createElement(requestedItem, true);
                    expect(angular.element(elt).find('button').attr('disabled')).toEqual('disabled');
                });

                it('does not disable button when spDisabled is false', function () {
                    var elt = createElement(requestedItem, false);
                    expect(angular.element(elt).find('button').attr('disabled')).toBeUndefined();
                });

                it('does not disable button when spDisabled is not set', function () {
                    var element = angular.element(elementDefinition.replace('sp-disabled="false"', ''));
                    $compile(element)($scope);
                    $scope.$apply();
                    expect(angular.element(element).find('button').attr('disabled')).toBeUndefined();
                });

                function checkMessage(elt, msg) {
                    var found = elt.find('b.sr-only');
                    expect(found.length).toEqual(1);
                    expect(found.text()).toEqual(msg);
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvU2VsZWN0ZWRBY2NvdW50UGFuZWxEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLDRDQUE0QyxVQUFVLFNBQVM7SUFBaEo7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsc0NBQXNDO1FBQ25ELFNBQVMsWUFBWTs7WUFGN0IsU0FBUyxpQ0FBaUMsWUFBVzs7Z0JBRWpELElBQUksb0JBQ0k7b0JBQ0o7b0JBQWdCO29CQUNoQjtvQkFBUTtvQkFBVTtvQkFDbEI7OztnQkFJSixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxZQUFZLFlBQVksd0NBQXdDLG1CQUFtQjtvQkFDMUcsV0FBVztvQkFDWCxTQUFTLFdBQVc7b0JBQ3BCLHVDQUF1Qzs7O29CQUd2QyxrQkFBa0IsaUJBQWlCO3dCQUMvQiw4Q0FBOEM7d0JBQzlDLHVDQUF1Qzt3QkFDdkMsc0NBQXNDOzs7O29CQUkxQyxrQkFBa0I7b0JBQ2xCLHFCQUFxQjs7O29CQUdyQixNQUFNLHNDQUFzQyxpQ0FBaUMsSUFBSSxTQUFTLFlBQVc7d0JBQ2pHLE9BQU87O29CQUVYLE1BQU0sc0NBQXNDLHFDQUFxQyxJQUFJLFNBQVMsWUFBVzt3QkFDckcsT0FBTzs7OztvQkFJWCxnQkFBZ0I7d0JBQ1osNkJBQTZCLFlBQVc7NEJBQ3BDLE9BQU8sa0JBQWtCOzs7OztnQkFLckMsU0FBUyxjQUFjLE1BQU0sVUFBVTtvQkFDbkMsSUFBSTs7b0JBRUosT0FBTyxnQkFBZ0I7b0JBQ3ZCLE9BQU8sT0FBTyxRQUFROztvQkFFdEIsSUFBSSxRQUFRO29CQUNaLElBQUcsVUFBVTt3QkFDVCxRQUFRLGtCQUFrQixRQUFRLHVCQUF1Qjs7b0JBRTdELFVBQVUsUUFBUSxRQUFRO29CQUMxQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLEdBQUcsNENBQTRDLFlBQVc7b0JBQ3RELElBQUksTUFBTSxjQUFjO29CQUN4QixpQkFBaUI7OztnQkFHckIsR0FBRyx3REFBd0QsWUFBVztvQkFDbEUsSUFBSTtvQkFDSixrQkFBa0I7b0JBQ2xCLE1BQU0sY0FBYztvQkFDcEIsaUJBQWlCOzs7Z0JBR3JCLFNBQVMsaUJBQWlCLEtBQUs7b0JBQzNCLE9BQU8sSUFBSSxXQUFXLFFBQVEsUUFBUTs7O2dCQUcxQyxHQUFHLDJEQUEyRCxZQUFXO29CQUNyRSxJQUFJLEtBQUs7b0JBQ1QscUJBQXFCO29CQUNyQixNQUFNLGNBQWM7OztvQkFHcEIsUUFBUSxJQUFJLEtBQUs7b0JBQ2pCLE9BQU8sTUFBTSxRQUFRLFFBQVE7OztvQkFHN0IsUUFBUSxJQUFJLEtBQUs7b0JBQ2pCLE9BQU8sTUFBTSxRQUFRLFFBQVE7OztnQkFHakMsR0FBRywwQ0FBMEMsWUFBVztvQkFDcEQsSUFBSSxNQUFNLGNBQWM7d0JBQ3BCLE1BQU0sSUFBSSxLQUFLOztvQkFFbkIsSUFBSTs7b0JBRUosT0FBTyxPQUFPLE1BQU07OztnQkFHeEIsR0FBRyxrRUFBa0UsWUFBVztvQkFDNUUsSUFBSTtvQkFDSixxQkFBcUI7b0JBQ3JCLE1BQU0sY0FBYztvQkFDcEIsYUFBYSxLQUFLOzs7Z0JBR3RCLEdBQUcsK0VBQStFLFlBQVc7b0JBQ3pGLElBQUk7b0JBQ0oscUJBQXFCO29CQUNyQixrQkFBa0I7b0JBQ2xCLE1BQU0sY0FBYztvQkFDcEIsYUFBYSxLQUFLOzs7Z0JBR3RCLEdBQUcsNEVBQTRFLFlBQVc7b0JBQ3RGLElBQUk7b0JBQ0oscUJBQXFCO29CQUNyQixrQkFBa0I7b0JBQ2xCLE1BQU0sY0FBYztvQkFDcEIsYUFBYSxLQUFLOzs7Z0JBR3RCLEdBQUcsMkNBQTJDLFlBQVc7b0JBQ3JELElBQUksTUFBTSxjQUFjLGVBQWU7b0JBQ3ZDLE9BQU8sUUFBUSxRQUFRLEtBQUssS0FBSyxVQUFVLEtBQUssYUFBYSxRQUFROzs7Z0JBR3pFLEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlELElBQUksTUFBTSxjQUFjLGVBQWU7b0JBQ3ZDLE9BQU8sUUFBUSxRQUFRLEtBQUssS0FBSyxVQUFVLEtBQUssYUFBYTs7O2dCQUdqRSxHQUFHLHNEQUFzRCxZQUFXO29CQUNoRSxJQUFJLFVBQVUsUUFBUSxRQUFRLGtCQUFrQixRQUFRLHVCQUF1QjtvQkFDL0UsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU8sUUFBUSxRQUFRLFNBQVMsS0FBSyxVQUFVLEtBQUssYUFBYTs7O2dCQUdyRSxTQUFTLGFBQWEsS0FBSyxLQUFLO29CQUM1QixJQUFJLFFBQVEsSUFBSSxLQUFLO29CQUNyQixPQUFPLE1BQU0sUUFBUSxRQUFRO29CQUM3QixPQUFPLE1BQU0sUUFBUSxRQUFROzs7OztHQVVsQyIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L1NlbGVjdGVkQWNjb3VudFBhbmVsRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcclxuaW1wb3J0ICd0ZXN0L2pzL2NvbW1vbi9pMThuL01vY2tUcmFuc2xhdGVGaWx0ZXInO1xyXG5cclxuZGVzY3JpYmUoJ1NlbGVjdGVkQWNjb3VudFBhbmVsRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGVsZW1lbnREZWZpbml0aW9uID1cclxuICAgICAgICAgICAgJzxzcC1zZWxlY3RlZC1hY2NvdW50LXBhbmVsIHNwLXJlcXVlc3RlZC1pdGVtPVwicmVxdWVzdGVkSXRlbVwiIHNwLW9uLWNsaWNrPVwiZG9JdCgpXCIgc3AtZGlzYWJsZWQ9XCJmYWxzZVwiLz4nLFxyXG4gICAgICAgIHRvdGFsU2VsZWN0aW9ucyxjb21wbGV0ZVNlbGVjdGlvbnMsXHJcbiAgICAgICAgJHNjb3BlLCAkY29tcGlsZSwgcmVxdWVzdGVkSXRlbSxcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2U7XHJcblxyXG5cclxuICAgIC8vIFVzZSB0aGUgYWNjZXNzIHJlcXVlc3QgbW9kdWxlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29tcGlsZV8sICRyb290U2NvcGUsIF9hY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2VfLCBzcFRyYW5zbGF0ZUZpbHRlcikge1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlXztcclxuXHJcbiAgICAgICAgLy8gTW9jayBzcFRyYW5zbGF0ZUZpbHRlciB0byB0ZXN0IGxvY2FsaXphdGlvblxyXG4gICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLmNvbmZpZ3VyZUNhdGFsb2coe1xyXG4gICAgICAgICAgICAndWlfYWNjZXNzX3JlcXVlc3RfeF9vZl95X2FjY291bnRzX3NlbGVjdGVkJzogJ3swfSBPRiB7MX0gQUNDT1VOVFMgU0VMRUNURUQnLFxyXG4gICAgICAgICAgICAndWlfYWNjZXNzX3JlcXVlc3RfYWNjb3VudHNfc2VsZWN0ZWQnOiAnezB9IEFDQ09VTlRTIFNFTEVDVEVEJyxcclxuICAgICAgICAgICAgJ3VpX2FjY2Vzc19yZXF1ZXN0X2FjY291bnRfc2VsZWN0ZWQnOiAnVU5PIEFDQ09VTlQgU0VMRUNURUQnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFVzZWQgYnkgb3VyIGZha2Ugc2VydmljZS5cclxuICAgICAgICB0b3RhbFNlbGVjdGlvbnMgPSAyO1xyXG4gICAgICAgIGNvbXBsZXRlU2VsZWN0aW9ucyA9IDI7XHJcblxyXG4gICAgICAgIC8vIFNweSBvbiB0aGUgdG90YWwvY29tcGxldGVkIG1ldGhvZHMgYW5kIHJldHVybiBvdXIgZmFrZSB2YWx1ZXMuXHJcbiAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLCAnZ2V0VG90YWxBY2NvdW50U2VsZWN0aW9uQ291bnQnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0b3RhbFNlbGVjdGlvbnM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLCAnZ2V0Q29tcGxldGVkQWNjb3VudFNlbGVjdGlvbkNvdW50JykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcGxldGVTZWxlY3Rpb25zO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBmYWtlIFJlcXVlc3RlZEFjY2Vzc0l0ZW0uXHJcbiAgICAgICAgcmVxdWVzdGVkSXRlbSA9IHtcclxuICAgICAgICAgICAgaGFzTWlzc2luZ0FjY291bnRTZWxlY3Rpb25zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbFNlbGVjdGlvbnMgPiBjb21wbGV0ZVNlbGVjdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoaXRlbSwgZGlzYWJsZWQpIHtcclxuICAgICAgICB2YXIgZWxlbWVudDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnJlcXVlc3RlZEl0ZW0gPSBpdGVtO1xyXG4gICAgICAgICRzY29wZS5kb0l0ID0gamFzbWluZS5jcmVhdGVTcHkoKTtcclxuXHJcbiAgICAgICAgdmFyIGVsRGVmID0gZWxlbWVudERlZmluaXRpb247XHJcbiAgICAgICAgaWYoZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgZWxEZWYgPSBlbGVtZW50RGVmaW5pdGlvbi5yZXBsYWNlKCdzcC1kaXNhYmxlZD1cImZhbHNlXCInLCAnc3AtZGlzYWJsZWQ9XCJ0cnVlXCInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbERlZik7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ2RvZXMgbm90IHJlbmRlciBpZiByZXF1ZXN0ZWRJdGVtIGlzIG51bGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWx0ID0gY3JlYXRlRWxlbWVudChudWxsKTtcclxuICAgICAgICBjaGVja05vdFJlbmRlcmVkKGVsdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZG9lcyBub3QgcmVuZGVyIHdoZW4gdGhlcmUgYXJlIG5vIGFjY291bnQgc2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbHQ7XHJcbiAgICAgICAgdG90YWxTZWxlY3Rpb25zID0gMDtcclxuICAgICAgICBlbHQgPSBjcmVhdGVFbGVtZW50KHJlcXVlc3RlZEl0ZW0pO1xyXG4gICAgICAgIGNoZWNrTm90UmVuZGVyZWQoZWx0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrTm90UmVuZGVyZWQoZWx0KSB7XHJcbiAgICAgICAgZXhwZWN0KGVsdC5jaGlsZHJlbigpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgIH1cclxuXHJcbiAgICBpdCgnbG9va3MgZGFuZ2Vyb3VzIGlmIHRoZXJlIGFyZSBtaXNzaW5nIGFjY291bnQgc2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbHQsIGZvdW5kO1xyXG4gICAgICAgIGNvbXBsZXRlU2VsZWN0aW9ucyA9IDE7XHJcbiAgICAgICAgZWx0ID0gY3JlYXRlRWxlbWVudChyZXF1ZXN0ZWRJdGVtKTtcclxuXHJcbiAgICAgICAgLy8gTG9vayBmb3IgdGhlIGJvcmRlci5cclxuICAgICAgICBmb3VuZCA9IGVsdC5maW5kKCcuYi1kYW5nZXInKTtcclxuICAgICAgICBleHBlY3QoZm91bmQubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG5cclxuICAgICAgICAvLyBMb29rIGZvciBkYW5nZXJvdXMgdGV4dC5cclxuICAgICAgICBmb3VuZCA9IGVsdC5maW5kKCdwLnRleHQtZGFuZ2VyJyk7XHJcbiAgICAgICAgZXhwZWN0KGZvdW5kLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdjYWxscyBzcE9uQ2xpY2sgd2hlbiBidXR0b24gaXMgY2xpY2tlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbHQgPSBjcmVhdGVFbGVtZW50KHJlcXVlc3RlZEl0ZW0pLFxyXG4gICAgICAgICAgICBidG4gPSBlbHQuZmluZCgnYnV0dG9uJyk7XHJcblxyXG4gICAgICAgIGJ0bi5jbGljaygpO1xyXG5cclxuICAgICAgICBleHBlY3QoJHNjb3BlLmRvSXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG93cyB4IG9mIHkgbWVzc2FnZSB3aGVuIHRoZXJlIGFyZSBtaXNzaW5nIGFjY291bnQgc2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbHQ7XHJcbiAgICAgICAgY29tcGxldGVTZWxlY3Rpb25zID0gMTtcclxuICAgICAgICBlbHQgPSBjcmVhdGVFbGVtZW50KHJlcXVlc3RlZEl0ZW0pO1xyXG4gICAgICAgIGNoZWNrTWVzc2FnZShlbHQsICcxIE9GIDIgQUNDT1VOVFMgU0VMRUNURUQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG93cyBzaW5ndWxhciBhY2NvdW50IHNlbGVjdGVkIG1lc3NhZ2Ugd2hlbiB0aGVyZSBpcyBvbmUgYWNjb3VudCBzZWxlY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWx0O1xyXG4gICAgICAgIGNvbXBsZXRlU2VsZWN0aW9ucyA9IDE7XHJcbiAgICAgICAgdG90YWxTZWxlY3Rpb25zID0gMTtcclxuICAgICAgICBlbHQgPSBjcmVhdGVFbGVtZW50KHJlcXVlc3RlZEl0ZW0pO1xyXG4gICAgICAgIGNoZWNrTWVzc2FnZShlbHQsICdVTk8gQUNDT1VOVCBTRUxFQ1RFRCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dzIHBsdXJhbCBhY2NvdW50IHNlbGVjdGVkIG1lc3NhZ2Ugd2hlbiB0aGVyZSBhcmUgbXVsdGlwbGUgc2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbHQ7XHJcbiAgICAgICAgY29tcGxldGVTZWxlY3Rpb25zID0gMztcclxuICAgICAgICB0b3RhbFNlbGVjdGlvbnMgPSAzO1xyXG4gICAgICAgIGVsdCA9IGNyZWF0ZUVsZW1lbnQocmVxdWVzdGVkSXRlbSk7XHJcbiAgICAgICAgY2hlY2tNZXNzYWdlKGVsdCwgJzMgQUNDT1VOVFMgU0VMRUNURUQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkaXNhYmxlcyBidXR0b24gd2hlbiBzcERpc2FibGVkIGlzIHRydWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWx0ID0gY3JlYXRlRWxlbWVudChyZXF1ZXN0ZWRJdGVtLCB0cnVlKTtcclxuICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGVsdCkuZmluZCgnYnV0dG9uJykuYXR0cignZGlzYWJsZWQnKSkudG9FcXVhbCgnZGlzYWJsZWQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkb2VzIG5vdCBkaXNhYmxlIGJ1dHRvbiB3aGVuIHNwRGlzYWJsZWQgaXMgZmFsc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWx0ID0gY3JlYXRlRWxlbWVudChyZXF1ZXN0ZWRJdGVtLCBmYWxzZSk7XHJcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbHQpLmZpbmQoJ2J1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJykpLnRvQmVVbmRlZmluZWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkb2VzIG5vdCBkaXNhYmxlIGJ1dHRvbiB3aGVuIHNwRGlzYWJsZWQgaXMgbm90IHNldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uLnJlcGxhY2UoJ3NwLWRpc2FibGVkPVwiZmFsc2VcIicsICcnKSk7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5maW5kKCdidXR0b24nKS5hdHRyKCdkaXNhYmxlZCcpKS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja01lc3NhZ2UoZWx0LCBtc2cpIHtcclxuICAgICAgICB2YXIgZm91bmQgPSBlbHQuZmluZCgnYi5zci1vbmx5Jyk7XHJcbiAgICAgICAgZXhwZWN0KGZvdW5kLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICBleHBlY3QoZm91bmQudGV4dCgpKS50b0VxdWFsKG1zZyk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
