System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }],
        execute: function () {

            describe('identityRequestDataService', function () {
                var identityRequestDataService = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_identityRequestDataService_) {
                    identityRequestDataService = _identityRequestDataService_;
                }));

                describe('identityRequest', function () {
                    it('initializes to undefined', function () {
                        expect(identityRequestDataService.identityRequest).not.toBeDefined();
                    });

                    it('sets the identityRequest', function () {
                        var identityRequest = { id: '1245' };
                        identityRequestDataService.setIdentityRequest(identityRequest);
                        expect(identityRequestDataService.identityRequest).toBe(identityRequest);
                    });

                    it('gets the identityRequest', function () {
                        var identityRequest = { id: '1245' };
                        identityRequestDataService.identityRequest = identityRequest;
                        expect(identityRequestDataService.getIdentityRequest()).toBe(identityRequest);
                    });
                });

                describe('getRequestItemsColumnConfigKey', function () {
                    function testColumnConfigKey(requestType, columnConfigKey) {
                        identityRequestDataService.setIdentityRequest({ type: requestType });
                        expect(identityRequestDataService.getRequestItemsColumnConfigKey()).toEqual(columnConfigKey);
                    }

                    it('returns undefined if request is not set', function () {
                        expect(identityRequestDataService.getRequestItemsColumnConfigKey()).toEqual(undefined);
                    });

                    it('returns password specific key for password types', function () {
                        testColumnConfigKey('PasswordsRequest', 'uiIdentityRequestItemsPasswordColumns');
                        testColumnConfigKey('ForgotPassword', 'uiIdentityRequestItemsPasswordColumns');
                        testColumnConfigKey('ExpirePassword', 'uiIdentityRequestItemsPasswordColumns');
                    });

                    it('returns identity specific key for identity types', function () {
                        testColumnConfigKey('IdentityCreateRequest', 'uiIdentityRequestItemsIdentityColumns');
                        testColumnConfigKey('IdentityEditRequest', 'uiIdentityRequestItemsIdentityColumns');
                    });

                    it('returns general key for other types', function () {
                        testColumnConfigKey('AccessRequest', 'uiIdentityRequestItemsColumns');
                        testColumnConfigKey('AccountsRequest', 'uiIdentityRequestItemsColumns');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3REYXRhU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsVUFBVSxTQUFTOzs7SUFHckc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDOztRQUVsRSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsOEJBQThCLFlBQU07Z0JBQ3pDLElBQUksNkJBQTBCOztnQkFFOUIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsOEJBQWlDO29CQUNoRCw2QkFBNkI7OztnQkFHakMsU0FBUyxtQkFBbUIsWUFBTTtvQkFDOUIsR0FBRyw0QkFBNEIsWUFBTTt3QkFDakMsT0FBTywyQkFBMkIsaUJBQWlCLElBQUk7OztvQkFHM0QsR0FBRyw0QkFBNkIsWUFBTTt3QkFDbEMsSUFBSSxrQkFBa0IsRUFBRSxJQUFJO3dCQUM1QiwyQkFBMkIsbUJBQW1CO3dCQUM5QyxPQUFPLDJCQUEyQixpQkFBaUIsS0FBSzs7O29CQUc1RCxHQUFHLDRCQUE0QixZQUFNO3dCQUNqQyxJQUFJLGtCQUFrQixFQUFFLElBQUk7d0JBQzVCLDJCQUEyQixrQkFBa0I7d0JBQzdDLE9BQU8sMkJBQTJCLHNCQUFzQixLQUFLOzs7O2dCQUlyRSxTQUFTLGtDQUFrQyxZQUFNO29CQUM3QyxTQUFTLG9CQUFvQixhQUFhLGlCQUFpQjt3QkFDdkQsMkJBQTJCLG1CQUFtQixFQUFFLE1BQU07d0JBQ3RELE9BQU8sMkJBQTJCLGtDQUFrQyxRQUFROzs7b0JBR2hGLEdBQUcsMkNBQTJDLFlBQU07d0JBQ2hELE9BQU8sMkJBQTJCLGtDQUFrQyxRQUFROzs7b0JBR2hGLEdBQUcsb0RBQW9ELFlBQU07d0JBQ3pELG9CQUFvQixvQkFBb0I7d0JBQ3hDLG9CQUFvQixrQkFBa0I7d0JBQ3RDLG9CQUFvQixrQkFBa0I7OztvQkFHMUMsR0FBRyxvREFBb0QsWUFBTTt3QkFDekQsb0JBQW9CLHlCQUF5Qjt3QkFDN0Msb0JBQW9CLHVCQUF1Qjs7O29CQUcvQyxHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxvQkFBb0IsaUJBQWlCO3dCQUNyQyxvQkFBb0IsbUJBQW1COzs7Ozs7R0FhaEQiLCJmaWxlIjoiaWRlbnRpdHlSZXF1ZXN0L0lkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2UnLCAoKSA9PiB7XG4gICAgbGV0IGlkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX2lkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlXykgPT4ge1xuICAgICAgICBpZGVudGl0eVJlcXVlc3REYXRhU2VydmljZSA9IF9pZGVudGl0eVJlcXVlc3REYXRhU2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2lkZW50aXR5UmVxdWVzdCcsICgpID0+IHtcbiAgICAgICAgaXQoJ2luaXRpYWxpemVzIHRvIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3REYXRhU2VydmljZS5pZGVudGl0eVJlcXVlc3QpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2V0cyB0aGUgaWRlbnRpdHlSZXF1ZXN0JywgICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpZGVudGl0eVJlcXVlc3QgPSB7IGlkOiAnMTI0NSd9O1xuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2Uuc2V0SWRlbnRpdHlSZXF1ZXN0KGlkZW50aXR5UmVxdWVzdCk7XG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2UuaWRlbnRpdHlSZXF1ZXN0KS50b0JlKGlkZW50aXR5UmVxdWVzdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdnZXRzIHRoZSBpZGVudGl0eVJlcXVlc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaWRlbnRpdHlSZXF1ZXN0ID0geyBpZDogJzEyNDUnfTtcbiAgICAgICAgICAgIGlkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlLmlkZW50aXR5UmVxdWVzdCA9IGlkZW50aXR5UmVxdWVzdDtcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3REYXRhU2VydmljZS5nZXRJZGVudGl0eVJlcXVlc3QoKSkudG9CZShpZGVudGl0eVJlcXVlc3QpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRSZXF1ZXN0SXRlbXNDb2x1bW5Db25maWdLZXknLCAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHRlc3RDb2x1bW5Db25maWdLZXkocmVxdWVzdFR5cGUsIGNvbHVtbkNvbmZpZ0tleSkge1xuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2Uuc2V0SWRlbnRpdHlSZXF1ZXN0KHsgdHlwZTogcmVxdWVzdFR5cGUgfSk7XG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0UmVxdWVzdEl0ZW1zQ29sdW1uQ29uZmlnS2V5KCkpLnRvRXF1YWwoY29sdW1uQ29uZmlnS2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiByZXF1ZXN0IGlzIG5vdCBzZXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0UmVxdWVzdEl0ZW1zQ29sdW1uQ29uZmlnS2V5KCkpLnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgcGFzc3dvcmQgc3BlY2lmaWMga2V5IGZvciBwYXNzd29yZCB0eXBlcycsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RDb2x1bW5Db25maWdLZXkoJ1Bhc3N3b3Jkc1JlcXVlc3QnLCAndWlJZGVudGl0eVJlcXVlc3RJdGVtc1Bhc3N3b3JkQ29sdW1ucycpO1xuICAgICAgICAgICAgdGVzdENvbHVtbkNvbmZpZ0tleSgnRm9yZ290UGFzc3dvcmQnLCAndWlJZGVudGl0eVJlcXVlc3RJdGVtc1Bhc3N3b3JkQ29sdW1ucycpO1xuICAgICAgICAgICAgdGVzdENvbHVtbkNvbmZpZ0tleSgnRXhwaXJlUGFzc3dvcmQnLCAndWlJZGVudGl0eVJlcXVlc3RJdGVtc1Bhc3N3b3JkQ29sdW1ucycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBpZGVudGl0eSBzcGVjaWZpYyBrZXkgZm9yIGlkZW50aXR5IHR5cGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgdGVzdENvbHVtbkNvbmZpZ0tleSgnSWRlbnRpdHlDcmVhdGVSZXF1ZXN0JywgJ3VpSWRlbnRpdHlSZXF1ZXN0SXRlbXNJZGVudGl0eUNvbHVtbnMnKTtcbiAgICAgICAgICAgIHRlc3RDb2x1bW5Db25maWdLZXkoJ0lkZW50aXR5RWRpdFJlcXVlc3QnLCAndWlJZGVudGl0eVJlcXVlc3RJdGVtc0lkZW50aXR5Q29sdW1ucycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBnZW5lcmFsIGtleSBmb3Igb3RoZXIgdHlwZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0Q29sdW1uQ29uZmlnS2V5KCdBY2Nlc3NSZXF1ZXN0JywgJ3VpSWRlbnRpdHlSZXF1ZXN0SXRlbXNDb2x1bW5zJyk7XG4gICAgICAgICAgICB0ZXN0Q29sdW1uQ29uZmlnS2V5KCdBY2NvdW50c1JlcXVlc3QnLCAndWlJZGVudGl0eVJlcXVlc3RJdGVtc0NvbHVtbnMnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
