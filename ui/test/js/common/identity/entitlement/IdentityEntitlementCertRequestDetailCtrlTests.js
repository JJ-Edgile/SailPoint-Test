System.register(['test/js/TestInitializer', 'common/identity/entitlement/IdentityEntitlementModule'], function (_export) {
    'use strict';

    var entitlementModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityEntitlementIdentityEntitlementModule) {
            entitlementModule = _commonIdentityEntitlementIdentityEntitlementModule['default'];
        }],
        execute: function () {

            describe('IdentityEntitlementCertRequestDetailCtrl', function () {

                var $controller = undefined;

                beforeEach(module(entitlementModule));

                beforeEach(inject(function (_$controller_) {
                    $controller = _$controller_;
                }));

                function createController(entitlement) {
                    return $controller('IdentityEntitlementCertRequestDetailCtrl', {
                        entitlement: entitlement
                    });
                }

                it('blows up with no entitlement', function () {
                    expect(function () {
                        return createController(null);
                    }).toThrow();
                });

                it('stores the entitlement', function () {
                    var entitlement = { i: 'am an entitlement' };
                    var ctrl = createController(entitlement);
                    expect(ctrl.entitlement).toEqual(entitlement);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9lbnRpdGxlbWVudC9JZGVudGl0eUVudGl0bGVtZW50Q2VydFJlcXVlc3REZXRhaWxDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBEQUEwRCxVQUFVLFNBQVM7SUFDckg7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHFEQUFxRDtZQUMzRyxvQkFBb0Isb0RBQW9EOztRQUU1RSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsNENBQTRDLFlBQU07O2dCQUV2RCxJQUFJLGNBQVc7O2dCQUVmLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGVBQWtCO29CQUNqQyxjQUFjOzs7Z0JBR2xCLFNBQVMsaUJBQWlCLGFBQWE7b0JBQ25DLE9BQU8sWUFBWSw0Q0FBNEM7d0JBQzNELGFBQWE7Ozs7Z0JBSXJCLEdBQUcsZ0NBQWdDLFlBQU07b0JBQ3JDLE9BQU8sWUFBQTt3QkFRUyxPQVJILGlCQUFpQjt1QkFBTzs7O2dCQUd6QyxHQUFHLDBCQUEwQixZQUFNO29CQUMvQixJQUFJLGNBQWMsRUFBRSxHQUFHO29CQUN2QixJQUFJLE9BQU8saUJBQWlCO29CQUM1QixPQUFPLEtBQUssYUFBYSxRQUFROzs7OztHQWN0QyIsImZpbGUiOiJjb21tb24vaWRlbnRpdHkvZW50aXRsZW1lbnQvSWRlbnRpdHlFbnRpdGxlbWVudENlcnRSZXF1ZXN0RGV0YWlsQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZW50aXRsZW1lbnRNb2R1bGUgZnJvbSAnY29tbW9uL2lkZW50aXR5L2VudGl0bGVtZW50L0lkZW50aXR5RW50aXRsZW1lbnRNb2R1bGUnO1xuXG5kZXNjcmliZSgnSWRlbnRpdHlFbnRpdGxlbWVudENlcnRSZXF1ZXN0RGV0YWlsQ3RybCcsICgpID0+IHtcblxuICAgIGxldCAkY29udHJvbGxlcjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGVudGl0bGVtZW50TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb250cm9sbGVyXykgPT4ge1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihlbnRpdGxlbWVudCkge1xuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ0lkZW50aXR5RW50aXRsZW1lbnRDZXJ0UmVxdWVzdERldGFpbEN0cmwnLCB7XG4gICAgICAgICAgICBlbnRpdGxlbWVudDogZW50aXRsZW1lbnRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXQoJ2Jsb3dzIHVwIHdpdGggbm8gZW50aXRsZW1lbnQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVDb250cm9sbGVyKG51bGwpKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc3RvcmVzIHRoZSBlbnRpdGxlbWVudCcsICgpID0+IHtcbiAgICAgICAgbGV0IGVudGl0bGVtZW50ID0geyBpOiAnYW0gYW4gZW50aXRsZW1lbnQnIH07XG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihlbnRpdGxlbWVudCk7XG4gICAgICAgIGV4cGVjdChjdHJsLmVudGl0bGVtZW50KS50b0VxdWFsKGVudGl0bGVtZW50KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
