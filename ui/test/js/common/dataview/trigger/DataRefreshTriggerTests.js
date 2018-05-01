System.register(['test/js/TestInitializer', 'common/dataview/trigger/TriggerModule'], function (_export) {
    'use strict';

    var triggerModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewTriggerTriggerModule) {
            triggerModule = _commonDataviewTriggerTriggerModule['default'];
        }],
        execute: function () {

            describe('DataRefreshTrigger', function () {
                var DataRefreshTrigger = undefined,
                    $scope = undefined;

                beforeEach(module(triggerModule));

                beforeEach(inject(function (_DataRefreshTrigger_) {
                    DataRefreshTrigger = _DataRefreshTrigger_;

                    $scope = {
                        $on: jasmine.createSpy()
                    };
                }));

                it('starts without a listener', function () {
                    var trig = new DataRefreshTrigger();
                    expect(trig.listeners.length).toEqual(0);
                });

                it('allows calling refresh without a listener', function () {
                    var trig = new DataRefreshTrigger();
                    expect(function () {
                        return trig.refresh();
                    }).not.toThrow();
                });

                it('calls the listeners when refreshing', function () {
                    var listener1 = jasmine.createSpy('listener'),
                        listener2 = jasmine.createSpy('listener2'),
                        trig = new DataRefreshTrigger();
                    trig.onRefresh(listener1, $scope);
                    trig.onRefresh(listener2, $scope);
                    trig.refresh();
                    expect(listener1).toHaveBeenCalled();
                    expect(listener2).toHaveBeenCalled();
                });

                it('does not add the same listener twice', function () {
                    var listener = jasmine.createSpy('listener'),
                        trig = new DataRefreshTrigger();
                    trig.onRefresh(listener, $scope);
                    trig.onRefresh(listener, $scope);
                    expect(trig.listeners.length).toEqual(1);
                    expect($scope.$on.calls.count()).toEqual(1);
                    trig.refresh();
                    expect(listener).toHaveBeenCalled();
                });

                it('removes a listener when the scope is destroyed', function () {
                    var listener = jasmine.createSpy('listener'),
                        trig = new DataRefreshTrigger();
                    trig.onRefresh(listener, $scope);
                    expect($scope.$on).toHaveBeenCalled();

                    var args = $scope.$on.calls.mostRecent().args;
                    expect(args[0]).toEqual('$destroy');
                    expect(angular.isFunction(args[1])).toEqual(true);

                    expect(trig.listeners.length).toEqual(1);
                    args[1]();
                    expect(trig.listeners.length).toEqual(0);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy90cmlnZ2VyL0RhdGFSZWZyZXNoVHJpZ2dlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsVUFBVSxTQUFTO0lBQ3JHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxxQ0FBcUM7WUFDM0YsZ0JBQWdCLG9DQUFvQzs7UUFFeEQsU0FBUyxZQUFZOztZQUw3QixTQUFTLHNCQUFzQixZQUFXO2dCQUN0QyxJQUFJLHFCQUFrQjtvQkFBRSxTQUFNOztnQkFFOUIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsc0JBQXNCO29CQUM3QyxxQkFBcUI7O29CQUVyQixTQUFTO3dCQUNMLEtBQUssUUFBUTs7OztnQkFJckIsR0FBRyw2QkFBNkIsWUFBVztvQkFDdkMsSUFBSSxPQUFPLElBQUk7b0JBQ2YsT0FBTyxLQUFLLFVBQVUsUUFBUSxRQUFROzs7Z0JBRzFDLEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELElBQUksT0FBTyxJQUFJO29CQUNmLE9BQU8sWUFBQTt3QkFTUyxPQVRILEtBQUs7dUJBQVcsSUFBSTs7O2dCQUdyQyxHQUFHLHVDQUF1QyxZQUFXO29CQUNqRCxJQUFJLFlBQVksUUFBUSxVQUFVO3dCQUM5QixZQUFZLFFBQVEsVUFBVTt3QkFDOUIsT0FBTyxJQUFJO29CQUNmLEtBQUssVUFBVSxXQUFXO29CQUMxQixLQUFLLFVBQVUsV0FBVztvQkFDMUIsS0FBSztvQkFDTCxPQUFPLFdBQVc7b0JBQ2xCLE9BQU8sV0FBVzs7O2dCQUd0QixHQUFHLHdDQUF3QyxZQUFXO29CQUNsRCxJQUFJLFdBQVcsUUFBUSxVQUFVO3dCQUM3QixPQUFPLElBQUk7b0JBQ2YsS0FBSyxVQUFVLFVBQVU7b0JBQ3pCLEtBQUssVUFBVSxVQUFVO29CQUN6QixPQUFPLEtBQUssVUFBVSxRQUFRLFFBQVE7b0JBQ3RDLE9BQU8sT0FBTyxJQUFJLE1BQU0sU0FBUyxRQUFRO29CQUN6QyxLQUFLO29CQUNMLE9BQU8sVUFBVTs7O2dCQUdyQixHQUFHLGtEQUFrRCxZQUFNO29CQUN2RCxJQUFJLFdBQVcsUUFBUSxVQUFVO3dCQUM3QixPQUFPLElBQUk7b0JBQ2YsS0FBSyxVQUFVLFVBQVU7b0JBQ3pCLE9BQU8sT0FBTyxLQUFLOztvQkFFbkIsSUFBSSxPQUFPLE9BQU8sSUFBSSxNQUFNLGFBQWE7b0JBQ3pDLE9BQU8sS0FBSyxJQUFJLFFBQVE7b0JBQ3hCLE9BQU8sUUFBUSxXQUFXLEtBQUssS0FBSyxRQUFROztvQkFFNUMsT0FBTyxLQUFLLFVBQVUsUUFBUSxRQUFRO29CQUN0QyxLQUFLO29CQUNMLE9BQU8sS0FBSyxVQUFVLFFBQVEsUUFBUTs7Ozs7R0FlM0MiLCJmaWxlIjoiY29tbW9uL2RhdGF2aWV3L3RyaWdnZXIvRGF0YVJlZnJlc2hUcmlnZ2VyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IHRyaWdnZXJNb2R1bGUgZnJvbSAnY29tbW9uL2RhdGF2aWV3L3RyaWdnZXIvVHJpZ2dlck1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnRGF0YVJlZnJlc2hUcmlnZ2VyJywgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgRGF0YVJlZnJlc2hUcmlnZ2VyLCAkc2NvcGU7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodHJpZ2dlck1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9EYXRhUmVmcmVzaFRyaWdnZXJfKSB7XHJcbiAgICAgICAgRGF0YVJlZnJlc2hUcmlnZ2VyID0gX0RhdGFSZWZyZXNoVHJpZ2dlcl87XHJcblxyXG4gICAgICAgICRzY29wZSA9IHtcclxuICAgICAgICAgICAgJG9uOiBqYXNtaW5lLmNyZWF0ZVNweSgpXHJcbiAgICAgICAgfTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBpdCgnc3RhcnRzIHdpdGhvdXQgYSBsaXN0ZW5lcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCB0cmlnID0gbmV3IERhdGFSZWZyZXNoVHJpZ2dlcigpO1xyXG4gICAgICAgIGV4cGVjdCh0cmlnLmxpc3RlbmVycy5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnYWxsb3dzIGNhbGxpbmcgcmVmcmVzaCB3aXRob3V0IGEgbGlzdGVuZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgdHJpZyA9IG5ldyBEYXRhUmVmcmVzaFRyaWdnZXIoKTtcclxuICAgICAgICBleHBlY3QoKCkgPT4gdHJpZy5yZWZyZXNoKCkpLm5vdC50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnY2FsbHMgdGhlIGxpc3RlbmVycyB3aGVuIHJlZnJlc2hpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgbGlzdGVuZXIxID0gamFzbWluZS5jcmVhdGVTcHkoJ2xpc3RlbmVyJyksXHJcbiAgICAgICAgICAgIGxpc3RlbmVyMiA9IGphc21pbmUuY3JlYXRlU3B5KCdsaXN0ZW5lcjInKSxcclxuICAgICAgICAgICAgdHJpZyA9IG5ldyBEYXRhUmVmcmVzaFRyaWdnZXIoKTtcclxuICAgICAgICB0cmlnLm9uUmVmcmVzaChsaXN0ZW5lcjEsICRzY29wZSk7XHJcbiAgICAgICAgdHJpZy5vblJlZnJlc2gobGlzdGVuZXIyLCAkc2NvcGUpO1xyXG4gICAgICAgIHRyaWcucmVmcmVzaCgpO1xyXG4gICAgICAgIGV4cGVjdChsaXN0ZW5lcjEpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICBleHBlY3QobGlzdGVuZXIyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZG9lcyBub3QgYWRkIHRoZSBzYW1lIGxpc3RlbmVyIHR3aWNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGxpc3RlbmVyID0gamFzbWluZS5jcmVhdGVTcHkoJ2xpc3RlbmVyJyksXHJcbiAgICAgICAgICAgIHRyaWcgPSBuZXcgRGF0YVJlZnJlc2hUcmlnZ2VyKCk7XHJcbiAgICAgICAgdHJpZy5vblJlZnJlc2gobGlzdGVuZXIsICRzY29wZSk7XHJcbiAgICAgICAgdHJpZy5vblJlZnJlc2gobGlzdGVuZXIsICRzY29wZSk7XHJcbiAgICAgICAgZXhwZWN0KHRyaWcubGlzdGVuZXJzLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICBleHBlY3QoJHNjb3BlLiRvbi5jYWxscy5jb3VudCgpKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIHRyaWcucmVmcmVzaCgpO1xyXG4gICAgICAgIGV4cGVjdChsaXN0ZW5lcikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JlbW92ZXMgYSBsaXN0ZW5lciB3aGVuIHRoZSBzY29wZSBpcyBkZXN0cm95ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGxpc3RlbmVyID0gamFzbWluZS5jcmVhdGVTcHkoJ2xpc3RlbmVyJyksXHJcbiAgICAgICAgICAgIHRyaWcgPSBuZXcgRGF0YVJlZnJlc2hUcmlnZ2VyKCk7XHJcbiAgICAgICAgdHJpZy5vblJlZnJlc2gobGlzdGVuZXIsICRzY29wZSk7XHJcbiAgICAgICAgZXhwZWN0KCRzY29wZS4kb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuXHJcbiAgICAgICAgbGV0IGFyZ3MgPSAkc2NvcGUuJG9uLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xyXG4gICAgICAgIGV4cGVjdChhcmdzWzBdKS50b0VxdWFsKCckZGVzdHJveScpO1xyXG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmlzRnVuY3Rpb24oYXJnc1sxXSkpLnRvRXF1YWwodHJ1ZSk7XHJcblxyXG4gICAgICAgIGV4cGVjdCh0cmlnLmxpc3RlbmVycy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgYXJnc1sxXSgpO1xyXG4gICAgICAgIGV4cGVjdCh0cmlnLmxpc3RlbmVycy5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
