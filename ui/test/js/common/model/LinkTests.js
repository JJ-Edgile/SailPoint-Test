System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the Link model object.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('Link', function () {
                var linkData, Link, link;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Setup the Link class and create some data to test with.
                 */
                beforeEach(inject(function (_Link_) {
                    Link = _Link_;
                    linkData = {
                        id: '1',
                        actionStatus: 'Failed',
                        identityId: '2',
                        applicationId: '1234',
                        applicationName: 'Active Directory of Doom',
                        accountName: 'Slash',
                        status: 'Active',
                        lastRefresh: new Date()
                    };
                    link = new Link(linkData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new Link(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new Link('hi mom');
                    }).toThrow();
                    expect(function () {
                        new Link(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns an ID read from data', function () {
                    expect(link.getId()).toEqual(linkData.id);
                });

                it('returns an identity ID read from data', function () {
                    expect(link.getIdentityId()).toEqual(linkData.identityId);
                });

                it('returns a application name read from data', function () {
                    expect(link.getApplicationName()).toEqual(linkData.applicationName);
                });

                it('returns a application id read from data', function () {
                    expect(link.getApplicationId()).toEqual(linkData.applicationId);
                });

                it('returns a account name read from data', function () {
                    expect(link.getAccountId()).toEqual(linkData.accountId);
                });

                it('returns a status read from data', function () {
                    expect(link.getStatus()).toEqual(linkData.status);
                });

                it('returns a last refresh read from data', function () {
                    expect(link.getLastRefresh()).toEqual(linkData.lastRefresh);
                });

                it('returns a action status read from data', function () {
                    expect(link.getActionStatus()).toEqual(linkData.actionStatus);
                });

                describe('status', function () {
                    var IdentityRequestItem = undefined;
                    beforeEach(inject(function (_IdentityRequestItem_) {
                        IdentityRequestItem = _IdentityRequestItem_;
                    }));

                    it('should be complete if committed or finished', function () {
                        link.setActionStatus(IdentityRequestItem.ProvisioningState.Failed);
                        expect(link.isRequestCompleted()).toBeFalsy();
                        link.setActionStatus(IdentityRequestItem.ProvisioningState.Committed);
                        expect(link.isRequestCompleted()).toBeTruthy();
                        link.setActionStatus(IdentityRequestItem.ProvisioningState.Finished);
                        expect(link.isRequestCompleted()).toBeTruthy();
                        link.setActionStatus();
                        expect(link.isRequestCompleted()).toBeFalsy();
                    });

                    it('should be pending if pending or retry', function () {
                        link.setActionStatus(IdentityRequestItem.ProvisioningState.Failed);
                        expect(link.isRequestPending()).toBeFalsy();
                        link.setActionStatus(IdentityRequestItem.ProvisioningState.Pending);
                        expect(link.isRequestPending()).toBeTruthy();
                        link.setActionStatus(IdentityRequestItem.ProvisioningState.Retry);
                        expect(link.isRequestPending()).toBeTruthy();
                        link.setActionStatus();
                        expect(link.isRequestCompleted()).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9MaW5rVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDZCQUE2QixVQUFVLFNBQVM7Ozs7O0lBS3hGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7O1FBRTFDLFNBQVMsWUFBWTtZQU43QixTQUFTLFFBQVEsWUFBVztnQkFDeEIsSUFBSSxVQUNBLE1BQ0E7OztnQkFHSixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyxRQUFRO29CQUMvQixPQUFPO29CQUNQLFdBQVc7d0JBQ1AsSUFBSTt3QkFDSixjQUFjO3dCQUNkLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsUUFBUTt3QkFDUixhQUFhLElBQUk7O29CQUVyQixPQUFPLElBQUksS0FBSzs7O2dCQUdwQixHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxLQUFLO3VCQUFVOzs7Z0JBRzNDLEdBQUcsaUVBQWlFLFlBQVc7b0JBQzNFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLEtBQUs7dUJBQWM7b0JBQzNDLE9BQU8sWUFBVzt3QkFBRSxJQUFJLEtBQUssWUFBVzs0QkFBRSxPQUFPOzt1QkFBb0I7OztnQkFHekUsR0FBRyxnQ0FBZ0MsWUFBVztvQkFDMUMsT0FBTyxLQUFLLFNBQVMsUUFBUSxTQUFTOzs7Z0JBRzFDLEdBQUcseUNBQXlDLFlBQVc7b0JBQ25ELE9BQU8sS0FBSyxpQkFBaUIsUUFBUSxTQUFTOzs7Z0JBR2xELEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELE9BQU8sS0FBSyxzQkFBc0IsUUFBUSxTQUFTOzs7Z0JBR3ZELEdBQUcsMkNBQTJDLFlBQVc7b0JBQ3JELE9BQU8sS0FBSyxvQkFBb0IsUUFBUSxTQUFTOzs7Z0JBR3JELEdBQUcseUNBQXlDLFlBQVc7b0JBQ25ELE9BQU8sS0FBSyxnQkFBZ0IsUUFBUSxTQUFTOzs7Z0JBR2pELEdBQUcsbUNBQW1DLFlBQVc7b0JBQzdDLE9BQU8sS0FBSyxhQUFhLFFBQVEsU0FBUzs7O2dCQUc5QyxHQUFHLHlDQUF5QyxZQUFXO29CQUNuRCxPQUFPLEtBQUssa0JBQWtCLFFBQVEsU0FBUzs7O2dCQUduRCxHQUFHLDBDQUEwQyxZQUFXO29CQUNwRCxPQUFPLEtBQUssbUJBQW1CLFFBQVEsU0FBUzs7O2dCQUdwRCxTQUFTLFVBQVUsWUFBVztvQkFDMUIsSUFBSSxzQkFBbUI7b0JBQ3ZCLFdBQVcsT0FBTyxVQUFTLHVCQUF1Qjt3QkFDOUMsc0JBQXNCOzs7b0JBRzFCLEdBQUcsK0NBQStDLFlBQVc7d0JBQ3pELEtBQUssZ0JBQWdCLG9CQUFvQixrQkFBa0I7d0JBQzNELE9BQU8sS0FBSyxzQkFBc0I7d0JBQ2xDLEtBQUssZ0JBQWdCLG9CQUFvQixrQkFBa0I7d0JBQzNELE9BQU8sS0FBSyxzQkFBc0I7d0JBQ2xDLEtBQUssZ0JBQWdCLG9CQUFvQixrQkFBa0I7d0JBQzNELE9BQU8sS0FBSyxzQkFBc0I7d0JBQ2xDLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLHNCQUFzQjs7O29CQUd0QyxHQUFHLHlDQUF5QyxZQUFXO3dCQUNuRCxLQUFLLGdCQUFnQixvQkFBb0Isa0JBQWtCO3dCQUMzRCxPQUFPLEtBQUssb0JBQW9CO3dCQUNoQyxLQUFLLGdCQUFnQixvQkFBb0Isa0JBQWtCO3dCQUMzRCxPQUFPLEtBQUssb0JBQW9CO3dCQUNoQyxLQUFLLGdCQUFnQixvQkFBb0Isa0JBQWtCO3dCQUMzRCxPQUFPLEtBQUssb0JBQW9CO3dCQUNoQyxLQUFLO3dCQUNMLE9BQU8sS0FBSyxzQkFBc0I7Ozs7OztHQW1CM0MiLCJmaWxlIjoiY29tbW9uL21vZGVsL0xpbmtUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IG1vZGVsTW9kdWxlIGZyb20gJ2NvbW1vbi9tb2RlbC9Nb2RlbE1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBMaW5rIG1vZGVsIG9iamVjdC5cbiAqL1xuZGVzY3JpYmUoJ0xpbmsnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGlua0RhdGEsXG4gICAgICAgIExpbmssXG4gICAgICAgIGxpbms7XG5cbiAgICAvLyBVc2UgdGhlIG1vZGVsIG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtb2RlbE1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIExpbmsgY2xhc3MgYW5kIGNyZWF0ZSBzb21lIGRhdGEgdG8gdGVzdCB3aXRoLlxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9MaW5rXykge1xuICAgICAgICBMaW5rID0gX0xpbmtfO1xuICAgICAgICBsaW5rRGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBhY3Rpb25TdGF0dXM6ICdGYWlsZWQnLFxuICAgICAgICAgICAgaWRlbnRpdHlJZDogJzInLFxuICAgICAgICAgICAgYXBwbGljYXRpb25JZDogJzEyMzQnLFxuICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnQWN0aXZlIERpcmVjdG9yeSBvZiBEb29tJyxcbiAgICAgICAgICAgIGFjY291bnROYW1lOiAnU2xhc2gnLFxuICAgICAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgICAgICAgIGxhc3RSZWZyZXNoOiBuZXcgRGF0ZSgpXG4gICAgICAgIH07XG4gICAgICAgIGxpbmsgPSBuZXcgTGluayhsaW5rRGF0YSk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3JlcXVpcmVzIG5vbi1udWxsIGRhdGEgaW4gdGhlIGNvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IExpbmsobnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IExpbmsoJ2hpIG1vbScpOyB9KS50b1Rocm93KCk7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IExpbmsoZnVuY3Rpb24oKSB7IHJldHVybiAnd2hhdCB0aGE/JzsgfSk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFuIElEIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChsaW5rLmdldElkKCkpLnRvRXF1YWwobGlua0RhdGEuaWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYW4gaWRlbnRpdHkgSUQgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGxpbmsuZ2V0SWRlbnRpdHlJZCgpKS50b0VxdWFsKGxpbmtEYXRhLmlkZW50aXR5SWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBhcHBsaWNhdGlvbiBuYW1lIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChsaW5rLmdldEFwcGxpY2F0aW9uTmFtZSgpKS50b0VxdWFsKGxpbmtEYXRhLmFwcGxpY2F0aW9uTmFtZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIGFwcGxpY2F0aW9uIGlkIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChsaW5rLmdldEFwcGxpY2F0aW9uSWQoKSkudG9FcXVhbChsaW5rRGF0YS5hcHBsaWNhdGlvbklkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgYWNjb3VudCBuYW1lIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChsaW5rLmdldEFjY291bnRJZCgpKS50b0VxdWFsKGxpbmtEYXRhLmFjY291bnRJZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIHN0YXR1cyByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QobGluay5nZXRTdGF0dXMoKSkudG9FcXVhbChsaW5rRGF0YS5zdGF0dXMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBsYXN0IHJlZnJlc2ggcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGxpbmsuZ2V0TGFzdFJlZnJlc2goKSkudG9FcXVhbChsaW5rRGF0YS5sYXN0UmVmcmVzaCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIGFjdGlvbiBzdGF0dXMgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGxpbmsuZ2V0QWN0aW9uU3RhdHVzKCkpLnRvRXF1YWwobGlua0RhdGEuYWN0aW9uU3RhdHVzKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdGF0dXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IElkZW50aXR5UmVxdWVzdEl0ZW07XG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9JZGVudGl0eVJlcXVlc3RJdGVtXykge1xuICAgICAgICAgICAgSWRlbnRpdHlSZXF1ZXN0SXRlbSA9IF9JZGVudGl0eVJlcXVlc3RJdGVtXztcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgY29tcGxldGUgaWYgY29tbWl0dGVkIG9yIGZpbmlzaGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsaW5rLnNldEFjdGlvblN0YXR1cyhJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLkZhaWxlZCk7XG4gICAgICAgICAgICBleHBlY3QobGluay5pc1JlcXVlc3RDb21wbGV0ZWQoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBsaW5rLnNldEFjdGlvblN0YXR1cyhJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLkNvbW1pdHRlZCk7XG4gICAgICAgICAgICBleHBlY3QobGluay5pc1JlcXVlc3RDb21wbGV0ZWQoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgbGluay5zZXRBY3Rpb25TdGF0dXMoSWRlbnRpdHlSZXF1ZXN0SXRlbS5Qcm92aXNpb25pbmdTdGF0ZS5GaW5pc2hlZCk7XG4gICAgICAgICAgICBleHBlY3QobGluay5pc1JlcXVlc3RDb21wbGV0ZWQoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgbGluay5zZXRBY3Rpb25TdGF0dXMoKTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5rLmlzUmVxdWVzdENvbXBsZXRlZCgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBwZW5kaW5nIGlmIHBlbmRpbmcgb3IgcmV0cnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxpbmsuc2V0QWN0aW9uU3RhdHVzKElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuRmFpbGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5rLmlzUmVxdWVzdFBlbmRpbmcoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBsaW5rLnNldEFjdGlvblN0YXR1cyhJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLlBlbmRpbmcpO1xuICAgICAgICAgICAgZXhwZWN0KGxpbmsuaXNSZXF1ZXN0UGVuZGluZygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBsaW5rLnNldEFjdGlvblN0YXR1cyhJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLlJldHJ5KTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5rLmlzUmVxdWVzdFBlbmRpbmcoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgbGluay5zZXRBY3Rpb25TdGF0dXMoKTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5rLmlzUmVxdWVzdENvbXBsZXRlZCgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
