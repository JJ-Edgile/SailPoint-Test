System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('LinkStatusFilter', function () {
                var linkStatusFilter = undefined,
                    filteredVal = undefined,
                    Link = undefined,
                    spTranslateFilter = undefined,
                    lockedText = undefined,
                    disabledText = undefined,
                    activeText = undefined,
                    deletedText = undefined;
                var MSG_KEY_ACTIVE = 'lcm_manage_accounts_status_active';
                var MSG_KEY_LOCKED = 'lcm_manage_accounts_status_locked';
                var MSG_KEY_DISABLED = 'lcm_manage_accounts_status_disabled';
                var MSG_KEY_DELETED = 'lcm_manage_accounts_status_deleted';

                beforeEach(module(identityModule));

                beforeEach(inject(function (_linkStatusFilter_, _spTranslateFilter_, _Link_) {
                    linkStatusFilter = _linkStatusFilter_;
                    spTranslateFilter = _spTranslateFilter_;
                    Link = _Link_;

                    disabledText = '<i role="presentation" class="fa fa-circle text-danger"></i> ' + spTranslateFilter(MSG_KEY_DISABLED);
                    lockedText = '<i role="presentation" class="fa fa-exclamation-triangle text-warning"></i> ' + spTranslateFilter(MSG_KEY_LOCKED);
                    activeText = '<i role="presentation" class="fa fa-circle text-success"></i> ' + spTranslateFilter(MSG_KEY_ACTIVE);
                    deletedText = '<i role="presentation" class="fa fa-circle text-danger"></i> ' + spTranslateFilter(MSG_KEY_DELETED);
                }));

                it('should return active text for undefined status', function () {
                    filteredVal = linkStatusFilter(undefined);
                    expect(filteredVal).toEqual(activeText);
                });

                it('should return active text for active status', function () {
                    filteredVal = linkStatusFilter(Link.Status.Active);
                    expect(filteredVal).toEqual(activeText);
                });

                it('should return disabled textfor disabled status', function () {
                    filteredVal = linkStatusFilter(Link.Status.Disabled);
                    expect(filteredVal).toEqual(disabledText);
                });

                it('should return locked text for locked status', function () {
                    filteredVal = linkStatusFilter(Link.Status.Locked);
                    expect(filteredVal).toEqual(lockedText);
                });

                it('should return locked text for locked status', function () {
                    filteredVal = linkStatusFilter(Link.Status.Deleted);
                    expect(filteredVal).toEqual(deletedText);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0xpbmtTdGF0dXNGaWx0ZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLFVBQVUsU0FBUzs7OztJQUl2Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxvQkFBb0IsWUFBVztnQkFDcEMsSUFBSSxtQkFBZ0I7b0JBQUUsY0FBVztvQkFBRSxPQUFJO29CQUFFLG9CQUFpQjtvQkFDdEQsYUFBVTtvQkFBRSxlQUFZO29CQUFFLGFBQVU7b0JBQUUsY0FBVztnQkFDckQsSUFBTSxpQkFBaUI7Z0JBQ3ZCLElBQU0saUJBQWlCO2dCQUN2QixJQUFNLG1CQUFtQjtnQkFDekIsSUFBTSxrQkFBa0I7O2dCQUV4QixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxvQkFBb0IscUJBQXFCLFFBQVE7b0JBQ3hFLG1CQUFtQjtvQkFDbkIsb0JBQW9CO29CQUNwQixPQUFPOztvQkFFUCxlQUFlLGtFQUNYLGtCQUFrQjtvQkFDdEIsYUFBYSxpRkFDVCxrQkFBa0I7b0JBQ3RCLGFBQWEsbUVBQ1Qsa0JBQWtCO29CQUN0QixjQUFjLGtFQUNWLGtCQUFrQjs7O2dCQUcxQixHQUFHLGtEQUFrRCxZQUFXO29CQUM1RCxjQUFjLGlCQUFpQjtvQkFDL0IsT0FBTyxhQUFhLFFBQVE7OztnQkFHaEMsR0FBRywrQ0FBK0MsWUFBVztvQkFDekQsY0FBYyxpQkFBaUIsS0FBSyxPQUFPO29CQUMzQyxPQUFPLGFBQWEsUUFBUTs7O2dCQUdoQyxHQUFHLGtEQUFrRCxZQUFXO29CQUM1RCxjQUFjLGlCQUFpQixLQUFLLE9BQU87b0JBQzNDLE9BQU8sYUFBYSxRQUFROzs7Z0JBR2hDLEdBQUcsK0NBQStDLFlBQVc7b0JBQ3pELGNBQWMsaUJBQWlCLEtBQUssT0FBTztvQkFDM0MsT0FBTyxhQUFhLFFBQVE7OztnQkFHaEMsR0FBRywrQ0FBK0MsWUFBVztvQkFDekQsY0FBYyxpQkFBaUIsS0FBSyxPQUFPO29CQUMzQyxPQUFPLGFBQWEsUUFBUTs7Ozs7R0FjakMiLCJmaWxlIjoiaWRlbnRpdHkvTGlua1N0YXR1c0ZpbHRlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xuXG5kZXNjcmliZSgnTGlua1N0YXR1c0ZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBsaW5rU3RhdHVzRmlsdGVyLCBmaWx0ZXJlZFZhbCwgTGluaywgc3BUcmFuc2xhdGVGaWx0ZXIsXG4gICAgICAgIGxvY2tlZFRleHQsIGRpc2FibGVkVGV4dCwgYWN0aXZlVGV4dCwgZGVsZXRlZFRleHQ7XG4gICAgY29uc3QgTVNHX0tFWV9BQ1RJVkUgPSAnbGNtX21hbmFnZV9hY2NvdW50c19zdGF0dXNfYWN0aXZlJztcbiAgICBjb25zdCBNU0dfS0VZX0xPQ0tFRCA9ICdsY21fbWFuYWdlX2FjY291bnRzX3N0YXR1c19sb2NrZWQnO1xuICAgIGNvbnN0IE1TR19LRVlfRElTQUJMRUQgPSAnbGNtX21hbmFnZV9hY2NvdW50c19zdGF0dXNfZGlzYWJsZWQnO1xuICAgIGNvbnN0IE1TR19LRVlfREVMRVRFRCA9ICdsY21fbWFuYWdlX2FjY291bnRzX3N0YXR1c19kZWxldGVkJztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfbGlua1N0YXR1c0ZpbHRlcl8sIF9zcFRyYW5zbGF0ZUZpbHRlcl8sIF9MaW5rXykge1xuICAgICAgICBsaW5rU3RhdHVzRmlsdGVyID0gX2xpbmtTdGF0dXNGaWx0ZXJfO1xuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlciA9IF9zcFRyYW5zbGF0ZUZpbHRlcl87XG4gICAgICAgIExpbmsgPSBfTGlua187XG5cbiAgICAgICAgZGlzYWJsZWRUZXh0ID0gJzxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImZhIGZhLWNpcmNsZSB0ZXh0LWRhbmdlclwiPjwvaT4gJyArXG4gICAgICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlcihNU0dfS0VZX0RJU0FCTEVEKTtcbiAgICAgICAgbG9ja2VkVGV4dCA9ICc8aSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSB0ZXh0LXdhcm5pbmdcIj48L2k+ICcgK1xuICAgICAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIoTVNHX0tFWV9MT0NLRUQpO1xuICAgICAgICBhY3RpdmVUZXh0ID0gJzxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImZhIGZhLWNpcmNsZSB0ZXh0LXN1Y2Nlc3NcIj48L2k+ICcgK1xuICAgICAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIoTVNHX0tFWV9BQ1RJVkUpO1xuICAgICAgICBkZWxldGVkVGV4dCA9ICc8aSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJmYSBmYS1jaXJjbGUgdGV4dC1kYW5nZXJcIj48L2k+ICcgK1xuICAgICAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIoTVNHX0tFWV9ERUxFVEVEKTtcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBhY3RpdmUgdGV4dCBmb3IgdW5kZWZpbmVkIHN0YXR1cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBmaWx0ZXJlZFZhbCA9IGxpbmtTdGF0dXNGaWx0ZXIodW5kZWZpbmVkKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsKS50b0VxdWFsKGFjdGl2ZVRleHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYWN0aXZlIHRleHQgZm9yIGFjdGl2ZSBzdGF0dXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZmlsdGVyZWRWYWwgPSBsaW5rU3RhdHVzRmlsdGVyKExpbmsuU3RhdHVzLkFjdGl2ZSk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbCkudG9FcXVhbChhY3RpdmVUZXh0KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGRpc2FibGVkIHRleHRmb3IgZGlzYWJsZWQgc3RhdHVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZpbHRlcmVkVmFsID0gbGlua1N0YXR1c0ZpbHRlcihMaW5rLlN0YXR1cy5EaXNhYmxlZCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbCkudG9FcXVhbChkaXNhYmxlZFRleHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gbG9ja2VkIHRleHQgZm9yIGxvY2tlZCBzdGF0dXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZmlsdGVyZWRWYWwgPSBsaW5rU3RhdHVzRmlsdGVyKExpbmsuU3RhdHVzLkxvY2tlZCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbCkudG9FcXVhbChsb2NrZWRUZXh0KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGxvY2tlZCB0ZXh0IGZvciBsb2NrZWQgc3RhdHVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZpbHRlcmVkVmFsID0gbGlua1N0YXR1c0ZpbHRlcihMaW5rLlN0YXR1cy5EZWxldGVkKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsKS50b0VxdWFsKGRlbGV0ZWRUZXh0KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
