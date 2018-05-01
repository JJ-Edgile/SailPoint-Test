System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule', '../RemediationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_RemediationTestData) {}],
        execute: function () {

            describe('RemediationAdvice', function () {

                beforeEach(module(remediationModule));

                var data = undefined,
                    RemediationAdviceResult = undefined,
                    RemediationAdvice = undefined,
                    RemediationSummary = undefined;

                beforeEach(inject(function (_RemediationAdvice_, _RemediationAdviceResult_, _RemediationSummary_, remediationTestData) {
                    RemediationAdvice = _RemediationAdvice_;
                    RemediationAdviceResult = _RemediationAdviceResult_;
                    RemediationSummary = _RemediationSummary_;
                    data = angular.copy(remediationTestData.REMEDIATION_ADVICE_RESULT);
                }));

                describe('constructor', function () {
                    it('should initialize with provided data', function () {
                        var result = new RemediationAdviceResult(data);
                        expect(result.advice).toEqual(new RemediationAdvice(data.advice));
                        expect(result.summary).toEqual(new RemediationSummary(data.summary));
                    });

                    it('should throw with no data', function () {
                        expect(function () {
                            new RemediationAdviceResult();
                        }).toThrow();
                    });

                    it('should throw with no advice', function () {
                        expect(function () {
                            new RemediationAdviceResult({
                                summary: data.summary
                            });
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9tb2RlbC9SZW1lZGlhdGlvbkFkdmljZVJlc3VsdFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix3Q0FBd0MsMkJBQTJCLFVBQVUsU0FBUzs7O0lBRzlIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxxQ0FBcUM7WUFDM0Ysb0JBQW9CLG9DQUFvQztXQUN6RCxVQUFVLHNCQUFzQjtRQUNuQyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMscUJBQXFCLFlBQVc7O2dCQUVyQyxXQUFXLE9BQU87O2dCQUVsQixJQUFJLE9BQUk7b0JBQUUsMEJBQXVCO29CQUFFLG9CQUFpQjtvQkFBRSxxQkFBa0I7O2dCQUV4RSxXQUFXLE9BQU8sVUFBQyxxQkFBcUIsMkJBQTJCLHNCQUNoRCxxQkFBd0I7b0JBQ3ZDLG9CQUFvQjtvQkFDcEIsMEJBQTBCO29CQUMxQixxQkFBcUI7b0JBQ3JCLE9BQU8sUUFBUSxLQUFLLG9CQUFvQjs7O2dCQUc1QyxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyx3Q0FBd0MsWUFBTTt3QkFDN0MsSUFBSSxTQUFTLElBQUksd0JBQXdCO3dCQUN6QyxPQUFPLE9BQU8sUUFBUSxRQUFRLElBQUksa0JBQWtCLEtBQUs7d0JBQ3pELE9BQU8sT0FBTyxTQUFTLFFBQVEsSUFBSSxtQkFBbUIsS0FBSzs7O29CQUcvRCxHQUFHLDZCQUE2QixZQUFNO3dCQUNsQyxPQUFPLFlBQU07NEJBQUUsSUFBSTsyQkFBOEI7OztvQkFHckQsR0FBRywrQkFBK0IsWUFBTTt3QkFDcEMsT0FBTyxZQUFNOzRCQUFFLElBQUksd0JBQXdCO2dDQUN2QyxTQUFTLEtBQUs7OzJCQUNYOzs7Ozs7R0FrQmhCIiwiZmlsZSI6ImNvbW1vbi9yZW1lZGlhdGlvbi9tb2RlbC9SZW1lZGlhdGlvbkFkdmljZVJlc3VsdFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHJlbWVkaWF0aW9uTW9kdWxlIGZyb20gJ2NvbW1vbi9yZW1lZGlhdGlvbi9SZW1lZGlhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJy4uL1JlbWVkaWF0aW9uVGVzdERhdGEnO1xuXG5kZXNjcmliZSgnUmVtZWRpYXRpb25BZHZpY2UnLCBmdW5jdGlvbigpIHtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlbWVkaWF0aW9uTW9kdWxlKSk7XG5cbiAgICBsZXQgZGF0YSwgUmVtZWRpYXRpb25BZHZpY2VSZXN1bHQsIFJlbWVkaWF0aW9uQWR2aWNlLCBSZW1lZGlhdGlvblN1bW1hcnk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX1JlbWVkaWF0aW9uQWR2aWNlXywgX1JlbWVkaWF0aW9uQWR2aWNlUmVzdWx0XywgX1JlbWVkaWF0aW9uU3VtbWFyeV8sXG4gICAgICAgICAgICAgICAgICAgICAgIHJlbWVkaWF0aW9uVGVzdERhdGEpID0+IHtcbiAgICAgICAgUmVtZWRpYXRpb25BZHZpY2UgPSBfUmVtZWRpYXRpb25BZHZpY2VfO1xuICAgICAgICBSZW1lZGlhdGlvbkFkdmljZVJlc3VsdCA9IF9SZW1lZGlhdGlvbkFkdmljZVJlc3VsdF87XG4gICAgICAgIFJlbWVkaWF0aW9uU3VtbWFyeSA9IF9SZW1lZGlhdGlvblN1bW1hcnlfO1xuICAgICAgICBkYXRhID0gYW5ndWxhci5jb3B5KHJlbWVkaWF0aW9uVGVzdERhdGEuUkVNRURJQVRJT05fQURWSUNFX1JFU1VMVCk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2l0aCBwcm92aWRlZCBkYXRhJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBSZW1lZGlhdGlvbkFkdmljZVJlc3VsdChkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQuYWR2aWNlKS50b0VxdWFsKG5ldyBSZW1lZGlhdGlvbkFkdmljZShkYXRhLmFkdmljZSkpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5zdW1tYXJ5KS50b0VxdWFsKG5ldyBSZW1lZGlhdGlvblN1bW1hcnkoZGF0YS5zdW1tYXJ5KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2l0aCBubyBkYXRhJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHsgbmV3IFJlbWVkaWF0aW9uQWR2aWNlUmVzdWx0KCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIGFkdmljZScsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IG5ldyBSZW1lZGlhdGlvbkFkdmljZVJlc3VsdCh7XG4gICAgICAgICAgICAgICAgc3VtbWFyeTogZGF0YS5zdW1tYXJ5XG4gICAgICAgICAgICB9KTsgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
