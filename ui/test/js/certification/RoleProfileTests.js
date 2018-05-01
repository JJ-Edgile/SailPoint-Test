System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('RoleProfile', function () {

                var RoleProfile = undefined,
                    data = undefined;

                beforeEach(module(certificationModule));
                beforeEach(inject(function (_RoleProfile_) {
                    RoleProfile = _RoleProfile_;
                    data = {
                        name: 'somename',
                        constraints: ['con-1', 'con-2'],
                        permissions: ['perm-1']
                    };
                }));

                describe('constructor', function () {
                    it('should throw with no data', function () {
                        expect(function () {
                            return new RoleProfile(null);
                        }).toThrow();
                    });

                    it('sets properties for the RoleProfile', function () {
                        var roleProfile = new RoleProfile(data);
                        expect(roleProfile.name).toEqual(data.name);
                        expect(roleProfile.permissions).toEqual(data.permissions);
                        expect(roleProfile.constraints).toEqual(data.constraints);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vUm9sZVByb2ZpbGVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7O0lBR2pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZOztZQUw3QixTQUFTLGVBQWUsWUFBTTs7Z0JBRTFCLElBQUksY0FBVztvQkFDWCxPQUFJOztnQkFFUixXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFDLGVBQWtCO29CQUNqQyxjQUFjO29CQUNkLE9BQU87d0JBQ0gsTUFBTTt3QkFDTixhQUFhLENBQUMsU0FBUzt3QkFDdkIsYUFBYSxDQUFDOzs7O2dCQUl0QixTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyw2QkFBNkIsWUFBTTt3QkFDbEMsT0FBTyxZQUFBOzRCQVFTLE9BUkgsSUFBSSxZQUFZOzJCQUFPOzs7b0JBR3hDLEdBQUcsdUNBQXVDLFlBQU07d0JBQzVDLElBQUksY0FBYyxJQUFJLFlBQVk7d0JBQ2xDLE9BQU8sWUFBWSxNQUFNLFFBQVEsS0FBSzt3QkFDdEMsT0FBTyxZQUFZLGFBQWEsUUFBUSxLQUFLO3dCQUM3QyxPQUFPLFlBQVksYUFBYSxRQUFRLEtBQUs7Ozs7OztHQWV0RCIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL1JvbGVQcm9maWxlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnUm9sZVByb2ZpbGUnLCAoKSA9PiB7XG5cbiAgICBsZXQgUm9sZVByb2ZpbGUsXG4gICAgICAgIGRhdGE7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9Sb2xlUHJvZmlsZV8pID0+IHtcbiAgICAgICAgUm9sZVByb2ZpbGUgPSBfUm9sZVByb2ZpbGVfO1xuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgbmFtZTogJ3NvbWVuYW1lJyxcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzOiBbJ2Nvbi0xJywgJ2Nvbi0yJ10sXG4gICAgICAgICAgICBwZXJtaXNzaW9uczogWydwZXJtLTEnXVxuICAgICAgICB9O1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIGRhdGEnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbmV3IFJvbGVQcm9maWxlKG51bGwpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzZXRzIHByb3BlcnRpZXMgZm9yIHRoZSBSb2xlUHJvZmlsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByb2xlUHJvZmlsZSA9IG5ldyBSb2xlUHJvZmlsZShkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdChyb2xlUHJvZmlsZS5uYW1lKS50b0VxdWFsKGRhdGEubmFtZSk7XG4gICAgICAgICAgICBleHBlY3Qocm9sZVByb2ZpbGUucGVybWlzc2lvbnMpLnRvRXF1YWwoZGF0YS5wZXJtaXNzaW9ucyk7XG4gICAgICAgICAgICBleHBlY3Qocm9sZVByb2ZpbGUuY29uc3RyYWludHMpLnRvRXF1YWwoZGF0YS5jb25zdHJhaW50cyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
