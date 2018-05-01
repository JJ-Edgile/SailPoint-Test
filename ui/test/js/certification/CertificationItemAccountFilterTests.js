System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('certItemAccountFilter', function () {
                var certItemAccountFilter = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_certItemAccountFilter_, spTranslateFilter) {
                    certItemAccountFilter = _certItemAccountFilter_;
                    spTranslateFilter.configureCatalog({
                        'ui_cert_item_account': '{0} on {1}',
                        'ui_cert_item_account_with_instance': '{0} on {1}, instance {2}'
                    });
                }));

                it('returns account string', function () {
                    var item = {
                        application: 'App1',
                        attributes: {
                            accountName: 'Acct1'
                        }
                    },
                        filteredValue = certItemAccountFilter('', item);
                    expect(filteredValue).toEqual('Acct1 on App1');
                });

                it('returns account string with instance', function () {
                    var item = {
                        application: 'App1',
                        instance: 'Inst1',
                        attributes: {
                            accountName: 'Acct1'
                        }
                    },
                        filteredValue = certItemAccountFilter('', item);
                    expect(filteredValue).toEqual('Acct1 on App1, instance Inst1');
                });

                it('returns empty string if no account info', function () {
                    var item = {},
                        filteredValue = certItemAccountFilter('', item);
                    expect(filteredValue).toEqual('');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkl0ZW1BY2NvdW50RmlsdGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyw0Q0FBNEMsVUFBVSxTQUFTOzs7SUFHNUk7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsc0NBQXNDO1FBQ25ELFNBQVMsWUFBWTs7WUFKN0IsU0FBUyx5QkFBeUIsWUFBTTtnQkFDcEMsSUFBSSx3QkFBcUI7O2dCQUV6QixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyx5QkFBeUIsbUJBQXNCO29CQUM5RCx3QkFBd0I7b0JBQ3hCLGtCQUFrQixpQkFBaUI7d0JBQy9CLHdCQUF3Qjt3QkFDeEIsc0NBQXNDOzs7O2dCQUk5QyxHQUFHLDBCQUEwQixZQUFNO29CQUMvQixJQUFJLE9BQU87d0JBQ1AsYUFBYTt3QkFDYixZQUFZOzRCQUNSLGFBQWE7Ozt3QkFFbEIsZ0JBQWdCLHNCQUFzQixJQUFJO29CQUM3QyxPQUFPLGVBQWUsUUFBUTs7O2dCQUdsQyxHQUFHLHdDQUF3QyxZQUFNO29CQUM3QyxJQUFJLE9BQU87d0JBQ1AsYUFBYTt3QkFDYixVQUFVO3dCQUNWLFlBQVk7NEJBQ1IsYUFBYTs7O3dCQUVsQixnQkFBZ0Isc0JBQXNCLElBQUk7b0JBQzdDLE9BQU8sZUFBZSxRQUFROzs7Z0JBR2xDLEdBQUcsMkNBQTJDLFlBQU07b0JBQ2hELElBQUksT0FBTzt3QkFDUCxnQkFBZ0Isc0JBQXNCLElBQUk7b0JBQzlDLE9BQU8sZUFBZSxRQUFROzs7OztHQWFuQyIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25JdGVtQWNjb3VudEZpbHRlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcblxuZGVzY3JpYmUoJ2NlcnRJdGVtQWNjb3VudEZpbHRlcicsICgpID0+IHtcbiAgICBsZXQgY2VydEl0ZW1BY2NvdW50RmlsdGVyO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9jZXJ0SXRlbUFjY291bnRGaWx0ZXJfLCBzcFRyYW5zbGF0ZUZpbHRlcikgPT4ge1xuICAgICAgICBjZXJ0SXRlbUFjY291bnRGaWx0ZXIgPSBfY2VydEl0ZW1BY2NvdW50RmlsdGVyXztcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XG4gICAgICAgICAgICAndWlfY2VydF9pdGVtX2FjY291bnQnOiAnezB9IG9uIHsxfScsXG4gICAgICAgICAgICAndWlfY2VydF9pdGVtX2FjY291bnRfd2l0aF9pbnN0YW5jZSc6ICd7MH0gb24gezF9LCBpbnN0YW5jZSB7Mn0nXG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGl0KCdyZXR1cm5zIGFjY291bnQgc3RyaW5nJywgKCkgPT4ge1xuICAgICAgICBsZXQgaXRlbSA9IHtcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnQXBwMScsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgYWNjb3VudE5hbWU6ICdBY2N0MSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZmlsdGVyZWRWYWx1ZSA9IGNlcnRJdGVtQWNjb3VudEZpbHRlcignJywgaXRlbSk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKCdBY2N0MSBvbiBBcHAxJyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhY2NvdW50IHN0cmluZyB3aXRoIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgaXRlbSA9IHtcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnQXBwMScsXG4gICAgICAgICAgICBpbnN0YW5jZTogJ0luc3QxJyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ0FjY3QxJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmaWx0ZXJlZFZhbHVlID0gY2VydEl0ZW1BY2NvdW50RmlsdGVyKCcnLCBpdGVtKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsdWUpLnRvRXF1YWwoJ0FjY3QxIG9uIEFwcDEsIGluc3RhbmNlIEluc3QxJyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBlbXB0eSBzdHJpbmcgaWYgbm8gYWNjb3VudCBpbmZvJywgKCkgPT4ge1xuICAgICAgICBsZXQgaXRlbSA9IHt9LFxuICAgICAgICAgICAgZmlsdGVyZWRWYWx1ZSA9IGNlcnRJdGVtQWNjb3VudEZpbHRlcignJywgaXRlbSk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
