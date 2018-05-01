System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationDecisionStatus', function () {

                beforeEach(module(certificationModule));

                var CertificationDecisionStatus, certificationTestData;

                beforeEach(inject(function (_CertificationDecisionStatus_, _certificationTestData_) {
                    CertificationDecisionStatus = _CertificationDecisionStatus_;
                    certificationTestData = _certificationTestData_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = certificationTestData.CERT_ITEMS[0].decisionStatus,
                            test = new CertificationDecisionStatus(data);

                        expect(test.decisions).toEqual(data.decisions);
                        expect(test.currentState).toEqual(data.currentState);
                        expect(test.dependentDecision).toEqual(data.dependantDecisions);
                        expect(test.sourceItemId).toEqual(data.sourceItemId);
                        expect(test.parentItemDisplayNames).toEqual(data.parentItemDisplayNames);
                        expect(test.delegationOwner.displayName).toEqual(data.delegationOwner.displayName);
                        expect(test.delegationComments).toEqual(data.delegationComments);
                        expect(test.delegationDescription).toEqual(data.delegationDescription);
                    });

                    it('should initialize empty array of allowed statuses if not defined', function () {
                        var test = new CertificationDecisionStatus({});
                        expect(test.decisions).toEqual([]);
                    });

                    it('should throw with no config data', function () {
                        expect(function () {
                            new CertificationDecisionStatus();
                        }).toThrow();
                    });
                });

                describe('isCurrentStatus', function () {
                    it('returns false if no currentState is set', function () {
                        var data = angular.copy(certificationTestData.CERT_ITEMS[0].decisionStatus),
                            test = new CertificationDecisionStatus(data);
                        delete test.currentState;
                        expect(test.isCurrentStatus('Approved')).toEqual(false);
                    });

                    it('returns false if currentSTate does not match', function () {
                        var data = angular.copy(certificationTestData.CERT_ITEMS[0].decisionStatus),
                            test = new CertificationDecisionStatus(data);
                        expect(test.isCurrentStatus('Revoked')).toEqual(false);
                    });

                    it('returns true if currentState matches', function () {
                        var data = angular.copy(certificationTestData.CERT_ITEMS[0].decisionStatus),
                            test = new CertificationDecisionStatus(data);
                        expect(test.isCurrentStatus('Approved')).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RhdHVzVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyw2QkFBNkIsVUFBVSxTQUFTOzs7SUFHN0g7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUywrQkFBK0IsWUFBVzs7Z0JBRS9DLFdBQVcsT0FBTzs7Z0JBRWxCLElBQUksNkJBQTZCOztnQkFFakMsV0FBVyxPQUFPLFVBQVMsK0JBQStCLHlCQUF5QjtvQkFDL0UsOEJBQThCO29CQUM5Qix3QkFBd0I7OztnQkFHNUIsU0FBUyxRQUFRLFlBQVc7b0JBQ3hCLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELElBQUksT0FBTyxzQkFBc0IsV0FBVyxHQUFHOzRCQUMzQyxPQUFPLElBQUksNEJBQTRCOzt3QkFFM0MsT0FBTyxLQUFLLFdBQVcsUUFBUSxLQUFLO3dCQUNwQyxPQUFPLEtBQUssY0FBYyxRQUFRLEtBQUs7d0JBQ3ZDLE9BQU8sS0FBSyxtQkFBbUIsUUFBUSxLQUFLO3dCQUM1QyxPQUFPLEtBQUssY0FBYyxRQUFRLEtBQUs7d0JBQ3ZDLE9BQU8sS0FBSyx3QkFBd0IsUUFBUSxLQUFLO3dCQUNqRCxPQUFPLEtBQUssZ0JBQWdCLGFBQWEsUUFBUSxLQUFLLGdCQUFnQjt3QkFDdEUsT0FBTyxLQUFLLG9CQUFvQixRQUFRLEtBQUs7d0JBQzdDLE9BQU8sS0FBSyx1QkFBdUIsUUFBUSxLQUFLOzs7b0JBSXBELEdBQUcsb0VBQW9FLFlBQVc7d0JBQzlFLElBQUksT0FBTyxJQUFJLDRCQUE0Qjt3QkFDM0MsT0FBTyxLQUFLLFdBQVcsUUFBUTs7O29CQUduQyxHQUFHLG9DQUFvQyxZQUFXO3dCQUM5QyxPQUFPLFlBQVc7NEJBQ2QsSUFBSTsyQkFDTDs7OztnQkFJWCxTQUFTLG1CQUFtQixZQUFNO29CQUM5QixHQUFHLDJDQUEyQyxZQUFNO3dCQUNoRCxJQUFJLE9BQU8sUUFBUSxLQUFLLHNCQUFzQixXQUFXLEdBQUc7NEJBQ3hELE9BQU8sSUFBSSw0QkFBNEI7d0JBQzNDLE9BQU8sS0FBSzt3QkFDWixPQUFPLEtBQUssZ0JBQWdCLGFBQWEsUUFBUTs7O29CQUdyRCxHQUFHLGdEQUFnRCxZQUFNO3dCQUNyRCxJQUFJLE9BQU8sUUFBUSxLQUFLLHNCQUFzQixXQUFXLEdBQUc7NEJBQ3hELE9BQU8sSUFBSSw0QkFBNEI7d0JBQzNDLE9BQU8sS0FBSyxnQkFBZ0IsWUFBWSxRQUFROzs7b0JBR3BELEdBQUcsd0NBQXdDLFlBQU07d0JBQzdDLElBQUksT0FBTyxRQUFRLEtBQUssc0JBQXNCLFdBQVcsR0FBRzs0QkFDeEQsT0FBTyxJQUFJLDRCQUE0Qjt3QkFDM0MsT0FBTyxLQUFLLGdCQUFnQixhQUFhLFFBQVE7Ozs7OztHQVcxRCIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL21vZGVsL0NlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1c1Rlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcbmltcG9ydCAnLi4vQ2VydGlmaWNhdGlvblRlc3REYXRhJztcblxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1cycsIGZ1bmN0aW9uKCkge1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgdmFyIENlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1cywgY2VydGlmaWNhdGlvblRlc3REYXRhO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0NlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1c18sIF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfKSB7XG4gICAgICAgIENlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1cyA9IF9DZXJ0aWZpY2F0aW9uRGVjaXNpb25TdGF0dXNfO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uVGVzdERhdGEgPSBfY2VydGlmaWNhdGlvblRlc3REYXRhXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnaW5pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2l0aCBwcm92aWRlZCBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzBdLmRlY2lzaW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgIHRlc3QgPSBuZXcgQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RhdHVzKGRhdGEpO1xuXG4gICAgICAgICAgICBleHBlY3QodGVzdC5kZWNpc2lvbnMpLnRvRXF1YWwoZGF0YS5kZWNpc2lvbnMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuY3VycmVudFN0YXRlKS50b0VxdWFsKGRhdGEuY3VycmVudFN0YXRlKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmRlcGVuZGVudERlY2lzaW9uKS50b0VxdWFsKGRhdGEuZGVwZW5kYW50RGVjaXNpb25zKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnNvdXJjZUl0ZW1JZCkudG9FcXVhbChkYXRhLnNvdXJjZUl0ZW1JZCk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5wYXJlbnRJdGVtRGlzcGxheU5hbWVzKS50b0VxdWFsKGRhdGEucGFyZW50SXRlbURpc3BsYXlOYW1lcyk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5kZWxlZ2F0aW9uT3duZXIuZGlzcGxheU5hbWUpLnRvRXF1YWwoZGF0YS5kZWxlZ2F0aW9uT3duZXIuZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuZGVsZWdhdGlvbkNvbW1lbnRzKS50b0VxdWFsKGRhdGEuZGVsZWdhdGlvbkNvbW1lbnRzKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmRlbGVnYXRpb25EZXNjcmlwdGlvbikudG9FcXVhbChkYXRhLmRlbGVnYXRpb25EZXNjcmlwdGlvbik7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIGVtcHR5IGFycmF5IG9mIGFsbG93ZWQgc3RhdHVzZXMgaWYgbm90IGRlZmluZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCB0ZXN0ID0gbmV3IENlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1cyh7fSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5kZWNpc2lvbnMpLnRvRXF1YWwoW10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gY29uZmlnIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuZXcgQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RhdHVzKCk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzQ3VycmVudFN0YXR1cycsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm8gY3VycmVudFN0YXRlIGlzIHNldCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gYW5ndWxhci5jb3B5KGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzBdLmRlY2lzaW9uU3RhdHVzKSxcbiAgICAgICAgICAgICAgICB0ZXN0ID0gbmV3IENlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1cyhkYXRhKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0ZXN0LmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmlzQ3VycmVudFN0YXR1cygnQXBwcm92ZWQnKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGN1cnJlbnRTVGF0ZSBkb2VzIG5vdCBtYXRjaCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gYW5ndWxhci5jb3B5KGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzBdLmRlY2lzaW9uU3RhdHVzKSxcbiAgICAgICAgICAgICAgICB0ZXN0ID0gbmV3IENlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1cyhkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmlzQ3VycmVudFN0YXR1cygnUmV2b2tlZCcpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBjdXJyZW50U3RhdGUgbWF0Y2hlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gYW5ndWxhci5jb3B5KGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzBdLmRlY2lzaW9uU3RhdHVzKSxcbiAgICAgICAgICAgICAgICB0ZXN0ID0gbmV3IENlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1cyhkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmlzQ3VycmVudFN0YXR1cygnQXBwcm92ZWQnKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
