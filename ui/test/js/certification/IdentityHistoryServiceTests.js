System.register(['test/js/TestInitializer', 'certification/CertificationModule', './CertificationTestData'], function (_export) {
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

            describe('IdentityHistoryService', function () {

                // Use the module.
                beforeEach(module(certificationModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                var identityHistoryService,
                    certificationTestData,
                    http,
                    baseURL = '/identityiq/ui/rest/certifications';

                beforeEach(inject(function (_$httpBackend_, _identityHistoryService_, _certificationTestData_) {
                    http = _$httpBackend_;
                    identityHistoryService = _identityHistoryService_;
                    certificationTestData = _certificationTestData_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('getIdentityHistory()', function () {
                    it('should retrieve identity history data', function () {
                        var certId = '1234',
                            itemId = '1234',
                            promise = undefined;

                        http.expectGET(baseURL + '/' + certId + '/items/' + itemId + '/history?dir=DESC&limit=5&sort=entryDate&start=0').respond(200, certificationTestData.HISTORY_DATA_RESPONSE);

                        promise = identityHistoryService.getIdentityHistory(certId, itemId);

                        http.flush();

                        promise.then(function (response) {
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('IdentityHistoryItem');
                        });
                    });

                    it('should throw an exception when no id is passed', function () {
                        expect(function () {
                            identityHistoryService.getIdentityHistory();
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vSWRlbnRpdHlIaXN0b3J5U2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsNEJBQTRCLFVBQVUsU0FBUzs7Ozs7SUFLNUg7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUywwQkFBMEIsWUFBVzs7O2dCQUcxQyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1COzs7Z0JBR3pDLElBQUk7b0JBQXdCO29CQUF1QjtvQkFDL0MsVUFBVTs7Z0JBRWQsV0FBVyxPQUFPLFVBQVMsZ0JBQWdCLDBCQUEwQix5QkFBeUI7b0JBQzFGLE9BQU87b0JBQ1AseUJBQXlCO29CQUN6Qix3QkFBd0I7OztnQkFHNUIsVUFBVSxZQUFXO29CQUNqQixLQUFLO29CQUNMLEtBQUs7OztnQkFHVCxTQUFTLHdCQUF3QixZQUFXO29CQUN4QyxHQUFHLHlDQUF5QyxZQUFXO3dCQUNuRCxJQUFJLFNBQVM7NEJBQ1QsU0FBUzs0QkFDVCxVQUFPOzt3QkFFWCxLQUFLLFVBQWEsVUFBTyxNQUFJLFNBQU0sWUFBVSxTQUFNLG9EQUM5QyxRQUFRLEtBQUssc0JBQXNCOzt3QkFFeEMsVUFBVSx1QkFBdUIsbUJBQW1CLFFBQVE7O3dCQUU1RCxLQUFLOzt3QkFFTCxRQUFRLEtBQUssVUFBUyxVQUFVOzRCQUM1QixPQUFPLFNBQVMsS0FBSyxZQUFZLE1BQU0sS0FBSzs0QkFDNUMsT0FBTyxTQUFTLEtBQUssUUFBUSxHQUFHLFlBQVksTUFBTSxLQUFLOzs7O29CQUkvRCxHQUFHLGtEQUFrRCxZQUFXO3dCQUM1RCxPQUFPLFlBQVc7NEJBQ2QsdUJBQXVCOzJCQUN4Qjs7Ozs7O0dBYVoiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9JZGVudGl0eUhpc3RvcnlTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE2LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcbmltcG9ydCAnLi9DZXJ0aWZpY2F0aW9uVGVzdERhdGEnO1xuXG5kZXNjcmliZSgnSWRlbnRpdHlIaXN0b3J5U2VydmljZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gVXNlIHRoZSBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xuICAgIH0pKTtcblxuICAgIHZhciBpZGVudGl0eUhpc3RvcnlTZXJ2aWNlLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEsIGh0dHAsXG4gICAgICAgIGJhc2VVUkwgPSAnL2lkZW50aXR5aXEvdWkvcmVzdC9jZXJ0aWZpY2F0aW9ucyc7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGh0dHBCYWNrZW5kXywgX2lkZW50aXR5SGlzdG9yeVNlcnZpY2VfLCBfY2VydGlmaWNhdGlvblRlc3REYXRhXykge1xuICAgICAgICBodHRwID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIGlkZW50aXR5SGlzdG9yeVNlcnZpY2UgPSBfaWRlbnRpdHlIaXN0b3J5U2VydmljZV87XG4gICAgICAgIGNlcnRpZmljYXRpb25UZXN0RGF0YSA9IF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldElkZW50aXR5SGlzdG9yeSgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0cmlldmUgaWRlbnRpdHkgaGlzdG9yeSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY2VydElkID0gJzEyMzQnLFxuICAgICAgICAgICAgICAgIGl0ZW1JZCA9ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBwcm9taXNlO1xuXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChgJHtiYXNlVVJMfS8ke2NlcnRJZH0vaXRlbXMvJHtpdGVtSWR9L2hpc3Rvcnk/ZGlyPURFU0MmbGltaXQ9NSZzb3J0PWVudHJ5RGF0ZSZzdGFydD0wYClcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIGNlcnRpZmljYXRpb25UZXN0RGF0YS5ISVNUT1JZX0RBVEFfUkVTUE9OU0UpO1xuXG4gICAgICAgICAgICBwcm9taXNlID0gaWRlbnRpdHlIaXN0b3J5U2VydmljZS5nZXRJZGVudGl0eUhpc3RvcnkoY2VydElkLCBpdGVtSWQpO1xuXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG5cbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0xpc3RSZXN1bHREVE8nKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0lkZW50aXR5SGlzdG9yeUl0ZW0nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIG5vIGlkIGlzIHBhc3NlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlkZW50aXR5SGlzdG9yeVNlcnZpY2UuZ2V0SWRlbnRpdHlIaXN0b3J5KCk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
