System.register(['test/js/TestInitializer', 'common/identity/account/IdentityAccountModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var accountModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityAccountIdentityAccountModule) {
            accountModule = _commonIdentityAccountIdentityAccountModule['default'];
        }],
        execute: function () {

            describe('LinkAttribute', function () {

                var LinkAttribute = undefined,
                    linkAttrData = {
                    name: 'Some link name',
                    displayName: 'link display name',
                    values: ['1', '2'],
                    permission: true,
                    entitlement: false,
                    description: 'This is a permission attribute.'
                };

                beforeEach(module(accountModule));

                beforeEach(inject(function (_LinkAttribute_) {
                    LinkAttribute = _LinkAttribute_;
                }));

                describe('constructor', function () {

                    it('should throw with no link attribute data', function () {
                        expect(function () {
                            return new LinkAttribute(null);
                        }).toThrow();
                    });

                    it('sets properties for the LinkAttribute', function () {

                        var linkAttr = new LinkAttribute(linkAttrData);
                        expect(linkAttr.name).toEqual(linkAttrData.name);
                        expect(linkAttr.displayName).toEqual(linkAttrData.displayName);
                        expect(linkAttr.values.length).toEqual(linkAttrData.values.length);
                        expect(linkAttr.permission).toEqual(linkAttrData.permission);
                        expect(linkAttr.entitlement).toEqual(linkAttrData.entitlement);
                        expect(linkAttr.description).toEqual(linkAttrData.description);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9hY2NvdW50L0xpbmtBdHRyaWJ1dGVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsa0RBQWtELFVBQVUsU0FBUzs7O0lBRzdHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSw2Q0FBNkM7WUFDbkcsZ0JBQWdCLDRDQUE0Qzs7UUFFaEUsU0FBUyxZQUFZOztZQUw3QixTQUFTLGlCQUFpQixZQUFNOztnQkFFNUIsSUFBSSxnQkFBYTtvQkFDYixlQUFlO29CQUNYLE1BQU07b0JBQ04sYUFBYTtvQkFDYixRQUFRLENBQUMsS0FBSztvQkFDZCxZQUFZO29CQUNaLGFBQWE7b0JBQ2IsYUFBYTs7O2dCQUdyQixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxpQkFBb0I7b0JBQ25DLGdCQUFnQjs7O2dCQUdwQixTQUFTLGVBQWUsWUFBTTs7b0JBRTFCLEdBQUcsNENBQTRDLFlBQU07d0JBQ2pELE9BQU8sWUFBQTs0QkFRUyxPQVJILElBQUksY0FBYzsyQkFBTzs7O29CQUcxQyxHQUFHLHlDQUF5QyxZQUFNOzt3QkFFOUMsSUFBSSxXQUFXLElBQUksY0FBYzt3QkFDakMsT0FBTyxTQUFTLE1BQU0sUUFBUSxhQUFhO3dCQUMzQyxPQUFPLFNBQVMsYUFBYSxRQUFRLGFBQWE7d0JBQ2xELE9BQU8sU0FBUyxPQUFPLFFBQVEsUUFBUSxhQUFhLE9BQU87d0JBQzNELE9BQU8sU0FBUyxZQUFZLFFBQVEsYUFBYTt3QkFDakQsT0FBTyxTQUFTLGFBQWEsUUFBUSxhQUFhO3dCQUNsRCxPQUFPLFNBQVMsYUFBYSxRQUFRLGFBQWE7Ozs7OztHQWUzRCIsImZpbGUiOiJjb21tb24vaWRlbnRpdHkvYWNjb3VudC9MaW5rQXR0cmlidXRlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgYWNjb3VudE1vZHVsZSBmcm9tICdjb21tb24vaWRlbnRpdHkvYWNjb3VudC9JZGVudGl0eUFjY291bnRNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0xpbmtBdHRyaWJ1dGUnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IExpbmtBdHRyaWJ1dGUsXHJcbiAgICAgICAgbGlua0F0dHJEYXRhID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnU29tZSBsaW5rIG5hbWUnLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2xpbmsgZGlzcGxheSBuYW1lJyxcclxuICAgICAgICAgICAgdmFsdWVzOiBbJzEnLCAnMiddLFxyXG4gICAgICAgICAgICBwZXJtaXNzaW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBlbnRpdGxlbWVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBpcyBhIHBlcm1pc3Npb24gYXR0cmlidXRlLidcclxuICAgICAgICB9O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFjY291bnRNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX0xpbmtBdHRyaWJ1dGVfKSA9PiB7XHJcbiAgICAgICAgTGlua0F0dHJpYnV0ZSA9IF9MaW5rQXR0cmlidXRlXztcclxuICAgIH0pKTtcclxuXHJcbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2l0aCBubyBsaW5rIGF0dHJpYnV0ZSBkYXRhJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbmV3IExpbmtBdHRyaWJ1dGUobnVsbCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgcHJvcGVydGllcyBmb3IgdGhlIExpbmtBdHRyaWJ1dGUnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGlua0F0dHIgPSBuZXcgTGlua0F0dHJpYnV0ZShsaW5rQXR0ckRhdGEpO1xyXG4gICAgICAgICAgICBleHBlY3QobGlua0F0dHIubmFtZSkudG9FcXVhbChsaW5rQXR0ckRhdGEubmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsaW5rQXR0ci5kaXNwbGF5TmFtZSkudG9FcXVhbChsaW5rQXR0ckRhdGEuZGlzcGxheU5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QobGlua0F0dHIudmFsdWVzLmxlbmd0aCkudG9FcXVhbChsaW5rQXR0ckRhdGEudmFsdWVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsaW5rQXR0ci5wZXJtaXNzaW9uKS50b0VxdWFsKGxpbmtBdHRyRGF0YS5wZXJtaXNzaW9uKTtcclxuICAgICAgICAgICAgZXhwZWN0KGxpbmtBdHRyLmVudGl0bGVtZW50KS50b0VxdWFsKGxpbmtBdHRyRGF0YS5lbnRpdGxlbWVudCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsaW5rQXR0ci5kZXNjcmlwdGlvbikudG9FcXVhbChsaW5rQXR0ckRhdGEuZGVzY3JpcHRpb24pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
