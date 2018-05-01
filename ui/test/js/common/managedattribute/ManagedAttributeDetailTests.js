System.register(['test/js/TestInitializer', 'common/managedattribute/ManagedAttributeModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var managedAttributeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonManagedattributeManagedAttributeModule) {
            managedAttributeModule = _commonManagedattributeManagedAttributeModule['default'];
        }],
        execute: function () {

            describe('ManagedAttributeDetail', function () {

                var ManagedAttributeDetail = undefined,
                    Entitlement = undefined,
                    entitlement = {
                    application: 'Entitlement App',
                    instance: 'instance1',
                    nativeIdentity: 'something',
                    accountName: 'Entitlement Account',
                    permission: true,
                    annotation: 'annotate things...',
                    attribute: 'USER_DB',
                    value: 'DELETE',
                    displayValue: 'User Database',
                    description: 'Delete this.',
                    name: 'Some name',
                    aggregationState: 'state',
                    group: true
                },
                    managedAttributeData = {
                    id: '1234',
                    application: 'someapp',
                    type: 'someType',
                    attribute: 'myName',
                    value: 'value',
                    displayValue: 'Display',
                    description: 'This is some attribute.',
                    requestable: false,
                    owner: 'ME',
                    extendedAttributes: {
                        id: 'Id',
                        name: 'My name'
                    },
                    groupEntitlements: [entitlement],
                    hasInheritance: true,
                    hasAccess: true,
                    hasMembers: true
                };

                beforeEach(module(managedAttributeModule));

                beforeEach(inject(function (_Entitlement_, _ManagedAttributeDetail_) {
                    ManagedAttributeDetail = _ManagedAttributeDetail_;
                    Entitlement = _Entitlement_;
                }));

                describe('constructor', function () {

                    it('should throw with no ManagedAttributeDetail data', function () {
                        expect(function () {
                            return new ManagedAttributeDetail(null);
                        }).toThrow();
                    });

                    it('sets properties for the ManagedAttribute', function () {

                        var managedAttribute = new ManagedAttributeDetail(managedAttributeData);
                        expect(managedAttribute.id).toEqual(managedAttributeData.id);
                        expect(managedAttribute.application).toEqual(managedAttributeData.application);
                        expect(managedAttribute.type).toEqual(managedAttributeData.type);
                        expect(managedAttribute.attribute).toEqual(managedAttributeData.attribute);
                        expect(managedAttribute.value).toEqual(managedAttributeData.value);
                        expect(managedAttribute.displayValue).toEqual(managedAttributeData.displayValue);
                        expect(managedAttribute.description).toEqual(managedAttributeData.description);
                        expect(managedAttribute.requestable).toEqual(managedAttributeData.requestable);
                        expect(managedAttribute.owner).toEqual(managedAttributeData.owner);
                        expect(managedAttribute.extendedAttributes).toEqual(managedAttributeData.extendedAttributes);
                        expect(managedAttribute.groupEntitlements.length).toEqual(1);
                        expect(managedAttribute.groupEntitlements[0] instanceof Entitlement).toEqual(true);
                        expect(managedAttribute.hasInheritance).toEqual(managedAttributeData.hasInheritance);
                        expect(managedAttribute.hasAccess).toEqual(managedAttributeData.hasAccess);
                        expect(managedAttribute.hasMembers).toEqual(managedAttributeData.hasMembers);
                    });
                });

                describe('hasObjectProperties', function () {
                    it('should return true if has groupEntitlements, groupAttributes is defined', function () {
                        managedAttributeData.groupAttributes = { description: 'sun', friendlyName: 'moon' };
                        var managedAttribute = new ManagedAttributeDetail(managedAttributeData);
                        expect(managedAttribute.hasObjectProperties()).toBeTruthy();
                    });

                    it('should return true if has groupEntitlements, groupAttributes is undefined', function () {
                        managedAttributeData.groupAttributes = undefined;
                        var managedAttribute = new ManagedAttributeDetail(managedAttributeData);
                        expect(managedAttribute.hasObjectProperties()).toBeTruthy();
                    });

                    it('should return true if has groupAttributes, groupEntitlements is empty', function () {
                        managedAttributeData.groupAttributes = { description: 'sun', friendlyName: 'moon' };
                        managedAttributeData.groupEntitlements = [];
                        var managedAttribute = new ManagedAttributeDetail(managedAttributeData);
                        expect(managedAttribute.hasObjectProperties()).toBeTruthy();
                    });

                    it('should return false if groupAttributes is undefined, groupEntitlements is empty', function () {
                        managedAttributeData.groupAttributes = undefined;
                        managedAttributeData.groupEntitlements = [];
                        var managedAttribute = new ManagedAttributeDetail(managedAttributeData);
                        expect(managedAttribute.hasObjectProperties()).toBeFalsy();
                    });

                    it('should return false if groupAttributes is undefined, groupEntitlements is undefined', function () {
                        managedAttributeData.groupAttributes = undefined;
                        managedAttributeData.groupEntitlements = undefined;
                        var managedAttribute = new ManagedAttributeDetail(managedAttributeData);
                        expect(managedAttribute.hasObjectProperties()).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVEZXRhaWxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsbURBQW1ELFVBQVUsU0FBUzs7O0lBRzlHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwrQ0FBK0M7WUFDckcseUJBQXlCLDhDQUE4Qzs7UUFFM0UsU0FBUyxZQUFZOztZQUw3QixTQUFTLDBCQUEwQixZQUFNOztnQkFFckMsSUFBSSx5QkFBc0I7b0JBQ3RCLGNBQVc7b0JBQ1gsY0FBYztvQkFDVixhQUFhO29CQUNiLFVBQVU7b0JBQ1YsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixXQUFXO29CQUNYLE9BQU87b0JBQ1AsY0FBYztvQkFDZCxhQUFhO29CQUNiLE1BQU07b0JBQ04sa0JBQWtCO29CQUNsQixPQUFPOztvQkFFWCx1QkFBdUI7b0JBQ25CLElBQUk7b0JBQ0osYUFBYTtvQkFDYixNQUFNO29CQUNOLFdBQVc7b0JBQ1gsT0FBTztvQkFDUCxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixPQUFPO29CQUNQLG9CQUFvQjt3QkFDaEIsSUFBSTt3QkFDSixNQUFNOztvQkFFVixtQkFBbUIsQ0FBQztvQkFDcEIsZ0JBQWdCO29CQUNoQixXQUFXO29CQUNYLFlBQVk7OztnQkFHcEIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsZUFBZSwwQkFBNkI7b0JBQzNELHlCQUF5QjtvQkFDekIsY0FBYzs7O2dCQUlsQixTQUFTLGVBQWUsWUFBTTs7b0JBRTFCLEdBQUcsb0RBQW9ELFlBQU07d0JBQ3pELE9BQU8sWUFBQTs0QkFPUyxPQVBILElBQUksdUJBQXVCOzJCQUFPOzs7b0JBR25ELEdBQUcsNENBQTRDLFlBQU07O3dCQUVqRCxJQUFJLG1CQUFtQixJQUFJLHVCQUF1Qjt3QkFDbEQsT0FBTyxpQkFBaUIsSUFBSSxRQUFRLHFCQUFxQjt3QkFDekQsT0FBTyxpQkFBaUIsYUFBYSxRQUFRLHFCQUFxQjt3QkFDbEUsT0FBTyxpQkFBaUIsTUFBTSxRQUFRLHFCQUFxQjt3QkFDM0QsT0FBTyxpQkFBaUIsV0FBVyxRQUFRLHFCQUFxQjt3QkFDaEUsT0FBTyxpQkFBaUIsT0FBTyxRQUFRLHFCQUFxQjt3QkFDNUQsT0FBTyxpQkFBaUIsY0FBYyxRQUFRLHFCQUFxQjt3QkFDbkUsT0FBTyxpQkFBaUIsYUFBYSxRQUFRLHFCQUFxQjt3QkFDbEUsT0FBTyxpQkFBaUIsYUFBYSxRQUFRLHFCQUFxQjt3QkFDbEUsT0FBTyxpQkFBaUIsT0FBTyxRQUFRLHFCQUFxQjt3QkFDNUQsT0FBTyxpQkFBaUIsb0JBQW9CLFFBQVEscUJBQXFCO3dCQUN6RSxPQUFPLGlCQUFpQixrQkFBa0IsUUFBUSxRQUFRO3dCQUMxRCxPQUFPLGlCQUFpQixrQkFBa0IsY0FBYyxhQUFhLFFBQVE7d0JBQzdFLE9BQU8saUJBQWlCLGdCQUFnQixRQUFRLHFCQUFxQjt3QkFDckUsT0FBTyxpQkFBaUIsV0FBVyxRQUFRLHFCQUFxQjt3QkFDaEUsT0FBTyxpQkFBaUIsWUFBWSxRQUFRLHFCQUFxQjs7OztnQkFJekUsU0FBUyx1QkFBdUIsWUFBTTtvQkFDbEMsR0FBRywyRUFBMkUsWUFBTTt3QkFDaEYscUJBQXFCLGtCQUFrQixFQUFDLGFBQWEsT0FBTyxjQUFjO3dCQUMxRSxJQUFJLG1CQUFtQixJQUFJLHVCQUF1Qjt3QkFDbEQsT0FBTyxpQkFBaUIsdUJBQXVCOzs7b0JBR25ELEdBQUcsNkVBQTZFLFlBQU07d0JBQ2xGLHFCQUFxQixrQkFBa0I7d0JBQ3ZDLElBQUksbUJBQW1CLElBQUksdUJBQXVCO3dCQUNsRCxPQUFPLGlCQUFpQix1QkFBdUI7OztvQkFHbkQsR0FBRyx5RUFBeUUsWUFBTTt3QkFDOUUscUJBQXFCLGtCQUFrQixFQUFDLGFBQWEsT0FBTyxjQUFjO3dCQUMxRSxxQkFBcUIsb0JBQW9CO3dCQUN6QyxJQUFJLG1CQUFtQixJQUFJLHVCQUF1Qjt3QkFDbEQsT0FBTyxpQkFBaUIsdUJBQXVCOzs7b0JBR25ELEdBQUcsbUZBQW1GLFlBQU07d0JBQ3hGLHFCQUFxQixrQkFBa0I7d0JBQ3ZDLHFCQUFxQixvQkFBb0I7d0JBQ3pDLElBQUksbUJBQW1CLElBQUksdUJBQXVCO3dCQUNsRCxPQUFPLGlCQUFpQix1QkFBdUI7OztvQkFHbkQsR0FBRyx1RkFBdUYsWUFBTTt3QkFDNUYscUJBQXFCLGtCQUFrQjt3QkFDdkMscUJBQXFCLG9CQUFvQjt3QkFDekMsSUFBSSxtQkFBbUIsSUFBSSx1QkFBdUI7d0JBQ2xELE9BQU8saUJBQWlCLHVCQUF1Qjs7Ozs7O0dBY3hEIiwiZmlsZSI6ImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVEZXRhaWxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBtYW5hZ2VkQXR0cmlidXRlTW9kdWxlIGZyb20gJ2NvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ01hbmFnZWRBdHRyaWJ1dGVEZXRhaWwnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IE1hbmFnZWRBdHRyaWJ1dGVEZXRhaWwsXHJcbiAgICAgICAgRW50aXRsZW1lbnQsXHJcbiAgICAgICAgZW50aXRsZW1lbnQgPSB7XHJcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnRW50aXRsZW1lbnQgQXBwJyxcclxuICAgICAgICAgICAgaW5zdGFuY2U6ICdpbnN0YW5jZTEnLFxyXG4gICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ3NvbWV0aGluZycsXHJcbiAgICAgICAgICAgIGFjY291bnROYW1lOiAnRW50aXRsZW1lbnQgQWNjb3VudCcsXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb246IHRydWUsXHJcbiAgICAgICAgICAgIGFubm90YXRpb246ICdhbm5vdGF0ZSB0aGluZ3MuLi4nLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGU6ICdVU0VSX0RCJyxcclxuICAgICAgICAgICAgdmFsdWU6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICdVc2VyIERhdGFiYXNlJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEZWxldGUgdGhpcy4nLFxyXG4gICAgICAgICAgICBuYW1lOiAnU29tZSBuYW1lJyxcclxuICAgICAgICAgICAgYWdncmVnYXRpb25TdGF0ZTogJ3N0YXRlJyxcclxuICAgICAgICAgICAgZ3JvdXA6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVEYXRhID0ge1xyXG4gICAgICAgICAgICBpZDogJzEyMzQnLFxyXG4gICAgICAgICAgICBhcHBsaWNhdGlvbjogJ3NvbWVhcHAnLFxyXG4gICAgICAgICAgICB0eXBlOiAnc29tZVR5cGUnLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGU6ICdteU5hbWUnLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ3ZhbHVlJyxcclxuICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAnRGlzcGxheScsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBpcyBzb21lIGF0dHJpYnV0ZS4nLFxyXG4gICAgICAgICAgICByZXF1ZXN0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIG93bmVyOiAnTUUnLFxyXG4gICAgICAgICAgICBleHRlbmRlZEF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnSWQnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ015IG5hbWUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdyb3VwRW50aXRsZW1lbnRzOiBbZW50aXRsZW1lbnRdLFxyXG4gICAgICAgICAgICBoYXNJbmhlcml0YW5jZTogdHJ1ZSxcclxuICAgICAgICAgICAgaGFzQWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBoYXNNZW1iZXJzOiB0cnVlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtYW5hZ2VkQXR0cmlidXRlTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9FbnRpdGxlbWVudF8sIF9NYW5hZ2VkQXR0cmlidXRlRGV0YWlsXykgPT4ge1xyXG4gICAgICAgIE1hbmFnZWRBdHRyaWJ1dGVEZXRhaWwgPSBfTWFuYWdlZEF0dHJpYnV0ZURldGFpbF87XHJcbiAgICAgICAgRW50aXRsZW1lbnQgPSBfRW50aXRsZW1lbnRfO1xyXG4gICAgfSkpO1xyXG5cclxuXHJcbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2l0aCBubyBNYW5hZ2VkQXR0cmlidXRlRGV0YWlsIGRhdGEnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgTWFuYWdlZEF0dHJpYnV0ZURldGFpbChudWxsKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyBwcm9wZXJ0aWVzIGZvciB0aGUgTWFuYWdlZEF0dHJpYnV0ZScsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBtYW5hZ2VkQXR0cmlidXRlID0gbmV3IE1hbmFnZWRBdHRyaWJ1dGVEZXRhaWwobWFuYWdlZEF0dHJpYnV0ZURhdGEpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFuYWdlZEF0dHJpYnV0ZS5pZCkudG9FcXVhbChtYW5hZ2VkQXR0cmlidXRlRGF0YS5pZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlLmFwcGxpY2F0aW9uKS50b0VxdWFsKG1hbmFnZWRBdHRyaWJ1dGVEYXRhLmFwcGxpY2F0aW9uKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGUudHlwZSkudG9FcXVhbChtYW5hZ2VkQXR0cmlidXRlRGF0YS50eXBlKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGUuYXR0cmlidXRlKS50b0VxdWFsKG1hbmFnZWRBdHRyaWJ1dGVEYXRhLmF0dHJpYnV0ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlLnZhbHVlKS50b0VxdWFsKG1hbmFnZWRBdHRyaWJ1dGVEYXRhLnZhbHVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGUuZGlzcGxheVZhbHVlKS50b0VxdWFsKG1hbmFnZWRBdHRyaWJ1dGVEYXRhLmRpc3BsYXlWYWx1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlLmRlc2NyaXB0aW9uKS50b0VxdWFsKG1hbmFnZWRBdHRyaWJ1dGVEYXRhLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGUucmVxdWVzdGFibGUpLnRvRXF1YWwobWFuYWdlZEF0dHJpYnV0ZURhdGEucmVxdWVzdGFibGUpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFuYWdlZEF0dHJpYnV0ZS5vd25lcikudG9FcXVhbChtYW5hZ2VkQXR0cmlidXRlRGF0YS5vd25lcik7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlLmV4dGVuZGVkQXR0cmlidXRlcykudG9FcXVhbChtYW5hZ2VkQXR0cmlidXRlRGF0YS5leHRlbmRlZEF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFuYWdlZEF0dHJpYnV0ZS5ncm91cEVudGl0bGVtZW50cy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlLmdyb3VwRW50aXRsZW1lbnRzWzBdIGluc3RhbmNlb2YgRW50aXRsZW1lbnQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlLmhhc0luaGVyaXRhbmNlKS50b0VxdWFsKG1hbmFnZWRBdHRyaWJ1dGVEYXRhLmhhc0luaGVyaXRhbmNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGUuaGFzQWNjZXNzKS50b0VxdWFsKG1hbmFnZWRBdHRyaWJ1dGVEYXRhLmhhc0FjY2Vzcyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlLmhhc01lbWJlcnMpLnRvRXF1YWwobWFuYWdlZEF0dHJpYnV0ZURhdGEuaGFzTWVtYmVycyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaGFzT2JqZWN0UHJvcGVydGllcycsICgpID0+IHtcclxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGhhcyBncm91cEVudGl0bGVtZW50cywgZ3JvdXBBdHRyaWJ1dGVzIGlzIGRlZmluZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVEYXRhLmdyb3VwQXR0cmlidXRlcyA9IHtkZXNjcmlwdGlvbjogJ3N1bicsIGZyaWVuZGx5TmFtZTogJ21vb24nfTtcclxuICAgICAgICAgICAgbGV0IG1hbmFnZWRBdHRyaWJ1dGUgPSBuZXcgTWFuYWdlZEF0dHJpYnV0ZURldGFpbChtYW5hZ2VkQXR0cmlidXRlRGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlLmhhc09iamVjdFByb3BlcnRpZXMoKSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGhhcyBncm91cEVudGl0bGVtZW50cywgZ3JvdXBBdHRyaWJ1dGVzIGlzIHVuZGVmaW5lZCcsICgpID0+IHtcclxuICAgICAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZURhdGEuZ3JvdXBBdHRyaWJ1dGVzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgbWFuYWdlZEF0dHJpYnV0ZSA9IG5ldyBNYW5hZ2VkQXR0cmlidXRlRGV0YWlsKG1hbmFnZWRBdHRyaWJ1dGVEYXRhKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGUuaGFzT2JqZWN0UHJvcGVydGllcygpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgaGFzIGdyb3VwQXR0cmlidXRlcywgZ3JvdXBFbnRpdGxlbWVudHMgaXMgZW1wdHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVEYXRhLmdyb3VwQXR0cmlidXRlcyA9IHtkZXNjcmlwdGlvbjogJ3N1bicsIGZyaWVuZGx5TmFtZTogJ21vb24nfTtcclxuICAgICAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZURhdGEuZ3JvdXBFbnRpdGxlbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IG1hbmFnZWRBdHRyaWJ1dGUgPSBuZXcgTWFuYWdlZEF0dHJpYnV0ZURldGFpbChtYW5hZ2VkQXR0cmlidXRlRGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlLmhhc09iamVjdFByb3BlcnRpZXMoKSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBncm91cEF0dHJpYnV0ZXMgaXMgdW5kZWZpbmVkLCBncm91cEVudGl0bGVtZW50cyBpcyBlbXB0eScsICgpID0+IHtcclxuICAgICAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZURhdGEuZ3JvdXBBdHRyaWJ1dGVzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBtYW5hZ2VkQXR0cmlidXRlRGF0YS5ncm91cEVudGl0bGVtZW50cyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgbWFuYWdlZEF0dHJpYnV0ZSA9IG5ldyBNYW5hZ2VkQXR0cmlidXRlRGV0YWlsKG1hbmFnZWRBdHRyaWJ1dGVEYXRhKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGUuaGFzT2JqZWN0UHJvcGVydGllcygpKS50b0JlRmFsc3koKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgZ3JvdXBBdHRyaWJ1dGVzIGlzIHVuZGVmaW5lZCwgZ3JvdXBFbnRpdGxlbWVudHMgaXMgdW5kZWZpbmVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBtYW5hZ2VkQXR0cmlidXRlRGF0YS5ncm91cEF0dHJpYnV0ZXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVEYXRhLmdyb3VwRW50aXRsZW1lbnRzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgbWFuYWdlZEF0dHJpYnV0ZSA9IG5ldyBNYW5hZ2VkQXR0cmlidXRlRGV0YWlsKG1hbmFnZWRBdHRyaWJ1dGVEYXRhKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGUuaGFzT2JqZWN0UHJvcGVydGllcygpKS50b0JlRmFsc3koKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
