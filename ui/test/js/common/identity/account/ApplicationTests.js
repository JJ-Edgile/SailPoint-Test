System.register(['test/js/TestInitializer', 'common/identity/account/IdentityAccountModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var accountModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityAccountIdentityAccountModule) {
            accountModule = _commonIdentityAccountIdentityAccountModule['default'];
        }],
        execute: function () {

            describe('Application', function () {

                var Application = undefined,
                    IdentitySummary = undefined,
                    applicationData = {
                    id: '1234',
                    type: 'App Type',
                    name: 'Name of the application',
                    description: 'Some application',
                    owner: {
                        id: 'Id',
                        name: 'My name'
                    },
                    remediators: [{
                        id: 'Id 1',
                        name: 'Some name'
                    }]
                };

                beforeEach(module(accountModule));

                beforeEach(inject(function (_Application_, _IdentitySummary_) {
                    Application = _Application_;
                    IdentitySummary = _IdentitySummary_;
                }));

                describe('constructor', function () {

                    it('should throw with no Application data', function () {
                        expect(function () {
                            return new Application(null);
                        }).toThrow();
                    });

                    it('sets properties for the Application', function () {

                        var application = new Application(applicationData);
                        expect(application.id).toEqual(applicationData.id);
                        expect(application.name).toEqual(applicationData.name);
                        expect(application.type).toEqual(applicationData.type);
                        expect(application.description).toEqual(applicationData.description);
                        expect(application.owner instanceof IdentitySummary).toEqual(true);
                        expect(application.remediators.length).toEqual(1);
                        expect(application.remediators[0] instanceof IdentitySummary).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9hY2NvdW50L0FwcGxpY2F0aW9uVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGtEQUFrRCxVQUFVLFNBQVM7OztJQUc3Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsNkNBQTZDO1lBQ25HLGdCQUFnQiw0Q0FBNEM7O1FBRWhFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxlQUFlLFlBQU07O2dCQUUxQixJQUFJLGNBQVc7b0JBQ1gsa0JBQWU7b0JBQ2Ysa0JBQWtCO29CQUNkLElBQUk7b0JBQ0osTUFBTTtvQkFDTixNQUFNO29CQUNOLGFBQWE7b0JBQ2IsT0FBTzt3QkFDSCxJQUFJO3dCQUNKLE1BQU07O29CQUVWLGFBQWEsQ0FBQzt3QkFDVixJQUFJO3dCQUNKLE1BQU07Ozs7Z0JBSWxCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGVBQWUsbUJBQXNCO29CQUNwRCxjQUFjO29CQUNkLGtCQUFrQjs7O2dCQUl0QixTQUFTLGVBQWUsWUFBTTs7b0JBRTFCLEdBQUcseUNBQXlDLFlBQU07d0JBQzlDLE9BQU8sWUFBQTs0QkFPUyxPQVBILElBQUksWUFBWTsyQkFBTzs7O29CQUd4QyxHQUFHLHVDQUF1QyxZQUFNOzt3QkFFNUMsSUFBSSxjQUFjLElBQUksWUFBWTt3QkFDbEMsT0FBTyxZQUFZLElBQUksUUFBUSxnQkFBZ0I7d0JBQy9DLE9BQU8sWUFBWSxNQUFNLFFBQVEsZ0JBQWdCO3dCQUNqRCxPQUFPLFlBQVksTUFBTSxRQUFRLGdCQUFnQjt3QkFDakQsT0FBTyxZQUFZLGFBQWEsUUFBUSxnQkFBZ0I7d0JBQ3hELE9BQU8sWUFBWSxpQkFBaUIsaUJBQWlCLFFBQVE7d0JBQzdELE9BQU8sWUFBWSxZQUFZLFFBQVEsUUFBUTt3QkFDL0MsT0FBTyxZQUFZLFlBQVksY0FBYyxpQkFBaUIsUUFBUTs7Ozs7O0dBYy9FIiwiZmlsZSI6ImNvbW1vbi9pZGVudGl0eS9hY2NvdW50L0FwcGxpY2F0aW9uVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgYWNjb3VudE1vZHVsZSBmcm9tICdjb21tb24vaWRlbnRpdHkvYWNjb3VudC9JZGVudGl0eUFjY291bnRNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0FwcGxpY2F0aW9uJywgKCkgPT4ge1xyXG5cclxuICAgIGxldCBBcHBsaWNhdGlvbixcclxuICAgICAgICBJZGVudGl0eVN1bW1hcnksXHJcbiAgICAgICAgYXBwbGljYXRpb25EYXRhID0ge1xyXG4gICAgICAgICAgICBpZDogJzEyMzQnLFxyXG4gICAgICAgICAgICB0eXBlOiAnQXBwIFR5cGUnLFxyXG4gICAgICAgICAgICBuYW1lOiAnTmFtZSBvZiB0aGUgYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NvbWUgYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICBvd25lcjoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdJZCcsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnTXkgbmFtZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVtZWRpYXRvcnM6IFt7XHJcbiAgICAgICAgICAgICAgICBpZDogJ0lkIDEnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ1NvbWUgbmFtZSdcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFjY291bnRNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX0FwcGxpY2F0aW9uXywgX0lkZW50aXR5U3VtbWFyeV8pID0+IHtcclxuICAgICAgICBBcHBsaWNhdGlvbiA9IF9BcHBsaWNhdGlvbl87XHJcbiAgICAgICAgSWRlbnRpdHlTdW1tYXJ5ID0gX0lkZW50aXR5U3VtbWFyeV87XHJcbiAgICB9KSk7XHJcblxyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIEFwcGxpY2F0aW9uIGRhdGEnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgQXBwbGljYXRpb24obnVsbCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgcHJvcGVydGllcyBmb3IgdGhlIEFwcGxpY2F0aW9uJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IGFwcGxpY2F0aW9uID0gbmV3IEFwcGxpY2F0aW9uKGFwcGxpY2F0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHBsaWNhdGlvbi5pZCkudG9FcXVhbChhcHBsaWNhdGlvbkRhdGEuaWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwbGljYXRpb24ubmFtZSkudG9FcXVhbChhcHBsaWNhdGlvbkRhdGEubmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHBsaWNhdGlvbi50eXBlKS50b0VxdWFsKGFwcGxpY2F0aW9uRGF0YS50eXBlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFwcGxpY2F0aW9uLmRlc2NyaXB0aW9uKS50b0VxdWFsKGFwcGxpY2F0aW9uRGF0YS5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHBsaWNhdGlvbi5vd25lciBpbnN0YW5jZW9mIElkZW50aXR5U3VtbWFyeSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFwcGxpY2F0aW9uLnJlbWVkaWF0b3JzLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFwcGxpY2F0aW9uLnJlbWVkaWF0b3JzWzBdIGluc3RhbmNlb2YgSWRlbnRpdHlTdW1tYXJ5KS50b0VxdWFsKHRydWUpO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
