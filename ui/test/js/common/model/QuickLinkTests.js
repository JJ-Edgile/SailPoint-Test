System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the QuickLink model object.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('QuickLink', function () {
                var quickLinkData, quickLink, QuickLink;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Setup the QuickLink class and create some data to test with.
                 */
                beforeEach(inject(function (_QuickLink_) {
                    QuickLink = _QuickLink_;
                    quickLinkData = {
                        id: 'managePasswords',
                        name: 'Manage Passwords',
                        action: 'managePasswords',
                        selfService: true,
                        forOthers: true
                    };
                    quickLink = new QuickLink(quickLinkData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new QuickLink(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new QuickLink('hi mom');
                    }).toThrow();
                    expect(function () {
                        new QuickLink(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns id read from data', function () {
                    expect(quickLink.getId()).toEqual(quickLinkData.id);
                });

                it('returns a name read from data', function () {
                    expect(quickLink.getName()).toEqual(quickLinkData.name);
                });

                it('returns an action read from data', function () {
                    expect(quickLink.getAction()).toEqual(quickLinkData.action);
                });

                it('returns is self service read from data', function () {
                    expect(quickLink.isSelfService()).toEqual(quickLinkData.selfService);
                });

                it('returns is for others read from data', function () {
                    expect(quickLink.isForOthers()).toEqual(quickLinkData.forOthers);
                });

                it('acurately reports selfServiceOnly', function () {
                    expect(quickLink.isSelfServiceOnly()).toBeFalsy();
                    quickLink.forOthers = false;
                    expect(quickLink.isSelfServiceOnly()).toBeTruthy();
                    quickLink.selfService = false;
                    expect(quickLink.isSelfServiceOnly()).toBeFalsy();
                    quickLink.forOthers = true;
                    expect(quickLink.isSelfServiceOnly()).toBeFalsy();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9RdWlja0xpbmtUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7SUFLeEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3Qjs7UUFFMUMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsYUFBYSxZQUFXO2dCQUM3QixJQUFJLGVBQ0EsV0FDQTs7O2dCQUdKLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLGFBQWE7b0JBQ3BDLFlBQVk7b0JBQ1osZ0JBQWdCO3dCQUNaLElBQUk7d0JBQ0osTUFBTTt3QkFDTixRQUFRO3dCQUNSLGFBQWE7d0JBQ2IsV0FBVzs7b0JBRWYsWUFBWSxJQUFJLFVBQVU7OztnQkFHOUIsR0FBRyw2Q0FBNkMsWUFBVztvQkFDdkQsT0FBTyxZQUFXO3dCQUFFLElBQUksVUFBVTt1QkFBVTs7O2dCQUdoRCxHQUFHLGlFQUFpRSxZQUFXO29CQUMzRSxPQUFPLFlBQVc7d0JBQUUsSUFBSSxVQUFVO3VCQUFjO29CQUNoRCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxVQUFVLFlBQVc7NEJBQUUsT0FBTzs7dUJBQW9COzs7Z0JBRzlFLEdBQUcsNkJBQTZCLFlBQVc7b0JBQ3ZDLE9BQU8sVUFBVSxTQUFTLFFBQVEsY0FBYzs7O2dCQUdwRCxHQUFHLGlDQUFpQyxZQUFXO29CQUMzQyxPQUFPLFVBQVUsV0FBVyxRQUFRLGNBQWM7OztnQkFHdEQsR0FBRyxvQ0FBb0MsWUFBVztvQkFDOUMsT0FBTyxVQUFVLGFBQWEsUUFBUSxjQUFjOzs7Z0JBR3hELEdBQUcsMENBQTBDLFlBQVc7b0JBQ3BELE9BQU8sVUFBVSxpQkFBaUIsUUFBUSxjQUFjOzs7Z0JBRzVELEdBQUcsd0NBQXdDLFlBQVc7b0JBQ2xELE9BQU8sVUFBVSxlQUFlLFFBQVEsY0FBYzs7O2dCQUcxRCxHQUFHLHFDQUFxQyxZQUFXO29CQUMvQyxPQUFPLFVBQVUscUJBQXFCO29CQUN0QyxVQUFVLFlBQVk7b0JBQ3RCLE9BQU8sVUFBVSxxQkFBcUI7b0JBQ3RDLFVBQVUsY0FBYztvQkFDeEIsT0FBTyxVQUFVLHFCQUFxQjtvQkFDdEMsVUFBVSxZQUFZO29CQUN0QixPQUFPLFVBQVUscUJBQXFCOzs7OztHQWtCM0MiLCJmaWxlIjoiY29tbW9uL21vZGVsL1F1aWNrTGlua1Rlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbW9kZWxNb2R1bGUgZnJvbSAnY29tbW9uL21vZGVsL01vZGVsTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFF1aWNrTGluayBtb2RlbCBvYmplY3QuXG4gKi9cbmRlc2NyaWJlKCdRdWlja0xpbmsnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgcXVpY2tMaW5rRGF0YSxcbiAgICAgICAgcXVpY2tMaW5rLFxuICAgICAgICBRdWlja0xpbms7XG5cbiAgICAvLyBVc2UgdGhlIG1vZGVsIG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtb2RlbE1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIFF1aWNrTGluayBjbGFzcyBhbmQgY3JlYXRlIHNvbWUgZGF0YSB0byB0ZXN0IHdpdGguXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1F1aWNrTGlua18pIHtcbiAgICAgICAgUXVpY2tMaW5rID0gX1F1aWNrTGlua187XG4gICAgICAgIHF1aWNrTGlua0RhdGEgPSB7XG4gICAgICAgICAgICBpZDogJ21hbmFnZVBhc3N3b3JkcycsXG4gICAgICAgICAgICBuYW1lOiAnTWFuYWdlIFBhc3N3b3JkcycsXG4gICAgICAgICAgICBhY3Rpb246ICdtYW5hZ2VQYXNzd29yZHMnLFxuICAgICAgICAgICAgc2VsZlNlcnZpY2U6IHRydWUsXG4gICAgICAgICAgICBmb3JPdGhlcnM6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgcXVpY2tMaW5rID0gbmV3IFF1aWNrTGluayhxdWlja0xpbmtEYXRhKTtcbiAgICB9KSk7XG5cbiAgICBpdCgncmVxdWlyZXMgbm9uLW51bGwgZGF0YSBpbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgUXVpY2tMaW5rKG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHRoZSBkYXRhIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBRdWlja0xpbmsoJ2hpIG1vbScpOyB9KS50b1Rocm93KCk7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFF1aWNrTGluayhmdW5jdGlvbigpIHsgcmV0dXJuICd3aGF0IHRoYT8nOyB9KTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgaWQgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHF1aWNrTGluay5nZXRJZCgpKS50b0VxdWFsKHF1aWNrTGlua0RhdGEuaWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBuYW1lIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChxdWlja0xpbmsuZ2V0TmFtZSgpKS50b0VxdWFsKHF1aWNrTGlua0RhdGEubmFtZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhbiBhY3Rpb24gcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHF1aWNrTGluay5nZXRBY3Rpb24oKSkudG9FcXVhbChxdWlja0xpbmtEYXRhLmFjdGlvbik7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBpcyBzZWxmIHNlcnZpY2UgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHF1aWNrTGluay5pc1NlbGZTZXJ2aWNlKCkpLnRvRXF1YWwocXVpY2tMaW5rRGF0YS5zZWxmU2VydmljZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBpcyBmb3Igb3RoZXJzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChxdWlja0xpbmsuaXNGb3JPdGhlcnMoKSkudG9FcXVhbChxdWlja0xpbmtEYXRhLmZvck90aGVycyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWN1cmF0ZWx5IHJlcG9ydHMgc2VsZlNlcnZpY2VPbmx5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChxdWlja0xpbmsuaXNTZWxmU2VydmljZU9ubHkoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIHF1aWNrTGluay5mb3JPdGhlcnMgPSBmYWxzZTtcbiAgICAgICAgZXhwZWN0KHF1aWNrTGluay5pc1NlbGZTZXJ2aWNlT25seSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIHF1aWNrTGluay5zZWxmU2VydmljZSA9IGZhbHNlO1xuICAgICAgICBleHBlY3QocXVpY2tMaW5rLmlzU2VsZlNlcnZpY2VPbmx5KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICBxdWlja0xpbmsuZm9yT3RoZXJzID0gdHJ1ZTtcbiAgICAgICAgZXhwZWN0KHF1aWNrTGluay5pc1NlbGZTZXJ2aWNlT25seSgpKS50b0JlRmFsc3koKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
