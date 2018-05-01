System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationRevocation', function () {
                // Use the module.
                beforeEach(module(certificationModule));

                var CertificationRevocation, certificationTestData;

                beforeEach(inject(function (_CertificationRevocation_, _certificationTestData_) {
                    CertificationRevocation = _CertificationRevocation_;
                    certificationTestData = _certificationTestData_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = certificationTestData.LIST_RESULT_REVOCATION_ITEMS.objects[0],
                            test = new CertificationRevocation(data);
                        expect(test.identityName).toEqual(data.identityName);
                        expect(test.targetDisplayName).toEqual(data.targetDisplayName);
                        expect(test.details).toEqual(data.details);
                        expect(test.requestType).toEqual(data.requestType);
                        expect(test.requester).toEqual(data.requester);
                        expect(test.owner).toEqual(data.owner);
                        expect(test.expiration).toEqual(data.expiration);
                        expect(test.status).toEqual(data.status);
                    });

                    it('should throw with no config data', function () {
                        expect(function () {
                            new CertificationRevocation();
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvblJldm9jYXRpb25UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLDZCQUE2QixVQUFVLFNBQVM7OztJQUc3SDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOztZQUo3QixTQUFTLDJCQUEyQixZQUFXOztnQkFFM0MsV0FBVyxPQUFPOztnQkFFbEIsSUFBSSx5QkFBeUI7O2dCQUU3QixXQUFXLE9BQU8sVUFBUywyQkFBMkIseUJBQXlCO29CQUMzRSwwQkFBMEI7b0JBQzFCLHdCQUF3Qjs7O2dCQUc1QixTQUFTLFFBQVEsWUFBVztvQkFDeEIsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsSUFBSSxPQUFPLHNCQUFzQiw2QkFBNkIsUUFBUTs0QkFDbEUsT0FBTyxJQUFJLHdCQUF3Qjt3QkFDdkMsT0FBTyxLQUFLLGNBQWMsUUFBUSxLQUFLO3dCQUN2QyxPQUFPLEtBQUssbUJBQW1CLFFBQVEsS0FBSzt3QkFDNUMsT0FBTyxLQUFLLFNBQVMsUUFBUSxLQUFLO3dCQUNsQyxPQUFPLEtBQUssYUFBYSxRQUFRLEtBQUs7d0JBQ3RDLE9BQU8sS0FBSyxXQUFXLFFBQVEsS0FBSzt3QkFDcEMsT0FBTyxLQUFLLE9BQU8sUUFBUSxLQUFLO3dCQUNoQyxPQUFPLEtBQUssWUFBWSxRQUFRLEtBQUs7d0JBQ3JDLE9BQU8sS0FBSyxRQUFRLFFBQVEsS0FBSzs7O29CQUdyQyxHQUFHLG9DQUFvQyxZQUFXO3dCQUM5QyxPQUFPLFlBQVc7NEJBQ2QsSUFBSTsyQkFDTDs7Ozs7O0dBWVoiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9tb2RlbC9DZXJ0aWZpY2F0aW9uUmV2b2NhdGlvblRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcbmltcG9ydCAnLi4vQ2VydGlmaWNhdGlvblRlc3REYXRhJztcblxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25SZXZvY2F0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gVXNlIHRoZSBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgdmFyIENlcnRpZmljYXRpb25SZXZvY2F0aW9uLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGE7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfQ2VydGlmaWNhdGlvblJldm9jYXRpb25fLCBfY2VydGlmaWNhdGlvblRlc3REYXRhXykge1xuICAgICAgICBDZXJ0aWZpY2F0aW9uUmV2b2NhdGlvbiA9IF9DZXJ0aWZpY2F0aW9uUmV2b2NhdGlvbl87XG4gICAgICAgIGNlcnRpZmljYXRpb25UZXN0RGF0YSA9IF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdpbml0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIHByb3ZpZGVkIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gY2VydGlmaWNhdGlvblRlc3REYXRhLkxJU1RfUkVTVUxUX1JFVk9DQVRJT05fSVRFTVMub2JqZWN0c1swXSxcbiAgICAgICAgICAgICAgICB0ZXN0ID0gbmV3IENlcnRpZmljYXRpb25SZXZvY2F0aW9uKGRhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuaWRlbnRpdHlOYW1lKS50b0VxdWFsKGRhdGEuaWRlbnRpdHlOYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnRhcmdldERpc3BsYXlOYW1lKS50b0VxdWFsKGRhdGEudGFyZ2V0RGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuZGV0YWlscykudG9FcXVhbChkYXRhLmRldGFpbHMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QucmVxdWVzdFR5cGUpLnRvRXF1YWwoZGF0YS5yZXF1ZXN0VHlwZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5yZXF1ZXN0ZXIpLnRvRXF1YWwoZGF0YS5yZXF1ZXN0ZXIpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3Qub3duZXIpLnRvRXF1YWwoZGF0YS5vd25lcik7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5leHBpcmF0aW9uKS50b0VxdWFsKGRhdGEuZXhwaXJhdGlvbik7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5zdGF0dXMpLnRvRXF1YWwoZGF0YS5zdGF0dXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gY29uZmlnIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuZXcgQ2VydGlmaWNhdGlvblJldm9jYXRpb24oKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
