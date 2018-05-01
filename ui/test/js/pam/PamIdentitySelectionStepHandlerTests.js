System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    /**
     * Tests for the PamIdentitySelectionStepHandler.
     */
    'use strict';

    var pamModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('PamIdentitySelectionStepHandler', function () {

                var pamIdentitySuggestService = undefined,
                    $q = undefined,
                    PamIdentitySelectionStepHandler = undefined,
                    SelectionModel = undefined,
                    handler = undefined;

                // Load the test module to get the testService and access request module.
                beforeEach(module(testModule, pamModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                beforeEach(inject(function (_$q_, _pamIdentitySuggestService_, _SelectionModel_, _PamIdentitySelectionStepHandler_) {

                    SelectionModel = _SelectionModel_;
                    PamIdentitySelectionStepHandler = _PamIdentitySelectionStepHandler_;
                    pamIdentitySuggestService = _pamIdentitySuggestService_;
                    handler = new PamIdentitySelectionStepHandler($q, pamIdentitySuggestService, {}, SelectionModel);
                }));

                describe('onIdentitySelect', function () {
                    it('does not add an identity to the selectionModel with 0 accounts', function () {
                        var identity = {
                            id: 'test',
                            accounts: []
                        };
                        handler.identitySelectionModel.clear();
                        expect(handler.isSaveDisabled()).toEqual(true);
                        handler.onIdentitySelect(identity, function () {});
                        expect(handler.identitySelectionModel.getSelections().length).toEqual(0);
                        expect(handler.isSaveDisabled()).toEqual(true);
                    });

                    it('adds an identity to the selectionModel', function () {
                        var identity = {
                            id: 'test',
                            accounts: [{ id: '123', accountId: 'blah' }]
                        };
                        handler.identitySelectionModel.clear();
                        expect(handler.isSaveDisabled()).toEqual(true);
                        handler.onIdentitySelect(identity, function () {});
                        expect(handler.identitySelectionModel.getSelections().length).toEqual(1);
                        expect(handler.isSaveDisabled()).toEqual(false);
                    });

                    it('adds an identity with multiple accounts to the selectionModel', function () {
                        var identity = {
                            id: 'test',
                            accounts: [{ id: '123', accountId: 'blah' }, { id: '1234', accountId: 'blah as well' }]
                        };
                        handler.identitySelectionModel.clear();
                        expect(handler.isSaveDisabled()).toEqual(true);
                        handler.onIdentitySelect(identity, function () {});
                        expect(handler.identitySelectionModel.getSelections().length).toEqual(1);
                        expect(handler.isSaveDisabled()).toEqual(true);
                    });
                });

                describe('toggleAccountSelection', function () {
                    it('enables the save button when an account is selected', function () {
                        var identity = {
                            id: 'test',
                            accounts: [{ id: 'blah', accountId: 'blah' }, { id: 'blah2', accountId: 'blah as well' }]
                        };
                        handler.identitySelectionModel.clear();
                        handler.accountSelectionModel.clear();
                        expect(handler.accountSelectionModel.getSelections().length).toEqual(0);

                        handler.onIdentitySelect(identity, function () {});
                        handler.toggleAccountSelection(identity.accounts[0], identity);

                        expect(handler.accountSelectionModel.getSelections().length).toEqual(1);
                        expect(handler.isSaveDisabled()).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1JZGVudGl0eVNlbGVjdGlvblN0ZXBIYW5kbGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGlCQUFpQix1QkFBdUIsVUFBVSxTQUFTOzs7Ozs7OztJQVFuRzs7SUFFQSxJQUFJLFdBQVc7SUFDZixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxlQUFlO1lBQ3JFLFlBQVksY0FBYztXQUMzQixVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsbUNBQW1DLFlBQVc7O2dCQUVuRCxJQUFJLDRCQUF5QjtvQkFBRSxLQUFFO29CQUFFLGtDQUErQjtvQkFBRSxpQkFBYztvQkFBRSxVQUFPOzs7Z0JBRzNGLFdBQVcsT0FBTyxZQUFZOzs7OztnQkFLOUIsV0FBVyxPQUFPLFVBQVMsTUFBTSw2QkFBNkIsa0JBQWtCLG1DQUFtQzs7b0JBRS9HLGlCQUFpQjtvQkFDakIsa0NBQWtDO29CQUNsQyw0QkFBNEI7b0JBQzVCLFVBQVUsSUFBSSxnQ0FBZ0MsSUFBSSwyQkFBMkIsSUFBSTs7O2dCQUdyRixTQUFTLG9CQUFvQixZQUFXO29CQUNwQyxHQUFHLGtFQUFrRSxZQUFXO3dCQUM1RSxJQUFNLFdBQVc7NEJBQ2IsSUFBSTs0QkFDSixVQUFVOzt3QkFFZCxRQUFRLHVCQUF1Qjt3QkFDL0IsT0FBTyxRQUFRLGtCQUFrQixRQUFRO3dCQUN6QyxRQUFRLGlCQUFpQixVQUFVLFlBQUs7d0JBQ3hDLE9BQU8sUUFBUSx1QkFBdUIsZ0JBQWdCLFFBQVEsUUFBUTt3QkFDdEUsT0FBTyxRQUFRLGtCQUFrQixRQUFROzs7b0JBRzdDLEdBQUcsMENBQTBDLFlBQVc7d0JBQ3BELElBQU0sV0FBVzs0QkFDYixJQUFJOzRCQUNKLFVBQVUsQ0FBQyxFQUFDLElBQUksT0FBTyxXQUFXOzt3QkFFdEMsUUFBUSx1QkFBdUI7d0JBQy9CLE9BQU8sUUFBUSxrQkFBa0IsUUFBUTt3QkFDekMsUUFBUSxpQkFBaUIsVUFBVSxZQUFLO3dCQUN4QyxPQUFPLFFBQVEsdUJBQXVCLGdCQUFnQixRQUFRLFFBQVE7d0JBQ3RFLE9BQU8sUUFBUSxrQkFBa0IsUUFBUTs7O29CQUc3QyxHQUFHLGlFQUFpRSxZQUFXO3dCQUMzRSxJQUFNLFdBQVc7NEJBQ2IsSUFBSTs0QkFDSixVQUFVLENBQUMsRUFBQyxJQUFJLE9BQU8sV0FBVyxVQUFTLEVBQUMsSUFBSSxRQUFRLFdBQVc7O3dCQUV2RSxRQUFRLHVCQUF1Qjt3QkFDL0IsT0FBTyxRQUFRLGtCQUFrQixRQUFRO3dCQUN6QyxRQUFRLGlCQUFpQixVQUFVLFlBQUs7d0JBQ3hDLE9BQU8sUUFBUSx1QkFBdUIsZ0JBQWdCLFFBQVEsUUFBUTt3QkFDdEUsT0FBTyxRQUFRLGtCQUFrQixRQUFROzs7O2dCQUlqRCxTQUFTLDBCQUEwQixZQUFXO29CQUMxQyxHQUFHLHVEQUF1RCxZQUFXO3dCQUNqRSxJQUFNLFdBQVc7NEJBQ2IsSUFBSTs0QkFDSixVQUFVLENBQUMsRUFBQyxJQUFJLFFBQVEsV0FBVyxVQUFTLEVBQUMsSUFBSSxTQUFTLFdBQVc7O3dCQUV6RSxRQUFRLHVCQUF1Qjt3QkFDL0IsUUFBUSxzQkFBc0I7d0JBQzlCLE9BQU8sUUFBUSxzQkFBc0IsZ0JBQWdCLFFBQVEsUUFBUTs7d0JBRXJFLFFBQVEsaUJBQWlCLFVBQVUsWUFBSzt3QkFDeEMsUUFBUSx1QkFBdUIsU0FBUyxTQUFTLElBQUk7O3dCQUVyRCxPQUFPLFFBQVEsc0JBQXNCLGdCQUFnQixRQUFRLFFBQVE7d0JBQ3JFLE9BQU8sUUFBUSxrQkFBa0IsUUFBUTs7Ozs7O0dBaUJsRCIsImZpbGUiOiJwYW0vUGFtSWRlbnRpdHlTZWxlY3Rpb25TdGVwSGFuZGxlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcGFtTW9kdWxlIGZyb20gJ3BhbS9QYW1Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUGFtSWRlbnRpdHlTZWxlY3Rpb25TdGVwSGFuZGxlci5cbiAqL1xuZGVzY3JpYmUoJ1BhbUlkZW50aXR5U2VsZWN0aW9uU3RlcEhhbmRsZXInLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBwYW1JZGVudGl0eVN1Z2dlc3RTZXJ2aWNlLCAkcSwgUGFtSWRlbnRpdHlTZWxlY3Rpb25TdGVwSGFuZGxlciwgU2VsZWN0aW9uTW9kZWwsIGhhbmRsZXI7XG5cbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlIGFuZCBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSwgcGFtTW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBJbmplY3QgdGhlIGRlcGVuZGVuY2llcyBhbmQgc2V0dXAgbW9ja3MuXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRxXywgX3BhbUlkZW50aXR5U3VnZ2VzdFNlcnZpY2VfLCBfU2VsZWN0aW9uTW9kZWxfLCBfUGFtSWRlbnRpdHlTZWxlY3Rpb25TdGVwSGFuZGxlcl8pIHtcblxuICAgICAgICBTZWxlY3Rpb25Nb2RlbCA9IF9TZWxlY3Rpb25Nb2RlbF87XG4gICAgICAgIFBhbUlkZW50aXR5U2VsZWN0aW9uU3RlcEhhbmRsZXIgPSBfUGFtSWRlbnRpdHlTZWxlY3Rpb25TdGVwSGFuZGxlcl87XG4gICAgICAgIHBhbUlkZW50aXR5U3VnZ2VzdFNlcnZpY2UgPSBfcGFtSWRlbnRpdHlTdWdnZXN0U2VydmljZV87XG4gICAgICAgIGhhbmRsZXIgPSBuZXcgUGFtSWRlbnRpdHlTZWxlY3Rpb25TdGVwSGFuZGxlcigkcSwgcGFtSWRlbnRpdHlTdWdnZXN0U2VydmljZSwge30sIFNlbGVjdGlvbk1vZGVsKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnb25JZGVudGl0eVNlbGVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnZG9lcyBub3QgYWRkIGFuIGlkZW50aXR5IHRvIHRoZSBzZWxlY3Rpb25Nb2RlbCB3aXRoIDAgYWNjb3VudHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkZW50aXR5ID0ge1xuICAgICAgICAgICAgICAgIGlkOiAndGVzdCcsXG4gICAgICAgICAgICAgICAgYWNjb3VudHM6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaGFuZGxlci5pZGVudGl0eVNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgaGFuZGxlci5vbklkZW50aXR5U2VsZWN0KGlkZW50aXR5LCAoKT0+IHt9KTtcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLmlkZW50aXR5U2VsZWN0aW9uTW9kZWwuZ2V0U2VsZWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLmlzU2F2ZURpc2FibGVkKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIGFuIGlkZW50aXR5IHRvIHRoZSBzZWxlY3Rpb25Nb2RlbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgaWRlbnRpdHkgPSB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0ZXN0JyxcbiAgICAgICAgICAgICAgICBhY2NvdW50czogW3tpZDogJzEyMycsIGFjY291bnRJZDogJ2JsYWgnfV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBoYW5kbGVyLmlkZW50aXR5U2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLmlzU2F2ZURpc2FibGVkKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBoYW5kbGVyLm9uSWRlbnRpdHlTZWxlY3QoaWRlbnRpdHksICgpPT4ge30pO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuaWRlbnRpdHlTZWxlY3Rpb25Nb2RlbC5nZXRTZWxlY3Rpb25zKCkubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuaXNTYXZlRGlzYWJsZWQoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIGFuIGlkZW50aXR5IHdpdGggbXVsdGlwbGUgYWNjb3VudHMgdG8gdGhlIHNlbGVjdGlvbk1vZGVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBpZGVudGl0eSA9IHtcbiAgICAgICAgICAgICAgICBpZDogJ3Rlc3QnLFxuICAgICAgICAgICAgICAgIGFjY291bnRzOiBbe2lkOiAnMTIzJywgYWNjb3VudElkOiAnYmxhaCd9LCB7aWQ6ICcxMjM0JywgYWNjb3VudElkOiAnYmxhaCBhcyB3ZWxsJ31dXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaGFuZGxlci5pZGVudGl0eVNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgaGFuZGxlci5vbklkZW50aXR5U2VsZWN0KGlkZW50aXR5LCAoKT0+IHt9KTtcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLmlkZW50aXR5U2VsZWN0aW9uTW9kZWwuZ2V0U2VsZWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLmlzU2F2ZURpc2FibGVkKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RvZ2dsZUFjY291bnRTZWxlY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2VuYWJsZXMgdGhlIHNhdmUgYnV0dG9uIHdoZW4gYW4gYWNjb3VudCBpcyBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgaWRlbnRpdHkgPSB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0ZXN0JyxcbiAgICAgICAgICAgICAgICBhY2NvdW50czogW3tpZDogJ2JsYWgnLCBhY2NvdW50SWQ6ICdibGFoJ30sIHtpZDogJ2JsYWgyJywgYWNjb3VudElkOiAnYmxhaCBhcyB3ZWxsJ31dXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaGFuZGxlci5pZGVudGl0eVNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICBoYW5kbGVyLmFjY291bnRTZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuYWNjb3VudFNlbGVjdGlvbk1vZGVsLmdldFNlbGVjdGlvbnMoKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG5cbiAgICAgICAgICAgIGhhbmRsZXIub25JZGVudGl0eVNlbGVjdChpZGVudGl0eSwgKCk9PiB7fSk7XG4gICAgICAgICAgICBoYW5kbGVyLnRvZ2dsZUFjY291bnRTZWxlY3Rpb24oaWRlbnRpdHkuYWNjb3VudHNbMF0sIGlkZW50aXR5KTtcblxuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuYWNjb3VudFNlbGVjdGlvbk1vZGVsLmdldFNlbGVjdGlvbnMoKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
