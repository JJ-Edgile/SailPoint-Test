System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationItemStatusCount', function () {
                var CertificationItemStatusCount = undefined,
                    CertificationItem = undefined,
                    certificationTestData = undefined,
                    smallerCountData = {
                    Bundle: {
                        Open: 5,
                        Complete: 3
                    },
                    Exception: {
                        Open: 2,
                        Returned: 9
                    }
                };

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationItemStatusCount_, _certificationTestData_, _CertificationItem_) {
                    CertificationItemStatusCount = _CertificationItemStatusCount_;
                    CertificationItem = _CertificationItem_;
                    certificationTestData = _certificationTestData_;
                }));

                describe('init', function () {
                    it('should initialize with provided data and getter functional', function () {
                        var data = certificationTestData.CERTIFICATION_1.itemStatusCount,
                            cisc = new CertificationItemStatusCount(data);

                        // Make sure all counts are defined
                        expect(cisc.counts).toBeDefined();
                        for (var type in CertificationItem.Type) {
                            if (CertificationItem.Type.hasOwnProperty(type)) {
                                for (var _status in CertificationItem.Status) {
                                    if (CertificationItem.Status.hasOwnProperty(_status)) {
                                        expect(cisc.counts[type][_status]).toBeDefined();
                                    }
                                }
                            }
                        }

                        // Spot check some numbers
                        expect(cisc.getCount('PolicyViolation', 'Complete')).toEqual(53);
                        expect(cisc.getCount('Bundle', 'Challenged')).toEqual(13);
                        expect(cisc.getCount('Exception', 'Open')).toEqual(21);

                        // 0 for undefined status or type
                        expect(cisc.getCount('PolicyViolation', 'bogus')).toEqual(0);
                        expect(cisc.getCount('blarney', 'Open')).toEqual(0);
                    });

                    it('should throw with bad type key', function () {
                        expect(function () {
                            var data = { counts: { bogus: { Complete: 1 } } };
                            new CertificationItemStatusCount(data);
                        }).toThrow();
                    });

                    it('should throw with bad status key', function () {
                        expect(function () {
                            var data = { counts: { Bundle: { bogus: 1 } } };
                            new CertificationItemStatusCount(data);
                        }).toThrow();
                    });
                });

                it('getTotalCount() returns the count for all types and statuses', function () {
                    var counts = new CertificationItemStatusCount(smallerCountData);
                    expect(counts.getTotalCount()).toEqual(19);
                });

                it('getCompleteCount() returns the number of completed items', function () {
                    var counts = new CertificationItemStatusCount(smallerCountData);
                    expect(counts.getCompleteCount()).toEqual(3);
                });

                it('getIncompleteCount() returns the number of incomplete items', function () {
                    var counts = new CertificationItemStatusCount(smallerCountData);
                    expect(counts.getIncompleteCount()).toEqual(16);
                });

                describe('getCountForStatus()', function () {
                    it('returns the count for the status across all types', function () {
                        var counts = new CertificationItemStatusCount(smallerCountData);
                        var count = counts.getCountForStatus('Open');
                        expect(count).toEqual(7);
                    });

                    it('returns 0 if there are no types with the status', function () {
                        var counts = new CertificationItemStatusCount(smallerCountData);
                        var count = counts.getCountForStatus('NotReallyAStatus');
                        expect(count).toEqual(0);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkl0ZW1TdGF0dXNDb3VudFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7SUFLN0g7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyxnQ0FBZ0MsWUFBVztnQkFDaEQsSUFBSSwrQkFBNEI7b0JBQUUsb0JBQWlCO29CQUFFLHdCQUFxQjtvQkFDdEUsbUJBQW1CO29CQUNmLFFBQVE7d0JBQ0osTUFBTTt3QkFDTixVQUFVOztvQkFFZCxXQUFXO3dCQUNQLE1BQU07d0JBQ04sVUFBVTs7OztnQkFJdEIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsZ0NBQWdDLHlCQUF5QixxQkFBcUI7b0JBQ3JHLCtCQUErQjtvQkFDL0Isb0JBQW9CO29CQUNwQix3QkFBd0I7OztnQkFHNUIsU0FBUyxRQUFRLFlBQVc7b0JBQ3hCLEdBQUcsOERBQThELFlBQVc7d0JBQ3hFLElBQUksT0FBTyxzQkFBc0IsZ0JBQWdCOzRCQUM3QyxPQUFPLElBQUksNkJBQTZCOzs7d0JBRzVDLE9BQU8sS0FBSyxRQUFRO3dCQUNwQixLQUFLLElBQUksUUFBUSxrQkFBa0IsTUFBTTs0QkFDckMsSUFBSSxrQkFBa0IsS0FBSyxlQUFlLE9BQU87Z0NBQzdDLEtBQUssSUFBSSxXQUFVLGtCQUFrQixRQUFRO29DQUN6QyxJQUFJLGtCQUFrQixPQUFPLGVBQWUsVUFBUzt3Q0FDakQsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFTOzs7Ozs7O3dCQU9sRCxPQUFPLEtBQUssU0FBUyxtQkFBbUIsYUFBYSxRQUFRO3dCQUM3RCxPQUFPLEtBQUssU0FBUyxVQUFVLGVBQWUsUUFBUTt3QkFDdEQsT0FBTyxLQUFLLFNBQVMsYUFBYSxTQUFTLFFBQVE7Ozt3QkFHbkQsT0FBTyxLQUFLLFNBQVMsbUJBQW1CLFVBQVUsUUFBUTt3QkFDMUQsT0FBTyxLQUFLLFNBQVMsV0FBVyxTQUFTLFFBQVE7OztvQkFHckQsR0FBRyxrQ0FBa0MsWUFBVzt3QkFDNUMsT0FBTyxZQUFXOzRCQUNkLElBQUksT0FBTyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsVUFBVTs0QkFDdkMsSUFBSSw2QkFBNkI7MkJBQ2xDOzs7b0JBR1AsR0FBRyxvQ0FBb0MsWUFBVzt3QkFDOUMsT0FBTyxZQUFXOzRCQUNkLElBQUksT0FBTyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsT0FBTzs0QkFDckMsSUFBSSw2QkFBNkI7MkJBQ2xDOzs7O2dCQUlYLEdBQUcsZ0VBQWdFLFlBQU07b0JBQ3JFLElBQUksU0FBUyxJQUFJLDZCQUE2QjtvQkFDOUMsT0FBTyxPQUFPLGlCQUFpQixRQUFROzs7Z0JBRzNDLEdBQUcsNERBQTRELFlBQU07b0JBQ2pFLElBQUksU0FBUyxJQUFJLDZCQUE2QjtvQkFDOUMsT0FBTyxPQUFPLG9CQUFvQixRQUFROzs7Z0JBRzlDLEdBQUcsK0RBQStELFlBQU07b0JBQ3BFLElBQUksU0FBUyxJQUFJLDZCQUE2QjtvQkFDOUMsT0FBTyxPQUFPLHNCQUFzQixRQUFROzs7Z0JBR2hELFNBQVMsdUJBQXVCLFlBQU07b0JBQ2xDLEdBQUcscURBQXFELFlBQU07d0JBQzFELElBQUksU0FBUyxJQUFJLDZCQUE2Qjt3QkFDOUMsSUFBSSxRQUFRLE9BQU8sa0JBQWtCO3dCQUNyQyxPQUFPLE9BQU8sUUFBUTs7O29CQUcxQixHQUFHLG1EQUFtRCxZQUFNO3dCQUN4RCxJQUFJLFNBQVMsSUFBSSw2QkFBNkI7d0JBQzlDLElBQUksUUFBUSxPQUFPLGtCQUFrQjt3QkFDckMsT0FBTyxPQUFPLFFBQVE7Ozs7OztHQWMvQiIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL21vZGVsL0NlcnRpZmljYXRpb25JdGVtU3RhdHVzQ291bnRUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICcuLi9DZXJ0aWZpY2F0aW9uVGVzdERhdGEnO1xuXG5kZXNjcmliZSgnQ2VydGlmaWNhdGlvbkl0ZW1TdGF0dXNDb3VudCcsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBDZXJ0aWZpY2F0aW9uSXRlbVN0YXR1c0NvdW50LCBDZXJ0aWZpY2F0aW9uSXRlbSwgY2VydGlmaWNhdGlvblRlc3REYXRhLFxuICAgICAgICBzbWFsbGVyQ291bnREYXRhID0ge1xuICAgICAgICAgICAgQnVuZGxlOiB7XG4gICAgICAgICAgICAgICAgT3BlbjogNSxcbiAgICAgICAgICAgICAgICBDb21wbGV0ZTogM1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEV4Y2VwdGlvbjoge1xuICAgICAgICAgICAgICAgIE9wZW46IDIsXG4gICAgICAgICAgICAgICAgUmV0dXJuZWQ6IDlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9DZXJ0aWZpY2F0aW9uSXRlbVN0YXR1c0NvdW50XywgX2NlcnRpZmljYXRpb25UZXN0RGF0YV8sIF9DZXJ0aWZpY2F0aW9uSXRlbV8pIHtcbiAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW1TdGF0dXNDb3VudCA9IF9DZXJ0aWZpY2F0aW9uSXRlbVN0YXR1c0NvdW50XztcbiAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0gPSBfQ2VydGlmaWNhdGlvbkl0ZW1fO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uVGVzdERhdGEgPSBfY2VydGlmaWNhdGlvblRlc3REYXRhXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnaW5pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2l0aCBwcm92aWRlZCBkYXRhIGFuZCBnZXR0ZXIgZnVuY3Rpb25hbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVElGSUNBVElPTl8xLml0ZW1TdGF0dXNDb3VudCxcbiAgICAgICAgICAgICAgICBjaXNjID0gbmV3IENlcnRpZmljYXRpb25JdGVtU3RhdHVzQ291bnQoZGF0YSk7XG5cbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSBhbGwgY291bnRzIGFyZSBkZWZpbmVkXG4gICAgICAgICAgICBleHBlY3QoY2lzYy5jb3VudHMpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBmb3IgKGxldCB0eXBlIGluIENlcnRpZmljYXRpb25JdGVtLlR5cGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBzdGF0dXMgaW4gQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLmhhc093blByb3BlcnR5KHN0YXR1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlY3QoY2lzYy5jb3VudHNbdHlwZV1bc3RhdHVzXSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU3BvdCBjaGVjayBzb21lIG51bWJlcnNcbiAgICAgICAgICAgIGV4cGVjdChjaXNjLmdldENvdW50KCdQb2xpY3lWaW9sYXRpb24nLCAnQ29tcGxldGUnKSkudG9FcXVhbCg1Myk7XG4gICAgICAgICAgICBleHBlY3QoY2lzYy5nZXRDb3VudCgnQnVuZGxlJywgJ0NoYWxsZW5nZWQnKSkudG9FcXVhbCgxMyk7XG4gICAgICAgICAgICBleHBlY3QoY2lzYy5nZXRDb3VudCgnRXhjZXB0aW9uJywgJ09wZW4nKSkudG9FcXVhbCgyMSk7XG5cbiAgICAgICAgICAgIC8vIDAgZm9yIHVuZGVmaW5lZCBzdGF0dXMgb3IgdHlwZVxuICAgICAgICAgICAgZXhwZWN0KGNpc2MuZ2V0Q291bnQoJ1BvbGljeVZpb2xhdGlvbicsICdib2d1cycpKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgZXhwZWN0KGNpc2MuZ2V0Q291bnQoJ2JsYXJuZXknLCAnT3BlbicpKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggYmFkIHR5cGUga2V5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB7Y291bnRzOiB7Ym9ndXM6IHtDb21wbGV0ZTogMX19fTtcbiAgICAgICAgICAgICAgICBuZXcgQ2VydGlmaWNhdGlvbkl0ZW1TdGF0dXNDb3VudChkYXRhKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIGJhZCBzdGF0dXMga2V5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB7Y291bnRzOiB7QnVuZGxlOiB7Ym9ndXM6IDF9fX07XG4gICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb25JdGVtU3RhdHVzQ291bnQoZGF0YSk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2dldFRvdGFsQ291bnQoKSByZXR1cm5zIHRoZSBjb3VudCBmb3IgYWxsIHR5cGVzIGFuZCBzdGF0dXNlcycsICgpID0+IHtcbiAgICAgICAgbGV0IGNvdW50cyA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbVN0YXR1c0NvdW50KHNtYWxsZXJDb3VudERhdGEpO1xuICAgICAgICBleHBlY3QoY291bnRzLmdldFRvdGFsQ291bnQoKSkudG9FcXVhbCgxOSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZ2V0Q29tcGxldGVDb3VudCgpIHJldHVybnMgdGhlIG51bWJlciBvZiBjb21wbGV0ZWQgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBjb3VudHMgPSBuZXcgQ2VydGlmaWNhdGlvbkl0ZW1TdGF0dXNDb3VudChzbWFsbGVyQ291bnREYXRhKTtcbiAgICAgICAgZXhwZWN0KGNvdW50cy5nZXRDb21wbGV0ZUNvdW50KCkpLnRvRXF1YWwoMyk7XG4gICAgfSk7XG5cbiAgICBpdCgnZ2V0SW5jb21wbGV0ZUNvdW50KCkgcmV0dXJucyB0aGUgbnVtYmVyIG9mIGluY29tcGxldGUgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBjb3VudHMgPSBuZXcgQ2VydGlmaWNhdGlvbkl0ZW1TdGF0dXNDb3VudChzbWFsbGVyQ291bnREYXRhKTtcbiAgICAgICAgZXhwZWN0KGNvdW50cy5nZXRJbmNvbXBsZXRlQ291bnQoKSkudG9FcXVhbCgxNik7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Q291bnRGb3JTdGF0dXMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIGNvdW50IGZvciB0aGUgc3RhdHVzIGFjcm9zcyBhbGwgdHlwZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY291bnRzID0gbmV3IENlcnRpZmljYXRpb25JdGVtU3RhdHVzQ291bnQoc21hbGxlckNvdW50RGF0YSk7XG4gICAgICAgICAgICBsZXQgY291bnQgPSBjb3VudHMuZ2V0Q291bnRGb3JTdGF0dXMoJ09wZW4nKTtcbiAgICAgICAgICAgIGV4cGVjdChjb3VudCkudG9FcXVhbCg3KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgMCBpZiB0aGVyZSBhcmUgbm8gdHlwZXMgd2l0aCB0aGUgc3RhdHVzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvdW50cyA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbVN0YXR1c0NvdW50KHNtYWxsZXJDb3VudERhdGEpO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gY291bnRzLmdldENvdW50Rm9yU3RhdHVzKCdOb3RSZWFsbHlBU3RhdHVzJyk7XG4gICAgICAgICAgICBleHBlY3QoY291bnQpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
