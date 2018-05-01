System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('AccountRefreshTracker', function () {

                var tracker = undefined,
                    account = undefined,
                    account2 = undefined,
                    result = undefined,
                    result2 = undefined,
                    deferred = undefined,
                    promise = undefined,
                    $scope = undefined,
                    listener = undefined;

                beforeEach(module(identityModule, function ($qProvider) {
                    // we want to test rejections here, allow them through!
                    $qProvider.errorOnUnhandledRejections(false);
                }));

                beforeEach(inject(function (AccountRefreshTracker, AccountLink, AccountRefreshResult, $q, $rootScope) {
                    tracker = new AccountRefreshTracker();
                    account = new AccountLink({
                        id: '129387'
                    });
                    account2 = new AccountLink({
                        id: '9klsadjiulafu8i2rhfal9882oihafna7opllcku*yn5k3r76(*'
                    });

                    $scope = $rootScope;
                    deferred = $q.defer();
                    promise = deferred.promise;

                    result = new AccountRefreshResult({
                        id: account.id,
                        error: null,
                        deleted: false,
                        account: account
                    });
                    result2 = new AccountRefreshResult({
                        id: account2.id,
                        error: null,
                        deleted: false,
                        account: account2
                    });

                    listener = {
                        linkRefreshed: jasmine.createSpy('linkRefreshed'),
                        linkDeleted: jasmine.createSpy('linkDeleted')
                    };
                }));

                describe('accountBeingRefreshed()', function () {
                    it('marks the account as refreshing', function () {
                        expect(tracker.isRefreshing(account)).toEqual(false);
                        tracker.accountBeingRefreshed(account, promise);
                        expect(tracker.isRefreshing(account)).toEqual(true);
                    });

                    it('marks the account as not refreshing when refresh promise resolves', function () {
                        tracker.accountBeingRefreshed(account, promise);
                        deferred.resolve([result, result2]);
                        $scope.$digest();
                        expect(tracker.isRefreshing(account)).toEqual(false);
                        expect(tracker.isRefreshing(account2)).toEqual(false);
                    });

                    it('marks the account as not refreshed prior to refresh promise resolving', function () {
                        tracker.accountBeingRefreshed(account, promise);
                        expect(tracker.hasBeenRefreshed(account)).toEqual(false);
                    });

                    it('marks the account as refreshed when refresh promise resolves', function () {
                        tracker.accountBeingRefreshed(account, promise);
                        deferred.resolve(account);
                        $scope.$digest();
                        expect(tracker.hasBeenRefreshed(account)).toEqual(true);
                    });

                    it('marks the account as refreshed when refresh promise rejects', function () {
                        tracker.accountBeingRefreshed(account, promise);
                        deferred.reject('boom!');
                        $scope.$digest();
                        expect(tracker.hasBeenRefreshed(account)).toEqual(true);
                    });

                    it('notifies listeners when refresh promise resolves', function () {
                        tracker.registerRefreshListener(listener);
                        tracker.accountBeingRefreshed(account, promise);
                        deferred.resolve(account);
                        expect(listener.linkRefreshed).not.toHaveBeenCalled();
                        $scope.$digest();
                        expect(listener.linkRefreshed).toHaveBeenCalledWith(account);
                    });

                    it('notifies listeners when refresh promise rejects', function () {
                        tracker.registerRefreshListener(listener);
                        tracker.accountBeingRefreshed(account, promise);
                        deferred.reject('uh oh!');
                        expect(listener.linkDeleted).not.toHaveBeenCalled();
                        $scope.$digest();
                        expect(listener.linkDeleted).toHaveBeenCalledWith(account.id);
                    });
                });

                describe('accountsBeingRefreshed()', function () {
                    it('marks the accounts as refreshing', function () {
                        expect(tracker.isRefreshing(account)).toEqual(false);
                        expect(tracker.isRefreshing(account2)).toEqual(false);
                        tracker.accountsBeingRefreshed([account.id, account2.id], promise);
                        expect(tracker.isRefreshing(account)).toEqual(true);
                        expect(tracker.isRefreshing(account2)).toEqual(true);
                    });

                    it('marks the accounts as not refreshing when refresh promise resolves', function () {
                        tracker.accountBeingRefreshed([account.id, account2.id], promise);
                        deferred.resolve([result, result2]);
                        $scope.$digest();
                        expect(tracker.isRefreshing(account)).toEqual(false);
                    });

                    it('marks the accounts as not refreshed prior to refresh promise resolving', function () {
                        tracker.accountsBeingRefreshed([account.id, account2.id], promise);
                        expect(tracker.hasBeenRefreshed(account)).toEqual(false);
                        expect(tracker.hasBeenRefreshed(account2)).toEqual(false);
                    });

                    it('marks the accounts as refreshed when refresh promise resolves', function () {
                        tracker.accountsBeingRefreshed([account.id, account2.id], promise);
                        deferred.resolve([result, result2]);
                        $scope.$digest();
                        expect(tracker.hasBeenRefreshed(account)).toEqual(true);
                        expect(tracker.hasBeenRefreshed(account2)).toEqual(true);
                    });

                    it('marks the accounts as refreshed when refresh promise rejects', function () {
                        tracker.accountsBeingRefreshed([account.id, account2.id], promise);
                        deferred.reject('boom!');
                        $scope.$digest();
                        expect(tracker.hasBeenRefreshed(account)).toEqual(true);
                        expect(tracker.hasBeenRefreshed(account2)).toEqual(true);
                    });

                    it('notifies listeners when refresh promise resolves with success', function () {
                        tracker.registerRefreshListener(listener);
                        tracker.accountsBeingRefreshed([account.id], promise);
                        deferred.resolve([result]);
                        expect(listener.linkRefreshed).not.toHaveBeenCalled();
                        $scope.$digest();
                        expect(listener.linkRefreshed).toHaveBeenCalledWith(account);
                    });

                    it('notifies listeners when refresh promise resolves with deleted', function () {
                        tracker.registerRefreshListener(listener);
                        tracker.accountsBeingRefreshed([account.id], promise);
                        result.deleted = true;
                        deferred.resolve([result]);
                        expect(listener.linkDeleted).not.toHaveBeenCalled();
                        $scope.$digest();
                        expect(listener.linkDeleted).toHaveBeenCalledWith(account.id);
                    });
                });

                it('hasBeenRefreshed() returns false when account has not been refreshed', function () {
                    expect(tracker.hasBeenRefreshed(account)).toEqual(false);
                });

                it('isRefreshing() returns false when account has not been refreshed', function () {
                    expect(tracker.isRefreshing(account)).toEqual(false);
                });

                describe('isBeingTracked()', function () {
                    it('returns false if account has not been tracked', function () {
                        expect(tracker.isBeingTracked(account)).toEqual(false);
                    });

                    it('returns true if account is refreshing', function () {
                        tracker.accountBeingRefreshed(account, promise);
                        expect(tracker.isBeingTracked(account)).toEqual(true);
                    });

                    it('returns true if account is done refreshing', function () {
                        tracker.accountBeingRefreshed(account, promise);
                        deferred.resolve(account);
                        $scope.$digest();
                        expect(tracker.isBeingTracked(account)).toEqual(true);
                    });
                });

                it('registerRefreshListener() adds a listener', function () {
                    tracker.registerRefreshListener(listener);
                    expect(tracker.refreshListeners.length).toEqual(1);
                });

                it('unregisterRefreshListener() removes a listener', function () {
                    tracker.registerRefreshListener(listener);
                    tracker.unregisterRefreshListener(listener);
                    expect(tracker.refreshListeners.length).toEqual(0);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0FjY291bnRSZWZyZXNoVHJhY2tlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0QkFBNEIsVUFBVSxTQUFTO0lBQ3ZGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZOztZQUw3QixTQUFTLHlCQUF5QixZQUFNOztnQkFFcEMsSUFBSSxVQUFPO29CQUFFLFVBQU87b0JBQUUsV0FBUTtvQkFBRSxTQUFNO29CQUFFLFVBQU87b0JBQUUsV0FBUTtvQkFBRSxVQUFPO29CQUFFLFNBQU07b0JBQUUsV0FBUTs7Z0JBRXBGLFdBQVcsT0FBTyxnQkFBZ0IsVUFBQyxZQUFlOztvQkFFOUMsV0FBVywyQkFBMkI7OztnQkFHMUMsV0FBVyxPQUFPLFVBQUMsdUJBQXVCLGFBQWEsc0JBQXNCLElBQUksWUFBZTtvQkFDNUYsVUFBVSxJQUFJO29CQUNkLFVBQVUsSUFBSSxZQUFZO3dCQUN0QixJQUFJOztvQkFFUixXQUFXLElBQUksWUFBWTt3QkFDdkIsSUFBSTs7O29CQUdSLFNBQVM7b0JBQ1QsV0FBVyxHQUFHO29CQUNkLFVBQVUsU0FBUzs7b0JBRW5CLFNBQVMsSUFBSSxxQkFBcUI7d0JBQzlCLElBQUksUUFBUTt3QkFDWixPQUFPO3dCQUNQLFNBQVM7d0JBQ1QsU0FBUzs7b0JBRWIsVUFBVSxJQUFJLHFCQUFxQjt3QkFDL0IsSUFBSSxTQUFTO3dCQUNiLE9BQU87d0JBQ1AsU0FBUzt3QkFDVCxTQUFTOzs7b0JBR2IsV0FBVzt3QkFDUCxlQUFlLFFBQVEsVUFBVTt3QkFDakMsYUFBYSxRQUFRLFVBQVU7Ozs7Z0JBSXZDLFNBQVMsMkJBQTJCLFlBQU07b0JBQ3RDLEdBQUcsbUNBQW1DLFlBQU07d0JBQ3hDLE9BQU8sUUFBUSxhQUFhLFVBQVUsUUFBUTt3QkFD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LE9BQU87d0JBQ1AsT0FBTyxTQUFTLGVBQWUscUJBQXFCOzs7b0JBR3hELEdBQUcsaUVBQWlFLFlBQU07d0JBQ3RFLFFBQVEsd0JBQXdCO3dCQUNoQyxRQUFRLHVCQUF1QixDQUFFLFFBQVEsS0FBTTt3QkFDL0MsT0FBTyxVQUFVO3dCQUNqQixTQUFTLFFBQVEsQ0FBRTt3QkFDbkIsT0FBTyxTQUFTLGFBQWEsSUFBSTt3QkFDakMsT0FBTzt3QkFDUCxPQUFPLFNBQVMsYUFBYSxxQkFBcUIsUUFBUTs7OztnQkFJbEUsR0FBRyx3RUFBd0UsWUFBTTtvQkFDN0UsT0FBTyxRQUFRLGlCQUFpQixVQUFVLFFBQVE7OztnQkFHdEQsR0FBRyxvRUFBb0UsWUFBTTtvQkFDekUsT0FBTyxRQUFRLGFBQWEsVUFBVSxRQUFROzs7Z0JBR2xELFNBQVMsb0JBQW9CLFlBQU07b0JBQy9CLEdBQUcsaURBQWlELFlBQU07d0JBQ3RELE9BQU8sUUFBUSxlQUFlLFVBQVUsUUFBUTs7O29CQUdwRCxHQUFHLHlDQUF5QyxZQUFNO3dCQUM5QyxRQUFRLHNCQUFzQixTQUFTO3dCQUN2QyxPQUFPLFFBQVEsZUFBZSxVQUFVLFFBQVE7OztvQkFHcEQsR0FBRyw4Q0FBOEMsWUFBTTt3QkFDbkQsUUFBUSxzQkFBc0IsU0FBUzt3QkFDdkMsU0FBUyxRQUFRO3dCQUNqQixPQUFPO3dCQUNQLE9BQU8sUUFBUSxlQUFlLFVBQVUsUUFBUTs7OztnQkFJeEQsR0FBRyw2Q0FBNkMsWUFBTTtvQkFDbEQsUUFBUSx3QkFBd0I7b0JBQ2hDLE9BQU8sUUFBUSxpQkFBaUIsUUFBUSxRQUFROzs7Z0JBR3BELEdBQUcsa0RBQWtELFlBQU07b0JBQ3ZELFFBQVEsd0JBQXdCO29CQUNoQyxRQUFRLDBCQUEwQjtvQkFDbEMsT0FBTyxRQUFRLGlCQUFpQixRQUFRLFFBQVE7Ozs7O0dBb0JyRCIsImZpbGUiOiJpZGVudGl0eS9BY2NvdW50UmVmcmVzaFRyYWNrZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0FjY291bnRSZWZyZXNoVHJhY2tlcicsICgpID0+IHtcclxuXHJcbiAgICBsZXQgdHJhY2tlciwgYWNjb3VudCwgYWNjb3VudDIsIHJlc3VsdCwgcmVzdWx0MiwgZGVmZXJyZWQsIHByb21pc2UsICRzY29wZSwgbGlzdGVuZXI7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUsICgkcVByb3ZpZGVyKSA9PiB7XHJcbiAgICAgICAgLy8gd2Ugd2FudCB0byB0ZXN0IHJlamVjdGlvbnMgaGVyZSwgYWxsb3cgdGhlbSB0aHJvdWdoIVxyXG4gICAgICAgICRxUHJvdmlkZXIuZXJyb3JPblVuaGFuZGxlZFJlamVjdGlvbnMoZmFsc2UpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChBY2NvdW50UmVmcmVzaFRyYWNrZXIsIEFjY291bnRMaW5rLCBBY2NvdW50UmVmcmVzaFJlc3VsdCwgJHEsICRyb290U2NvcGUpID0+IHtcclxuICAgICAgICB0cmFja2VyID0gbmV3IEFjY291bnRSZWZyZXNoVHJhY2tlcigpO1xyXG4gICAgICAgIGFjY291bnQgPSBuZXcgQWNjb3VudExpbmsoe1xyXG4gICAgICAgICAgICBpZDogJzEyOTM4NydcclxuICAgICAgICB9KTtcclxuICAgICAgICBhY2NvdW50MiA9IG5ldyBBY2NvdW50TGluayh7XHJcbiAgICAgICAgICAgIGlkOiAnOWtsc2Fkaml1bGFmdThpMnJoZmFsOTg4Mm9paGFmbmE3b3BsbGNrdSp5bjVrM3I3NigqJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICBwcm9taXNlID0gZGVmZXJyZWQucHJvbWlzZTtcclxuXHJcbiAgICAgICAgcmVzdWx0ID0gbmV3IEFjY291bnRSZWZyZXNoUmVzdWx0KHtcclxuICAgICAgICAgICAgaWQ6IGFjY291bnQuaWQsXHJcbiAgICAgICAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICAgICAgICBkZWxldGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgYWNjb3VudDogYWNjb3VudFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlc3VsdDIgPSBuZXcgQWNjb3VudFJlZnJlc2hSZXN1bHQoe1xyXG4gICAgICAgICAgICBpZDogYWNjb3VudDIuaWQsXHJcbiAgICAgICAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICAgICAgICBkZWxldGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgYWNjb3VudDogYWNjb3VudDJcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGlzdGVuZXIgPSB7XHJcbiAgICAgICAgICAgIGxpbmtSZWZyZXNoZWQ6IGphc21pbmUuY3JlYXRlU3B5KCdsaW5rUmVmcmVzaGVkJyksXHJcbiAgICAgICAgICAgIGxpbmtEZWxldGVkOiBqYXNtaW5lLmNyZWF0ZVNweSgnbGlua0RlbGV0ZWQnKVxyXG4gICAgICAgIH07XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2FjY291bnRCZWluZ1JlZnJlc2hlZCgpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdtYXJrcyB0aGUgYWNjb3VudCBhcyByZWZyZXNoaW5nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QodHJhY2tlci5pc1JlZnJlc2hpbmcoYWNjb3VudCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB0cmFja2VyLmFjY291bnRCZWluZ1JlZnJlc2hlZChhY2NvdW50LCBwcm9taXNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaXNSZWZyZXNoaW5nKGFjY291bnQpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnbWFya3MgdGhlIGFjY291bnQgYXMgbm90IHJlZnJlc2hpbmcgd2hlbiByZWZyZXNoIHByb21pc2UgcmVzb2x2ZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyYWNrZXIuYWNjb3VudEJlaW5nUmVmcmVzaGVkKGFjY291bnQsIHByb21pc2UpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFsgcmVzdWx0LCByZXN1bHQyIF0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QodHJhY2tlci5pc1JlZnJlc2hpbmcoYWNjb3VudCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QodHJhY2tlci5pc1JlZnJlc2hpbmcoYWNjb3VudDIpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ21hcmtzIHRoZSBhY2NvdW50IGFzIG5vdCByZWZyZXNoZWQgcHJpb3IgdG8gcmVmcmVzaCBwcm9taXNlIHJlc29sdmluZycsICgpID0+IHtcclxuICAgICAgICAgICAgdHJhY2tlci5hY2NvdW50QmVpbmdSZWZyZXNoZWQoYWNjb3VudCwgcHJvbWlzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0cmFja2VyLmhhc0JlZW5SZWZyZXNoZWQoYWNjb3VudCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnbWFya3MgdGhlIGFjY291bnQgYXMgcmVmcmVzaGVkIHdoZW4gcmVmcmVzaCBwcm9taXNlIHJlc29sdmVzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cmFja2VyLmFjY291bnRCZWluZ1JlZnJlc2hlZChhY2NvdW50LCBwcm9taXNlKTtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShhY2NvdW50KTtcclxuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaGFzQmVlblJlZnJlc2hlZChhY2NvdW50KSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ21hcmtzIHRoZSBhY2NvdW50IGFzIHJlZnJlc2hlZCB3aGVuIHJlZnJlc2ggcHJvbWlzZSByZWplY3RzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cmFja2VyLmFjY291bnRCZWluZ1JlZnJlc2hlZChhY2NvdW50LCBwcm9taXNlKTtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdib29tIScpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QodHJhY2tlci5oYXNCZWVuUmVmcmVzaGVkKGFjY291bnQpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnbm90aWZpZXMgbGlzdGVuZXJzIHdoZW4gcmVmcmVzaCBwcm9taXNlIHJlc29sdmVzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cmFja2VyLnJlZ2lzdGVyUmVmcmVzaExpc3RlbmVyKGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgdHJhY2tlci5hY2NvdW50QmVpbmdSZWZyZXNoZWQoYWNjb3VudCwgcHJvbWlzZSk7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoYWNjb3VudCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsaXN0ZW5lci5saW5rUmVmcmVzaGVkKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QobGlzdGVuZXIubGlua1JlZnJlc2hlZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoYWNjb3VudCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdub3RpZmllcyBsaXN0ZW5lcnMgd2hlbiByZWZyZXNoIHByb21pc2UgcmVqZWN0cycsICgpID0+IHtcclxuICAgICAgICAgICAgdHJhY2tlci5yZWdpc3RlclJlZnJlc2hMaXN0ZW5lcihsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRyYWNrZXIuYWNjb3VudEJlaW5nUmVmcmVzaGVkKGFjY291bnQsIHByb21pc2UpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ3VoIG9oIScpO1xyXG4gICAgICAgICAgICBleHBlY3QobGlzdGVuZXIubGlua0RlbGV0ZWQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsaXN0ZW5lci5saW5rRGVsZXRlZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoYWNjb3VudC5pZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnYWNjb3VudHNCZWluZ1JlZnJlc2hlZCgpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdtYXJrcyB0aGUgYWNjb3VudHMgYXMgcmVmcmVzaGluZycsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaXNSZWZyZXNoaW5nKGFjY291bnQpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaXNSZWZyZXNoaW5nKGFjY291bnQyKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRyYWNrZXIuYWNjb3VudHNCZWluZ1JlZnJlc2hlZChbIGFjY291bnQuaWQsIGFjY291bnQyLmlkIF0sIHByb21pc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QodHJhY2tlci5pc1JlZnJlc2hpbmcoYWNjb3VudCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0cmFja2VyLmlzUmVmcmVzaGluZyhhY2NvdW50MikpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdtYXJrcyB0aGUgYWNjb3VudHMgYXMgbm90IHJlZnJlc2hpbmcgd2hlbiByZWZyZXNoIHByb21pc2UgcmVzb2x2ZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyYWNrZXIuYWNjb3VudEJlaW5nUmVmcmVzaGVkKFsgYWNjb3VudC5pZCwgYWNjb3VudDIuaWQgXSwgcHJvbWlzZSk7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoWyByZXN1bHQsIHJlc3VsdDIgXSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0cmFja2VyLmlzUmVmcmVzaGluZyhhY2NvdW50KSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdtYXJrcyB0aGUgYWNjb3VudHMgYXMgbm90IHJlZnJlc2hlZCBwcmlvciB0byByZWZyZXNoIHByb21pc2UgcmVzb2x2aW5nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cmFja2VyLmFjY291bnRzQmVpbmdSZWZyZXNoZWQoWyBhY2NvdW50LmlkLCBhY2NvdW50Mi5pZCBdLCBwcm9taXNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaGFzQmVlblJlZnJlc2hlZChhY2NvdW50KSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0cmFja2VyLmhhc0JlZW5SZWZyZXNoZWQoYWNjb3VudDIpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ21hcmtzIHRoZSBhY2NvdW50cyBhcyByZWZyZXNoZWQgd2hlbiByZWZyZXNoIHByb21pc2UgcmVzb2x2ZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyYWNrZXIuYWNjb3VudHNCZWluZ1JlZnJlc2hlZChbIGFjY291bnQuaWQsIGFjY291bnQyLmlkIF0sIHByb21pc2UpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFsgcmVzdWx0LCByZXN1bHQyIF0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QodHJhY2tlci5oYXNCZWVuUmVmcmVzaGVkKGFjY291bnQpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QodHJhY2tlci5oYXNCZWVuUmVmcmVzaGVkKGFjY291bnQyKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ21hcmtzIHRoZSBhY2NvdW50cyBhcyByZWZyZXNoZWQgd2hlbiByZWZyZXNoIHByb21pc2UgcmVqZWN0cycsICgpID0+IHtcclxuICAgICAgICAgICAgdHJhY2tlci5hY2NvdW50c0JlaW5nUmVmcmVzaGVkKFsgYWNjb3VudC5pZCwgYWNjb3VudDIuaWQgXSwgcHJvbWlzZSk7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnYm9vbSEnKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaGFzQmVlblJlZnJlc2hlZChhY2NvdW50KSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaGFzQmVlblJlZnJlc2hlZChhY2NvdW50MikpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdub3RpZmllcyBsaXN0ZW5lcnMgd2hlbiByZWZyZXNoIHByb21pc2UgcmVzb2x2ZXMgd2l0aCBzdWNjZXNzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cmFja2VyLnJlZ2lzdGVyUmVmcmVzaExpc3RlbmVyKGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgdHJhY2tlci5hY2NvdW50c0JlaW5nUmVmcmVzaGVkKFsgYWNjb3VudC5pZCBdLCBwcm9taXNlKTtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShbIHJlc3VsdCBdKTtcclxuICAgICAgICAgICAgZXhwZWN0KGxpc3RlbmVyLmxpbmtSZWZyZXNoZWQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsaXN0ZW5lci5saW5rUmVmcmVzaGVkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChhY2NvdW50KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ25vdGlmaWVzIGxpc3RlbmVycyB3aGVuIHJlZnJlc2ggcHJvbWlzZSByZXNvbHZlcyB3aXRoIGRlbGV0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyYWNrZXIucmVnaXN0ZXJSZWZyZXNoTGlzdGVuZXIobGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB0cmFja2VyLmFjY291bnRzQmVpbmdSZWZyZXNoZWQoWyBhY2NvdW50LmlkIF0sIHByb21pc2UpO1xyXG4gICAgICAgICAgICByZXN1bHQuZGVsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoWyByZXN1bHQgXSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsaXN0ZW5lci5saW5rRGVsZXRlZCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGxpc3RlbmVyLmxpbmtEZWxldGVkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChhY2NvdW50LmlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdoYXNCZWVuUmVmcmVzaGVkKCkgcmV0dXJucyBmYWxzZSB3aGVuIGFjY291bnQgaGFzIG5vdCBiZWVuIHJlZnJlc2hlZCcsICgpID0+IHtcclxuICAgICAgICBleHBlY3QodHJhY2tlci5oYXNCZWVuUmVmcmVzaGVkKGFjY291bnQpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdpc1JlZnJlc2hpbmcoKSByZXR1cm5zIGZhbHNlIHdoZW4gYWNjb3VudCBoYXMgbm90IGJlZW4gcmVmcmVzaGVkJywgKCkgPT4ge1xyXG4gICAgICAgIGV4cGVjdCh0cmFja2VyLmlzUmVmcmVzaGluZyhhY2NvdW50KSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNCZWluZ1RyYWNrZWQoKScsICgpID0+IHtcclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBhY2NvdW50IGhhcyBub3QgYmVlbiB0cmFja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QodHJhY2tlci5pc0JlaW5nVHJhY2tlZChhY2NvdW50KSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYWNjb3VudCBpcyByZWZyZXNoaW5nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cmFja2VyLmFjY291bnRCZWluZ1JlZnJlc2hlZChhY2NvdW50LCBwcm9taXNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuaXNCZWluZ1RyYWNrZWQoYWNjb3VudCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYWNjb3VudCBpcyBkb25lIHJlZnJlc2hpbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyYWNrZXIuYWNjb3VudEJlaW5nUmVmcmVzaGVkKGFjY291bnQsIHByb21pc2UpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGFjY291bnQpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QodHJhY2tlci5pc0JlaW5nVHJhY2tlZChhY2NvdW50KSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZWdpc3RlclJlZnJlc2hMaXN0ZW5lcigpIGFkZHMgYSBsaXN0ZW5lcicsICgpID0+IHtcclxuICAgICAgICB0cmFja2VyLnJlZ2lzdGVyUmVmcmVzaExpc3RlbmVyKGxpc3RlbmVyKTtcclxuICAgICAgICBleHBlY3QodHJhY2tlci5yZWZyZXNoTGlzdGVuZXJzLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCd1bnJlZ2lzdGVyUmVmcmVzaExpc3RlbmVyKCkgcmVtb3ZlcyBhIGxpc3RlbmVyJywgKCkgPT4ge1xyXG4gICAgICAgIHRyYWNrZXIucmVnaXN0ZXJSZWZyZXNoTGlzdGVuZXIobGlzdGVuZXIpO1xyXG4gICAgICAgIHRyYWNrZXIudW5yZWdpc3RlclJlZnJlc2hMaXN0ZW5lcihsaXN0ZW5lcik7XHJcbiAgICAgICAgZXhwZWN0KHRyYWNrZXIucmVmcmVzaExpc3RlbmVycy5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
