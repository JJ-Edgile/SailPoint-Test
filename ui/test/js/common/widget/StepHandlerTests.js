System.register(['common/widget/StepHandler'], function (_export) {

    /**
     * Tests for StepHandler "interface". Not much to test, just make sure things are defined
     * and that they throw, since we expect sub classes to implement all the methods.
     */
    'use strict';

    var StepHandler;
    return {
        setters: [function (_commonWidgetStepHandler) {
            StepHandler = _commonWidgetStepHandler['default'];
        }],
        execute: function () {
            describe('StepHandler', function () {
                var stepHandler;

                beforeEach(function () {
                    stepHandler = new StepHandler();
                });

                it('should define getTitle function', function () {
                    expect(stepHandler.getTitle).toBeDefined();
                    expect(function () {
                        stepHandler.getTitle();
                    }).toThrow();
                });

                it('should define getStepId function', function () {
                    expect(stepHandler.getStepId).toBeDefined();
                    expect(function () {
                        stepHandler.getStepId();
                    }).toThrow();
                });

                it('should define isSaveDisabled function', function () {
                    expect(stepHandler.isSaveDisabled).toBeDefined();
                    expect(function () {
                        stepHandler.isSaveDisabled();
                    }).toThrow();
                });

                it('should define getSaveButtonLabel function', function () {
                    expect(stepHandler.getSaveButtonLabel).toBeDefined();
                    expect(function () {
                        stepHandler.getSaveButtonLabel();
                    }).toThrow();
                });

                it('should define save function', function () {
                    expect(stepHandler.save).toBeDefined();
                    expect(function () {
                        stepHandler.save();
                    }).toThrow();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93aWRnZXQvU3RlcEhhbmRsZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQyw4QkFBOEIsVUFBVSxTQUFTOzs7Ozs7SUFBbEU7O0lBUUksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSwwQkFBMEI7WUFDMUMsY0FBYyx5QkFBeUI7O1FBRTNDLFNBQVMsWUFBWTtZQUw3QixTQUFTLGVBQWUsWUFBVztnQkFDL0IsSUFBSTs7Z0JBRUosV0FBVyxZQUFXO29CQUNsQixjQUFjLElBQUk7OztnQkFHdEIsR0FBSSxtQ0FBbUMsWUFBVztvQkFDOUMsT0FBTyxZQUFZLFVBQVU7b0JBQzdCLE9BQU8sWUFBVzt3QkFBRSxZQUFZO3VCQUFlOzs7Z0JBR25ELEdBQUksb0NBQW9DLFlBQVc7b0JBQy9DLE9BQU8sWUFBWSxXQUFXO29CQUM5QixPQUFPLFlBQVc7d0JBQUUsWUFBWTt1QkFBZ0I7OztnQkFHcEQsR0FBSSx5Q0FBeUMsWUFBVztvQkFDcEQsT0FBTyxZQUFZLGdCQUFnQjtvQkFDbkMsT0FBTyxZQUFXO3dCQUFFLFlBQVk7dUJBQXFCOzs7Z0JBR3pELEdBQUksNkNBQTZDLFlBQVc7b0JBQ3hELE9BQU8sWUFBWSxvQkFBb0I7b0JBQ3ZDLE9BQU8sWUFBVzt3QkFBRSxZQUFZO3VCQUF5Qjs7O2dCQUc3RCxHQUFJLCtCQUErQixZQUFXO29CQUMxQyxPQUFPLFlBQVksTUFBTTtvQkFDekIsT0FBTyxZQUFXO3dCQUFFLFlBQVk7dUJBQVc7Ozs7O0dBcUJoRCIsImZpbGUiOiJjb21tb24vd2lkZ2V0L1N0ZXBIYW5kbGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBTdGVwSGFuZGxlciBmcm9tICdjb21tb24vd2lkZ2V0L1N0ZXBIYW5kbGVyJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgU3RlcEhhbmRsZXIgXCJpbnRlcmZhY2VcIi4gTm90IG11Y2ggdG8gdGVzdCwganVzdCBtYWtlIHN1cmUgdGhpbmdzIGFyZSBkZWZpbmVkXG4gKiBhbmQgdGhhdCB0aGV5IHRocm93LCBzaW5jZSB3ZSBleHBlY3Qgc3ViIGNsYXNzZXMgdG8gaW1wbGVtZW50IGFsbCB0aGUgbWV0aG9kcy5cbiAqL1xuZGVzY3JpYmUoJ1N0ZXBIYW5kbGVyJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0ZXBIYW5kbGVyO1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgc3RlcEhhbmRsZXIgPSBuZXcgU3RlcEhhbmRsZXIoKTtcbiAgICB9KTtcblxuICAgIGl0ICgnc2hvdWxkIGRlZmluZSBnZXRUaXRsZSBmdW5jdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuZ2V0VGl0bGUpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgc3RlcEhhbmRsZXIuZ2V0VGl0bGUoKTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQgKCdzaG91bGQgZGVmaW5lIGdldFN0ZXBJZCBmdW5jdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuZ2V0U3RlcElkKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IHN0ZXBIYW5kbGVyLmdldFN0ZXBJZCgpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCAoJ3Nob3VsZCBkZWZpbmUgaXNTYXZlRGlzYWJsZWQgZnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzU2F2ZURpc2FibGVkKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IHN0ZXBIYW5kbGVyLmlzU2F2ZURpc2FibGVkKCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0ICgnc2hvdWxkIGRlZmluZSBnZXRTYXZlQnV0dG9uTGFiZWwgZnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmdldFNhdmVCdXR0b25MYWJlbCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBzdGVwSGFuZGxlci5nZXRTYXZlQnV0dG9uTGFiZWwoKTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQgKCdzaG91bGQgZGVmaW5lIHNhdmUgZnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLnNhdmUpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgc3RlcEhhbmRsZXIuc2F2ZSgpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
