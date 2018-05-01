System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('RoleSnapshot', function () {

                beforeEach(module(certificationModule));

                var RoleSnapshot, certificationTestData;

                beforeEach(inject(function (_RoleSnapshot_, _certificationTestData_) {
                    RoleSnapshot = _RoleSnapshot_;
                    certificationTestData = _certificationTestData_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = certificationTestData.ROLE_SNAPSHOT,
                            test = new RoleSnapshot(data);

                        expect(test.id).toEqual(data.id);
                        expect(test.typDisplayName).toEqual(data.typDisplayName);
                        expect(test.displayName).toEqual(data.displayName);
                        expect(test.description).toEqual(data.description);
                        expect(test.ownerDisplayName).toEqual(data.ownerDisplayName);
                        expect(test.scopeDisplayName).toEqual(data.scopeDisplayName);
                        expect(test.attributes).toEqual(data.attributes);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvUm9sZVNuYXBzaG90VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyw2QkFBNkIsVUFBVSxTQUFTOzs7SUFHN0g7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyxnQkFBZ0IsWUFBVzs7Z0JBRWhDLFdBQVcsT0FBTzs7Z0JBRWxCLElBQUksY0FBYzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGdCQUFnQix5QkFBeUI7b0JBQ2hFLGVBQWU7b0JBQ2Ysd0JBQXdCOzs7Z0JBRzVCLFNBQVMsUUFBUSxZQUFXO29CQUN4QixHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxJQUFJLE9BQU8sc0JBQXNCOzRCQUM3QixPQUFPLElBQUksYUFBYTs7d0JBRTVCLE9BQU8sS0FBSyxJQUFJLFFBQVEsS0FBSzt3QkFDN0IsT0FBTyxLQUFLLGdCQUFnQixRQUFRLEtBQUs7d0JBQ3pDLE9BQU8sS0FBSyxhQUFhLFFBQVEsS0FBSzt3QkFDdEMsT0FBTyxLQUFLLGFBQWEsUUFBUSxLQUFLO3dCQUN0QyxPQUFPLEtBQUssa0JBQWtCLFFBQVEsS0FBSzt3QkFDM0MsT0FBTyxLQUFLLGtCQUFrQixRQUFRLEtBQUs7d0JBQzNDLE9BQU8sS0FBSyxZQUFZLFFBQVEsS0FBSzs7Ozs7O0dBWTlDIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vbW9kZWwvUm9sZVNuYXBzaG90VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICcuLi9DZXJ0aWZpY2F0aW9uVGVzdERhdGEnO1xuXG5kZXNjcmliZSgnUm9sZVNuYXBzaG90JywgZnVuY3Rpb24oKSB7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XG5cbiAgICB2YXIgUm9sZVNuYXBzaG90LCBjZXJ0aWZpY2F0aW9uVGVzdERhdGE7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfUm9sZVNuYXBzaG90XywgX2NlcnRpZmljYXRpb25UZXN0RGF0YV8pIHtcbiAgICAgICAgUm9sZVNuYXBzaG90ID0gX1JvbGVTbmFwc2hvdF87XG4gICAgICAgIGNlcnRpZmljYXRpb25UZXN0RGF0YSA9IF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdpbml0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIHByb3ZpZGVkIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gY2VydGlmaWNhdGlvblRlc3REYXRhLlJPTEVfU05BUFNIT1QsXG4gICAgICAgICAgICAgICAgdGVzdCA9IG5ldyBSb2xlU25hcHNob3QoZGF0YSk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmlkKS50b0VxdWFsKGRhdGEuaWQpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QudHlwRGlzcGxheU5hbWUpLnRvRXF1YWwoZGF0YS50eXBEaXNwbGF5TmFtZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5kaXNwbGF5TmFtZSkudG9FcXVhbChkYXRhLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmRlc2NyaXB0aW9uKS50b0VxdWFsKGRhdGEuZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3Qub3duZXJEaXNwbGF5TmFtZSkudG9FcXVhbChkYXRhLm93bmVyRGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3Quc2NvcGVEaXNwbGF5TmFtZSkudG9FcXVhbChkYXRhLnNjb3BlRGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuYXR0cmlidXRlcykudG9FcXVhbChkYXRhLmF0dHJpYnV0ZXMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
