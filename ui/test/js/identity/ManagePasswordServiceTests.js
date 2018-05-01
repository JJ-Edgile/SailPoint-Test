System.register(['test/js/TestInitializer', 'identity/IdentityModule', './IdentityTestData'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */

    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_IdentityTestData) {}],
        execute: function () {

            /**
             * Tests for the managePasswordService.
             */
            describe('managePasswordService', function () {
                var quicklink = 'Manage%20Passwords';
                var baseURLManagePasswords = '/identityiq/ui/rest/quickLinks/' + quicklink + '/';
                var Identity = undefined,
                    PasswordChangeError = undefined,
                    managePasswordService = undefined,
                    identityTestData = undefined,
                    $httpBackend = undefined,
                    identity1 = undefined,
                    identity2 = undefined,
                    SelectionModel = undefined,
                    PasswordLink = undefined;

                // Use the identity module.
                beforeEach(module(identityModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                    $provide.constant('SP_CURR_USER_ID', '123');
                }));

                /* jshint maxparams: 8 */
                beforeEach(inject(function (_Identity_, _PasswordChangeError_, _managePasswordService_, _identityTestData_, _$httpBackend_, _SelectionModel_, _PasswordLink_) {
                    Identity = _Identity_;
                    PasswordChangeError = _PasswordChangeError_;
                    PasswordLink = _PasswordLink_;
                    managePasswordService = _managePasswordService_;
                    identityTestData = _identityTestData_;
                    $httpBackend = _$httpBackend_;
                    SelectionModel = _SelectionModel_;
                }));

                beforeEach(function () {
                    identity1 = new Identity(identityTestData.IDENTITY1);
                    identity2 = new Identity(identityTestData.IDENTITY2);
                });

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('submitPassword', function () {
                    var changeUrl = baseURLManagePasswords + 'identities/identityId/links/linkId/changePassword';
                    it('should call changePassword', function () {
                        var promise = undefined;
                        $httpBackend.expectPOST(changeUrl).respond(200, { object: { passwordChanges: [] } });
                        promise = managePasswordService.changePassword('identityId', 'linkId', 'newPassword', 'currentPassword', quicklink);
                        $httpBackend.flush();
                    });

                    it('should return a rejected promise whith PasswordChangeErrors when POST 400s', function () {
                        $httpBackend.expectPOST(changeUrl).respond(400, {
                            linkId: 'someLink',
                            link: new PasswordLink({
                                id: 'someLink',
                                accountId: 'teddy.brosevelt',
                                applicationName: 'brosDB'
                            }),
                            messages: ['message one', 'message two'],
                            constraintsViolation: true
                        });
                        var promise = managePasswordService.changePassword('identityId', 'linkId', 'newPassword', 'currentPassword', quicklink),
                            result = undefined;
                        promise['catch'](function (error) {
                            result = error;
                        });
                        $httpBackend.flush();
                        expect(result instanceof PasswordChangeError);
                        expect(result.isConstraintsViolation()).toBeTruthy();
                        expect(result.getMessages().length).toBe(2);
                        expect(result.getLinkId()).toBe('someLink');
                    });
                });

                describe('generatePassword', function () {
                    var generateUrl = baseURLManagePasswords + 'identities/identityId/links/linkId/generatePassword';

                    it('should call generatePassword', function () {
                        var promise = undefined;
                        $httpBackend.expectPOST(generateUrl).respond(200, { object: { passwordChanges: [] } });
                        promise = managePasswordService.generatePassword('identityId', 'linkId', quicklink);
                        $httpBackend.flush();
                    });

                    it('should return a rejected promise with PasswordChangeErrors when POST 400s', function () {
                        $httpBackend.expectPOST(generateUrl).respond(400, {
                            linkId: 'aDifferentLink',
                            link: new PasswordLink({
                                id: 'aDifferentLink',
                                accountId: 'teddy.brosevelt',
                                applicationName: 'brosDB'
                            }),
                            messages: ['generation failed'],
                            constraintsViolation: false
                        });
                        var promise = managePasswordService.generatePassword('identityId', 'linkId', quicklink),
                            result = undefined;
                        promise['catch'](function (error) {
                            result = error;
                        });
                        $httpBackend.flush();
                        expect(result instanceof PasswordChangeError);
                        expect(result.isConstraintsViolation()).toBeFalsy();
                        expect(result.getMessages().length).toBe(1);
                        expect(result.getLinkId()).toBe('aDifferentLink');
                    });
                });

                describe('isSelfService', function () {
                    it('should return true for selfService user', function () {
                        expect(managePasswordService.isSelfService('123')).toBeTruthy();
                    });

                    it('should return false for non-selfSerivce user', function () {
                        expect(managePasswordService.isSelfService('456')).toBeFalsy();
                    });
                });

                describe('mergeConstraints', function () {
                    var promise = undefined,
                        result = undefined,
                        mergeUrl = undefined,
                        selectionModel = undefined;

                    beforeEach(function () {
                        selectionModel = new SelectionModel();
                    });

                    it('should call mergeConstraints', function () {
                        mergeUrl = baseURLManagePasswords + 'identities/' + identity1.getId() + '/links/mergeConstraints';
                        $httpBackend.expectPOST(mergeUrl).respond(200, []);
                        promise = managePasswordService.mergeConstraints(selectionModel, identity1.getId(), quicklink);
                        $httpBackend.flush();
                    });

                    it('should return a rejected promise when POST 400s', function () {
                        mergeUrl = baseURLManagePasswords + 'identities/' + identity1.id + '/links/mergeConstraints';
                        $httpBackend.expectPOST(mergeUrl).respond(400, ['merge failed']);
                        promise = managePasswordService.mergeConstraints(selectionModel, identity1.getId(), quicklink);
                        promise['catch'](function (error) {
                            result = error;
                        });
                        $httpBackend.flush();
                        expect(angular.isArray(result));
                    });
                });

                describe('synchronize password', function () {
                    var promise = undefined,
                        result = undefined,
                        syncUrl = undefined,
                        selectionModel = undefined,
                        newPassword = '1234',
                        linkPasswordMap = [];

                    beforeEach(function () {
                        selectionModel = new SelectionModel();
                    });

                    it('should call syncPasswords', function () {
                        syncUrl = baseURLManagePasswords + 'identities/' + identity1.getId() + '/links/synchronizePassword';
                        $httpBackend.expectPOST(syncUrl).respond(200, { object: { bulkChanges: [] } });
                        promise = managePasswordService.synchronizePassword(selectionModel, linkPasswordMap, newPassword, identity1.getId(), quicklink);
                        $httpBackend.flush();
                    });

                    it('should return a rejected promise when POST 400s', function () {
                        syncUrl = baseURLManagePasswords + 'identities/' + identity1.getId() + '/links/synchronizePassword';
                        $httpBackend.expectPOST(syncUrl).respond(400, ['synchronize passwords failed']);
                        promise = managePasswordService.synchronizePassword(selectionModel, linkPasswordMap, newPassword, identity1.getId(), quicklink);
                        promise['catch'](function (error) {
                            result = error;
                        });
                        $httpBackend.flush();
                        expect(angular.isArray(result));
                    });
                });

                describe('bulk generate password', function () {
                    var promise = undefined,
                        result = undefined,
                        syncUrl = undefined,
                        selectionModel = undefined;

                    beforeEach(function () {
                        selectionModel = new SelectionModel();
                    });

                    it('should call syncPasswords', function () {
                        syncUrl = baseURLManagePasswords + 'identities/' + identity1.getId() + '/links/generatePassword';
                        $httpBackend.expectPOST(syncUrl).respond(200, { object: { bulkChanges: [] } });
                        promise = managePasswordService.generatePasswords(selectionModel, identity1.getId(), false, quicklink);
                        $httpBackend.flush();
                    });

                    it('should return a rejected promise when POST 400s', function () {
                        syncUrl = baseURLManagePasswords + 'identities/' + identity1.getId() + '/links/generatePassword';
                        $httpBackend.expectPOST(syncUrl).respond(400, {});
                        promise = managePasswordService.generatePasswords(selectionModel, identity1.getId(), false, quicklink);
                        promise['catch'](function (error) {
                            result = error;
                        });
                        $httpBackend.flush();
                        expect(angular.isArray(result));
                    });
                });

                describe('get current password links', function () {
                    var promise = undefined,
                        currentUrl = undefined,
                        selectionModel = undefined;

                    beforeEach(function () {
                        selectionModel = new SelectionModel();
                    });

                    it('should call currentPasswordLinks', function () {
                        currentUrl = baseURLManagePasswords + 'identities/' + identity1.getId() + '/links/currentPasswordLinks';
                        $httpBackend.expectPOST(currentUrl).respond(200, [{ id: 'link1' }, { id: 'link2' }]);
                        promise = managePasswordService.getCurrentPasswordLinks(selectionModel, identity1.getId(), quicklink);
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L01hbmFnZVBhc3N3b3JkU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsdUJBQXVCLFVBQVUsU0FBUzs7Ozs7SUFLN0c7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsbUJBQW1CO1FBQ2hDLFNBQVMsWUFBWTs7Ozs7WUFEN0IsU0FBUyx5QkFBeUIsWUFBVztnQkFDekMsSUFBTSxZQUFZO2dCQUNsQixJQUFNLHlCQUFzQixvQ0FBcUMsWUFBUztnQkFDMUUsSUFBSSxXQUFRO29CQUFFLHNCQUFtQjtvQkFBRSx3QkFBcUI7b0JBQUUsbUJBQWdCO29CQUFFLGVBQVk7b0JBQ3BGLFlBQVM7b0JBQUUsWUFBUztvQkFBRSxpQkFBYztvQkFBRSxlQUFZOzs7Z0JBR3RELFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxtQkFBbUI7b0JBQ3JDLFNBQVMsU0FBUyxtQkFBbUI7Ozs7Z0JBSXpDLFdBQVcsT0FBTyxVQUFTLFlBQVksdUJBQXVCLHlCQUF5QixvQkFDNUQsZ0JBQWdCLGtCQUFrQixnQkFBZ0I7b0JBQ3pFLFdBQVc7b0JBQ1gsc0JBQXNCO29CQUN0QixlQUFlO29CQUNmLHdCQUF3QjtvQkFDeEIsbUJBQW1CO29CQUNuQixlQUFlO29CQUNmLGlCQUFpQjs7O2dCQUdyQixXQUFXLFlBQVc7b0JBQ2xCLFlBQVksSUFBSSxTQUFTLGlCQUFpQjtvQkFDMUMsWUFBWSxJQUFJLFNBQVMsaUJBQWlCOzs7Z0JBRzlDLFVBQVUsWUFBVztvQkFDakIsYUFBYTtvQkFDYixhQUFhOzs7Z0JBR2pCLFNBQVMsa0JBQWtCLFlBQVc7b0JBQ2xDLElBQUksWUFBWSx5QkFBeUI7b0JBQ3pDLEdBQUcsOEJBQThCLFlBQVc7d0JBQ3hDLElBQUksVUFBTzt3QkFDWCxhQUFhLFdBQVcsV0FBVyxRQUFRLEtBQUssRUFBQyxRQUFRLEVBQUMsaUJBQWlCO3dCQUMzRSxVQUFVLHNCQUFzQixlQUFlLGNBQWMsVUFBVSxlQUMvRCxtQkFBbUI7d0JBQzNCLGFBQWE7OztvQkFHakIsR0FBRyw4RUFBOEUsWUFBVzt3QkFDeEYsYUFBYSxXQUFXLFdBQVcsUUFBUSxLQUFLOzRCQUM1QyxRQUFROzRCQUNSLE1BQU0sSUFBSSxhQUFhO2dDQUNuQixJQUFJO2dDQUNKLFdBQVc7Z0NBQ1gsaUJBQWlCOzs0QkFFckIsVUFBVSxDQUFDLGVBQWU7NEJBQzFCLHNCQUFzQjs7d0JBRTFCLElBQUksVUFBVSxzQkFBc0IsZUFBZSxjQUFjLFVBQVUsZUFDdkUsbUJBQW1COzRCQUNuQixTQUFNO3dCQUNWLFFBQU8sU0FBTyxVQUFTLE9BQU87NEJBQzNCLFNBQVM7O3dCQUVaLGFBQWE7d0JBQ2IsT0FBTyxrQkFBa0I7d0JBQ3pCLE9BQU8sT0FBTywwQkFBMEI7d0JBQ3hDLE9BQU8sT0FBTyxjQUFjLFFBQVEsS0FBSzt3QkFDekMsT0FBTyxPQUFPLGFBQWEsS0FBSzs7OztnQkFJeEMsU0FBUyxvQkFBb0IsWUFBVztvQkFDcEMsSUFBSSxjQUFjLHlCQUF5Qjs7b0JBRTNDLEdBQUcsZ0NBQWdDLFlBQVc7d0JBQzFDLElBQUksVUFBTzt3QkFDWCxhQUFhLFdBQVcsYUFBYSxRQUFRLEtBQUssRUFBQyxRQUFRLEVBQUMsaUJBQWlCO3dCQUM3RSxVQUFVLHNCQUFzQixpQkFBaUIsY0FBYyxVQUFVO3dCQUN6RSxhQUFhOzs7b0JBR2pCLEdBQUcsNkVBQTZFLFlBQVc7d0JBQ3ZGLGFBQWEsV0FBVyxhQUFhLFFBQVEsS0FBSzs0QkFDOUMsUUFBUTs0QkFDUixNQUFNLElBQUksYUFBYTtnQ0FDbkIsSUFBSTtnQ0FDSixXQUFXO2dDQUNYLGlCQUFpQjs7NEJBRXJCLFVBQVUsQ0FBQzs0QkFDWCxzQkFBc0I7O3dCQUUxQixJQUFJLFVBQVUsc0JBQXNCLGlCQUFpQixjQUFjLFVBQVU7NEJBQ3pFLFNBQU07d0JBQ1YsUUFBTyxTQUFPLFVBQVMsT0FBTzs0QkFDMUIsU0FBUzs7d0JBRWIsYUFBYTt3QkFDYixPQUFPLGtCQUFrQjt3QkFDekIsT0FBTyxPQUFPLDBCQUEwQjt3QkFDeEMsT0FBTyxPQUFPLGNBQWMsUUFBUSxLQUFLO3dCQUN6QyxPQUFPLE9BQU8sYUFBYSxLQUFLOzs7O2dCQUt4QyxTQUFTLGlCQUFpQixZQUFXO29CQUNqQyxHQUFHLDJDQUEyQyxZQUFXO3dCQUNyRCxPQUFPLHNCQUFzQixjQUFjLFFBQVE7OztvQkFHdkQsR0FBRyxnREFBZ0QsWUFBVzt3QkFDMUQsT0FBTyxzQkFBc0IsY0FBYyxRQUFROzs7O2dCQUszRCxTQUFTLG9CQUFvQixZQUFXO29CQUNwQyxJQUFJLFVBQU87d0JBQUUsU0FBTTt3QkFBRSxXQUFRO3dCQUFFLGlCQUFjOztvQkFFN0MsV0FBVyxZQUFXO3dCQUNsQixpQkFBaUIsSUFBSTs7O29CQUd6QixHQUFHLGdDQUFnQyxZQUFXO3dCQUMxQyxXQUFXLHlCQUF5QixnQkFDaEMsVUFBVSxVQUFVO3dCQUN4QixhQUFhLFdBQVcsVUFBVSxRQUFRLEtBQUs7d0JBQy9DLFVBQVUsc0JBQXNCLGlCQUFpQixnQkFBZ0IsVUFBVSxTQUFTO3dCQUNwRixhQUFhOzs7b0JBR2pCLEdBQUcsbURBQW1ELFlBQVc7d0JBQzdELFdBQVcseUJBQXlCLGdCQUNoQyxVQUFVLEtBQUs7d0JBQ25CLGFBQWEsV0FBVyxVQUFVLFFBQVEsS0FBSyxDQUFDO3dCQUNoRCxVQUFVLHNCQUFzQixpQkFBaUIsZ0JBQWdCLFVBQVUsU0FBUzt3QkFDcEYsUUFBTyxTQUFPLFVBQVMsT0FBTzs0QkFDMUIsU0FBUzs7d0JBRWIsYUFBYTt3QkFDYixPQUFPLFFBQVEsUUFBUTs7OztnQkFJL0IsU0FBUyx3QkFBd0IsWUFBVztvQkFDeEMsSUFBSSxVQUFPO3dCQUFFLFNBQU07d0JBQUUsVUFBTzt3QkFBRSxpQkFBYzt3QkFDeEMsY0FBYzt3QkFDZCxrQkFBa0I7O29CQUV0QixXQUFXLFlBQVc7d0JBQ2xCLGlCQUFpQixJQUFJOzs7b0JBR3pCLEdBQUcsNkJBQTZCLFlBQVc7d0JBQ3ZDLFVBQVUseUJBQXlCLGdCQUMvQixVQUFVLFVBQVU7d0JBQ3hCLGFBQWEsV0FBVyxTQUFTLFFBQVEsS0FBSyxFQUFDLFFBQVEsRUFBQyxhQUFhO3dCQUNyRSxVQUFVLHNCQUFzQixvQkFBb0IsZ0JBQWdCLGlCQUM1RCxhQUFhLFVBQVUsU0FBUzt3QkFDeEMsYUFBYTs7O29CQUdqQixHQUFHLG1EQUFtRCxZQUFXO3dCQUM3RCxVQUFVLHlCQUF5QixnQkFDL0IsVUFBVSxVQUFVO3dCQUN4QixhQUFhLFdBQVcsU0FBUyxRQUFRLEtBQUssQ0FBQzt3QkFDL0MsVUFBVSxzQkFBc0Isb0JBQW9CLGdCQUFnQixpQkFDNUQsYUFBYSxVQUFVLFNBQVM7d0JBQ3hDLFFBQU8sU0FBTyxVQUFTLE9BQU87NEJBQzFCLFNBQVM7O3dCQUViLGFBQWE7d0JBQ2IsT0FBTyxRQUFRLFFBQVE7Ozs7Z0JBSS9CLFNBQVMsMEJBQTBCLFlBQVc7b0JBQzFDLElBQUksVUFBTzt3QkFBRSxTQUFNO3dCQUFFLFVBQU87d0JBQUUsaUJBQWM7O29CQUU1QyxXQUFXLFlBQVc7d0JBQ2xCLGlCQUFpQixJQUFJOzs7b0JBR3pCLEdBQUcsNkJBQTZCLFlBQVc7d0JBQ3ZDLFVBQVUseUJBQXlCLGdCQUMvQixVQUFVLFVBQVU7d0JBQ3hCLGFBQWEsV0FBVyxTQUFTLFFBQVEsS0FBSyxFQUFDLFFBQVEsRUFBQyxhQUFhO3dCQUNyRSxVQUFVLHNCQUFzQixrQkFBa0IsZ0JBQWdCLFVBQVUsU0FBUyxPQUFPO3dCQUM1RixhQUFhOzs7b0JBR2pCLEdBQUcsbURBQW1ELFlBQVc7d0JBQzdELFVBQVUseUJBQXlCLGdCQUMvQixVQUFVLFVBQVU7d0JBQ3hCLGFBQWEsV0FBVyxTQUFTLFFBQVEsS0FBSzt3QkFDOUMsVUFBVSxzQkFBc0Isa0JBQWtCLGdCQUFnQixVQUFVLFNBQVMsT0FBTzt3QkFDNUYsUUFBTyxTQUFPLFVBQVMsT0FBTzs0QkFDMUIsU0FBUzs7d0JBRWIsYUFBYTt3QkFDYixPQUFPLFFBQVEsUUFBUTs7OztnQkFJL0IsU0FBUyw4QkFBOEIsWUFBVztvQkFDOUMsSUFBSSxVQUFPO3dCQUFFLGFBQVU7d0JBQUUsaUJBQWM7O29CQUV2QyxXQUFXLFlBQVc7d0JBQ2xCLGlCQUFpQixJQUFJOzs7b0JBR3pCLEdBQUcsb0NBQW9DLFlBQVc7d0JBQzlDLGFBQWEseUJBQXlCLGdCQUNsQyxVQUFVLFVBQVU7d0JBQ3hCLGFBQWEsV0FBVyxZQUFZLFFBQVEsS0FBSyxDQUFDLEVBQUMsSUFBSSxXQUFVLEVBQUMsSUFBSTt3QkFDdEUsVUFBVSxzQkFBc0Isd0JBQXdCLGdCQUFnQixVQUFVLFNBQVM7d0JBQzNGLGFBQWE7Ozs7OztHQWdCdEIiLCJmaWxlIjoiaWRlbnRpdHkvTWFuYWdlUGFzc3dvcmRTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xuaW1wb3J0ICcuL0lkZW50aXR5VGVzdERhdGEnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgbWFuYWdlUGFzc3dvcmRTZXJ2aWNlLlxuICovXG5kZXNjcmliZSgnbWFuYWdlUGFzc3dvcmRTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgcXVpY2tsaW5rID0gJ01hbmFnZSUyMFBhc3N3b3Jkcyc7XG4gICAgY29uc3QgYmFzZVVSTE1hbmFnZVBhc3N3b3JkcyA9IGAvaWRlbnRpdHlpcS91aS9yZXN0L3F1aWNrTGlua3MvJHtxdWlja2xpbmt9L2A7XG4gICAgbGV0IElkZW50aXR5LCBQYXNzd29yZENoYW5nZUVycm9yLCBtYW5hZ2VQYXNzd29yZFNlcnZpY2UsIGlkZW50aXR5VGVzdERhdGEsICRodHRwQmFja2VuZCxcbiAgICAgICAgaWRlbnRpdHkxLCBpZGVudGl0eTIsIFNlbGVjdGlvbk1vZGVsLCBQYXNzd29yZExpbms7XG5cbiAgICAvLyBVc2UgdGhlIGlkZW50aXR5IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ1VSUl9VU0VSX0lEJywgJzEyMycpO1xuICAgIH0pKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDggKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfSWRlbnRpdHlfLCBfUGFzc3dvcmRDaGFuZ2VFcnJvcl8sIF9tYW5hZ2VQYXNzd29yZFNlcnZpY2VfLCBfaWRlbnRpdHlUZXN0RGF0YV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXyRodHRwQmFja2VuZF8sIF9TZWxlY3Rpb25Nb2RlbF8sIF9QYXNzd29yZExpbmtfKSB7XG4gICAgICAgIElkZW50aXR5ID0gX0lkZW50aXR5XztcbiAgICAgICAgUGFzc3dvcmRDaGFuZ2VFcnJvciA9IF9QYXNzd29yZENoYW5nZUVycm9yXztcbiAgICAgICAgUGFzc3dvcmRMaW5rID0gX1Bhc3N3b3JkTGlua187XG4gICAgICAgIG1hbmFnZVBhc3N3b3JkU2VydmljZSA9IF9tYW5hZ2VQYXNzd29yZFNlcnZpY2VfO1xuICAgICAgICBpZGVudGl0eVRlc3REYXRhID0gX2lkZW50aXR5VGVzdERhdGFfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgU2VsZWN0aW9uTW9kZWwgPSBfU2VsZWN0aW9uTW9kZWxfO1xuICAgIH0pKTtcblxuICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGlkZW50aXR5MSA9IG5ldyBJZGVudGl0eShpZGVudGl0eVRlc3REYXRhLklERU5USVRZMSk7XG4gICAgICAgIGlkZW50aXR5MiA9IG5ldyBJZGVudGl0eShpZGVudGl0eVRlc3REYXRhLklERU5USVRZMik7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3VibWl0UGFzc3dvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGNoYW5nZVVybCA9IGJhc2VVUkxNYW5hZ2VQYXNzd29yZHMgKyAnaWRlbnRpdGllcy9pZGVudGl0eUlkL2xpbmtzL2xpbmtJZC9jaGFuZ2VQYXNzd29yZCc7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBjaGFuZ2VQYXNzd29yZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHByb21pc2U7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChjaGFuZ2VVcmwpLnJlc3BvbmQoMjAwLCB7b2JqZWN0OiB7cGFzc3dvcmRDaGFuZ2VzOiBbXX19KTtcbiAgICAgICAgICAgIHByb21pc2UgPSBtYW5hZ2VQYXNzd29yZFNlcnZpY2UuY2hhbmdlUGFzc3dvcmQoJ2lkZW50aXR5SWQnLCAnbGlua0lkJywgJ25ld1Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgJ2N1cnJlbnRQYXNzd29yZCcsIHF1aWNrbGluayk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYSByZWplY3RlZCBwcm9taXNlIHdoaXRoIFBhc3N3b3JkQ2hhbmdlRXJyb3JzIHdoZW4gUE9TVCA0MDBzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChjaGFuZ2VVcmwpLnJlc3BvbmQoNDAwLCB7XG4gICAgICAgICAgICAgICAgbGlua0lkOiAnc29tZUxpbmsnLFxuICAgICAgICAgICAgICAgIGxpbms6IG5ldyBQYXNzd29yZExpbmsoe1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3NvbWVMaW5rJyxcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudElkOiAndGVkZHkuYnJvc2V2ZWx0JyxcbiAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnYnJvc0RCJ1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbJ21lc3NhZ2Ugb25lJywgJ21lc3NhZ2UgdHdvJ10sXG4gICAgICAgICAgICAgICAgY29uc3RyYWludHNWaW9sYXRpb246IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IHByb21pc2UgPSBtYW5hZ2VQYXNzd29yZFNlcnZpY2UuY2hhbmdlUGFzc3dvcmQoJ2lkZW50aXR5SWQnLCAnbGlua0lkJywgJ25ld1Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgICAnY3VycmVudFBhc3N3b3JkJywgcXVpY2tsaW5rKSxcbiAgICAgICAgICAgICAgICByZXN1bHQ7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICByZXN1bHQgPSBlcnJvcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0IGluc3RhbmNlb2YgUGFzc3dvcmRDaGFuZ2VFcnJvcik7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0LmlzQ29uc3RyYWludHNWaW9sYXRpb24oKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5nZXRNZXNzYWdlcygpLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQuZ2V0TGlua0lkKCkpLnRvQmUoJ3NvbWVMaW5rJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dlbmVyYXRlUGFzc3dvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGdlbmVyYXRlVXJsID0gYmFzZVVSTE1hbmFnZVBhc3N3b3JkcyArICdpZGVudGl0aWVzL2lkZW50aXR5SWQvbGlua3MvbGlua0lkL2dlbmVyYXRlUGFzc3dvcmQnO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBnZW5lcmF0ZVBhc3N3b3JkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgcHJvbWlzZTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGdlbmVyYXRlVXJsKS5yZXNwb25kKDIwMCwge29iamVjdDoge3Bhc3N3b3JkQ2hhbmdlczogW119fSk7XG4gICAgICAgICAgICBwcm9taXNlID0gbWFuYWdlUGFzc3dvcmRTZXJ2aWNlLmdlbmVyYXRlUGFzc3dvcmQoJ2lkZW50aXR5SWQnLCAnbGlua0lkJywgcXVpY2tsaW5rKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhIHJlamVjdGVkIHByb21pc2Ugd2l0aCBQYXNzd29yZENoYW5nZUVycm9ycyB3aGVuIFBPU1QgNDAwcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoZ2VuZXJhdGVVcmwpLnJlc3BvbmQoNDAwLCB7XG4gICAgICAgICAgICAgICAgbGlua0lkOiAnYURpZmZlcmVudExpbmsnLFxuICAgICAgICAgICAgICAgIGxpbms6IG5ldyBQYXNzd29yZExpbmsoe1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2FEaWZmZXJlbnRMaW5rJyxcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudElkOiAndGVkZHkuYnJvc2V2ZWx0JyxcbiAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnYnJvc0RCJ1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbJ2dlbmVyYXRpb24gZmFpbGVkJ10sXG4gICAgICAgICAgICAgICAgY29uc3RyYWludHNWaW9sYXRpb246IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBwcm9taXNlID0gbWFuYWdlUGFzc3dvcmRTZXJ2aWNlLmdlbmVyYXRlUGFzc3dvcmQoJ2lkZW50aXR5SWQnLCAnbGlua0lkJywgcXVpY2tsaW5rKSxcbiAgICAgICAgICAgICAgICByZXN1bHQ7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCBpbnN0YW5jZW9mIFBhc3N3b3JkQ2hhbmdlRXJyb3IpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5pc0NvbnN0cmFpbnRzVmlvbGF0aW9uKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5nZXRNZXNzYWdlcygpLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQuZ2V0TGlua0lkKCkpLnRvQmUoJ2FEaWZmZXJlbnRMaW5rJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNTZWxmU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciBzZWxmU2VydmljZSB1c2VyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QobWFuYWdlUGFzc3dvcmRTZXJ2aWNlLmlzU2VsZlNlcnZpY2UoJzEyMycpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZvciBub24tc2VsZlNlcml2Y2UgdXNlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZVBhc3N3b3JkU2VydmljZS5pc1NlbGZTZXJ2aWNlKCc0NTYnKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBkZXNjcmliZSgnbWVyZ2VDb25zdHJhaW50cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcHJvbWlzZSwgcmVzdWx0LCBtZXJnZVVybCwgc2VsZWN0aW9uTW9kZWw7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBtZXJnZUNvbnN0cmFpbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZXJnZVVybCA9IGJhc2VVUkxNYW5hZ2VQYXNzd29yZHMgKyAnaWRlbnRpdGllcy8nICtcbiAgICAgICAgICAgICAgICBpZGVudGl0eTEuZ2V0SWQoKSArICcvbGlua3MvbWVyZ2VDb25zdHJhaW50cyc7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChtZXJnZVVybCkucmVzcG9uZCgyMDAsIFtdKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBtYW5hZ2VQYXNzd29yZFNlcnZpY2UubWVyZ2VDb25zdHJhaW50cyhzZWxlY3Rpb25Nb2RlbCwgaWRlbnRpdHkxLmdldElkKCksIHF1aWNrbGluayk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYSByZWplY3RlZCBwcm9taXNlIHdoZW4gUE9TVCA0MDBzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZXJnZVVybCA9IGJhc2VVUkxNYW5hZ2VQYXNzd29yZHMgKyAnaWRlbnRpdGllcy8nICtcbiAgICAgICAgICAgICAgICBpZGVudGl0eTEuaWQgKyAnL2xpbmtzL21lcmdlQ29uc3RyYWludHMnO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QobWVyZ2VVcmwpLnJlc3BvbmQoNDAwLCBbJ21lcmdlIGZhaWxlZCddKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBtYW5hZ2VQYXNzd29yZFNlcnZpY2UubWVyZ2VDb25zdHJhaW50cyhzZWxlY3Rpb25Nb2RlbCwgaWRlbnRpdHkxLmdldElkKCksIHF1aWNrbGluayk7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuaXNBcnJheShyZXN1bHQpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3luY2hyb25pemUgcGFzc3dvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHByb21pc2UsIHJlc3VsdCwgc3luY1VybCwgc2VsZWN0aW9uTW9kZWwsXG4gICAgICAgICAgICBuZXdQYXNzd29yZCA9ICcxMjM0JyxcbiAgICAgICAgICAgIGxpbmtQYXNzd29yZE1hcCA9IFtdO1xuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgc3luY1Bhc3N3b3JkcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3luY1VybCA9IGJhc2VVUkxNYW5hZ2VQYXNzd29yZHMgKyAnaWRlbnRpdGllcy8nICtcbiAgICAgICAgICAgICAgICBpZGVudGl0eTEuZ2V0SWQoKSArICcvbGlua3Mvc3luY2hyb25pemVQYXNzd29yZCc7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChzeW5jVXJsKS5yZXNwb25kKDIwMCwge29iamVjdDoge2J1bGtDaGFuZ2VzOiBbXX19KTtcbiAgICAgICAgICAgIHByb21pc2UgPSBtYW5hZ2VQYXNzd29yZFNlcnZpY2Uuc3luY2hyb25pemVQYXNzd29yZChzZWxlY3Rpb25Nb2RlbCwgbGlua1Bhc3N3b3JkTWFwLFxuICAgICAgICAgICAgICAgICAgICBuZXdQYXNzd29yZCwgaWRlbnRpdHkxLmdldElkKCksIHF1aWNrbGluayk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYSByZWplY3RlZCBwcm9taXNlIHdoZW4gUE9TVCA0MDBzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzeW5jVXJsID0gYmFzZVVSTE1hbmFnZVBhc3N3b3JkcyArICdpZGVudGl0aWVzLycgK1xuICAgICAgICAgICAgICAgIGlkZW50aXR5MS5nZXRJZCgpICsgJy9saW5rcy9zeW5jaHJvbml6ZVBhc3N3b3JkJztcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKHN5bmNVcmwpLnJlc3BvbmQoNDAwLCBbJ3N5bmNocm9uaXplIHBhc3N3b3JkcyBmYWlsZWQnXSk7XG4gICAgICAgICAgICBwcm9taXNlID0gbWFuYWdlUGFzc3dvcmRTZXJ2aWNlLnN5bmNocm9uaXplUGFzc3dvcmQoc2VsZWN0aW9uTW9kZWwsIGxpbmtQYXNzd29yZE1hcCxcbiAgICAgICAgICAgICAgICAgICAgbmV3UGFzc3dvcmQsIGlkZW50aXR5MS5nZXRJZCgpLCBxdWlja2xpbmspO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmlzQXJyYXkocmVzdWx0KSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2J1bGsgZ2VuZXJhdGUgcGFzc3dvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHByb21pc2UsIHJlc3VsdCwgc3luY1VybCwgc2VsZWN0aW9uTW9kZWw7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBzeW5jUGFzc3dvcmRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzeW5jVXJsID0gYmFzZVVSTE1hbmFnZVBhc3N3b3JkcyArICdpZGVudGl0aWVzLycgK1xuICAgICAgICAgICAgICAgIGlkZW50aXR5MS5nZXRJZCgpICsgJy9saW5rcy9nZW5lcmF0ZVBhc3N3b3JkJztcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKHN5bmNVcmwpLnJlc3BvbmQoMjAwLCB7b2JqZWN0OiB7YnVsa0NoYW5nZXM6IFtdfX0pO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG1hbmFnZVBhc3N3b3JkU2VydmljZS5nZW5lcmF0ZVBhc3N3b3JkcyhzZWxlY3Rpb25Nb2RlbCwgaWRlbnRpdHkxLmdldElkKCksIGZhbHNlLCBxdWlja2xpbmspO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgcmVqZWN0ZWQgcHJvbWlzZSB3aGVuIFBPU1QgNDAwcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3luY1VybCA9IGJhc2VVUkxNYW5hZ2VQYXNzd29yZHMgKyAnaWRlbnRpdGllcy8nICtcbiAgICAgICAgICAgICAgICBpZGVudGl0eTEuZ2V0SWQoKSArICcvbGlua3MvZ2VuZXJhdGVQYXNzd29yZCc7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChzeW5jVXJsKS5yZXNwb25kKDQwMCwge30pO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG1hbmFnZVBhc3N3b3JkU2VydmljZS5nZW5lcmF0ZVBhc3N3b3JkcyhzZWxlY3Rpb25Nb2RlbCwgaWRlbnRpdHkxLmdldElkKCksIGZhbHNlLCBxdWlja2xpbmspO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmlzQXJyYXkocmVzdWx0KSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBjdXJyZW50IHBhc3N3b3JkIGxpbmtzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBwcm9taXNlLCBjdXJyZW50VXJsLCBzZWxlY3Rpb25Nb2RlbDtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGN1cnJlbnRQYXNzd29yZExpbmtzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdXJyZW50VXJsID0gYmFzZVVSTE1hbmFnZVBhc3N3b3JkcyArICdpZGVudGl0aWVzLycgK1xuICAgICAgICAgICAgICAgIGlkZW50aXR5MS5nZXRJZCgpICsgJy9saW5rcy9jdXJyZW50UGFzc3dvcmRMaW5rcyc7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChjdXJyZW50VXJsKS5yZXNwb25kKDIwMCwgW3tpZDogJ2xpbmsxJ30sIHtpZDogJ2xpbmsyJ31dKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBtYW5hZ2VQYXNzd29yZFNlcnZpY2UuZ2V0Q3VycmVudFBhc3N3b3JkTGlua3Moc2VsZWN0aW9uTW9kZWwsIGlkZW50aXR5MS5nZXRJZCgpLCBxdWlja2xpbmspO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
