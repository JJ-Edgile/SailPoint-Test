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
            describe('spProvisioningTransactionStatusColumn', function () {

                var elementDefinition = '<sp-provisioning-transaction-status-column sp-model="item" />',
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

                function createProvisioningTransaction(status) {
                    var data = provisioningTransactionTestData.PTO1;

                    if (status) {
                        data.status = status;
                    }

                    return new ProvisioningTransaction(data);
                }

                it('should throw when no spModel specified', function () {
                    expect(function () {
                        return createElement(null);
                    }).toThrow();
                });

                it('should render the correct bullet for Success', function () {
                    var provTrans = createProvisioningTransaction(ProvisioningTransaction.Status.SUCCESS),
                        el = createElement(provTrans);

                    expect(el.find('i.text-success').length).toEqual(1);
                    expect(el.find('i.fa-check-circle').length).toEqual(1);
                });

                it('should render the correct bullet for Pending', function () {
                    var provTrans = createProvisioningTransaction(ProvisioningTransaction.Status.PENDING),
                        el = createElement(provTrans);

                    expect(el.find('i.text-info').length).toEqual(1);
                    expect(el.find('i.fa-cog').length).toEqual(1);
                });

                it('should render the correct bullet for Failed', function () {
                    var provTrans = createProvisioningTransaction(ProvisioningTransaction.Status.FAILED),
                        el = createElement(provTrans);

                    expect(el.find('i.text-danger').length).toEqual(1);
                    expect(el.find('i.fa-exclamation-triangle').length).toEqual(1);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvblN0YXR1c0NvbHVtbkRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5RUFBeUUsdUJBQXVCLFVBQVUsU0FBUzs7O0lBRzNKOztJQUVBLElBQUksK0JBQStCO0lBQ25DLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHFFQUFxRTtZQUMzSCxnQ0FBZ0Msb0VBQW9FO1dBQ3JHLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7WUFQN0IsU0FBUyx5Q0FBeUMsWUFBTTs7Z0JBRXBELElBQUksb0JBQWlCO29CQUNqQiwwQkFBdUI7b0JBQUUsa0NBQStCO29CQUFFLFdBQVE7b0JBQUUsU0FBTTs7Z0JBRTlFLFdBQVcsT0FBTywrQkFBK0I7O2dCQUVqRCxXQUFXLE9BQU8sVUFBQywyQkFBMkIsWUFDM0IsbUNBQW1DLGNBQWlCO29CQUNuRSwwQkFBMEI7b0JBQzFCLGtDQUFrQztvQkFDbEMsV0FBVztvQkFDWCxTQUFTLGFBQWE7OztnQkFHMUIsU0FBUyxjQUFjLE1BQU07b0JBQ3pCLElBQUksVUFBVSxRQUFRLFFBQVE7O29CQUU5QixPQUFPLE9BQU87b0JBQ2QsU0FBUyxTQUFTO29CQUNsQixPQUFPOztvQkFFUCxPQUFPOzs7Z0JBR1gsU0FBUyw4QkFBOEIsUUFBUTtvQkFDM0MsSUFBSSxPQUFPLGdDQUFnQzs7b0JBRTNDLElBQUksUUFBUTt3QkFDUixLQUFLLFNBQVM7OztvQkFHbEIsT0FBTyxJQUFJLHdCQUF3Qjs7O2dCQUd2QyxHQUFHLDBDQUEwQyxZQUFNO29CQUMvQyxPQUFPLFlBQUE7d0JBV1MsT0FYSCxjQUFjO3VCQUFPOzs7Z0JBR3RDLEdBQUcsZ0RBQWdELFlBQU07b0JBQ3JELElBQUksWUFBWSw4QkFBOEIsd0JBQXdCLE9BQU87d0JBQ3pFLEtBQUssY0FBYzs7b0JBRXZCLE9BQU8sR0FBRyxLQUFLLGtCQUFrQixRQUFRLFFBQVE7b0JBQ2pELE9BQU8sR0FBRyxLQUFLLHFCQUFxQixRQUFRLFFBQVE7OztnQkFHeEQsR0FBRyxnREFBZ0QsWUFBTTtvQkFDckQsSUFBSSxZQUFZLDhCQUE4Qix3QkFBd0IsT0FBTzt3QkFDekUsS0FBSyxjQUFjOztvQkFFdkIsT0FBTyxHQUFHLEtBQUssZUFBZSxRQUFRLFFBQVE7b0JBQzlDLE9BQU8sR0FBRyxLQUFLLFlBQVksUUFBUSxRQUFROzs7Z0JBRy9DLEdBQUcsK0NBQStDLFlBQU07b0JBQ3BELElBQUksWUFBWSw4QkFBOEIsd0JBQXdCLE9BQU87d0JBQ3pFLEtBQUssY0FBYzs7b0JBRXZCLE9BQU8sR0FBRyxLQUFLLGlCQUFpQixRQUFRLFFBQVE7b0JBQ2hELE9BQU8sR0FBRyxLQUFLLDZCQUE2QixRQUFRLFFBQVE7Ozs7O0dBaUJqRSIsImZpbGUiOiJhZG1pbkNvbnNvbGUvcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24vUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TdGF0dXNDb2x1bW5EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwcm92aXNpb25pbmdUcmFuc2FjdGlvbk1vZHVsZSBmcm9tICdhZG1pbkNvbnNvbGUvcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24vUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25Nb2R1bGUuanMnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcbmRlc2NyaWJlKCdzcFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU3RhdHVzQ29sdW1uJywgKCkgPT4ge1xuXG4gICAgbGV0IGVsZW1lbnREZWZpbml0aW9uID0gYDxzcC1wcm92aXNpb25pbmctdHJhbnNhY3Rpb24tc3RhdHVzLWNvbHVtbiBzcC1tb2RlbD1cIml0ZW1cIiAvPmAsXG4gICAgICAgIFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uLCBwcm92aXNpb25pbmdUcmFuc2FjdGlvblRlc3REYXRhLCAkY29tcGlsZSwgJHNjb3BlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25Nb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25fLCBfJGNvbXBpbGVfLFxuICAgICAgICAgICAgICAgICAgICAgICBfcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25UZXN0RGF0YV8sIF8kcm9vdFNjb3BlXykgPT4ge1xuICAgICAgICBQcm92aXNpb25pbmdUcmFuc2FjdGlvbiA9IF9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbl87XG4gICAgICAgIHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uVGVzdERhdGEgPSBfcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25UZXN0RGF0YV87XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGl0ZW0pIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xuXG4gICAgICAgICRzY29wZS5pdGVtID0gaXRlbTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uKHN0YXR1cykge1xuICAgICAgICBsZXQgZGF0YSA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uVGVzdERhdGEuUFRPMTtcblxuICAgICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgICAgICBkYXRhLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oZGF0YSk7XG4gICAgfVxuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyB3aGVuIG5vIHNwTW9kZWwgc3BlY2lmaWVkJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudChudWxsKSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW5kZXIgdGhlIGNvcnJlY3QgYnVsbGV0IGZvciBTdWNjZXNzJywgKCkgPT4ge1xuICAgICAgICBsZXQgcHJvdlRyYW5zID0gY3JlYXRlUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24uU3RhdHVzLlNVQ0NFU1MpLFxuICAgICAgICAgICAgZWwgPSBjcmVhdGVFbGVtZW50KHByb3ZUcmFucyk7XG5cbiAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ2kudGV4dC1zdWNjZXNzJykubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QoZWwuZmluZCgnaS5mYS1jaGVjay1jaXJjbGUnKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlbmRlciB0aGUgY29ycmVjdCBidWxsZXQgZm9yIFBlbmRpbmcnLCAoKSA9PiB7XG4gICAgICAgIGxldCBwcm92VHJhbnMgPSBjcmVhdGVQcm92aXNpb25pbmdUcmFuc2FjdGlvbihQcm92aXNpb25pbmdUcmFuc2FjdGlvbi5TdGF0dXMuUEVORElORyksXG4gICAgICAgICAgICBlbCA9IGNyZWF0ZUVsZW1lbnQocHJvdlRyYW5zKTtcblxuICAgICAgICBleHBlY3QoZWwuZmluZCgnaS50ZXh0LWluZm8nKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChlbC5maW5kKCdpLmZhLWNvZycpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVuZGVyIHRoZSBjb3JyZWN0IGJ1bGxldCBmb3IgRmFpbGVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgcHJvdlRyYW5zID0gY3JlYXRlUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24uU3RhdHVzLkZBSUxFRCksXG4gICAgICAgICAgICBlbCA9IGNyZWF0ZUVsZW1lbnQocHJvdlRyYW5zKTtcblxuICAgICAgICBleHBlY3QoZWwuZmluZCgnaS50ZXh0LWRhbmdlcicpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ2kuZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUnKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbn0pO1xuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
