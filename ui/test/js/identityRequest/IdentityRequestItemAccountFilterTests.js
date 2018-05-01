System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }],
        execute: function () {

            describe('spIdentityRequestItemAccount', function () {

                var identityRequestItemAccountFilter = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_spIdentityRequestItemAccountFilter_) {
                    identityRequestItemAccountFilter = _spIdentityRequestItemAccountFilter_;
                }));

                it('returns value if no item', function () {
                    var account = '1245';
                    expect(identityRequestItemAccountFilter(account)).toEqual(account);
                });

                it('returns value if no displayableAccountName on item', function () {
                    var account = '1245';
                    expect(identityRequestItemAccountFilter(account, {})).toEqual(account);
                });

                it('returns value if displayableAccountName matches value', function () {
                    var account = '1245',
                        item = {
                        displayableAccountName: account
                    };
                    expect(identityRequestItemAccountFilter(account, item)).toEqual(account);
                });

                it('returns displayableAccountName if no value is set', function () {
                    var account = '1245',
                        item = {
                        displayableAccountName: account
                    };
                    expect(identityRequestItemAccountFilter(null, item)).toEqual(account);
                });

                it('returns value with displayable name', function () {
                    var account = '1245',
                        item = {
                        displayableAccountName: 'abcd'
                    },
                        returnValue = account + ' (' + item.displayableAccountName + ')';
                    expect(identityRequestItemAccountFilter(account, item)).toEqual(returnValue);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RJdGVtQWNjb3VudEZpbHRlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsVUFBVSxTQUFTOzs7SUFHckc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDOztRQUVsRSxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsZ0NBQWdDLFlBQU07O2dCQUUzQyxJQUFJLG1DQUFnQzs7Z0JBRXBDLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLHNDQUF5QztvQkFDeEQsbUNBQW1DOzs7Z0JBR3ZDLEdBQUcsNEJBQTRCLFlBQU07b0JBQ2pDLElBQUksVUFBVTtvQkFDZCxPQUFPLGlDQUFpQyxVQUFVLFFBQVE7OztnQkFHOUQsR0FBRyxzREFBc0QsWUFBTTtvQkFDM0QsSUFBSSxVQUFVO29CQUNkLE9BQU8saUNBQWlDLFNBQVMsS0FBSyxRQUFROzs7Z0JBR2xFLEdBQUcseURBQXlELFlBQU07b0JBQzlELElBQUksVUFBVTt3QkFDVixPQUFPO3dCQUNILHdCQUF3Qjs7b0JBRWhDLE9BQU8saUNBQWlDLFNBQVMsT0FBTyxRQUFROzs7Z0JBR3BFLEdBQUcscURBQXFELFlBQU07b0JBQzFELElBQUksVUFBVTt3QkFDVixPQUFPO3dCQUNILHdCQUF3Qjs7b0JBRWhDLE9BQU8saUNBQWlDLE1BQU0sT0FBTyxRQUFROzs7Z0JBR2pFLEdBQUcsdUNBQXVDLFlBQU07b0JBQzVDLElBQUksVUFBVTt3QkFDVixPQUFPO3dCQUNILHdCQUF3Qjs7d0JBRTVCLGNBQWlCLFVBQU8sT0FBSyxLQUFLLHlCQUFzQjtvQkFDNUQsT0FBTyxpQ0FBaUMsU0FBUyxPQUFPLFFBQVE7Ozs7O0dBV3JFIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RJdGVtQWNjb3VudEZpbHRlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnc3BJZGVudGl0eVJlcXVlc3RJdGVtQWNjb3VudCcsICgpID0+IHtcblxuICAgIGxldCBpZGVudGl0eVJlcXVlc3RJdGVtQWNjb3VudEZpbHRlcjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5UmVxdWVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9zcElkZW50aXR5UmVxdWVzdEl0ZW1BY2NvdW50RmlsdGVyXykgPT4ge1xuICAgICAgICBpZGVudGl0eVJlcXVlc3RJdGVtQWNjb3VudEZpbHRlciA9IF9zcElkZW50aXR5UmVxdWVzdEl0ZW1BY2NvdW50RmlsdGVyXztcbiAgICB9KSk7XG5cbiAgICBpdCgncmV0dXJucyB2YWx1ZSBpZiBubyBpdGVtJywgKCkgPT4ge1xuICAgICAgICBsZXQgYWNjb3VudCA9ICcxMjQ1JztcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdEl0ZW1BY2NvdW50RmlsdGVyKGFjY291bnQpKS50b0VxdWFsKGFjY291bnQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdmFsdWUgaWYgbm8gZGlzcGxheWFibGVBY2NvdW50TmFtZSBvbiBpdGVtJywgKCkgPT4ge1xuICAgICAgICBsZXQgYWNjb3VudCA9ICcxMjQ1JztcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdEl0ZW1BY2NvdW50RmlsdGVyKGFjY291bnQsIHt9KSkudG9FcXVhbChhY2NvdW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHZhbHVlIGlmIGRpc3BsYXlhYmxlQWNjb3VudE5hbWUgbWF0Y2hlcyB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgbGV0IGFjY291bnQgPSAnMTI0NScsXG4gICAgICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlQWNjb3VudE5hbWU6IGFjY291bnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3RJdGVtQWNjb3VudEZpbHRlcihhY2NvdW50LCBpdGVtKSkudG9FcXVhbChhY2NvdW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGRpc3BsYXlhYmxlQWNjb3VudE5hbWUgaWYgbm8gdmFsdWUgaXMgc2V0JywgKCkgPT4ge1xuICAgICAgICBsZXQgYWNjb3VudCA9ICcxMjQ1JyxcbiAgICAgICAgICAgIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheWFibGVBY2NvdW50TmFtZTogYWNjb3VudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdEl0ZW1BY2NvdW50RmlsdGVyKG51bGwsIGl0ZW0pKS50b0VxdWFsKGFjY291bnQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdmFsdWUgd2l0aCBkaXNwbGF5YWJsZSBuYW1lJywgKCkgPT4ge1xuICAgICAgICBsZXQgYWNjb3VudCA9ICcxMjQ1JyxcbiAgICAgICAgICAgIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheWFibGVBY2NvdW50TmFtZTogJ2FiY2QnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBgJHthY2NvdW50fSAoJHtpdGVtLmRpc3BsYXlhYmxlQWNjb3VudE5hbWV9KWA7XG4gICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3RJdGVtQWNjb3VudEZpbHRlcihhY2NvdW50LCBpdGVtKSkudG9FcXVhbChyZXR1cm5WYWx1ZSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
