System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }],
        execute: function () {

            describe('IdentityRequestCardComponent', function () {

                var identityRequestService = undefined,
                    identityRequestTestData = undefined,
                    $componentController = undefined,
                    $compile = undefined,
                    $scope = undefined,
                    refreshTrigger = undefined,
                    identityRequest = undefined,
                    element = undefined,
                    spModal = undefined,
                    $q = undefined,
                    IdentityRequest = undefined,
                    navigationService = undefined,
                    columns = undefined,
                    columnKey = undefined,
                    configService = undefined;

                beforeEach(module(identityRequestModule));

                /* jshint maxparams: 12 */
                beforeEach(inject(function (_identityRequestService_, _$componentController_, _$rootScope_, _$q_, _identityRequestTestData_, _$compile_, $rootScope, _IdentityRequest_, _spModal_, _navigationService_, ColumnConfig, _configService_) {

                    $compile = _$compile_;
                    $componentController = _$componentController_;
                    identityRequestService = _identityRequestService_;
                    identityRequestTestData = _identityRequestTestData_;
                    IdentityRequest = _IdentityRequest_;
                    identityRequest = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_1);
                    $scope = $rootScope.$new();
                    refreshTrigger = {
                        refresh: jasmine.createSpy('refresh')
                    };
                    spModal = _spModal_;
                    $q = _$q_;
                    navigationService = _navigationService_;
                    configService = _configService_;

                    columnKey = 'thisColumnKey';
                    columns = [new ColumnConfig({
                        dataIndex: 'name',
                        headerKey: 'Name',
                        sortable: true,
                        fieldOnly: true
                    }), new ColumnConfig({
                        dataIndex: 'executionStatus',
                        headerKey: 'STATUS',
                        sortable: true
                    })];
                    var data = {};
                    data[columnKey] = columns;
                    spyOn(configService, 'getColumnConfigEntries').and.returnValue($q.when({ data: data }));
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                    if ($scope) {
                        $scope.$destroy();
                    }
                });

                function compile(identityRequest) {
                    var eltDef = '<sp-identity-request-card sp-request="item" ' + 'sp-refresh-trigger="refreshTrigger" sp-column-config-key="configKey">';
                    element = angular.element(eltDef);

                    $scope.item = identityRequest;
                    $scope.refreshTrigger = refreshTrigger;
                    $scope.configKey = columnKey;

                    $compile(element)($scope);
                    $scope.$digest();

                    return element;
                }

                function createController(item, refreshTrigger, configKey) {
                    var bindings = {
                        request: item,
                        refreshTrigger: refreshTrigger,
                        configKey: configKey
                    };
                    var ctrl = $componentController('spIdentityRequestCard', null, bindings);
                    ctrl.$onInit();
                    return ctrl;
                }

                describe('controller', function () {

                    it('throws if not initialized correctly', function () {
                        expect(function () {
                            return createController(null, refreshTrigger, columnKey);
                        }).toThrow();
                        expect(function () {
                            return createController(identityRequest, null, columnKey);
                        }).toThrow();
                        expect(function () {
                            return createController(identityRequest, refreshTrigger, null);
                        }).toThrow();
                    });
                });

                it('shows the identityRequest card details', function () {
                    compile(identityRequest);
                    var details = element.find('#identityRequestDetails');
                    // request id
                    expect(details[0].innerText.trim()).toContain(identityRequestTestData.IDENTITY_REQUEST_1.requestId);

                    // external ticket id
                    expect(details[0].innerText.trim()).toContain(identityRequestTestData.IDENTITY_REQUEST_1.externalTicketId);

                    // additional column executionStatus
                    expect(details[0].innerText.trim()).toContain(columns[1].headerKey);
                    expect(details[0].innerText.trim()).toContain(identityRequest.executionStatus);
                });

                it('does not show external ticket id if not defined', function () {
                    identityRequest.externalTicketId = undefined;

                    compile(identityRequest);
                    var details = element.find('#identityRequestDetails');
                    // external ticket id
                    expect(details[0].innerText.trim()).not.toContain(identityRequestTestData.IDENTITY_REQUEST_1.externalTicketId);
                    expect(details[0].innerText.trim()).not.toContain('ui_identity_requests_external_ticket_id');
                });

                describe('priority flag', function () {
                    function testFlag(priority, exists) {
                        identityRequest.priority = priority;
                        compile(identityRequest);
                        expect(element.find('.panel-heading .h4 i.fa-flag').length).toEqual(exists ? 1 : 0);
                    }
                    it('is shown for high priority requests', function () {
                        testFlag('High', true);
                    });

                    it('is not shown for Normal priority requests', function () {
                        testFlag('Normal', false);
                    });

                    it('is not shown for Low priority requests', function () {
                        testFlag('Low', false);
                    });
                });

                describe('cancel button', function () {
                    it('is shown if request is cancelable', function () {
                        identityRequest.cancelable = true;
                        compile(identityRequest);
                        expect(element.find('.panel-footer .btn').length).toEqual(1);
                    });

                    it('is not shown if request is not cancelable', function () {
                        identityRequest.cancelable = false;
                        compile(identityRequest);
                        expect(element.find('.panel-footer .btn').length).toEqual(0);
                    });
                });

                describe('cancel request', function () {

                    function testCancelRequest(reject, comments) {
                        identityRequest.cancelable = true;
                        compile(identityRequest);

                        spyOn(identityRequestService, 'cancelRequest').and.returnValue($q.when());

                        var deferred = undefined;
                        spyOn(spModal, 'open').and.callFake(function () {
                            deferred = $q.defer();
                            if (reject) {
                                deferred.reject();
                            } else {
                                deferred.resolve({ comments: comments });
                            }
                            return {
                                result: deferred.promise
                            };
                        });

                        element.find('.panel-footer .btn').click();
                        $scope.$apply();
                    }

                    it('calls through spModal and identityRequestService', function () {
                        testCancelRequest(false, 'cancel this');
                        expect(spModal.open).toHaveBeenCalled();
                        expect(identityRequestService.cancelRequest).toHaveBeenCalled();
                    });

                    it('doesnot go through cancelRequest if rejected', function () {
                        testCancelRequest(true, 'cancel this');
                        expect(spModal.open).toHaveBeenCalled();
                        expect(identityRequestService.cancelRequest).not.toHaveBeenCalled();
                    });

                    it('refreshes trigger if cancelRequest succeeds', function () {
                        testCancelRequest(false, 'cancel this');
                        expect(refreshTrigger.refresh).toHaveBeenCalled();
                    });
                });

                describe('show details page', function () {

                    it('calls through the navigationService', function () {

                        spyOn(navigationService, 'go');
                        var ctrl = createController(identityRequest, refreshTrigger, columnKey);
                        ctrl.viewDetails();
                        expect(navigationService.go).toHaveBeenCalled();
                    });

                    it('navigates to the details page', function () {

                        spyOn(navigationService, 'go');
                        compile(identityRequest);
                        var viewDetailsButton = element.find('#requestDetailsBtn-Request1');
                        viewDetailsButton.click();
                        $scope.$apply();
                        expect(navigationService.go).toHaveBeenCalled();
                        var args = navigationService.go.calls.mostRecent().args;
                        expect(args[0].state).toEqual('request.details');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0Q2FyZENvbXBvbmVudFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsVUFBVSxTQUFTOzs7OztJQUtyRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxnQ0FBZ0MsWUFBVzs7Z0JBRWhELElBQUkseUJBQXNCO29CQUFFLDBCQUF1QjtvQkFBRSx1QkFBb0I7b0JBQ3JFLFdBQVE7b0JBQUUsU0FBTTtvQkFBRSxpQkFBYztvQkFBRSxrQkFBZTtvQkFBRSxVQUFPO29CQUFFLFVBQU87b0JBQUUsS0FBRTtvQkFDdkUsa0JBQWU7b0JBQUUsb0JBQWlCO29CQUFFLFVBQU87b0JBQUUsWUFBUztvQkFBRSxnQkFBYTs7Z0JBRXpFLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBQywwQkFBMEIsd0JBQXdCLGNBQWMsTUFDaEUsMkJBQTJCLFlBQVksWUFBWSxtQkFBbUIsV0FDdEUscUJBQXFCLGNBQWMsaUJBQW9COztvQkFFdEUsV0FBVztvQkFDWCx1QkFBdUI7b0JBQ3ZCLHlCQUF5QjtvQkFDekIsMEJBQTBCO29CQUMxQixrQkFBa0I7b0JBQ2xCLGtCQUFrQixJQUFJLGdCQUFnQix3QkFBd0I7b0JBQzlELFNBQVMsV0FBVztvQkFDcEIsaUJBQWlCO3dCQUNiLFNBQVMsUUFBUSxVQUFVOztvQkFFL0IsVUFBVTtvQkFDVixLQUFLO29CQUNMLG9CQUFvQjtvQkFDcEIsZ0JBQWdCOztvQkFFaEIsWUFBWTtvQkFDWixVQUFVLENBQ04sSUFBSSxhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsV0FBVzt3QkFDWCxVQUFVO3dCQUNWLFdBQVc7d0JBRWYsSUFBSSxhQUFhO3dC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LFNBQVMsUUFBUSxJQUFJLFNBQVMsWUFBVzs0QkFDM0MsV0FBVyxHQUFHOzRCQUNkLElBQUksUUFBUTtnQ0FDUixTQUFTO21DQUNOO2dDQUNILFNBQVMsUUFBUSxFQUFFLFVBQVU7OzRCQUVqQyxPQUFPO2dDQUNILFFBQVEsU0FBUzs7Ozt3QkFJekIsUUFBUSxLQUFLLHNCQUFzQjt3QkFDbkMsT0FBTzs7O29CQUdYLEdBQUcsb0RBQW9ELFlBQU07d0JBQ3pELGtCQUFrQixPQUFPO3dCQUN6QixPQUFPLFFBQVEsTUFBTTt3QkFDckIsT0FBTyx1QkFBdUIsZUFBZTs7O29CQUdqRCxHQUFHLGdEQUFnRCxZQUFNO3dCQUNyRCxrQkFBa0IsTUFBTTt3QkFDeEIsT0FBTyxRQUFRLE1BQU07d0JBQ3JCLE9BQU8sdUJBQXVCLGVBQWUsSUFBSTs7O29CQUdyRCxHQUFHLCtDQUErQyxZQUFNO3dCQUNwRCxrQkFBa0IsT0FBTzt3QkFDekIsT0FBTyxlQUFlLFNBQVM7Ozs7Z0JBSXZDLFNBQVMscUJBQXFCLFlBQU07O29CQUVoQyxHQUFHLHVDQUF1QyxZQUFNOzt3QkFFNUMsTUFBTSxtQkFBbUI7d0JBQ3pCLElBQUksT0FBTyxpQkFBaUIsaUJBQWlCLGdCQUFnQjt3QkFDN0QsS0FBSzt3QkFDTCxPQUFPLGtCQUFrQixJQUFJOzs7b0JBR2pDLEdBQUcsaUNBQWlDLFlBQU07O3dCQUV0QyxNQUFNLG1CQUFtQjt3QkFDekIsUUFBUTt3QkFDUixJQUFJLG9CQUFvQixRQUFRLEtBQUs7d0JBQ3JDLGtCQUFrQjt3QkFDbEIsT0FBTzt3QkFDUCxPQUFPLGtCQUFrQixJQUFJO3dCQUM3QixJQUFJLE9BQU8sa0JBQWtCLEdBQUcsTUFBTSxhQUFhO3dCQUNuRCxPQUFPLEtBQUssR0FBRyxPQUFPLFFBQVE7Ozs7OztHQXlCdkMiLCJmaWxlIjoiaWRlbnRpdHlSZXF1ZXN0L2NvbXBvbmVudC9JZGVudGl0eVJlcXVlc3RDYXJkQ29tcG9uZW50VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpZGVudGl0eVJlcXVlc3RNb2R1bGUgZnJvbSAnaWRlbnRpdHlSZXF1ZXN0L0lkZW50aXR5UmVxdWVzdE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnSWRlbnRpdHlSZXF1ZXN0Q2FyZENvbXBvbmVudCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGxldCBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLCBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSwgJGNvbXBvbmVudENvbnRyb2xsZXIsXHJcbiAgICAgICAgJGNvbXBpbGUsICRzY29wZSwgcmVmcmVzaFRyaWdnZXIsIGlkZW50aXR5UmVxdWVzdCwgZWxlbWVudCwgc3BNb2RhbCwgJHEsXHJcbiAgICAgICAgSWRlbnRpdHlSZXF1ZXN0LCBuYXZpZ2F0aW9uU2VydmljZSwgY29sdW1ucywgY29sdW1uS2V5LCBjb25maWdTZXJ2aWNlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5UmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDEyICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfLCBfJGNvbXBvbmVudENvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8sIF8kcV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXywgXyRjb21waWxlXywgJHJvb3RTY29wZSwgX0lkZW50aXR5UmVxdWVzdF8sIF9zcE1vZGFsXyxcclxuICAgICAgICAgICAgICAgICAgICAgICBfbmF2aWdhdGlvblNlcnZpY2VfLCBDb2x1bW5Db25maWcsIF9jb25maWdTZXJ2aWNlXykgPT4ge1xyXG5cclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJGNvbXBvbmVudENvbnRyb2xsZXIgPSBfJGNvbXBvbmVudENvbnRyb2xsZXJfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UgPSBfaWRlbnRpdHlSZXF1ZXN0U2VydmljZV87XHJcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEgPSBfaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGFfO1xyXG4gICAgICAgIElkZW50aXR5UmVxdWVzdCA9IF9JZGVudGl0eVJlcXVlc3RfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdCA9IG5ldyBJZGVudGl0eVJlcXVlc3QoaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF8xKTtcclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuICAgICAgICByZWZyZXNoVHJpZ2dlciA9IHtcclxuICAgICAgICAgICAgcmVmcmVzaDogamFzbWluZS5jcmVhdGVTcHkoJ3JlZnJlc2gnKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcclxuICAgICAgICAkcSA9IF8kcV87XHJcbiAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UgPSBfbmF2aWdhdGlvblNlcnZpY2VfO1xyXG4gICAgICAgIGNvbmZpZ1NlcnZpY2UgPSBfY29uZmlnU2VydmljZV87XHJcblxyXG4gICAgICAgIGNvbHVtbktleSA9ICd0aGlzQ29sdW1uS2V5JztcclxuICAgICAgICBjb2x1bW5zID0gW1xyXG4gICAgICAgICAgICBuZXcgQ29sdW1uQ29uZmlnKHtcclxuICAgICAgICAgICAgICAgIGRhdGFJbmRleDogJ25hbWUnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyS2V5OiAnTmFtZScsXHJcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZpZWxkT25seTogdHJ1ZVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgbmV3IENvbHVtbkNvbmZpZyh7XHJcbiAgICAgICAgICAgICAgICBkYXRhSW5kZXg6ICdleGVjdXRpb25TdGF0dXMnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyS2V5OiAnU1RBVFVTJyxcclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXTtcclxuICAgICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgIGRhdGFbY29sdW1uS2V5XSA9IGNvbHVtbnM7XHJcbiAgICAgICAgc3B5T24oY29uZmlnU2VydmljZSwgJ2dldENvbHVtbkNvbmZpZ0VudHJpZXMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbih7IGRhdGE6IGRhdGEgfSkpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCRzY29wZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb21waWxlKGlkZW50aXR5UmVxdWVzdCkge1xyXG4gICAgICAgIGxldCBlbHREZWYgPSAnPHNwLWlkZW50aXR5LXJlcXVlc3QtY2FyZCBzcC1yZXF1ZXN0PVwiaXRlbVwiICcgK1xyXG4gICAgICAgICAgICAnc3AtcmVmcmVzaC10cmlnZ2VyPVwicmVmcmVzaFRyaWdnZXJcIiBzcC1jb2x1bW4tY29uZmlnLWtleT1cImNvbmZpZ0tleVwiPic7XHJcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbHREZWYpO1xyXG5cclxuICAgICAgICAkc2NvcGUuaXRlbSA9IGlkZW50aXR5UmVxdWVzdDtcclxuICAgICAgICAkc2NvcGUucmVmcmVzaFRyaWdnZXIgPSByZWZyZXNoVHJpZ2dlcjtcclxuICAgICAgICAkc2NvcGUuY29uZmlnS2V5ID0gY29sdW1uS2V5O1xyXG5cclxuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSwgcmVmcmVzaFRyaWdnZXIsIGNvbmZpZ0tleSkge1xyXG4gICAgICAgIGxldCBiaW5kaW5ncyA9IHtcclxuICAgICAgICAgICAgcmVxdWVzdDogaXRlbSxcclxuICAgICAgICAgICAgcmVmcmVzaFRyaWdnZXI6IHJlZnJlc2hUcmlnZ2VyLFxyXG4gICAgICAgICAgICBjb25maWdLZXk6IGNvbmZpZ0tleVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGN0cmwgPSAkY29tcG9uZW50Q29udHJvbGxlcignc3BJZGVudGl0eVJlcXVlc3RDYXJkJywgbnVsbCwgYmluZGluZ3MpO1xyXG4gICAgICAgIGN0cmwuJG9uSW5pdCgpO1xyXG4gICAgICAgIHJldHVybiBjdHJsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaWJlKCdjb250cm9sbGVyJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgndGhyb3dzIGlmIG5vdCBpbml0aWFsaXplZCBjb3JyZWN0bHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVDb250cm9sbGVyKG51bGwsIHJlZnJlc2hUcmlnZ2VyLCBjb2x1bW5LZXkpKS50b1Rocm93KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVDb250cm9sbGVyKGlkZW50aXR5UmVxdWVzdCwgbnVsbCwgY29sdW1uS2V5KSkudG9UaHJvdygpO1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlQ29udHJvbGxlcihpZGVudGl0eVJlcXVlc3QsIHJlZnJlc2hUcmlnZ2VyLCBudWxsKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dzIHRoZSBpZGVudGl0eVJlcXVlc3QgY2FyZCBkZXRhaWxzJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbXBpbGUoaWRlbnRpdHlSZXF1ZXN0KTtcclxuICAgICAgICBsZXQgZGV0YWlscyA9IGVsZW1lbnQuZmluZCgnI2lkZW50aXR5UmVxdWVzdERldGFpbHMnKTtcclxuICAgICAgICAvLyByZXF1ZXN0IGlkXHJcbiAgICAgICAgZXhwZWN0KGRldGFpbHNbMF0uaW5uZXJUZXh0LnRyaW0oKSkudG9Db250YWluKGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfMS5yZXF1ZXN0SWQpO1xyXG5cclxuICAgICAgICAvLyBleHRlcm5hbCB0aWNrZXQgaWRcclxuICAgICAgICBleHBlY3QoZGV0YWlsc1swXS5pbm5lclRleHQudHJpbSgpKS50b0NvbnRhaW4oaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF8xLmV4dGVybmFsVGlja2V0SWQpO1xyXG5cclxuICAgICAgICAvLyBhZGRpdGlvbmFsIGNvbHVtbiBleGVjdXRpb25TdGF0dXNcclxuICAgICAgICBleHBlY3QoZGV0YWlsc1swXS5pbm5lclRleHQudHJpbSgpKS50b0NvbnRhaW4oY29sdW1uc1sxXS5oZWFkZXJLZXkpO1xyXG4gICAgICAgIGV4cGVjdChkZXRhaWxzWzBdLmlubmVyVGV4dC50cmltKCkpLnRvQ29udGFpbihpZGVudGl0eVJlcXVlc3QuZXhlY3V0aW9uU3RhdHVzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkb2VzIG5vdCBzaG93IGV4dGVybmFsIHRpY2tldCBpZCBpZiBub3QgZGVmaW5lZCcsICgpID0+IHtcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3QuZXh0ZXJuYWxUaWNrZXRJZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgY29tcGlsZShpZGVudGl0eVJlcXVlc3QpO1xyXG4gICAgICAgIGxldCBkZXRhaWxzID0gZWxlbWVudC5maW5kKCcjaWRlbnRpdHlSZXF1ZXN0RGV0YWlscycpO1xyXG4gICAgICAgIC8vIGV4dGVybmFsIHRpY2tldCBpZFxyXG4gICAgICAgIGV4cGVjdChkZXRhaWxzWzBdLmlubmVyVGV4dC50cmltKCkpLm5vdC50b0NvbnRhaW4oaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF8xLmV4dGVybmFsVGlja2V0SWQpO1xyXG4gICAgICAgIGV4cGVjdChkZXRhaWxzWzBdLmlubmVyVGV4dC50cmltKCkpLm5vdC50b0NvbnRhaW4oJ3VpX2lkZW50aXR5X3JlcXVlc3RzX2V4dGVybmFsX3RpY2tldF9pZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3ByaW9yaXR5IGZsYWcnLCAoKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gdGVzdEZsYWcocHJpb3JpdHksIGV4aXN0cykge1xyXG4gICAgICAgICAgICBpZGVudGl0eVJlcXVlc3QucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgICAgICAgICAgY29tcGlsZShpZGVudGl0eVJlcXVlc3QpO1xyXG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcucGFuZWwtaGVhZGluZyAuaDQgaS5mYS1mbGFnJykubGVuZ3RoKS50b0VxdWFsKGV4aXN0cyA/IDEgOiAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXQoJ2lzIHNob3duIGZvciBoaWdoIHByaW9yaXR5IHJlcXVlc3RzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0RmxhZygnSGlnaCcsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgbm90IHNob3duIGZvciBOb3JtYWwgcHJpb3JpdHkgcmVxdWVzdHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RGbGFnKCdOb3JtYWwnLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBub3Qgc2hvd24gZm9yIExvdyBwcmlvcml0eSByZXF1ZXN0cycsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdEZsYWcoJ0xvdycsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjYW5jZWwgYnV0dG9uJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdpcyBzaG93biBpZiByZXF1ZXN0IGlzIGNhbmNlbGFibGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlkZW50aXR5UmVxdWVzdC5jYW5jZWxhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29tcGlsZShpZGVudGl0eVJlcXVlc3QpO1xyXG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcucGFuZWwtZm9vdGVyIC5idG4nKS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBub3Qgc2hvd24gaWYgcmVxdWVzdCBpcyBub3QgY2FuY2VsYWJsZScsICgpID0+IHtcclxuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0LmNhbmNlbGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29tcGlsZShpZGVudGl0eVJlcXVlc3QpO1xyXG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcucGFuZWwtZm9vdGVyIC5idG4nKS5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnY2FuY2VsIHJlcXVlc3QnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RDYW5jZWxSZXF1ZXN0KHJlamVjdCwgY29tbWVudHMpIHtcclxuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0LmNhbmNlbGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb21waWxlKGlkZW50aXR5UmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLCAnY2FuY2VsUmVxdWVzdCcpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlZmVycmVkO1xyXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7IGNvbW1lbnRzOiBjb21tZW50cyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBkZWZlcnJlZC5wcm9taXNlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnLnBhbmVsLWZvb3RlciAuYnRuJykuY2xpY2soKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggc3BNb2RhbCBhbmQgaWRlbnRpdHlSZXF1ZXN0U2VydmljZScsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdENhbmNlbFJlcXVlc3QoZmFsc2UsICdjYW5jZWwgdGhpcycpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLmNhbmNlbFJlcXVlc3QpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXNub3QgZ28gdGhyb3VnaCBjYW5jZWxSZXF1ZXN0IGlmIHJlamVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0Q2FuY2VsUmVxdWVzdCh0cnVlLCAnY2FuY2VsIHRoaXMnKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5jYW5jZWxSZXF1ZXN0KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmVmcmVzaGVzIHRyaWdnZXIgaWYgY2FuY2VsUmVxdWVzdCBzdWNjZWVkcycsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdENhbmNlbFJlcXVlc3QoZmFsc2UsICdjYW5jZWwgdGhpcycpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVmcmVzaFRyaWdnZXIucmVmcmVzaCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3cgZGV0YWlscyBwYWdlJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0aGUgbmF2aWdhdGlvblNlcnZpY2UnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihuYXZpZ2F0aW9uU2VydmljZSwgJ2dvJyk7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpZGVudGl0eVJlcXVlc3QsIHJlZnJlc2hUcmlnZ2VyLCBjb2x1bW5LZXkpO1xyXG4gICAgICAgICAgICBjdHJsLnZpZXdEZXRhaWxzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnbmF2aWdhdGVzIHRvIHRoZSBkZXRhaWxzIHBhZ2UnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihuYXZpZ2F0aW9uU2VydmljZSwgJ2dvJyk7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoaWRlbnRpdHlSZXF1ZXN0KTtcclxuICAgICAgICAgICAgbGV0IHZpZXdEZXRhaWxzQnV0dG9uID0gZWxlbWVudC5maW5kKCcjcmVxdWVzdERldGFpbHNCdG4tUmVxdWVzdDEnKTtcclxuICAgICAgICAgICAgdmlld0RldGFpbHNCdXR0b24uY2xpY2soKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgbGV0IGFyZ3MgPSBuYXZpZ2F0aW9uU2VydmljZS5nby5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMF0uc3RhdGUpLnRvRXF1YWwoJ3JlcXVlc3QuZGV0YWlscycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
