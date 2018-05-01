System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the UpdateIdentityResultItem model object.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('UpdateIdentityResultItem', function () {
                var UpdateIdentityResultItem = undefined;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Import UpdateIdentityResultItem constructor.
                 */
                beforeEach(inject(function (_UpdateIdentityResultItem_) {
                    UpdateIdentityResultItem = _UpdateIdentityResultItem_;
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new UpdateIdentityResultItem(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new UpdateIdentityResultItem('hi mom');
                    }).toThrow();
                    expect(function () {
                        new UpdateIdentityResultItem(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns outcome read from data', function () {
                    var updateIdentityResultData = {
                        identityRequestId: '90',
                        messages: ['message1', 'message2'],
                        outcome: 'HOME',
                        workflowStatus: 'approving',
                        workflowWorkItemId: 'formid',
                        workflowWorkItemType: 'Form'
                    },
                        updateIdentityResultItem = new UpdateIdentityResultItem(updateIdentityResultData);
                    expect(updateIdentityResultItem.getOutcome()).toBe(updateIdentityResultData.outcome);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9VcGRhdGVJZGVudGl0eVJlc3VsdEl0ZW1UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7SUFLeEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3Qjs7UUFFMUMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsNEJBQTRCLFlBQVc7Z0JBQzVDLElBQUksMkJBQXdCOzs7Z0JBRzVCLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLDRCQUE0QjtvQkFDbkQsMkJBQTJCOzs7Z0JBRy9CLEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELE9BQU8sWUFBVzt3QkFBRSxJQUFJLHlCQUF5Qjt1QkFBVTs7O2dCQUcvRCxHQUFHLGlFQUFpRSxZQUFXO29CQUMzRSxPQUFPLFlBQVc7d0JBQUUsSUFBSSx5QkFBeUI7dUJBQWM7b0JBQy9ELE9BQU8sWUFBVzt3QkFBRSxJQUFJLHlCQUF5QixZQUFXOzRCQUFFLE9BQU87O3VCQUFvQjs7O2dCQUc3RixHQUFHLGtDQUFrQyxZQUFXO29CQUM1QyxJQUFJLDJCQUEyQjt3QkFDdkIsbUJBQW1CO3dCQUNuQixVQUFVLENBQUMsWUFBWTt3QkFDdkIsU0FBUzt3QkFDVCxnQkFBZ0I7d0JBQ2hCLG9CQUFvQjt3QkFDcEIsc0JBQXNCOzt3QkFFMUIsMkJBQTJCLElBQUkseUJBQXlCO29CQUM1RCxPQUFPLHlCQUF5QixjQUFjLEtBQUsseUJBQXlCOzs7OztHQW9CakYiLCJmaWxlIjoiY29tbW9uL21vZGVsL1VwZGF0ZUlkZW50aXR5UmVzdWx0SXRlbVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbW9kZWxNb2R1bGUgZnJvbSAnY29tbW9uL21vZGVsL01vZGVsTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFVwZGF0ZUlkZW50aXR5UmVzdWx0SXRlbSBtb2RlbCBvYmplY3QuXG4gKi9cbmRlc2NyaWJlKCdVcGRhdGVJZGVudGl0eVJlc3VsdEl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgVXBkYXRlSWRlbnRpdHlSZXN1bHRJdGVtO1xuXG4gICAgLy8gVXNlIHRoZSBtb2RlbCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kZWxNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIEltcG9ydCBVcGRhdGVJZGVudGl0eVJlc3VsdEl0ZW0gY29uc3RydWN0b3IuXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1VwZGF0ZUlkZW50aXR5UmVzdWx0SXRlbV8pIHtcbiAgICAgICAgVXBkYXRlSWRlbnRpdHlSZXN1bHRJdGVtID0gX1VwZGF0ZUlkZW50aXR5UmVzdWx0SXRlbV87XG4gICAgfSkpO1xuXG4gICAgaXQoJ3JlcXVpcmVzIG5vbi1udWxsIGRhdGEgaW4gdGhlIGNvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFVwZGF0ZUlkZW50aXR5UmVzdWx0SXRlbShudWxsKTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiB0aGUgZGF0YSBwYXNzZWQgdG8gdGhlIGNvbnN0cnVjdG9yIGlzIG5vdCBhbiBvYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgVXBkYXRlSWRlbnRpdHlSZXN1bHRJdGVtKCdoaSBtb20nKTsgfSkudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBVcGRhdGVJZGVudGl0eVJlc3VsdEl0ZW0oZnVuY3Rpb24oKSB7IHJldHVybiAnd2hhdCB0aGE/JzsgfSk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG91dGNvbWUgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHVwZGF0ZUlkZW50aXR5UmVzdWx0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICBpZGVudGl0eVJlcXVlc3RJZDogJzkwJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczogWydtZXNzYWdlMScsICdtZXNzYWdlMiddLFxuICAgICAgICAgICAgICAgIG91dGNvbWU6ICdIT01FJyxcbiAgICAgICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ2FwcHJvdmluZycsXG4gICAgICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbUlkOiAnZm9ybWlkJyxcbiAgICAgICAgICAgICAgICB3b3JrZmxvd1dvcmtJdGVtVHlwZTogJ0Zvcm0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlSWRlbnRpdHlSZXN1bHRJdGVtID0gbmV3IFVwZGF0ZUlkZW50aXR5UmVzdWx0SXRlbSh1cGRhdGVJZGVudGl0eVJlc3VsdERhdGEpO1xuICAgICAgICBleHBlY3QodXBkYXRlSWRlbnRpdHlSZXN1bHRJdGVtLmdldE91dGNvbWUoKSkudG9CZSh1cGRhdGVJZGVudGl0eVJlc3VsdERhdGEub3V0Y29tZSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
