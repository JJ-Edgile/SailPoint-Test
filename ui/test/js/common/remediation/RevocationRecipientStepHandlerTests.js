System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule', './RemediationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_RemediationTestData) {}],
        execute: function () {

            describe('RevocationRecipientStepHandler', function () {

                var RevocationRecipientStepHandler = undefined,
                    adviceResult = undefined,
                    $rootScope = undefined;

                beforeEach(module(remediationModule));

                beforeEach(inject(function (_RevocationRecipientStepHandler_, remediationTestData, RemediationAdviceResult, _$rootScope_) {
                    RevocationRecipientStepHandler = _RevocationRecipientStepHandler_;
                    adviceResult = new RemediationAdviceResult(remediationTestData.REMEDIATION_ADVICE_RESULT);
                    $rootScope = _$rootScope_;
                }));

                describe('constructor', function () {
                    it('sets recipient to default remediator', function () {
                        var stepHandler = new RevocationRecipientStepHandler(adviceResult.advice.violationSummary, adviceResult.summary.defaultRemediator);
                        expect(stepHandler.recipient).toEqual(adviceResult.summary.defaultRemediator);
                        expect(stepHandler.violationDescription).toEqual(adviceResult.advice.violationSummary);
                    });
                });

                describe('isSaveDisabled()', function () {
                    it('returns true with no recipient', function () {
                        var stepHandler = undefined;
                        stepHandler = new RevocationRecipientStepHandler(adviceResult.advice, adviceResult.summary);
                        delete stepHandler.recipient;
                        expect(stepHandler.isSaveDisabled()).toEqual(true);
                    });

                    it('returns false with a recipient', function () {
                        var stepHandler = new RevocationRecipientStepHandler(adviceResult.advice, adviceResult.summary);
                        expect(stepHandler.isSaveDisabled()).toEqual(false);
                    });
                });

                describe('save()', function () {
                    it('returns resovled promise with recipient and comments', function () {
                        var stepHandler = new RevocationRecipientStepHandler(adviceResult.advice, adviceResult.summary),
                            saveResult = undefined;
                        stepHandler.comments = 'good morning';
                        stepHandler.save().then(function (result) {
                            saveResult = result;
                        });
                        $rootScope.$apply();
                        expect(saveResult).toBeDefined();
                        expect(saveResult.recipientSummary).toEqual(stepHandler.recipient);
                        expect(saveResult.comments).toEqual(stepHandler.comments);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9SZXZvY2F0aW9uUmVjaXBpZW50U3RlcEhhbmRsZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsd0NBQXdDLDBCQUEwQixVQUFVLFNBQVM7OztJQUc3SDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscUNBQXFDO1lBQzNGLG9CQUFvQixvQ0FBb0M7V0FDekQsVUFBVSxzQkFBc0I7UUFDbkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLGtDQUFrQyxZQUFNOztnQkFFN0MsSUFBSSxpQ0FBOEI7b0JBQUUsZUFBWTtvQkFBRSxhQUFVOztnQkFFNUQsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsa0NBQWtDLHFCQUFxQix5QkFDdkQsY0FBaUI7b0JBQ2hDLGlDQUFpQztvQkFDakMsZUFBZSxJQUFJLHdCQUF3QixvQkFBb0I7b0JBQy9ELGFBQWE7OztnQkFHakIsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsd0NBQXdDLFlBQU07d0JBQzdDLElBQUksY0FBYyxJQUFJLCtCQUErQixhQUFhLE9BQU8sa0JBQ3JFLGFBQWEsUUFBUTt3QkFDekIsT0FBTyxZQUFZLFdBQVcsUUFBUSxhQUFhLFFBQVE7d0JBQzNELE9BQU8sWUFBWSxzQkFBc0IsUUFBUSxhQUFhLE9BQU87Ozs7Z0JBSTdFLFNBQVMsb0JBQW9CLFlBQU07b0JBQy9CLEdBQUcsa0NBQWtDLFlBQU07d0JBQ3ZDLElBQUksY0FBVzt3QkFDZixjQUFjLElBQUksK0JBQStCLGFBQWEsUUFBUSxhQUFhO3dCQUNuRixPQUFPLFlBQVk7d0JBQ25CLE9BQU8sWUFBWSxrQkFBa0IsUUFBUTs7O29CQUdqRCxHQUFHLGtDQUFrQyxZQUFNO3dCQUN2QyxJQUFJLGNBQWMsSUFBSSwrQkFBK0IsYUFBYSxRQUFRLGFBQWE7d0JBQ3ZGLE9BQU8sWUFBWSxrQkFBa0IsUUFBUTs7OztnQkFJckQsU0FBUyxVQUFVLFlBQU07b0JBQ3JCLEdBQUcsd0RBQXdELFlBQU07d0JBQzdELElBQUksY0FBYyxJQUFJLCtCQUErQixhQUFhLFFBQVEsYUFBYTs0QkFDbkYsYUFBVTt3QkFDZCxZQUFZLFdBQVc7d0JBQ3ZCLFlBQVksT0FBTyxLQUFLLFVBQUMsUUFBVzs0QkFDaEMsYUFBYTs7d0JBRWpCLFdBQVc7d0JBQ1gsT0FBTyxZQUFZO3dCQUNuQixPQUFPLFdBQVcsa0JBQWtCLFFBQVEsWUFBWTt3QkFDeEQsT0FBTyxXQUFXLFVBQVUsUUFBUSxZQUFZOzs7Ozs7R0FZekQiLCJmaWxlIjoiY29tbW9uL3JlbWVkaWF0aW9uL1Jldm9jYXRpb25SZWNpcGllbnRTdGVwSGFuZGxlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHJlbWVkaWF0aW9uTW9kdWxlIGZyb20gJ2NvbW1vbi9yZW1lZGlhdGlvbi9SZW1lZGlhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJy4vUmVtZWRpYXRpb25UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdSZXZvY2F0aW9uUmVjaXBpZW50U3RlcEhhbmRsZXInLCAoKSA9PiB7XG5cbiAgICBsZXQgUmV2b2NhdGlvblJlY2lwaWVudFN0ZXBIYW5kbGVyLCBhZHZpY2VSZXN1bHQsICRyb290U2NvcGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShyZW1lZGlhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9SZXZvY2F0aW9uUmVjaXBpZW50U3RlcEhhbmRsZXJfLCByZW1lZGlhdGlvblRlc3REYXRhLCBSZW1lZGlhdGlvbkFkdmljZVJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgXyRyb290U2NvcGVfKSA9PiB7XG4gICAgICAgIFJldm9jYXRpb25SZWNpcGllbnRTdGVwSGFuZGxlciA9IF9SZXZvY2F0aW9uUmVjaXBpZW50U3RlcEhhbmRsZXJfO1xuICAgICAgICBhZHZpY2VSZXN1bHQgPSBuZXcgUmVtZWRpYXRpb25BZHZpY2VSZXN1bHQocmVtZWRpYXRpb25UZXN0RGF0YS5SRU1FRElBVElPTl9BRFZJQ0VfUkVTVUxUKTtcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzZXRzIHJlY2lwaWVudCB0byBkZWZhdWx0IHJlbWVkaWF0b3InLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RlcEhhbmRsZXIgPSBuZXcgUmV2b2NhdGlvblJlY2lwaWVudFN0ZXBIYW5kbGVyKGFkdmljZVJlc3VsdC5hZHZpY2UudmlvbGF0aW9uU3VtbWFyeSxcbiAgICAgICAgICAgICAgICBhZHZpY2VSZXN1bHQuc3VtbWFyeS5kZWZhdWx0UmVtZWRpYXRvcik7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIucmVjaXBpZW50KS50b0VxdWFsKGFkdmljZVJlc3VsdC5zdW1tYXJ5LmRlZmF1bHRSZW1lZGlhdG9yKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci52aW9sYXRpb25EZXNjcmlwdGlvbikudG9FcXVhbChhZHZpY2VSZXN1bHQuYWR2aWNlLnZpb2xhdGlvblN1bW1hcnkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1NhdmVEaXNhYmxlZCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIHdpdGggbm8gcmVjaXBpZW50JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyO1xuICAgICAgICAgICAgc3RlcEhhbmRsZXIgPSBuZXcgUmV2b2NhdGlvblJlY2lwaWVudFN0ZXBIYW5kbGVyKGFkdmljZVJlc3VsdC5hZHZpY2UsIGFkdmljZVJlc3VsdC5zdW1tYXJ5KTtcbiAgICAgICAgICAgIGRlbGV0ZSBzdGVwSGFuZGxlci5yZWNpcGllbnQ7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuaXNTYXZlRGlzYWJsZWQoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2l0aCBhIHJlY2lwaWVudCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGVwSGFuZGxlciA9IG5ldyBSZXZvY2F0aW9uUmVjaXBpZW50U3RlcEhhbmRsZXIoYWR2aWNlUmVzdWx0LmFkdmljZSwgYWR2aWNlUmVzdWx0LnN1bW1hcnkpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzU2F2ZURpc2FibGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzYXZlKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHJlc292bGVkIHByb21pc2Ugd2l0aCByZWNpcGllbnQgYW5kIGNvbW1lbnRzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IFJldm9jYXRpb25SZWNpcGllbnRTdGVwSGFuZGxlcihhZHZpY2VSZXN1bHQuYWR2aWNlLCBhZHZpY2VSZXN1bHQuc3VtbWFyeSksXG4gICAgICAgICAgICAgICAgc2F2ZVJlc3VsdDtcbiAgICAgICAgICAgIHN0ZXBIYW5kbGVyLmNvbW1lbnRzID0gJ2dvb2QgbW9ybmluZyc7XG4gICAgICAgICAgICBzdGVwSGFuZGxlci5zYXZlKCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgc2F2ZVJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzYXZlUmVzdWx0KS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNhdmVSZXN1bHQucmVjaXBpZW50U3VtbWFyeSkudG9FcXVhbChzdGVwSGFuZGxlci5yZWNpcGllbnQpO1xuICAgICAgICAgICAgZXhwZWN0KHNhdmVSZXN1bHQuY29tbWVudHMpLnRvRXF1YWwoc3RlcEhhbmRsZXIuY29tbWVudHMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
