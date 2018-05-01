System.register(['certification/CertificationModule', 'test/js/TestInitializer', 'test/js/common/i18n/MockTranslateFilter', 'test/js/TestModule'], function (_export) {
    'use strict';

    var certificationModule, testModule;
    return {
        setters: [function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestInitializer) {}, function (_testJsCommonI18nMockTranslateFilter) {}, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('CertificationSaveButtonDirective', function () {

                var elementDefinition = '<sp-certification-save-button sp-enabled="enabled"\n                                     sp-decision-count="decisionCount"\n                                     sp-refresh-trigger="refreshTrigger"\n                                     sp-save-func="saveFunc()" />';

                var $scope = undefined,
                    $compile = undefined,
                    $document = undefined,
                    certificationDataService = undefined,
                    spTranslateFilter = undefined,
                    enabled = undefined,
                    decisionCount = undefined,
                    saveFunc = undefined,
                    processRevokesImmediately = undefined,
                    hasBulkDecisions = undefined,
                    refreshTrigger = undefined;

                beforeEach(module(certificationModule, testModule));

                beforeEach(inject(function ($rootScope, _$compile_, _$document_, _certificationDataService_, _spTranslateFilter_, testService) {
                    // Save dependencies.
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                    $document = _$document_;
                    certificationDataService = _certificationDataService_;
                    spTranslateFilter = _spTranslateFilter_;

                    // Initialize values.
                    enabled = true;
                    decisionCount = 5;
                    saveFunc = testService.createPromiseSpy(false, {}, {});
                    processRevokesImmediately = true;
                    hasBulkDecisions = true;

                    refreshTrigger = {
                        refresh: jasmine.createSpy('refresh')
                    };

                    spyOn(certificationDataService, 'getConfiguration').and.callFake(function () {
                        return {
                            processRevokesImmediately: processRevokesImmediately
                        };
                    });

                    spyOn(certificationDataService.decisions, 'hasBulkDecisions').and.callFake(function () {
                        return hasBulkDecisions;
                    });

                    // Setup the mock message catalog.
                    spTranslateFilter.configureCatalog({
                        'ui_save_decisions': 'Save Decisions',
                        'ui_save_x_decisions': 'Save {0} Decisions'
                    });
                }));

                function createElement() {
                    var element = angular.element(elementDefinition);
                    $scope.enabled = enabled;
                    $scope.decisionCount = decisionCount;
                    $scope.saveFunc = saveFunc;
                    $scope.refreshTrigger = refreshTrigger;
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                function getSaveButton(element) {
                    var saveBtn = element.find('#certSaveBtn');
                    expect(saveBtn.length).toEqual(1);
                    return angular.element(saveBtn[0]);
                }

                describe('enabled', function () {
                    it('renders a disabled button when false', function () {
                        enabled = false;
                        var btn = createElement();
                        expect(getSaveButton(btn).attr('disabled')).toEqual('disabled');
                    });

                    it('renders an enabled button when true', function () {
                        var btn = createElement();
                        expect(getSaveButton(btn).attr('disabled')).toBeUndefined();
                    });
                });

                describe('decision count', function () {
                    it('is displayed when the button is enabled', function () {
                        var btn = getSaveButton(createElement());
                        expect(btn.text().trim()).toEqual('Save 5 Decisions');
                    });

                    it('is not displayed when the button is disabled', function () {
                        enabled = false;
                        var btn = getSaveButton(createElement());
                        expect(btn.text().trim()).toEqual('Save Decisions');
                    });
                });

                function getConfirmation(element) {
                    var popover = element.find('.popover');
                    expect(popover.length).toEqual(1);
                    return angular.element(popover[0]);
                }

                function isConfirmationDisplayed(confirmation) {
                    expect(confirmation.hasClass('fade')).toEqual(true);
                    return confirmation.hasClass('in');
                }

                describe('save button', function () {
                    function testSaveButton(revokeImmediately, hasBulk, expectConfirmation) {
                        // Setup the mocks.
                        processRevokesImmediately = revokeImmediately;
                        hasBulkDecisions = hasBulk;

                        // Create the element and click the save button.
                        var el = createElement();
                        var btn = getSaveButton(el);
                        btn.click();

                        // Save function should be called immediately if there is no confirmation.
                        if (!expectConfirmation) {
                            expect(saveFunc).toHaveBeenCalled();
                        } else {
                            // If there is a confirmation, the save function should not be called.
                            expect(saveFunc).not.toHaveBeenCalled();

                            // Verify that the confirmation is shown.
                            var _confirm = getConfirmation(el);
                            expect(_confirm).toBeDefined();
                            expect(isConfirmationDisplayed(_confirm)).toEqual(true);
                        }
                    }

                    it('calls the saveFunc when not processing revokes immediately', function () {
                        testSaveButton(false, true, false);
                    });

                    it('calls the saveFunc when there are no bulk decisions', function () {
                        testSaveButton(true, false, false);
                    });

                    it('shows the confirmation popup when processing revokes immediately and there are bulk decisions', function () {
                        testSaveButton(true, true, true);
                    });

                    it('calls the refreshTrigger', function () {
                        testSaveButton(false, false, false);
                        expect(refreshTrigger.refresh).toHaveBeenCalled();
                    });
                });

                describe('confirmation', function () {
                    var el = undefined,
                        confirmation = undefined;

                    // Start each test with a displayed confirmation.
                    beforeEach(function () {
                        el = createElement();
                        getSaveButton(el).click();
                        confirmation = getConfirmation(el);
                        expect(isConfirmationDisplayed(confirmation)).toEqual(true);
                    });

                    it('is hidden when clicking save button again', function () {
                        getSaveButton(el).click();
                        expect(isConfirmationDisplayed(confirmation)).toEqual(false);
                    });

                    it('is hidden when clicking on the document', function () {
                        angular.element($document[0].body).trigger('click');
                        $scope.$digest();
                        expect(isConfirmationDisplayed(confirmation)).toEqual(false);
                    });

                    it('is hidden when clicking the cancel button', function () {
                        var cancel = el.find('.btn-white');
                        cancel.click();
                        expect(isConfirmationDisplayed(confirmation)).toEqual(false);
                    });

                    it('hides the confirmation and saves when clicking the save button', function () {
                        var save = el.find('.btn-info');
                        save.click();
                        expect(isConfirmationDisplayed(confirmation)).toEqual(false);
                        expect(saveFunc).toHaveBeenCalled();
                    });

                    function getDecisionText(row) {
                        var span = angular.element(row).find('span');
                        expect(span.length).toEqual(1);
                        return span.text().trim();
                    }

                    function getDecisionCount(row) {
                        var span = angular.element(row).find('b');
                        expect(span.length).toEqual(1);
                        return span.text().trim();
                    }

                    it('displays each status and count, sorted alphabetically', function () {
                        // Return some decision counts.
                        var decisionCounts = new Map();
                        decisionCounts.set('aLabel', 7);
                        decisionCounts.set('anotherLabel', 17);
                        spyOn(certificationDataService.decisions, 'getCountsByDecision').and.callFake(function () {
                            return decisionCounts;
                        });

                        // Configure message keys that will flip the order of the array.
                        spTranslateFilter.configureCatalog({
                            'cert_action_a_label': 'XXX',
                            'cert_action_another_label': 'AAA',
                            'cert_action_yet_another_label': 'BBB'
                        });

                        // Digest to get the new decisions applied.
                        $scope.$digest();
                        expect(certificationDataService.decisions.getCountsByDecision).toHaveBeenCalled();

                        // Get the rows.
                        var rows = el.find('p');

                        // Check em out.
                        expect(rows.length).toEqual(2);
                        expect(getDecisionText(rows[0])).toEqual('AAA');
                        expect(getDecisionCount(rows[0])).toEqual('17');
                        expect(getDecisionText(rows[1])).toEqual('XXX');
                        expect(getDecisionCount(rows[1])).toEqual('7');

                        // Change the counts by decision and make sure that the rows get updated.
                        decisionCounts.set('yetAnotherLabel', 78);
                        $scope.$digest();

                        rows = el.find('p');
                        expect(rows.length).toEqual(3);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvblNhdmVCdXR0b25EaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQyxxQ0FBcUMsMkJBQTJCLDJDQUEyQyx1QkFBdUIsVUFBVSxTQUFTO0lBQ2xLOztJQUVBLElBQUkscUJBQXFCO0lBQ3pCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSxtQ0FBbUM7WUFDbkQsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QixJQUFJLFVBQVUsc0NBQXNDLElBQUksVUFBVSxtQkFBbUI7WUFDdEgsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxvQ0FBb0MsWUFBTTs7Z0JBRS9DLElBQUksb0JBQWlCOztnQkFNckIsSUFBSSxTQUFNO29CQUFFLFdBQVE7b0JBQUUsWUFBUztvQkFBRSwyQkFBd0I7b0JBQUUsb0JBQWlCO29CQUFFLFVBQU87b0JBQUUsZ0JBQWE7b0JBQUUsV0FBUTtvQkFDMUcsNEJBQXlCO29CQUFFLG1CQUFnQjtvQkFBRSxpQkFBYzs7Z0JBRS9ELFdBQVcsT0FBTyxxQkFBcUI7O2dCQUV2QyxXQUFXLE9BQU8sVUFBQyxZQUFZLFlBQVksYUFBYSw0QkFBNEIscUJBQ2pFLGFBQWdCOztvQkFFL0IsU0FBUyxXQUFXO29CQUNwQixXQUFXO29CQUNYLFlBQVk7b0JBQ1osMkJBQTJCO29CQUMzQixvQkFBb0I7OztvQkFHcEIsVUFBVTtvQkFDVixnQkFBZ0I7b0JBQ2hCLFdBQVcsWUFBWSxpQkFBaUIsT0FBTyxJQUFJO29CQUNuRCw0QkFBNEI7b0JBQzVCLG1CQUFtQjs7b0JBRW5CLGlCQUFpQjt3QkFDYixTQUFTLFFBQVEsVUFBVTs7O29CQUcvQixNQUFNLDBCQUEwQixvQkFBb0IsSUFBSSxTQUFTLFlBQU07d0JBQ25FLE9BQU87NEJBQ0gsMkJBQTJCOzs7O29CQUluQyxNQUFNLHlCQUF5QixXQUFXLG9CQUFvQixJQUFJLFNB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QVE7Ozs7OztHQW1CckMiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uU2F2ZUJ1dHRvbkRpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcclxuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uU2F2ZUJ1dHRvbkRpcmVjdGl2ZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPVxyXG4gICAgICBgPHNwLWNlcnRpZmljYXRpb24tc2F2ZS1idXR0b24gc3AtZW5hYmxlZD1cImVuYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AtZGVjaXNpb24tY291bnQ9XCJkZWNpc2lvbkNvdW50XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwLXJlZnJlc2gtdHJpZ2dlcj1cInJlZnJlc2hUcmlnZ2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwLXNhdmUtZnVuYz1cInNhdmVGdW5jKClcIiAvPmA7XHJcblxyXG4gICAgbGV0ICRzY29wZSwgJGNvbXBpbGUsICRkb2N1bWVudCwgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCBzcFRyYW5zbGF0ZUZpbHRlciwgZW5hYmxlZCwgZGVjaXNpb25Db3VudCwgc2F2ZUZ1bmMsXHJcbiAgICAgICAgcHJvY2Vzc1Jldm9rZXNJbW1lZGlhdGVseSwgaGFzQnVsa0RlY2lzaW9ucywgcmVmcmVzaFRyaWdnZXI7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSwgdGVzdE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KCgkcm9vdFNjb3BlLCBfJGNvbXBpbGVfLCBfJGRvY3VtZW50XywgX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV8sIF9zcFRyYW5zbGF0ZUZpbHRlcl8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UpID0+IHtcclxuICAgICAgICAvLyBTYXZlIGRlcGVuZGVuY2llcy5cclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJGRvY3VtZW50ID0gXyRkb2N1bWVudF87XHJcbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV87XHJcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIgPSBfc3BUcmFuc2xhdGVGaWx0ZXJfO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHZhbHVlcy5cclxuICAgICAgICBlbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBkZWNpc2lvbkNvdW50ID0gNTtcclxuICAgICAgICBzYXZlRnVuYyA9IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHt9LCB7fSk7XHJcbiAgICAgICAgcHJvY2Vzc1Jldm9rZXNJbW1lZGlhdGVseSA9IHRydWU7XHJcbiAgICAgICAgaGFzQnVsa0RlY2lzaW9ucyA9IHRydWU7XHJcblxyXG4gICAgICAgIHJlZnJlc2hUcmlnZ2VyID0ge1xyXG4gICAgICAgICAgICByZWZyZXNoOiBqYXNtaW5lLmNyZWF0ZVNweSgncmVmcmVzaCcpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q29uZmlndXJhdGlvbicpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzUmV2b2tlc0ltbWVkaWF0ZWx5OiBwcm9jZXNzUmV2b2tlc0ltbWVkaWF0ZWx5XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdoYXNCdWxrRGVjaXNpb25zJykuYW5kLmNhbGxGYWtlKCgpID0+IGhhc0J1bGtEZWNpc2lvbnMpO1xyXG5cclxuICAgICAgICAvLyBTZXR1cCB0aGUgbW9jayBtZXNzYWdlIGNhdGFsb2cuXHJcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XHJcbiAgICAgICAgICAgICd1aV9zYXZlX2RlY2lzaW9ucyc6ICdTYXZlIERlY2lzaW9ucycsXHJcbiAgICAgICAgICAgICd1aV9zYXZlX3hfZGVjaXNpb25zJzogJ1NhdmUgezB9IERlY2lzaW9ucydcclxuICAgICAgICB9KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcclxuICAgICAgICAkc2NvcGUuZW5hYmxlZCA9IGVuYWJsZWQ7XHJcbiAgICAgICAgJHNjb3BlLmRlY2lzaW9uQ291bnQgPSBkZWNpc2lvbkNvdW50O1xyXG4gICAgICAgICRzY29wZS5zYXZlRnVuYyA9IHNhdmVGdW5jO1xyXG4gICAgICAgICRzY29wZS5yZWZyZXNoVHJpZ2dlciA9IHJlZnJlc2hUcmlnZ2VyO1xyXG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XHJcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNhdmVCdXR0b24oZWxlbWVudCkge1xyXG4gICAgICAgIGxldCBzYXZlQnRuID0gZWxlbWVudC5maW5kKCcjY2VydFNhdmVCdG4nKTtcclxuICAgICAgICBleHBlY3Qoc2F2ZUJ0bi5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudChzYXZlQnRuWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnZW5hYmxlZCcsICgpID0+IHtcclxuICAgICAgICBpdCgncmVuZGVycyBhIGRpc2FibGVkIGJ1dHRvbiB3aGVuIGZhbHNlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBlbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBidG4gPSBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChnZXRTYXZlQnV0dG9uKGJ0bikuYXR0cignZGlzYWJsZWQnKSkudG9FcXVhbCgnZGlzYWJsZWQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlbmRlcnMgYW4gZW5hYmxlZCBidXR0b24gd2hlbiB0cnVlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYnRuID0gY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZ2V0U2F2ZUJ1dHRvbihidG4pLmF0dHIoJ2Rpc2FibGVkJykpLnRvQmVVbmRlZmluZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdkZWNpc2lvbiBjb3VudCcsICgpID0+IHtcclxuICAgICAgICBpdCgnaXMgZGlzcGxheWVkIHdoZW4gdGhlIGJ1dHRvbiBpcyBlbmFibGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYnRuID0gZ2V0U2F2ZUJ1dHRvbihjcmVhdGVFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBleHBlY3QoYnRuLnRleHQoKS50cmltKCkpLnRvRXF1YWwoJ1NhdmUgNSBEZWNpc2lvbnMnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIG5vdCBkaXNwbGF5ZWQgd2hlbiB0aGUgYnV0dG9uIGlzIGRpc2FibGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBlbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBidG4gPSBnZXRTYXZlQnV0dG9uKGNyZWF0ZUVsZW1lbnQoKSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChidG4udGV4dCgpLnRyaW0oKSkudG9FcXVhbCgnU2F2ZSBEZWNpc2lvbnMnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldENvbmZpcm1hdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IHBvcG92ZXIgPSBlbGVtZW50LmZpbmQoJy5wb3BvdmVyJyk7XHJcbiAgICAgICAgZXhwZWN0KHBvcG92ZXIubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIHJldHVybiBhbmd1bGFyLmVsZW1lbnQocG9wb3ZlclswXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNDb25maXJtYXRpb25EaXNwbGF5ZWQoY29uZmlybWF0aW9uKSB7XHJcbiAgICAgICAgZXhwZWN0KGNvbmZpcm1hdGlvbi5oYXNDbGFzcygnZmFkZScpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIHJldHVybiBjb25maXJtYXRpb24uaGFzQ2xhc3MoJ2luJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ3NhdmUgYnV0dG9uJywgKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RTYXZlQnV0dG9uKHJldm9rZUltbWVkaWF0ZWx5LCBoYXNCdWxrLCBleHBlY3RDb25maXJtYXRpb24pIHtcclxuICAgICAgICAgICAgLy8gU2V0dXAgdGhlIG1vY2tzLlxyXG4gICAgICAgICAgICBwcm9jZXNzUmV2b2tlc0ltbWVkaWF0ZWx5ID0gcmV2b2tlSW1tZWRpYXRlbHk7XHJcbiAgICAgICAgICAgIGhhc0J1bGtEZWNpc2lvbnMgPSBoYXNCdWxrO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBlbGVtZW50IGFuZCBjbGljayB0aGUgc2F2ZSBidXR0b24uXHJcbiAgICAgICAgICAgIGxldCBlbCA9IGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgbGV0IGJ0biA9IGdldFNhdmVCdXR0b24oZWwpO1xyXG4gICAgICAgICAgICBidG4uY2xpY2soKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNhdmUgZnVuY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBpbW1lZGlhdGVseSBpZiB0aGVyZSBpcyBubyBjb25maXJtYXRpb24uXHJcbiAgICAgICAgICAgIGlmICghZXhwZWN0Q29uZmlybWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2F2ZUZ1bmMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgY29uZmlybWF0aW9uLCB0aGUgc2F2ZSBmdW5jdGlvbiBzaG91bGQgbm90IGJlIGNhbGxlZC5cclxuICAgICAgICAgICAgICAgIGV4cGVjdChzYXZlRnVuYykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBWZXJpZnkgdGhhdCB0aGUgY29uZmlybWF0aW9uIGlzIHNob3duLlxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpcm0gPSBnZXRDb25maXJtYXRpb24oZWwpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNvbmZpcm0pLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoaXNDb25maXJtYXRpb25EaXNwbGF5ZWQoY29uZmlybSkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyB0aGUgc2F2ZUZ1bmMgd2hlbiBub3QgcHJvY2Vzc2luZyByZXZva2VzIGltbWVkaWF0ZWx5JywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0U2F2ZUJ1dHRvbihmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgdGhlIHNhdmVGdW5jIHdoZW4gdGhlcmUgYXJlIG5vIGJ1bGsgZGVjaXNpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0U2F2ZUJ1dHRvbih0cnVlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgdGhlIGNvbmZpcm1hdGlvbiBwb3B1cCB3aGVuIHByb2Nlc3NpbmcgcmV2b2tlcyBpbW1lZGlhdGVseSBhbmQgdGhlcmUgYXJlIGJ1bGsgZGVjaXNpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0U2F2ZUJ1dHRvbih0cnVlLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHRoZSByZWZyZXNoVHJpZ2dlcicsICgpID0+IHtcclxuICAgICAgICAgICB0ZXN0U2F2ZUJ1dHRvbihmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlZnJlc2hUcmlnZ2VyLnJlZnJlc2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb25maXJtYXRpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGVsLCBjb25maXJtYXRpb247XHJcblxyXG4gICAgICAgIC8vIFN0YXJ0IGVhY2ggdGVzdCB3aXRoIGEgZGlzcGxheWVkIGNvbmZpcm1hdGlvbi5cclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgZWwgPSBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGdldFNhdmVCdXR0b24oZWwpLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGNvbmZpcm1hdGlvbiA9IGdldENvbmZpcm1hdGlvbihlbCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpc0NvbmZpcm1hdGlvbkRpc3BsYXllZChjb25maXJtYXRpb24pKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgaGlkZGVuIHdoZW4gY2xpY2tpbmcgc2F2ZSBidXR0b24gYWdhaW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGdldFNhdmVCdXR0b24oZWwpLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpc0NvbmZpcm1hdGlvbkRpc3BsYXllZChjb25maXJtYXRpb24pKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIGhpZGRlbiB3aGVuIGNsaWNraW5nIG9uIHRoZSBkb2N1bWVudCcsICgpID0+IHtcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRkb2N1bWVudFswXS5ib2R5KS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoaXNDb25maXJtYXRpb25EaXNwbGF5ZWQoY29uZmlybWF0aW9uKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBoaWRkZW4gd2hlbiBjbGlja2luZyB0aGUgY2FuY2VsIGJ1dHRvbicsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNhbmNlbCA9IGVsLmZpbmQoJy5idG4td2hpdGUnKTtcclxuICAgICAgICAgICAgY2FuY2VsLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpc0NvbmZpcm1hdGlvbkRpc3BsYXllZChjb25maXJtYXRpb24pKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2hpZGVzIHRoZSBjb25maXJtYXRpb24gYW5kIHNhdmVzIHdoZW4gY2xpY2tpbmcgdGhlIHNhdmUgYnV0dG9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2F2ZSA9IGVsLmZpbmQoJy5idG4taW5mbycpO1xyXG4gICAgICAgICAgICBzYXZlLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpc0NvbmZpcm1hdGlvbkRpc3BsYXllZChjb25maXJtYXRpb24pKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNhdmVGdW5jKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERlY2lzaW9uVGV4dChyb3cpIHtcclxuICAgICAgICAgICAgbGV0IHNwYW4gPSBhbmd1bGFyLmVsZW1lbnQocm93KS5maW5kKCdzcGFuJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcGFuLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNwYW4udGV4dCgpLnRyaW0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERlY2lzaW9uQ291bnQocm93KSB7XHJcbiAgICAgICAgICAgIGxldCBzcGFuID0gYW5ndWxhci5lbGVtZW50KHJvdykuZmluZCgnYicpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3Bhbi5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGFuLnRleHQoKS50cmltKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgnZGlzcGxheXMgZWFjaCBzdGF0dXMgYW5kIGNvdW50LCBzb3J0ZWQgYWxwaGFiZXRpY2FsbHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFJldHVybiBzb21lIGRlY2lzaW9uIGNvdW50cy5cclxuICAgICAgICAgICAgbGV0IGRlY2lzaW9uQ291bnRzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBkZWNpc2lvbkNvdW50cy5zZXQoJ2FMYWJlbCcsIDcpO1xyXG4gICAgICAgICAgICBkZWNpc2lvbkNvdW50cy5zZXQoJ2Fub3RoZXJMYWJlbCcsIDE3KTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucywgJ2dldENvdW50c0J5RGVjaXNpb24nKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlY2lzaW9uQ291bnRzO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIENvbmZpZ3VyZSBtZXNzYWdlIGtleXMgdGhhdCB3aWxsIGZsaXAgdGhlIG9yZGVyIG9mIHRoZSBhcnJheS5cclxuICAgICAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XHJcbiAgICAgICAgICAgICAgICAnY2VydF9hY3Rpb25fYV9sYWJlbCc6ICdYWFgnLFxyXG4gICAgICAgICAgICAgICAgJ2NlcnRfYWN0aW9uX2Fub3RoZXJfbGFiZWwnOiAnQUFBJyxcclxuICAgICAgICAgICAgICAgICdjZXJ0X2FjdGlvbl95ZXRfYW5vdGhlcl9sYWJlbCc6ICdCQkInXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRGlnZXN0IHRvIGdldCB0aGUgbmV3IGRlY2lzaW9ucyBhcHBsaWVkLlxyXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucy5nZXRDb3VudHNCeURlY2lzaW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHJvd3MuXHJcbiAgICAgICAgICAgIGxldCByb3dzID0gZWwuZmluZCgncCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgZW0gb3V0LlxyXG4gICAgICAgICAgICBleHBlY3Qocm93cy5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgICAgIGV4cGVjdChnZXREZWNpc2lvblRleHQocm93c1swXSkpLnRvRXF1YWwoJ0FBQScpO1xyXG4gICAgICAgICAgICBleHBlY3QoZ2V0RGVjaXNpb25Db3VudChyb3dzWzBdKSkudG9FcXVhbCgnMTcnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGdldERlY2lzaW9uVGV4dChyb3dzWzFdKSkudG9FcXVhbCgnWFhYJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChnZXREZWNpc2lvbkNvdW50KHJvd3NbMV0pKS50b0VxdWFsKCc3Jyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2UgdGhlIGNvdW50cyBieSBkZWNpc2lvbiBhbmQgbWFrZSBzdXJlIHRoYXQgdGhlIHJvd3MgZ2V0IHVwZGF0ZWQuXHJcbiAgICAgICAgICAgIGRlY2lzaW9uQ291bnRzLnNldCgneWV0QW5vdGhlckxhYmVsJywgNzgpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICAgICAgcm93cyA9IGVsLmZpbmQoJ3AnKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJvd3MubGVuZ3RoKS50b0VxdWFsKDMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
