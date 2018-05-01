System.register(['test/js/TestInitializer', 'common/managedattribute/ManagedAttributeModule'], function (_export) {
    'use strict';

    var managedAttributeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonManagedattributeManagedAttributeModule) {
            managedAttributeModule = _commonManagedattributeManagedAttributeModule['default'];
        }],
        execute: function () {

            describe('ManagedAttributeAccessDirective', function () {

                var $scope = undefined,
                    $compile = undefined;

                function createElement(managedAttribute, resourceUrl) {
                    var element = undefined,
                        elementDef = '<sp-managed-attribute-access ' + 'sp-managed-attribute="fakeCtrl.managedAttribute"' + 'sp-managed-attribute-access="fakeCtrl.resourceUrl">' + '</sp-managed-attribute-access>';
                    $scope.fakeCtrl.managedAttribute = managedAttribute;
                    $scope.fakeCtrl.resourceUrl = resourceUrl;
                    element = angular.element(elementDef);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                beforeEach(module(managedAttributeModule));
                beforeEach(inject(function (_$rootScope_, _$compile_) {
                    $scope = _$rootScope_.$new();
                    $scope.fakeCtrl = {};
                    $compile = _$compile_;
                }));

                it('should throw with no managed attribute', function () {
                    expect(function () {
                        return createElement(undefined, 'adfasdfasdfasd');
                    }).toThrow();
                });

                it('should throw with no resource url', function () {
                    expect(function () {
                        return createElement({});
                    }).toThrow();
                });
            });

            describe('ManagedAttributeAccessCtrl', function () {
                var managedAttributeService = undefined,
                    ctrl = undefined;

                beforeEach(module(managedAttributeModule));
                beforeEach(inject(function ($controller, _managedAttributeService_) {
                    ctrl = $controller('ManagedAttributeAccessCtrl', { managedAttributeService: _managedAttributeService_ });
                    managedAttributeService = _managedAttributeService_;
                }));

                describe('getAccess()', function () {
                    it('should call through to managedAttributeService with correct parameters', function () {
                        var someUrl = 'someurl',
                            start = 55,
                            itemsPer = 42,
                            order = 'soccer';
                        spyOn(managedAttributeService, 'getEntitlementAccess').and.returnValue({});
                        ctrl.detailResourceUrl = someUrl;
                        ctrl.getAccess(start, itemsPer, order);
                        expect(managedAttributeService.getEntitlementAccess).toHaveBeenCalledWith(someUrl, start, itemsPer, order);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVBY2Nlc3NEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsbURBQW1ELFVBQVUsU0FBUztJQUM5Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsK0NBQStDO1lBQ3JHLHlCQUF5Qiw4Q0FBOEM7O1FBRTNFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxtQ0FBbUMsWUFBVzs7Z0JBRW5ELElBQUksU0FBTTtvQkFDTixXQUFROztnQkFFWixTQUFTLGNBQWMsa0JBQWtCLGFBQWE7b0JBQ2xELElBQUksVUFBTzt3QkFDUCxhQUFhLGtDQUNULHFEQUNBLHdEQUNBO29CQUNSLE9BQU8sU0FBUyxtQkFBbUI7b0JBQ25DLE9BQU8sU0FBUyxjQUFjO29CQUM5QixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87OztnQkFHWCxXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWTtvQkFDakQsU0FBUyxhQUFhO29CQUN0QixPQUFPLFdBQVc7b0JBQ2xCLFdBQVc7OztnQkFHZixHQUFHLDBDQUEwQyxZQUFNO29CQUMvQyxPQUFPLFlBQUE7d0JBS1MsT0FMSCxjQUFjLFdBQVc7dUJBQW1COzs7Z0JBRzdELEdBQUcscUNBQXFDLFlBQU07b0JBQzFDLE9BQU8sWUFBQTt3QkFPUyxPQVBILGNBQWM7dUJBQUs7Ozs7WUFJeEMsU0FBUyw4QkFBOEIsWUFBTTtnQkFDekMsSUFBSSwwQkFBdUI7b0JBQUUsT0FBSTs7Z0JBRWpDLFdBQVcsT0FBTztnQkFDbEIsV0FBVyxPQUFPLFVBQUMsYUFBYSwyQkFBOEI7b0JBQzFELE9BQU8sWUFBWSw4QkFBOEIsRUFBQyx5QkFBeUI7b0JBQzNFLDBCQUEwQjs7O2dCQUc5QixTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRywwRUFBMEUsWUFBTTt3QkFDL0UsSUFBSSxVQUFVOzRCQUNWLFFBQVE7NEJBQ1IsV0FBVzs0QkFDWCxRQUFRO3dCQUNaLE1BQU0seUJBQXlCLHdCQUF3QixJQUFJLFlBQVk7d0JBQ3ZFLEtBQUssb0JBQW9CO3dCQUN6QixLQUFLLFVBQVUsT0FBTyxVQUFVO3dCQUNoQyxPQUFPLHdCQUF3QixzQkFBc0IscUJBQXFCLFNBQVMsT0FBTyxVQUFVOzs7Ozs7R0FlN0ciLCJmaWxlIjoiY29tbW9uL21hbmFnZWRhdHRyaWJ1dGUvTWFuYWdlZEF0dHJpYnV0ZUFjY2Vzc0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbWFuYWdlZEF0dHJpYnV0ZU1vZHVsZSBmcm9tICdjb21tb24vbWFuYWdlZGF0dHJpYnV0ZS9NYW5hZ2VkQXR0cmlidXRlTW9kdWxlJztcblxuZGVzY3JpYmUoJ01hbmFnZWRBdHRyaWJ1dGVBY2Nlc3NEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCAkc2NvcGUsXG4gICAgICAgICRjb21waWxlO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChtYW5hZ2VkQXR0cmlidXRlLCByZXNvdXJjZVVybCkge1xuICAgICAgICBsZXQgZWxlbWVudCxcbiAgICAgICAgICAgIGVsZW1lbnREZWYgPSAnPHNwLW1hbmFnZWQtYXR0cmlidXRlLWFjY2VzcyAnICtcbiAgICAgICAgICAgICAgICAnc3AtbWFuYWdlZC1hdHRyaWJ1dGU9XCJmYWtlQ3RybC5tYW5hZ2VkQXR0cmlidXRlXCInICtcbiAgICAgICAgICAgICAgICAnc3AtbWFuYWdlZC1hdHRyaWJ1dGUtYWNjZXNzPVwiZmFrZUN0cmwucmVzb3VyY2VVcmxcIj4nICtcbiAgICAgICAgICAgICAgICAnPC9zcC1tYW5hZ2VkLWF0dHJpYnV0ZS1hY2Nlc3M+JztcbiAgICAgICAgJHNjb3BlLmZha2VDdHJsLm1hbmFnZWRBdHRyaWJ1dGUgPSBtYW5hZ2VkQXR0cmlidXRlO1xuICAgICAgICAkc2NvcGUuZmFrZUN0cmwucmVzb3VyY2VVcmwgPSByZXNvdXJjZVVybDtcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmKTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtYW5hZ2VkQXR0cmlidXRlTW9kdWxlKSk7XG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfKSB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XG4gICAgICAgICRzY29wZS5mYWtlQ3RybCA9IHt9O1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIG1hbmFnZWQgYXR0cmlidXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudCh1bmRlZmluZWQsICdhZGZhc2RmYXNkZmFzZCcpKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gcmVzb3VyY2UgdXJsJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudCh7fSkpLnRvVGhyb3coKTtcbiAgICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnTWFuYWdlZEF0dHJpYnV0ZUFjY2Vzc0N0cmwnLCAoKSA9PiB7XG4gICAgbGV0IG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLCBjdHJsO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobWFuYWdlZEF0dHJpYnV0ZU1vZHVsZSkpO1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KCgkY29udHJvbGxlciwgX21hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlXykgPT4ge1xuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ01hbmFnZWRBdHRyaWJ1dGVBY2Nlc3NDdHJsJywge21hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlOiBfbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2VffSk7XG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlID0gX21hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0QWNjZXNzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlIHdpdGggY29ycmVjdCBwYXJhbWV0ZXJzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNvbWVVcmwgPSAnc29tZXVybCcsXG4gICAgICAgICAgICAgICAgc3RhcnQgPSA1NSxcbiAgICAgICAgICAgICAgICBpdGVtc1BlciA9IDQyLFxuICAgICAgICAgICAgICAgIG9yZGVyID0gJ3NvY2Nlcic7XG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VkQXR0cmlidXRlU2VydmljZSwgJ2dldEVudGl0bGVtZW50QWNjZXNzJykuYW5kLnJldHVyblZhbHVlKHt9KTtcbiAgICAgICAgICAgIGN0cmwuZGV0YWlsUmVzb3VyY2VVcmwgPSBzb21lVXJsO1xuICAgICAgICAgICAgY3RybC5nZXRBY2Nlc3Moc3RhcnQsIGl0ZW1zUGVyLCBvcmRlcik7XG4gICAgICAgICAgICBleHBlY3QobWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UuZ2V0RW50aXRsZW1lbnRBY2Nlc3MpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHNvbWVVcmwsIHN0YXJ0LCBpdGVtc1Blciwgb3JkZXIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
