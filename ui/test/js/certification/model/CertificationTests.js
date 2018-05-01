System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('Certification', function () {
                // Use the module.
                beforeEach(module(certificationModule));

                var Certification, CertificationSignoff, certificationTestData;

                beforeEach(inject(function (_Certification_, _CertificationSignoff_, _certificationTestData_) {
                    Certification = _Certification_;
                    certificationTestData = _certificationTestData_;
                    CertificationSignoff = _CertificationSignoff_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = certificationTestData.CERTIFICATION_1,
                            test = new Certification(data);
                        expect(test.type).toEqual(data.type);
                        expect(test.id).toEqual(data.id);
                        expect(test.availableBulkDecisions).toEqual(data.availableBulkDecisions);
                        expect(test.certifiers).toEqual(data.certifiers);
                        expect(test.editable).toEqual(data.editable);
                        expect(test.expiration.getTime()).toEqual(data.expiration);
                        expect(test.name).toEqual(data.name);
                        expect(test.nextPhaseTransition.getTime()).toEqual(data.nextPhaseTransition);
                        expect(test.phase).toEqual(data.phase);
                        expect(test.workItemId).toEqual(data.workItemId);
                        expect(test.itemStatusCount.counts).toEqual(data.itemStatusCount.counts);
                        expect(test.remediationsStarted).toEqual(data.remediationsStarted);
                        expect(test.remediationsCompleted).toEqual(data.remediationsCompleted);
                        expect(test.completedEntities).toEqual(data.completedEntities);
                        expect(test.totalEntities).toEqual(data.totalEntities);
                        expect(test.certificationCount).toEqual(data.certificationCount);
                        expect(test.tags).toEqual(data.tags);
                        expect(test.entityType).toEqual(data.entityType);
                    });

                    it('should throw with no config data', function () {
                        expect(function () {
                            new Certification();
                        }).toThrow();
                    });

                    it('should throw with missing id', function () {
                        var data = certificationTestData.CERTIFICATION_1;
                        delete data.id;
                        expect(function () {
                            new Certification(data);
                        }).toThrow();
                    });
                });

                it('incomplete entities is calculated correctly', function () {
                    var cert = new Certification(certificationTestData.CERTIFICATION_1);
                    expect(cert.incompleteEntities).toEqual(5);
                });

                describe('signoffs', function () {
                    it('should initialize with CertificationSignoff objects', function () {
                        var data = certificationTestData.CERTIFICATION_SIGNED,
                            test = new Certification(data);

                        expect(test.signoffs).toBeDefined();
                        expect(test.signoffs.length).toEqual(1);
                        expect(test.signoffs[0]).toEqual(new CertificationSignoff(data.signoffs[0]));
                    });

                    it('should sort descending by date', function () {
                        var laterDate = new Date(2016, 3, 1),
                            earlierDate = new Date(2016, 2, 1),
                            data = {
                            id: 'whatever',
                            signoffs: [{
                                date: earlierDate,
                                signer: {}
                            }, {
                                date: laterDate,
                                signer: {}
                            }]
                        },
                            test = new Certification(data);
                        expect(test.signoffs.length).toEqual(2);
                        expect(test.signoffs[0].date).toEqual(laterDate);
                        expect(test.signoffs[1].date).toEqual(earlierDate);
                    });

                    describe('isSigned()', function () {
                        it('should return true if there are any signoffs', function () {
                            var data = certificationTestData.CERTIFICATION_SIGNED,
                                test = new Certification(data);

                            expect(test.isSigned()).toEqual(true);
                        });

                        it('should return false if there are no signoffs', function () {
                            var data = certificationTestData.CERTIFICATION_1,
                                test = new Certification(data);

                            expect(test.isSigned()).toEqual(false);
                        });
                    });
                });

                describe('isObjectType', function () {

                    var typeEnum = undefined;
                    beforeEach(function () {
                        typeEnum = Certification.Type;
                    });

                    it('should return true for BusinessRoleComposition type', function () {
                        expect(Certification.isObjectType(typeEnum.BusinessRoleComposition)).toBeTruthy();
                    });

                    it('should return true for DataOwner type', function () {
                        expect(Certification.isObjectType(typeEnum.DataOwner)).toBeTruthy();
                    });

                    it('should return true for AccountGroupMembership type', function () {
                        expect(Certification.isObjectType(typeEnum.AccountGroupMembership)).toBeTruthy();
                    });

                    it('should return true for AccountGroupPermissions type', function () {
                        expect(Certification.isObjectType(typeEnum.AccountGroupPermissions)).toBeTruthy();
                    });

                    it('should return false for other certification types', function () {
                        expect(Certification.isObjectType(typeEnum.Manager)).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvblRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsNkJBQTZCLFVBQVUsU0FBUzs7O0lBRzdIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsaUJBQWlCLFlBQVc7O2dCQUVqQyxXQUFXLE9BQU87O2dCQUVsQixJQUFJLGVBQWUsc0JBQXNCOztnQkFFekMsV0FBVyxPQUFPLFVBQVMsaUJBQWlCLHdCQUF3Qix5QkFBeUI7b0JBQ3pGLGdCQUFnQjtvQkFDaEIsd0JBQXdCO29CQUN4Qix1QkFBdUI7OztnQkFHM0IsU0FBUyxRQUFRLFlBQVc7b0JBQ3hCLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELElBQUksT0FBTyxzQkFBc0I7NEJBQzdCLE9BQU8sSUFBSSxjQUFjO3dCQUM3QixPQUFPLEtBQUssTUFBTSxRQUFRLEtBQUs7d0JBQy9CLE9BQU8sS0FBSyxJQUFJLFFBQVEsS0FBSzt3QkFDN0IsT0FBTyxLQUFLLHdCQUF3QixRQUFRLEtBQUs7d0JBQ2pELE9BQU8sS0FBSyxZQUFZLFFBQVEsS0FBSzt3QkFDckMsT0FBTyxLQUFLLFVBQVUsUUFBUSxLQUFLO3dCQUNuQyxPQUFPLEtBQUssV0FBVyxXQUFXLFFBQVEsS0FBSzt3QkFDL0MsT0FBTyxLQUFLLE1BQU0sUUFBUSxLQUFLO3dCQUMvQixPQUFPLEtBQUssb0JBQW9CLFdBQVcsUUFBUSxLQUFLO3dCQUN4RCxPQUFPLEtBQUssT0FBTyxRQUFRLEtBQUs7d0JBQ2hDLE9BQU8sS0FBSyxZQUFZLFFBQVEsS0FBSzt3QkFDckMsT0FBTyxLQUFLLGdCQUFnQixRQUFRLFFBQVEsS0FBSyxnQkFBZ0I7d0JBQ2pFLE9BQU8sS0FBSyxxQkFBcUIsUUFBUSxLQUFLO3dCQUM5QyxPQUFPLEtBQUssdUJBQXVCLFFBQVEsS0FBSzt3QkFDaEQsT0FBTyxLQUFLLG1CQUFtQixRQUFRLEtBQUs7d0JBQzVDLE9BQU8sS0FBSyxlQUFlLFFBQVEsS0FBSzt3QkFDeEMsT0FBTyxLQUFLLG9CQUFvQixRQUFRLEtBQUs7d0JBQzdDLE9BQU8sS0FBSyxNQUFNLFFBQVEsS0FBSzt3QkFDL0IsT0FBTyxLQUFLLFlBQVksUUFBUSxLQUFLOzs7b0JBR3pDLEdBQUcsb0NBQW9DLFlBQVc7d0JBQzlDLE9BQU8sWUFBVzs0QkFDZCxJQUFJOzJCQUNMOzs7b0JBR1AsR0FBRyxnQ0FBZ0MsWUFBVzt3QkFDMUMsSUFBSSxPQUFPLHNCQUFzQjt3QkFDakMsT0FBTyxLQUFLO3dCQUNaLE9BQU8sWUFBVzs0QkFDZCxJQUFJLGNBQWM7MkJBQ25COzs7O2dCQUlYLEdBQUcsK0NBQStDLFlBQU07b0JBQ3BELElBQUksT0FBTyxJQUFJLGNBQWMsc0JBQXNCO29CQUNuRCxPQUFPLEtBQUssb0JBQW9CLFFBQVE7OztnQkFHNUMsU0FBUyxZQUFZLFlBQU07b0JBQ3ZCLEdBQUksdURBQXVELFlBQU07d0JBQzdELElBQUksT0FBTyxzQkFBc0I7NEJBQzdCLE9BQU8sSUFBSSxjQUFjOzt3QkFFN0IsT0FBTyxLQUFLLFVBQVU7d0JBQ3RCLE9BQU8sS0FBSyxTQUFTLFFBQVEsUUFBUTt3QkFDckMsT0FBTyxLQUFLLFNBQVMsSUFBSSxRQUFRLElBQUkscUJBQXFCLEtBQUssU0FBUzs7O29CQUc1RSxHQUFHLGtDQUFrQyxZQUFNO3dCQUN2QyxJQUFJLFlBQVksSUFBSSxLQUFLLE1BQU0sR0FBRzs0QkFDOUIsY0FBYyxJQUFJLEtBQUssTUFBTSxHQUFHOzRCQUNoQyxPQUFPOzRCQUNILElBQUk7NEJBQ0osVUFBVSxDQUFDO2dDQUNQLE1BQU07Z0NBQ04sUUFBUTsrQkFDVjtnQ0FDRSxNQUFNO2dDQUNOLFFBQVE7Ozs0QkFHaEIsT0FBTyxJQUFJLGNBQWM7d0JBQzdCLE9BQU8sS0FBSyxTQUFTLFFBQVEsUUFBUTt3QkFDckMsT0FBTyxLQUFLLFNBQVMsR0FBRyxNQUFNLFFBQVE7d0JBQ3RDLE9BQU8sS0FBSyxTQUFTLEdBQUcsTUFBTSxRQUFROzs7b0JBRzFDLFNBQVMsY0FBYyxZQUFNO3dCQUN6QixHQUFHLGdEQUFnRCxZQUFNOzRCQUNyRCxJQUFJLE9BQU8sc0JBQXNCO2dDQUM3QixPQUFPLElBQUksY0FBYzs7NEJBRTdCLE9BQU8sS0FBSyxZQUFZLFFBQVE7Ozt3QkFHcEMsR0FBRyxnREFBZ0QsWUFBTTs0QkFDckQsSUFBSSxPQUFPLHNCQUFzQjtnQ0FDN0IsT0FBTyxJQUFJLGNBQWM7OzRCQUU3QixPQUFPLEtBQUssWUFBWSxRQUFROzs7OztnQkFLNUMsU0FBUyxnQkFBZ0IsWUFBTTs7b0JBRTNCLElBQUksV0FBUTtvQkFDWixXQUFXLFlBQU07d0JBQ2QsV0FBVyxjQUFjOzs7b0JBRzVCLEdBQUcsdURBQXVELFlBQU07d0JBQzVELE9BQU8sY0FBYyxhQUFhLFNBQVMsMEJBQTBCOzs7b0JBR3pFLEdBQUcseUNBQXlDLFlBQU07d0JBQzlDLE9BQU8sY0FBYyxhQUFhLFNBQVMsWUFBWTs7O29CQUczRCxHQUFHLHNEQUFzRCxZQUFNO3dCQUMzRCxPQUFPLGNBQWMsYUFBYSxTQUFTLHlCQUF5Qjs7O29CQUd4RSxHQUFHLHVEQUF1RCxZQUFNO3dCQUM1RCxPQUFPLGNBQWMsYUFBYSxTQUFTLDBCQUEwQjs7O29CQUd6RSxHQUFHLHFEQUFxRCxZQUFNO3dCQUMxRCxPQUFPLGNBQWMsYUFBYSxTQUFTLFVBQVU7Ozs7OztHQVk5RCIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL21vZGVsL0NlcnRpZmljYXRpb25UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJy4uL0NlcnRpZmljYXRpb25UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gVXNlIHRoZSBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgdmFyIENlcnRpZmljYXRpb24sIENlcnRpZmljYXRpb25TaWdub2ZmLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGE7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfQ2VydGlmaWNhdGlvbl8sIF9DZXJ0aWZpY2F0aW9uU2lnbm9mZl8sIF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfKSB7XG4gICAgICAgIENlcnRpZmljYXRpb24gPSBfQ2VydGlmaWNhdGlvbl87XG4gICAgICAgIGNlcnRpZmljYXRpb25UZXN0RGF0YSA9IF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uU2lnbm9mZiA9IF9DZXJ0aWZpY2F0aW9uU2lnbm9mZl87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2luaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggcHJvdmlkZWQgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVElGSUNBVElPTl8xLFxuICAgICAgICAgICAgICAgIHRlc3QgPSBuZXcgQ2VydGlmaWNhdGlvbihkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnR5cGUpLnRvRXF1YWwoZGF0YS50eXBlKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmlkKS50b0VxdWFsKGRhdGEuaWQpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuYXZhaWxhYmxlQnVsa0RlY2lzaW9ucykudG9FcXVhbChkYXRhLmF2YWlsYWJsZUJ1bGtEZWNpc2lvbnMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuY2VydGlmaWVycykudG9FcXVhbChkYXRhLmNlcnRpZmllcnMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuZWRpdGFibGUpLnRvRXF1YWwoZGF0YS5lZGl0YWJsZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5leHBpcmF0aW9uLmdldFRpbWUoKSkudG9FcXVhbChkYXRhLmV4cGlyYXRpb24pO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QubmFtZSkudG9FcXVhbChkYXRhLm5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QubmV4dFBoYXNlVHJhbnNpdGlvbi5nZXRUaW1lKCkpLnRvRXF1YWwoZGF0YS5uZXh0UGhhc2VUcmFuc2l0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnBoYXNlKS50b0VxdWFsKGRhdGEucGhhc2UpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3Qud29ya0l0ZW1JZCkudG9FcXVhbChkYXRhLndvcmtJdGVtSWQpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuaXRlbVN0YXR1c0NvdW50LmNvdW50cykudG9FcXVhbChkYXRhLml0ZW1TdGF0dXNDb3VudC5jb3VudHMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QucmVtZWRpYXRpb25zU3RhcnRlZCkudG9FcXVhbChkYXRhLnJlbWVkaWF0aW9uc1N0YXJ0ZWQpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QucmVtZWRpYXRpb25zQ29tcGxldGVkKS50b0VxdWFsKGRhdGEucmVtZWRpYXRpb25zQ29tcGxldGVkKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmNvbXBsZXRlZEVudGl0aWVzKS50b0VxdWFsKGRhdGEuY29tcGxldGVkRW50aXRpZXMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QudG90YWxFbnRpdGllcykudG9FcXVhbChkYXRhLnRvdGFsRW50aXRpZXMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuY2VydGlmaWNhdGlvbkNvdW50KS50b0VxdWFsKGRhdGEuY2VydGlmaWNhdGlvbkNvdW50KTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnRhZ3MpLnRvRXF1YWwoZGF0YS50YWdzKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmVudGl0eVR5cGUpLnRvRXF1YWwoZGF0YS5lbnRpdHlUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIGNvbmZpZyBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb24oKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG1pc3NpbmcgaWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMTtcbiAgICAgICAgICAgIGRlbGV0ZSBkYXRhLmlkO1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uKGRhdGEpO1xuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdpbmNvbXBsZXRlIGVudGl0aWVzIGlzIGNhbGN1bGF0ZWQgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBsZXQgY2VydCA9IG5ldyBDZXJ0aWZpY2F0aW9uKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OXzEpO1xuICAgICAgICBleHBlY3QoY2VydC5pbmNvbXBsZXRlRW50aXRpZXMpLnRvRXF1YWwoNSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2lnbm9mZnMnLCAoKSA9PiB7XG4gICAgICAgIGl0ICgnc2hvdWxkIGluaXRpYWxpemUgd2l0aCBDZXJ0aWZpY2F0aW9uU2lnbm9mZiBvYmplY3RzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVElGSUNBVElPTl9TSUdORUQsXG4gICAgICAgICAgICAgICAgdGVzdCA9IG5ldyBDZXJ0aWZpY2F0aW9uKGRhdGEpO1xuXG4gICAgICAgICAgICBleHBlY3QodGVzdC5zaWdub2ZmcykudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnNpZ25vZmZzLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnNpZ25vZmZzWzBdKS50b0VxdWFsKG5ldyBDZXJ0aWZpY2F0aW9uU2lnbm9mZihkYXRhLnNpZ25vZmZzWzBdKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc29ydCBkZXNjZW5kaW5nIGJ5IGRhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGF0ZXJEYXRlID0gbmV3IERhdGUoMjAxNiwgMywgMSksXG4gICAgICAgICAgICAgICAgZWFybGllckRhdGUgPSBuZXcgRGF0ZSgyMDE2LCAyLCAxKSxcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3doYXRldmVyJyxcbiAgICAgICAgICAgICAgICAgICAgc2lnbm9mZnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBlYXJsaWVyRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25lcjoge31cbiAgICAgICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBsYXRlckRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduZXI6IHt9XG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZXN0ID0gbmV3IENlcnRpZmljYXRpb24oZGF0YSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5zaWdub2Zmcy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5zaWdub2Zmc1swXS5kYXRlKS50b0VxdWFsKGxhdGVyRGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5zaWdub2Zmc1sxXS5kYXRlKS50b0VxdWFsKGVhcmxpZXJEYXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2lzU2lnbmVkKCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZXJlIGFyZSBhbnkgc2lnbm9mZnMnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVElGSUNBVElPTl9TSUdORUQsXG4gICAgICAgICAgICAgICAgICAgIHRlc3QgPSBuZXcgQ2VydGlmaWNhdGlvbihkYXRhKTtcblxuICAgICAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmlzU2lnbmVkKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlcmUgYXJlIG5vIHNpZ25vZmZzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSxcbiAgICAgICAgICAgICAgICAgICAgdGVzdCA9IG5ldyBDZXJ0aWZpY2F0aW9uKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KHRlc3QuaXNTaWduZWQoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNPYmplY3RUeXBlJywgKCkgPT4ge1xuXG4gICAgICAgIGxldCB0eXBlRW51bTtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgIHR5cGVFbnVtID0gQ2VydGlmaWNhdGlvbi5UeXBlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciBCdXNpbmVzc1JvbGVDb21wb3NpdGlvbiB0eXBlJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KENlcnRpZmljYXRpb24uaXNPYmplY3RUeXBlKHR5cGVFbnVtLkJ1c2luZXNzUm9sZUNvbXBvc2l0aW9uKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciBEYXRhT3duZXIgdHlwZScsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChDZXJ0aWZpY2F0aW9uLmlzT2JqZWN0VHlwZSh0eXBlRW51bS5EYXRhT3duZXIpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIEFjY291bnRHcm91cE1lbWJlcnNoaXAgdHlwZScsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChDZXJ0aWZpY2F0aW9uLmlzT2JqZWN0VHlwZSh0eXBlRW51bS5BY2NvdW50R3JvdXBNZW1iZXJzaGlwKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciBBY2NvdW50R3JvdXBQZXJtaXNzaW9ucyB0eXBlJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KENlcnRpZmljYXRpb24uaXNPYmplY3RUeXBlKHR5cGVFbnVtLkFjY291bnRHcm91cFBlcm1pc3Npb25zKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3Igb3RoZXIgY2VydGlmaWNhdGlvbiB0eXBlcycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChDZXJ0aWZpY2F0aW9uLmlzT2JqZWN0VHlwZSh0eXBlRW51bS5NYW5hZ2VyKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
