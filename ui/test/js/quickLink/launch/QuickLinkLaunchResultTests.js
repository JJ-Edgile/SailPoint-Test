System.register(['test/js/TestInitializer', 'quickLink/launch/QuickLinkLaunchModule'], function (_export) {

    /**
     * Tests for the QuickLinkLaunchResult model object
     */
    'use strict';

    var quickLinkLaunchModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_quickLinkLaunchQuickLinkLaunchModule) {
            quickLinkLaunchModule = _quickLinkLaunchQuickLinkLaunchModule['default'];
        }],
        execute: function () {
            describe('QuickLinkLaunchResult', function () {
                var QuickLinkLaunchResult,
                    testLaunchResult,
                    testLaunchResultData = {
                    action: 'testQuickLink1',
                    actionParameters: 'ql1',
                    redirectUrl: 'Test Quick Link 1',
                    args: [],
                    messages: '',
                    quickLinkName: 'funquicklink',
                    selectIdentitiesForWorkflow: false,
                    workflowLaunched: true,
                    nextWorkItemId: '1234',
                    nextWorkItemType: 'Form'
                };

                beforeEach(module(quickLinkLaunchModule));

                beforeEach(inject(function (_QuickLinkLaunchResult_) {
                    QuickLinkLaunchResult = _QuickLinkLaunchResult_;
                    testLaunchResult = new QuickLinkLaunchResult(testLaunchResultData);
                }));

                it('requires data object in constructor', function () {
                    expect(function () {
                        new QuickLinkLaunchResult(null);
                    }).toThrow();
                    expect(function () {
                        new QuickLinkLaunchResult('not an  object');
                    }).toThrow();
                });

                it('constructs a proper QuickLinkLaunchResult object', function () {
                    expect(testLaunchResult instanceof QuickLinkLaunchResult).toBeTruthy();
                    expect(testLaunchResult.action).toEqual(testLaunchResultData.action);
                    expect(testLaunchResult.actionParameters).toEqual(testLaunchResultData.actionParameters);
                    expect(testLaunchResult.redirectUrl).toEqual(testLaunchResultData.redirectUrl);
                    expect(testLaunchResult.messages).toEqual(testLaunchResultData.messages);
                    expect(testLaunchResult.quickLinkName).toEqual(testLaunchResultData.quickLinkName);
                    expect(testLaunchResult.selectIdentitiesForWorkflow).toEqual(testLaunchResultData.selectIdentitiesForWorkflow);
                    expect(testLaunchResult.workflowLaunched).toEqual(testLaunchResultData.workflowLaunched);
                    expect(testLaunchResult.nextWorkItemId).toEqual(testLaunchResultData.nextWorkItemId);
                    expect(testLaunchResult.nextWorkItemType).toEqual(testLaunchResultData.nextWorkItemType);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1aWNrTGluay9sYXVuY2gvUXVpY2tMaW5rTGF1bmNoUmVzdWx0VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJDQUEyQyxVQUFVLFNBQVM7Ozs7O0lBQTFHOztJQU9JLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQzs7UUFFbEUsU0FBUyxZQUFZO1lBSjdCLFNBQVMseUJBQXlCLFlBQVc7Z0JBQ3pDLElBQUk7b0JBQXVCO29CQUN2Qix1QkFBd0I7b0JBQ3BCLFFBQVE7b0JBQ1Isa0JBQWtCO29CQUNsQixhQUFhO29CQUNiLE1BQU07b0JBQ04sVUFBVTtvQkFDVixlQUFlO29CQUNmLDZCQUE2QjtvQkFDN0Isa0JBQWtCO29CQUNsQixnQkFBZ0I7b0JBQ2hCLGtCQUFrQjs7O2dCQUcxQixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyx5QkFBeUI7b0JBQ2hELHdCQUF3QjtvQkFDeEIsbUJBQW1CLElBQUksc0JBQXNCOzs7Z0JBR2pELEdBQUcsdUNBQXVDLFlBQVc7b0JBQ2pELE9BQU8sWUFBVzt3QkFBRSxJQUFJLHNCQUFzQjt1QkFBVTtvQkFDeEQsT0FBTyxZQUFXO3dCQUFFLElBQUksc0JBQXNCO3VCQUFzQjs7O2dCQUd4RSxHQUFHLG9EQUFvRCxZQUFXO29CQUM5RCxPQUFPLDRCQUE0Qix1QkFBdUI7b0JBQzFELE9BQU8saUJBQWlCLFFBQVEsUUFBUSxxQkFBcUI7b0JBQzdELE9BQU8saUJBQWlCLGtCQUFrQixRQUFRLHFCQUFxQjtvQkFDdkUsT0FBTyxpQkFBaUIsYUFBYSxRQUFRLHFCQUFxQjtvQkFDbEUsT0FBTyxpQkFBaUIsVUFBVSxRQUFRLHFCQUFxQjtvQkFDL0QsT0FBTyxpQkFBaUIsZUFBZSxRQUFRLHFCQUFxQjtvQkFDcEUsT0FBTyxpQkFBaUIsNkJBQ3BCLFFBQVEscUJBQXFCO29CQUNqQyxPQUFPLGlCQUFpQixrQkFBa0IsUUFBUSxxQkFBcUI7b0JBQ3ZFLE9BQU8saUJBQWlCLGdCQUFnQixRQUFRLHFCQUFxQjtvQkFDckUsT0FBTyxpQkFBaUIsa0JBQWtCLFFBQVEscUJBQXFCOzs7OztHQWM1RSIsImZpbGUiOiJxdWlja0xpbmsvbGF1bmNoL1F1aWNrTGlua0xhdW5jaFJlc3VsdFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBxdWlja0xpbmtMYXVuY2hNb2R1bGUgZnJvbSAncXVpY2tMaW5rL2xhdW5jaC9RdWlja0xpbmtMYXVuY2hNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUXVpY2tMaW5rTGF1bmNoUmVzdWx0IG1vZGVsIG9iamVjdFxuICovXG5kZXNjcmliZSgnUXVpY2tMaW5rTGF1bmNoUmVzdWx0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIFF1aWNrTGlua0xhdW5jaFJlc3VsdCwgdGVzdExhdW5jaFJlc3VsdCxcbiAgICAgICAgdGVzdExhdW5jaFJlc3VsdERhdGEgPSAge1xuICAgICAgICAgICAgYWN0aW9uOiAndGVzdFF1aWNrTGluazEnLFxuICAgICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogJ3FsMScsXG4gICAgICAgICAgICByZWRpcmVjdFVybDogJ1Rlc3QgUXVpY2sgTGluayAxJyxcbiAgICAgICAgICAgIGFyZ3M6IFtdLFxuICAgICAgICAgICAgbWVzc2FnZXM6ICcnLFxuICAgICAgICAgICAgcXVpY2tMaW5rTmFtZTogJ2Z1bnF1aWNrbGluaycsXG4gICAgICAgICAgICBzZWxlY3RJZGVudGl0aWVzRm9yV29ya2Zsb3c6IGZhbHNlLFxuICAgICAgICAgICAgd29ya2Zsb3dMYXVuY2hlZDogdHJ1ZSxcbiAgICAgICAgICAgIG5leHRXb3JrSXRlbUlkOiAnMTIzNCcsXG4gICAgICAgICAgICBuZXh0V29ya0l0ZW1UeXBlOiAnRm9ybSdcbiAgICAgICAgfTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHF1aWNrTGlua0xhdW5jaE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1F1aWNrTGlua0xhdW5jaFJlc3VsdF8pIHtcbiAgICAgICAgUXVpY2tMaW5rTGF1bmNoUmVzdWx0ID0gX1F1aWNrTGlua0xhdW5jaFJlc3VsdF87XG4gICAgICAgIHRlc3RMYXVuY2hSZXN1bHQgPSBuZXcgUXVpY2tMaW5rTGF1bmNoUmVzdWx0KHRlc3RMYXVuY2hSZXN1bHREYXRhKTtcbiAgICB9KSk7XG5cbiAgICBpdCgncmVxdWlyZXMgZGF0YSBvYmplY3QgaW4gY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgUXVpY2tMaW5rTGF1bmNoUmVzdWx0KG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFF1aWNrTGlua0xhdW5jaFJlc3VsdCgnbm90IGFuICBvYmplY3QnKTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NvbnN0cnVjdHMgYSBwcm9wZXIgUXVpY2tMaW5rTGF1bmNoUmVzdWx0IG9iamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QodGVzdExhdW5jaFJlc3VsdCBpbnN0YW5jZW9mIFF1aWNrTGlua0xhdW5jaFJlc3VsdCkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QodGVzdExhdW5jaFJlc3VsdC5hY3Rpb24pLnRvRXF1YWwodGVzdExhdW5jaFJlc3VsdERhdGEuYWN0aW9uKTtcbiAgICAgICAgZXhwZWN0KHRlc3RMYXVuY2hSZXN1bHQuYWN0aW9uUGFyYW1ldGVycykudG9FcXVhbCh0ZXN0TGF1bmNoUmVzdWx0RGF0YS5hY3Rpb25QYXJhbWV0ZXJzKTtcbiAgICAgICAgZXhwZWN0KHRlc3RMYXVuY2hSZXN1bHQucmVkaXJlY3RVcmwpLnRvRXF1YWwodGVzdExhdW5jaFJlc3VsdERhdGEucmVkaXJlY3RVcmwpO1xuICAgICAgICBleHBlY3QodGVzdExhdW5jaFJlc3VsdC5tZXNzYWdlcykudG9FcXVhbCh0ZXN0TGF1bmNoUmVzdWx0RGF0YS5tZXNzYWdlcyk7XG4gICAgICAgIGV4cGVjdCh0ZXN0TGF1bmNoUmVzdWx0LnF1aWNrTGlua05hbWUpLnRvRXF1YWwodGVzdExhdW5jaFJlc3VsdERhdGEucXVpY2tMaW5rTmFtZSk7XG4gICAgICAgIGV4cGVjdCh0ZXN0TGF1bmNoUmVzdWx0LnNlbGVjdElkZW50aXRpZXNGb3JXb3JrZmxvdykuXG4gICAgICAgICAgICB0b0VxdWFsKHRlc3RMYXVuY2hSZXN1bHREYXRhLnNlbGVjdElkZW50aXRpZXNGb3JXb3JrZmxvdyk7XG4gICAgICAgIGV4cGVjdCh0ZXN0TGF1bmNoUmVzdWx0LndvcmtmbG93TGF1bmNoZWQpLnRvRXF1YWwodGVzdExhdW5jaFJlc3VsdERhdGEud29ya2Zsb3dMYXVuY2hlZCk7XG4gICAgICAgIGV4cGVjdCh0ZXN0TGF1bmNoUmVzdWx0Lm5leHRXb3JrSXRlbUlkKS50b0VxdWFsKHRlc3RMYXVuY2hSZXN1bHREYXRhLm5leHRXb3JrSXRlbUlkKTtcbiAgICAgICAgZXhwZWN0KHRlc3RMYXVuY2hSZXN1bHQubmV4dFdvcmtJdGVtVHlwZSkudG9FcXVhbCh0ZXN0TGF1bmNoUmVzdWx0RGF0YS5uZXh0V29ya0l0ZW1UeXBlKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
