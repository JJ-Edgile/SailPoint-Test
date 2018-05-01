System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('ManagePasswordActionsDirective', function () {
                var $scope = undefined,
                    $compile = undefined,
                    $httpBackend = undefined,
                    managePasswordDataService = undefined,
                    identityService = undefined,
                    response = undefined,
                    PasswordLink = undefined;
                var CHANGE_VALUE = 'ui_identity_change_password',
                    quicklink = 'Manage%20Passwords',
                    DETAIL_VALUE = 'ui_details_button' + 'ui_manage_passwords_account_detail_button';
                var identitiesURL = '/ui/rest/quickLinks/' + quicklink + '/identities';
                beforeEach(module(identityModule));
                beforeEach(inject(function (_managePasswordDataService_, _identityService_, _$rootScope_, _$compile_, _$httpBackend_, _PasswordLink_) {
                    managePasswordDataService = _managePasswordDataService_;
                    identityService = _identityService_;
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    $httpBackend = _$httpBackend_;
                    PasswordLink = _PasswordLink_;
                    response = { status: '200' };
                }));

                function createElement() {
                    var definition = '<sp-manage-password-actions sp-model="link"></sp-manage-password-actions>',
                        element = $compile(definition)($scope);
                    $scope.$apply();
                    return element;
                }

                function createMockLink(status, actionStatus, identityId, linkId, appName) {
                    return new PasswordLink({
                        status: status,
                        actionStatus: actionStatus,
                        identityId: identityId,
                        id: linkId,
                        applicationName: appName
                    });
                }

                it('should have detail button', function () {
                    $scope.link = createMockLink();
                    var element = createElement(),
                        detailButton = element.find('button')[1],
                        detailButtonText = detailButton.textContent.trim().replace(/\s/g, '');
                    expect(detailButtonText).toEqual(DETAIL_VALUE);
                });

                it('should launch detail dialog when clicked detail button', function () {
                    var linkURL = identitiesURL + '/identityId1/links/linkId1';
                    var detailURL = '../ui/js/common/template/detail-dialog.html';
                    managePasswordDataService.setQuickLinkName(quicklink);
                    $scope.link = createMockLink('', '', 'identityId1', 'linkId1', 'app1');
                    var element = createElement(),
                        detailButton = element.find('button')[1];
                    $httpBackend.expectGET(linkURL).respond(200, response);
                    $httpBackend.expectGET(detailURL).respond(200, response);
                    spyOn(identityService, 'getDetails').and.callThrough();
                    detailButton.click();
                    expect(identityService.getDetails).toHaveBeenCalled();
                });

                it('should show change if the row is collapsed', function () {
                    $scope.link = createMockLink();
                    spyOn(managePasswordDataService, 'isLinkExpanded').and.returnValue(false);
                    var element = createElement(),
                        changeButton = element.find('button')[0],
                        changeButtonValue = changeButton.innerHTML.trim().replace(/\s/g, '');
                    expect(changeButtonValue).toEqual(CHANGE_VALUE);
                });

                it('should show submit if the row is expanded', function () {
                    $scope.link = createMockLink();
                    spyOn(managePasswordDataService, 'isLinkExpanded').and.returnValue(true);
                    var element = createElement(),
                        changeButton = element.find('button')[0];
                    expect(changeButton.getAttribute('disabled')).toEqual('disabled');
                });

                it('should toggle the row when clicked change button', function () {
                    $scope.link = createMockLink();
                    var element = createElement(),
                        changeButton = element.find('button')[0];
                    spyOn(managePasswordDataService, 'toggleLinkExpansion').and.callThrough();
                    changeButton.click();
                    expect(managePasswordDataService.toggleLinkExpansion).toHaveBeenCalled();
                });

                it('should be not be disabled if non of the disable are true', function () {
                    $scope.link = createMockLink('active', 'completed');
                    var element = createElement(),
                        changeButton = element.find('button')[0];
                    expect(changeButton.getAttribute('disabled')).toBeNull();
                });

                it('should not be disabled if link status is disabled', function () {
                    $scope.link = createMockLink('DISABLED');
                    var element = createElement(),
                        changeButton = element.find('button')[0];
                    expect(changeButton.getAttribute('disabled')).toBeNull();
                });

                it('should not be disabled if link status is locked', function () {
                    $scope.link = createMockLink('LOCKED');
                    var element = createElement(),
                        changeButton = element.find('button')[0];
                    expect(changeButton.getAttribute('disabled')).toBeNull();
                });

                it('should be disabled if link action status is pending', function () {
                    $scope.link = createMockLink('', 'Pending');
                    var element = createElement(),
                        changeButton = element.find('button')[0];
                    expect(changeButton.getAttribute('disabled')).toEqual('disabled');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L01hbmFnZVBhc3N3b3JkQWN0aW9uc0RpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0QkFBNEIsVUFBVSxTQUFTOzs7O0lBSXZGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZOztZQUw3QixTQUFTLGtDQUFrQyxZQUFXO2dCQUNsRCxJQUFJLFNBQU07b0JBQUUsV0FBUTtvQkFBRSxlQUFZO29CQUFFLDRCQUF5QjtvQkFBRSxrQkFBZTtvQkFBRSxXQUFRO29CQUFFLGVBQVk7Z0JBQ3RHLElBQU0sZUFBZTtvQkFDZixZQUFZO29CQUNaLGVBQWUsc0JBQXNCO2dCQUMzQyxJQUFNLGdCQUFhLHlCQUEwQixZQUFTO2dCQUN0RCxXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFTLDZCQUE2QixtQkFBbUIsY0FBYyxZQUNqRixnQkFBZ0IsZ0JBQWdCO29CQUNwQyw0QkFBNEI7b0JBQzVCLGtCQUFrQjtvQkFDbEIsU0FBUztvQkFDVCxXQUFXO29CQUNYLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixXQUFXLEVBQUUsUUFBUTs7O2dCQUd6QixTQUFTLGdCQUFnQjtvQkFDckIsSUFBSSxhQUFhO3dCQUNiLFVBQVUsU0FBUyxZQUFZO29CQUNuQyxPQUFPO29CQUNQLE9BQU87OztnQkFHWCxTQUFTLGVBQWUsUUFBUSxjQUFjLFlBQVksUUFBUSxTQUFTO29CQUN2RSxPQUFPLElBQUksYUFBYzt3QkFDckIsUUFBUTt3QkFDUixjQUFjO3dCQUNkLFlBQVk7d0JBQ1osSUFBSTt3QkFDSixpQkFBaUI7Ozs7Z0JBSXpCLEdBQUcsNkJBQTZCLFlBQVc7b0JBQ3ZDLE9BQU8sT0FBTztvQkFDZCxJQUFJLFVBQVU7d0JBQ1YsZUFBZSxRQUFRLEtBQUssVUFBVTt3QkFDdEMsbUJBQW1CLGFBQWEsWUFBWSxPQUFPLFFBQVEsT0FBTztvQkFDdEUsT0FBTyxrQkFBa0IsUUFBUTs7O2dCQUdyQyxHQUFHLDBEQUEwRCxZQUFXO29CQUNwRSxJQUFNLFVBQVUsZ0JBQWdCO29CQUNoQyxJQUFNLFlBQVk7b0JBQ2xCLDBCQUEwQixpQkFBaUI7b0JBQzNDLE9BQU8sT0FBTyxlQUFlLElBQUksSUFBSSxlQUFlLFdBQVc7b0JBQy9ELElBQUksVUFBVTt3QkFDVixlQUFlLFFBQVEsS0FBSyxVQUFVO29CQUMxQyxhQUFhLFVBQVUsU0FBUyxRQUFRLEtBQUs7b0JBQzdDLGFBQWEsVUFBVSxXQUFXLFFBQVEsS0FBSztvQkFDL0MsTUFBTSxpQkFBaUIsY0FBYyxJQUFJO29CQUN6QyxhQUFhO29CQUNiLE9BQU8sZ0JBQWdCLFlBQVk7OztnQkFHdkMsR0FBRyw4Q0FBOEMsWUFBVztvQkFDeEQsT0FBTyxPQUFPO29CQUNkLE1BQU0sMkJBQTJCLGtCQUFrQixJQUFJLFlBQVk7b0JBQ25FLElBQUksVUFBVTt3QkFDVixlQUFlLFFBQVEsS0FBSyxVQUFVO3dCQUN0QyxvQkFBb0IsYUFBYSxVQUFVLE9BQU8sUUFBUSxPQUFPO29CQUNyRSxPQUFPLG1CQUFtQixRQUFROzs7Z0JBR3RDLEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELE9BQU8sT0FBTztvQkFDZCxNQUFNLDJCQUEyQixrQkFBa0IsSUFBSSxZQUFZO29CQUNuRSxJQUFJLFVBQVU7d0JBQ1YsZUFBZSxRQUFRLEtBQUssVUFBVTtvQkFDMUMsT0FBTyxhQUFhLGFBQWEsYUFBYSxRQUFROzs7Z0JBRzFELEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlELE9BQU8sT0FBTztvQkFDZCxJQUFJLFVBQVU7d0JBQ1YsZUFBZSxRQUFRLEtBQUssVUFBVTtvQkFDMUMsTUFBTSwyQkFBMkIsdUJBQXVCLElBQUk7b0JBQzVELGFBQWE7b0JBQ2IsT0FBTywwQkFBMEIscUJBQXFCOzs7Z0JBRzFELEdBQUcsNERBQTRELFlBQVc7b0JBQ3RFLE9BQU8sT0FBTyxlQUFlLFVBQVU7b0JBQ3ZDLElBQUksVUFBVTt3QkFDVixlQUFlLFFBQVEsS0FBSyxVQUFVO29CQUMxQyxPQUFPLGFBQWEsYUFBYSxhQUFhOzs7Z0JBR2xELEdBQUcscURBQXFELFlBQVc7b0JBQy9ELE9BQU8sT0FBTyxlQUFlO29CQUM3QixJQUFJLFVBQVU7d0JBQ1YsZUFBZSxRQUFRLEtBQUssVUFBVTtvQkFDMUMsT0FBTyxhQUFhLGFBQWEsYUFBYTs7O2dCQUdsRCxHQUFHLG1EQUFtRCxZQUFXO29CQUM3RCxPQUFPLE9BQU8sZUFBZTtvQkFDN0IsSUFBSSxVQUFVO3dCQUNWLGVBQWUsUUFBUSxLQUFLLFVBQVU7b0JBQzFDLE9BQU8sYUFBYSxhQUFhLGFBQWE7OztnQkFHbEQsR0FBRyx1REFBdUQsWUFBVztvQkFDakUsT0FBTyxPQUFPLGVBQWUsSUFBSTtvQkFDakMsSUFBSSxVQUFVO3dCQUNWLGVBQWUsUUFBUSxLQUFLLFVBQVU7b0JBQzFDLE9BQU8sYUFBYSxhQUFhLGFBQWEsUUFBUTs7Ozs7R0FpQjNEIiwiZmlsZSI6ImlkZW50aXR5L01hbmFnZVBhc3N3b3JkQWN0aW9uc0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xuXG5kZXNjcmliZSgnTWFuYWdlUGFzc3dvcmRBY3Rpb25zRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0ICRzY29wZSwgJGNvbXBpbGUsICRodHRwQmFja2VuZCwgbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZSwgaWRlbnRpdHlTZXJ2aWNlLCByZXNwb25zZSwgUGFzc3dvcmRMaW5rO1xuICAgIGNvbnN0IENIQU5HRV9WQUxVRSA9ICd1aV9pZGVudGl0eV9jaGFuZ2VfcGFzc3dvcmQnLFxuICAgICAgICAgIHF1aWNrbGluayA9ICdNYW5hZ2UlMjBQYXNzd29yZHMnLFxuICAgICAgICAgIERFVEFJTF9WQUxVRSA9ICd1aV9kZXRhaWxzX2J1dHRvbicgKyAndWlfbWFuYWdlX3Bhc3N3b3Jkc19hY2NvdW50X2RldGFpbF9idXR0b24nO1xuICAgIGNvbnN0IGlkZW50aXRpZXNVUkwgPSBgL3VpL3Jlc3QvcXVpY2tMaW5rcy8ke3F1aWNrbGlua30vaWRlbnRpdGllc2A7XG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUpKTtcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZV8sIF9pZGVudGl0eVNlcnZpY2VfLCBfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sXG4gICAgICAgICAgICBfJGh0dHBCYWNrZW5kXywgX1Bhc3N3b3JkTGlua18pIHtcbiAgICAgICAgbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZSA9IF9tYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlXztcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlID0gX2lkZW50aXR5U2VydmljZV87XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgUGFzc3dvcmRMaW5rID0gX1Bhc3N3b3JkTGlua187XG4gICAgICAgIHJlc3BvbnNlID0geyBzdGF0dXM6ICcyMDAnIH07XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCgpIHtcbiAgICAgICAgbGV0IGRlZmluaXRpb24gPSAnPHNwLW1hbmFnZS1wYXNzd29yZC1hY3Rpb25zIHNwLW1vZGVsPVwibGlua1wiPjwvc3AtbWFuYWdlLXBhc3N3b3JkLWFjdGlvbnM+JyxcbiAgICAgICAgICAgIGVsZW1lbnQgPSAkY29tcGlsZShkZWZpbml0aW9uKSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vY2tMaW5rKHN0YXR1cywgYWN0aW9uU3RhdHVzLCBpZGVudGl0eUlkLCBsaW5rSWQsIGFwcE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQYXNzd29yZExpbmsoIHtcbiAgICAgICAgICAgIHN0YXR1czogc3RhdHVzLFxuICAgICAgICAgICAgYWN0aW9uU3RhdHVzOiBhY3Rpb25TdGF0dXMsXG4gICAgICAgICAgICBpZGVudGl0eUlkOiBpZGVudGl0eUlkLFxuICAgICAgICAgICAgaWQ6IGxpbmtJZCxcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogYXBwTmFtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZGV0YWlsIGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKCk7XG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxuICAgICAgICAgICAgZGV0YWlsQnV0dG9uID0gZWxlbWVudC5maW5kKCdidXR0b24nKVsxXSxcbiAgICAgICAgICAgIGRldGFpbEJ1dHRvblRleHQgPSBkZXRhaWxCdXR0b24udGV4dENvbnRlbnQudHJpbSgpLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICAgIGV4cGVjdChkZXRhaWxCdXR0b25UZXh0KS50b0VxdWFsKERFVEFJTF9WQUxVRSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGxhdW5jaCBkZXRhaWwgZGlhbG9nIHdoZW4gY2xpY2tlZCBkZXRhaWwgYnV0dG9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGxpbmtVUkwgPSBpZGVudGl0aWVzVVJMICsgJy9pZGVudGl0eUlkMS9saW5rcy9saW5rSWQxJztcbiAgICAgICAgY29uc3QgZGV0YWlsVVJMID0gJy4uL3VpL2pzL2NvbW1vbi90ZW1wbGF0ZS9kZXRhaWwtZGlhbG9nLmh0bWwnO1xuICAgICAgICBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLnNldFF1aWNrTGlua05hbWUocXVpY2tsaW5rKTtcbiAgICAgICAgJHNjb3BlLmxpbmsgPSBjcmVhdGVNb2NrTGluaygnJywgJycsICdpZGVudGl0eUlkMScsICdsaW5rSWQxJywgJ2FwcDEnKTtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXG4gICAgICAgICAgICBkZXRhaWxCdXR0b24gPSBlbGVtZW50LmZpbmQoJ2J1dHRvbicpWzFdO1xuICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGxpbmtVUkwpLnJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoZGV0YWlsVVJMKS5yZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdnZXREZXRhaWxzJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgIGRldGFpbEJ1dHRvbi5jbGljaygpO1xuICAgICAgICBleHBlY3QoaWRlbnRpdHlTZXJ2aWNlLmdldERldGFpbHMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2hvdyBjaGFuZ2UgaWYgdGhlIHJvdyBpcyBjb2xsYXBzZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmxpbmsgPSBjcmVhdGVNb2NrTGluaygpO1xuICAgICAgICBzcHlPbihtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLCAnaXNMaW5rRXhwYW5kZWQnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgIGNoYW5nZUJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnYnV0dG9uJylbMF0sXG4gICAgICAgICAgICBjaGFuZ2VCdXR0b25WYWx1ZSA9IGNoYW5nZUJ1dHRvbi5pbm5lckhUTUwudHJpbSgpLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICAgIGV4cGVjdChjaGFuZ2VCdXR0b25WYWx1ZSkudG9FcXVhbChDSEFOR0VfVkFMVUUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzaG93IHN1Ym1pdCBpZiB0aGUgcm93IGlzIGV4cGFuZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5saW5rID0gY3JlYXRlTW9ja0xpbmsoKTtcbiAgICAgICAgc3B5T24obWFuYWdlUGFzc3dvcmREYXRhU2VydmljZSwgJ2lzTGlua0V4cGFuZGVkJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgIGNoYW5nZUJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnYnV0dG9uJylbMF07XG4gICAgICAgIGV4cGVjdChjaGFuZ2VCdXR0b24uZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpKS50b0VxdWFsKCdkaXNhYmxlZCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB0b2dnbGUgdGhlIHJvdyB3aGVuIGNsaWNrZWQgY2hhbmdlIGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKCk7XG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxuICAgICAgICAgICAgY2hhbmdlQnV0dG9uID0gZWxlbWVudC5maW5kKCdidXR0b24nKVswXTtcbiAgICAgICAgc3B5T24obWFuYWdlUGFzc3dvcmREYXRhU2VydmljZSwgJ3RvZ2dsZUxpbmtFeHBhbnNpb24nKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgY2hhbmdlQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIGV4cGVjdChtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLnRvZ2dsZUxpbmtFeHBhbnNpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmUgbm90IGJlIGRpc2FibGVkIGlmIG5vbiBvZiB0aGUgZGlzYWJsZSBhcmUgdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKCdhY3RpdmUnLCAnY29tcGxldGVkJyk7XG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxuICAgICAgICAgICAgY2hhbmdlQnV0dG9uID0gZWxlbWVudC5maW5kKCdidXR0b24nKVswXTtcbiAgICAgICAgZXhwZWN0KGNoYW5nZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpLnRvQmVOdWxsKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCBiZSBkaXNhYmxlZCBpZiBsaW5rIHN0YXR1cyBpcyBkaXNhYmxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKCdESVNBQkxFRCcpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgIGNoYW5nZUJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnYnV0dG9uJylbMF07XG4gICAgICAgIGV4cGVjdChjaGFuZ2VCdXR0b24uZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpKS50b0JlTnVsbCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgYmUgZGlzYWJsZWQgaWYgbGluayBzdGF0dXMgaXMgbG9ja2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5saW5rID0gY3JlYXRlTW9ja0xpbmsoJ0xPQ0tFRCcpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgIGNoYW5nZUJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnYnV0dG9uJylbMF07XG4gICAgICAgIGV4cGVjdChjaGFuZ2VCdXR0b24uZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpKS50b0JlTnVsbCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiZSBkaXNhYmxlZCBpZiBsaW5rIGFjdGlvbiBzdGF0dXMgaXMgcGVuZGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKCcnLCAnUGVuZGluZycpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgIGNoYW5nZUJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnYnV0dG9uJylbMF07XG4gICAgICAgIGV4cGVjdChjaGFuZ2VCdXR0b24uZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpKS50b0VxdWFsKCdkaXNhYmxlZCcpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
