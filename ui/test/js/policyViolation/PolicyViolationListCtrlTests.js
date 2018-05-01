System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }],
        execute: function () {

            describe('PolicyViolationListCtrl', function () {
                var policyViolationService = undefined,
                    ctrl = undefined,
                    SortOrder = undefined,
                    DataTableDirectiveConfig = undefined,
                    $controller = undefined,
                    policyViolationDataService = undefined,
                    $scope = undefined,
                    $q = undefined,
                    config = undefined,
                    policyViolationResponse = undefined,
                    statusCount = undefined;

                beforeEach(module(policyViolationModule));

                /* jshint maxparams: 8 */
                beforeEach(inject(function (_policyViolationService_, _$controller_, _SortOrder_, policyTestData, _DataTableDirectiveConfig_, _policyViolationDataService_, $rootScope, _$q_) {
                    policyViolationService = _policyViolationService_;
                    SortOrder = _SortOrder_;
                    DataTableDirectiveConfig = _DataTableDirectiveConfig_;
                    $controller = _$controller_;
                    policyViolationDataService = _policyViolationDataService_;
                    $scope = $rootScope.$new();
                    $q = _$q_;
                    config = {};
                    statusCount = { Open: 2 };

                    policyViolationResponse = {
                        data: {
                            metaData: {
                                statusCounts: { Open: 2 }
                            },
                            objects: [policyTestData.POLICY_VIOLATION_DATA_1, policyTestData.POLICY_VIOLATION_DATA_2],
                            count: 2
                        }
                    };

                    spyOn(policyViolationService, 'getPolicyViolations').and.callFake(function () {
                        return $q.when(policyViolationResponse);
                    });

                    spyOn(policyViolationService, 'getFilters').and.callFake(function () {
                        return $q.when([]);
                    });

                    spyOn(policyViolationService, 'getConfiguration').and.callFake(function () {
                        return $q.when(config);
                    });

                    ctrl = $controller('PolicyViolationListCtrl', {});
                }));

                describe('load', function () {
                    it('fetches and sets the decision config', function () {
                        spyOn(policyViolationDataService, 'setDecisionConfig');
                        expect(policyViolationService.getConfiguration).toHaveBeenCalled();
                        $scope.$apply();
                        expect(policyViolationDataService.setDecisionConfig).toHaveBeenCalledWith(config);
                    });

                    it('sets filters on the table configs', function () {
                        expect(policyViolationService.getFilters).toHaveBeenCalled();
                        $scope.$apply();
                        expect(policyViolationDataService.openTab.tableConfig.filters).toBeDefined();
                        expect(policyViolationDataService.completeTab.tableConfig.filters).toBeDefined();
                    });

                    it('sets the value of showAll in the dataservice', function () {
                        it('calls through with showAll true if state param IS defined', function () {
                            spyOn(policyViolationDataService, 'setShowAll');
                            ctrl = $controller('PolicyViolationListCtrl', {
                                $stateParams: {
                                    showAll: true
                                }
                            });
                            expect(policyViolationDataService.setShowAll).toHaveBeenCalledWith(true);
                        });
                    });
                });

                describe('getPolicyViolationItems', function () {
                    var start = 10,
                        limit = 12;

                    it('calls through to policyViolationService', function () {
                        ctrl.getPolicyViolations(start, limit);
                        expect(policyViolationService.getPolicyViolations).toHaveBeenCalledWith(start, limit, undefined, undefined, false, policyViolationDataService.currentTab.decisionScope);
                    });

                    it('adds sort order', function () {
                        var sortOrder = new SortOrder('status', true);
                        ctrl.getPolicyViolations(start, limit, sortOrder);
                        expect(policyViolationService.getPolicyViolations).toHaveBeenCalledWith(start, limit, sortOrder, undefined, false, policyViolationDataService.currentTab.decisionScope);
                    });

                    it('calls through with filterValues', function () {
                        var filterValues = { a: 'b' };
                        ctrl.getPolicyViolations(start, limit, undefined, filterValues);
                        expect(policyViolationService.getPolicyViolations).toHaveBeenCalledWith(start, limit, undefined, filterValues, false, policyViolationDataService.currentTab.decisionScope);
                    });

                    it('calls through with value of showAll in the data service', function () {
                        var showAll = 'bob';
                        spyOn(policyViolationDataService, 'isShowAll').and.returnValue(showAll);
                        ctrl.getPolicyViolations(start, limit);
                        expect(policyViolationService.getPolicyViolations).toHaveBeenCalledWith(start, limit, undefined, undefined, showAll, policyViolationDataService.currentTab.decisionScope);
                    });

                    it('sets the statusCounts', function () {
                        ctrl.getPolicyViolations(start, limit);
                        $scope.$apply();
                        expect(policyViolationDataService.statusCountMap).toBeDefined();
                        expect(policyViolationDataService.statusCountMap).toEqual(statusCount);
                    });

                    it('calls to initialize tabs if flag is set', function () {
                        spyOn(policyViolationDataService, 'initializeCurrentTab');
                        ctrl.initializeTabNextLoad = true;
                        ctrl.getPolicyViolations(start, limit);
                        $scope.$apply();
                        expect(policyViolationDataService.initializeCurrentTab).toHaveBeenCalled();
                    });

                    it('does not initialize tabs if flag is not set', function () {
                        spyOn(policyViolationDataService, 'initializeCurrentTab');
                        ctrl.initializeTabNextLoad = false;
                        ctrl.getPolicyViolations(start, limit);
                        $scope.$apply();
                        expect(policyViolationDataService.initializeCurrentTab).not.toHaveBeenCalled();
                    });
                });

                describe('hasDecisions()', function () {
                    function setupDecisions(count) {
                        spyOn(policyViolationDataService.decisions, 'getDecisionCount').and.returnValue(count);
                    }

                    it('returns true if there are unsaved decisions', function () {
                        setupDecisions(1);
                        expect(ctrl.hasDecisions()).toEqual(true);
                    });

                    it('returns false if there are not unsaved decisions', function () {
                        setupDecisions(0);
                        expect(ctrl.hasDecisions()).toEqual(false);
                    });
                });

                describe('saveDecisions()', function () {
                    var decisions = [],
                        saveReturn = undefined,
                        spModal = undefined;

                    beforeEach(inject(function (_spModal_, promiseTrackerService) {
                        spModal = _spModal_;
                        saveReturn = $q.when();
                        spyOn(policyViolationService, 'saveDecisions').and.callFake(function () {
                            return saveReturn;
                        });
                        spyOn(policyViolationDataService.decisions, 'getDecisions').and.callFake(function () {
                            return decisions;
                        });
                        spyOn(spModal, 'open');
                        spyOn(promiseTrackerService, 'track');
                    }));

                    it('throws with no decisions', function () {
                        expect(function () {
                            return ctrl.saveDecisions();
                        }).toThrow();
                    });

                    it('calls policyViolationService to save the decisions', function () {
                        decisions = [{}, {}];
                        ctrl.saveDecisions();
                        expect(policyViolationService.saveDecisions).toHaveBeenCalledWith(decisions, false);
                    });

                    it('refreshes the list after successful save', function () {
                        spyOn(ctrl.getCurrentTab().tableConfig.getRefreshTrigger(), 'refresh');
                        ctrl.saveDecisions();
                        $scope.$apply();
                        expect(ctrl.getCurrentTab().tableConfig.getRefreshTrigger().refresh).toHaveBeenCalled();
                    });

                    it('shows warning dialog if save succeeds with messages', function () {
                        var warnings = ['something', 'else'];
                        saveReturn = $q.when(warnings);
                        ctrl.saveDecisions();
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                        var args = spModal.open.calls.mostRecent().args;
                        expect(args[0].warningLevel).toEqual('warning');
                        expect(args[0].content).toEqual(warnings.join('<br/>'));
                    });

                    it('shows error dialog if save fails', function () {
                        var errors = ['error', 'error2'];
                        saveReturn = $q.reject(errors);
                        ctrl.saveDecisions()['catch'](angular.noop);
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                        var args = spModal.open.calls.mostRecent().args;
                        expect(args[0].warningLevel).toEqual('danger');
                        expect(args[0].content).toEqual(errors[0]);
                    });
                });

                describe('tabs', function () {
                    it('defaults to open tab', function () {
                        expect(policyViolationDataService.currentTab).toBe(policyViolationDataService.openTab);
                    });

                    describe('getCurrentTab()', function () {
                        it('returns the currentTab', function () {
                            expect(ctrl.getCurrentTab()).toBe(policyViolationDataService.currentTab);
                        });
                    });

                    describe('isCurrentTab()', function () {
                        it('returns false if tab is not current tab', function () {
                            policyViolationDataService.currentTab = policyViolationDataService.completeTab;
                            expect(ctrl.isCurrentTab(policyViolationDataService.openTab)).toEqual(false);
                        });

                        it('returns true if tab is current tab', function () {
                            policyViolationDataService.currentTab = policyViolationDataService.completeTab;
                            expect(ctrl.isCurrentTab(policyViolationDataService.completeTab)).toEqual(true);
                        });
                    });

                    describe('changeTab()', function () {
                        it('calls through to data service to set the current tab', function () {
                            ctrl.changeTab(policyViolationDataService.completeTab);
                            expect(ctrl.getCurrentTab()).toBe(policyViolationDataService.completeTab);
                        });
                    });

                    describe('getTabs()', function () {
                        it('returns the two tabs', function () {
                            expect(ctrl.getTabs()).toEqual([policyViolationDataService.openTab, policyViolationDataService.completeTab]);
                        });
                    });

                    describe('tab counts', function () {
                        var statusCounts = undefined;
                        beforeEach(function () {
                            statusCounts = {
                                Open: 2,
                                Remediated: 5
                            };
                            policyViolationResponse.data.metaData = {
                                statusCounts: statusCounts
                            };
                        });

                        it('sets the status count when fetching items', function () {
                            ctrl.getPolicyViolations(0, 10);
                            $scope.$apply();
                            expect(policyViolationDataService.statusCountMap).toEqual(statusCounts);
                        });

                        it('gets the tab count for the given tab', function () {
                            policyViolationDataService.statusCountMap = statusCounts;
                            spyOn(policyViolationDataService.completeTab, 'getCount').and.callThrough();
                            var tabCount = ctrl.getTabCount(policyViolationDataService.completeTab);
                            expect(policyViolationDataService.completeTab.getCount).toHaveBeenCalled();
                            expect(tabCount).toEqual(5);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25MaXN0Q3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsVUFBVSxTQUFTOzs7OztJQUtyRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUywyQkFBMkIsWUFBTTtnQkFDdEMsSUFBSSx5QkFBc0I7b0JBQUUsT0FBSTtvQkFBRSxZQUFTO29CQUFFLDJCQUF3QjtvQkFBRSxjQUFXO29CQUFFLDZCQUEwQjtvQkFDMUcsU0FBTTtvQkFBRSxLQUFFO29CQUFFLFNBQU07b0JBQUUsMEJBQXVCO29CQUFFLGNBQVc7O2dCQUU1RCxXQUFXLE9BQU87OztnQkFHbEIsV0FBVyxPQUFPLFVBQUMsMEJBQTBCLGVBQWUsYUFBYSxnQkFDdEQsNEJBQTRCLDhCQUE4QixZQUFZLE1BQVM7b0JBQzlGLHlCQUF5QjtvQkFDekIsWUFBWTtvQkFDWiwyQkFBMkI7b0JBQzNCLGNBQWM7b0JBQ2QsNkJBQTZCO29CQUM3QixTQUFTLFdBQVc7b0JBQ3BCLEtBQUs7b0JBQ0wsU0FBUztvQkFDVCxjQUFjLEVBQUMsTUFBTTs7b0JBRXJCLDBCQUEwQjt3QkFDdEIsTUFBTTs0QkFDRixVQUFVO2dDQUNOLGNBQWMsRUFBQyxNQUFNOzs0QkFFekIsU0FBUyxDQUFDLGVBQWUseUJBQXlCLGVBQWU7NEJBQ2pFLE9BQU87Ozs7b0JBSWYsTUFBTSx3QkFBd0IsdUJBQXVCLElBQUksU0FBUyxZQUFBO3dCQWdCbEQsT0FoQndELEdBQUcsS0FBSzs7O29CQUVoRixNQUFNLHdCQUF3QixjQUFjLElBQUksU0FBUyxZQUFBO3dCQWtCekMsT0FsQitDLEdBQUcsS0FBSzs7O29CQUV2RSxNQUFNLHdCQUF3QixvQkFBb0IsSUFB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QUcsd0NBQXdDLFlBQU07NEJBQzdDLDJCQUEyQixpQkFBaUI7NEJBQzVDLE1BQU0sMkJBQTJCLGFBQWEsWUFBWSxJQUFJOzRCQUM5RCxJQUFJLFdBQVcsS0FBSyxZQUFZLDJCQUEyQjs0QkFDM0QsT0FBTywyQkFBMkIsWUFBWSxVQUFVOzRCQUN4RCxPQUFPLFVBQVUsUUFBUTs7Ozs7OztHQWdDdEMiLCJmaWxlIjoicG9saWN5VmlvbGF0aW9uL1BvbGljeVZpb2xhdGlvbkxpc3RDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBvbGljeVZpb2xhdGlvbk1vZHVsZSBmcm9tICdwb2xpY3lWaW9sYXRpb24vUG9saWN5VmlvbGF0aW9uTW9kdWxlJztcblxuZGVzY3JpYmUoJ1BvbGljeVZpb2xhdGlvbkxpc3RDdHJsJywgKCkgPT4ge1xuICAgIGxldCBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLCBjdHJsLCBTb3J0T3JkZXIsIERhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZywgJGNvbnRyb2xsZXIsIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLFxuICAgICAgICAkc2NvcGUsICRxLCBjb25maWcsIHBvbGljeVZpb2xhdGlvblJlc3BvbnNlLCBzdGF0dXNDb3VudDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBvbGljeVZpb2xhdGlvbk1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogOCAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfcG9saWN5VmlvbGF0aW9uU2VydmljZV8sIF8kY29udHJvbGxlcl8sIF9Tb3J0T3JkZXJfLCBwb2xpY3lUZXN0RGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgX0RhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZ18sIF9wb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZV8sICRyb290U2NvcGUsIF8kcV8pID0+IHtcbiAgICAgICAgcG9saWN5VmlvbGF0aW9uU2VydmljZSA9IF9wb2xpY3lWaW9sYXRpb25TZXJ2aWNlXztcbiAgICAgICAgU29ydE9yZGVyID0gX1NvcnRPcmRlcl87XG4gICAgICAgIERhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZyA9IF9EYXRhVGFibGVEaXJlY3RpdmVDb25maWdfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlID0gX3BvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlXztcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgY29uZmlnID0ge307XG4gICAgICAgIHN0YXR1c0NvdW50ID0ge09wZW46IDJ9O1xuXG4gICAgICAgIHBvbGljeVZpb2xhdGlvblJlc3BvbnNlID0ge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG1ldGFEYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvdW50czoge09wZW46IDJ9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbcG9saWN5VGVzdERhdGEuUE9MSUNZX1ZJT0xBVElPTl9EQVRBXzEsIHBvbGljeVRlc3REYXRhLlBPTElDWV9WSU9MQVRJT05fREFUQV8yXSxcbiAgICAgICAgICAgICAgICBjb3VudDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvblNlcnZpY2UsICdnZXRQb2xpY3lWaW9sYXRpb25zJykuYW5kLmNhbGxGYWtlKCgpID0+ICRxLndoZW4ocG9saWN5VmlvbGF0aW9uUmVzcG9uc2UpKTtcblxuICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLCAnZ2V0RmlsdGVycycpLmFuZC5jYWxsRmFrZSgoKSA9PiAkcS53aGVuKFtdKSk7XG5cbiAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uU2VydmljZSwgJ2dldENvbmZpZ3VyYXRpb24nKS5hbmQuY2FsbEZha2UoKCkgPT4gJHEud2hlbihjb25maWcpKTtcblxuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ1BvbGljeVZpb2xhdGlvbkxpc3RDdHJsJywge30pO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBpdCAoJ2ZldGNoZXMgYW5kIHNldHMgdGhlIGRlY2lzaW9uIGNvbmZpZycsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLCAnc2V0RGVjaXNpb25Db25maWcnKTtcbiAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5zZXREZWNpc2lvbkNvbmZpZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoY29uZmlnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQgKCdzZXRzIGZpbHRlcnMgb24gdGhlIHRhYmxlIGNvbmZpZ3MnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uU2VydmljZS5nZXRGaWx0ZXJzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2Uub3BlblRhYi50YWJsZUNvbmZpZy5maWx0ZXJzKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmNvbXBsZXRlVGFiLnRhYmxlQ29uZmlnLmZpbHRlcnMpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzZXRzIHRoZSB2YWx1ZSBvZiBzaG93QWxsIGluIHRoZSBkYXRhc2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdjYWxscyB0aHJvdWdoIHdpdGggc2hvd0FsbCB0cnVlIGlmIHN0YXRlIHBhcmFtIElTIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UsICdzZXRTaG93QWxsJyk7XG4gICAgICAgICAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdQb2xpY3lWaW9sYXRpb25MaXN0Q3RybCcsIHtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93QWxsOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2Uuc2V0U2hvd0FsbCkudG9IYXZlQmVlbkNhbGxlZFdpdGgodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UG9saWN5VmlvbGF0aW9uSXRlbXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBzdGFydCA9IDEwLCBsaW1pdCA9IDEyO1xuXG4gICAgICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIHBvbGljeVZpb2xhdGlvblNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBjdHJsLmdldFBvbGljeVZpb2xhdGlvbnMoc3RhcnQsIGxpbWl0KTtcbiAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmdldFBvbGljeVZpb2xhdGlvbnMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHN0YXJ0LCBsaW1pdCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgZmFsc2UsIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmN1cnJlbnRUYWIuZGVjaXNpb25TY29wZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIHNvcnQgb3JkZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc29ydE9yZGVyID0gbmV3IFNvcnRPcmRlcignc3RhdHVzJywgdHJ1ZSk7XG4gICAgICAgICAgICBjdHJsLmdldFBvbGljeVZpb2xhdGlvbnMoc3RhcnQsIGxpbWl0LCBzb3J0T3JkZXIpO1xuICAgICAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvblNlcnZpY2UuZ2V0UG9saWN5VmlvbGF0aW9ucykudG9IYXZlQmVlbkNhbGxlZFdpdGgoc3RhcnQsIGxpbWl0LCBzb3J0T3JkZXIsIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBmYWxzZSwgcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuY3VycmVudFRhYi5kZWNpc2lvblNjb3BlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggd2l0aCBmaWx0ZXJWYWx1ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWVzID0geyBhIDogJ2InIH07XG4gICAgICAgICAgICBjdHJsLmdldFBvbGljeVZpb2xhdGlvbnMoc3RhcnQsIGxpbWl0LCB1bmRlZmluZWQsIGZpbHRlclZhbHVlcyk7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uU2VydmljZS5nZXRQb2xpY3lWaW9sYXRpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChzdGFydCwgbGltaXQsIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZXMsIGZhbHNlLCBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jdXJyZW50VGFiLmRlY2lzaW9uU2NvcGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB3aXRoIHZhbHVlIG9mIHNob3dBbGwgaW4gdGhlIGRhdGEgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzaG93QWxsID0gJ2JvYic7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZSwgJ2lzU2hvd0FsbCcpLmFuZC5yZXR1cm5WYWx1ZShzaG93QWxsKTtcbiAgICAgICAgICAgIGN0cmwuZ2V0UG9saWN5VmlvbGF0aW9ucyhzdGFydCwgbGltaXQpO1xuICAgICAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvblNlcnZpY2UuZ2V0UG9saWN5VmlvbGF0aW9ucykudG9IYXZlQmVlbkNhbGxlZFdpdGgoc3RhcnQsIGxpbWl0LCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkLCBzaG93QWxsLCBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jdXJyZW50VGFiLmRlY2lzaW9uU2NvcGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCAoJ3NldHMgdGhlIHN0YXR1c0NvdW50cycsICgpID0+IHtcbiAgICAgICAgICAgIGN0cmwuZ2V0UG9saWN5VmlvbGF0aW9ucyhzdGFydCwgbGltaXQpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLnN0YXR1c0NvdW50TWFwKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLnN0YXR1c0NvdW50TWFwKS50b0VxdWFsKHN0YXR1c0NvdW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQgKCdjYWxscyB0byBpbml0aWFsaXplIHRhYnMgaWYgZmxhZyBpcyBzZXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZSwgJ2luaXRpYWxpemVDdXJyZW50VGFiJyk7XG4gICAgICAgICAgICBjdHJsLmluaXRpYWxpemVUYWJOZXh0TG9hZCA9IHRydWU7XG4gICAgICAgICAgICBjdHJsLmdldFBvbGljeVZpb2xhdGlvbnMoc3RhcnQsIGxpbWl0KTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplQ3VycmVudFRhYikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCAoJ2RvZXMgbm90IGluaXRpYWxpemUgdGFicyBpZiBmbGFnIGlzIG5vdCBzZXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZSwgJ2luaXRpYWxpemVDdXJyZW50VGFiJyk7XG4gICAgICAgICAgICBjdHJsLmluaXRpYWxpemVUYWJOZXh0TG9hZCA9IGZhbHNlO1xuICAgICAgICAgICAgY3RybC5nZXRQb2xpY3lWaW9sYXRpb25zKHN0YXJ0LCBsaW1pdCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZUN1cnJlbnRUYWIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc0RlY2lzaW9ucygpJywgKCkgPT4ge1xuICAgICAgICBmdW5jdGlvbiBzZXR1cERlY2lzaW9ucyhjb3VudCkge1xuICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RGVjaXNpb25Db3VudCcpLmFuZC5yZXR1cm5WYWx1ZShjb3VudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSB1bnNhdmVkIGRlY2lzaW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIHNldHVwRGVjaXNpb25zKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzRGVjaXNpb25zKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZXJlIGFyZSBub3QgdW5zYXZlZCBkZWNpc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBzZXR1cERlY2lzaW9ucygwKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0RlY2lzaW9ucygpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2F2ZURlY2lzaW9ucygpJywgKCkgPT4ge1xuICAgICAgICBsZXQgZGVjaXNpb25zID0gW10sIHNhdmVSZXR1cm4sIHNwTW9kYWw7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9zcE1vZGFsXywgcHJvbWlzZVRyYWNrZXJTZXJ2aWNlKSA9PiB7XG4gICAgICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICAgICAgc2F2ZVJldHVybiA9ICRxLndoZW4oKTtcbiAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvblNlcnZpY2UsICdzYXZlRGVjaXNpb25zJykuYW5kLmNhbGxGYWtlKCgpID0+IHNhdmVSZXR1cm4pO1xuICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RGVjaXNpb25zJykuYW5kLmNhbGxGYWtlKCgpID0+IGRlY2lzaW9ucyk7XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpO1xuICAgICAgICAgICAgc3B5T24ocHJvbWlzZVRyYWNrZXJTZXJ2aWNlLCAndHJhY2snKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBkZWNpc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY3RybC5zYXZlRGVjaXNpb25zKCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHBvbGljeVZpb2xhdGlvblNlcnZpY2UgdG8gc2F2ZSB0aGUgZGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgZGVjaXNpb25zID0gW3t9LCB7fV07XG4gICAgICAgICAgICBjdHJsLnNhdmVEZWNpc2lvbnMoKTtcbiAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLnNhdmVEZWNpc2lvbnMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGRlY2lzaW9ucywgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmVmcmVzaGVzIHRoZSBsaXN0IGFmdGVyIHN1Y2Nlc3NmdWwgc2F2ZScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGN0cmwuZ2V0Q3VycmVudFRhYigpLnRhYmxlQ29uZmlnLmdldFJlZnJlc2hUcmlnZ2VyKCksICdyZWZyZXNoJyk7XG4gICAgICAgICAgICBjdHJsLnNhdmVEZWNpc2lvbnMoKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEN1cnJlbnRUYWIoKS50YWJsZUNvbmZpZy5nZXRSZWZyZXNoVHJpZ2dlcigpLnJlZnJlc2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIHdhcm5pbmcgZGlhbG9nIGlmIHNhdmUgc3VjY2VlZHMgd2l0aCBtZXNzYWdlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB3YXJuaW5ncyA9IFsnc29tZXRoaW5nJywgJ2Vsc2UnXTtcbiAgICAgICAgICAgIHNhdmVSZXR1cm4gPSAkcS53aGVuKHdhcm5pbmdzKTtcbiAgICAgICAgICAgIGN0cmwuc2F2ZURlY2lzaW9ucygpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgbGV0IGFyZ3MgPSBzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XG4gICAgICAgICAgICBleHBlY3QoYXJnc1swXS53YXJuaW5nTGV2ZWwpLnRvRXF1YWwoJ3dhcm5pbmcnKTtcbiAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdLmNvbnRlbnQpLnRvRXF1YWwod2FybmluZ3Muam9pbignPGJyLz4nKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG93cyBlcnJvciBkaWFsb2cgaWYgc2F2ZSBmYWlscycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBlcnJvcnMgPSBbJ2Vycm9yJywgJ2Vycm9yMiddO1xuICAgICAgICAgICAgc2F2ZVJldHVybiA9ICRxLnJlamVjdChlcnJvcnMpO1xuICAgICAgICAgICAgY3RybC5zYXZlRGVjaXNpb25zKCkuY2F0Y2goYW5ndWxhci5ub29wKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGxldCBhcmdzID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMF0ud2FybmluZ0xldmVsKS50b0VxdWFsKCdkYW5nZXInKTtcbiAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdLmNvbnRlbnQpLnRvRXF1YWwoZXJyb3JzWzBdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndGFicycsICgpID0+IHtcbiAgICAgICAgaXQoJ2RlZmF1bHRzIHRvIG9wZW4gdGFiJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmN1cnJlbnRUYWIpLnRvQmUocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2Uub3BlblRhYik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdnZXRDdXJyZW50VGFiKCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgncmV0dXJucyB0aGUgY3VycmVudFRhYicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDdXJyZW50VGFiKCkpLnRvQmUocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuY3VycmVudFRhYik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2lzQ3VycmVudFRhYigpJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGFiIGlzIG5vdCBjdXJyZW50IHRhYicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jdXJyZW50VGFiID0gcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuY29tcGxldGVUYWI7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNDdXJyZW50VGFiKHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLm9wZW5UYWIpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRhYiBpcyBjdXJyZW50IHRhYicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jdXJyZW50VGFiID0gcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuY29tcGxldGVUYWI7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNDdXJyZW50VGFiKHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmNvbXBsZXRlVGFiKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnY2hhbmdlVGFiKCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0byBkYXRhIHNlcnZpY2UgdG8gc2V0IHRoZSBjdXJyZW50IHRhYicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjdHJsLmNoYW5nZVRhYihwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jb21wbGV0ZVRhYik7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q3VycmVudFRhYigpKS50b0JlKHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmNvbXBsZXRlVGFiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnZ2V0VGFicygpJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3JldHVybnMgdGhlIHR3byB0YWJzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFRhYnMoKSkudG9FcXVhbChcbiAgICAgICAgICAgICAgICAgICAgW3BvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLm9wZW5UYWIsIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmNvbXBsZXRlVGFiXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3RhYiBjb3VudHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhdHVzQ291bnRzO1xuICAgICAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ291bnRzID0ge1xuICAgICAgICAgICAgICAgICAgICBPcGVuOiAyLFxuICAgICAgICAgICAgICAgICAgICBSZW1lZGlhdGVkOiA1XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25SZXNwb25zZS5kYXRhLm1ldGFEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb3VudHM6IHN0YXR1c0NvdW50c1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3NldHMgdGhlIHN0YXR1cyBjb3VudCB3aGVuIGZldGNoaW5nIGl0ZW1zJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGN0cmwuZ2V0UG9saWN5VmlvbGF0aW9ucygwLCAxMCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5zdGF0dXNDb3VudE1hcCkudG9FcXVhbChzdGF0dXNDb3VudHMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdnZXRzIHRoZSB0YWIgY291bnQgZm9yIHRoZSBnaXZlbiB0YWInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2Uuc3RhdHVzQ291bnRNYXAgPSBzdGF0dXNDb3VudHM7XG4gICAgICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuY29tcGxldGVUYWIsICdnZXRDb3VudCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgICAgICAgICAgICAgIGxldCB0YWJDb3VudCA9IGN0cmwuZ2V0VGFiQ291bnQocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuY29tcGxldGVUYWIpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jb21wbGV0ZVRhYi5nZXRDb3VudCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0YWJDb3VudCkudG9FcXVhbCg1KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
