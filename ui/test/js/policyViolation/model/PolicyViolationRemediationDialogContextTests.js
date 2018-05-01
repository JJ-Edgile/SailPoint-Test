System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }],
        execute: function () {

            describe('PolicyViolationRemediationDialogContext', function () {

                var PolicyViolationRemediationDialogContext = undefined,
                    policyViolationService = undefined;

                beforeEach(module(policyViolationModule));

                beforeEach(inject(function (_PolicyViolationRemediationDialogContext_, _policyViolationService_) {
                    PolicyViolationRemediationDialogContext = _PolicyViolationRemediationDialogContext_;
                    policyViolationService = _policyViolationService_;
                }));

                describe('constructor', function () {
                    it('throws without policy violation', function () {
                        expect(function () {
                            return new PolicyViolationRemediationDialogContext();
                        }).toThrow();
                    });

                    it('sets the policyViolation', function () {
                        var policyViolation = { id: '1234' },
                            dialogContext = new PolicyViolationRemediationDialogContext({}, policyViolation);
                        expect(dialogContext.policyViolation).toBe(policyViolation);
                    });
                });

                describe('getRemediationSummary()', function () {
                    it('calls through to the policyViolationService to get the remediation summary', function () {
                        var policyViolation = { id: '1234' },
                            returnValue = 'blah',
                            revokedRoles = ['a', 'b'],
                            selectedEntitlements = [{}],
                            dialogContext = new PolicyViolationRemediationDialogContext({}, policyViolation);

                        spyOn(policyViolationService, 'getRemediationSummary').and.returnValue(returnValue);
                        expect(dialogContext.getRemediationSummary(revokedRoles, selectedEntitlements)).toEqual(returnValue);
                        expect(policyViolationService.getRemediationSummary).toHaveBeenCalledWith(policyViolation.id, revokedRoles, selectedEntitlements);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9tb2RlbC9Qb2xpY3lWaW9sYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHRUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMENBQTBDLFVBQVUsU0FBUzs7O0lBR3JHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQzs7UUFFbEUsU0FBUyxZQUFZOztZQUw3QixTQUFTLDJDQUEyQyxZQUFNOztnQkFFdEQsSUFBSSwwQ0FBdUM7b0JBQUUseUJBQXNCOztnQkFFbkUsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsMkNBQTJDLDBCQUE2QjtvQkFDdkYsMENBQTBDO29CQUMxQyx5QkFBeUI7OztnQkFHN0IsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsbUNBQW1DLFlBQU07d0JBQ3hDLE9BQU8sWUFBQTs0QkFTUyxPQVRILElBQUk7MkJBQTJDOzs7b0JBR2hFLEdBQUcsNEJBQTRCLFlBQU07d0JBQ2pDLElBQUksa0JBQWtCLEVBQUUsSUFBSTs0QkFDeEIsZ0JBQWdCLElBQUksd0NBQXdDLElBQUk7d0JBQ3BFLE9BQU8sY0FBYyxpQkFBaUIsS0FBSzs7OztnQkFJbkQsU0FBUywyQkFBMkIsWUFBTTtvQkFDdEMsR0FBRyw4RUFBOEUsWUFBTTt3QkFDbkYsSUFBSSxrQkFBa0IsRUFBRSxJQUFJOzRCQUN4QixjQUFjOzRCQUNkLGVBQWUsQ0FBQyxLQUFLOzRCQUNyQix1QkFBdUIsQ0FBQzs0QkFDeEIsZ0JBQWdCLElBQUksd0NBQXdDLElBQUk7O3dCQUVwRSxNQUFNLHdCQUF3Qix5QkFBeUIsSUFBSSxZQUFZO3dCQUN2RSxPQUFPLGNBQWMsc0JBQXNCLGNBQWMsdUJBQXVCLFFBQVE7d0JBQ3hGLE9BQU8sdUJBQXVCLHVCQUN6QixxQkFBcUIsZ0JBQWdCLElBQUksY0FBYzs7Ozs7O0dBZXJFIiwiZmlsZSI6InBvbGljeVZpb2xhdGlvbi9tb2RlbC9Qb2xpY3lWaW9sYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHRUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwb2xpY3lWaW9sYXRpb25Nb2R1bGUgZnJvbSAncG9saWN5VmlvbGF0aW9uL1BvbGljeVZpb2xhdGlvbk1vZHVsZSc7XG5cbmRlc2NyaWJlKCdQb2xpY3lWaW9sYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQnLCAoKSA9PiB7XG5cbiAgICBsZXQgUG9saWN5VmlvbGF0aW9uUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0LCBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocG9saWN5VmlvbGF0aW9uTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX1BvbGljeVZpb2xhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dF8sIF9wb2xpY3lWaW9sYXRpb25TZXJ2aWNlXykgPT4ge1xuICAgICAgICBQb2xpY3lWaW9sYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQgPSBfUG9saWN5VmlvbGF0aW9uUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0XztcbiAgICAgICAgcG9saWN5VmlvbGF0aW9uU2VydmljZSA9IF9wb2xpY3lWaW9sYXRpb25TZXJ2aWNlXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aG91dCBwb2xpY3kgdmlvbGF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IG5ldyBQb2xpY3lWaW9sYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQoKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2V0cyB0aGUgcG9saWN5VmlvbGF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBvbGljeVZpb2xhdGlvbiA9IHsgaWQ6ICcxMjM0J30sXG4gICAgICAgICAgICAgICAgZGlhbG9nQ29udGV4dCA9IG5ldyBQb2xpY3lWaW9sYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQoe30sIHBvbGljeVZpb2xhdGlvbik7XG4gICAgICAgICAgICBleHBlY3QoZGlhbG9nQ29udGV4dC5wb2xpY3lWaW9sYXRpb24pLnRvQmUocG9saWN5VmlvbGF0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UmVtZWRpYXRpb25TdW1tYXJ5KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIHRoZSBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlIHRvIGdldCB0aGUgcmVtZWRpYXRpb24gc3VtbWFyeScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwb2xpY3lWaW9sYXRpb24gPSB7IGlkOiAnMTIzNCd9LFxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gJ2JsYWgnLFxuICAgICAgICAgICAgICAgIHJldm9rZWRSb2xlcyA9IFsnYScsICdiJ10sXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdGxlbWVudHMgPSBbe31dLFxuICAgICAgICAgICAgICAgIGRpYWxvZ0NvbnRleHQgPSBuZXcgUG9saWN5VmlvbGF0aW9uUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0KHt9LCBwb2xpY3lWaW9sYXRpb24pO1xuXG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLCAnZ2V0UmVtZWRpYXRpb25TdW1tYXJ5JykuYW5kLnJldHVyblZhbHVlKHJldHVyblZhbHVlKTtcbiAgICAgICAgICAgIGV4cGVjdChkaWFsb2dDb250ZXh0LmdldFJlbWVkaWF0aW9uU3VtbWFyeShyZXZva2VkUm9sZXMsIHNlbGVjdGVkRW50aXRsZW1lbnRzKSkudG9FcXVhbChyZXR1cm5WYWx1ZSk7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uU2VydmljZS5nZXRSZW1lZGlhdGlvblN1bW1hcnkpXG4gICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHBvbGljeVZpb2xhdGlvbi5pZCwgcmV2b2tlZFJvbGVzLCBzZWxlY3RlZEVudGl0bGVtZW50cyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
