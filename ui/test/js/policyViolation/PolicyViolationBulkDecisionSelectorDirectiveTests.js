System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('PolicyViolationBulkDecisionSelectorDirective', function () {

                var checkboxMultiSelect = undefined,
                    $scope = undefined,
                    $compile = undefined,
                    $q = undefined,
                    filterValues = undefined,
                    decisionScope = undefined,
                    element = undefined,
                    elementDefinition = '<sp-policy-violation-bulk-decision-selector\n                        sp-checkbox-multi-select="checkboxMultiSelect"\n                        sp-bulk-decisions="availableBulkDecisions"\n                        sp-filter-values="filterValues"\n                        sp-decision-scope="decisionScope">\n                </sp-policy-violation-bulk-decision-selector>';

                beforeEach(module(policyViolationModule));

                /* jshint maxparams: 9 */
                beforeEach(inject(function ($controller, PolicyViolation, CheckboxMultiSelect, spTranslateFilter, $rootScope, _$compile_, _$q_) {
                    $scope = $rootScope;
                    $compile = _$compile_;
                    $q = _$q_;
                    checkboxMultiSelect = new CheckboxMultiSelect();
                    spyOn(checkboxMultiSelect, 'getSelectionCount').and.returnValue(1);

                    filterValues = {
                        status: 'Open'
                    };
                    decisionScope = {
                        statuses: ['Open', 'Mitigated']
                    };
                    spTranslateFilter.configureCatalog({
                        'Mitigated_prompt_key': 'Allow',
                        'Delegated_prompt_key': 'Delegate',
                        'Certified_prompt_key': 'Certify'
                    });
                }));

                function makeDecisionStatuses(availableBulkDecisions) {
                    return availableBulkDecisions.map(function (status) {
                        return { status: status, promptKey: status + '_prompt_key' };
                    });
                }

                function createElement(availableBulkDecisions) {
                    $scope.availableBulkDecisions = availableBulkDecisions || makeDecisionStatuses(['Mitigated', 'Delegated', 'Certified']);
                    $scope.checkboxMultiSelect = checkboxMultiSelect;
                    $scope.filterValues = filterValues;
                    $scope.decisionScope = decisionScope;
                    element = $compile(angular.element(elementDefinition))($scope);
                    $scope.$apply();
                }

                describe('enable/disable', function () {
                    function testEnabled(expectEnabled) {
                        var toggleButton = element.find('button'),
                            disabled = angular.element(toggleButton).attr('disabled');
                        if (expectEnabled) {
                            expect(disabled).not.toEqual('disabled');
                        } else {
                            expect(disabled).toEqual('disabled');
                        }
                    }

                    it('isEnabled false when there are no selected items', function () {
                        createElement();
                        testEnabled(false);
                    });

                    it('isEnabled true when there are selected items', function () {
                        createElement();
                        checkboxMultiSelect.selectItem({ id: '1234' });
                        $scope.$apply();
                        testEnabled(true);
                    });

                    it('isEnabled true when select all', function () {
                        createElement();
                        checkboxMultiSelect.selectAll();
                        $scope.$apply();
                        testEnabled(true);
                    });
                });

                describe('available decisions', function () {
                    function testAvailableDecisions(availableBulkDecisions, unavailableBulkDecisions) {
                        function getLabelForStatus(status) {
                            if (status === 'Mitigated') {
                                return 'Allow';
                            } else if (status === 'Delegated') {
                                return 'Delegate';
                            } else if (status === 'Certified') {
                                return 'Certify';
                            }
                        }

                        createElement(makeDecisionStatuses(availableBulkDecisions));
                        availableBulkDecisions.forEach(function (decision) {
                            var label = getLabelForStatus(decision);
                            expect(element.find('a:contains(\'' + label + '\')').length).toEqual(1);
                        });
                        unavailableBulkDecisions.forEach(function (decision) {
                            expect(element.find('a:contains(\'' + getLabelForStatus(decision) + '\')').length).toEqual(0);
                        });
                    }

                    it('shows Allow, Delegate, Certify if all are available', function () {
                        testAvailableDecisions(['Mitigated', 'Delegated', 'Certified'], []);
                    });

                    it('hides Delegate if not available', function () {
                        testAvailableDecisions(['Mitigated', 'Certified'], ['Delegated']);
                    });

                    it('hides Certify if not available', function () {
                        testAvailableDecisions(['Mitigated', 'Delegated'], ['Certified']);
                    });

                    it('hides Allow if not available', function () {
                        testAvailableDecisions(['Delegated', 'Certified'], ['Mitigated']);
                    });

                    it('shows single available decision as button without menu', function () {
                        createElement(makeDecisionStatuses(['Mitigated']));
                        expect(element.find('button.dropdown-toggle').length).toEqual(0);
                        expect(element.find('button:contains(\'Allow\')').length).toEqual(1);
                    });
                });

                describe('bulkDecide', function () {
                    var decision = undefined,
                        policyViolationService = undefined,
                        policyViolationDataService = undefined,
                        policyViolationBulkDecisionService = undefined,
                        navigationService = undefined;

                    beforeEach(inject(function (_policyViolationBulkDecisionService_, _policyViolationDataService_, _policyViolationService_, _navigationService_) {
                        policyViolationBulkDecisionService = _policyViolationBulkDecisionService_;
                        policyViolationDataService = _policyViolationDataService_;
                        policyViolationService = _policyViolationService_;
                        navigationService = _navigationService_;
                    }));

                    function makeDecision(status) {
                        decision = {
                            status: status
                        };
                        spyOn(policyViolationBulkDecisionService, 'bulkDecide').and.returnValue($q.when(decision));
                        spyOn(policyViolationDataService.decisions, 'addBulkDecision');
                        createElement(makeDecisionStatuses([status]));
                        element.find('button').click();
                        $scope.$apply();
                    }

                    it('calls through to bulk decision service to get the decision', function () {
                        makeDecision('Mitigated');
                        expect(policyViolationBulkDecisionService.bulkDecide).toHaveBeenCalledWith('Mitigated', checkboxMultiSelect.getSelectionModel(), filterValues, checkboxMultiSelect.getSelectionCount(), decisionScope);
                    });

                    it('adds the decision to the store for non-certify decisions', function () {
                        makeDecision('Mitigated');
                        expect(policyViolationDataService.decisions.addBulkDecision).toHaveBeenCalledWith(decision);
                    });

                    describe('certify', function () {
                        it('calls the certify method on policy violation service', function () {
                            var deferred = $q.defer(),
                                showAll = true;
                            spyOn(policyViolationService, 'certify').and.returnValue(deferred.promise);
                            spyOn(policyViolationDataService, 'isShowAll').and.returnValue(showAll);
                            makeDecision('Certified');
                            deferred.reject();
                            $scope.$apply();
                            expect(policyViolationService.certify).toHaveBeenCalledWith(decision, showAll);
                            expect(policyViolationDataService.decisions.addBulkDecision).not.toHaveBeenCalled();
                        });

                        it('navigates to certification schedule page', function () {
                            spyOn(policyViolationService, 'certify').and.returnValue($q.when());
                            spyOn(navigationService, 'go');
                            makeDecision('Certified');
                            expect(navigationService.go).toHaveBeenCalled();
                            var args = navigationService.go.calls.mostRecent().args;
                            expect(args[0].outcome).toEqual('scheduleBulkCertification');
                        });

                        it('navigates back to list all policy violations when showAll is true', function () {
                            spyOn(policyViolationDataService, 'isShowAll').and.returnValue(true);
                            spyOn(navigationService, 'go');
                            spyOn(policyViolationService, 'certify').and.returnValue($q.when());
                            makeDecision('Certified');
                            var args = navigationService.go.calls.mostRecent().args;
                            expect(args[0].navigationHistory).toEqual('listViolations#/policyViolations?showAll=true');
                        });

                        it('navigates back to list assigned policy violations when showAll is false', function () {
                            spyOn(policyViolationDataService, 'isShowAll').and.returnValue(false);
                            spyOn(navigationService, 'go');
                            spyOn(policyViolationService, 'certify').and.returnValue($q.when());
                            makeDecision('Certified');
                            var args = navigationService.go.calls.mostRecent().args;
                            expect(args[0].navigationHistory).toEqual('listViolations#/policyViolations');
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25CdWxrRGVjaXNpb25TZWxlY3RvckRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5Q0FBeUMsNENBQTRDLFVBQVUsU0FBUzs7Ozs7SUFLaEo7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDO1dBQy9ELFVBQVUsc0NBQXNDO1FBQ25ELFNBQVMsWUFBWTs7WUFKN0IsU0FBUyxnREFBZ0QsWUFBVzs7Z0JBRWhFLElBQUksc0JBQW1CO29CQUFFLFNBQU07b0JBQUUsV0FBUTtvQkFBRSxLQUFFO29CQUFFLGVBQVk7b0JBQUUsZ0JBQWE7b0JBQUUsVUFBTztvQkFDL0Usb0JBQWlCOztnQkFRckIsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFDLGFBQWEsaUJBQWlCLHFCQUFxQixtQkFDbkQsWUFBWSxZQUFZLE1BQVM7b0JBQ2hELFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxLQUFLO29CQUNMLHNCQUFzQixJQUFJO29CQUMxQixNQUFNLHFCQUFxQixxQkFBcUIsSUFBSSxZQUFZOztvQkFFaEUsZUFBZTt3QkFDWCxRQUFROztvQkFFWixnQkFBZ0I7d0JBQ1osVUFBVSxDQUFDLFFBQVE7O29CQUV2QixrQkFBa0IsaUJBQWlCO3dCQUMvQix3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIsd0JBQXdCOzs7O2dCQUloQyxTQUFTLHFCQUFxQix3QkFBd0I7b0JBQ2xELE9BQU8sdUJBQXVCLElBQUksVUFBQyxRQUFXO3dCQUMxQyxPQUFPLEVBQUUsUUFBUSxRQUFRLFdBQVcsU0FBUzs7OztnQkFJckQsU0FBUyxjQUFjLHdCQUF3QjtvQkFDM0MsT0FBTyx5QkFBeUIsMEJBQzVCLHFCQUFxQixDQUFDLGFBQWEsYUFBYTtvQkFDcEQs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b25TZWxlY3RvckRpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwb2xpY3lWaW9sYXRpb25Nb2R1bGUgZnJvbSAncG9saWN5VmlvbGF0aW9uL1BvbGljeVZpb2xhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2kxOG4vTW9ja1RyYW5zbGF0ZUZpbHRlcic7XG5cbmRlc2NyaWJlKCdQb2xpY3lWaW9sYXRpb25CdWxrRGVjaXNpb25TZWxlY3RvckRpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IGNoZWNrYm94TXVsdGlTZWxlY3QsICRzY29wZSwgJGNvbXBpbGUsICRxLCBmaWx0ZXJWYWx1ZXMsIGRlY2lzaW9uU2NvcGUsIGVsZW1lbnQsXG4gICAgICAgIGVsZW1lbnREZWZpbml0aW9uID1cbiAgICAgICAgICAgIGA8c3AtcG9saWN5LXZpb2xhdGlvbi1idWxrLWRlY2lzaW9uLXNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBzcC1jaGVja2JveC1tdWx0aS1zZWxlY3Q9XCJjaGVja2JveE11bHRpU2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwLWJ1bGstZGVjaXNpb25zPVwiYXZhaWxhYmxlQnVsa0RlY2lzaW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcC1maWx0ZXItdmFsdWVzPVwiZmlsdGVyVmFsdWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwLWRlY2lzaW9uLXNjb3BlPVwiZGVjaXNpb25TY29wZVwiPlxuICAgICAgICAgICAgICAgIDwvc3AtcG9saWN5LXZpb2xhdGlvbi1idWxrLWRlY2lzaW9uLXNlbGVjdG9yPmA7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwb2xpY3lWaW9sYXRpb25Nb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDkgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoJGNvbnRyb2xsZXIsIFBvbGljeVZpb2xhdGlvbiwgQ2hlY2tib3hNdWx0aVNlbGVjdCwgc3BUcmFuc2xhdGVGaWx0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUsIF8kY29tcGlsZV8sIF8kcV8pID0+IHtcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QgPSBuZXcgQ2hlY2tib3hNdWx0aVNlbGVjdCgpO1xuICAgICAgICBzcHlPbihjaGVja2JveE11bHRpU2VsZWN0LCAnZ2V0U2VsZWN0aW9uQ291bnQnKS5hbmQucmV0dXJuVmFsdWUoMSk7XG5cbiAgICAgICAgZmlsdGVyVmFsdWVzID0ge1xuICAgICAgICAgICAgc3RhdHVzOiAnT3BlbidcbiAgICAgICAgfTtcbiAgICAgICAgZGVjaXNpb25TY29wZSA9IHtcbiAgICAgICAgICAgIHN0YXR1c2VzOiBbJ09wZW4nLCAnTWl0aWdhdGVkJ11cbiAgICAgICAgfTtcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XG4gICAgICAgICAgICAnTWl0aWdhdGVkX3Byb21wdF9rZXknOiAnQWxsb3cnLFxuICAgICAgICAgICAgJ0RlbGVnYXRlZF9wcm9tcHRfa2V5JzogJ0RlbGVnYXRlJyxcbiAgICAgICAgICAgICdDZXJ0aWZpZWRfcHJvbXB0X2tleSc6ICdDZXJ0aWZ5J1xuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBtYWtlRGVjaXNpb25TdGF0dXNlcyhhdmFpbGFibGVCdWxrRGVjaXNpb25zKSB7XG4gICAgICAgIHJldHVybiBhdmFpbGFibGVCdWxrRGVjaXNpb25zLm1hcCgoc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBzdGF0dXM6IHN0YXR1cywgcHJvbXB0S2V5OiBzdGF0dXMgKyAnX3Byb21wdF9rZXknIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoYXZhaWxhYmxlQnVsa0RlY2lzaW9ucykge1xuICAgICAgICAkc2NvcGUuYXZhaWxhYmxlQnVsa0RlY2lzaW9ucyA9IGF2YWlsYWJsZUJ1bGtEZWNpc2lvbnMgfHxcbiAgICAgICAgICAgIG1ha2VEZWNpc2lvblN0YXR1c2VzKFsnTWl0aWdhdGVkJywgJ0RlbGVnYXRlZCcsICdDZXJ0aWZpZWQnXSk7XG4gICAgICAgICRzY29wZS5jaGVja2JveE11bHRpU2VsZWN0ID0gY2hlY2tib3hNdWx0aVNlbGVjdDtcbiAgICAgICAgJHNjb3BlLmZpbHRlclZhbHVlcyA9IGZpbHRlclZhbHVlcztcbiAgICAgICAgJHNjb3BlLmRlY2lzaW9uU2NvcGUgPSBkZWNpc2lvblNjb3BlO1xuICAgICAgICBlbGVtZW50ID0gJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKSkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdlbmFibGUvZGlzYWJsZScsICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gdGVzdEVuYWJsZWQoZXhwZWN0RW5hYmxlZCkge1xuICAgICAgICAgICAgbGV0IHRvZ2dsZUJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnYnV0dG9uJyksXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQgPSBhbmd1bGFyLmVsZW1lbnQodG9nZ2xlQnV0dG9uKS5hdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgaWYgKGV4cGVjdEVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoZGlzYWJsZWQpLm5vdC50b0VxdWFsKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoZGlzYWJsZWQpLnRvRXF1YWwoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpdCAoJ2lzRW5hYmxlZCBmYWxzZSB3aGVuIHRoZXJlIGFyZSBubyBzZWxlY3RlZCBpdGVtcycsICgpID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIHRlc3RFbmFibGVkKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQgKCdpc0VuYWJsZWQgdHJ1ZSB3aGVuIHRoZXJlIGFyZSBzZWxlY3RlZCBpdGVtcycsICgpID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3Quc2VsZWN0SXRlbSh7aWQ6ICcxMjM0J30pO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgdGVzdEVuYWJsZWQodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0ICgnaXNFbmFibGVkIHRydWUgd2hlbiBzZWxlY3QgYWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgY2hlY2tib3hNdWx0aVNlbGVjdC5zZWxlY3RBbGwoKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIHRlc3RFbmFibGVkKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhdmFpbGFibGUgZGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICBmdW5jdGlvbiB0ZXN0QXZhaWxhYmxlRGVjaXNpb25zKGF2YWlsYWJsZUJ1bGtEZWNpc2lvbnMsIHVuYXZhaWxhYmxlQnVsa0RlY2lzaW9ucykge1xuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TGFiZWxGb3JTdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ01pdGlnYXRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdBbGxvdyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdEZWxlZ2F0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnRGVsZWdhdGUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnQ2VydGlmaWVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ0NlcnRpZnknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChtYWtlRGVjaXNpb25TdGF0dXNlcyhhdmFpbGFibGVCdWxrRGVjaXNpb25zKSk7XG4gICAgICAgICAgICBhdmFpbGFibGVCdWxrRGVjaXNpb25zLmZvckVhY2goKGRlY2lzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsID0gZ2V0TGFiZWxGb3JTdGF0dXMoZGVjaXNpb24pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoYGE6Y29udGFpbnMoJyR7bGFiZWx9JylgKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVuYXZhaWxhYmxlQnVsa0RlY2lzaW9ucy5mb3JFYWNoKChkZWNpc2lvbikgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoYGE6Y29udGFpbnMoJyR7Z2V0TGFiZWxGb3JTdGF0dXMoZGVjaXNpb24pfScpYCkubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnc2hvd3MgQWxsb3csIERlbGVnYXRlLCBDZXJ0aWZ5IGlmIGFsbCBhcmUgYXZhaWxhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgdGVzdEF2YWlsYWJsZURlY2lzaW9ucyhbJ01pdGlnYXRlZCcsICdEZWxlZ2F0ZWQnLCAnQ2VydGlmaWVkJ10sIFtdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2hpZGVzIERlbGVnYXRlIGlmIG5vdCBhdmFpbGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0QXZhaWxhYmxlRGVjaXNpb25zKFsnTWl0aWdhdGVkJywgJ0NlcnRpZmllZCddLCBbJ0RlbGVnYXRlZCddKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2hpZGVzIENlcnRpZnkgaWYgbm90IGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RBdmFpbGFibGVEZWNpc2lvbnMoWydNaXRpZ2F0ZWQnLCAnRGVsZWdhdGVkJ10sIFsnQ2VydGlmaWVkJ10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaGlkZXMgQWxsb3cgaWYgbm90IGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RBdmFpbGFibGVEZWNpc2lvbnMoWydEZWxlZ2F0ZWQnLCAnQ2VydGlmaWVkJ10sIFsnTWl0aWdhdGVkJ10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvd3Mgc2luZ2xlIGF2YWlsYWJsZSBkZWNpc2lvbiBhcyBidXR0b24gd2l0aG91dCBtZW51JywgKCkgPT4ge1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChtYWtlRGVjaXNpb25TdGF0dXNlcyhbJ01pdGlnYXRlZCddKSk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCdidXR0b24uZHJvcGRvd24tdG9nZ2xlJykubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnYnV0dG9uOmNvbnRhaW5zKFxcJ0FsbG93XFwnKScpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYnVsa0RlY2lkZScsICgpID0+IHtcbiAgICAgICAgbGV0IGRlY2lzaW9uLCBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLCBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZSwgcG9saWN5VmlvbGF0aW9uQnVsa0RlY2lzaW9uU2VydmljZSxcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfcG9saWN5VmlvbGF0aW9uQnVsa0RlY2lzaW9uU2VydmljZV8sIF9wb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBfcG9saWN5VmlvbGF0aW9uU2VydmljZV8sIF9uYXZpZ2F0aW9uU2VydmljZV8pID0+IHtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkJ1bGtEZWNpc2lvblNlcnZpY2UgPSBfcG9saWN5VmlvbGF0aW9uQnVsa0RlY2lzaW9uU2VydmljZV87XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZSA9IF9wb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZV87XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlID0gX3BvbGljeVZpb2xhdGlvblNlcnZpY2VfO1xuICAgICAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UgPSBfbmF2aWdhdGlvblNlcnZpY2VfO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgZnVuY3Rpb24gbWFrZURlY2lzaW9uKHN0YXR1cykge1xuICAgICAgICAgICAgZGVjaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlLCAnYnVsa0RlY2lkZScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKGRlY2lzaW9uKSk7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdhZGRCdWxrRGVjaXNpb24nKTtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQobWFrZURlY2lzaW9uU3RhdHVzZXMoW3N0YXR1c10pKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnYnV0dG9uJykuY2xpY2soKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIGJ1bGsgZGVjaXNpb24gc2VydmljZSB0byBnZXQgdGhlIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbWFrZURlY2lzaW9uKCdNaXRpZ2F0ZWQnKTtcbiAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlLmJ1bGtEZWNpZGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdNaXRpZ2F0ZWQnLFxuICAgICAgICAgICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKSwgZmlsdGVyVmFsdWVzLCBjaGVja2JveE11bHRpU2VsZWN0LmdldFNlbGVjdGlvbkNvdW50KCksXG4gICAgICAgICAgICAgICAgZGVjaXNpb25TY29wZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIHRoZSBkZWNpc2lvbiB0byB0aGUgc3RvcmUgZm9yIG5vbi1jZXJ0aWZ5IGRlY2lzaW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIG1ha2VEZWNpc2lvbignTWl0aWdhdGVkJyk7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmFkZEJ1bGtEZWNpc2lvbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoZGVjaXNpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnY2VydGlmeScsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdjYWxscyB0aGUgY2VydGlmeSBtZXRob2Qgb24gcG9saWN5IHZpb2xhdGlvbiBzZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkZWZlcnJlZCA9ICRxLmRlZmVyKCksXG4gICAgICAgICAgICAgICAgICAgIHNob3dBbGwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvblNlcnZpY2UsICdjZXJ0aWZ5JykuYW5kLnJldHVyblZhbHVlKGRlZmVycmVkLnByb21pc2UpO1xuICAgICAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLCAnaXNTaG93QWxsJykuYW5kLnJldHVyblZhbHVlKHNob3dBbGwpO1xuICAgICAgICAgICAgICAgIG1ha2VEZWNpc2lvbignQ2VydGlmaWVkJyk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmNlcnRpZnkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGRlY2lzaW9uLCBzaG93QWxsKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmFkZEJ1bGtEZWNpc2lvbikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnbmF2aWdhdGVzIHRvIGNlcnRpZmljYXRpb24gc2NoZWR1bGUgcGFnZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLCAnY2VydGlmeScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICAgICAgICAgIHNweU9uKG5hdmlnYXRpb25TZXJ2aWNlLCAnZ28nKTtcbiAgICAgICAgICAgICAgICBtYWtlRGVjaXNpb24oJ0NlcnRpZmllZCcpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGxldCBhcmdzID0gbmF2aWdhdGlvblNlcnZpY2UuZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMF0ub3V0Y29tZSkudG9FcXVhbCgnc2NoZWR1bGVCdWxrQ2VydGlmaWNhdGlvbicpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCduYXZpZ2F0ZXMgYmFjayB0byBsaXN0IGFsbCBwb2xpY3kgdmlvbGF0aW9ucyB3aGVuIHNob3dBbGwgaXMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZSwgJ2lzU2hvd0FsbCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBzcHlPbihuYXZpZ2F0aW9uU2VydmljZSwgJ2dvJyk7XG4gICAgICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uU2VydmljZSwgJ2NlcnRpZnknKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKTtcbiAgICAgICAgICAgICAgICBtYWtlRGVjaXNpb24oJ0NlcnRpZmllZCcpO1xuICAgICAgICAgICAgICAgIGxldCBhcmdzID0gbmF2aWdhdGlvblNlcnZpY2UuZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMF0ubmF2aWdhdGlvbkhpc3RvcnkpLnRvRXF1YWwoJ2xpc3RWaW9sYXRpb25zIy9wb2xpY3lWaW9sYXRpb25zP3Nob3dBbGw9dHJ1ZScpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCduYXZpZ2F0ZXMgYmFjayB0byBsaXN0IGFzc2lnbmVkIHBvbGljeSB2aW9sYXRpb25zIHdoZW4gc2hvd0FsbCBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZSwgJ2lzU2hvd0FsbCcpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgc3B5T24obmF2aWdhdGlvblNlcnZpY2UsICdnbycpO1xuICAgICAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvblNlcnZpY2UsICdjZXJ0aWZ5JykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XG4gICAgICAgICAgICAgICAgbWFrZURlY2lzaW9uKCdDZXJ0aWZpZWQnKTtcbiAgICAgICAgICAgICAgICBsZXQgYXJncyA9IG5hdmlnYXRpb25TZXJ2aWNlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdLm5hdmlnYXRpb25IaXN0b3J5KS50b0VxdWFsKCdsaXN0VmlvbGF0aW9ucyMvcG9saWN5VmlvbGF0aW9ucycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
