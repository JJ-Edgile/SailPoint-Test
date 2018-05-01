System.register(['test/js/TestInitializer', 'adminConsole/provisioningTransaction/ProvisioningTransactionModule.js', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var provisioningTransactionModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleProvisioningTransactionProvisioningTransactionModuleJs) {
            provisioningTransactionModule = _adminConsoleProvisioningTransactionProvisioningTransactionModuleJs['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('spProvisioningTransactionOpColumn', function () {

                var elementDefinition = '<sp-provisioning-transaction-op-column sp-model="item" />',
                    ProvisioningTransaction = undefined,
                    provisioningTransactionTestData = undefined,
                    $compile = undefined,
                    $scope = undefined;

                beforeEach(module(provisioningTransactionModule, testModule));

                beforeEach(inject(function (_ProvisioningTransaction_, _$compile_, _provisioningTransactionTestData_, _$rootScope_) {
                    ProvisioningTransaction = _ProvisioningTransaction_;
                    provisioningTransactionTestData = _provisioningTransactionTestData_;
                    $compile = _$compile_;
                    $scope = _$rootScope_.$new();
                }));

                function createElement(item) {
                    var element = angular.element(elementDefinition);

                    $scope.item = item;
                    $compile(element)($scope);
                    $scope.$apply();

                    return element;
                }

                it('should throw when no spModel specified', function () {
                    expect(function () {
                        return createElement(null);
                    }).toThrow();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbk9wQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlFQUF5RSx1QkFBdUIsVUFBVSxTQUFTOzs7SUFHM0o7O0lBRUEsSUFBSSwrQkFBK0I7SUFDbkMsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscUVBQXFFO1lBQzNILGdDQUFnQyxvRUFBb0U7V0FDckcsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxxQ0FBcUMsWUFBTTs7Z0JBRWhELElBQUksb0JBQWlCO29CQUNqQiwwQkFBdUI7b0JBQUUsa0NBQStCO29CQUFFLFdBQVE7b0JBQUUsU0FBTTs7Z0JBRTlFLFdBQVcsT0FBTywrQkFBK0I7O2dCQUVqRCxXQUFXLE9BQU8sVUFBQywyQkFBMkIsWUFDM0IsbUNBQW1DLGNBQWlCO29CQUNuRSwwQkFBMEI7b0JBQzFCLGtDQUFrQztvQkFDbEMsV0FBVztvQkFDWCxTQUFTLGFBQWE7OztnQkFHMUIsU0FBUyxjQUFjLE1BQU07b0JBQ3pCLElBQUksVUFBVSxRQUFRLFFBQVE7O29CQUU5QixPQUFPLE9BQU87b0JBQ2QsU0FBUyxTQUFTO29CQUNsQixPQUFPOztvQkFFUCxPQUFPOzs7Z0JBR1gsR0FBRywwQ0FBMEMsWUFBTTtvQkFDL0MsT0FBTyxZQUFBO3dCQVdTLE9BWEgsY0FBYzt1QkFBTzs7Ozs7R0FpQnZDIiwiZmlsZSI6ImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbk9wQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25Nb2R1bGUgZnJvbSAnYWRtaW5Db25zb2xlL3Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uL1Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uTW9kdWxlLmpzJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdzcFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uT3BDb2x1bW4nLCAoKSA9PiB7XG5cbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPSBgPHNwLXByb3Zpc2lvbmluZy10cmFuc2FjdGlvbi1vcC1jb2x1bW4gc3AtbW9kZWw9XCJpdGVtXCIgLz5gLFxuICAgICAgICBQcm92aXNpb25pbmdUcmFuc2FjdGlvbiwgcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25UZXN0RGF0YSwgJGNvbXBpbGUsICRzY29wZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX1Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uXywgXyRjb21waWxlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgX3Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uVGVzdERhdGFfLCBfJHJvb3RTY29wZV8pID0+IHtcbiAgICAgICAgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24gPSBfUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25fO1xuICAgICAgICBwcm92aXNpb25pbmdUcmFuc2FjdGlvblRlc3REYXRhID0gX3Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uVGVzdERhdGFfO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChpdGVtKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcblxuICAgICAgICAkc2NvcGUuaXRlbSA9IGl0ZW07XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IHdoZW4gbm8gc3BNb2RlbCBzcGVjaWZpZWQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVFbGVtZW50KG51bGwpKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbn0pO1xuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
