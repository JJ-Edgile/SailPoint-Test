System.register(['test/js/TestInitializer', 'common/widget/WidgetModule'], function (_export) {
    'use strict';

    var widgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonWidgetWidgetModule) {
            widgetModule = _commonWidgetWidgetModule['default'];
        }],
        execute: function () {

            describe('PromiseTrackerService', function () {
                var $scope, $q, tracker;

                beforeEach(module(widgetModule, function ($qProvider) {
                    // we want to test rejections here, allow them through!
                    $qProvider.errorOnUnhandledRejections(false);
                }));

                beforeEach(inject(function (_$q_, _$rootScope_, _promiseTrackerService_) {
                    $q = _$q_;
                    $scope = _$rootScope_;
                    tracker = _promiseTrackerService_;
                }));

                describe('tracking a single promise', function () {
                    var deferred;
                    beforeEach(function () {
                        deferred = $q.defer();
                        tracker.track(deferred.promise);
                    });

                    it('should stay in progress as while promise is unresolved', function () {
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(true);
                    });

                    it('should not be in progress when promise is resolved', function () {
                        deferred.resolve('someValue');
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(false);
                    });

                    it('should not be in progress when promise is rejected', function () {
                        deferred.reject('someOtherValue');
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(false);
                    });
                });

                describe('tracking multiple promises', function () {
                    var deferred1, deferred2, deferred3;

                    beforeEach(function () {
                        deferred1 = $q.defer();
                        deferred2 = $q.defer();
                        deferred3 = $q.defer();
                        tracker.track(deferred1.promise);
                        tracker.track(deferred2.promise);
                        tracker.track(deferred3.promise);
                    });

                    it('should be in progress if all items are unresolved', function () {
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(true);
                    });

                    it('should be in progress if some items are resolved', function () {
                        deferred2.resolve('resolving number two');
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(true);
                    });

                    it('should be in progress if some items are rejected', function () {
                        deferred3.reject('rejecting number three');
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(true);
                    });

                    it('should be in progress if some items are rejected and ' + 'some are resolved but at least one is still in progress', function () {
                        deferred1.reject('rejecting number one');
                        deferred3.resolve('resolving number three');
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(true);
                    });

                    it('should not be in progress if all items are resolved', function () {
                        deferred1.resolve('resolving number one');
                        deferred2.resolve('resolving number two');
                        deferred3.resolve('resolving number three');
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(false);
                    });

                    it('should not be in progress if all items are rejected', function () {
                        deferred1.reject('rejecting number one');
                        deferred2.reject('rejecting number two');
                        deferred3.reject('rejecting number three');
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(false);
                    });

                    it('should not be in progress if all items are resolved or rejected', function () {
                        deferred1.reject('rejecting number one');
                        deferred2.resolve('resolved number two');
                        deferred3.reject('rejecting number three');
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(false);
                    });

                    it('should correctly handle resolution over multiple digest loops', function () {
                        deferred1.reject('rejecting number one');
                        deferred2.resolve('resolved number two');
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(true);
                        deferred3.reject('rejecting number three');
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(false);
                    });

                    it('should handle promises being added while other promises are resolving', function () {
                        var deferred4 = new $q.defer();
                        deferred1.reject('rejecting number one');
                        deferred2.resolve('resolved number two');
                        $scope.$apply();
                        tracker.track(deferred4.promise);
                        deferred3.resolve('blah blah');
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(true);
                        deferred4.resolve('bleh bleh');
                        $scope.$apply();
                        expect(tracker.isInProgress()).toBe(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93aWRnZXQvUHJvbWlzZVRyYWNrZXJTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLCtCQUErQixVQUFVLFNBQVM7SUFBOUY7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJCQUEyQjtZQUNqRixlQUFlLDBCQUEwQjs7UUFFN0MsU0FBUyxZQUFZOztZQUg3QixTQUFTLHlCQUF5QixZQUFXO2dCQUN6QyxJQUFJLFFBQVEsSUFBSTs7Z0JBRWhCLFdBQVcsT0FBTyxjQUFjLFVBQUMsWUFBZTs7b0JBRTVDLFdBQVcsMkJBQTJCOzs7Z0JBRzFDLFdBQVcsT0FBTyxVQUFTLE1BQU0sY0FBYyx5QkFBeUI7b0JBQ3BFLEtBQUs7b0JBQ0wsU0FBUztvQkFDVCxVQUFVOzs7Z0JBR2QsU0FBUyw2QkFBNkIsWUFBVztvQkFDN0MsSUFBSTtvQkFDSixXQUFXLFlBQVc7d0JBQ2xCLFdBQVcsR0FBRzt3QkFDZCxRQUFRLE1BQU0sU0FBUzs7O29CQUczQixHQUFHLDBEQUEwRCxZQUFXO3dCQUNwRSxPQUFPO3dCQUNQLE9BQU8sUUFBUSxnQkFBZ0IsS0FBSzs7O29CQUd4QyxHQUFHLHNEQUFzRCxZQUFXO3dCQUNoRSxTQUFTLFFBQVE7d0JBQ2pCLE9BQU87d0JBQ1AsT0FBTyxRQUFRLGdCQUFnQixLQUFLOzs7b0JBR3hDLEdBQUcsc0RBQXNELFlBQVc7d0JBQ2hFLFNBQVMsT0FBTzt3QkFDaEIsT0FBTzt3QkFDUCxPQUFPLFFBQVEsZ0JBQWdCLEtBQUs7Ozs7Z0JBSTVDLFNBQVMsOEJBQThCLFlBQVc7b0JBQzlDLElBQUksV0FDQSxXQUNBOztvQkFFSixXQUFXLFlBQVc7d0JBQ2xCLFlBQVksR0FBRzt3QkFDZixZQUFZLEdBQUc7d0JBQ2YsWUFBWSxHQUFHO3dCQUNmLFFBQVEsTUFBTSxVQUFVO3dCQUN4QixRQUFRLE1BQU0sVUFBVTt3QkFDeEIsUUFBUSxNQUFNLFVBQVU7OztvQkFHNUIsR0FBRyxxREFBcUQsWUFBVzt3QkFDL0QsT0FBTzt3QkFDUCxPQUFPLFFBQVEsZ0JBQWdCLEtBQUs7OztvQkFHeEMsR0FBRyxvREFBb0QsWUFBVzt3QkFDOUQsVUFBVSxRQUFRO3dCQUNsQixPQUFPO3dCQUNQLE9BQU8sUUFBUSxnQkFBZ0IsS0FBSzs7O29CQUd4QyxHQUFHLG9EQUFvRCxZQUFXO3dCQUM5RCxVQUFVLE9BQU87d0JBQ2pCLE9BQU87d0JBQ1AsT0FBTyxRQUFRLGdCQUFnQixLQUFLOzs7b0JBR3hDLEdBQUcsMERBQ0MsMkRBQTJELFlBQVc7d0JBQ3RFLFVBQVUsT0FBTzt3QkFDakIsVUFBVSxRQUFRO3dCQUNsQixPQUFPO3dCQUNQLE9BQU8sUUFBUSxnQkFBZ0IsS0FBSzs7O29CQUd4QyxHQUFHLHVEQUF1RCxZQUFXO3dCQUNqRSxVQUFVLFFBQVE7d0JBQ2xCLFVBQVUsUUFBUTt3QkFDbEIsVUFBVSxRQUFRO3dCQUNsQixPQUFPO3dCQUNQLE9BQU8sUUFBUSxnQkFBZ0IsS0FBSzs7O29CQUl4QyxHQUFHLHVEQUF1RCxZQUFXO3dCQUNqRSxVQUFVLE9BQU87d0JBQ2pCLFVBQVUsT0FBTzt3QkFDakIsVUFBVSxPQUFPO3dCQUNqQixPQUFPO3dCQUNQLE9BQU8sUUFBUSxnQkFBZ0IsS0FBSzs7O29CQUd4QyxHQUFHLG1FQUFtRSxZQUFXO3dCQUM3RSxVQUFVLE9BQU87d0JBQ2pCLFVBQVUsUUFBUTt3QkFDbEIsVUFBVSxPQUFPO3dCQUNqQixPQUFPO3dCQUNQLE9BQU8sUUFBUSxnQkFBZ0IsS0FBSzs7O29CQUd4QyxHQUFHLGlFQUFpRSxZQUFXO3dCQUMzRSxVQUFVLE9BQU87d0JBQ2pCLFVBQVUsUUFBUTt3QkFDbEIsT0FBTzt3QkFDUCxPQUFPLFFBQVEsZ0JBQWdCLEtBQUs7d0JBQ3BDLFVBQVUsT0FBTzt3QkFDakIsT0FBTzt3QkFDUCxPQUFPLFFBQVEsZ0JBQWdCLEtBQUs7OztvQkFHeEMsR0FBRyx5RUFBeUUsWUFBVzt3QkFDbkYsSUFBSSxZQUFZLElBQUksR0FBRzt3QkFDdkIsVUFBVSxPQUFPO3dCQUNqQixVQUFVLFFBQVE7d0JBQ2xCLE9BQU87d0JBQ1AsUUFBUSxNQUFNLFVBQVU7d0JBQ3hCLFVBQVUsUUFBUTt3QkFDbEIsT0FBTzt3QkFDUCxPQUFPLFFBQVEsZ0JBQWdCLEtBQUs7d0JBQ3BDLFVBQVUsUUFBUTt3QkFDbEIsT0FBTzt3QkFDUCxPQUFPLFFBQVEsZ0JBQWdCLEtBQUs7Ozs7OztHQU83QyIsImZpbGUiOiJjb21tb24vd2lkZ2V0L1Byb21pc2VUcmFja2VyU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3aWRnZXRNb2R1bGUgZnJvbSAnY29tbW9uL3dpZGdldC9XaWRnZXRNb2R1bGUnO1xuXG5kZXNjcmliZSgnUHJvbWlzZVRyYWNrZXJTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRzY29wZSwgJHEsIHRyYWNrZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3aWRnZXRNb2R1bGUsICgkcVByb3ZpZGVyKSA9PiB7XG4gICAgICAgIC8vIHdlIHdhbnQgdG8gdGVzdCByZWplY3Rpb25zIGhlcmUsIGFsbG93IHRoZW0gdGhyb3VnaCFcbiAgICAgICAgJHFQcm92aWRlci5lcnJvck9uVW5oYW5kbGVkUmVqZWN0aW9ucyhmYWxzZSk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRxXywgXyRyb290U2NvcGVfLCBfcHJvbWlzZVRyYWNrZXJTZXJ2aWNlXykge1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgdHJhY2tlciA9IF9wcm9taXNlVHJhY2tlclNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCd0cmFja2luZyBhIHNpbmdsZSBwcm9taXNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZDtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIHRyYWNrZXIudHJhY2soZGVmZXJyZWQucHJvbWlzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc3RheSBpbiBwcm9ncmVzcyBhcyB3aGlsZSBwcm9taXNlIGlzIHVucmVzb2x2ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0cmFja2VyLmlzSW5Qcm9ncmVzcygpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBiZSBpbiBwcm9ncmVzcyB3aGVuIHByb21pc2UgaXMgcmVzb2x2ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoJ3NvbWVWYWx1ZScpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaXNJblByb2dyZXNzKCkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBiZSBpbiBwcm9ncmVzcyB3aGVuIHByb21pc2UgaXMgcmVqZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnc29tZU90aGVyVmFsdWUnKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0cmFja2VyLmlzSW5Qcm9ncmVzcygpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndHJhY2tpbmcgbXVsdGlwbGUgcHJvbWlzZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkMSxcbiAgICAgICAgICAgIGRlZmVycmVkMixcbiAgICAgICAgICAgIGRlZmVycmVkMztcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVmZXJyZWQxID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIGRlZmVycmVkMiA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICBkZWZlcnJlZDMgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgdHJhY2tlci50cmFjayhkZWZlcnJlZDEucHJvbWlzZSk7XG4gICAgICAgICAgICB0cmFja2VyLnRyYWNrKGRlZmVycmVkMi5wcm9taXNlKTtcbiAgICAgICAgICAgIHRyYWNrZXIudHJhY2soZGVmZXJyZWQzLnByb21pc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIGluIHByb2dyZXNzIGlmIGFsbCBpdGVtcyBhcmUgdW5yZXNvbHZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaXNJblByb2dyZXNzKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgaW4gcHJvZ3Jlc3MgaWYgc29tZSBpdGVtcyBhcmUgcmVzb2x2ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlZmVycmVkMi5yZXNvbHZlKCdyZXNvbHZpbmcgbnVtYmVyIHR3bycpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaXNJblByb2dyZXNzKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgaW4gcHJvZ3Jlc3MgaWYgc29tZSBpdGVtcyBhcmUgcmVqZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlZmVycmVkMy5yZWplY3QoJ3JlamVjdGluZyBudW1iZXIgdGhyZWUnKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0cmFja2VyLmlzSW5Qcm9ncmVzcygpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIGluIHByb2dyZXNzIGlmIHNvbWUgaXRlbXMgYXJlIHJlamVjdGVkIGFuZCAnICtcbiAgICAgICAgICAgICdzb21lIGFyZSByZXNvbHZlZCBidXQgYXQgbGVhc3Qgb25lIGlzIHN0aWxsIGluIHByb2dyZXNzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWZlcnJlZDEucmVqZWN0KCdyZWplY3RpbmcgbnVtYmVyIG9uZScpO1xuICAgICAgICAgICAgZGVmZXJyZWQzLnJlc29sdmUoJ3Jlc29sdmluZyBudW1iZXIgdGhyZWUnKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0cmFja2VyLmlzSW5Qcm9ncmVzcygpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBiZSBpbiBwcm9ncmVzcyBpZiBhbGwgaXRlbXMgYXJlIHJlc29sdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWZlcnJlZDEucmVzb2x2ZSgncmVzb2x2aW5nIG51bWJlciBvbmUnKTtcbiAgICAgICAgICAgIGRlZmVycmVkMi5yZXNvbHZlKCdyZXNvbHZpbmcgbnVtYmVyIHR3bycpO1xuICAgICAgICAgICAgZGVmZXJyZWQzLnJlc29sdmUoJ3Jlc29sdmluZyBudW1iZXIgdGhyZWUnKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0cmFja2VyLmlzSW5Qcm9ncmVzcygpKS50b0JlKGZhbHNlKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBiZSBpbiBwcm9ncmVzcyBpZiBhbGwgaXRlbXMgYXJlIHJlamVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWZlcnJlZDEucmVqZWN0KCdyZWplY3RpbmcgbnVtYmVyIG9uZScpO1xuICAgICAgICAgICAgZGVmZXJyZWQyLnJlamVjdCgncmVqZWN0aW5nIG51bWJlciB0d28nKTtcbiAgICAgICAgICAgIGRlZmVycmVkMy5yZWplY3QoJ3JlamVjdGluZyBudW1iZXIgdGhyZWUnKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0cmFja2VyLmlzSW5Qcm9ncmVzcygpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgYmUgaW4gcHJvZ3Jlc3MgaWYgYWxsIGl0ZW1zIGFyZSByZXNvbHZlZCBvciByZWplY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVmZXJyZWQxLnJlamVjdCgncmVqZWN0aW5nIG51bWJlciBvbmUnKTtcbiAgICAgICAgICAgIGRlZmVycmVkMi5yZXNvbHZlKCdyZXNvbHZlZCBudW1iZXIgdHdvJyk7XG4gICAgICAgICAgICBkZWZlcnJlZDMucmVqZWN0KCdyZWplY3RpbmcgbnVtYmVyIHRocmVlJyk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QodHJhY2tlci5pc0luUHJvZ3Jlc3MoKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IGhhbmRsZSByZXNvbHV0aW9uIG92ZXIgbXVsdGlwbGUgZGlnZXN0IGxvb3BzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWZlcnJlZDEucmVqZWN0KCdyZWplY3RpbmcgbnVtYmVyIG9uZScpO1xuICAgICAgICAgICAgZGVmZXJyZWQyLnJlc29sdmUoJ3Jlc29sdmVkIG51bWJlciB0d28nKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0cmFja2VyLmlzSW5Qcm9ncmVzcygpKS50b0JlKHRydWUpO1xuICAgICAgICAgICAgZGVmZXJyZWQzLnJlamVjdCgncmVqZWN0aW5nIG51bWJlciB0aHJlZScpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaXNJblByb2dyZXNzKCkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhbmRsZSBwcm9taXNlcyBiZWluZyBhZGRlZCB3aGlsZSBvdGhlciBwcm9taXNlcyBhcmUgcmVzb2x2aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQ0ID0gbmV3ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICBkZWZlcnJlZDEucmVqZWN0KCdyZWplY3RpbmcgbnVtYmVyIG9uZScpO1xuICAgICAgICAgICAgZGVmZXJyZWQyLnJlc29sdmUoJ3Jlc29sdmVkIG51bWJlciB0d28nKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIHRyYWNrZXIudHJhY2soZGVmZXJyZWQ0LnByb21pc2UpO1xuICAgICAgICAgICAgZGVmZXJyZWQzLnJlc29sdmUoJ2JsYWggYmxhaCcpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaXNJblByb2dyZXNzKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICBkZWZlcnJlZDQucmVzb2x2ZSgnYmxlaCBibGVoJyk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QodHJhY2tlci5pc0luUHJvZ3Jlc3MoKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
