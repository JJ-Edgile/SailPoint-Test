System.register(['certification/CertificationModule'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            angular.module(certificationModule).

            /**
             * This contains test data used by the identity difference tests.  Don't modify this data
             * directly from within your tests.  If you need to modify data, use angular.copy() to create your own
             * copy before changing it.
             */
            factory('identityDifferenceTestData', function () {
                return {
                    DIFFERENCE: {
                        assignedRoleDifferences: {
                            context: 'IIQ',
                            attribute: 'assignedRoles',
                            oldValue: 'Hype Guy',
                            removedValues: ['Hype guy'],
                            multi: false
                        },
                        bundleDifferences: {
                            context: 'IIQ',
                            attribute: 'detectedRoles',
                            newValue: 'Front Man',
                            addedValues: ['Front man'],
                            multi: false
                        },
                        linkDifferences: [{
                            context: 'AD',
                            attribute: 'name',
                            oldValue: 'Baller',
                            newValue: 'Shot Caller',
                            multi: false
                        }, {
                            context: 'DB',
                            attribute: 'groups',
                            newValue: 'Front man',
                            addedValues: ['Front man'],
                            multi: true
                        }],
                        permissionDifferences: [{
                            application: 'AD',
                            target: 'fileShare1',
                            rights: 'update'
                        }, {
                            application: 'AD',
                            target: 'fileShare2',
                            rights: 'delete',
                            removed: true
                        }],
                        attributeDifferences: [{
                            context: 'IIQ',
                            attribute: 'email',
                            displayName: 'Email Address',
                            oldValue: 'baller@example.com',
                            newValue: 'shotcaller@example.com',
                            multi: false
                        }],
                        policyViolationDifferences: [{
                            displayName: 'Some Violation',
                            oldValue: 'violation1',
                            newValue: 'violation2',
                            multi: false
                        }]
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vSWRlbnRpdHlEaWZmZXJlbmNlVGVzdERhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsc0NBQXNDLFVBQVUsU0FBUztJQUN0RTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLG1DQUFtQztZQUNuRCxzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7O1lBTjdCLFFBQVEsT0FBTzs7Ozs7OztZQU9mLFFBQVEsOEJBQThCLFlBQVc7Z0JBQzdDLE9BQU87b0JBQ0gsWUFBWTt3QkFDUix5QkFBeUI7NEJBQ3JCLFNBQVM7NEJBQ1QsV0FBVzs0QkFDWCxVQUFVOzRCQUNWLGVBQWUsQ0FBRTs0QkFDakIsT0FBTzs7d0JBRVgsbUJBQW1COzRCQUNmLFNBQVM7NEJBQ1QsV0FBVzs0QkFDWCxVQUFVOzRCQUNWLGFBQWEsQ0FBRTs0QkFDZixPQUFPOzt3QkFFWCxpQkFBaUIsQ0FBQzs0QkFDVixTQUFTOzRCQUNULFdBQVc7NEJBQ1gsVUFBVTs0QkFDVixVQUFVOzRCQUNWLE9BQU87MkJBQ1I7NEJBQ0MsU0FBUzs0QkFDVCxXQUFXOzRCQUNYLFVBQVU7NEJBQ1YsYUFBYSxDQUFFOzRCQUNmLE9BQU87O3dCQUdmLHVCQUF1QixDQUFDOzRCQUNoQixhQUFhOzRCQUNiLFFBQVE7NEJBQ1IsUUFBUTsyQkFDVDs0QkFDQyxhQUFhOzRCQUNiLFFBQVE7NEJBQ1IsUUFBUTs0QkFDUixTQUFTOzt3QkFHakIsc0JBQXNCLENBQUM7NEJBQ25CLFNBQVM7NEJBQ1QsV0FBVzs0QkFDWCxhQUFhOzRCQUNiLFVBQVU7NEJBQ1YsVUFBVTs0QkFDVixPQUFPOzt3QkFFWCw0QkFBNEIsQ0FBQzs0QkFDekIsYUFBYTs0QkFDYixVQUFVOzRCQUNWLFVBQVU7NEJBQ1YsT0FBTzs7Ozs7OztHQWFwQiIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL0lkZW50aXR5RGlmZmVyZW5jZVRlc3REYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpLlxyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29udGFpbnMgdGVzdCBkYXRhIHVzZWQgYnkgdGhlIGlkZW50aXR5IGRpZmZlcmVuY2UgdGVzdHMuICBEb24ndCBtb2RpZnkgdGhpcyBkYXRhXHJcbiAqIGRpcmVjdGx5IGZyb20gd2l0aGluIHlvdXIgdGVzdHMuICBJZiB5b3UgbmVlZCB0byBtb2RpZnkgZGF0YSwgdXNlIGFuZ3VsYXIuY29weSgpIHRvIGNyZWF0ZSB5b3VyIG93blxyXG4gKiBjb3B5IGJlZm9yZSBjaGFuZ2luZyBpdC5cclxuICovXHJcbmZhY3RvcnkoJ2lkZW50aXR5RGlmZmVyZW5jZVRlc3REYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIERJRkZFUkVOQ0U6IHtcclxuICAgICAgICAgICAgYXNzaWduZWRSb2xlRGlmZmVyZW5jZXM6IHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQ6ICdJSVEnLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlOiAnYXNzaWduZWRSb2xlcycsXHJcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogJ0h5cGUgR3V5JyxcclxuICAgICAgICAgICAgICAgIHJlbW92ZWRWYWx1ZXM6IFsgJ0h5cGUgZ3V5JyBdLFxyXG4gICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJ1bmRsZURpZmZlcmVuY2VzOiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0OiAnSUlRJyxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogJ2RldGVjdGVkUm9sZXMnLFxyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6ICdGcm9udCBNYW4nLFxyXG4gICAgICAgICAgICAgICAgYWRkZWRWYWx1ZXM6IFsgJ0Zyb250IG1hbicgXSxcclxuICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rRGlmZmVyZW5jZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogJ0FEJyxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6ICduYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogJ0JhbGxlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6ICdTaG90IENhbGxlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogJ0RCJyxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6ICdncm91cHMnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiAnRnJvbnQgbWFuJyxcclxuICAgICAgICAgICAgICAgICAgICBhZGRlZFZhbHVlczogWyAnRnJvbnQgbWFuJyBdLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25EaWZmZXJlbmNlczogW3tcclxuICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ0FEJyxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICdmaWxlU2hhcmUxJyxcclxuICAgICAgICAgICAgICAgICAgICByaWdodHM6ICd1cGRhdGUnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBRCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAnZmlsZVNoYXJlMicsXHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRzOiAnZGVsZXRlJyxcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZURpZmZlcmVuY2VzOiBbe1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDogJ0lJUScsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6ICdlbWFpbCcsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0VtYWlsIEFkZHJlc3MnLFxyXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6ICdiYWxsZXJAZXhhbXBsZS5jb20nLFxyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6ICdzaG90Y2FsbGVyQGV4YW1wbGUuY29tJyxcclxuICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZVxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGlmZmVyZW5jZXM6IFt7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWUgVmlvbGF0aW9uJyxcclxuICAgICAgICAgICAgICAgIG9sZFZhbHVlOiAndmlvbGF0aW9uMScsXHJcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogJ3Zpb2xhdGlvbjInLFxyXG4gICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
