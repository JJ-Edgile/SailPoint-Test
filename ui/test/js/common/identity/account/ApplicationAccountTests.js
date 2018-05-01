System.register(['test/js/TestInitializer', 'common/identity/account/IdentityAccountModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var accountModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityAccountIdentityAccountModule) {
            accountModule = _commonIdentityAccountIdentityAccountModule['default'];
        }],
        execute: function () {

            describe('ApplicationAccount', function () {

                var ApplicationAccount = undefined,
                    Application = undefined,
                    LinkAttribute = undefined,
                    Entitlement = undefined,
                    appAccountData = {
                    application: {
                        id: '1234',
                        type: 'App Type',
                        description: 'Some application',
                        owner: {
                            id: 'Id',
                            name: 'My name'
                        },
                        remediators: [{
                            id: 'Id 1',
                            name: 'Some name'
                        }]
                    },
                    linkAttributes: [{
                        name: 'Some link name',
                        values: ['1', '2'],
                        permission: true,
                        entitlement: false,
                        description: 'This is a permission attribute'
                    }],
                    entitlements: [{
                        attribute: 'attr',
                        value: 'val',
                        permission: false
                    }],
                    targetPermissions: [{
                        attribute: 'target',
                        value: 'create, delete',
                        permission: true
                    }],
                    accountName: 'My Account',
                    nativeIdentity: 'abcd',
                    instance: 'inst1'
                };

                beforeEach(module(accountModule));

                beforeEach(inject(function (_ApplicationAccount_, _Application_, _LinkAttribute_, _Entitlement_) {
                    ApplicationAccount = _ApplicationAccount_;
                    Application = _Application_;
                    LinkAttribute = _LinkAttribute_;
                    Entitlement = _Entitlement_;
                }));

                describe('constructor', function () {

                    it('should throw with no ApplicationAccount data', function () {
                        expect(function () {
                            return new ApplicationAccount(null);
                        }).toThrow();
                    });

                    it('sets properties from the data', function () {
                        var appAccount = new ApplicationAccount(appAccountData);
                        expect(appAccount.accountName).toEqual(appAccountData.accountName);
                        expect(appAccount.nativeIdentity).toEqual(appAccountData.nativeIdentity);
                        expect(appAccount.instance).toEqual(appAccountData.instance);
                        expect(appAccount.application instanceof Application).toEqual(true);
                        expect(appAccount.linkAttributes.length).toEqual(1);
                        expect(appAccount.linkAttributes[0] instanceof LinkAttribute).toEqual(true);
                        expect(appAccount.entitlements.length).toEqual(1);
                        expect(appAccount.entitlements[0] instanceof Entitlement).toEqual(true);
                        expect(appAccount.targetPermissions.length).toEqual(1);
                        expect(appAccount.targetPermissions[0] instanceof Entitlement).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9hY2NvdW50L0FwcGxpY2F0aW9uQWNjb3VudFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixrREFBa0QsVUFBVSxTQUFTOzs7SUFHN0c7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDZDQUE2QztZQUNuRyxnQkFBZ0IsNENBQTRDOztRQUVoRSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsc0JBQXNCLFlBQU07O2dCQUVqQyxJQUFJLHFCQUFrQjtvQkFBRSxjQUFXO29CQUFFLGdCQUFhO29CQUFFLGNBQVc7b0JBQzNELGlCQUFpQjtvQkFDYixhQUFhO3dCQUNULElBQUk7d0JBQ0osTUFBTTt3QkFDTixhQUFhO3dCQUNiLE9BQU87NEJBQ0gsSUFBSTs0QkFDSixNQUFNOzt3QkFFVixhQUFhLENBQUM7NEJBQ1YsSUFBSTs0QkFDSixNQUFNOzs7b0JBR2QsZ0JBQWdCLENBQUM7d0JBQ2IsTUFBTTt3QkFDTixRQUFRLENBQUMsS0FBSzt3QkFDZCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsYUFBYTs7b0JBRWpCLGNBQWMsQ0FBQzt3QkFDWCxXQUFXO3dCQUNYLE9BQU87d0JBQ1AsWUFBWTs7b0JBRWhCLG1CQUFtQixDQUFDO3dCQUNoQixXQUFXO3dCQUNYLE9BQU87d0JBQ1AsWUFBWTs7b0JBRWhCLGFBQWE7b0JBQ2IsZ0JBQWdCO29CQUNoQixVQUFVOzs7Z0JBR2xCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLHNCQUFzQixlQUFlLGlCQUFpQixlQUFrQjtvQkFDdkYscUJBQXFCO29CQUNyQixjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsY0FBYzs7O2dCQUlsQixTQUFTLGVBQWUsWUFBTTs7b0JBRTFCLEdBQUcsZ0RBQWdELFlBQU07d0JBQ3JELE9BQU8sWUFBQTs0QkFVUyxPQVZILElBQUksbUJBQW1COzJCQUFPOzs7b0JBRy9DLEdBQUcsaUNBQWlDLFlBQU07d0JBQ3RDLElBQUksYUFBYSxJQUFJLG1CQUFtQjt3QkFDeEMsT0FBTyxXQUFXLGFBQWEsUUFBUSxlQUFlO3dCQUN0RCxPQUFPLFdBQVcsZ0JBQWdCLFFBQVEsZUFBZTt3QkFDekQsT0FBTyxXQUFXLFVBQVUsUUFBUSxlQUFlO3dCQUNuRCxPQUFPLFdBQVcsdUJBQXVCLGFBQWEsUUFBUTt3QkFDOUQsT0FBTyxXQUFXLGVBQWUsUUFBUSxRQUFRO3dCQUNqRCxPQUFPLFdBQVcsZUFBZSxjQUFjLGVBQWUsUUFBUTt3QkFDdEUsT0FBTyxXQUFXLGFBQWEsUUFBUSxRQUFRO3dCQUMvQyxPQUFPLFdBQVcsYUFBYSxjQUFjLGFBQWEsUUFBUTt3QkFDbEUsT0FBTyxXQUFXLGtCQUFrQixRQUFRLFFBQVE7d0JBQ3BELE9BQU8sV0FBVyxrQkFBa0IsY0FBYyxhQUFhLFFBQVE7Ozs7OztHQWlCaEYiLCJmaWxlIjoiY29tbW9uL2lkZW50aXR5L2FjY291bnQvQXBwbGljYXRpb25BY2NvdW50VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgYWNjb3VudE1vZHVsZSBmcm9tICdjb21tb24vaWRlbnRpdHkvYWNjb3VudC9JZGVudGl0eUFjY291bnRNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0FwcGxpY2F0aW9uQWNjb3VudCcsICgpID0+IHtcclxuXHJcbiAgICBsZXQgQXBwbGljYXRpb25BY2NvdW50LCBBcHBsaWNhdGlvbiwgTGlua0F0dHJpYnV0ZSwgRW50aXRsZW1lbnQsXHJcbiAgICAgICAgYXBwQWNjb3VudERhdGEgPSB7XHJcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0FwcCBUeXBlJyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU29tZSBhcHBsaWNhdGlvbicsXHJcbiAgICAgICAgICAgICAgICBvd25lcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnSWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdNeSBuYW1lJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJlbWVkaWF0b3JzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnSWQgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1NvbWUgbmFtZSdcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbmtBdHRyaWJ1dGVzOiBbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ1NvbWUgbGluayBuYW1lJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlczogWycxJywgJzInXSxcclxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbnRpdGxlbWVudDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgaXMgYSBwZXJtaXNzaW9uIGF0dHJpYnV0ZSdcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIGVudGl0bGVtZW50czogW3tcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogJ2F0dHInLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICd2YWwnLFxyXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbjogZmFsc2VcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIHRhcmdldFBlcm1pc3Npb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlOiAndGFyZ2V0JyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnY3JlYXRlLCBkZWxldGUnLFxyXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdHJ1ZVxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgYWNjb3VudE5hbWU6ICdNeSBBY2NvdW50JyxcclxuICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICdhYmNkJyxcclxuICAgICAgICAgICAgaW5zdGFuY2U6ICdpbnN0MSdcclxuICAgICAgICB9O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFjY291bnRNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX0FwcGxpY2F0aW9uQWNjb3VudF8sIF9BcHBsaWNhdGlvbl8sIF9MaW5rQXR0cmlidXRlXywgX0VudGl0bGVtZW50XykgPT4ge1xyXG4gICAgICAgIEFwcGxpY2F0aW9uQWNjb3VudCA9IF9BcHBsaWNhdGlvbkFjY291bnRfO1xyXG4gICAgICAgIEFwcGxpY2F0aW9uID0gX0FwcGxpY2F0aW9uXztcclxuICAgICAgICBMaW5rQXR0cmlidXRlID0gX0xpbmtBdHRyaWJ1dGVfO1xyXG4gICAgICAgIEVudGl0bGVtZW50ID0gX0VudGl0bGVtZW50XztcclxuICAgIH0pKTtcclxuXHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gQXBwbGljYXRpb25BY2NvdW50IGRhdGEnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgQXBwbGljYXRpb25BY2NvdW50KG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIHByb3BlcnRpZXMgZnJvbSB0aGUgZGF0YScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFwcEFjY291bnQgPSBuZXcgQXBwbGljYXRpb25BY2NvdW50KGFwcEFjY291bnREYXRhKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFwcEFjY291bnQuYWNjb3VudE5hbWUpLnRvRXF1YWwoYXBwQWNjb3VudERhdGEuYWNjb3VudE5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwQWNjb3VudC5uYXRpdmVJZGVudGl0eSkudG9FcXVhbChhcHBBY2NvdW50RGF0YS5uYXRpdmVJZGVudGl0eSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHBBY2NvdW50Lmluc3RhbmNlKS50b0VxdWFsKGFwcEFjY291bnREYXRhLmluc3RhbmNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFwcEFjY291bnQuYXBwbGljYXRpb24gaW5zdGFuY2VvZiBBcHBsaWNhdGlvbikudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFwcEFjY291bnQubGlua0F0dHJpYnV0ZXMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwQWNjb3VudC5saW5rQXR0cmlidXRlc1swXSBpbnN0YW5jZW9mIExpbmtBdHRyaWJ1dGUpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHBBY2NvdW50LmVudGl0bGVtZW50cy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHBBY2NvdW50LmVudGl0bGVtZW50c1swXSBpbnN0YW5jZW9mIEVudGl0bGVtZW50KS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwQWNjb3VudC50YXJnZXRQZXJtaXNzaW9ucy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHBBY2NvdW50LnRhcmdldFBlcm1pc3Npb25zWzBdIGluc3RhbmNlb2YgRW50aXRsZW1lbnQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
