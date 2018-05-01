System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('IdentityHistoryItem', function () {
                // Use the module.
                beforeEach(module(certificationModule));

                var IdentityHistoryItem = undefined,
                    certificationTestData = undefined;

                beforeEach(inject(function (_IdentityHistoryItem_, _certificationTestData_) {
                    IdentityHistoryItem = _IdentityHistoryItem_;
                    certificationTestData = _certificationTestData_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = certificationTestData.HISTORY_DATA[0],
                            testItem = new IdentityHistoryItem(data);

                        expect(testItem.status).toEqual(data.status);
                        expect(testItem.type).toBeUndefined();
                        expect(testItem.actor).toEqual(data.actor);
                        expect(testItem.entryDate).toEqual(data.entryDate);
                        expect(testItem.comments).toEqual(data.comments);
                    });

                    it('should initialize status with type if status is null', function () {
                        var data = certificationTestData.HISTORY_DATA[1],
                            testItem = new IdentityHistoryItem(data);

                        expect(testItem.status).toEqual('identity_history_type_comment');
                        expect(testItem.type).toEqual(data.type);
                        expect(testItem.actor).toEqual(data.actor);
                        expect(testItem.entryDate).toEqual(data.entryDate);
                        expect(testItem.comments).toEqual(data.comments);
                    });

                    it('should throw with no config data', function () {
                        expect(function () {
                            new IdentityHistoryItem();
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvSWRlbnRpdHlIaXN0b3J5SXRlbVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7SUFLN0g7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyx1QkFBdUIsWUFBVzs7Z0JBRXZDLFdBQVcsT0FBTzs7Z0JBRWxCLElBQUksc0JBQW1CO29CQUFFLHdCQUFxQjs7Z0JBRTlDLFdBQVcsT0FBTyxVQUFTLHVCQUF1Qix5QkFBeUI7b0JBQ3ZFLHNCQUFzQjtvQkFDdEIsd0JBQXdCOzs7Z0JBRzVCLFNBQVMsUUFBUSxZQUFXO29CQUN4QixHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxJQUFJLE9BQU8sc0JBQXNCLGFBQWE7NEJBQzFDLFdBQVcsSUFBSSxvQkFBb0I7O3dCQUV2QyxPQUFPLFNBQVMsUUFBUSxRQUFRLEtBQUs7d0JBQ3JDLE9BQU8sU0FBUyxNQUFNO3dCQUN0QixPQUFPLFNBQVMsT0FBTyxRQUFRLEtBQUs7d0JBQ3BDLE9BQU8sU0FBUyxXQUFXLFFBQVEsS0FBSzt3QkFDeEMsT0FBTyxTQUFTLFVBQVUsUUFBUSxLQUFLOzs7b0JBRzNDLEdBQUcsd0RBQXdELFlBQVc7d0JBQ2xFLElBQUksT0FBTyxzQkFBc0IsYUFBYTs0QkFDMUMsV0FBVyxJQUFJLG9CQUFvQjs7d0JBRXZDLE9BQU8sU0FBUyxRQUFRLFFBQVE7d0JBQ2hDLE9BQU8sU0FBUyxNQUFNLFFBQVEsS0FBSzt3QkFDbkMsT0FBTyxTQUFTLE9BQU8sUUFBUSxLQUFLO3dCQUNwQyxPQUFPLFNBQVMsV0FBVyxRQUFRLEtBQUs7d0JBQ3hDLE9BQU8sU0FBUyxVQUFVLFFBQVEsS0FBSzs7O29CQUczQyxHQUFHLG9DQUFvQyxZQUFXO3dCQUM5QyxPQUFPLFlBQVc7NEJBQ2QsSUFBSTsyQkFDTDs7Ozs7O0dBYVoiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9tb2RlbC9JZGVudGl0eUhpc3RvcnlJdGVtVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE2LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcbmltcG9ydCAnLi4vQ2VydGlmaWNhdGlvblRlc3REYXRhJztcblxuZGVzY3JpYmUoJ0lkZW50aXR5SGlzdG9yeUl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBVc2UgdGhlIG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XG5cbiAgICBsZXQgSWRlbnRpdHlIaXN0b3J5SXRlbSwgY2VydGlmaWNhdGlvblRlc3REYXRhO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0lkZW50aXR5SGlzdG9yeUl0ZW1fLCBfY2VydGlmaWNhdGlvblRlc3REYXRhXykge1xuICAgICAgICBJZGVudGl0eUhpc3RvcnlJdGVtID0gX0lkZW50aXR5SGlzdG9yeUl0ZW1fO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uVGVzdERhdGEgPSBfY2VydGlmaWNhdGlvblRlc3REYXRhXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnaW5pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2l0aCBwcm92aWRlZCBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGNlcnRpZmljYXRpb25UZXN0RGF0YS5ISVNUT1JZX0RBVEFbMF0sXG4gICAgICAgICAgICAgICAgdGVzdEl0ZW0gPSBuZXcgSWRlbnRpdHlIaXN0b3J5SXRlbShkYXRhKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRlc3RJdGVtLnN0YXR1cykudG9FcXVhbChkYXRhLnN0YXR1cyk7XG4gICAgICAgICAgICBleHBlY3QodGVzdEl0ZW0udHlwZSkudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RJdGVtLmFjdG9yKS50b0VxdWFsKGRhdGEuYWN0b3IpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RJdGVtLmVudHJ5RGF0ZSkudG9FcXVhbChkYXRhLmVudHJ5RGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdEl0ZW0uY29tbWVudHMpLnRvRXF1YWwoZGF0YS5jb21tZW50cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSBzdGF0dXMgd2l0aCB0eXBlIGlmIHN0YXR1cyBpcyBudWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGNlcnRpZmljYXRpb25UZXN0RGF0YS5ISVNUT1JZX0RBVEFbMV0sXG4gICAgICAgICAgICAgICAgdGVzdEl0ZW0gPSBuZXcgSWRlbnRpdHlIaXN0b3J5SXRlbShkYXRhKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRlc3RJdGVtLnN0YXR1cykudG9FcXVhbCgnaWRlbnRpdHlfaGlzdG9yeV90eXBlX2NvbW1lbnQnKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0SXRlbS50eXBlKS50b0VxdWFsKGRhdGEudHlwZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdEl0ZW0uYWN0b3IpLnRvRXF1YWwoZGF0YS5hY3Rvcik7XG4gICAgICAgICAgICBleHBlY3QodGVzdEl0ZW0uZW50cnlEYXRlKS50b0VxdWFsKGRhdGEuZW50cnlEYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0SXRlbS5jb21tZW50cykudG9FcXVhbChkYXRhLmNvbW1lbnRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIGNvbmZpZyBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbmV3IElkZW50aXR5SGlzdG9yeUl0ZW0oKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
