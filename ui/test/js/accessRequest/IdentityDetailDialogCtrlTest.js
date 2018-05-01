System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', 'test/js/TestModule', './AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * Tests for the AccessRequestIdentitiesCtrl.
             */
            describe('IdentityDetailDialogCtrl', function () {

                var $rootScope, $controller, testService, accessRequestIdentityService, ctrl, identity, configServiceMock;

                // Load the test module to get the testService and access request module.
                beforeEach(module(testModule, accessRequestModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                beforeEach(inject(function (_accessRequestIdentityService_, accessRequestTestData, Identity, _testService_, _$controller_, _$rootScope_) {

                    // Save the services.
                    accessRequestIdentityService = _accessRequestIdentityService_;
                    $controller = _$controller_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;

                    // Create an identity to test with.
                    identity = new Identity(accessRequestTestData.IDENTITY1);

                    // Mock out the identity service to return a single identity.
                    accessRequestIdentityService.getIdentityDetails = testService.createPromiseSpy(false, {
                        status: 200,
                        data: identity
                    }, {});

                    // mock out config service
                    configServiceMock = {
                        getIdentityDetailsConfig: testService.createPromiseSpy(false, {
                            status: 200,
                            data: [{
                                'attribute': 'id',
                                'label': 'Id'
                            }, {
                                'attribute': 'displayName',
                                'label': 'User Name'
                            }, {
                                'attribute': 'managerName',
                                'label': 'Manager Name'
                            }, {
                                'attribute': 'location',
                                'label': 'Location'
                            }, {
                                'attribute': 'Department',
                                'label': 'Department'
                            }]
                        }, {})
                    };
                }));

                describe('load identity details ctrl', function () {
                    var identityId = 1;
                    var expectedIdentityDetails = [{ label: 'Id', value: '1' }, { label: 'User Name', value: 'Jay Bob' }, { label: 'Location', value: 'Austin' }];

                    it('fetches identity details when loaded', function () {

                        // Create the controller to test with.
                        ctrl = $controller('IdentityDetailDialogCtrl', {
                            accessRequestIdentityService: accessRequestIdentityService,
                            configService: configServiceMock,
                            identityId: identityId
                        });

                        // Run a digest cycle to resolve the promise.
                        $rootScope.$apply();

                        expect(accessRequestIdentityService.getIdentityDetails).toHaveBeenCalled();
                        expect(configServiceMock.getIdentityDetailsConfig).toHaveBeenCalled();
                        expect(ctrl.identityDetails).not.toBeNull();
                        expect(ctrl.identityDetails).toBeDefined();
                        expect(ctrl.identityDetails).toEqual(expectedIdentityDetails);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvSWRlbnRpdHlEZXRhaWxEaWFsb2dDdHJsVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLHNCQUFzQiw0QkFBNEIsVUFBVSxTQUFTO0lBQXRKOztJQUdJLElBQUkscUJBQXFCO0lBQ3pCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCO1dBQ2hDLFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7Ozs7WUFBN0IsU0FBUyw0QkFBNEIsWUFBVzs7Z0JBRTVDLElBQUksWUFBWSxhQUFhLGFBQ3pCLDhCQUNBLE1BQU0sVUFBVTs7O2dCQUlwQixXQUFXLE9BQU8sWUFBWTs7Ozs7Z0JBSzlCLFdBQVcsT0FBTyxVQUFTLGdDQUFnQyx1QkFDaEMsVUFBVSxlQUFlLGVBQ3pCLGNBQWM7OztvQkFHckMsK0JBQStCO29CQUMvQixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsYUFBYTs7O29CQUdiLFdBQVcsSUFBSSxTQUFTLHNCQUFzQjs7O29CQUc5Qyw2QkFBNkIscUJBQ3pCLFlBQVksaUJBQWlCLE9BQU87d0JBQ2hDLFFBQVE7d0JBQ1IsTUFBTTt1QkFDUDs7O29CQUdQLG9CQUFvQjt3QkFDaEIsMEJBQTJCLFlBQVksaUJBQWlCLE9BQU87NEJBQzNELFFBQVE7NEJBQ1IsTUFBTSxDQUNGO2dDQUNJLGFBQWE7Z0NBQ2IsU0FBUzsrQkFFYjtnQ0FDSSxhQUFhO2dDQUNiLFNBQVM7K0JBRWI7Z0NBQ0ksYUFBYTtnQ0FDYixTQUFTOytCQUViO2dDQUNJLGFBQWE7Z0NBQ2IsU0FBUzsrQkFFYjtnQ0FDSSxhQUFhO2dDQUNiLFNBQVM7OzJCQUdsQjs7OztnQkFLWCxTQUFTLDhCQUE4QixZQUFXO29CQUM5QyxJQUFJLGFBQWE7b0JBQ2pCLElBQUksMEJBQTBCLENBQzFCLEVBQUUsT0FBUSxNQUFNLE9BQVEsT0FDeEIsRUFBRSxPQUFRLGFBQWEsT0FBUSxhQUMvQixFQUFFLE9BQVEsWUFBWSxPQUFROztvQkFHbEMsR0FBRyx3Q0FBd0MsWUFBVzs7O3dCQUdsRCxPQUFPLFlBQVksNEJBQTRCOzRCQUMzQyw4QkFBOEI7NEJBQzlCLGVBQWU7NEJBQ2YsWUFBWTs7Ozt3QkFJaEIsV0FBVzs7d0JBRVgsT0FBTyw2QkFBNkIsb0JBQW9CO3dCQUN4RCxPQUFPLGtCQUFrQiwwQkFBMEI7d0JBQ25ELE9BQU8sS0FBSyxpQkFBaUIsSUFBSTt3QkFDakMsT0FBTyxLQUFLLGlCQUFpQjt3QkFDN0IsT0FBTyxLQUFLLGlCQUFpQixRQUFROzs7Ozs7R0FOOUMiLCJmaWxlIjoiYWNjZXNzUmVxdWVzdC9JZGVudGl0eURldGFpbERpYWxvZ0N0cmxUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBhY2Nlc3NSZXF1ZXN0TW9kdWxlIGZyb20gJ2FjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdE1vZHVsZSc7XHJcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XHJcbmltcG9ydCAnLi9BY2Nlc3NSZXF1ZXN0VGVzdERhdGEnO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgQWNjZXNzUmVxdWVzdElkZW50aXRpZXNDdHJsLlxyXG4gKi9cclxuZGVzY3JpYmUoJ0lkZW50aXR5RGV0YWlsRGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciAkcm9vdFNjb3BlLCAkY29udHJvbGxlciwgdGVzdFNlcnZpY2UsXHJcbiAgICAgICAgYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZSxcclxuICAgICAgICBjdHJsLCBpZGVudGl0eSwgY29uZmlnU2VydmljZU1vY2s7XHJcblxyXG5cclxuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UgYW5kIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIGFjY2Vzc1JlcXVlc3RNb2R1bGUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2FjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2VfLCBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZGVudGl0eSwgX3Rlc3RTZXJ2aWNlXywgXyRjb250cm9sbGVyXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kcm9vdFNjb3BlXykge1xyXG5cclxuICAgICAgICAvLyBTYXZlIHRoZSBzZXJ2aWNlcy5cclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2VfO1xyXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XHJcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFuIGlkZW50aXR5IHRvIHRlc3Qgd2l0aC5cclxuICAgICAgICBpZGVudGl0eSA9IG5ldyBJZGVudGl0eShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFkxKTtcclxuXHJcbiAgICAgICAgLy8gTW9jayBvdXQgdGhlIGlkZW50aXR5IHNlcnZpY2UgdG8gcmV0dXJuIGEgc2luZ2xlIGlkZW50aXR5LlxyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UuZ2V0SWRlbnRpdHlEZXRhaWxzID1cclxuICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBpZGVudGl0eVxyXG4gICAgICAgICAgICB9LCB7fSk7XHJcblxyXG4gICAgICAgIC8vIG1vY2sgb3V0IGNvbmZpZyBzZXJ2aWNlXHJcbiAgICAgICAgY29uZmlnU2VydmljZU1vY2sgPSB7XHJcbiAgICAgICAgICAgIGdldElkZW50aXR5RGV0YWlsc0NvbmZpZyA6IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSc6ICdpZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6ICdJZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSc6ICdkaXNwbGF5TmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6ICdVc2VyIE5hbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhdHRyaWJ1dGUnOiAnbWFuYWdlck5hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFiZWwnOiAnTWFuYWdlciBOYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYXR0cmlidXRlJzogJ2xvY2F0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJzogJ0xvY2F0aW9uJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYXR0cmlidXRlJzogJ0RlcGFydG1lbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFiZWwnOiAnRGVwYXJ0bWVudCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdsb2FkIGlkZW50aXR5IGRldGFpbHMgY3RybCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpZGVudGl0eUlkID0gMTtcclxuICAgICAgICB2YXIgZXhwZWN0ZWRJZGVudGl0eURldGFpbHMgPSBbXHJcbiAgICAgICAgICAgIHsgbGFiZWwgOiAnSWQnLCB2YWx1ZSA6ICcxJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsIDogJ1VzZXIgTmFtZScsIHZhbHVlIDogJ0pheSBCb2InIH0sXHJcbiAgICAgICAgICAgIHsgbGFiZWwgOiAnTG9jYXRpb24nLCB2YWx1ZSA6ICdBdXN0aW4nIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBpdCgnZmV0Y2hlcyBpZGVudGl0eSBkZXRhaWxzIHdoZW4gbG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRyb2xsZXIgdG8gdGVzdCB3aXRoLlxyXG4gICAgICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ0lkZW50aXR5RGV0YWlsRGlhbG9nQ3RybCcsIHtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2U6IGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBjb25maWdTZXJ2aWNlOiBjb25maWdTZXJ2aWNlTW9jayxcclxuICAgICAgICAgICAgICAgIGlkZW50aXR5SWQ6IGlkZW50aXR5SWRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBSdW4gYSBkaWdlc3QgY3ljbGUgdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLmdldElkZW50aXR5RGV0YWlscykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY29uZmlnU2VydmljZU1vY2suZ2V0SWRlbnRpdHlEZXRhaWxzQ29uZmlnKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlkZW50aXR5RGV0YWlscykubm90LnRvQmVOdWxsKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlkZW50aXR5RGV0YWlscykudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaWRlbnRpdHlEZXRhaWxzKS50b0VxdWFsKGV4cGVjdGVkSWRlbnRpdHlEZXRhaWxzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
