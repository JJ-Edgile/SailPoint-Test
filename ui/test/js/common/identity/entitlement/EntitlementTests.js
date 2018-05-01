System.register(['test/js/TestInitializer', 'common/identity/entitlement/IdentityEntitlementModule', './EntitlementTestData'], function (_export) {
    'use strict';

    var entitlementModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityEntitlementIdentityEntitlementModule) {
            entitlementModule = _commonIdentityEntitlementIdentityEntitlementModule['default'];
        }, function (_EntitlementTestData) {}],
        execute: function () {

            describe('Entitlement', function () {

                var Entitlement = undefined,
                    entitlementData = undefined;

                beforeEach(module(entitlementModule));

                beforeEach(inject(function (_Entitlement_, entitlementTestData) {
                    Entitlement = _Entitlement_;

                    entitlementData = entitlementTestData.ENTITLEMENT1;
                }));

                describe('constructor', function () {
                    it('explodes with no data', function () {
                        expect(function () {
                            return new Entitlement(null);
                        }).toThrow();
                    });

                    it('sets properties correctly', function () {
                        var ent = new Entitlement(entitlementData);
                        expect(ent.id).toEqual(entitlementData.id);
                        expect(ent.application).toEqual(entitlementData.application);
                        expect(ent.instance).toEqual(entitlementData.instance);
                        expect(ent.nativeIdentity).toEqual(entitlementData.nativeIdentity);
                        expect(ent.accountName).toEqual(entitlementData.accountName);
                        expect(ent.permission).toEqual(entitlementData.permission);
                        expect(ent.annotation).toEqual(entitlementData.annotation);
                        expect(ent.attribute).toEqual(entitlementData.attribute);
                        expect(ent.value).toEqual(entitlementData.value);
                        expect(ent.displayValue).toEqual(entitlementData.displayValue);
                        expect(ent.description).toEqual(entitlementData.description);
                        expect(ent.name).toEqual(entitlementData.name);
                        expect(ent.aggregationState).toEqual(entitlementData.aggregationState);
                        expect(ent.startDate.getTime()).toEqual(entitlementData.startDate);
                        expect(ent.endDate.getTime()).toEqual(entitlementData.endDate);
                        expect(ent.group).toEqual(entitlementData.group);
                        expect(ent.managedAttributeId).toEqual(entitlementData.managedAttributeId);
                        expect(ent.hasPendingRequest).toEqual(entitlementData.hasPendingRequest);
                        expect(ent.pendingRequestId).toEqual(entitlementData.pendingRequestId);
                    });
                });

                describe('getDisplayValue()', function () {
                    it('returns the display value if available', function () {
                        var ent = new Entitlement(entitlementData);
                        expect(ent.getDisplayValue()).toEqual(entitlementData.displayValue);
                    });

                    it('returns the value if displayValue is not available', function () {
                        var ent = new Entitlement(entitlementData);
                        ent.displayValue = null;
                        expect(ent.getDisplayValue()).toEqual(entitlementData.value);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9lbnRpdGxlbWVudC9FbnRpdGxlbWVudFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5REFBeUQsMEJBQTBCLFVBQVUsU0FBUztJQUM5STs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscURBQXFEO1lBQzNHLG9CQUFvQixvREFBb0Q7V0FDekUsVUFBVSxzQkFBc0I7UUFDbkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLGVBQWUsWUFBTTs7Z0JBRTFCLElBQUksY0FBVztvQkFBRSxrQkFBZTs7Z0JBRWhDLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGVBQWUscUJBQXdCO29CQUN0RCxjQUFjOztvQkFFZCxrQkFBa0Isb0JBQW9COzs7Z0JBSTFDLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLHlCQUF5QixZQUFNO3dCQUM5QixPQUFPLFlBQUE7NEJBT1MsT0FQSCxJQUFJLFlBQVk7MkJBQU87OztvQkFHeEMsR0FBRyw2QkFBNkIsWUFBTTt3QkFDbEMsSUFBSSxNQUFNLElBQUksWUFBWTt3QkFDMUIsT0FBTyxJQUFJLElBQUksUUFBUSxnQkFBZ0I7d0JBQ3ZDLE9BQU8sSUFBSSxhQUFhLFFBQVEsZ0JBQWdCO3dCQUNoRCxPQUFPLElBQUksVUFBVSxRQUFRLGdCQUFnQjt3QkFDN0MsT0FBTyxJQUFJLGdCQUFnQixRQUFRLGdCQUFnQjt3QkFDbkQsT0FBTyxJQUFJLGFBQWEsUUFBUSxnQkFBZ0I7d0JBQ2hELE9BQU8sSUFBSSxZQUFZLFFBQVEsZ0JBQWdCO3dCQUMvQyxPQUFPLElBQUksWUFBWSxRQUFRLGdCQUFnQjt3QkFDL0MsT0FBTyxJQUFJLFdBQVcsUUFBUSxnQkFBZ0I7d0JBQzlDLE9BQU8sSUFBSSxPQUFPLFFBQVEsZ0JBQWdCO3dCQUMxQyxPQUFPLElBQUksY0FBYyxRQUFRLGdCQUFnQjt3QkFDakQsT0FBTyxJQUFJLGFBQWEsUUFBUSxnQkFBZ0I7d0JBQ2hELE9BQU8sSUFBSSxNQUFNLFFBQVEsZ0JBQWdCO3dCQUN6QyxPQUFPLElBQUksa0JBQWtCLFFBQVEsZ0JBQWdCO3dCQUNyRCxPQUFPLElBQUksVUFBVSxXQUFXLFFBQVEsZ0JBQWdCO3dCQUN4RCxPQUFPLElBQUksUUFBUSxXQUFXLFFBQVEsZ0JBQWdCO3dCQUN0RCxPQUFPLElBQUksT0FBTyxRQUFRLGdCQUFnQjt3QkFDMUMsT0FBTyxJQUFJLG9CQUFvQixRQUFRLGdCQUFnQjt3QkFDdkQsT0FBTyxJQUFJLG1CQUFtQixRQUFRLGdCQUFnQjt3QkFDdEQsT0FBTyxJQUFJLGtCQUFrQixRQUFRLGdCQUFnQjs7OztnQkFJN0QsU0FBUyxxQkFBcUIsWUFBTTtvQkFDaEMsR0FBRywwQ0FBMEMsWUFBTTt3QkFDL0MsSUFBSSxNQUFNLElBQUksWUFBWTt3QkFDMUIsT0FBTyxJQUFJLG1CQUFtQixRQUFRLGdCQUFnQjs7O29CQUcxRCxHQUFHLHNEQUFzRCxZQUFNO3dCQUMzRCxJQUFJLE1BQU0sSUFBSSxZQUFZO3dCQUMxQixJQUFJLGVBQWU7d0JBQ25CLE9BQU8sSUFBSSxtQkFBbUIsUUFBUSxnQkFBZ0I7Ozs7OztHQWMvRCIsImZpbGUiOiJjb21tb24vaWRlbnRpdHkvZW50aXRsZW1lbnQvRW50aXRsZW1lbnRUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgZW50aXRsZW1lbnRNb2R1bGUgZnJvbSAnY29tbW9uL2lkZW50aXR5L2VudGl0bGVtZW50L0lkZW50aXR5RW50aXRsZW1lbnRNb2R1bGUnO1xyXG5pbXBvcnQgJy4vRW50aXRsZW1lbnRUZXN0RGF0YSc7XHJcblxyXG5kZXNjcmliZSgnRW50aXRsZW1lbnQnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IEVudGl0bGVtZW50LCBlbnRpdGxlbWVudERhdGE7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZW50aXRsZW1lbnRNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX0VudGl0bGVtZW50XywgZW50aXRsZW1lbnRUZXN0RGF0YSkgPT4ge1xyXG4gICAgICAgIEVudGl0bGVtZW50ID0gX0VudGl0bGVtZW50XztcclxuXHJcbiAgICAgICAgZW50aXRsZW1lbnREYXRhID0gZW50aXRsZW1lbnRUZXN0RGF0YS5FTlRJVExFTUVOVDE7XHJcbiAgICB9KSk7XHJcblxyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcclxuICAgICAgICBpdCgnZXhwbG9kZXMgd2l0aCBubyBkYXRhJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbmV3IEVudGl0bGVtZW50KG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIHByb3BlcnRpZXMgY29ycmVjdGx5JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50ID0gbmV3IEVudGl0bGVtZW50KGVudGl0bGVtZW50RGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbnQuaWQpLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLmlkKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVudC5hcHBsaWNhdGlvbikudG9FcXVhbChlbnRpdGxlbWVudERhdGEuYXBwbGljYXRpb24pO1xyXG4gICAgICAgICAgICBleHBlY3QoZW50Lmluc3RhbmNlKS50b0VxdWFsKGVudGl0bGVtZW50RGF0YS5pbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbnQubmF0aXZlSWRlbnRpdHkpLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLm5hdGl2ZUlkZW50aXR5KTtcclxuICAgICAgICAgICAgZXhwZWN0KGVudC5hY2NvdW50TmFtZSkudG9FcXVhbChlbnRpdGxlbWVudERhdGEuYWNjb3VudE5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoZW50LnBlcm1pc3Npb24pLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLnBlcm1pc3Npb24pO1xyXG4gICAgICAgICAgICBleHBlY3QoZW50LmFubm90YXRpb24pLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLmFubm90YXRpb24pO1xyXG4gICAgICAgICAgICBleHBlY3QoZW50LmF0dHJpYnV0ZSkudG9FcXVhbChlbnRpdGxlbWVudERhdGEuYXR0cmlidXRlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVudC52YWx1ZSkudG9FcXVhbChlbnRpdGxlbWVudERhdGEudmFsdWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoZW50LmRpc3BsYXlWYWx1ZSkudG9FcXVhbChlbnRpdGxlbWVudERhdGEuZGlzcGxheVZhbHVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVudC5kZXNjcmlwdGlvbikudG9FcXVhbChlbnRpdGxlbWVudERhdGEuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICBleHBlY3QoZW50Lm5hbWUpLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoZW50LmFnZ3JlZ2F0aW9uU3RhdGUpLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLmFnZ3JlZ2F0aW9uU3RhdGUpO1xyXG4gICAgICAgICAgICBleHBlY3QoZW50LnN0YXJ0RGF0ZS5nZXRUaW1lKCkpLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLnN0YXJ0RGF0ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbnQuZW5kRGF0ZS5nZXRUaW1lKCkpLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLmVuZERhdGUpO1xyXG4gICAgICAgICAgICBleHBlY3QoZW50Lmdyb3VwKS50b0VxdWFsKGVudGl0bGVtZW50RGF0YS5ncm91cCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbnQubWFuYWdlZEF0dHJpYnV0ZUlkKS50b0VxdWFsKGVudGl0bGVtZW50RGF0YS5tYW5hZ2VkQXR0cmlidXRlSWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoZW50Lmhhc1BlbmRpbmdSZXF1ZXN0KS50b0VxdWFsKGVudGl0bGVtZW50RGF0YS5oYXNQZW5kaW5nUmVxdWVzdCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbnQucGVuZGluZ1JlcXVlc3RJZCkudG9FcXVhbChlbnRpdGxlbWVudERhdGEucGVuZGluZ1JlcXVlc3RJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0RGlzcGxheVZhbHVlKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgaWYgYXZhaWxhYmxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50ID0gbmV3IEVudGl0bGVtZW50KGVudGl0bGVtZW50RGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbnQuZ2V0RGlzcGxheVZhbHVlKCkpLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLmRpc3BsYXlWYWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSB2YWx1ZSBpZiBkaXNwbGF5VmFsdWUgaXMgbm90IGF2YWlsYWJsZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudCA9IG5ldyBFbnRpdGxlbWVudChlbnRpdGxlbWVudERhdGEpO1xyXG4gICAgICAgICAgICBlbnQuZGlzcGxheVZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgZXhwZWN0KGVudC5nZXREaXNwbGF5VmFsdWUoKSkudG9FcXVhbChlbnRpdGxlbWVudERhdGEudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
