System.register(['test/js/TestInitializer', 'mfa/MFAAppModule'], function (_export) {
    'use strict';

    var mfaAppModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_mfaMFAAppModule) {
            mfaAppModule = _mfaMFAAppModule['default'];
        }],
        execute: function () {

            describe('MFAService', function () {
                var $rootScope, http, MFAService;

                beforeEach(function () {
                    module(mfaAppModule);
                    module(function ($provide) {
                        $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                    });
                    inject(function ($httpBackend, _$rootScope_, _MFAService_) {
                        http = $httpBackend;
                        MFAService = _MFAService_;
                        $rootScope = _$rootScope_;
                    });
                });

                describe('getMFAWorkflowNames', function () {
                    it('should return applicable mfa workflow names', function () {
                        var workflows = undefined;
                        http.expectGET('/identityiq/external/rest/mfa/configuration').respond(200, ['workflow1', 'workflow2']);
                        MFAService.getMFAWorkflowNames().then(function (returnedWorkflows) {
                            workflows = returnedWorkflows;
                        });
                        http.flush();

                        expect(workflows).toContain('workflow1');
                        expect(workflows).toContain('workflow2');
                        expect(workflows.length).toBe(2);
                    });

                    it('should return reason if rejected', function () {
                        var error = undefined;
                        http.expectGET('/identityiq/external/rest/mfa/configuration').respond(404);
                        MFAService.getMFAWorkflowNames()['catch'](function (returnedError) {
                            error = returnedError;
                        });
                        http.flush();

                        expect(error).toEqual('ui_mfa_error_configuration_not_accessible');
                    });
                });

                describe('postSelectedMFAWorkflow', function () {
                    it('should post selected mfa workflow name', function () {
                        http.expectPOST(SailPoint.CONTEXT_PATH + '/identityiq/external/mfa/mfa.jsf', {
                            mfaWorkflow: 'testWorkflowName'
                        }).respond(200);
                        MFAService.postSelectedMFAWorkflow('testWorkflowName');
                        http.flush();
                    });

                    it('should return error if called with no selected mfa workflow name', function () {
                        var error = undefined;
                        MFAService.postSelectedMFAWorkflow()['catch'](function (returnedError) {
                            error = returnedError;
                        });
                        $rootScope.$apply();
                        expect(error).toEqual('ui_mfa_error_no_workflow_selected');
                    });
                });

                // Tear down
                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1mYS9NRkFTZXJ2aWNlVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUJBQXFCLFVBQVUsU0FBUztJQUNoRjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsa0JBQWtCO1lBQ3hFLGVBQWUsaUJBQWlCOztRQUVwQyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsY0FBYyxZQUFXO2dCQUM5QixJQUFJLFlBQVksTUFBTTs7Z0JBRXRCLFdBQVksWUFBVztvQkFDbkIsT0FBTztvQkFDUCxPQUFRLFVBQVMsVUFBVTt3QkFDdkIsU0FBUyxTQUFTLG1CQUFtQjs7b0JBRXpDLE9BQVEsVUFBUyxjQUFjLGNBQWMsY0FBYzt3QkFDdkQsT0FBTzt3QkFDUCxhQUFhO3dCQUNiLGFBQWE7Ozs7Z0JBSXJCLFNBQVMsdUJBQXVCLFlBQVc7b0JBQ3ZDLEdBQUcsK0NBQStDLFlBQVc7d0JBQ3pELElBQUksWUFBUzt3QkFDYixLQUFLLFVBQVUsK0NBQStDLFFBQVEsS0FBSyxDQUFDLGFBQWE7d0JBQ3pGLFdBQVcsc0JBQXNCLEtBQUssVUFBQyxtQkFBc0I7NEJBQ3pELFlBQVk7O3dCQUVoQixLQUFLOzt3QkFFTCxPQUFPLFdBQVcsVUFBVTt3QkFDNUIsT0FBTyxXQUFXLFVBQVU7d0JBQzVCLE9BQU8sVUFBVSxRQUFRLEtBQUs7OztvQkFHbEMsR0FBRyxvQ0FBb0MsWUFBVzt3QkFDOUMsSUFBSSxRQUFLO3dCQUNULEtBQUssVUFBVSwrQ0FBK0MsUUFBUTt3QkFDdEUsV0FBVyxzQkFBcUIsU0FBTyxVQUFDLGVBQWtCOzRCQUN0RCxRQUFROzt3QkFFWixLQUFLOzt3QkFFTCxPQUFPLE9BQU8sUUFBUTs7OztnQkFJOUIsU0FBUywyQkFBMkIsWUFBVztvQkFDM0MsR0FBRywwQ0FBMEMsWUFBVzt3QkFDcEQsS0FBSyxXQUFXLFVBQVUsZUFBZSxvQ0FBb0M7NEJBQ3pFLGFBQWE7MkJBQ2QsUUFBUTt3QkFDWCxXQUFXLHdCQUF3Qjt3QkFDbkMsS0FBSzs7O29CQUdULEdBQUcsb0VBQW9FLFlBQVc7d0JBQzlFLElBQUksUUFBSzt3QkFDVCxXQUFXLDBCQUF5QixTQUFPLFVBQUEsZUFBaUI7NEJBQ3hELFFBQVE7O3dCQUVaLFdBQVc7d0JBQ1gsT0FBTyxPQUFPLFFBQVE7Ozs7O2dCQUs5QixVQUFVLFlBQVc7b0JBQ2pCLEtBQUs7b0JBQ0wsS0FBSzs7Ozs7R0FZViIsImZpbGUiOiJtZmEvTUZBU2VydmljZVRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtZmFBcHBNb2R1bGUgZnJvbSAnbWZhL01GQUFwcE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdNRkFTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRyb290U2NvcGUsIGh0dHAsIE1GQVNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgbW9kdWxlKG1mYUFwcE1vZHVsZSk7XG4gICAgICAgIG1vZHVsZSggZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGluamVjdCggZnVuY3Rpb24oJGh0dHBCYWNrZW5kLCBfJHJvb3RTY29wZV8sIF9NRkFTZXJ2aWNlXykge1xuICAgICAgICAgICAgaHR0cCA9ICRodHRwQmFja2VuZDtcbiAgICAgICAgICAgIE1GQVNlcnZpY2UgPSBfTUZBU2VydmljZV87XG4gICAgICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRNRkFXb3JrZmxvd05hbWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFwcGxpY2FibGUgbWZhIHdvcmtmbG93IG5hbWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgd29ya2Zsb3dzO1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoJy9pZGVudGl0eWlxL2V4dGVybmFsL3Jlc3QvbWZhL2NvbmZpZ3VyYXRpb24nKS5yZXNwb25kKDIwMCwgWyd3b3JrZmxvdzEnLCAnd29ya2Zsb3cyJ10pO1xuICAgICAgICAgICAgTUZBU2VydmljZS5nZXRNRkFXb3JrZmxvd05hbWVzKCkudGhlbigocmV0dXJuZWRXb3JrZmxvd3MpID0+IHtcbiAgICAgICAgICAgICAgICB3b3JrZmxvd3MgPSByZXR1cm5lZFdvcmtmbG93cztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuXG4gICAgICAgICAgICBleHBlY3Qod29ya2Zsb3dzKS50b0NvbnRhaW4oJ3dvcmtmbG93MScpO1xuICAgICAgICAgICAgZXhwZWN0KHdvcmtmbG93cykudG9Db250YWluKCd3b3JrZmxvdzInKTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrZmxvd3MubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiByZWFzb24gaWYgcmVqZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBlcnJvcjtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKCcvaWRlbnRpdHlpcS9leHRlcm5hbC9yZXN0L21mYS9jb25maWd1cmF0aW9uJykucmVzcG9uZCg0MDQpO1xuICAgICAgICAgICAgTUZBU2VydmljZS5nZXRNRkFXb3JrZmxvd05hbWVzKCkuY2F0Y2goKHJldHVybmVkRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IHJldHVybmVkRXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcblxuICAgICAgICAgICAgZXhwZWN0KGVycm9yKS50b0VxdWFsKCd1aV9tZmFfZXJyb3JfY29uZmlndXJhdGlvbl9ub3RfYWNjZXNzaWJsZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwb3N0U2VsZWN0ZWRNRkFXb3JrZmxvdycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHBvc3Qgc2VsZWN0ZWQgbWZhIHdvcmtmbG93IG5hbWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChTYWlsUG9pbnQuQ09OVEVYVF9QQVRIICsgJy9pZGVudGl0eWlxL2V4dGVybmFsL21mYS9tZmEuanNmJywge1xuICAgICAgICAgICAgICAgIG1mYVdvcmtmbG93OiAndGVzdFdvcmtmbG93TmFtZSdcbiAgICAgICAgICAgIH0pLnJlc3BvbmQoMjAwKTtcbiAgICAgICAgICAgIE1GQVNlcnZpY2UucG9zdFNlbGVjdGVkTUZBV29ya2Zsb3coJ3Rlc3RXb3JrZmxvd05hbWUnKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZXJyb3IgaWYgY2FsbGVkIHdpdGggbm8gc2VsZWN0ZWQgbWZhIHdvcmtmbG93IG5hbWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBlcnJvcjtcbiAgICAgICAgICAgIE1GQVNlcnZpY2UucG9zdFNlbGVjdGVkTUZBV29ya2Zsb3coKS5jYXRjaChyZXR1cm5lZEVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IHJldHVybmVkRXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoZXJyb3IpLnRvRXF1YWwoJ3VpX21mYV9lcnJvcl9ub193b3JrZmxvd19zZWxlY3RlZCcpO1xuICAgICAgICB9KTtcbiAgICAgfSk7XG5cbiAgICAvLyBUZWFyIGRvd25cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XG4gICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
