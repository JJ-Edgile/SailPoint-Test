System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the AccountLink model object.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('AccountLink', function () {
                var AccountLink = undefined,
                    Link = undefined;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Setup the PasswordLink class and create some data to test with.
                 */
                beforeEach(inject(function (_AccountLink_, _Link_) {
                    AccountLink = _AccountLink_;
                    Link = _Link_;
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new AccountLink(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new AccountLink('hi mom');
                    }).toThrow();
                    expect(function () {
                        new AccountLink(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('throws if the data passed to the constructor for supportedFeatures is not an array', function () {
                    expect(function () {
                        new AccountLink({ availableOperations: 'broken' });
                    }).toThrow();
                    expect(function () {
                        new AccountLink({ availableOperations: {} });
                    }).toThrow();
                });

                it('should not throw if availableOperations is undefined', function () {
                    expect(function () {
                        new AccountLink({ availableOperations: undefined });
                    }).not.toThrow();
                });

                it('should load available operations', function () {
                    var availableOps = [AccountLink.Operations.Delete, AccountLink.Operations.Unlock],
                        accountLinkData = {
                        availableOperations: ['Delete', 'Unlock']
                    },
                        accountLink = new AccountLink(accountLinkData);
                    expect(accountLink.getAvailableOperations()).toEqual(availableOps);
                });

                it('should set isRefreshable correctly', function () {
                    var accountLink = new AccountLink({ supportsRefresh: true });
                    expect(accountLink.isRefreshable()).toBeTruthy();
                });

                it('should set isAutoRefresh correctly', function () {
                    var accountLink = new AccountLink({ autoRefresh: true });
                    expect(accountLink.isAutoRefresh()).toEqual(true);
                });

                it('should set errors', function () {
                    var errors = ['errors1', 'error2'],
                        accountLinkData = {
                        errors: errors
                    },
                        accountLink = new AccountLink(accountLinkData);
                    expect(accountLink.getErrors()).toBe(errors);
                });

                it('should update fields on delete', function () {
                    var link = new AccountLink({});
                    link.markDeleted();
                    expect(link.getStatus()).toBe(Link.Status.Deleted);
                    expect(link.isDeleted()).toBeTruthy();
                    expect(link.getActionStatus()).toBeNull();
                    expect(link.getPreviousAction()).toBeNull();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9BY2NvdW50TGlua1Rlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw2QkFBNkIsVUFBVSxTQUFTOzs7OztJQUt4Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGNBQWMsd0JBQXdCOztRQUUxQyxTQUFTLFlBQVk7WUFON0IsU0FBUyxlQUFlLFlBQVc7Z0JBQy9CLElBQUksY0FBVztvQkFBRSxPQUFJOzs7Z0JBR3JCLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLGVBQWUsUUFBUTtvQkFDOUMsY0FBYztvQkFDZCxPQUFPOzs7Z0JBR1gsR0FBRyw2Q0FBNkMsWUFBVztvQkFDdkQsT0FBTyxZQUFXO3dCQUFFLElBQUksWUFBWTt1QkFBVTs7O2dCQUdsRCxHQUFHLGlFQUFpRSxZQUFXO29CQUMzRSxPQUFPLFlBQVc7d0JBQUUsSUFBSSxZQUFZO3VCQUFjO29CQUNsRCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxZQUFZLFlBQVc7NEJBQUUsT0FBTzs7dUJBQW9COzs7Z0JBR2hGLEdBQUcsc0ZBQXNGLFlBQVc7b0JBQ2hHLE9BQU8sWUFBVzt3QkFBRSxJQUFJLFlBQVksRUFBQyxxQkFBcUI7dUJBQWU7b0JBQ3pFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLFlBQVksRUFBQyxxQkFBcUI7dUJBQVM7OztnQkFHdkUsR0FBRyx3REFBd0QsWUFBVztvQkFDbEUsT0FBTyxZQUFXO3dCQUFFLElBQUksWUFBWSxFQUFDLHFCQUFxQjt1QkFBZ0IsSUFBSTs7O2dCQUdsRixHQUFHLG9DQUFvQyxZQUFXO29CQUM5QyxJQUFJLGVBQWUsQ0FBQyxZQUFZLFdBQVcsUUFBUSxZQUFZLFdBQVc7d0JBQ3RFLGtCQUFrQjt3QkFDZCxxQkFBcUIsQ0FBQyxVQUFVOzt3QkFFcEMsY0FBYyxJQUFJLFlBQVk7b0JBQ2xDLE9BQU8sWUFBWSwwQkFBMEIsUUFBUTs7O2dCQUd6RCxHQUFHLHNDQUFzQyxZQUFXO29CQUNoRCxJQUFJLGNBQWMsSUFBSSxZQUFZLEVBQUMsaUJBQWlCO29CQUNwRCxPQUFPLFlBQVksaUJBQWlCOzs7Z0JBR3hDLEdBQUcsc0NBQXNDLFlBQVc7b0JBQ2hELElBQUksY0FBYyxJQUFJLFlBQVksRUFBQyxhQUFhO29CQUNoRCxPQUFPLFlBQVksaUJBQWlCLFFBQVE7OztnQkFHaEQsR0FBRyxxQkFBcUIsWUFBVztvQkFDL0IsSUFBSSxTQUFTLENBQUMsV0FBVzt3QkFDckIsa0JBQWtCO3dCQUNkLFFBQVE7O3dCQUVaLGNBQWMsSUFBSSxZQUFZO29CQUNsQyxPQUFPLFlBQVksYUFBYSxLQUFLOzs7Z0JBR3pDLEdBQUcsa0NBQWtDLFlBQVc7b0JBQzVDLElBQUksT0FBTyxJQUFJLFlBQVk7b0JBQzNCLEtBQUs7b0JBQ0wsT0FBTyxLQUFLLGFBQWEsS0FBSyxLQUFLLE9BQU87b0JBQzFDLE9BQU8sS0FBSyxhQUFhO29CQUN6QixPQUFPLEtBQUssbUJBQW1CO29CQUMvQixPQUFPLEtBQUsscUJBQXFCOzs7OztHQTJCdEMiLCJmaWxlIjoiY29tbW9uL21vZGVsL0FjY291bnRMaW5rVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IG1vZGVsTW9kdWxlIGZyb20gJ2NvbW1vbi9tb2RlbC9Nb2RlbE1vZHVsZSc7XHJcblxyXG4vKipcclxuICogVGVzdHMgZm9yIHRoZSBBY2NvdW50TGluayBtb2RlbCBvYmplY3QuXHJcbiAqL1xyXG5kZXNjcmliZSgnQWNjb3VudExpbmsnLCBmdW5jdGlvbigpIHtcclxuICAgIGxldCBBY2NvdW50TGluaywgTGluaztcclxuXHJcbiAgICAvLyBVc2UgdGhlIG1vZGVsIG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1vZGVsTW9kdWxlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCB0aGUgUGFzc3dvcmRMaW5rIGNsYXNzIGFuZCBjcmVhdGUgc29tZSBkYXRhIHRvIHRlc3Qgd2l0aC5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0FjY291bnRMaW5rXywgX0xpbmtfKSB7XHJcbiAgICAgICAgQWNjb3VudExpbmsgPSBfQWNjb3VudExpbmtfO1xyXG4gICAgICAgIExpbmsgPSBfTGlua187XHJcbiAgICB9KSk7XHJcblxyXG4gICAgaXQoJ3JlcXVpcmVzIG5vbi1udWxsIGRhdGEgaW4gdGhlIGNvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgQWNjb3VudExpbmsobnVsbCk7IH0pLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgQWNjb3VudExpbmsoJ2hpIG1vbScpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgQWNjb3VudExpbmsoZnVuY3Rpb24oKSB7IHJldHVybiAnd2hhdCB0aGE/JzsgfSk7IH0pLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBmb3Igc3VwcG9ydGVkRmVhdHVyZXMgaXMgbm90IGFuIGFycmF5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgQWNjb3VudExpbmsoe2F2YWlsYWJsZU9wZXJhdGlvbnM6ICdicm9rZW4nfSk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBBY2NvdW50TGluayh7YXZhaWxhYmxlT3BlcmF0aW9uczoge319KTsgfSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBub3QgdGhyb3cgaWYgYXZhaWxhYmxlT3BlcmF0aW9ucyBpcyB1bmRlZmluZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBBY2NvdW50TGluayh7YXZhaWxhYmxlT3BlcmF0aW9uczogdW5kZWZpbmVkfSk7IH0pLm5vdC50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGxvYWQgYXZhaWxhYmxlIG9wZXJhdGlvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgYXZhaWxhYmxlT3BzID0gW0FjY291bnRMaW5rLk9wZXJhdGlvbnMuRGVsZXRlLCBBY2NvdW50TGluay5PcGVyYXRpb25zLlVubG9ja10sXHJcbiAgICAgICAgICAgIGFjY291bnRMaW5rRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZU9wZXJhdGlvbnM6IFsnRGVsZXRlJywgJ1VubG9jayddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFjY291bnRMaW5rID0gbmV3IEFjY291bnRMaW5rKGFjY291bnRMaW5rRGF0YSk7XHJcbiAgICAgICAgZXhwZWN0KGFjY291bnRMaW5rLmdldEF2YWlsYWJsZU9wZXJhdGlvbnMoKSkudG9FcXVhbChhdmFpbGFibGVPcHMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBzZXQgaXNSZWZyZXNoYWJsZSBjb3JyZWN0bHknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgYWNjb3VudExpbmsgPSBuZXcgQWNjb3VudExpbmsoe3N1cHBvcnRzUmVmcmVzaDogdHJ1ZX0pO1xyXG4gICAgICAgIGV4cGVjdChhY2NvdW50TGluay5pc1JlZnJlc2hhYmxlKCkpLnRvQmVUcnV0aHkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgc2V0IGlzQXV0b1JlZnJlc2ggY29ycmVjdGx5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGFjY291bnRMaW5rID0gbmV3IEFjY291bnRMaW5rKHthdXRvUmVmcmVzaDogdHJ1ZX0pO1xyXG4gICAgICAgIGV4cGVjdChhY2NvdW50TGluay5pc0F1dG9SZWZyZXNoKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIHNldCBlcnJvcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZXJyb3JzID0gWydlcnJvcnMxJywgJ2Vycm9yMiddLFxyXG4gICAgICAgICAgICBhY2NvdW50TGlua0RhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcnM6IGVycm9yc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhY2NvdW50TGluayA9IG5ldyBBY2NvdW50TGluayhhY2NvdW50TGlua0RhdGEpO1xyXG4gICAgICAgIGV4cGVjdChhY2NvdW50TGluay5nZXRFcnJvcnMoKSkudG9CZShlcnJvcnMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCB1cGRhdGUgZmllbGRzIG9uIGRlbGV0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBsaW5rID0gbmV3IEFjY291bnRMaW5rKHt9KTtcclxuICAgICAgICBsaW5rLm1hcmtEZWxldGVkKCk7XHJcbiAgICAgICAgZXhwZWN0KGxpbmsuZ2V0U3RhdHVzKCkpLnRvQmUoTGluay5TdGF0dXMuRGVsZXRlZCk7XHJcbiAgICAgICAgZXhwZWN0KGxpbmsuaXNEZWxldGVkKCkpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICBleHBlY3QobGluay5nZXRBY3Rpb25TdGF0dXMoKSkudG9CZU51bGwoKTtcclxuICAgICAgICBleHBlY3QobGluay5nZXRQcmV2aW91c0FjdGlvbigpKS50b0JlTnVsbCgpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
