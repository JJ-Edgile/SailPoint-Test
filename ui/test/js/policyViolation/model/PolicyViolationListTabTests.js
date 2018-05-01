System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }],
        execute: function () {

            describe('PolicyViolationListTab', function () {
                var PolicyViolationListTab = undefined;

                beforeEach(module(policyViolationModule));

                beforeEach(inject(function (_PolicyViolationListTab_) {
                    PolicyViolationListTab = _PolicyViolationListTab_;
                }));

                describe('constructor', function () {
                    it('throws with no config', function () {
                        expect(function () {
                            return new PolicyViolationListTab();
                        }).toThrow();
                    });

                    it('sets the title, decision scope and bulkDecisions', function () {
                        var config = {
                            title: 'whatever',
                            decisionScope: 'blah blah',
                            bulkDecisions: ['Certified']
                        },
                            tab = new PolicyViolationListTab(config);
                        expect(tab.title).toEqual(config.title);
                        expect(tab.decisionScope).toEqual(config.decisionScope);
                        expect(tab.bulkDecisions).toEqual(config.bulkDecisions);
                    });

                    it('sets the checkbox model on the table config', function () {
                        var config = { allowBulk: false },
                            tab = new PolicyViolationListTab(config);
                        expect(tab.tableConfig.getCheckboxMultiSelect()).not.toBeDefined();

                        config = { allowBulk: true };
                        tab = new PolicyViolationListTab(config);
                        expect(tab.tableConfig.getCheckboxMultiSelect()).toBeDefined();
                    });
                });

                describe('getCount()', function () {
                    var tab = undefined;
                    beforeEach(function () {
                        tab = new PolicyViolationListTab({
                            decisionScope: {
                                statuses: ['Open', 'Delegated']
                            }
                        });
                    });

                    it('returns 0 with no statusCounts', function () {
                        expect(tab.getCount()).toEqual(0);
                    });

                    it('returns the combined count of all decisionScope statuses', function () {
                        var statusCounts = {
                            Open: 5,
                            Delegated: 7,
                            Remediated: 4
                        };

                        expect(tab.getCount(statusCounts)).toEqual(12);
                    });
                });

                describe('setAvailableBulkDecisions', function () {
                    var tab = undefined;
                    beforeEach(function () {
                        tab = new PolicyViolationListTab({
                            bulkDecisions: ['Mitigated', 'Delegated']
                        });
                    });
                    it('sets to empty if nothing provided', function () {
                        tab.setAvailableBulkDecisions();
                        expect(tab.availableBulkDecisions).toEqual([]);
                    });

                    it('sets to a filtered list of decisions that match bulkDecisions values', function () {
                        var decisions = [{
                            status: 'Certified'
                        }, {
                            status: 'Mitigated'
                        }];
                        tab.setAvailableBulkDecisions(decisions);
                        // Certified isnt defined on the tab, and Delegated isnt available
                        expect(tab.availableBulkDecisions).toEqual([decisions[1]]);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9tb2RlbC9Qb2xpY3lWaW9sYXRpb25MaXN0VGFiVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBDQUEwQyxVQUFVLFNBQVM7OztJQUdyRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUywwQkFBMEIsWUFBTTtnQkFDckMsSUFBSSx5QkFBc0I7O2dCQUUxQixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQywwQkFBNkI7b0JBQzVDLHlCQUF5Qjs7O2dCQUc3QixTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyx5QkFBeUIsWUFBTTt3QkFDOUIsT0FBTyxZQUFBOzRCQVFTLE9BUkgsSUFBSTsyQkFBMEI7OztvQkFHL0MsR0FBRyxvREFBb0QsWUFBTTt3QkFDekQsSUFBSSxTQUFTOzRCQUNULE9BQU87NEJBQ1AsZUFBZTs0QkFDZixlQUFlLENBQUM7OzRCQUNqQixNQUFNLElBQUksdUJBQXVCO3dCQUNwQyxPQUFPLElBQUksT0FBTyxRQUFRLE9BQU87d0JBQ2pDLE9BQU8sSUFBSSxlQUFlLFFBQVEsT0FBTzt3QkFDekMsT0FBTyxJQUFJLGVBQWUsUUFBUSxPQUFPOzs7b0JBRzdDLEdBQUcsK0NBQStDLFlBQU07d0JBQ3BELElBQUksU0FBUyxFQUFFLFdBQVc7NEJBQ3RCLE1BQU0sSUFBSSx1QkFBdUI7d0JBQ3JDLE9BQU8sSUFBSSxZQUFZLDBCQUEwQixJQUFJOzt3QkFFckQsU0FBUyxFQUFFLFdBQVc7d0JBQ3RCLE1BQU0sSUFBSSx1QkFBdUI7d0JBQ2pDLE9BQU8sSUFBSSxZQUFZLDBCQUEwQjs7OztnQkFJekQsU0FBUyxjQUFjLFlBQU07b0JBQ3pCLElBQUksTUFBRztvQkFDUCxXQUFXLFlBQU07d0JBQ2IsTUFBTSxJQUFJLHVCQUF1Qjs0QkFDN0IsZUFBZTtnQ0FDWCxVQUFVLENBQUMsUUFBUTs7Ozs7b0JBSy9CLEdBQUcsa0NBQWtDLFlBQU07d0JBQ3ZDLE9BQU8sSUFBSSxZQUFZLFFBQVE7OztvQkFHbkMsR0FBRyw0REFBNEQsWUFBTTt3QkFDakUsSUFBSSxlQUFlOzRCQUNmLE1BQU07NEJBQ04sV0FBVzs0QkFDWCxZQUFZOzs7d0JBR2hCLE9BQU8sSUFBSSxTQUFTLGVBQWUsUUFBUTs7OztnQkFJbkQsU0FBUyw2QkFBNkIsWUFBTTtvQkFDeEMsSUFBSSxNQUFHO29CQUNQLFdBQVcsWUFBTTt3QkFDYixNQUFNLElBQUksdUJBQXVCOzRCQUM3QixlQUFlLENBQUMsYUFBYTs7O29CQUdyQyxHQUFHLHFDQUFxQyxZQUFNO3dCQUMxQyxJQUFJO3dCQUNKLE9BQU8sSUFBSSx3QkFBd0IsUUFBUTs7O29CQUcvQyxHQUFHLHdFQUF3RSxZQUFNO3dCQUM3RSxJQUFJLFlBQVksQ0FBQzs0QkFDYixRQUFROzJCQUNWOzRCQUNFLFFBQVE7O3dCQUVaLElBQUksMEJBQTBCOzt3QkFFOUIsT0FBTyxJQUFJLHdCQUF3QixRQUFRLENBQUMsVUFBVTs7Ozs7O0dBZ0IvRCIsImZpbGUiOiJwb2xpY3lWaW9sYXRpb24vbW9kZWwvUG9saWN5VmlvbGF0aW9uTGlzdFRhYlRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBvbGljeVZpb2xhdGlvbk1vZHVsZSBmcm9tICdwb2xpY3lWaW9sYXRpb24vUG9saWN5VmlvbGF0aW9uTW9kdWxlJztcblxuZGVzY3JpYmUoJ1BvbGljeVZpb2xhdGlvbkxpc3RUYWInLCAoKSA9PiB7XG4gICAgbGV0IFBvbGljeVZpb2xhdGlvbkxpc3RUYWI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwb2xpY3lWaW9sYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUG9saWN5VmlvbGF0aW9uTGlzdFRhYl8pID0+IHtcbiAgICAgICAgUG9saWN5VmlvbGF0aW9uTGlzdFRhYiA9IF9Qb2xpY3lWaW9sYXRpb25MaXN0VGFiXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBjb25maWcnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbmV3IFBvbGljeVZpb2xhdGlvbkxpc3RUYWIoKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2V0cyB0aGUgdGl0bGUsIGRlY2lzaW9uIHNjb3BlIGFuZCBidWxrRGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ3doYXRldmVyJyxcbiAgICAgICAgICAgICAgICBkZWNpc2lvblNjb3BlOiAnYmxhaCBibGFoJyxcbiAgICAgICAgICAgICAgICBidWxrRGVjaXNpb25zOiBbJ0NlcnRpZmllZCddXG4gICAgICAgICAgICB9LCB0YWIgPSBuZXcgUG9saWN5VmlvbGF0aW9uTGlzdFRhYihjb25maWcpO1xuICAgICAgICAgICAgZXhwZWN0KHRhYi50aXRsZSkudG9FcXVhbChjb25maWcudGl0bGUpO1xuICAgICAgICAgICAgZXhwZWN0KHRhYi5kZWNpc2lvblNjb3BlKS50b0VxdWFsKGNvbmZpZy5kZWNpc2lvblNjb3BlKTtcbiAgICAgICAgICAgIGV4cGVjdCh0YWIuYnVsa0RlY2lzaW9ucykudG9FcXVhbChjb25maWcuYnVsa0RlY2lzaW9ucyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzZXRzIHRoZSBjaGVja2JveCBtb2RlbCBvbiB0aGUgdGFibGUgY29uZmlnJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IHsgYWxsb3dCdWxrOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgdGFiID0gbmV3IFBvbGljeVZpb2xhdGlvbkxpc3RUYWIoY29uZmlnKTtcbiAgICAgICAgICAgIGV4cGVjdCh0YWIudGFibGVDb25maWcuZ2V0Q2hlY2tib3hNdWx0aVNlbGVjdCgpKS5ub3QudG9CZURlZmluZWQoKTtcblxuICAgICAgICAgICAgY29uZmlnID0geyBhbGxvd0J1bGs6IHRydWV9O1xuICAgICAgICAgICAgdGFiID0gbmV3IFBvbGljeVZpb2xhdGlvbkxpc3RUYWIoY29uZmlnKTtcbiAgICAgICAgICAgIGV4cGVjdCh0YWIudGFibGVDb25maWcuZ2V0Q2hlY2tib3hNdWx0aVNlbGVjdCgpKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRDb3VudCgpJywgKCkgPT4ge1xuICAgICAgICBsZXQgdGFiO1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIHRhYiA9IG5ldyBQb2xpY3lWaW9sYXRpb25MaXN0VGFiKHtcbiAgICAgICAgICAgICAgICBkZWNpc2lvblNjb3BlOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c2VzOiBbJ09wZW4nLCAnRGVsZWdhdGVkJ11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgMCB3aXRoIG5vIHN0YXR1c0NvdW50cycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCh0YWIuZ2V0Q291bnQoKSkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIGNvbWJpbmVkIGNvdW50IG9mIGFsbCBkZWNpc2lvblNjb3BlIHN0YXR1c2VzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0YXR1c0NvdW50cyA9IHtcbiAgICAgICAgICAgICAgICBPcGVuOiA1LFxuICAgICAgICAgICAgICAgIERlbGVnYXRlZDogNyxcbiAgICAgICAgICAgICAgICBSZW1lZGlhdGVkOiA0XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBleHBlY3QodGFiLmdldENvdW50KHN0YXR1c0NvdW50cykpLnRvRXF1YWwoMTIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZXRBdmFpbGFibGVCdWxrRGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICBsZXQgdGFiO1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIHRhYiA9IG5ldyBQb2xpY3lWaW9sYXRpb25MaXN0VGFiKHtcbiAgICAgICAgICAgICAgICBidWxrRGVjaXNpb25zOiBbJ01pdGlnYXRlZCcsICdEZWxlZ2F0ZWQnXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2V0cyB0byBlbXB0eSBpZiBub3RoaW5nIHByb3ZpZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgdGFiLnNldEF2YWlsYWJsZUJ1bGtEZWNpc2lvbnMoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0YWIuYXZhaWxhYmxlQnVsa0RlY2lzaW9ucykudG9FcXVhbChbXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzZXRzIHRvIGEgZmlsdGVyZWQgbGlzdCBvZiBkZWNpc2lvbnMgdGhhdCBtYXRjaCBidWxrRGVjaXNpb25zIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbnMgPSBbe1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ0NlcnRpZmllZCdcbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ01pdGlnYXRlZCdcbiAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgdGFiLnNldEF2YWlsYWJsZUJ1bGtEZWNpc2lvbnMoZGVjaXNpb25zKTtcbiAgICAgICAgICAgIC8vIENlcnRpZmllZCBpc250IGRlZmluZWQgb24gdGhlIHRhYiwgYW5kIERlbGVnYXRlZCBpc250IGF2YWlsYWJsZVxuICAgICAgICAgICAgZXhwZWN0KHRhYi5hdmFpbGFibGVCdWxrRGVjaXNpb25zKS50b0VxdWFsKFtkZWNpc2lvbnNbMV1dKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
