System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule'], function (_export) {

    /**
     * Tests for the ProvisioningTarget model object.
     */
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }],
        execute: function () {
            describe('ProvisioningTarget', function () {
                var accountData = [{
                    instance: 'tedsAccount',
                    nativeIdentity: 'ted',
                    displayName: 'Ted Tacular'
                }, {
                    instance: 'tedsAlt',
                    nativeIdentity: 'alted',
                    displayName: 'Ted A Tacular'
                }, {
                    instance: 'ted.e.bear',
                    nativeIdentity: 'bearted',
                    displayName: 'Ted B Tacular'
                }, {
                    instance: 'tedders',
                    nativeIdentity: 'tedded',
                    displayName: 'Ted S Tacular'
                }],
                    provisioningTargetData = {
                    applicationId: 'appId',
                    applicationName: 'appName',
                    roleName: 'Boss',
                    allowCreate: false,
                    accountInfos: accountData
                },
                    ProvisioningTarget,
                    AccountInfo,
                    provisioningTarget;

                // Use the access request module.
                beforeEach(module(accessRequestModule));

                /**
                 * Setup the ProvisioningTarget class and create some data to test with.
                 */
                beforeEach(inject(function (_ProvisioningTarget_, _AccountInfo_) {
                    ProvisioningTarget = _ProvisioningTarget_;
                    AccountInfo = _AccountInfo_;
                    provisioningTarget = new ProvisioningTarget(provisioningTargetData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new ProvisioningTarget(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new ProvisioningTarget('hi mom');
                    }).toThrow();
                    expect(function () {
                        new ProvisioningTarget(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('copies through copy contsructor', function () {
                    var copy;
                    provisioningTarget.setCreateAccount(true);
                    copy = new ProvisioningTarget(provisioningTarget);
                    expect(copy.getApplicationId()).toEqual(provisioningTarget.getApplicationId());
                    expect(copy.getApplicationName()).toEqual(provisioningTarget.getApplicationName());
                    expect(copy.getRoleName()).toEqual(provisioningTarget.getRoleName());
                    expect(copy.isAllowCreate()).toEqual(provisioningTarget.isAllowCreate());
                    expect(copy.isCreateAccount()).toEqual(provisioningTarget.isCreateAccount());

                    // These are different objects.
                    expect(copy.getAccountInfos()).not.toBe(provisioningTarget.getAccountInfos());
                    expect(copy.getAccountInfos().length).toEqual(provisioningTarget.getAccountInfos().length);

                    // do not copy selected accounts
                    expect(copy.getSelectedAccount()).not.toBeDefined();
                });

                it('clones itself', function () {
                    var cloned = provisioningTarget.clone();
                    expect(cloned.getApplicationId()).toEqual(provisioningTarget.getApplicationId());
                    expect(cloned.getApplicationName()).toEqual(provisioningTarget.getApplicationName());
                    expect(cloned.getRoleName()).toEqual(provisioningTarget.getRoleName());
                    expect(cloned.isAllowCreate()).toEqual(provisioningTarget.isAllowCreate());
                    expect(cloned.isCreateAccount()).toEqual(provisioningTarget.isCreateAccount());
                    expect(cloned.getSelectedAccount()).toEqual(provisioningTarget.getSelectedAccount());

                    // These are different objects.
                    expect(cloned.getAccountInfos()).not.toBe(provisioningTarget.getAccountInfos());
                    expect(cloned.getAccountInfos().length).toEqual(provisioningTarget.getAccountInfos().length);
                });

                it('returns an applicationId read from data', function () {
                    expect(provisioningTarget.getApplicationId()).toEqual(provisioningTargetData.applicationId);
                });

                it('returns an applicationName read from data', function () {
                    expect(provisioningTarget.getApplicationName()).toEqual(provisioningTargetData.applicationName);
                });

                it('returns a roleName read from data', function () {
                    expect(provisioningTarget.getRoleName()).toEqual(provisioningTargetData.roleName);
                });

                it('returns accountInfos read from data', function () {
                    var infos = provisioningTarget.getAccountInfos();
                    expect(angular.isArray(infos)).toBeTruthy();
                    expect(infos[0] instanceof AccountInfo).toBeTruthy();
                    expect(infos[1] instanceof AccountInfo).toBeTruthy();
                    expect(infos[2] instanceof AccountInfo).toBeTruthy();
                    expect(infos[3] instanceof AccountInfo).toBeTruthy();
                });

                it('nulls createAccount when selecting an account', function () {
                    var accountToSelect = provisioningTarget.getAccountInfos()[0];
                    expect(provisioningTarget.isCreateAccount()).toBeFalsy();
                    expect(provisioningTarget.getSelectedAccount()).not.toBeDefined();
                    provisioningTarget.selectAccount(accountToSelect);
                    expect(provisioningTarget.isCreateAccount()).toBeFalsy();
                    expect(provisioningTarget.getSelectedAccount()).toEqual(accountToSelect);
                });

                it('nulls selectedAccount when creating an account', function () {
                    expect(provisioningTarget.isCreateAccount()).toBeFalsy();
                    expect(provisioningTarget.getSelectedAccount()).not.toBeDefined();
                    provisioningTarget.setCreateAccount(true);
                    expect(provisioningTarget.isCreateAccount()).toBeTruthy();
                    expect(provisioningTarget.getSelectedAccount()).toEqual(null);
                });

                it('doesnt null selectedAccount when setting create account to false', function () {
                    var accountToSelect = provisioningTarget.getAccountInfos()[0];
                    expect(provisioningTarget.isCreateAccount()).toBeFalsy();
                    expect(provisioningTarget.getSelectedAccount()).not.toBeDefined();
                    provisioningTarget.selectAccount(accountToSelect);
                    expect(provisioningTarget.isCreateAccount()).toBeFalsy();
                    expect(provisioningTarget.getSelectedAccount()).toEqual(accountToSelect);
                    provisioningTarget.setCreateAccount(false);
                    expect(provisioningTarget.isCreateAccount()).toBeFalsy();
                    expect(provisioningTarget.getSelectedAccount()).toEqual(accountToSelect);
                });

                describe('clear()', function () {
                    function checkCleared() {
                        expect(provisioningTarget.isCreateAccount()).toBeFalsy();
                        expect(provisioningTarget.getSelectedAccount()).toBeFalsy();
                    }

                    it('does nothing if no selection is made', function () {
                        provisioningTarget.clear();
                        checkCleared();
                    });

                    it('clears a selected account', function () {
                        var accountToSelect = provisioningTarget.getAccountInfos()[0];
                        provisioningTarget.selectAccount(accountToSelect);

                        provisioningTarget.clear();
                        checkCleared();
                    });

                    it('clears the create account option', function () {
                        provisioningTarget.setCreateAccount(true);

                        provisioningTarget.clear();
                        checkCleared();
                    });
                });

                describe('hasSelection()', function () {
                    it('returns false if nothing has been selected', function () {
                        expect(provisioningTarget.hasSelection()).toEqual(false);
                    });

                    it('returns false if selection has been cleared', function () {
                        var acct = provisioningTarget.getAccountInfos()[0];
                        provisioningTarget.selectAccount(acct);
                        provisioningTarget.clear();

                        expect(provisioningTarget.hasSelection()).toEqual(false);
                    });

                    it('returns true if an account has been selected', function () {
                        var acct = provisioningTarget.getAccountInfos()[0];
                        provisioningTarget.selectAccount(acct);

                        expect(provisioningTarget.hasSelection()).toEqual(true);
                    });

                    it('returns true if create account has been selected', function () {
                        provisioningTarget.setCreateAccount(true);

                        expect(provisioningTarget.hasSelection()).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvbW9kZWwvUHJvdmlzaW9uaW5nVGFyZ2V0VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNDQUFzQyxVQUFVLFNBQVM7Ozs7O0lBS2pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZO1lBTjdCLFNBQVMsc0JBQXNCLFlBQVc7Z0JBQ3RDLElBQUksY0FBYyxDQUNkO29CQUNJLFVBQVU7b0JBQ1YsZ0JBQWdCO29CQUNoQixhQUFhO21CQUVqQjtvQkFDSSxVQUFVO29CQUNWLGdCQUFnQjtvQkFDaEIsYUFBYTttQkFFakI7b0JBQ0ksVUFBVTtvQkFDVixnQkFBZ0I7b0JBQ2hCLGFBQWE7bUJBRWpCO29CQUNJLFVBQVU7b0JBQ1YsZ0JBQWdCO29CQUNoQixhQUFhOztvQkFHckIseUJBQXlCO29CQUNyQixlQUFlO29CQUNmLGlCQUFpQjtvQkFDakIsVUFBVTtvQkFDVixhQUFhO29CQUNiLGNBQWM7O29CQUVsQjtvQkFDQTtvQkFDQTs7O2dCQUdBLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLHNCQUFzQixlQUFlO29CQUM1RCxxQkFBcUI7b0JBQ3JCLGNBQWM7b0JBQ2QscUJBQXFCLElBQUksbUJBQW1COzs7Z0JBR2hELEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELE9BQU8sWUFBVzt3QkFBRSxJQUFJLG1CQUFtQjt1QkFBVTs7O2dCQUd6RCxHQUFHLGlFQUFpRSxZQUFXO29CQUMzRSxPQUFPLFlBQVc7d0JBQUUsSUFBSSxtQkFBbUI7dUJBQWM7b0JBQ3pELE9BQU8sWUFBVzt3QkFBRSxJQUFJLG1CQUFtQixZQUFXOzRCQUFFLE9BQU87O3VCQUFvQjs7O2dCQUd2RixHQUFHLG1DQUFtQyxZQUFXO29CQUM3QyxJQUFJO29CQUNK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Q0FBd0MsWUFBVzt3QkFDbEQsbUJBQW1CO3dCQUNuQjs7O29CQUdKLEdBQUcsNkJBQTZCLFlBQVc7d0JBQ3ZDLElBQUksa0JBQWtCLG1CQUFtQixrQkFBa0I7d0JBQzNELG1CQUFtQixjQUFjOzt3QkFFakMsbUJBQW1CO3dCQUNuQjs7O29CQUdKLEdBQUcsb0NBQW9DLFlBQVc7d0JBQzlDLG1CQUFtQixpQkFBaUI7O3dCQUVwQyxtQkFBbUI7d0JBQ25COzs7O2dCQUlSLFNBQVMsa0JBQWtCLFlBQVc7b0JBQ2xDLEdBQUcsOENBQThDLFlBQVc7d0JBQ3hELE9BQU8sbUJBQW1CLGdCQUFnQixRQUFROzs7b0JBR3RELEdBQUcsK0NBQStDLFlBQVc7d0JBQ3pELElBQUksT0FBTyxtQkFBbUIsa0JBQWtCO3dCQUNoRCxtQkFBbUIsY0FBYzt3QkFDakMsbUJBQW1COzt3QkFFbkIsT0FBTyxtQkFBbUIsZ0JBQWdCLFFBQVE7OztvQkFHdEQsR0FBRyxnREFBZ0QsWUFBVzt3QkFDMUQsSUFBSSxPQUFPLG1CQUFtQixrQkFBa0I7d0JBQ2hELG1CQUFtQixjQUFjOzt3QkFFakMsT0FBTyxtQkFBbUIsZ0JBQWdCLFFBQVE7OztvQkFHdEQsR0FBRyxvREFBb0QsWUFBVzt3QkFDOUQsbUJBQW1CLGlCQUFpQjs7d0JBRXBDLE9BQU8sbUJBQW1CLGdCQUFnQixRQUFROzs7Ozs7R0FnQjNEIiwiZmlsZSI6ImFjY2Vzc1JlcXVlc3QvbW9kZWwvUHJvdmlzaW9uaW5nVGFyZ2V0VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIFByb3Zpc2lvbmluZ1RhcmdldCBtb2RlbCBvYmplY3QuXHJcbiAqL1xyXG5kZXNjcmliZSgnUHJvdmlzaW9uaW5nVGFyZ2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgYWNjb3VudERhdGEgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnN0YW5jZTogJ3RlZHNBY2NvdW50JyxcclxuICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICd0ZWQnLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1RlZCBUYWN1bGFyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnN0YW5jZTogJ3RlZHNBbHQnLFxyXG4gICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ2FsdGVkJyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdUZWQgQSBUYWN1bGFyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnN0YW5jZTogJ3RlZC5lLmJlYXInLFxyXG4gICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ2JlYXJ0ZWQnLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1RlZCBCIFRhY3VsYXInXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlOiAndGVkZGVycycsXHJcbiAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAndGVkZGVkJyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdUZWQgUyBUYWN1bGFyJ1xyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICBwcm92aXNpb25pbmdUYXJnZXREYXRhID0ge1xyXG4gICAgICAgIGFwcGxpY2F0aW9uSWQ6ICdhcHBJZCcsXHJcbiAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnYXBwTmFtZScsXHJcbiAgICAgICAgcm9sZU5hbWU6ICdCb3NzJyxcclxuICAgICAgICBhbGxvd0NyZWF0ZTogZmFsc2UsXHJcbiAgICAgICAgYWNjb3VudEluZm9zOiBhY2NvdW50RGF0YVxyXG4gICAgfSxcclxuICAgIFByb3Zpc2lvbmluZ1RhcmdldCxcclxuICAgIEFjY291bnRJbmZvLFxyXG4gICAgcHJvdmlzaW9uaW5nVGFyZ2V0O1xyXG5cclxuICAgIC8vIFVzZSB0aGUgYWNjZXNzIHJlcXVlc3QgbW9kdWxlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIFByb3Zpc2lvbmluZ1RhcmdldCBjbGFzcyBhbmQgY3JlYXRlIHNvbWUgZGF0YSB0byB0ZXN0IHdpdGguXHJcbiAgICAgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9Qcm92aXNpb25pbmdUYXJnZXRfLCBfQWNjb3VudEluZm9fKSB7XHJcbiAgICAgICAgUHJvdmlzaW9uaW5nVGFyZ2V0ID0gX1Byb3Zpc2lvbmluZ1RhcmdldF87XHJcbiAgICAgICAgQWNjb3VudEluZm8gPSBfQWNjb3VudEluZm9fO1xyXG4gICAgICAgIHByb3Zpc2lvbmluZ1RhcmdldCA9IG5ldyBQcm92aXNpb25pbmdUYXJnZXQocHJvdmlzaW9uaW5nVGFyZ2V0RGF0YSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgaXQoJ3JlcXVpcmVzIG5vbi1udWxsIGRhdGEgaW4gdGhlIGNvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgUHJvdmlzaW9uaW5nVGFyZ2V0KG51bGwpOyB9KS50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgndGhyb3dzIGlmIHRoZSBkYXRhIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFByb3Zpc2lvbmluZ1RhcmdldCgnaGkgbW9tJyk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBQcm92aXNpb25pbmdUYXJnZXQoZnVuY3Rpb24oKSB7IHJldHVybiAnd2hhdCB0aGE/JzsgfSk7IH0pLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdjb3BpZXMgdGhyb3VnaCBjb3B5IGNvbnRzcnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNvcHk7XHJcbiAgICAgICAgcHJvdmlzaW9uaW5nVGFyZ2V0LnNldENyZWF0ZUFjY291bnQodHJ1ZSk7XHJcbiAgICAgICAgY29weSA9IG5ldyBQcm92aXNpb25pbmdUYXJnZXQocHJvdmlzaW9uaW5nVGFyZ2V0KTtcclxuICAgICAgICBleHBlY3QoY29weS5nZXRBcHBsaWNhdGlvbklkKCkpLnRvRXF1YWwocHJvdmlzaW9uaW5nVGFyZ2V0LmdldEFwcGxpY2F0aW9uSWQoKSk7XHJcbiAgICAgICAgZXhwZWN0KGNvcHkuZ2V0QXBwbGljYXRpb25OYW1lKCkpLnRvRXF1YWwocHJvdmlzaW9uaW5nVGFyZ2V0LmdldEFwcGxpY2F0aW9uTmFtZSgpKTtcclxuICAgICAgICBleHBlY3QoY29weS5nZXRSb2xlTmFtZSgpKS50b0VxdWFsKHByb3Zpc2lvbmluZ1RhcmdldC5nZXRSb2xlTmFtZSgpKTtcclxuICAgICAgICBleHBlY3QoY29weS5pc0FsbG93Q3JlYXRlKCkpLnRvRXF1YWwocHJvdmlzaW9uaW5nVGFyZ2V0LmlzQWxsb3dDcmVhdGUoKSk7XHJcbiAgICAgICAgZXhwZWN0KGNvcHkuaXNDcmVhdGVBY2NvdW50KCkpLnRvRXF1YWwocHJvdmlzaW9uaW5nVGFyZ2V0LmlzQ3JlYXRlQWNjb3VudCgpKTtcclxuXHJcbiAgICAgICAgLy8gVGhlc2UgYXJlIGRpZmZlcmVudCBvYmplY3RzLlxyXG4gICAgICAgIGV4cGVjdChjb3B5LmdldEFjY291bnRJbmZvcygpKS5ub3QudG9CZShwcm92aXNpb25pbmdUYXJnZXQuZ2V0QWNjb3VudEluZm9zKCkpO1xyXG4gICAgICAgIGV4cGVjdChjb3B5LmdldEFjY291bnRJbmZvcygpLmxlbmd0aCkudG9FcXVhbChwcm92aXNpb25pbmdUYXJnZXQuZ2V0QWNjb3VudEluZm9zKCkubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy8gZG8gbm90IGNvcHkgc2VsZWN0ZWQgYWNjb3VudHNcclxuICAgICAgICBleHBlY3QoY29weS5nZXRTZWxlY3RlZEFjY291bnQoKSkubm90LnRvQmVEZWZpbmVkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnY2xvbmVzIGl0c2VsZicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjbG9uZWQgPSBwcm92aXNpb25pbmdUYXJnZXQuY2xvbmUoKTtcclxuICAgICAgICBleHBlY3QoY2xvbmVkLmdldEFwcGxpY2F0aW9uSWQoKSkudG9FcXVhbChwcm92aXNpb25pbmdUYXJnZXQuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBleHBlY3QoY2xvbmVkLmdldEFwcGxpY2F0aW9uTmFtZSgpKS50b0VxdWFsKHByb3Zpc2lvbmluZ1RhcmdldC5nZXRBcHBsaWNhdGlvbk5hbWUoKSk7XHJcbiAgICAgICAgZXhwZWN0KGNsb25lZC5nZXRSb2xlTmFtZSgpKS50b0VxdWFsKHByb3Zpc2lvbmluZ1RhcmdldC5nZXRSb2xlTmFtZSgpKTtcclxuICAgICAgICBleHBlY3QoY2xvbmVkLmlzQWxsb3dDcmVhdGUoKSkudG9FcXVhbChwcm92aXNpb25pbmdUYXJnZXQuaXNBbGxvd0NyZWF0ZSgpKTtcclxuICAgICAgICBleHBlY3QoY2xvbmVkLmlzQ3JlYXRlQWNjb3VudCgpKS50b0VxdWFsKHByb3Zpc2lvbmluZ1RhcmdldC5pc0NyZWF0ZUFjY291bnQoKSk7XHJcbiAgICAgICAgZXhwZWN0KGNsb25lZC5nZXRTZWxlY3RlZEFjY291bnQoKSkudG9FcXVhbChwcm92aXNpb25pbmdUYXJnZXQuZ2V0U2VsZWN0ZWRBY2NvdW50KCkpO1xyXG5cclxuICAgICAgICAvLyBUaGVzZSBhcmUgZGlmZmVyZW50IG9iamVjdHMuXHJcbiAgICAgICAgZXhwZWN0KGNsb25lZC5nZXRBY2NvdW50SW5mb3MoKSkubm90LnRvQmUocHJvdmlzaW9uaW5nVGFyZ2V0LmdldEFjY291bnRJbmZvcygpKTtcclxuICAgICAgICBleHBlY3QoY2xvbmVkLmdldEFjY291bnRJbmZvcygpLmxlbmd0aCkudG9FcXVhbChwcm92aXNpb25pbmdUYXJnZXQuZ2V0QWNjb3VudEluZm9zKCkubGVuZ3RoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGFuIGFwcGxpY2F0aW9uSWQgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVGFyZ2V0LmdldEFwcGxpY2F0aW9uSWQoKSkudG9FcXVhbChwcm92aXNpb25pbmdUYXJnZXREYXRhLmFwcGxpY2F0aW9uSWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgYW4gYXBwbGljYXRpb25OYW1lIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RhcmdldC5nZXRBcHBsaWNhdGlvbk5hbWUoKSkudG9FcXVhbChwcm92aXNpb25pbmdUYXJnZXREYXRhLmFwcGxpY2F0aW9uTmFtZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBhIHJvbGVOYW1lIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RhcmdldC5nZXRSb2xlTmFtZSgpKS50b0VxdWFsKHByb3Zpc2lvbmluZ1RhcmdldERhdGEucm9sZU5hbWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgYWNjb3VudEluZm9zIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGluZm9zID0gcHJvdmlzaW9uaW5nVGFyZ2V0LmdldEFjY291bnRJbmZvcygpO1xyXG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmlzQXJyYXkoaW5mb3MpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgZXhwZWN0KGluZm9zWzBdIGluc3RhbmNlb2YgQWNjb3VudEluZm8pLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICBleHBlY3QoaW5mb3NbMV0gaW5zdGFuY2VvZiBBY2NvdW50SW5mbykudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIGV4cGVjdChpbmZvc1syXSBpbnN0YW5jZW9mIEFjY291bnRJbmZvKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgZXhwZWN0KGluZm9zWzNdIGluc3RhbmNlb2YgQWNjb3VudEluZm8pLnRvQmVUcnV0aHkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdudWxscyBjcmVhdGVBY2NvdW50IHdoZW4gc2VsZWN0aW5nIGFuIGFjY291bnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYWNjb3VudFRvU2VsZWN0ID0gcHJvdmlzaW9uaW5nVGFyZ2V0LmdldEFjY291bnRJbmZvcygpWzBdO1xyXG4gICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUYXJnZXQuaXNDcmVhdGVBY2NvdW50KCkpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUYXJnZXQuZ2V0U2VsZWN0ZWRBY2NvdW50KCkpLm5vdC50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgIHByb3Zpc2lvbmluZ1RhcmdldC5zZWxlY3RBY2NvdW50KGFjY291bnRUb1NlbGVjdCk7XHJcbiAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RhcmdldC5pc0NyZWF0ZUFjY291bnQoKSkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RhcmdldC5nZXRTZWxlY3RlZEFjY291bnQoKSkudG9FcXVhbChhY2NvdW50VG9TZWxlY3QpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ251bGxzIHNlbGVjdGVkQWNjb3VudCB3aGVuIGNyZWF0aW5nIGFuIGFjY291bnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVGFyZ2V0LmlzQ3JlYXRlQWNjb3VudCgpKS50b0JlRmFsc3koKTtcclxuICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVGFyZ2V0LmdldFNlbGVjdGVkQWNjb3VudCgpKS5ub3QudG9CZURlZmluZWQoKTtcclxuICAgICAgICBwcm92aXNpb25pbmdUYXJnZXQuc2V0Q3JlYXRlQWNjb3VudCh0cnVlKTtcclxuICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVGFyZ2V0LmlzQ3JlYXRlQWNjb3VudCgpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RhcmdldC5nZXRTZWxlY3RlZEFjY291bnQoKSkudG9FcXVhbChudWxsKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkb2VzbnQgbnVsbCBzZWxlY3RlZEFjY291bnQgd2hlbiBzZXR0aW5nIGNyZWF0ZSBhY2NvdW50IHRvIGZhbHNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGFjY291bnRUb1NlbGVjdCA9IHByb3Zpc2lvbmluZ1RhcmdldC5nZXRBY2NvdW50SW5mb3MoKVswXTtcclxuICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVGFyZ2V0LmlzQ3JlYXRlQWNjb3VudCgpKS50b0JlRmFsc3koKTtcclxuICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVGFyZ2V0LmdldFNlbGVjdGVkQWNjb3VudCgpKS5ub3QudG9CZURlZmluZWQoKTtcclxuICAgICAgICBwcm92aXNpb25pbmdUYXJnZXQuc2VsZWN0QWNjb3VudChhY2NvdW50VG9TZWxlY3QpO1xyXG4gICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUYXJnZXQuaXNDcmVhdGVBY2NvdW50KCkpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUYXJnZXQuZ2V0U2VsZWN0ZWRBY2NvdW50KCkpLnRvRXF1YWwoYWNjb3VudFRvU2VsZWN0KTtcclxuICAgICAgICBwcm92aXNpb25pbmdUYXJnZXQuc2V0Q3JlYXRlQWNjb3VudChmYWxzZSk7XHJcbiAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RhcmdldC5pc0NyZWF0ZUFjY291bnQoKSkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RhcmdldC5nZXRTZWxlY3RlZEFjY291bnQoKSkudG9FcXVhbChhY2NvdW50VG9TZWxlY3QpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NsZWFyKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBmdW5jdGlvbiBjaGVja0NsZWFyZWQoKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUYXJnZXQuaXNDcmVhdGVBY2NvdW50KCkpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVGFyZ2V0LmdldFNlbGVjdGVkQWNjb3VudCgpKS50b0JlRmFsc3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgbm8gc2VsZWN0aW9uIGlzIG1hZGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcHJvdmlzaW9uaW5nVGFyZ2V0LmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGNoZWNrQ2xlYXJlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2xlYXJzIGEgc2VsZWN0ZWQgYWNjb3VudCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYWNjb3VudFRvU2VsZWN0ID0gcHJvdmlzaW9uaW5nVGFyZ2V0LmdldEFjY291bnRJbmZvcygpWzBdO1xyXG4gICAgICAgICAgICBwcm92aXNpb25pbmdUYXJnZXQuc2VsZWN0QWNjb3VudChhY2NvdW50VG9TZWxlY3QpO1xyXG5cclxuICAgICAgICAgICAgcHJvdmlzaW9uaW5nVGFyZ2V0LmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGNoZWNrQ2xlYXJlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2xlYXJzIHRoZSBjcmVhdGUgYWNjb3VudCBvcHRpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcHJvdmlzaW9uaW5nVGFyZ2V0LnNldENyZWF0ZUFjY291bnQodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBwcm92aXNpb25pbmdUYXJnZXQuY2xlYXIoKTtcclxuICAgICAgICAgICAgY2hlY2tDbGVhcmVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaGFzU2VsZWN0aW9uKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBub3RoaW5nIGhhcyBiZWVuIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUYXJnZXQuaGFzU2VsZWN0aW9uKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBzZWxlY3Rpb24gaGFzIGJlZW4gY2xlYXJlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYWNjdCA9IHByb3Zpc2lvbmluZ1RhcmdldC5nZXRBY2NvdW50SW5mb3MoKVswXTtcclxuICAgICAgICAgICAgcHJvdmlzaW9uaW5nVGFyZ2V0LnNlbGVjdEFjY291bnQoYWNjdCk7XHJcbiAgICAgICAgICAgIHByb3Zpc2lvbmluZ1RhcmdldC5jbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RhcmdldC5oYXNTZWxlY3Rpb24oKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYW4gYWNjb3VudCBoYXMgYmVlbiBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYWNjdCA9IHByb3Zpc2lvbmluZ1RhcmdldC5nZXRBY2NvdW50SW5mb3MoKVswXTtcclxuICAgICAgICAgICAgcHJvdmlzaW9uaW5nVGFyZ2V0LnNlbGVjdEFjY291bnQoYWNjdCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVGFyZ2V0Lmhhc1NlbGVjdGlvbigpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGNyZWF0ZSBhY2NvdW50IGhhcyBiZWVuIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHByb3Zpc2lvbmluZ1RhcmdldC5zZXRDcmVhdGVBY2NvdW50KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RhcmdldC5oYXNTZWxlY3Rpb24oKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
