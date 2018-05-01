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

            describe('ManagePasswordDataService', function () {
                var link1 = {
                    foo: 'bar'
                },
                    link2 = {
                    foo: 'baz'
                },
                    managePasswordDataService = undefined,
                    IdentityRequestItem = undefined;

                beforeEach(module(identityModule));
                beforeEach(inject(function (_managePasswordDataService_, _IdentityRequestItem_) {
                    managePasswordDataService = _managePasswordDataService_;
                    IdentityRequestItem = _IdentityRequestItem_;
                }));

                it('should show link is expanded when toggled once', function () {
                    expect(managePasswordDataService.isLinkExpanded(link1)).toBeFalsy();
                    managePasswordDataService.toggleLinkExpansion(link1);
                    expect(managePasswordDataService.isLinkExpanded(link1)).toBeTruthy();
                });

                it('should show link is not expanded when toggled twice', function () {
                    managePasswordDataService.toggleLinkExpansion(link1);
                    managePasswordDataService.toggleLinkExpansion(link1);
                    expect(managePasswordDataService.isLinkExpanded(link1)).toBeFalsy();
                });

                it('should show link is not expanded when a new link is expanded', function () {
                    managePasswordDataService.toggleLinkExpansion(link1);
                    managePasswordDataService.toggleLinkExpansion(link2);
                    expect(managePasswordDataService.isLinkExpanded(link1)).toBeFalsy();
                    expect(managePasswordDataService.isLinkExpanded(link2)).toBeTruthy();
                });

                it('should return action status pending', function () {
                    var actionStatus = managePasswordDataService.getActionStatus('');
                    expect(actionStatus).toEqual(IdentityRequestItem.ProvisioningState.Pending);
                });

                it('should return action status pending if null', function () {
                    var actionStatus = managePasswordDataService.getActionStatus();
                    expect(actionStatus).toEqual(IdentityRequestItem.ProvisioningState.Pending);
                });

                it('should return action status failed', function () {
                    var actionStatus = managePasswordDataService.getActionStatus('failed');
                    expect(actionStatus).toEqual(IdentityRequestItem.ProvisioningState.Failed);
                });

                it('should return action status finished', function () {
                    var actionStatus = managePasswordDataService.getActionStatus('complete');
                    expect(actionStatus).toEqual(IdentityRequestItem.ProvisioningState.Finished);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L01hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLFVBQVUsU0FBUzs7OztJQUl2Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyw2QkFBNkIsWUFBVztnQkFDN0MsSUFBSSxRQUFRO29CQUNKLEtBQUs7O29CQUNOLFFBQVE7b0JBQ1AsS0FBSzs7b0JBRVQsNEJBQXlCO29CQUFFLHNCQUFtQjs7Z0JBRWxELFdBQVcsT0FBTztnQkFDbEIsV0FBVyxPQUFPLFVBQVMsNkJBQTZCLHVCQUF1QjtvQkFDM0UsNEJBQTRCO29CQUM1QixzQkFBc0I7OztnQkFHMUIsR0FBRyxrREFBa0QsWUFBVztvQkFDNUQsT0FBTywwQkFBMEIsZUFBZSxRQUFRO29CQUN4RCwwQkFBMEIsb0JBQW9CO29CQUM5QyxPQUFPLDBCQUEwQixlQUFlLFFBQVE7OztnQkFHNUQsR0FBRyx1REFBdUQsWUFBVztvQkFDakUsMEJBQTBCLG9CQUFvQjtvQkFDOUMsMEJBQTBCLG9CQUFvQjtvQkFDOUMsT0FBTywwQkFBMEIsZUFBZSxRQUFROzs7Z0JBRzVELEdBQUcsZ0VBQWdFLFlBQVc7b0JBQzFFLDBCQUEwQixvQkFBb0I7b0JBQzlDLDBCQUEwQixvQkFBb0I7b0JBQzlDLE9BQU8sMEJBQTBCLGVBQWUsUUFBUTtvQkFDeEQsT0FBTywwQkFBMEIsZUFBZSxRQUFROzs7Z0JBRzVELEdBQUcsdUNBQXVDLFlBQVc7b0JBQ2pELElBQUksZUFBZSwwQkFBMEIsZ0JBQWdCO29CQUM3RCxPQUFPLGNBQWMsUUFBUSxvQkFBb0Isa0JBQWtCOzs7Z0JBR3ZFLEdBQUcsK0NBQStDLFlBQVc7b0JBQ3pELElBQUksZUFBZSwwQkFBMEI7b0JBQzdDLE9BQU8sY0FBYyxRQUFRLG9CQUFvQixrQkFBa0I7OztnQkFHdkUsR0FBRyxzQ0FBc0MsWUFBVztvQkFDaEQsSUFBSSxlQUFlLDBCQUEwQixnQkFBZ0I7b0JBQzdELE9BQU8sY0FBYyxRQUFRLG9CQUFvQixrQkFBa0I7OztnQkFHdkUsR0FBRyx3Q0FBd0MsWUFBVztvQkFDbEQsSUFBSSxlQUFlLDBCQUEwQixnQkFBZ0I7b0JBQzdELE9BQU8sY0FBYyxRQUFRLG9CQUFvQixrQkFBa0I7Ozs7O0dBY3hFIiwiZmlsZSI6ImlkZW50aXR5L01hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcblxuZGVzY3JpYmUoJ01hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgbGluazEgPSB7XG4gICAgICAgICAgICBmb286ICdiYXInXG4gICAgICAgIH0sIGxpbmsyID0ge1xuICAgICAgICAgICAgZm9vOiAnYmF6J1xuICAgICAgICB9LFxuICAgICAgICBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLCBJZGVudGl0eVJlcXVlc3RJdGVtO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUpKTtcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZV8sIF9JZGVudGl0eVJlcXVlc3RJdGVtXykge1xuICAgICAgICBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlID0gX21hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2VfO1xuICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtID0gX0lkZW50aXR5UmVxdWVzdEl0ZW1fO1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgc2hvdyBsaW5rIGlzIGV4cGFuZGVkIHdoZW4gdG9nZ2xlZCBvbmNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLmlzTGlua0V4cGFuZGVkKGxpbmsxKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2UudG9nZ2xlTGlua0V4cGFuc2lvbihsaW5rMSk7XG4gICAgICAgIGV4cGVjdChtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLmlzTGlua0V4cGFuZGVkKGxpbmsxKSkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzaG93IGxpbmsgaXMgbm90IGV4cGFuZGVkIHdoZW4gdG9nZ2xlZCB0d2ljZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLnRvZ2dsZUxpbmtFeHBhbnNpb24obGluazEpO1xuICAgICAgICBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLnRvZ2dsZUxpbmtFeHBhbnNpb24obGluazEpO1xuICAgICAgICBleHBlY3QobWFuYWdlUGFzc3dvcmREYXRhU2VydmljZS5pc0xpbmtFeHBhbmRlZChsaW5rMSkpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzaG93IGxpbmsgaXMgbm90IGV4cGFuZGVkIHdoZW4gYSBuZXcgbGluayBpcyBleHBhbmRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLnRvZ2dsZUxpbmtFeHBhbnNpb24obGluazEpO1xuICAgICAgICBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLnRvZ2dsZUxpbmtFeHBhbnNpb24obGluazIpO1xuICAgICAgICBleHBlY3QobWFuYWdlUGFzc3dvcmREYXRhU2VydmljZS5pc0xpbmtFeHBhbmRlZChsaW5rMSkpLnRvQmVGYWxzeSgpO1xuICAgICAgICBleHBlY3QobWFuYWdlUGFzc3dvcmREYXRhU2VydmljZS5pc0xpbmtFeHBhbmRlZChsaW5rMikpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGFjdGlvbiBzdGF0dXMgcGVuZGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgYWN0aW9uU3RhdHVzID0gbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZS5nZXRBY3Rpb25TdGF0dXMoJycpO1xuICAgICAgICBleHBlY3QoYWN0aW9uU3RhdHVzKS50b0VxdWFsKElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuUGVuZGluZyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBhY3Rpb24gc3RhdHVzIHBlbmRpbmcgaWYgbnVsbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgYWN0aW9uU3RhdHVzID0gbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZS5nZXRBY3Rpb25TdGF0dXMoKTtcbiAgICAgICAgZXhwZWN0KGFjdGlvblN0YXR1cykudG9FcXVhbChJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLlBlbmRpbmcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYWN0aW9uIHN0YXR1cyBmYWlsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGFjdGlvblN0YXR1cyA9IG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2UuZ2V0QWN0aW9uU3RhdHVzKCdmYWlsZWQnKTtcbiAgICAgICAgZXhwZWN0KGFjdGlvblN0YXR1cykudG9FcXVhbChJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLkZhaWxlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBhY3Rpb24gc3RhdHVzIGZpbmlzaGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBhY3Rpb25TdGF0dXMgPSBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLmdldEFjdGlvblN0YXR1cygnY29tcGxldGUnKTtcbiAgICAgICAgZXhwZWN0KGFjdGlvblN0YXR1cykudG9FcXVhbChJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLkZpbmlzaGVkKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
