System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('AccountRefreshResult', function () {

                var AccountRefreshResult = undefined,
                    AccountLink = undefined;

                beforeEach(module(identityModule));

                beforeEach(inject(function (_AccountRefreshResult_, _AccountLink_) {
                    AccountRefreshResult = _AccountRefreshResult_;
                    AccountLink = _AccountLink_;
                }));

                describe('constructor', function () {
                    it('go boom with no data', function () {
                        expect(function () {
                            return new AccountRefreshResult(null);
                        }).toThrow();
                    });

                    it('splode with no ID', function () {
                        expect(function () {
                            return new AccountRefreshResult({});
                        }).toThrow();
                    });

                    it('sets the values correctly', function () {
                        var id = 'id',
                            error = 'tick tick tick .... boom!',
                            deleted = true,
                            account = { id: 'accountId' };

                        var result = new AccountRefreshResult({
                            id: id,
                            error: error,
                            deleted: deleted,
                            account: account
                        });

                        expect(result.id).toEqual(id);
                        expect(result.error).toEqual(error);
                        expect(result.deleted).toEqual(deleted);
                        expect(result.account instanceof AccountLink).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0FjY291bnRSZWZyZXNoUmVzdWx0VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixVQUFVLFNBQVM7SUFDdkY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCOztRQUU3QyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsd0JBQXdCLFlBQU07O2dCQUVuQyxJQUFJLHVCQUFvQjtvQkFBRSxjQUFXOztnQkFFckMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsd0JBQXdCLGVBQWtCO29CQUN6RCx1QkFBdUI7b0JBQ3ZCLGNBQWM7OztnQkFHbEIsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsd0JBQXdCLFlBQU07d0JBQzdCLE9BQU8sWUFBQTs0QkFTUyxPQVRILElBQUkscUJBQXFCOzJCQUFPOzs7b0JBR2pELEdBQUcscUJBQXFCLFlBQU07d0JBQzFCLE9BQU8sWUFBQTs0QkFXUyxPQVhILElBQUkscUJBQXFCOzJCQUFLOzs7b0JBRy9DLEdBQUcsNkJBQTZCLFlBQU07d0JBQ2xDLElBQUksS0FBSzs0QkFDTCxRQUFROzRCQUNSLFVBQVU7NEJBQ1YsVUFBVSxFQUFFLElBQUk7O3dCQUVwQixJQUFJLFNBQVMsSUFBSSxxQkFBcUI7NEJBQ2xDLElBQUk7NEJBQ0osT0FBTzs0QkFDUCxTQUFTOzRCQUNULFNBQVM7Ozt3QkFHYixPQUFPLE9BQU8sSUFBSSxRQUFRO3dCQUMxQixPQUFPLE9BQU8sT0FBTyxRQUFRO3dCQUM3QixPQUFPLE9BQU8sU0FBUyxRQUFRO3dCQUMvQixPQUFPLE9BQU8sbUJBQW1CLGFBQWEsUUFBUTs7Ozs7O0dBa0IvRCIsImZpbGUiOiJpZGVudGl0eS9BY2NvdW50UmVmcmVzaFJlc3VsdFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnQWNjb3VudFJlZnJlc2hSZXN1bHQnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IEFjY291bnRSZWZyZXNoUmVzdWx0LCBBY2NvdW50TGluaztcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eU1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfQWNjb3VudFJlZnJlc2hSZXN1bHRfLCBfQWNjb3VudExpbmtfKSA9PiB7XHJcbiAgICAgICAgQWNjb3VudFJlZnJlc2hSZXN1bHQgPSBfQWNjb3VudFJlZnJlc2hSZXN1bHRfO1xyXG4gICAgICAgIEFjY291bnRMaW5rID0gX0FjY291bnRMaW5rXztcclxuICAgIH0pKTtcclxuXHJcbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2dvIGJvb20gd2l0aCBubyBkYXRhJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbmV3IEFjY291bnRSZWZyZXNoUmVzdWx0KG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzcGxvZGUgd2l0aCBubyBJRCcsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IG5ldyBBY2NvdW50UmVmcmVzaFJlc3VsdCh7fSkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgdGhlIHZhbHVlcyBjb3JyZWN0bHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9ICdpZCcsXHJcbiAgICAgICAgICAgICAgICBlcnJvciA9ICd0aWNrIHRpY2sgdGljayAuLi4uIGJvb20hJyxcclxuICAgICAgICAgICAgICAgIGRlbGV0ZWQgPSB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWNjb3VudCA9IHsgaWQ6ICdhY2NvdW50SWQnIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEFjY291bnRSZWZyZXNoUmVzdWx0KHtcclxuICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcixcclxuICAgICAgICAgICAgICAgIGRlbGV0ZWQ6IGRlbGV0ZWQsXHJcbiAgICAgICAgICAgICAgICBhY2NvdW50OiBhY2NvdW50XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5pZCkudG9FcXVhbChpZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQuZXJyb3IpLnRvRXF1YWwoZXJyb3IpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzdWx0LmRlbGV0ZWQpLnRvRXF1YWwoZGVsZXRlZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQuYWNjb3VudCBpbnN0YW5jZW9mIEFjY291bnRMaW5rKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
