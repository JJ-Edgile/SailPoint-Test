System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }],
        execute: function () {

            describe('RemediationDialogResult', function () {
                var RemediationDialogResult = undefined;

                beforeEach(module(remediationModule));

                beforeEach(inject(function (_RemediationDialogResult_) {
                    RemediationDialogResult = _RemediationDialogResult_;
                }));

                describe('constructor', function () {
                    it('throws with no data', function () {
                        expect(function () {
                            return new RemediationDialogResult();
                        }).toThrow();
                    });

                    it('initializes data', function () {
                        var data = {
                            recipientSummary: {
                                id: '1234',
                                name: 'Bob'
                            },
                            comments: 'hello',
                            remediationDetails: [],
                            revokedRoles: ['role1', 'role2'],
                            selectedViolationEntitlements: {}
                        },
                            result = new RemediationDialogResult(data);

                        expect(result.recipientSummary).toEqual(data.recipientSummary);
                        expect(result.comments).toEqual(data.comments);
                        expect(result.remediationDetails).toEqual(data.remediationDetails);
                        expect(result.revokedRoles).toEqual(data.revokedRoles);
                        expect(result.selectedViolationEntitlements).toEqual(data.selectedViolationEntitlements);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9tb2RlbC9SZW1lZGlhdGlvbkRpYWxvZ1Jlc3VsdFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5Q0FBeUMsVUFBVSxTQUFTOzs7SUFHcEc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHFDQUFxQztZQUMzRixvQkFBb0Isb0NBQW9DOztRQUU1RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsMkJBQTJCLFlBQU07Z0JBQ3RDLElBQUksMEJBQXVCOztnQkFFM0IsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsMkJBQThCO29CQUM3QywwQkFBMEI7OztnQkFHOUIsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsdUJBQXVCLFlBQU07d0JBQzVCLE9BQU8sWUFBQTs0QkFRUyxPQVJILElBQUk7MkJBQTJCOzs7b0JBR2hELEdBQUcsb0JBQW9CLFlBQU07d0JBQ3pCLElBQUksT0FBTzs0QkFDUCxrQkFBa0I7Z0NBQ2QsSUFBSTtnQ0FDSixNQUFNOzs0QkFFVixVQUFVOzRCQUNWLG9CQUFvQjs0QkFDcEIsY0FBYyxDQUFDLFNBQVM7NEJBQ3hCLCtCQUErQjs7NEJBQ2hDLFNBQVMsSUFBSSx3QkFBd0I7O3dCQUV4QyxPQUFPLE9BQU8sa0JBQWtCLFFBQVEsS0FBSzt3QkFDN0MsT0FBTyxPQUFPLFVBQVUsUUFBUSxLQUFLO3dCQUNyQyxPQUFPLE9BQU8sb0JBQW9CLFFBQVEsS0FBSzt3QkFDL0MsT0FBTyxPQUFPLGNBQWMsUUFBUSxLQUFLO3dCQUN6QyxPQUFPLE9BQU8sK0JBQStCLFFBQVEsS0FBSzs7Ozs7O0dBZ0JuRSIsImZpbGUiOiJjb21tb24vcmVtZWRpYXRpb24vbW9kZWwvUmVtZWRpYXRpb25EaWFsb2dSZXN1bHRUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCByZW1lZGlhdGlvbk1vZHVsZSBmcm9tICdjb21tb24vcmVtZWRpYXRpb24vUmVtZWRpYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnUmVtZWRpYXRpb25EaWFsb2dSZXN1bHQnLCAoKSA9PiB7XG4gICAgbGV0IFJlbWVkaWF0aW9uRGlhbG9nUmVzdWx0O1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocmVtZWRpYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUmVtZWRpYXRpb25EaWFsb2dSZXN1bHRfKSA9PiB7XG4gICAgICAgIFJlbWVkaWF0aW9uRGlhbG9nUmVzdWx0ID0gX1JlbWVkaWF0aW9uRGlhbG9nUmVzdWx0XztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBkYXRhJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IG5ldyBSZW1lZGlhdGlvbkRpYWxvZ1Jlc3VsdCgpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpbml0aWFsaXplcyBkYXRhJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgcmVjaXBpZW50U3VtbWFyeToge1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQm9iJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tbWVudHM6ICdoZWxsbycsXG4gICAgICAgICAgICAgICAgcmVtZWRpYXRpb25EZXRhaWxzOiBbXSxcbiAgICAgICAgICAgICAgICByZXZva2VkUm9sZXM6IFsncm9sZTEnLCAncm9sZTInXSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50czoge31cbiAgICAgICAgICAgIH0sIHJlc3VsdCA9IG5ldyBSZW1lZGlhdGlvbkRpYWxvZ1Jlc3VsdChkYXRhKTtcblxuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5yZWNpcGllbnRTdW1tYXJ5KS50b0VxdWFsKGRhdGEucmVjaXBpZW50U3VtbWFyeSk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0LmNvbW1lbnRzKS50b0VxdWFsKGRhdGEuY29tbWVudHMpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5yZW1lZGlhdGlvbkRldGFpbHMpLnRvRXF1YWwoZGF0YS5yZW1lZGlhdGlvbkRldGFpbHMpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5yZXZva2VkUm9sZXMpLnRvRXF1YWwoZGF0YS5yZXZva2VkUm9sZXMpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5zZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cykudG9FcXVhbChkYXRhLnNlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
