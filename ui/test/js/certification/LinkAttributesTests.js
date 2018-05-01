System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('LinkAttributes', function () {

                var LinkAttributes = undefined,
                    data = undefined;

                beforeEach(module(certificationModule));
                beforeEach(inject(function (_LinkAttributes_) {
                    LinkAttributes = _LinkAttributes_;
                    data = {
                        appName: 'appName-123',
                        instance: 'instance-a',
                        lastRefreshDate: '1234567',
                        accountName: 'account 01',
                        icons: [{
                            icon: 'iconUrl',
                            title: 'iconTitle'
                        }]
                    };
                }));

                describe('constructor', function () {
                    it('should throw with no data', function () {
                        expect(function () {
                            return new LinkAttributes(null);
                        }).toThrow();
                    });

                    it('sets properties for the LinkAttributes', function () {
                        var attributes = new LinkAttributes(data);
                        expect(attributes.applicationName).toEqual(data.appName);
                        expect(attributes.instance).toEqual(data.instance);
                        expect(attributes.lastRefreshDate).toEqual(data.lastRefresh);
                        expect(attributes.accountStatusIcons.length).toEqual(1);
                        expect(attributes.accountStatusIcons[0].icon).toEqual(data.icons[0].icon);
                        expect(attributes.accountStatusIcons[0].title).toEqual(data.icons[0].title);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vTGlua0F0dHJpYnV0ZXNUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7O0lBR2pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZOztZQUw3QixTQUFTLGtCQUFrQixZQUFNOztnQkFFN0IsSUFBSSxpQkFBYztvQkFDZCxPQUFJOztnQkFFUixXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFDLGtCQUFxQjtvQkFDcEMsaUJBQWlCO29CQUNqQixPQUFPO3dCQUNILFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsT0FBTyxDQUFDOzRCQUNKLE1BQU07NEJBQ04sT0FBTzs7Ozs7Z0JBS25CLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLDZCQUE2QixZQUFNO3dCQUNsQyxPQUFPLFlBQUE7NEJBUVMsT0FSSCxJQUFJLGVBQWU7MkJBQU87OztvQkFHM0MsR0FBRywwQ0FBMEMsWUFBTTt3QkFDL0MsSUFBSSxhQUFhLElBQUksZUFBZTt3QkFDcEMsT0FBTyxXQUFXLGlCQUFpQixRQUFRLEtBQUs7d0JBQ2hELE9BQU8sV0FBVyxVQUFVLFFBQVEsS0FBSzt3QkFDekMsT0FBTyxXQUFXLGlCQUFpQixRQUFRLEtBQUs7d0JBQ2hELE9BQU8sV0FBVyxtQkFBbUIsUUFBUSxRQUFRO3dCQUNyRCxPQUFPLFdBQVcsbUJBQW1CLEdBQUcsTUFBTSxRQUFRLEtBQUssTUFBTSxHQUFHO3dCQUNwRSxPQUFPLFdBQVcsbUJBQW1CLEdBQUcsT0FBTyxRQUFRLEtBQUssTUFBTSxHQUFHOzs7Ozs7R0FlOUUiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9MaW5rQXR0cmlidXRlc1Rlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcblxuZGVzY3JpYmUoJ0xpbmtBdHRyaWJ1dGVzJywgKCkgPT4ge1xuXG4gICAgbGV0IExpbmtBdHRyaWJ1dGVzLFxuICAgICAgICBkYXRhO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfTGlua0F0dHJpYnV0ZXNfKSA9PiB7XG4gICAgICAgIExpbmtBdHRyaWJ1dGVzID0gX0xpbmtBdHRyaWJ1dGVzXztcbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIGFwcE5hbWU6ICdhcHBOYW1lLTEyMycsXG4gICAgICAgICAgICBpbnN0YW5jZTogJ2luc3RhbmNlLWEnLFxuICAgICAgICAgICAgbGFzdFJlZnJlc2hEYXRlOiAnMTIzNDU2NycsXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogJ2FjY291bnQgMDEnLFxuICAgICAgICAgICAgaWNvbnM6IFt7XG4gICAgICAgICAgICAgICAgaWNvbjogJ2ljb25VcmwnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnaWNvblRpdGxlJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2l0aCBubyBkYXRhJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IG5ldyBMaW5rQXR0cmlidXRlcyhudWxsKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2V0cyBwcm9wZXJ0aWVzIGZvciB0aGUgTGlua0F0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYXR0cmlidXRlcyA9IG5ldyBMaW5rQXR0cmlidXRlcyhkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdChhdHRyaWJ1dGVzLmFwcGxpY2F0aW9uTmFtZSkudG9FcXVhbChkYXRhLmFwcE5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KGF0dHJpYnV0ZXMuaW5zdGFuY2UpLnRvRXF1YWwoZGF0YS5pbnN0YW5jZSk7XG4gICAgICAgICAgICBleHBlY3QoYXR0cmlidXRlcy5sYXN0UmVmcmVzaERhdGUpLnRvRXF1YWwoZGF0YS5sYXN0UmVmcmVzaCk7XG4gICAgICAgICAgICBleHBlY3QoYXR0cmlidXRlcy5hY2NvdW50U3RhdHVzSWNvbnMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGF0dHJpYnV0ZXMuYWNjb3VudFN0YXR1c0ljb25zWzBdLmljb24pLnRvRXF1YWwoZGF0YS5pY29uc1swXS5pY29uKTtcbiAgICAgICAgICAgIGV4cGVjdChhdHRyaWJ1dGVzLmFjY291bnRTdGF0dXNJY29uc1swXS50aXRsZSkudG9FcXVhbChkYXRhLmljb25zWzBdLnRpdGxlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
