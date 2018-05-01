System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', '../IdentityRequestTestData'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_IdentityRequestTestData) {}],
        execute: function () {

            describe('IdentityRequestDetailsComponent', function () {

                var identityRequestService = undefined,
                    identityRequestTestData = undefined,
                    $componentController = undefined,
                    $compile = undefined,
                    $scope = undefined,
                    identityRequest = undefined,
                    element = undefined,
                    $q = undefined,
                    $stateParams = undefined,
                    identityRequestDataService = undefined,
                    configService = undefined,
                    navigationService = undefined;

                beforeEach(module(identityRequestModule));

                /* jshint maxparams: 14 */
                beforeEach(inject(function (_identityRequestService_, _$componentController_, _$rootScope_, _$q_, TablePreferences, ColumnConfig, _identityRequestTestData_, _$compile_, $rootScope, IdentityRequest, _identityRequestDataService_, _$stateParams_, _configService_, _navigationService_) {

                    $compile = _$compile_;
                    $componentController = _$componentController_;
                    identityRequestService = _identityRequestService_;
                    identityRequestDataService = _identityRequestDataService_;
                    identityRequestTestData = _identityRequestTestData_;
                    identityRequest = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_1);
                    $scope = $rootScope;
                    $q = _$q_;
                    configService = _configService_;
                    navigationService = _navigationService_;

                    var columnConfigs = [new ColumnConfig({
                        dataIndex: 'name',
                        sortable: true,
                        headerKey: 'Name'
                    })],
                        columnConfigData = {
                        uiIdentityRequestChangeItemsColumns: columnConfigs
                    };

                    spyOn(configService, 'getColumnConfigEntries').and.returnValue($q.when({ data: columnConfigData }));

                    var tablePreferences = new TablePreferences({ columns: ['someValue', 'name'] });
                    spyOn(configService, 'getTablePreferences').and.returnValue($q.when(tablePreferences));

                    $stateParams = _$stateParams_;
                    $stateParams.requestId = identityRequest.id;
                    spyOn(identityRequestDataService, 'setIdentityRequest').and.callThrough();

                    spyOn(identityRequestService, 'getIdentityRequest').and.returnValue($q.when(identityRequest));
                    spyOn(identityRequestService, 'getUnFilteredItems').and.returnValue($q.when({
                        data: {
                            count: 0,
                            objects: []
                        }
                    }));
                    spyOn(identityRequestService, 'getFilteredItems').and.returnValue($q.when({
                        data: {
                            count: 0,
                            objects: []
                        }
                    }));
                    spyOn(identityRequestService, 'getMessages').and.returnValue($q.when({
                        data: {
                            count: 0,
                            objects: []
                        }
                    }));
                    spyOn(identityRequestService, 'getInteractions').and.returnValue($q.when({
                        data: {
                            count: 0,
                            objects: []
                        }
                    }));
                    spyOn(identityRequestService, 'getProvisioningItems').and.returnValue($q.when({
                        data: {
                            count: 0,
                            objects: []
                        }
                    }));
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                    if ($scope) {
                        $scope.$destroy();
                    }
                });

                function compile() {
                    var eltDef = '<sp-identity-request-details/>';
                    element = angular.element(eltDef);

                    $compile(element)($scope);
                    $scope.$apply();

                    return element;
                }

                function createController() {
                    var ctrl = $componentController('spIdentityRequestDetails', null, null);
                    ctrl.$onInit();
                    $scope.$apply();
                    return ctrl;
                }

                describe('controller', function () {

                    it('throws if requestId is missing', function () {
                        delete $stateParams.requestId;
                        expect(function () {
                            createController();
                        }).toThrow();
                    });

                    it('loads the identityRequest', function () {
                        createController();
                        expect(identityRequestService.getIdentityRequest).toHaveBeenCalledWith(identityRequest.id);
                        expect(identityRequestDataService.setIdentityRequest).toHaveBeenCalledWith(identityRequest);
                    });
                });

                describe('shows identityRequestDetails', function () {
                    it('shows the identityRequest details', function () {
                        compile(identityRequest);
                        expect(element[0].innerText.trim()).toContain('ui_identity_request_details_header');
                        expect(element[0].innerText.trim()).toContain('ui_identity_request_details_unfiltered_items_header');
                        expect(element[0].innerText.trim()).toContain('ui_identity_request_details_filtered_items_header');
                        expect(element[0].innerText.trim()).toContain('ui_identity_request_messages_table_header');
                        expect(element[0].innerText.trim()).toContain('ui_identity_request_interactions_header');
                        expect(element[0].innerText.trim()).toContain('ui_identity_request_provisioning_items_table_header');
                    });
                });

                describe('back button', function () {

                    it('calls through the navigationService', function () {

                        spyOn(navigationService, 'go');
                        var ctrl = createController();
                        ctrl.goBack();
                        expect(navigationService.go).toHaveBeenCalled();
                        var args = navigationService.go.calls.mostRecent().args;
                        expect(args[0].back).toEqual(true);
                        expect(args[0].fallback).toEqual('viewHome');
                        expect(args[0].state).toEqual('home');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0RGV0YWlsc0NvbXBvbmVudFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5Q0FBeUMsK0JBQStCLFVBQVUsU0FBUzs7Ozs7SUFLbkk7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDO1dBQy9ELFVBQVUsMEJBQTBCO1FBQ3ZDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyxtQ0FBbUMsWUFBVzs7Z0JBRW5ELElBQUkseUJBQXNCO29CQUFFLDBCQUF1QjtvQkFBRSx1QkFBb0I7b0JBQ3JFLFdBQVE7b0JBQUUsU0FBTTtvQkFBRSxrQkFBZTtvQkFBRSxVQUFPO29CQUFFLEtBQUU7b0JBQUUsZUFBWTtvQkFBRSw2QkFBMEI7b0JBQ3hGLGdCQUFhO29CQUFFLG9CQUFpQjs7Z0JBRXBDLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBQywwQkFBMEIsd0JBQXdCLGNBQWMsTUFBTSxrQkFDdEUsY0FBYywyQkFBMkIsWUFBWSxZQUFZLGlCQUNqRSw4QkFBOEIsZ0JBQWdCLGlCQUFpQixxQkFBd0I7O29CQUV0RyxXQUFXO29CQUNYLHVCQUF1QjtvQkFDdkIseUJBQXlCO29CQUN6Qiw2QkFBNkI7b0JBQzdCLDBCQUEwQjtvQkFDMUIsa0JBQWtCLElBQUksZ0JBQWdCLHdCQUF3QjtvQkFDOUQsU0FBUztvQkFDVCxLQUFLO29CQUNMLGdCQUFnQjtvQkFDaEIsb0JBQW9COztvQkFFcEIsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLGFBQWE7d0JBQ2xDLFdBQVc7d0JBQ1gsVUFBVTt3QkFDVixXQUFXOzt3QkFDVixtQkFBbUI7d0JBQ3BCLHFDQUFxQzs7O29CQUd6QyxNQUFNLGVBQWUsMEJBQTBCLElBQUksWUFBWSxHQUFHLEtBQUssRUFBQyxNQUFNOztvQkFFOUUsSUFBSSxtQkFBbUIsSUFBSSxpQkFBaUIsRUFBQyxTQUFTLENBQUMsYUFBYTtvQkFDcEUsTUFBTSxlQUFlLHVCQUF1QixJQUFJLFlBQVksR0FBRyxLQUFLOztvQkFFcEUsZUFBZTtvQkFDZixhQUFhLFlBQVksZ0JBQWdCO29CQUN6QyxNQUFNLDRCQUE0QixzQkFBc0IsSUFBSTs7b0JBRzVELE1BQU0sd0JBQXdCLHNCQUFzQixJQUFJLFlBQVksR0FBRyxLQUFLO29CQUM1RSxNQUFNLHdCQUF3QixzQkFBc0IsSUFBSSxZQUFZLEdBQUcsS0FBSzt3QkFDeEUsTUFBTTs0QkFDRixPQUFPOzRCQUNQLFNBQVM7OztvQkFHakIsTUFBTSx3QkFBd0Isb0JBQW9CLElBQUksWUFBWSxHQUFHLEtBQUs7d0JBQ3RFLE1BQU07NEJBQ0YsT0FBTzs0QkFDUCxTQUFTOzs7b0JBR2pCLE1BQU0sd0JBQXdCLGVBQWUsSUFBSSxZQUFZLEdBQUcsS0FBSzt3QkFDakUsTUFBTTs0QkFDRixPQUFPOzRCQUNQLFNBQVM7OztvQkFHakIsTUFBTSx3QkFBd0IsbUJBQW1CLElBQUksWUFBWSxHQUFHLEtBQUs7d0JBQ3JFLE1BQU07NEJBQ0YsT0FBTzs0QkFDUCxTQUFTOzs7b0JBR2pCLE1BQU0sd0JBQXdCLHdCQUF3QixJQUFJLFlBQVksR0FBRyxLQUFLO3dCQUMxRSxNQUFNOzRCQUNGLE9BQU87NEJBQ1AsU0FBUzs7Ozs7Z0JBTXJCLFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUTs7b0JBRVosSUFBSSxRQUFRO3dCQUNSLE9BQU87Ozs7Z0JBSWYsU0FBUyxVQUFVO29CQUNmLElBQUksU0FBUztvQkFDYixVQUFVLFFBQVEsUUFBUTs7b0JBRTFCLFNBQVMsU0FBUztvQkFDbEIsT0FBTzs7b0JBRVAsT0FBTzs7O2dCQUdYLFNBQVMsbUJBQW1CO29CQUN4QixJQUFJLE9BQU8scUJBQXFCLDRCQUE0QixNQUFNO29CQUNsRSxLQUFLO29CQUNMLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFNBQVMsY0FBYyxZQUFNOztvQkFFekIsR0FBRyxrQ0FBa0MsWUFBVzt3QkFDNUMsT0FBTyxhQUFhO3dCQUNwQixPQUFPLFlBQVc7NEJBQUU7MkJBQXVCOzs7b0JBRy9DLEdBQUcsNkJBQTZCLFlBQU07d0JBQ2xDO3dCQUNBLE9BQU8sdUJBQXVCLG9CQUFvQixxQkFBcUIsZ0JBQWdCO3dCQUN2RixPQUFPLDJCQUEyQixvQkFBb0IscUJBQXFCOzs7O2dCQUtuRixTQUFTLGdDQUFnQyxZQUFNO29CQUMzQyxHQUFHLHFDQUFxQyxZQUFNO3dCQUMxQyxRQUFRO3dCQUNSLE9BQU8sUUFBUSxHQUFHLFVBQVUsUUFBUSxVQUFVO3dCQUM5QyxPQUFPLFFBQVEsR0FBRyxVQUFVLFFBQVEsVUFBVTt3QkFDOUMsT0FBTyxRQUFRLEdBQUcsVUFBVSxRQUFRLFVBQVU7d0JBQzlDLE9BQU8sUUFBUSxHQUFHLFVBQVUsUUFBUSxVQUFVO3dCQUM5QyxPQUFPLFFBQVEsR0FBRyxVQUFVLFFBQVEsVUFBVTt3QkFDOUMsT0FBTyxRQUFRLEdBQUcsVUFBVSxRQUFRLFVBQVU7Ozs7Z0JBSXRELFNBQVMsZUFBZSxZQUFNOztvQkFFMUIsR0FBRyx1Q0FBdUMsWUFBTTs7d0JBRTVDLE1BQU0sbUJBQW1CO3dCQUN6QixJQUFJLE9BQU87d0JBQ1gsS0FBSzt3QkFDTCxPQUFPLGtCQUFrQixJQUFJO3dCQUM3QixJQUFJLE9BQU8sa0JBQWtCLEdBQUcsTUFBTSxhQUFhO3dCQUNuRCxPQUFPLEtBQUssR0FBRyxNQUFNLFFBQVE7d0JBQzdCLE9BQU8sS0FBSyxHQUFHLFVBQVUsUUFBUTt3QkFDakMsT0FBTyxLQUFLLEdBQUcsT0FBTyxRQUFROzs7Ozs7R0FtQnZDIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0RGV0YWlsc0NvbXBvbmVudFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xyXG5pbXBvcnQgJy4uL0lkZW50aXR5UmVxdWVzdFRlc3REYXRhJztcclxuXHJcbmRlc2NyaWJlKCdJZGVudGl0eVJlcXVlc3REZXRhaWxzQ29tcG9uZW50JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbGV0IGlkZW50aXR5UmVxdWVzdFNlcnZpY2UsIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLCAkY29tcG9uZW50Q29udHJvbGxlcixcclxuICAgICAgICAkY29tcGlsZSwgJHNjb3BlLCBpZGVudGl0eVJlcXVlc3QsIGVsZW1lbnQsICRxLCAkc3RhdGVQYXJhbXMsIGlkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIGNvbmZpZ1NlcnZpY2UsIG5hdmlnYXRpb25TZXJ2aWNlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5UmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDE0ICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfLCBfJGNvbXBvbmVudENvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8sIF8kcV8sIFRhYmxlUHJlZmVyZW5jZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgQ29sdW1uQ29uZmlnLCBfaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGFfLCBfJGNvbXBpbGVfLCAkcm9vdFNjb3BlLCBJZGVudGl0eVJlcXVlc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgX2lkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlXywgXyRzdGF0ZVBhcmFtc18sIF9jb25maWdTZXJ2aWNlXywgX25hdmlnYXRpb25TZXJ2aWNlXykgPT4ge1xyXG5cclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJGNvbXBvbmVudENvbnRyb2xsZXIgPSBfJGNvbXBvbmVudENvbnRyb2xsZXJfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UgPSBfaWRlbnRpdHlSZXF1ZXN0U2VydmljZV87XHJcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2UgPSBfaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2VfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhID0gX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXztcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3QgPSBuZXcgSWRlbnRpdHlSZXF1ZXN0KGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfMSk7XHJcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgICAgICAkcSA9IF8kcV87XHJcbiAgICAgICAgY29uZmlnU2VydmljZSA9IF9jb25maWdTZXJ2aWNlXztcclxuICAgICAgICBuYXZpZ2F0aW9uU2VydmljZSA9IF9uYXZpZ2F0aW9uU2VydmljZV87XHJcblxyXG4gICAgICAgIGxldCBjb2x1bW5Db25maWdzID0gW25ldyBDb2x1bW5Db25maWcoe1xyXG4gICAgICAgICAgICBkYXRhSW5kZXg6ICduYW1lJyxcclxuICAgICAgICAgICAgc29ydGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGhlYWRlcktleTogJ05hbWUnXHJcbiAgICAgICAgfSldLCBjb2x1bW5Db25maWdEYXRhID0ge1xyXG4gICAgICAgICAgICB1aUlkZW50aXR5UmVxdWVzdENoYW5nZUl0ZW1zQ29sdW1uczogY29sdW1uQ29uZmlnc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNweU9uKGNvbmZpZ1NlcnZpY2UsICdnZXRDb2x1bW5Db25maWdFbnRyaWVzJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oe2RhdGE6IGNvbHVtbkNvbmZpZ0RhdGF9KSk7XHJcblxyXG4gICAgICAgIGxldCB0YWJsZVByZWZlcmVuY2VzID0gbmV3IFRhYmxlUHJlZmVyZW5jZXMoe2NvbHVtbnM6IFsnc29tZVZhbHVlJywgJ25hbWUnXSB9KTtcclxuICAgICAgICBzcHlPbihjb25maWdTZXJ2aWNlLCAnZ2V0VGFibGVQcmVmZXJlbmNlcycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHRhYmxlUHJlZmVyZW5jZXMpKTtcclxuXHJcbiAgICAgICAgJHN0YXRlUGFyYW1zID0gXyRzdGF0ZVBhcmFtc187XHJcbiAgICAgICAgJHN0YXRlUGFyYW1zLnJlcXVlc3RJZCA9IGlkZW50aXR5UmVxdWVzdC5pZDtcclxuICAgICAgICBzcHlPbihpZGVudGl0eVJlcXVlc3REYXRhU2VydmljZSwgJ3NldElkZW50aXR5UmVxdWVzdCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG5cclxuXHJcbiAgICAgICAgc3B5T24oaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgJ2dldElkZW50aXR5UmVxdWVzdCcpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKGlkZW50aXR5UmVxdWVzdCkpO1xyXG4gICAgICAgIHNweU9uKGlkZW50aXR5UmVxdWVzdFNlcnZpY2UsICdnZXRVbkZpbHRlcmVkSXRlbXMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbih7XHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0czogW11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBzcHlPbihpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLCAnZ2V0RmlsdGVyZWRJdGVtcycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHtcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHNweU9uKGlkZW50aXR5UmVxdWVzdFNlcnZpY2UsICdnZXRNZXNzYWdlcycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHtcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHNweU9uKGlkZW50aXR5UmVxdWVzdFNlcnZpY2UsICdnZXRJbnRlcmFjdGlvbnMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbih7XHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0czogW11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBzcHlPbihpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLCAnZ2V0UHJvdmlzaW9uaW5nSXRlbXMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbih7XHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0czogW11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJHNjb3BlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBpbGUoKSB7XHJcbiAgICAgICAgbGV0IGVsdERlZiA9ICc8c3AtaWRlbnRpdHktcmVxdWVzdC1kZXRhaWxzLz4nO1xyXG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWx0RGVmKTtcclxuXHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgbGV0IGN0cmwgPSAkY29tcG9uZW50Q29udHJvbGxlcignc3BJZGVudGl0eVJlcXVlc3REZXRhaWxzJywgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgY3RybC4kb25Jbml0KCk7XHJcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIHJldHVybiBjdHJsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaWJlKCdjb250cm9sbGVyJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgndGhyb3dzIGlmIHJlcXVlc3RJZCBpcyBtaXNzaW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSAkc3RhdGVQYXJhbXMucmVxdWVzdElkO1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGNyZWF0ZUNvbnRyb2xsZXIoKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnbG9hZHMgdGhlIGlkZW50aXR5UmVxdWVzdCcsICgpID0+IHtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5nZXRJZGVudGl0eVJlcXVlc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGlkZW50aXR5UmVxdWVzdC5pZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3REYXRhU2VydmljZS5zZXRJZGVudGl0eVJlcXVlc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGlkZW50aXR5UmVxdWVzdCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dzIGlkZW50aXR5UmVxdWVzdERldGFpbHMnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3Nob3dzIHRoZSBpZGVudGl0eVJlcXVlc3QgZGV0YWlscycsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZShpZGVudGl0eVJlcXVlc3QpO1xyXG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudFswXS5pbm5lclRleHQudHJpbSgpKS50b0NvbnRhaW4oJ3VpX2lkZW50aXR5X3JlcXVlc3RfZGV0YWlsc19oZWFkZXInKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnRbMF0uaW5uZXJUZXh0LnRyaW0oKSkudG9Db250YWluKCd1aV9pZGVudGl0eV9yZXF1ZXN0X2RldGFpbHNfdW5maWx0ZXJlZF9pdGVtc19oZWFkZXInKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnRbMF0uaW5uZXJUZXh0LnRyaW0oKSkudG9Db250YWluKCd1aV9pZGVudGl0eV9yZXF1ZXN0X2RldGFpbHNfZmlsdGVyZWRfaXRlbXNfaGVhZGVyJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50WzBdLmlubmVyVGV4dC50cmltKCkpLnRvQ29udGFpbigndWlfaWRlbnRpdHlfcmVxdWVzdF9tZXNzYWdlc190YWJsZV9oZWFkZXInKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnRbMF0uaW5uZXJUZXh0LnRyaW0oKSkudG9Db250YWluKCd1aV9pZGVudGl0eV9yZXF1ZXN0X2ludGVyYWN0aW9uc19oZWFkZXInKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnRbMF0uaW5uZXJUZXh0LnRyaW0oKSkudG9Db250YWluKCd1aV9pZGVudGl0eV9yZXF1ZXN0X3Byb3Zpc2lvbmluZ19pdGVtc190YWJsZV9oZWFkZXInKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdiYWNrIGJ1dHRvbicsICgpID0+IHtcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdGhlIG5hdmlnYXRpb25TZXJ2aWNlJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgc3B5T24obmF2aWdhdGlvblNlcnZpY2UsICdnbycpO1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgY3RybC5nb0JhY2soKTtcclxuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGxldCBhcmdzID0gbmF2aWdhdGlvblNlcnZpY2UuZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdLmJhY2spLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdLmZhbGxiYWNrKS50b0VxdWFsKCd2aWV3SG9tZScpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXJnc1swXS5zdGF0ZSkudG9FcXVhbCgnaG9tZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
